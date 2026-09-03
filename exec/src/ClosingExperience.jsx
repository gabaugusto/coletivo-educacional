import { useState } from 'react'
import { getJourneySummary, normalizeClosing, submitCollectiveContribution } from './closing'

const retrospectiveFields = [
  ['keep', '●', 'Permanece', 'O que já fazemos em nossa prática e vale preservar?', 'Uma prática, comportamento ou processo que já gera valor...', 'status-stayed'],
  ['change', '▲', 'Precisa mudar', 'O que fazemos hoje, mas poderia ser revisto?', 'Algo que funciona parcialmente ou precisa se adaptar...', 'status-altered'],
  ['abandon', '■', 'Pode ser abandonado', 'O que talvez estejamos mantendo apenas porque sempre fizemos assim?', 'Um hábito, processo ou prática que talvez já não gere o valor esperado...', 'status-abandoned'],
  ['emerge', '◆', 'Precisa aparecer', 'Que nova prática deveríamos experimentar?', 'Algo pequeno que ainda não fazemos, mas poderia valer um teste...', 'status-appeared'],
]

const progressLabels = ['Compreender', 'Refletir', 'Escolher', 'Experimentar', 'Contribuir', 'Práxis', 'Agilidade', 'Encerrar']

export default function ClosingExperience({ experience, updateExperience, onReview, onReset }) {
  const closing = normalizeClosing(experience.closing)
  const [error, setError] = useState('')
  const summary = getJourneySummary(experience.backlog, experience.completedSprints)
  const step = Math.min(Math.max(closing.currentStep, 0), 7)

  const patchClosing = (patch) => updateExperience((current) => ({
    closing: { ...normalizeClosing(current.closing), ...(typeof patch === 'function' ? patch(normalizeClosing(current.closing)) : patch) },
  }))
  const go = (next) => { setError(''); patchClosing({ currentStep: next }) }
  const back = () => go(Math.max(0, step - 1))

  const setRetrospective = (field, value) => patchClosing((current) => {
    const retrospective = { ...current.retrospective, [field]: value }
    const selected = current.selectedExperiment
    const invalidated = selected.source === field && selected.text !== value.trim()
    return {
      retrospective,
      selectedExperiment: invalidated ? { source: null, text: '' } : selected,
      experiment: invalidated ? { ...current.experiment, idea: '' } : current.experiment,
    }
  })

  const continueRetrospective = () => {
    if (!closing.retrospective.change.trim() && !closing.retrospective.emerge.trim()) {
      setError('Escolha pelo menos uma mudança ou uma nova prática que valha experimentar.')
      return
    }
    go(2)
  }

  return (
    <section className={`closing closing-step-${step}`}>
      <header className="closing-header">
        <div><p className="eyebrow">Encerramento</p><p>{progressLabels[step]}</p></div>
        <div className="closing-progress" aria-label={`Etapa ${step + 1} de ${progressLabels.length}`}><span style={{ width: `${((step + 1) / progressLabels.length) * 100}%` }} /></div>
      </header>

      {step === 0 && <JourneyIntro summary={summary} onContinue={() => go(1)} />}
      {step === 1 && <PraxisRetrospective values={closing.retrospective} onChange={setRetrospective} error={error} onContinue={continueRetrospective} />}
      {step === 2 && <ExperimentSelection closing={closing} error={error} onSelect={(source) => patchClosing({ selectedExperiment: { source, text: closing.retrospective[source].trim() }, experiment: { ...closing.experiment, idea: closing.retrospective[source].trim() } })} onContinue={() => closing.selectedExperiment.source ? go(3) : setError('Escolham uma possibilidade para transformar em experimento.')} />}
      {step === 3 && <MicroExperiment closing={closing} onChange={(field, value) => patchClosing({ experiment: { ...closing.experiment, [field]: value } })} error={error} onContinue={() => {
        if (Object.values(closing.experiment).some((value) => !value.trim())) return setError('Preencham os quatro campos para assumir este experimento.')
        go(4)
      }} />}
      {step === 4 && <CollectiveContribution closing={closing} onChange={(value) => patchClosing({ collectiveContribution: value, contributionSubmitted: false })} onSubmit={async (value) => {
        if (!value.trim()) return setError('Registrem uma contribuição curta para o coletivo.')
        const result = await submitCollectiveContribution(value.trim())
        if (result.ok) patchClosing({ collectiveContribution: value.trim(), contributionSubmitted: true })
      }} onContinue={() => closing.contributionSubmitted ? go(5) : setError('Registrem a contribuição antes de continuar.')} error={error} />}
      {step === 5 && <PraxisReveal onContinue={() => go(6)} />}
      {step === 6 && <AgileReveal onContinue={() => go(7)} />}
      {step === 7 && <FinalMessage experiment={closing.experiment.idea} completed={closing.completed} onFinish={() => patchClosing({ completed: true })} onReview={onReview} onReset={onReset} />}

      {step > 0 && step < 7 ? <button className="back-action" type="button" onClick={back}>← Voltar</button> : null}
    </section>
  )
}

function JourneyIntro({ summary, onContinue }) {
  const metrics = [
    [summary.initialDecisions, 'decisões iniciais'], [summary.kept, 'registros de permanência'],
    [summary.changed, 'alterações ao longo da jornada'], [summary.abandoned, 'decisões abandonadas'],
    [summary.emerged, 'novas decisões'], [summary.completedSprints, 'sprints concluídas'],
  ]
  return <div className="closing-content reveal-copy">
    <h1>A turma era fictícia.<span>As decisões, não.</span></h1>
    <p>Durante as sprints, vocês observaram, levantaram hipóteses, priorizaram, receberam novas informações e mudaram de direção.</p>
    <p>Algumas decisões permaneceram. Algumas mudaram. Algumas foram abandonadas. Outras só apareceram porque vocês aprenderam algo novo.</p>
    <div className="journey-block"><p className="eyebrow">Sua jornada</p><div className="journey-metrics">{metrics.map(([value, label]) => <span key={label}><strong>{value}</strong>{label}</span>)}</div></div>
    <div className="concept-block"><h2>O backlog mudou.</h2><p>Isso não significa que o primeiro plano estava errado. Significa que vocês aprenderam.</p><p><strong>Vocês experimentaram um princípio fundamental da Agilidade:</strong> tomar decisões com as informações disponíveis e revisá-las quando a realidade muda.</p></div>
    <div className="reality-call"><h2>Agora o backlog é de vocês.</h2><p>Olhem para a prática educacional de vocês. Não para os estudantes fictícios. Não para o exercício. Para o trabalho que acontece todos os dias.</p><p><strong>O que vale manter, mudar, abandonar ou fazer aparecer?</strong></p></div>
    <button className="primary-action" type="button" onClick={onContinue}>Iniciar retrospectiva</button>
  </div>
}

function PraxisRetrospective({ values, onChange, error, onContinue }) {
  return <div className="closing-content"><h1>Retrospectiva de Práxis</h1><p className="lead">A mesma linguagem do backlog, agora voltada para a prática de vocês.</p><div className="retrospective-grid">{retrospectiveFields.map(([key, icon, title, question, placeholder, className]) => <label className={`praxis-card ${className}`} key={key} htmlFor={`praxis-${key}`}><span className="praxis-title"><b aria-hidden="true">{icon}</b> {title}</span><span>{question}</span><textarea id={`praxis-${key}`} value={values[key]} onChange={(event) => onChange(key, event.target.value)} placeholder={placeholder} maxLength={600} /></label>)}</div><ErrorMessage error={error} /><button className="primary-action" type="button" onClick={onContinue}>Continuar</button></div>
}

function ExperimentSelection({ closing, onSelect, onContinue, error }) {
  const options = ['change', 'emerge'].filter((key) => closing.retrospective[key].trim())
  return <div className="closing-content narrow"><h1>Vocês não podem mudar tudo.</h1><p className="lead">Assim como no backlog da turma, existe uma capacidade limitada. Escolher também significa deixar algumas possibilidades para depois.</p><h2>Escolham apenas uma.</h2><div className="experiment-options">{options.map((source) => <label key={source} className={closing.selectedExperiment.source === source ? 'selected' : ''}><input type="radio" name="experiment" checked={closing.selectedExperiment.source === source} onChange={() => onSelect(source)} /><span><b>{source === 'change' ? '▲ Precisa mudar' : '◆ Precisa aparecer'}</b>{closing.retrospective[source]}</span></label>)}</div><ErrorMessage error={error} /><button className="primary-action" type="button" onClick={onContinue}>Transformar em experimento</button></div>
}

function MicroExperiment({ closing, onChange, onContinue, error }) {
  const fields = [['idea', 'O que vamos experimentar?', 'Descrevam a prática escolhida.'], ['reason', 'Por que acreditamos que isso pode ajudar?', 'Qual problema, necessidade ou oportunidade estamos tentando compreender?'], ['firstStep', 'Qual é o menor primeiro passo?', 'Algo que poderia realmente ser realizado sem depender de uma grande mudança estrutural...'], ['evidence', 'Que evidência vamos observar?', 'O que poderia indicar que vale continuar, adaptar ou abandonar o experimento?']]
  return <div className="closing-content narrow"><h1>Transforme intenção em experimento.</h1><p className="lead">Não precisamos de um plano perfeito. Precisamos de um primeiro passo pequeno o suficiente para ser testado.</p><div className="experiment-form">{fields.map(([key, label, placeholder]) => <label key={key} htmlFor={`experiment-${key}`}>{label}<textarea id={`experiment-${key}`} value={closing.experiment[key]} onChange={(event) => onChange(key, event.target.value)} placeholder={placeholder} maxLength={800} /></label>)}</div><article className="experiment-summary"><p className="eyebrow">Nosso próximo experimento</p><h2>{closing.experiment.idea || 'A ideia escolhida aparecerá aqui.'}</h2><p><b>Por quê</b>{closing.experiment.reason || '—'}</p><p><b>Primeiro passo</b>{closing.experiment.firstStep || '—'}</p><p><b>Evidência</b>{closing.experiment.evidence || '—'}</p></article><ErrorMessage error={error} /><button className="primary-action" type="button" onClick={onContinue}>Assumir este experimento</button></div>
}

function CollectiveContribution({ closing, onChange, onSubmit, onContinue, error }) {
  const value = closing.collectiveContribution || closing.retrospective.emerge
  return <div className="closing-content narrow"><h1>E o coletivo?</h1><p className="lead">Cada grupo chegou até aqui por um caminho diferente. Agora queremos registrar apenas uma contribuição para o grupo inteiro.</p><label htmlFor="collective"><b>O que precisa aparecer em nossa prática?</b><span>Nossa contribuição para o coletivo:</span><textarea id="collective" value={value} onChange={(event) => onChange(event.target.value)} maxLength={160} placeholder="Uma frase curta para o coletivo..." /><small>{value.length}/160 caracteres</small></label>{closing.contributionSubmitted ? <article className="contribution-card" role="status"><p>Sua contribuição foi registrada nesta experiência.</p><strong>{value}</strong></article> : <button type="button" onClick={() => onSubmit(value)}>Registrar contribuição</button>}<ErrorMessage error={error} /><button className="primary-action" type="button" onClick={onContinue}>Continuar</button></div>
}

function PraxisReveal({ onContinue }) {
  return <div className="closing-content spacious"><p className="eyebrow">Práxis</p><h1>Reflexão e ação sobre a realidade para transformá-la.</h1><div className="praxis-flow" aria-label="Ciclo de práxis">{['Observar', 'Interpretar', 'Agir', 'Encontrar a realidade', 'Refletir', 'Agir novamente'].map((item) => <span key={item}>{item}</span>)}</div><p>Duas perspectivas diferentes — a Práxis e a Agilidade — encontram, nesta experiência, um ponto de diálogo na relação entre reflexão, ação, aprendizagem e transformação.</p><div className="activity-flow"><h2>Na atividade, vocês:</h2><p>observaram a turma → levantaram hipóteses → agiram → receberam novas informações → revisaram decisões → agiram novamente</p><strong>A realidade devolveu informação. E vocês responderam a ela.</strong></div><button className="primary-action" type="button" onClick={onContinue}>Dar nome ao que vivemos</button></div>
}

function AgileReveal({ onContinue }) {
  const items = [['Vocês receberam um problema.', 'Objetivo'], ['Tinham mais possibilidades que capacidade.', 'Priorização'], ['Organizaram decisões.', 'Backlog'], ['Trabalharam durante períodos curtos.', 'Timebox'], ['Receberam novas informações.', 'Feedback'], ['Revisaram o que sabiam.', 'Inspeção'], ['Mudaram decisões.', 'Adaptação'], ['Deixaram algumas ações para trás.', 'Repriorização']]
  return <div className="closing-content"><p className="eyebrow">Vocês viveram primeiro. Agora damos nome ao que aconteceu.</p><h1>Agilidade em experiência</h1><ol className="agile-sequence">{items.map(([description, concept]) => <li key={concept}><span>{description}</span><strong>{concept}</strong></li>)}</ol><blockquote>Agile não apareceu quando usamos a palavra Sprint. Apareceu quando o plano deixou de ser mais importante do que aquilo que estávamos aprendendo.</blockquote><button className="primary-action" type="button" onClick={onContinue}>Continuar</button></div>
}

function FinalMessage({ experiment, completed, onFinish, onReview, onReset }) {
  return <div className="closing-content final-message"><h1>Agilidade não é ter certeza mais rápido.<span>É aprender a mudar melhor.</span></h1><p>O próximo ciclo começa quando aquilo que aprendemos volta para a prática.</p><article><p className="eyebrow">Próximo experimento</p><strong>{experiment}</strong></article><h2>Qual é a próxima hipótese que vale testar?</h2>{!completed ? <button className="primary-action" type="button" onClick={onFinish}>Encerrar experiência</button> : <div className="final-actions"><p>Experiência encerrada. Seus dados continuam salvos neste dispositivo.</p><button type="button" onClick={onReview}>Rever nossa jornada</button><button type="button" onClick={onReset}>Reiniciar experiência</button></div>}</div>
}

function ErrorMessage({ error }) { return error ? <p className="form-error" role="alert">{error}</p> : null }

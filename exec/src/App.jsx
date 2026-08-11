import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { ACCESS_CODES, SPRINT_CONFIG, normalizeAccessCode } from './config/sprints'
import { guidelines } from './data/guidelines'
import { sprint2Events } from './data/sprint2Events'
import { sprint3Events, sprint3Scenario } from './data/sprint3Events'
import { students } from './data/students'
import ClosingExperience from './ClosingExperience'
import { EMPTY_CLOSING } from './closing'

const STORAGE_KEY = 'coletivo-educacao-experience'
const MAX_ACTIVE_BACKLOG = 5
const INITIAL_STATE = {
  screen: 'INTRO',
  currentSprint: 0,
  highestUnlockedSprint: 0,
  backlog: [],
  sprintStartedAt: {},
  completedSprints: [],
  closing: EMPTY_CLOSING,
}

const statusMeta = {
  stayed: { icon: '●', label: 'Permaneceu', className: 'status-stayed' },
  altered: { icon: '▲', label: 'Foi alterado', className: 'status-altered' },
  abandoned: { icon: '■', label: 'Foi abandonado', className: 'status-abandoned' },
  appeared: { icon: '◆', label: 'Apareceu depois', className: 'status-appeared' },
  active: { icon: '○', label: 'Em análise', className: 'status-active' },
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return saved ? { ...INITIAL_STATE, ...saved } : INITIAL_STATE
  } catch {
    return INITIAL_STATE
  }
}

function App() {
  const [experience, setExperience] = useState(loadState)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(experience))
  }, [experience])

  const updateExperience = (updater) => {
    setNotice('')
    setExperience((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      return { ...current, ...next }
    })
  }

  const startSprint = (sprint) => {
    updateExperience((current) => ({
      screen: `SPRINT_${sprint}`,
      currentSprint: sprint,
      highestUnlockedSprint: Math.max(current.highestUnlockedSprint, sprint),
      sprintStartedAt: {
        ...current.sprintStartedAt,
        [sprint]: current.sprintStartedAt[sprint] || Date.now(),
      },
    }))
  }

  const transitionTo = (screen) => updateExperience({ screen })

  const resetExperience = () => {
    if (window.confirm('Reiniciar a experiência e apagar o progresso deste grupo?')) {
      localStorage.removeItem(STORAGE_KEY)
      setExperience(INITIAL_STATE)
      setNotice('')
    }
  }

  return (
    <main className="app-shell">
      {notice ? <div className="notice" role="status">{notice}</div> : null}
      {experience.screen === 'INTRO' && <Intro onStart={() => startSprint(1)} />}
      {experience.screen === 'SPRINT_1' && (
        <SprintPage
          sprint={1}
          experience={experience}
          setNotice={setNotice}
          updateExperience={updateExperience}
          onValidCode={() => transitionTo('TRANSITION_1')}
        />
      )}
      {experience.screen === 'TRANSITION_1' && (
        <Transition
          title="O cenário mudou."
          lines={[
            'Vocês tomaram decisões com as informações disponíveis.',
            'Agora surgiram novos dados.',
            'Algumas hipóteses podem ganhar força.',
            'Outras talvez deixem de fazer sentido.',
          ]}
          button="Ver novas informações"
          onContinue={() => startSprint(2)}
        />
      )}
      {experience.screen === 'SPRINT_2' && (
        <SprintPage
          sprint={2}
          experience={experience}
          setNotice={setNotice}
          updateExperience={updateExperience}
          onValidCode={(target) => transitionTo(target)}
        />
      )}
      {experience.screen === 'TRANSITION_2' && (
        <Transition
          title="O plano encontrou a realidade."
          lines={[
            'Vocês observaram.',
            'Criaram hipóteses.',
            'Tomaram decisões.',
            'Receberam novas informações.',
            'Revisaram o backlog.',
            'Agora surge algo que não estava no planejamento.',
          ]}
          button="Conhecer o novo cenário"
          onContinue={() => startSprint(3)}
        />
      )}
      {experience.screen === 'SPRINT_3' && (
        <SprintPage
          sprint={3}
          experience={experience}
          setNotice={setNotice}
          updateExperience={updateExperience}
          onValidCode={() => transitionTo('CLOSING')}
        />
      )}
      {(experience.screen === 'CLOSING' || experience.screen === 'FINISH' || experience.screen === 'FINISH_EARLY') && (
        <ClosingExperience experience={experience} updateExperience={updateExperience} onReview={() => updateExperience((current) => ({ screen: 'CLOSING', closing: { ...current.closing, currentStep: 0 } }))} onReset={resetExperience} />
      )}
      {experience.screen === '__LEGACY_FINISH' && <Finish experience={experience} reduced={false} />}
      <button className="reset-button" type="button" onClick={resetExperience}>
        Reiniciar experiência
      </button>
    </main>
  )
}

function Intro({ onStart }) {
  return (
    <section className="intro">
      <p className="eyebrow">Experiência pedagógica</p>
      <h1>Coletivo Educacional</h1>
      <p className="subtitle">Uma experiência sobre decisões, pessoas e adaptação.</p>
      <div className="intro-copy">
        <p>Você e sua equipe irão acompanhar uma turma ao longo de diferentes acontecimentos.</p>
        <p>Nem todas as informações estarão disponíveis desde o início.</p>
        <p>Observem. Priorizem. Decidam.</p>
        <p>E estejam preparados para rever suas certezas.</p>
      </div>
      <button className="primary-action" type="button" onClick={onStart}>Começar</button>
    </section>
  )
}

function SprintPage({ sprint, experience, updateExperience, setNotice, onValidCode }) {
  const [filters, setFilters] = useState({ query: '', attendance: 'all', participation: 'all', deliveries: 'all' })
  const [selectedStudent, setSelectedStudent] = useState(null)
  const config = SPRINT_CONFIG[sprint]
  const events = useMemo(() => eventMapForSprint(sprint), [sprint])
  const activeCount = experience.backlog.filter((item) => item.currentStatus !== 'abandoned').length
  const visibleStudents = useMemo(() => {
    return students.filter((student) => {
      const queryMatch = student.searchText.includes(filters.query.trim().toLowerCase())
      const attendanceMatch =
        filters.attendance === 'all' ||
        (filters.attendance === 'low' && student.attendance < 80) ||
        (filters.attendance === 'medium' && student.attendance >= 80 && student.attendance < 90) ||
        (filters.attendance === 'high' && student.attendance >= 90)
      const deliveryMatch =
        filters.deliveries === 'all' ||
        (filters.deliveries === 'low' && student.deliveries < 75) ||
        (filters.deliveries === 'medium' && student.deliveries >= 75 && student.deliveries < 90) ||
        (filters.deliveries === 'high' && student.deliveries >= 90)
      const participationMatch = filters.participation === 'all' || student.participation === filters.participation
      return queryMatch && attendanceMatch && deliveryMatch && participationMatch
    })
  }, [filters])

  const addToBacklog = (student, form) => {
    if (activeCount >= MAX_ACTIVE_BACKLOG) {
      setNotice('Sua equipe já possui cinco prioridades. Para adicionar uma nova frente, revise suas escolhas atuais.')
      return false
    }
    const itemNumber = experience.backlog.length + 1
    const status = sprint === 1 ? 'active' : 'appeared'
    const item = {
      id: `B${String(itemNumber).padStart(2, '0')}`,
      studentId: student.id,
      studentName: student.name,
      evidence: form.evidence,
      hypothesis: form.hypothesis,
      action: form.action,
      priority: form.priority,
      createdAtSprint: sprint,
      currentStatus: status,
      history: [
        {
          sprint,
          status,
          evidence: form.evidence,
          hypothesis: form.hypothesis,
          action: form.action,
          priority: form.priority,
          reason: sprint === 1 ? 'Decisão criada com as informações iniciais.' : 'Decisão surgiu a partir de novas informações.',
          changedAt: new Date().toISOString(),
        },
      ],
    }
    updateExperience((current) => ({ backlog: [...current.backlog, item] }))
    setSelectedStudent(null)
    return true
  }

  const reviseItem = (itemId, revision) => {
    updateExperience((current) => ({
      backlog: current.backlog.map((item) => {
        if (item.id !== itemId) return item
        const revised = {
          ...item,
          evidence: revision.evidence || item.evidence,
          hypothesis: revision.hypothesis || item.hypothesis,
          action: revision.action || item.action,
          priority: revision.priority || item.priority,
          currentStatus: revision.status,
        }
        return {
          ...revised,
          history: [
            ...item.history,
            {
              sprint,
              status: revision.status,
              evidence: revised.evidence,
              hypothesis: revised.hypothesis,
              action: revised.action,
              priority: revised.priority,
              reason: revision.reason,
              changedAt: new Date().toISOString(),
            },
          ],
        }
      }),
    }))
  }

  return (
    <section className="sprint-page">
      <SprintHeader sprint={sprint} startedAt={experience.sprintStartedAt[sprint]} />
      <div className="sprint-intro">
        <div>
          <h1>{config.title}</h1>
          <p className="central-question">{config.question}</p>
          {config.secondaryQuestion ? <p className="secondary-question">{config.secondaryQuestion}</p> : null}
        </div>
        <SprintMission sprint={sprint} />
      </div>
      {sprint === 1 ? (
        <StoryBlock lines={[
          'Vocês acabam de começar a acompanhar esta turma.',
          'Há 30 estudantes, diferentes trajetórias e alguns sinais que podem ou não exigir atenção.',
          'Neste momento, estas são todas as informações disponíveis.',
        ]} />
      ) : null}
      {sprint === 2 ? <GuidelinesPanel /> : null}
      {sprint === 3 ? <ScenarioUpdate /> : null}
      <div className="workbench">
        <section className="students-panel">
          <StudentFilters filters={filters} setFilters={setFilters} total={visibleStudents.length} />
          <div className="student-grid">
            {visibleStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                event={events[student.id]}
                onAdd={() => setSelectedStudent(student)}
              />
            ))}
          </div>
        </section>
        <Backlog
          sprint={sprint}
          items={experience.backlog}
          activeCount={activeCount}
          onRevise={reviseItem}
        />
      </div>
      <SprintAccess sprint={sprint} setNotice={setNotice} onValidCode={onValidCode} updateExperience={updateExperience} />
      {selectedStudent ? (
        <BacklogModal
          student={selectedStudent}
          sprint={sprint}
          onClose={() => setSelectedStudent(null)}
          onSave={addToBacklog}
        />
      ) : null}
    </section>
  )
}

function SprintHeader({ sprint, startedAt }) {
  return (
    <header className="sprint-header">
      <div>
        <p className="brand">Coletivo Educacional</p>
        <p className="sprint-count">Sprint {sprint} / 3</p>
      </div>
      <SprintProgress sprint={sprint} />
      <SprintTimer sprint={sprint} startedAt={startedAt} />
    </header>
  )
}

function SprintProgress({ sprint }) {
  return (
    <ol className="progress" aria-label="Progresso da experiência">
      {[1, 2, 3].map((step) => (
        <li key={step} className={step <= sprint ? 'done' : ''}>Sprint {step}</li>
      ))}
    </ol>
  )
}

function SprintTimer({ sprint, startedAt }) {
  const duration = SPRINT_CONFIG[sprint].durationMinutes * 60 * 1000
  const [now, setNow] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const elapsed = now && startedAt ? now - startedAt : 0
  const remaining = Math.max(0, duration - elapsed)
  const minutes = Math.floor(remaining / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)
  const state = remaining === 0 ? 'ended' : remaining < 60000 ? 'critical' : remaining < 300000 ? 'attention' : 'normal'

  return (
    <div className={`timer timer-${state}`} aria-live="polite">
      <span>Tempo</span>
      <strong>{remaining === 0 ? 'Tempo encerrado' : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} restantes`}</strong>
    </div>
  )
}

function SprintMission({ sprint }) {
  const mission = SPRINT_CONFIG[sprint].mission
  return (
    <aside className="mission">
      <h2>A missão: </h2>
      <p>{mission.objective}</p>
      <dl>
        <div><dt>Desafio</dt><dd>{mission.challenge}</dd></div>
        <div><dt>Entregável</dt><dd>{mission.deliverable}</dd></div>
        <div><dt>Capacidade máxima</dt><dd>{mission.capacity}</dd></div>
      </dl>
      <p className="mission-note">Priorizar também significa escolher o que não fazer agora.</p>
    </aside>
  )
}

function StoryBlock({ lines }) {
  return <div className="story-block">{lines.map((line) => <p key={line}>{line}</p>)}</div>
}

function StudentFilters({ filters, setFilters, total }) {
  const update = (field, value) => setFilters((current) => ({ ...current, [field]: value }))
  return (
    <div className="filters">
      <label>
        Buscar estudante
        <input value={filters.query} onChange={(event) => update('query', event.target.value)} placeholder="Nome ou código" />
      </label>
      <label>
        Frequência
        <select value={filters.attendance} onChange={(event) => update('attendance', event.target.value)}>
          <option value="all">Todas</option>
          <option value="low">Abaixo de 80%</option>
          <option value="medium">80% a 89%</option>
          <option value="high">90% ou mais</option>
        </select>
      </label>
      <label>
        Participação
        <select value={filters.participation} onChange={(event) => update('participation', event.target.value)}>
          <option value="all">Todas</option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
      </label>
      <label>
        Entregas
        <select value={filters.deliveries} onChange={(event) => update('deliveries', event.target.value)}>
          <option value="all">Todas</option>
          <option value="low">Abaixo de 75%</option>
          <option value="medium">75% a 89%</option>
          <option value="high">90% ou mais</option>
        </select>
      </label>
      <p className="filter-count">{total} estudantes</p>
    </div>
  )
}

function StudentCard({ student, event, onAdd }) {
  return (
    <article className="student-card">
      <div className="student-card-head">
        <div>
          <p className="student-id">{student.id}</p>
          <h3>{student.name}</h3>
        </div>
        <span>{student.age} anos</span>
      </div>
      <div className="metrics" aria-label={`Indicadores de ${student.name}`}>
        <span>Frequência <strong>{student.attendance}%</strong></span>
        <span>Entregas <strong>{student.deliveries}%</strong></span>
        <span>Participação <strong>{student.participation}</strong></span>
      </div>
      <p><strong>Evidência recente:</strong> {student.evidence}</p>
      <p><strong>Contexto conhecido:</strong> {student.context}</p>
      {event ? (
        <div className="new-info">
          <span>Nova informação · Sprint {event.sprint}</span>
          <p>{event.description}</p>
        </div>
      ) : null}
      <button type="button" onClick={onAdd}>Adicionar ao backlog</button>
    </article>
  )
}

function Backlog({ sprint, items, activeCount, onRevise }) {
  const [historyItem, setHistoryItem] = useState(null)
  return (
    <aside className="backlog-panel">
      <div className="backlog-head">
        <div>
          <h2>Backlog</h2>
          <p>{activeCount}/{MAX_ACTIVE_BACKLOG} frentes ativas</p>
        </div>
      </div>
      {items.length === 0 ? <p className="empty-state">As decisões criadas pela equipe aparecerão aqui.</p> : null}
      <div className="backlog-list">
        {items.map((item) => (
          <BacklogItem
            key={item.id}
            item={item}
            sprint={sprint}
            onRevise={onRevise}
            onHistory={() => setHistoryItem(item)}
          />
        ))}
      </div>
      {historyItem ? <HistoryModal item={historyItem} onClose={() => setHistoryItem(null)} /> : null}
    </aside>
  )
}

function BacklogItem({ item, sprint, onRevise, onHistory }) {
  const [editing, setEditing] = useState(false)
  const meta = statusMeta[item.currentStatus] || statusMeta.active
  return (
    <article className="backlog-item">
      <div className="backlog-title">
        <h3>{item.id} · {item.action || item.studentName}</h3>
        <span className={`status-pill ${meta.className}`}>{meta.icon} {meta.label}</span>
      </div>
      <p className="student-link">{item.studentName} · nasceu na Sprint {item.createdAtSprint}</p>
      <p><strong>Evidência:</strong> {item.evidence}</p>
      <p><strong>Hipótese:</strong> {item.hypothesis}</p>
      <p><strong>Ação:</strong> {item.action}</p>
      <p><strong>Prioridade:</strong> {item.priority}</p>
      <div className="item-actions">
        {sprint > 1 ? <button type="button" onClick={() => setEditing(true)}>Revisar decisão</button> : null}
        <button type="button" onClick={onHistory}>Ver evolução</button>
      </div>
      {editing ? (
        <RevisionForm
          item={item}
          sprint={sprint}
          onCancel={() => setEditing(false)}
          onSave={(revision) => {
            onRevise(item.id, revision)
            setEditing(false)
          }}
        />
      ) : null}
    </article>
  )
}

function BacklogModal({ student, sprint, onClose, onSave }) {
  const [form, setForm] = useState({
    evidence: student.evidence,
    hypothesis: '',
    action: '',
    priority: 'Alta',
  })
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  return (
    <div className="modal-backdrop" role="presentation">
      <form className="modal" onSubmit={(event) => {
        event.preventDefault()
        onSave(student, form)
      }}>
        <h2>Adicionar {student.name} ao backlog</h2>
        <label>Evidence · O que sabemos?
          <textarea value={form.evidence} onChange={(event) => update('evidence', event.target.value)} required />
        </label>
        <label>Hipótese · O que acreditamos que pode estar acontecendo?
          <textarea value={form.hypothesis} onChange={(event) => update('hypothesis', event.target.value)} placeholder="Acreditamos que..." required />
        </label>
        <label>Ação · O que faremos agora?
          <textarea value={form.action} onChange={(event) => update('action', event.target.value)} placeholder="Vamos..." required />
        </label>
        <label>Prioridade
          <select value={form.priority} onChange={(event) => update('priority', event.target.value)}>
            <option>Alta</option>
            <option>Média</option>
            <option>Baixa</option>
          </select>
        </label>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>Cancelar</button>
          <button className="primary-action" type="submit">{sprint === 1 ? 'Criar decisão' : 'Criar nova decisão'}</button>
        </div>
      </form>
    </div>
  )
}

function RevisionForm({ item, onSave, onCancel }) {
  const [revision, setRevision] = useState({
    status: item.currentStatus === 'appeared' ? 'stayed' : item.currentStatus,
    evidence: item.evidence,
    hypothesis: item.hypothesis,
    action: item.action,
    priority: item.priority,
    reason: '',
  })
  const update = (field, value) => setRevision((current) => ({ ...current, [field]: value }))
  return (
    <form className="revision-form" onSubmit={(event) => {
      event.preventDefault()
      onSave(revision)
    }}>
      <label>Status da decisão
        <select value={revision.status} onChange={(event) => update('status', event.target.value)}>
          <option value="stayed">Permaneceu</option>
          <option value="altered">Foi alterado</option>
          <option value="abandoned">Foi abandonado</option>
        </select>
      </label>
      <label>O que mudou?
        <textarea value={revision.action} onChange={(event) => update('action', event.target.value)} required />
      </label>
      <label>Hipótese atual
        <textarea value={revision.hypothesis} onChange={(event) => update('hypothesis', event.target.value)} required />
      </label>
      <label>Prioridade
        <select value={revision.priority} onChange={(event) => update('priority', event.target.value)}>
          <option>Alta</option>
          <option>Média</option>
          <option>Baixa</option>
        </select>
      </label>
      <label>Por que mudou?
        <textarea value={revision.reason} onChange={(event) => update('reason', event.target.value)} placeholder="Mudamos porque..." required />
      </label>
      <div className="modal-actions">
        <button type="button" onClick={onCancel}>Cancelar</button>
        <button type="submit">Salvar revisão</button>
      </div>
    </form>
  )
}

function HistoryModal({ item, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal history-modal" role="dialog" aria-modal="true">
        <h2>{item.id} · {item.studentName}</h2>
        <div className="timeline">
          {item.history.map((entry, index) => {
            const meta = statusMeta[entry.status] || statusMeta.active
            return (
              <div className="timeline-entry" key={`${entry.changedAt}-${index}`}>
                <span className="timeline-sprint">Sprint {entry.sprint}</span>
                <span className={`status-pill ${meta.className}`}>{meta.icon} {meta.label}</span>
                <p><strong>Ação:</strong> {entry.action}</p>
                <p><strong>Hipótese:</strong> {entry.hypothesis}</p>
                <p><strong>Prioridade:</strong> {entry.priority}</p>
                <p><strong>Motivo:</strong> {entry.reason}</p>
              </div>
            )
          })}
        </div>
        <div className="modal-actions"><button type="button" onClick={onClose}>Fechar</button></div>
      </div>
    </div>
  )
}

function SprintAccess({ sprint, setNotice, onValidCode, updateExperience }) {
  const [primaryCode, setPrimaryCode] = useState('')
  const [finishCode, setFinishCode] = useState('')

  const completeSprint = (target) => {
    updateExperience((current) => ({
      completedSprints: Array.from(new Set([...current.completedSprints, sprint])),
      screen: current.screen,
    }))
    onValidCode(target)
  }

  const validate = (value, expected, target) => {
    if (normalizeAccessCode(value) !== normalizeAccessCode(expected)) {
      setNotice('Código não reconhecido.')
      return
    }
    completeSprint(target)
  }

  if (sprint === 2) {
    return (
      <section className="access-panel">
        <h2>Próximo passo</h2>
        <p>O facilitador indicará como sua equipe deve continuar.</p>
        <div className="dual-access">
          <label>Código para continuar
            <input value={primaryCode} onChange={(event) => setPrimaryCode(event.target.value)} />
            <button type="button" onClick={() => validate(primaryCode, ACCESS_CODES.sprint2ToSprint3, 'TRANSITION_2')}>Ir para a próxima Sprint</button>
          </label>
          <label>Código de encerramento
            <input value={finishCode} onChange={(event) => setFinishCode(event.target.value)} />
            <button type="button" onClick={() => validate(finishCode, ACCESS_CODES.sprint2ToFinish, 'CLOSING')}>Finalizar atividade</button>
          </label>
        </div>
      </section>
    )
  }

  const expected = sprint === 1 ? ACCESS_CODES.sprint1ToSprint2 : ACCESS_CODES.sprint3ToFinish
  return (
    <section className="access-panel">
      <h2>{sprint === 1 ? 'Preparados para avançar?' : 'Encerramento'}</h2>
      <p>Quando o facilitador liberar a próxima etapa, insira o código abaixo.</p>
      <label>{sprint === 1 ? 'Código da próxima etapa' : 'Código de encerramento'}
        <input id='code001' value={primaryCode} onChange={(event) => setPrimaryCode(event.target.value)} />
      </label>
      <button type="button" onClick={() => validate(primaryCode, expected, sprint === 1 ? 'TRANSITION_1' : 'FINISH')}>
        {sprint === 1 ? 'Avançar' : 'Finalizar atividade'}
      </button>
    </section>
  )
}

function GuidelinesPanel() {
  const [open, setOpen] = useState(false)
  return (
    <section className="guidelines-panel">
      <button type="button" onClick={() => setOpen((value) => !value)}>Consultar documentos norteadores</button>
      {open ? (
        <div className="guidelines-list">
          {guidelines.map((doc) => (
            <article key={doc.id}>
              <h3>{doc.title}</h3>
              <p>{doc.summary}</p>
              <small>Fonte: {doc.source}</small>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}

function ScenarioUpdate() {
  return (
    <section className="scenario-update">
      <p className="eyebrow">{sprint3Scenario.title}</p>
      <p>{sprint3Scenario.description}</p>
      <p><strong>Restrição:</strong> {sprint3Scenario.constraint}</p>
    </section>
  )
}

function Transition({ title, lines, button, onContinue }) {
  return (
    <section className="transition">
      <h1>{title}</h1>
      {lines.map((line) => <p key={line}>{line}</p>)}
      <button className="primary-action" type="button" onClick={onContinue}>{button}</button>
    </section>
  )
}

function Finish({ experience, reduced }) {
  const finished = reduced ? 2 : 3
  const initial = experience.backlog.filter((item) => item.createdAtSprint === 1).length
  const altered = experience.backlog.filter((item) => item.history.some((entry) => entry.status === 'altered')).length
  const abandoned = experience.backlog.filter((item) => item.currentStatus === 'abandoned').length
  const appeared = experience.backlog.filter((item) => item.createdAtSprint > 1).length
  return (
    <section className="finish">
      <h1>O backlog mudou.</h1>
      <p>A turma continuou sendo a mesma.</p>
      <p>O que mudou foi a quantidade de informações disponíveis e a forma como vocês responderam a elas.</p>
      <div className="journey-metrics">
        <span><strong>{initial}</strong> decisões iniciais</span>
        <span><strong>{altered}</strong> decisões alteradas</span>
        <span><strong>{abandoned}</strong> decisões abandonadas</span>
        <span><strong>{appeared}</strong> decisões surgiram depois</span>
        <span><strong>{finished}</strong> sprints concluídas</span>
      </div>
      <h2>Isto também é Agilidade.</h2>
      <div className="agile-reveal">
        {[
          ['Vocês receberam um problema.', 'Objetivo'],
          ['Tinham mais possibilidades que capacidade.', 'Priorização'],
          ['Organizaram o trabalho.', 'Backlog'],
          ['Trabalharam durante um período curto.', 'Timebox'],
          ['Receberam novas informações.', 'Feedback'],
          ['Revisaram suas decisões.', 'Inspeção'],
          ['Mudaram o plano.', 'Adaptação'],
          ['Precisaram escolher o que deixaria de ser feito.', 'Repriorização'],
        ].map(([line, concept]) => (
          <p key={concept}>{line} <strong>→ {concept}</strong></p>
        ))}
      </div>
      <blockquote>
        <strong>Agilidade não é prever perfeitamente o caminho.</strong>
        <strong>É construir capacidade para aprender enquanto caminhamos.</strong>
      </blockquote>
    </section>
  )
}

function eventMapForSprint(sprint) {
  const allEvents = []
  if (sprint >= 2) allEvents.push(...sprint2Events.map((event) => ({ ...event, sprint: 2 })))
  if (sprint >= 3) allEvents.push(...sprint3Events.map((event) => ({ ...event, sprint: 3 })))
  return allEvents.reduce((map, event) => {
    map[event.studentId] = map[event.studentId] ? { ...event, description: `${map[event.studentId].description} ${event.description}` } : event
    return map
  }, {})
}

export default App

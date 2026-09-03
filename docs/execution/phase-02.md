# Evolução do encerramento · Coletivo Educação

Quero melhorar o encerramento da experiência pedagógica existente no projeto React + Vite.

IMPORTANTE:

O projeto já passou por uma primeira implementação e está em processo de validação humana.

A estrutura atual das três sprints está aprovada conceitualmente.

NÃO quero:

* reconstruir a aplicação;
* redesenhar as Sprints 1, 2 ou 3;
* alterar desnecessariamente componentes existentes;
* substituir a arquitetura atual por outra;
* remover funcionalidades já implementadas;
* fazer refactors grandes apenas por preferência técnica.

Quero uma evolução incremental.

Antes de modificar qualquer arquivo:

1. inspecione a implementação atual;
2. identifique como Intro, Sprint 1, Sprint 2, Sprint 3 e Finish estão organizadas;
3. identifique como o estado global e o localStorage estão implementados;
4. identifique como os status 🟢 🟡 🔴 🔵 são armazenados;
5. identifique como os códigos de acesso funcionam;
6. identifique o componente/tela atual de encerramento;
7. reutilize componentes existentes sempre que fizer sentido.

O objetivo desta tarefa é tornar o **encerramento pedagogicamente mais significativo**.

---

# 1. CONTEXTO DA EXPERIÊNCIA

A aplicação faz parte do:

**Coletivo Educação**

A atividade é destinada a aproximadamente 90 profissionais/docentes do Senac.

Durante a experiência, os participantes acompanham uma turma fictícia de 30 estudantes.

Eles passam por três sprints.

Ao longo dessas sprints:

* analisam evidências;
* levantam hipóteses;
* priorizam situações;
* criam um backlog;
* recebem novas informações;
* revisam decisões;
* abandonam algumas ações;
* alteram outras;
* descobrem novas prioridades;
* enfrentam uma crise inesperada.

As decisões do backlog são classificadas por:

🟢 Permaneceu
🟡 Foi alterado
🔴 Foi abandonado
🔵 Apareceu depois

Esses marcadores descrevem **decisões**, nunca estudantes.

---

# 2. PROBLEMA DO ENCERRAMENTO ATUAL

O encerramento não deve ser apenas uma tela dizendo:

“Isso foi Agile.”

Também não queremos terminar apenas apresentando conceitos como:

* backlog;
* sprint;
* feedback;
* inspeção;
* adaptação;
* priorização.

Esses conceitos devem aparecer, mas não podem ser o ponto final.

Queremos que a experiência faça um último movimento:

```text
TURMA FICTÍCIA
      ↓
EXPERIÊNCIA DA SQUAD
      ↓
PRÁTICA REAL DOS PROFISSIONAIS
```

A turma fictícia foi o laboratório.

Agora o participante deve olhar para a própria prática.

---

# 3. NOVO CONCEITO DE ENCERRAMENTO

Depois da última sprint, iniciaremos uma espécie de:

**Sprint 4 invisível**

NÃO utilizar necessariamente o termo “Sprint 4” na interface.

Ela será uma:

# Retrospectiva de Práxis

O objetivo será aplicar a mesma linguagem usada para analisar o backlog da turma à própria prática profissional.

Os quatro status serão ressignificados:

### 🟢 PERMANECE

O que já fazemos em nossa prática e vale preservar?

### 🟡 PRECISA MUDAR

O que fazemos atualmente, mas poderia ser revisto ou adaptado?

### 🔴 PODE SER ABANDONADO

Que hábito, processo, prática ou maneira de agir talvez já não produza o valor esperado?

### 🔵 PRECISA APARECER

Que nova prática gostaríamos de experimentar?

---

# 4. IMPORTANTE: NÃO É UMA PESQUISA DE SATISFAÇÃO

Essa tela não deve parecer:

* formulário de avaliação;
* pesquisa institucional;
* NPS;
* questionário pós-curso.

Ela deve parecer a **continuação natural da experiência**.

Os mesmos símbolos usados no backlog retornam.

Mas agora eles mudaram de objeto.

Antes:

```text
🟡 Esta decisão sobre a turma mudou.
```

Agora:

```text
🟡 O que em nossa própria prática precisa mudar?
```

Essa transição deve ser clara na narrativa.

---

# 5. FLUXO DO NOVO ENCERRAMENTO

O fluxo completo após a última sprint deverá ser:

```text
SPRINT 3
   ↓
código TRANSFORMACAO
   ↓
TRANSIÇÃO
   ↓
REVELAÇÃO DA EXPERIÊNCIA
   ↓
RETROSPECTIVA DE PRÁXIS
   ↓
ESCOLHA DE UMA ÚNICA MUDANÇA
   ↓
MICROEXPERIMENTO
   ↓
CONTRIBUIÇÃO COLETIVA
   ↓
SÍNTESE AGILE + PRÁXIS
   ↓
TELA FINAL
```

Para quem encerra na Sprint 2 com o código `AUTONOMIA`, adaptar o mesmo conceito para duas sprints.

---

# 6. TRANSIÇÃO APÓS O CÓDIGO TRANSFORMACAO

Atualmente o código:

`TRANSFORMACAO`

finaliza a experiência.

Modificar esse comportamento.

O código não deve levar imediatamente para uma página de “fim”.

Deve levar para uma tela intermediária.

---

# 7. PRIMEIRA TELA DO ENCERRAMENTO

Criar uma tela visualmente simples.

Pouca informação.

Muito espaço.

Título:

# A turma era fictícia.

Depois, com um pequeno delay ou transição:

# As decisões, não.

Texto:

> Durante as últimas sprints, vocês observaram, levantaram hipóteses, priorizaram, receberam novas informações e mudaram de direção.
>
> Algumas decisões permaneceram.
>
> Algumas mudaram.
>
> Algumas foram abandonadas.
>
> Outras só apareceram porque vocês aprenderam algo novo.

Depois:

> Agora vamos usar a mesma lógica olhando para a nossa própria prática.

Botão:

**Continuar**

Evitar grandes animações.

Pode utilizar fade/slide extremamente discreto.

---

# 8. MOSTRAR PRIMEIRO O QUE A EQUIPE FEZ

Antes da retrospectiva, apresentar brevemente alguns dados derivados do backlog real do grupo.

Exemplo:

```text
SUA JORNADA

5 decisões iniciais

3 permaneceram

4 foram alteradas ao longo da experiência

2 foram abandonadas

3 novas decisões apareceram
```

Os números NÃO podem ser hardcoded.

Derivar do histórico real.

Também mostrar:

```text
3 sprints concluídas
```

ou:

```text
2 sprints concluídas
```

dependendo do caminho realizado.

Não transformar isso em gamificação.

Não existem:

* pontos;
* ranking;
* score;
* desempenho;
* certo ou errado.

São apenas rastros da trajetória.

---

# 9. PRIMEIRA REVELAÇÃO CONCEITUAL

Depois dos dados:

Título:

# O backlog mudou.

Texto:

> Isso não significa que o primeiro plano estava errado.
>
> Significa que vocês aprenderam.

Depois:

**Vocês acabaram de experimentar um princípio fundamental da Agilidade:**

> tomar decisões com as informações disponíveis e desenvolver capacidade para revisá-las quando a realidade muda.

Botão:

**E agora?**

---

# 10. TRANSIÇÃO DA SIMULAÇÃO PARA A REALIDADE

Ao clicar em “E agora?”:

Título:

# Agora o backlog é de vocês.

Texto:

> Olhem para a prática educacional de vocês.
>
> Não para os estudantes fictícios.
>
> Não para o exercício.
>
> Para o trabalho que acontece todos os dias.

Pergunta:

> O que vale manter, mudar, abandonar ou fazer aparecer?

Botão:

**Iniciar retrospectiva**

---

# 11. COMPONENTE RETROSPECTIVA DE PRÁXIS

Criar um componente reutilizável.

Sugestão:

`PraxisRetrospective`

ou nome equivalente de acordo com a arquitetura atual.

A tela deve apresentar quatro áreas.

---

# 12. 🟢 PERMANECE

Título:

### 🟢 Permanece

Pergunta:

> O que já fazemos em nossa prática e vale preservar?

Campo de texto.

Placeholder:

> Uma prática, comportamento ou processo que já gera valor...

Permitir texto curto ou médio.

Não exigir múltiplos itens.

Uma resposta já é suficiente.

---

# 13. 🟡 PRECISA MUDAR

Título:

### 🟡 Precisa mudar

Pergunta:

> O que fazemos hoje, mas poderia ser revisto?

Placeholder:

> Algo que funciona parcialmente ou precisa se adaptar...

---

# 14. 🔴 PODE SER ABANDONADO

Título:

### 🔴 Pode ser abandonado

Pergunta:

> O que talvez estejamos mantendo apenas porque sempre fizemos assim?

Placeholder:

> Um hábito, processo ou prática que talvez já não gere o valor esperado...

IMPORTANTE:

Não utilizar linguagem acusatória.

Não sugerir que práticas institucionais devam necessariamente ser abandonadas.

Estamos perguntando sobre reflexão profissional.

---

# 15. 🔵 PRECISA APARECER

Título:

### 🔵 Precisa aparecer

Pergunta:

> Que nova prática deveríamos experimentar?

Placeholder:

> Algo pequeno que ainda não fazemos, mas poderia valer um teste...

Esta resposta terá importância especial depois.

---

# 16. RESPONSIVIDADE DA RETROSPECTIVA

Em desktop:

usar quatro cards ou quatro áreas visualmente relacionadas.

Pode ser:

```text
🟢           🟡
Permanece   Mudar


🔴           🔵
Abandonar   Aparecer
```

ou uma linha com quatro colunas se houver espaço suficiente.

Em telas menores:

empilhar.

Não depender da cor.

Sempre:

ícone + título + descrição.

---

# 17. SALVAR RETROSPECTIVA

Persistir respostas no estado/localStorage.

Adicionar algo conceitualmente equivalente a:

```js
praxisRetrospective: {
  keep: "",
  change: "",
  abandon: "",
  emerge: ""
}
```

Seguir o padrão atual do projeto.

Não criar um segundo mecanismo de persistência.

---

# 18. BOTÃO DE AVANÇO

Depois de preencher a retrospectiva:

Botão:

**Continuar**

Não é necessário obrigar preenchimento das quatro respostas.

Porém:

para avançar para o microexperimento, deve existir pelo menos uma resposta em:

🟡 Precisa mudar

OU

🔵 Precisa aparecer.

Se nenhuma existir:

mostrar:

> Escolha pelo menos uma mudança ou uma nova prática que valha experimentar.

---

# 19. A RESTRIÇÃO FINAL

Depois da retrospectiva, criar uma nova tela.

Título:

# Vocês não podem mudar tudo.

Texto:

> Assim como no backlog da turma, existe uma capacidade limitada.
>
> Escolher também significa deixar algumas possibilidades para depois.

Depois:

# Escolham apenas uma.

Mostrar como opções apenas os conteúdos preenchidos em:

🟡 Precisa mudar

e

🔵 Precisa aparecer.

Exemplo:

```text
○ 🟡 Dar feedback com maior frequência

○ 🔵 Fazer diagnóstico inicial das expectativas da turma
```

O grupo escolhe apenas uma.

---

# 20. REPRESENTAÇÃO NO ESTADO

Salvar:

```js
selectedExperimentSource: "change" | "emerge"
selectedExperimentText: "..."
```

ou estrutura equivalente.

---

# 21. TELA DO MICROEXPERIMENTO

Depois da seleção:

Título:

# Transforme intenção em experimento.

Texto:

> Não precisamos de um plano perfeito.
>
> Precisamos de um primeiro passo pequeno o suficiente para ser testado.

Criar quatro campos.

---

# 22. CAMPO 1

### O que vamos experimentar?

Pré-preencher com a opção selecionada.

Permitir edição.

---

# 23. CAMPO 2

### Por que acreditamos que isso pode ajudar?

Placeholder:

> Qual problema, necessidade ou oportunidade estamos tentando compreender?

---

# 24. CAMPO 3

### Qual é o menor primeiro passo?

Placeholder:

> Algo que poderia realmente ser realizado sem depender de uma grande mudança estrutural...

Essa pergunta é especialmente importante.

O objetivo é evitar respostas gigantes como:

“Transformar todo o processo pedagógico.”

Queremos algo próximo de:

> Fazer uma conversa de expectativas nos primeiros 20 minutos da próxima turma.

ou:

> Experimentar feedback individual curto ao final de uma atividade.

---

# 25. CAMPO 4

### Que evidência vamos observar?

Placeholder:

> O que poderia indicar que vale continuar, adaptar ou abandonar o experimento?

Não usar:

“KPI”

a menos que já seja parte da linguagem atual.

Preferir:

**evidência**.

---

# 26. ESTRUTURA DO MICROEXPERIMENTO

Persistir algo semelhante a:

```js
praxisExperiment: {
  idea: "",
  reason: "",
  firstStep: "",
  evidence: ""
}
```

---

# 27. CARD FINAL DO EXPERIMENTO

Depois de preencher:

mostrar uma síntese visual.

Exemplo:

```text
NOSSO PRÓXIMO EXPERIMENTO

🔵 Fazer diagnóstico inicial das expectativas da turma.

POR QUÊ
Queremos compreender melhor...

PRIMEIRO PASSO
Reservar 20 minutos...

EVIDÊNCIA
Observar se...
```

Botão:

**Assumir este experimento**

Não utilizar:

“Salvar projeto”
ou
“Concluir tarefa”.

O caráter deve continuar pedagógico/narrativo.

---

# 28. CONTRIBUIÇÃO AO COLETIVO

Depois do microexperimento:

criar uma etapa curta.

Título:

# E o coletivo?

Texto:

> Cada grupo chegou até aqui por um caminho diferente.
>
> Agora queremos registrar apenas uma contribuição para o grupo inteiro.

Pergunta:

# O que precisa aparecer em nossa prática?

Pré-preencher com o conteúdo de:

🔵 `Precisa aparecer`

Se o grupo não tiver preenchido 🔵, permitir escrever agora.

Campo:

```text
Nossa contribuição para o coletivo:
________________________
```

Limitar de forma amigável o tamanho.

Sugestão:

até aproximadamente 160 caracteres.

A ideia é produzir frases curtas.

---

# 29. IMPORTANTE SOBRE O PAINEL COLETIVO

Nesta etapa o projeto NÃO possui necessariamente backend.

Portanto NÃO inventar sincronização entre dispositivos.

Não implementar Firebase, Supabase, WebSocket ou servidor apenas para esta feature.

Preparar o código para que essa contribuição possa futuramente ser enviada a uma API.

Criar uma função/abstração simples.

Exemplo conceitual:

```js
submitCollectiveContribution(contribution)
```

Por enquanto ela pode:

1. salvar localmente;
2. retornar sucesso local.

Adicionar comentário/TODO claro indicando onde uma API futura pode ser integrada.

---

# 30. VISUALIZAÇÃO LOCAL DA CONTRIBUIÇÃO

Após confirmar:

mostrar:

> Sua contribuição foi registrada nesta experiência.

Exibir a frase.

Não dizer que foi enviada aos outros grupos se não existe backend.

Não criar falsa sincronização.

---

# 31. MODO FACILITADOR / FUTURO PAINEL

Preparar a arquitetura para futuramente existir algo como:

`/collective`

onde as contribuições de todas as squads possam aparecer.

MAS:

não é necessário implementar sistema multiusuário nesta tarefa.

Se for simples, pode criar apenas um componente:

`CollectiveContributionCard`

que futuramente possa ser reutilizado.

Não aumentar o escopo.

---

# 32. MOMENTO PAULO FREIRE

Depois da contribuição coletiva, criar uma transição conceitual curta.

Não transformar isso em aula teórica.

Tela:

# PRÁXIS

Subtítulo:

**Reflexão e ação sobre a realidade para transformá-la.**

Depois representar:

```text
OBSERVAR

↓

INTERPRETAR

↓

AGIR

↓

ENCONTRAR A REALIDADE

↓

REFLETIR

↓

AGIR NOVAMENTE
```

Visualmente, pode ser uma pequena timeline vertical ou horizontal.

Não precisa de ilustrações complexas.

---

# 33. CUIDADO CONCEITUAL

Não afirmar:

“Paulo Freire criou Agile.”

Não afirmar:

“Agile e Paulo Freire são a mesma coisa.”

Não afirmar equivalência histórica ou teórica.

A conexão deve ser apresentada como:

> Duas perspectivas diferentes que, nesta experiência, encontram um ponto de diálogo na relação entre reflexão, ação, aprendizagem e transformação.

Manter essa nuance.

---

# 34. CONEXÃO COM A EXPERIÊNCIA

Depois de PRÁXIS:

mostrar:

```text
Na atividade, vocês:

observaram a turma
↓
levantaram hipóteses
↓
agiram
↓
receberam novas informações
↓
revisaram decisões
↓
agiram novamente
```

Depois:

> A realidade devolveu informação.
>
> E vocês responderam a ela.

---

# 35. REVELAÇÃO AGILE

Somente agora mostrar explicitamente a tradução da experiência para conceitos de Agilidade.

Criar uma sequência.

### Vocês receberam um problema.

**Objetivo**

↓

### Tinham mais possibilidades que capacidade.

**Priorização**

↓

### Organizaram decisões.

**Backlog**

↓

### Trabalharam durante períodos curtos.

**Timebox**

↓

### Receberam novas informações.

**Feedback**

↓

### Revisaram o que sabiam.

**Inspeção**

↓

### Mudaram decisões.

**Adaptação**

↓

### Deixaram algumas ações para trás.

**Repriorização**

Não transformar isso em um glossário.

A ideia é:

**“Vocês viveram primeiro. Agora damos nome ao que aconteceu.”**

---

# 36. FRASE DE TRANSIÇÃO

Depois dessa sequência:

> Agile não apareceu quando usamos a palavra Sprint.
>
> Apareceu quando o plano deixou de ser mais importante do que aquilo que estávamos aprendendo.

Usar essa ideia como texto curto.

---

# 37. ÚLTIMA TELA

A última tela deve ser extremamente limpa.

Evitar:

* muitos cards;
* histórico;
* estatísticas;
* explicações;
* botões concorrentes.

Queremos uma sensação de fechamento.

---

# 38. TEXTO FINAL

Título:

# Agilidade não é ter certeza mais rápido.

Subtítulo grande:

# É aprender a mudar melhor.

Depois, menor:

> O próximo ciclo começa quando aquilo que aprendemos volta para a prática.

E finalmente:

> **Qual é a próxima hipótese que vale testar?**

---

# 39. ÚLTIMO ELEMENTO

Mostrar discretamente o experimento escolhido pela própria squad.

Exemplo:

```text
PRÓXIMO EXPERIMENTO

Fazer uma conversa sobre expectativas no início da próxima turma.
```

Isso cria continuidade entre formação e prática.

---

# 40. BOTÃO FINAL

Usar:

**Encerrar experiência**

Ao clicar:

não apagar dados.

Levar a uma tela final simples ou manter a página.

Oferecer discretamente:

**Rever nossa jornada**

e, se já existir essa funcionalidade:

**Reiniciar experiência**

Não resetar automaticamente.

---

# 41. ENCERRAMENTO PELO CÓDIGO AUTONOMIA

A Sprint 2 possui uma saída antecipada:

`AUTONOMIA`

Esse caminho deve utilizar o novo encerramento também.

Fluxo:

```text
SPRINT 2
 ↓
AUTONOMIA
 ↓
A turma era fictícia...
 ↓
Retrospectiva
 ↓
Microexperimento
 ↓
Contribuição
 ↓
Práxis
 ↓
Agilidade
 ↓
Tela final
```

Adaptar textos automaticamente.

Se foram feitas apenas duas sprints:

não dizer:

“Durante as três sprints...”

Usar:

“Durante as sprints...”

Os indicadores também precisam mostrar:

```text
2 sprints concluídas
```

---

# 42. TRANSFORMACAO E AUTONOMIA

Manter os dois significados narrativos.

### AUTONOMIA

encerra a experiência a partir da Sprint 2.

### TRANSFORMACAO

encerra a experiência completa após Sprint 3.

Os dois caminhos convergem para o mesmo:

`ClosingExperience`

Mas informando quantas sprints foram concluídas.

---

# 43. COMPONENTIZAÇÃO SUGERIDA

Não é obrigatório utilizar exatamente estes nomes.

Adaptar à arquitetura encontrada.

Possível estrutura:

```text
components/
  ClosingJourney/
    JourneySummary
    PraxisIntro
    PraxisRetrospective
    ExperimentSelection
    MicroExperiment
    CollectiveContribution
    PraxisReveal
    AgileReveal
    FinalMessage

pages/
  ClosingExperience
```

Evitar criar uma página para cada pequeno texto se isso complicar a navegação.

É aceitável implementar o fechamento como uma única página com:

```js
closingStep
```

Exemplo:

```text
0 summary
1 retrospective
2 selection
3 experiment
4 collective
5 praxis
6 agile
7 final
```

Escolher a solução que melhor combine com o projeto existente.

---

# 44. ESTADO DO ENCERRAMENTO

Integrar ao estado existente.

Estrutura conceitual:

```js
closing: {
  currentStep: 0,

  retrospective: {
    keep: "",
    change: "",
    abandon: "",
    emerge: ""
  },

  selectedExperiment: {
    source: null,
    text: ""
  },

  experiment: {
    idea: "",
    reason: "",
    firstStep: "",
    evidence: ""
  },

  collectiveContribution: "",

  completed: false
}
```

Adaptar ao padrão existente.

---

# 45. PERSISTÊNCIA

Toda essa etapa precisa sobreviver a refresh.

Se o usuário estiver:

* preenchendo retrospectiva;
* selecionando experimento;
* construindo microexperimento;
* na tela de práxis;

e atualizar o navegador:

deve retornar ao estado coerente.

Não necessariamente ao pixel exato.

Mas não pode perder as respostas.

---

# 46. BACK BUTTON

Se a interface atual possui navegação:

permitir voltar dentro do encerramento sem perder dados.

Exemplo:

```text
Retrospectiva
   ↓
Experimento
```

O usuário pode voltar e alterar uma resposta.

Se isso invalidar a seleção posterior:

atualizar de forma previsível.

Exemplo:

se o usuário apagar a opção que havia escolhido como experimento:

solicitar nova seleção.

---

# 47. PROGRESSO

Durante as sprints existe indicador de Sprint.

No encerramento, NÃO continuar mostrando:

`Sprint 3 / 3`

como principal progresso.

Trocar por algo mais sutil.

Exemplo:

```text
ENCERRAMENTO
Refletir → Escolher → Experimentar → Conectar
```

Ou simplesmente uma barra discreta.

Não queremos parecer formulário burocrático.

---

# 48. TIMER

Não utilizar timer no encerramento por padrão.

As sprints possuem timebox.

A reflexão final deve ter outro ritmo.

Se já existir timer global no layout:

ocultá-lo nessa etapa.

---

# 49. VISUAL

Reutilizar design system atual.

Não criar uma identidade completamente diferente.

Porém o encerramento pode progressivamente ficar visualmente mais limpo.

Sugestão narrativa:

```text
Sprints:
densidade de informação maior.

↓

Retrospectiva:
menos elementos.

↓

Práxis:
mais espaço.

↓

Tela final:
quase vazia.
```

A própria interface vai “respirando” conforme a experiência termina.

---

# 50. MICROINTERAÇÕES

Permitidas:

* fade;
* pequenos movimentos;
* mudança suave entre etapas;
* destaque ao selecionar experimento.

Evitar:

* confete;
* fogos;
* gamificação;
* sons;
* animações celebratórias;
* badges;
* medalhas.

Não é uma competição.

---

# 51. ACESSIBILIDADE

Os quatro status continuam sendo:

ícone + texto + cor.

Nunca depender somente das cores.

Garantir:

* navegação por teclado;
* labels corretos;
* foco visível;
* contraste;
* campos associados às perguntas;
* estados de erro acessíveis;
* responsividade.

---

# 52. DADOS DERIVADOS DA JORNADA

Criar uma função utilitária para calcular o resumo da jornada.

Algo conceitualmente parecido com:

```js
getJourneySummary(backlogHistory)
```

Retornar:

```js
{
  initialDecisions,
  kept,
  changed,
  abandoned,
  emerged,
  completedSprints
}
```

Cuidado:

uma mesma decisão pode ter mudado mais de uma vez.

Definir claramente o significado dos números.

Sugestão:

### initialDecisions

quantidade criada na Sprint 1.

### kept

quantidade de eventos de revisão marcados como “permaneceu”.

### changed

quantidade de eventos marcados como “alterado”.

### abandoned

quantidade de decisões que terminaram abandonadas ou número de eventos, dependendo de como o histórico atual funciona.

### emerged

quantidade de decisões cujo `createdAtSprint > 1`.

Antes de implementar o cálculo:

inspecionar o modelo real do histórico e escolher a semântica mais coerente.

Não quebrar o modelo existente apenas para alcançar essa estrutura.

---

# 53. NÃO INVENTAR RESULTADOS

Nunca mostrar frases como:

“Vocês melhoraram a permanência em 30%.”

ou:

“Sua grupo foi altamente ágil.”

Não existe informação que permita isso.

A aplicação relata:

**o processo de decisão.**

Não mede qualidade da equipe.

---

# 54. POSSÍVEL FUTURA EXPERIÊNCIA COLETIVA

O desenho deve considerar que futuramente os 15 grupos poderão enviar o campo:

🔵 **Precisa aparecer**

para um painel central.

Esse painel poderia resultar em:

# O que precisa aparecer em nossa prática?

com aproximadamente 15 contribuições.

Nesta tarefa:

NÃO implementar infraestrutura multiusuário.

Somente preparar:

* estrutura de dados;
* função de submissão;
* componente de contribuição.

Adicionar TODO claro para futura API.

---

# 55. NÃO ALTERAR O CORE DAS SPRINTS

Durante esta implementação:

não modificar regras pedagógicas das Sprints 1, 2 e 3, exceto o mínimo necessário para conectar o novo encerramento.

Principalmente preservar:

* 30 estudantes;
* backlog;
* máximo de cinco frentes ativas;
* eventos da Sprint 2;
* crise da Sprint 3;
* histórico;
* 🟢 🟡 🔴 🔵;
* códigos;
* timer;
* localStorage.

---

# 56. CRITÉRIOS DE ACEITE

A feature está pronta quando for possível executar:

## Caminho completo

1. concluir Sprint 3;
2. inserir `TRANSFORMACAO`;
3. não cair diretamente em uma tela simples de fim;
4. visualizar “A turma era fictícia. As decisões, não.”;
5. visualizar resumo real da jornada;
6. avançar para “Agora o backlog é de vocês”;
7. preencher retrospectiva 🟢 🟡 🔴 🔵;
8. selecionar apenas uma opção 🟡 ou 🔵;
9. transformar essa escolha em microexperimento;
10. registrar motivo;
11. registrar menor primeiro passo;
12. registrar evidência a observar;
13. visualizar card do experimento;
14. registrar contribuição para o coletivo;
15. visualizar momento PRÁXIS;
16. visualizar relação reflexão → ação → realidade → nova reflexão;
17. visualizar tradução da experiência para conceitos Agile;
18. chegar à frase final;
19. visualizar o próprio próximo experimento;
20. atualizar a página durante qualquer etapa sem perder as informações.

---

# 57. CRITÉRIOS DE ACEITE DO CAMINHO REDUZIDO

Também deve ser possível:

1. concluir Sprint 2;
2. inserir `AUTONOMIA`;
3. entrar no mesmo encerramento;
4. mostrar dados relativos somente às sprints realizadas;
5. executar retrospectiva;
6. criar experimento;
7. passar por PRÁXIS;
8. passar pela revelação Agile;
9. chegar à tela final;
10. não mencionar uma Sprint 3 não realizada.

---

# 58. TESTAR CASOS DE BORDA

Testar:

### Caso 1

Usuário preenche somente 🟢 e 🔴.

Ao tentar avançar:

pedir uma possibilidade de mudança 🟡 ou surgimento 🔵.

### Caso 2

Usuário escolhe 🟡 como experimento e depois volta e apaga essa resposta.

A seleção deve ser invalidada.

### Caso 3

Refresh durante microexperimento.

Dados permanecem.

### Caso 4

Refresh na tela PRÁXIS.

Retorna ao fechamento corretamente.

### Caso 5

Encerramento após Sprint 2.

Não referencia Sprint 3.

### Caso 6

Encerramento após Sprint 3.

Mostra jornada completa.

### Caso 7

Backlog sem determinados status.

Resumo mostra zero corretamente.

### Caso 8

Strings muito grandes.

Interface continua utilizável.

---

# 59. TESTES TÉCNICOS

Ao finalizar:

* executar lint se disponível;
* executar build;
* corrigir warnings relevantes introduzidos pela feature;
* verificar console;
* testar navegação;
* testar localStorage;
* testar responsividade;
* testar caminhos AUTONOMIA e TRANSFORMACAO;
* verificar acessibilidade básica;
* garantir que nenhuma tela anterior foi quebrada.

Não considerar concluído com build quebrado.

---

# 60. ORDEM RECOMENDADA DE IMPLEMENTAÇÃO

Trabalhar incrementalmente.

### Etapa 1

Inspecionar arquitetura atual.

### Etapa 2

Mapear fluxo atual de Finish.

### Etapa 3

Criar estado do encerramento.

### Etapa 4

Criar `ClosingExperience`.

### Etapa 5

Criar resumo derivado da jornada.

### Etapa 6

Criar Retrospectiva 🟢 🟡 🔴 🔵.

### Etapa 7

Criar seleção de uma única mudança.

### Etapa 8

Criar microexperimento.

### Etapa 9

Criar contribuição coletiva local.

### Etapa 10

Criar momento PRÁXIS.

### Etapa 11

Criar revelação Agile.

### Etapa 12

Criar tela final.

### Etapa 13

Integrar AUTONOMIA.

### Etapa 14

Integrar TRANSFORMACAO.

### Etapa 15

Persistência e casos de borda.

### Etapa 16

Refinamento visual.

### Etapa 17

Testes finais.

---

# 61. ANTES DE ALTERAR O CÓDIGO

Faça uma inspeção e registre brevemente:

1. como o fluxo de encerramento funciona hoje;
2. quais arquivos serão alterados;
3. quais arquivos serão criados;
4. como o estado será integrado;
5. como evitará regressões nas três sprints;
6. como os dois caminhos AUTONOMIA e TRANSFORMACAO convergirão.

Depois implemente.

Não interromper a implementação pedindo aprovação para cada passo.

---

# 62. PRINCÍPIO PEDAGÓGICO CENTRAL

Durante toda a implementação, lembre-se:

A primeira parte da experiência pergunta:

> **O que devemos fazer com essa turma?**

A última parte precisa perguntar:

> **O que faremos diferente em nossa própria prática?**

Esse deslocamento é o verdadeiro encerramento.

---

# 63. ARCO NARRATIVO COMPLETO

A aplicação inteira passa a contar esta história:

```text
OBSERVE

↓

DECIDA

↓

PRIORIZE

↓

AJA

↓

DESCUBRA ALGO NOVO

↓

REVISE

↓

MUDE

↓

OLHE PARA SUA PRÓPRIA PRÁTICA

↓

ESCOLHA UMA ÚNICA MUDANÇA

↓

TRANSFORME-A EM EXPERIMENTO

↓

VOLTE PARA A REALIDADE
```

O participante não deve sair apenas sabendo definir Agilidade.

Ele deve sair levando uma hipótese para testar.

---

# 64. RESULTADO EMOCIONAL E PEDAGÓGICO ESPERADO

Queremos evitar um encerramento com sensação de:

> “Acabou a dinâmica.”

Queremos algo mais próximo de:

> “A dinâmica acabou, mas o próximo ciclo começa na minha prática.”

A tecnologia deve desaparecer progressivamente do centro da experiência.

No final, o que importa não é o backlog fictício.

É a pergunta que cada grupo leva consigo.

---

# 65. FRASE FINAL DA EXPERIÊNCIA

A última tela deve terminar com:

# Agilidade não é ter certeza mais rápido.

# É aprender a mudar melhor.

E abaixo:

> **Qual é a próxima hipótese que vale testar?**

Essa deve ser a última pergunta da aplicação.

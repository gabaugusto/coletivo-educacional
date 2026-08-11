# Implementação da experiência pedagógica “Coletivo Educação · Metodologia Ágil”

Quero transformar a estrutura React + Vite existente em uma experiência pedagógica guiada por storytelling, organizada em três sprints.

## 1. Contexto do projeto

Este projeto será utilizado em uma atividade presencial com aproximadamente 90 profissionais/docentes do Senac.

A dinâmica dura cerca de 120 minutos e tem como objetivo permitir que os participantes experimentem conceitos de Metodologia Ágil a partir de um caso fictício relacionado à gestão da permanência de estudantes.

Os participantes trabalharão em grupos.

Ao longo da experiência:

1. recebem informações iniciais sobre uma turma fictícia;
2. analisam estudantes e evidências;
3. criam um backlog de ações;
4. recebem novas informações;
5. revisam decisões anteriores;
6. enfrentam uma mudança mais séria de cenário;
7. precisam novamente priorizar, abandonar ou modificar decisões.

A experiência deve comunicar a ideia de:

> planejar → agir → receber novas informações → inspecionar → adaptar

Não queremos apresentar tudo de uma vez.

A aplicação deve revelar a história progressivamente.

---

# 2. Estado atual do projeto

O projeto já foi criado utilizando:

* React;
* Vite.

Não recrie o projeto.

Não substitua a configuração existente sem necessidade.

Dentro da pasta:

`src/`

já existe um arquivo chamado:

`students`

Esse arquivo contém os 30 estudantes fictícios e deve ser considerado a fonte principal de dados da turma.

ANTES de implementar qualquer coisa:

1. inspecione a estrutura atual do projeto;
2. localize o arquivo `students`;
3. entenda seu formato;
4. reutilize os dados existentes;
5. não duplique os 30 estudantes em outro arquivo sem necessidade.

Se pequenos adapters forem necessários para consumir os dados, crie-os separadamente, preservando a fonte original.

---

# 3. Objetivo desta implementação

Criar uma experiência navegável composta por:

* Introdução;
* Sprint 1;
* Transição;
* Sprint 2;
* possível encerramento antecipado;
* transição;
* Sprint 3;
* encerramento.

A interface deve dar a sensação de que os participantes estão acompanhando uma turma ao longo do tempo.

Cada sprint deve reutilizar o mesmo modelo mental:

**Contexto + estudantes + evidências + backlog + entregável + tempo restante**

Mas os dados e desafios evoluem.

---

# 4. Princípio central de UX

Não construir três páginas totalmente independentes.

Construir uma experiência contínua.

Os participantes devem perceber:

> “Esta é a mesma turma, mas agora sabemos mais sobre ela.”

Portanto:

* estudantes continuam reconhecíveis entre as sprints;
* decisões anteriores continuam existindo;
* backlog anterior deve continuar disponível;
* alterações precisam ser visualmente identificáveis;
* novas informações devem parecer realmente novas;
* decisões abandonadas não devem desaparecer.

O histórico de pensamento é parte do aprendizado.

---

# 5. Estados principais da aplicação

A aplicação pode ser pensada como uma máquina de estados simples:

```text
INTRO
 ↓
SPRINT_1
 ↓
TRANSITION_1
 ↓
SPRINT_2
 ├──→ FINISH_EARLY
 │
 └──→ TRANSITION_2
       ↓
     SPRINT_3
       ↓
     FINISH
```

Não é obrigatório utilizar uma biblioteca de state machine.

Pode ser React state/context + localStorage.

Priorizar simplicidade.

---

# 6. Persistência

As decisões tomadas pelo grupo não podem desaparecer caso a página seja atualizada acidentalmente.

Utilizar:

`localStorage`

para persistir pelo menos:

* sprint atual;
* backlog;
* decisões;
* status das decisões;
* histórico de alterações;
* tempo inicial da sprint, se necessário;
* progresso da experiência.

Criar uma estrutura clara de armazenamento.

Exemplo conceitual:

```js
{
  currentSprint: 1,
  backlog: [],
  history: [],
  startedAt: ...,
  sprintStartedAt: ...
}
```

Não é necessário backend nesta etapa.

---

# 7. Página inicial

Criar uma tela extremamente simples.

Ela é a porta de entrada para a experiência.

Não apresentar os 30 estudantes ainda.

## Conteúdo sugerido

Título:

**Coletivo Educação**

Subtítulo:

**Uma experiência sobre decisões, pessoas e adaptação.**

Texto curto:

> Você e sua equipe irão acompanhar uma turma ao longo de diferentes acontecimentos.
>
> Nem todas as informações estarão disponíveis desde o início.
>
> Observem. Priorizem. Decidam.
>
> E estejam preparados para rever suas certezas.

Botão principal:

**Começar**

Não explicar Agile profundamente aqui.

A metodologia deve inicialmente ser vivida.

Ao clicar em “Começar”:

→ entrar na Sprint 1.

---

# 8. Configuração global das sprints

Criar um arquivo de configuração central.

Exemplo:

`src/config/sprints.js`

ou equivalente.

Não espalhar tempos pelo código.

Algo conceitualmente parecido com:

```js
export const SPRINT_CONFIG = {
  sprint1: {
    durationMinutes: 20
  },

  sprint2: {
    durationMinutes: 20
  },

  sprint3: {
    durationMinutes: 20
  }
}
```

O tempo deve poder ser alterado facilmente por uma única variável/configuração.

Também criar configuração para códigos de progressão.

Exemplo:

```js
export const ACCESS_CODES = {
  sprint1ToSprint2: "DIALOGO",

  sprint2ToSprint3: "PRAXIS",

  sprint2ToFinish: "AUTONOMIA",

  sprint3ToFinish: "TRANSFORMACAO"
}
```

Os valores acima podem ser utilizados nesta primeira implementação.

Importante:

* comparar códigos ignorando maiúsculas/minúsculas;
* remover espaços externos;
* idealmente normalizar acentos.

Os códigos devem ser fáceis para o facilitador alterar depois.

---

# 9. Conceito dos códigos

Os códigos de passagem devem remeter ao repertório de Paulo Freire.

Usar inicialmente:

### Sprint 1 → Sprint 2

`DIALOGO`

### Sprint 2 → Sprint 3

`PRAXIS`

### Sprint 2 → Encerramento antecipado

`AUTONOMIA`

### Sprint 3 → Encerramento

`TRANSFORMACAO`

Não mostrar esses códigos explicitamente na interface antes da hora.

Eles serão fornecidos oralmente ou projetados pelo facilitador.

---

# 10. Estrutura comum das páginas de sprint

Criar um layout reutilizável.

Sugestão:

`SprintLayout`

Cada sprint deve conter:

## Header

* identificação da atividade;
* indicador da sprint atual;
* tempo restante;
* progresso visual.

Exemplo:

```text
COLETIVO EDUCAÇÃO

SPRINT 1 / 3

18:42 restantes
```

---

# 11. Timer

O timer é pedagogicamente importante.

Criar um componente reutilizável:

`SprintTimer`

Ele deve:

* receber duração via configuração;
* contar regressivamente;
* mostrar minutos e segundos;
* sobreviver a refresh utilizando timestamp salvo;
* não reiniciar automaticamente ao atualizar a página;
* indicar visualmente quando o tempo estiver próximo do fim.

Estados sugeridos:

### normal

mais de 5 minutos.

### atenção

menos de 5 minutos.

### crítico

menos de 1 minuto.

Quando chegar a zero:

não bloquear a aplicação.

Mostrar:

**Tempo encerrado**

Mas permitir que o grupo continue interagindo.

O facilitador controla o ritmo real da experiência.

---

# 12. Bloco “Sua missão”

Em todas as sprints deve existir um bloco visível contendo:

* objetivo;
* desafio;
* entregável;
* capacidade máxima.

Isso deve permanecer acessível enquanto os participantes trabalham.

Pode ser sticky no desktop.

Exemplo da Sprint 1:

## Sua missão

Analise a turma e identifique situações que merecem atenção.

### Entregável

Crie um backlog com no máximo **5 frentes prioritárias**.

Para cada uma, registre:

* evidência;
* hipótese;
* ação;
* prioridade.

### Importante

Não tente resolver tudo.

**Priorizar também significa escolher o que não fazer agora.**

---

# 13. Sprint 1

## Storytelling

Título:

**Sprint 1 · Conheça sua turma**

Introdução:

> Você acaba de começar a acompanhar esta turma.
>
> Existem 30 estudantes, diferentes trajetórias e alguns sinais que podem ou não exigir atenção.
>
> Neste momento, estas são todas as informações disponíveis.

Pergunta central:

> **Quais situações exigem atenção agora?**

---

# 14. Área dos estudantes

Consumir os dados diretamente do arquivo `students`.

Criar cards claros e escaneáveis.

Cada estudante deve apresentar os dados disponíveis no dataset, como:

* nome;
* idade;
* frequência;
* entregas;
* participação;
* evidência recente;
* contexto conhecido.

Não apresentar automaticamente uma classificação como:

* estudante em risco;
* provável evasão;
* problema;
* crítico.

Isso é intencional.

Queremos que os participantes interpretem evidências.

---

# 15. Filtros

Adicionar filtros simples.

Pelo menos:

* busca por nome;
* frequência;
* participação;
* entregas, se fizer sentido com a estrutura dos dados.

Não criar algoritmos automáticos de “risco”.

---

# 16. Adicionando estudante/situação ao backlog

Cada estudante deve possuir uma ação:

**Adicionar ao backlog**

Ao clicar:

abrir um pequeno modal/drawer ou adicionar diretamente ao painel lateral.

Criar um item de backlog contendo:

```js
{
  id,
  studentId,
  studentName,

  evidence,
  hypothesis,
  action,

  priority,

  createdAtSprint: 1,

  currentStatus,

  history: []
}
```

---

# 17. Evidência e hipótese são diferentes

Na UI isso precisa ficar muito claro.

### Evidência

“O que sabemos?”

### Hipótese

“O que acreditamos que pode estar acontecendo?”

### Ação

“O que faremos agora?”

Essa distinção é importante pedagogicamente.

---

# 18. Limite do backlog

Sprint 1:

máximo de **5 itens ativos**.

Se o grupo tentar adicionar o sexto:

não bloquear de forma seca.

Mostrar algo como:

> Sua equipe já possui cinco prioridades.
>
> Para adicionar uma nova frente, revise suas escolhas atuais.

Oferecer acesso direto ao backlog.

---

# 19. Layout Sprint 1

Em desktop, priorizar uma estrutura parecida com:

```text
-------------------------------------------------
 MISSÃO + TIMER
-------------------------------------------------

 ESTUDANTES                         BACKLOG
                             
 [cards]                       B01
 [cards]                       B02
 [cards]                       B03
 [cards]                       B04
 [cards]                       B05

-------------------------------------------------
 FINALIZAR SPRINT
-------------------------------------------------
```

O backlog deve permanecer fácil de visualizar enquanto os estudantes são analisados.

Pode usar:

* painel lateral;
* drawer persistente;
* coluna sticky.

Escolher a abordagem que produzir melhor UX.

---

# 20. Final da Sprint 1

No fim da página ou em uma área bem definida:

Título:

**Preparados para avançar?**

Texto:

> Quando o facilitador liberar a próxima etapa, insira o código abaixo.

Campo:

`Código da próxima etapa`

Botão:

**Avançar**

Código esperado:

`DIALOGO`

Se estiver incorreto:

mostrar apenas:

**Código não reconhecido.**

Não revelar o código correto.

Se correto:

mostrar uma pequena tela/interstício.

---

# 21. Transição Sprint 1 → Sprint 2

Não levar imediatamente para a tela cheia.

Mostrar um momento narrativo.

Exemplo:

# O cenário mudou.

> Vocês tomaram decisões com as informações disponíveis.
>
> Agora surgiram novos dados.
>
> Algumas hipóteses podem ganhar força.
>
> Outras talvez deixem de fazer sentido.

Botão:

**Ver novas informações**

---

# 22. Sprint 2

Título:

**Sprint 2 · Novas informações**

Pergunta central:

> **O que muda quando sabemos mais?**

A estrutura visual deve continuar semelhante à Sprint 1.

Não queremos que pareça outro sistema.

---

# 23. Novos acontecimentos dos estudantes

Na Sprint 2, 14 estudantes possuem novas manifestações/cenários.

Essas informações devem ser armazenadas separadamente do dataset original.

Exemplo:

`src/data/sprint2Events.js`

Relacionar pelo `studentId`.

Não modificar destrutivamente o arquivo original `students`.

Exemplo:

```js
{
  studentId: "A08",
  type: "new_evidence",
  description: "Diz que ainda não percebe..."
}
```

---

# 24. Os 14 acontecimentos da Sprint 2

Utilizar estes acontecimentos:

### A08 · Henrique

Diz que ainda não percebe como o conteúdo se conecta ao trabalho que realiza hoje.

### A11 · Karen

Relata que está cansada de organizar o grupo e que as tarefas não estão sendo divididas de forma justa.

### A13 · Mariana

Informa que talvez precise faltar em mais encontros nas próximas semanas.

### A16 · Paulo

Pede para trocar de grupo após um desentendimento que não havia sido comunicado antes.

### A19 · Sofia

Pergunta se existe possibilidade de migrar para outro curso que pareça mais próximo de suas expectativas.

### A23 · Wesley

Não comparece a mais um encontro e não responde ao primeiro contato feito pela equipe.

### A05 · Eduarda

Dois colegas dizem que evitam discordar dela porque as decisões acabam sendo centralizadas.

### A10 · João Pedro

Responde que está “tentando organizar algumas coisas” e não sabe se conseguirá manter a frequência.

### A17 · Queila

Diz que está sobrecarregada por fazer tarefas que deveriam estar distribuídas entre colegas.

### A20 · Thiago

Pede ajuda para entender como quebrar uma entrega grande em etapas menores.

### A22 · Vinícius

Informa que continuará chegando atrasado em dois dias específicos por causa do deslocamento.

### A25 · Arthur

Relata novo bloqueio de acesso à plataforma usada no projeto.

### A29 · Enzo

Seu grupo afirma que ele inicia muitas frentes e deixa tarefas sem fechamento.

### A30 · Fernanda

Pergunta à equipe se concluir o curso ainda faz sentido para os objetivos profissionais que está reconsiderando.

---

# 25. Como mostrar novidades

Os cards desses estudantes devem deixar visualmente evidente:

**NOVA INFORMAÇÃO**

Mas sem transmitir automaticamente “gravidade”.

Pode existir algo como:

```text
Henrique

[dados anteriores]

──────────────

NOVA INFORMAÇÃO · SPRINT 2

“Diz que ainda não percebe como o conteúdo se conecta...”
```

Evitar vermelho automaticamente.

Novo não significa crítico.

---

# 26. Documentos norteadores

Sprint 2 também deve possuir uma área para:

**Documentos / Diretrizes**

Nesta implementação, criar a estrutura visual mesmo que o conteúdo completo ainda não esteja pronto.

Pode ser um drawer/modal/sidebar:

**Consultar documentos norteadores**

Preparar o código para receber posteriormente uma lista como:

```js
{
  id,
  title,
  summary,
  source,
  content
}
```

Não inventar documentos institucionais.

Se não houver conteúdo real no projeto, utilizar placeholders explícitos como:

**“Conteúdo institucional será inserido posteriormente.”**

---

# 27. O backlog continua existindo

Muito importante:

NÃO criar um backlog novo na Sprint 2.

Carregar o backlog da Sprint 1.

Agora cada decisão deve poder ser revisada.

---

# 28. Sistema de revisão

Na Sprint 2, cada item pode receber:

### 🟢 Permaneceu

A decisão continua essencialmente igual.

### 🟡 Foi alterado

A decisão continua válida, mas algo mudou:

* hipótese;
* ação;
* prioridade;
* responsável;
* forma de acompanhamento.

### 🔴 Foi abandonado

A decisão deixou de fazer sentido ou perdeu prioridade.

### 🔵 Apareceu depois

É uma decisão que não existia na Sprint 1 e surgiu a partir das novas informações.

---

# 29. Regra fundamental dos status

Os marcadores classificam:

**DECISÕES**

Não classificam estudantes.

Não mostrar:

```text
🔴 João Pedro
```

Mostrar:

```text
B03 · Conversar individualmente com João Pedro

🟡 Foi alterado
```

---

# 30. Histórico

Não sobrescrever silenciosamente decisões anteriores.

Cada item deve possuir histórico.

Exemplo conceitual:

```js
history: [
  {
    sprint: 1,
    evidence: "...",
    hypothesis: "...",
    action: "...",
    priority: "Alta"
  },

  {
    sprint: 2,
    status: "altered",
    action: "...",
    reason: "..."
  }
]
```

Ao editar uma decisão na Sprint 2, pedir:

**O que mudou?**

e:

**Por que mudou?**

O segundo campo pode ser curto.

Placeholder:

**“Mudamos porque...”**

---

# 31. Visualização do histórico

Criar uma opção:

**Ver evolução**

Pode abrir drawer/modal.

Exemplo:

```text
B03 · João Pedro

SPRINT 1
Contato individual
Prioridade alta

↓

SPRINT 2
🟡 ALTERADO

Conversa + plano de acompanhamento

Motivo:
“Recebemos uma resposta do estudante indicando...”
```

Isso é parte central da experiência.

---

# 32. Novos itens na Sprint 2

Se uma nova situação entrar no backlog:

marcar automaticamente como:

🔵 **Apareceu depois**

E registrar:

```js
createdAtSprint: 2
```

---

# 33. Capacidade continua limitada

Manter máximo de:

**5 frentes ativas.**

Itens 🔴 abandonados não contam como ativos.

Assim, para colocar algo novo, a equipe frequentemente precisará abandonar ou repriorizar outra decisão.

---

# 34. Final da Sprint 2 possui DUAS possibilidades

Aqui existe uma diferença importante.

Sprint 2 terá dois campos/ações de código.

Criar uma pequena área narrativa:

# Próximo passo

Texto:

> O facilitador indicará como sua equipe deve continuar.

Existem duas possibilidades.

---

## Opção A

Campo:

**Código para continuar**

Botão:

**Ir para a próxima Sprint**

Código:

`PRAXIS`

Resultado:

→ transição para Sprint 3.

---

## Opção B

Campo:

**Código de encerramento**

Botão:

**Finalizar atividade**

Código:

`AUTONOMIA`

Resultado:

→ tela de encerramento antecipado.

Não indicar visualmente qual código será utilizado.

O facilitador decide.

---

# 35. Por que existem dois códigos na Sprint 2

Isso é proposital.

Precisamos poder utilizar o sistema de duas formas:

### versão reduzida

Intro → Sprint 1 → Sprint 2 → Encerramento

ou:

### versão completa

Intro → Sprint 1 → Sprint 2 → Sprint 3 → Encerramento

Não condicionar isso a build diferente.

A mesma aplicação deve suportar ambas.

---

# 36. Transição Sprint 2 → Sprint 3

Código:

`PRAXIS`

Mostrar tela narrativa.

Título:

# O plano encontrou a realidade.

Texto:

> Vocês observaram.
>
> Criaram hipóteses.
>
> Tomaram decisões.
>
> Receberam novas informações.
>
> Revisaram o backlog.
>
> Agora surge algo que não estava no planejamento.

Botão:

**Conhecer o novo cenário**

---

# 37. Sprint 3

Título:

**Sprint 3 · O plano encontra a realidade**

Pergunta principal:

> **O que precisa mudar agora?**

Pergunta secundária:

> **E o que vamos parar de fazer?**

---

# 38. Cenário da Sprint 3

Apresentar como um incidente novo.

Usar este cenário:

> Um conflito entre dois grupos de estudantes, inicialmente restrito às aulas, migra para mensagens fora do encontro.
>
> Há acusações sobre divisão de tarefas, comentários considerados desrespeitosos e estudantes tomando partido.

Novas consequências:

### Wesley · A23

Comunica que não pretende retornar.

### João Pedro · A10

Formaliza sua saída.

### Paulo · A16

Diz que só continua se puder mudar de grupo.

Ao mesmo tempo:

> Duas atividades coletivas precisam acontecer nos próximos encontros.

Restrição:

> A capacidade da equipe não aumentou.

Continuam existindo apenas:

**5 frentes prioritárias ativas.**

---

# 39. Sprint 3 reutiliza toda a estrutura

Manter:

* estudantes;
* informações anteriores;
* novas informações;
* backlog;
* timer;
* entregável;
* histórico.

Na Sprint 3, os itens existentes precisam novamente poder receber:

🟢 permaneceu
🟡 foi alterado
🔴 foi abandonado

Um item criado na Sprint 2 como 🔵 pode agora ser:

🟢
🟡
🔴

O sistema precisa preservar que ele **nasceu na Sprint 2**.

---

# 40. Representação ideal da evolução

Sempre que possível, permitir ao usuário enxergar algo próximo de:

```text
SPRINT 1
B01 · Contatar João

        ↓

SPRINT 2
🟡
B01 · Conversar + acompanhar

        ↓

SPRINT 3
🟢
B01 · Conversar + acompanhar
```

Outro exemplo:

```text
SPRINT 1
B02 · Observar situação de Paulo

        ↓

SPRINT 2
🟢
B02 · Mantido

        ↓

SPRINT 3
🔴
B02 · Abandonado
```

E:

```text
SPRINT 1
não existia

        ↓

SPRINT 2
🔵
B06 · Mediar conflito do grupo

        ↓

SPRINT 3
🟡
B06 · Mediação + reorganização dos grupos
```

Esse é um dos elementos mais importantes da aplicação.

---

# 41. Final da Sprint 3

Campo:

**Código de encerramento**

Código:

`TRANSFORMACAO`

Botão:

**Finalizar atividade**

---

# 42. Tela de encerramento

Criar uma tela limpa.

Não mostrar uma “nota”.

Não tentar dizer se o grupo tomou decisões corretas.

Título:

# O backlog mudou.

Texto:

> A turma continuou sendo a mesma.
>
> O que mudou foi a quantidade de informações disponíveis e a forma como vocês responderam a elas.

Depois mostrar alguns indicadores da própria jornada do grupo.

Exemplo:

```text
5 decisões iniciais

3 decisões alteradas

2 decisões abandonadas

4 decisões surgiram depois

3 sprints concluídas
```

Os números devem ser derivados do histórico real.

---

# 43. Revelação pedagógica final

Depois dos indicadores:

Título:

# Isto também é Agilidade.

Apresentar progressivamente:

```text
Vocês receberam um problema.

→ Objetivo

Tinham mais possibilidades que capacidade.

→ Priorização

Organizaram o trabalho.

→ Backlog

Trabalharam durante um período curto.

→ Timebox

Receberam novas informações.

→ Feedback

Revisaram suas decisões.

→ Inspeção

Mudaram o plano.

→ Adaptação

Precisaram escolher o que deixaria de ser feito.

→ Repriorização
```

Fechar com:

> **Agilidade não é prever perfeitamente o caminho.**
>
> **É construir capacidade para aprender enquanto caminhamos.**

---

# 44. Encerramento reduzido após Sprint 2

Se o grupo utilizar:

`AUTONOMIA`

na Sprint 2:

usar a mesma página de encerramento, mas adaptar automaticamente o conteúdo.

Exemplo:

```text
2 sprints concluídas
```

Não fazer referência à Sprint 3.

---

# 45. Componentização esperada

Não precisa seguir exatamente estes nomes, mas buscar uma organização semelhante:

```text
src/
│
├── components/
│   ├── StudentCard
│   ├── StudentGrid
│   ├── StudentFilters
│   ├── Backlog
│   ├── BacklogItem
│   ├── BacklogHistory
│   ├── SprintTimer
│   ├── SprintMission
│   ├── AccessCode
│   ├── SprintProgress
│   └── ScenarioUpdate
│
├── pages/
│   ├── Intro
│   ├── Sprint1
│   ├── Sprint2
│   ├── Sprint3
│   ├── Transition
│   └── Finish
│
├── data/
│   ├── students
│   ├── sprint2Events
│   ├── sprint3Events
│   └── guidelines
│
├── config/
│   └── sprints
│
├── context/
│   └── ExperienceContext
│
└── utils/
```

Adaptar essa estrutura ao projeto atual.

Não reorganizar arquivos apenas por estética se isso gerar risco desnecessário.

---

# 46. Navegação

Pode utilizar React Router se já estiver instalado.

Se não estiver, avalie se realmente é necessário.

Rotas conceituais:

```text
/
/sprint/1
/sprint/2
/sprint/3
/final
```

Se utilizar rotas:

não permitir simplesmente digitar `/sprint/3` e pular toda a experiência.

Verificar o estado salvo.

Caso a etapa ainda não tenha sido liberada:

redirecionar para a etapa correta.

---

# 47. Reset

Criar uma opção discreta:

**Reiniciar experiência**

Não deixar muito exposta durante o uso.

Ao clicar:

pedir confirmação.

Depois limpar:

* backlog;
* sprint;
* timer;
* histórico;
* progresso.

E voltar para a introdução.

---

# 48. Acessibilidade

Não depender somente das cores.

Os status precisam sempre possuir:

ícone + texto + cor.

Correto:

```text
🟢 Permaneceu
🟡 Foi alterado
🔴 Foi abandonado
🔵 Apareceu depois
```

Errado:

apenas bolinhas coloridas.

Garantir:

* contraste adequado;
* foco de teclado;
* labels em campos;
* botões semanticamente corretos;
* cards legíveis;
* layout responsivo.

---

# 49. Identidade visual

Não transformar a aplicação em um sistema administrativo pesado.

Ela deve parecer:

* contemporânea;
* educacional;
* limpa;
* humana;
* focada em informação;
* levemente experimental.

Evitar:

* excesso de gradientes;
* gamificação infantil;
* excesso de ícones;
* dashboard corporativo cheio de gráficos;
* visual de LMS tradicional.

A experiência narrativa deve ser mais importante do que decoração.

---

# 50. Desktop primeiro, mas responsivo

O uso principal provavelmente acontecerá em:

* notebooks;
* desktops;
* eventualmente tablets.

Priorizar desktop.

Ainda assim, garantir uso funcional em telas menores.

---

# 51. Não criar gráficos desnecessários

Nesta etapa não precisamos de:

* gráficos de pizza;
* score de risco;
* IA;
* analytics;
* backend;
* login;
* banco de dados;
* ranking;
* pontuação;
* sistema competitivo.

Não aumentar o escopo.

---

# 52. Conceito pedagógico que deve orientar decisões técnicas

O sistema não existe para encontrar “a resposta correta”.

Ele existe para tornar visível:

**como a resposta da equipe muda.**

Por isso:

* preserve decisões antigas;
* mostre mudanças;
* permita abandonar decisões;
* destaque novas informações;
* mantenha capacidade limitada;
* evite classificar estudantes automaticamente.

---

# 53. Critérios de aceite

Considere a implementação concluída quando for possível executar este fluxo:

### 1.

Usuário abre a aplicação.

### 2.

Vê a introdução.

### 3.

Clica em “Começar”.

### 4.

Entra na Sprint 1.

### 5.

Visualiza os 30 estudantes vindos do arquivo `students`.

### 6.

Filtra e consulta estudantes.

### 7.

Adiciona até cinco situações ao backlog.

### 8.

Preenche evidência, hipótese, ação e prioridade.

### 9.

Vê o timer da Sprint 1.

### 10.

Atualiza o navegador e não perde o trabalho.

### 11.

Insere `DIALOGO`.

### 12.

Visualiza uma transição narrativa.

### 13.

Entra na Sprint 2.

### 14.

Vê os mesmos estudantes com as 14 novas informações.

### 15.

Consulta a área preparada para documentos norteadores.

### 16.

Vê o backlog criado na Sprint 1.

### 17.

Marca decisões como:

🟢 permaneceu
🟡 alterado
🔴 abandonado

### 18.

Cria uma nova decisão marcada como:

🔵 apareceu depois

### 19.

Visualiza o histórico de uma decisão.

### 20.

Pode inserir `AUTONOMIA` e encerrar a atividade.

OU:

### 21.

Insere `PRAXIS`.

### 22.

Visualiza a transição da crise.

### 23.

Entra na Sprint 3.

### 24.

Visualiza o incidente e novas consequências.

### 25.

Revisa novamente o backlog mantendo limite de cinco itens ativos.

### 26.

Visualiza a evolução das decisões.

### 27.

Insere `TRANSFORMACAO`.

### 28.

Chega ao encerramento.

### 29.

Visualiza dados derivados da própria trajetória do grupo.

### 30.

Recebe a síntese relacionando a experiência a princípios de Agilidade.

---

# 54. Antes de programar

Faça primeiro uma inspeção do projeto.

Apresente brevemente:

1. estrutura encontrada;
2. formato do arquivo `students`;
3. arquivos que pretende criar;
4. arquivos existentes que pretende modificar;
5. estratégia de estado/persistência;
6. estratégia de navegação.

Depois implemente.

Não peça confirmação para cada pequena etapa.

---

# 55. Durante a implementação

Trabalhe incrementalmente.

Ordem recomendada:

### Fase 1

Estado global + configuração + persistência.

### Fase 2

Intro + estrutura de navegação.

### Fase 3

StudentGrid + filtros + cards.

### Fase 4

Backlog Sprint 1.

### Fase 5

Timer.

### Fase 6

Código de acesso + transição.

### Fase 7

Sprint 2 + eventos.

### Fase 8

Histórico e status 🟢 🟡 🔴 🔵.

### Fase 9

Caminho duplo da Sprint 2.

### Fase 10

Sprint 3 + crise.

### Fase 11

Tela final.

### Fase 12

Refinamento visual e responsividade.

---

# 56. Validação técnica

Ao finalizar:

* rodar lint, se configurado;
* rodar build;
* corrigir erros;
* verificar console;
* testar refresh em cada sprint;
* testar códigos corretos;
* testar códigos incorretos;
* testar limite de cinco itens;
* testar histórico;
* testar encerramento pela Sprint 2;
* testar encerramento pela Sprint 3;
* testar reset;
* verificar que dados de `students` não foram duplicados desnecessariamente.

Não considerar a tarefa finalizada com build quebrado.

---

# 57. Resultado esperado

Quero terminar com uma experiência em que o participante não tenha simplesmente três telas de exercício.

Ele deve sentir algo próximo de:

> “Nós analisamos uma situação.”
>
> “Tomamos decisões.”
>
> “Descobrimos que sabíamos menos do que imaginávamos.”
>
> “O contexto mudou.”
>
> “Precisamos rever escolhas.”
>
> “Algumas decisões sobreviveram.”
>
> “Outras precisaram morrer.”
>
> “Novas prioridades surgiram.”
>
> “E foi justamente esse processo de adaptação que revelou a Metodologia Ágil.”

Mantenha essa ideia como critério principal para todas as decisões de UX e arquitetura.

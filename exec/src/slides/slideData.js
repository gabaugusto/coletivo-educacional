export const slides = [
  {
    id: "coletivo",
    originalSlide: 1,
    type: "cover",
    eyebrow: "COLETIVO EDUCAÇÃO",
    title: "Metodologia Ágil na prática",
    subtitle:
      "Uma experiência intensa, colaborativa e construída em ciclos curtos de investigação, decisão e revisão.",
    accent: "neutral",
  },
  {
    id: "regras",
    originalSlide: 2,
    type: "statement",
    eyebrow: "ANTES DE COMEÇAR",
    title: "O tempo é curto. Isso faz parte da dinâmica.",
    body:
      "As atividades são intencionalmente intensas. A proposta é tomar decisões com o que sabemos agora e revisar o caminho quando novas informações surgirem.",
    callout:
      "Durante todo o processo, uma pessoa da equipe registra fotos, anotações e evidências para compor o dossiê do grupo.",
    durationSeconds: 30,
    accent: "neutral",
  },
  {
    id: "papeis",
    originalSlide: 3,
    type: "list",
    eyebrow: "ORGANIZAÇÃO",
    title: "Distribuição dos papéis",
    items: [
      "PO — mantém a squad focada no desafio e no valor da entrega.",
      "SCRUM — organiza o ritmo do grupo, o tempo e a participação.",
      "Documentarista — registra fotos, decisões, mudanças e evidências para o dossiê.",
    ],
    footer: "Distribuam os três papéis antes de começar.",
    durationSeconds: 60,
    accent: "neutral",
  },
  {
    id: "cenario",
    originalSlide: 4,
    type: "scenario",
    eyebrow: "CENÁRIO INICIAL",
    title: "Um problema antes dos dados",
    body:
      "O Senac percebe sinais de redução de engajamento e permanência em algumas turmas. Sua equipe foi convidada a propor uma primeira forma de compreender e agir sobre essa situação.",
    callout:
      "Cada grupo receberá uma história diferente. Trabalhem apenas com as informações disponíveis no seu cenário.",
    accent: "sprint1",
  },
  {
    id: "s1-atividade1",
    originalSlide: 6,
    type: "activity",
    eyebrow: "SPRINT 1 · ATIVIDADE 1",
    title: "Entender o cenário",
    durationSeconds: 600,
    objective:
      "Leiam o cenário, conversem e construam uma primeira interpretação visual do problema.",
    deliverables: [
      "ENTREGA: um mapa físico do cenário construído pela squad.",
      "Destacar os elementos que parecem influenciar permanência e engajamento.",
      "Conectar possíveis relações entre causas, sinais e consequências.",
      "Manter visível aquilo que ainda é dúvida ou hipótese.",
    ],
    callout:
      "Ao final dos 10 minutos, outra pessoa deve conseguir olhar para o mapa e compreender como a squad está enxergando o problema.",
    accent: "sprint1",
  },
  {
    id: "s1-atividade2",
    originalSlide: 7,
    type: "activity",
    eyebrow: "SPRINT 1 · ATIVIDADE 2",
    title: "Desmontar o cenário",
    durationSeconds: 300,
    objective:
      "Separar aquilo que é informação disponível daquilo que estamos apenas supondo.",
    deliverables: [
      "SABEMOS: evidências presentes no cenário.",
      "ACREDITAMOS: interpretações e hipóteses do grupo.",
      "PRECISAMOS DESCOBRIR: lacunas que exigem investigação.",
    ],
    accent: "sprint1",
  },
  {
    id: "s1-radar",
    originalSlide: 8,
    type: "activity",
    eyebrow: "SPRINT 1 · ATIVIDADE 3",
    title: "Backlog de investigação",
    durationSeconds: 300,
    objective:
      "Transformar o mapa amplo em um backlog inicial do que merece ser investigado primeiro.",
    deliverables: [
      "3 riscos para colocar no backlog de investigação.",
      "3 perguntas prioritárias que a squad faria.",
      "3 sinais que a squad observaria.",
    ],
    callout: "O backlog não é uma lista de soluções. É uma lista priorizada do que precisamos compreender.",
    accent: "sprint1",
  },
  {
    id: "s1-pitch",
    originalSlide: 9,
    type: "activity",
    eyebrow: "SPRINT 1 · ATIVIDADE 4",
    title: "Pitch do backlog",
    durationSeconds: 300,
    objective:
      "Apresentem o backlog de investigação para outra squad e recebam uma provocação.",
    callout:
      "Pergunta de quem escuta: “O que vocês colocaram no backlog a partir de uma suposição, e não de uma evidência?”",
    accent: "sprint1",
  },
  {
    id: "revelacao",
    originalSlide: 10,
    type: "reveal",
    eyebrow: "A REVELAÇÃO",
    title: "Vocês receberam quatro versões da realidade.",
    durationSeconds: 120,
    items: [
      "A — Ausências e frequência",
      "B — Engajamento e vínculo",
      "C — Expectativas e sentido",
      "D — Relações e experiência coletiva",
    ],
    callout:
      "Nenhuma equipe recebeu uma informação falsa. Mas nenhuma equipe recebeu o quadro inteiro.",
    accent: "sprint1",
  },
  {
    id: "transicao2",
    originalSlide: 11,
    type: "section",
    eyebrow: "NOVAS EVIDÊNCIAS",
    title: "Vocês criaram hipóteses sobre permanência.",
    subtitle: "Agora conhecerão as pessoas.",
    durationSeconds: 120,
    accent: "sprint2",
  },
  {
    id: "alunos",
    originalSlide: 13,
    type: "resource",
    eyebrow: "SPRINT 2 · RECURSO",
    title: "30 estudantes",
    durationSeconds: 720,
    subtitle:
      "Acessem os perfis pelo QR Code ou pelo Teams. Nenhum estudante vem classificado como “em risco”.",
    callout:
      "Durante este tempo, explorem a turma, comparem evidências e preparem a triagem da squad.",
    accent: "sprint2",
    placeholder: "QR CODE / LINK",
  },
  {
    id: "s2-triagem",
    originalSlide: 14,
    type: "activity",
    eyebrow: "SPRINT 2 · ATIVIDADE 1",
    title: "Triagem da turma",
    objective:
      "Organizem as situações que encontraram a partir das evidências disponíveis.",
    deliverables: [
      "Agir agora",
      "Entender melhor",
      "Acompanhar",
      "Sem ação por enquanto",
    ],
    accent: "sprint2",
  },
  {
    id: "s2-priorizar",
    originalSlide: 15,
    type: "activity",
    eyebrow: "SPRINT 2 · ATIVIDADE 2",
    title: "Priorizar",
    durationSeconds: 300,
    objective:
      "A equipe possui capacidade limitada. Escolham somente cinco frentes prioritárias.",
    callout:
      "Nada entra no backlog ativo sem um dos cinco tokens da equipe.",
    accent: "sprint2",
  },
  {
    id: "s2-priorizar2",
    originalSlide: 16,
    type: "activity",
    eyebrow: "SPRINT 2 · ATIVIDADE 3",
    title: "Priorizar de novo",
    durationSeconds: 600,
    objective:
      "Das cinco frentes escolhidas, apenas duas podem começar imediatamente.",
    deliverables: [
      "Escolher 2 prioridades AGORA.",
      "Explicar por que as outras 3 podem esperar.",
      "Registrar o que faria a equipe mudar essa ordem.",
    ],
    accent: "sprint2",
  },
  {
    id: "s2-rodar",
    originalSlide: 17,
    type: "activity",
    eyebrow: "SPRINT 2 · ATIVIDADE 4",
    title: "Rodar & Girar",
    durationSeconds: 480,
    objective:
      "Visitem outra squad, conheçam uma decisão diferente e retornem para revisar o próprio raciocínio.",
    callout:
      "Busquem uma decisão que faria sua equipe repensar uma prioridade.",
    accent: "sprint2",
  },
  {
    id: "sprint3",
    originalSlide: 18,
    type: "section",
    eyebrow: "SPRINT 3",
    title: "A hora da ação",
    subtitle:
      "O contexto muda antes que o plano termine. Agora será necessário adaptar.",
    accent: "sprint3",
  },
  {
    id: "s3-solucao",
    originalSlide: 19,
    type: "activity",
    eyebrow: "SPRINT 3 · ATIVIDADE",
    title: "Soluções",
    durationSeconds: 1800,
    objective:
      "Reorganizem prioridades diante do novo cenário e materializem uma resposta possível.",
    deliverables: [
      "Linha do tempo das decisões.",
      "O que permanece, muda, é abandonado ou surge depois.",
      "Um protótipo simples de resposta.",
    ],
    callout: "Pergunta-chave: “O que vamos parar de fazer?”",
    accent: "sprint3",
  },
  {
    id: "sintese",
    originalSlide: 20,
    type: "final",
    eyebrow: "A JORNADA",
    title: "Três perguntas, três ciclos",
    items: [
      "Sprint 1 — O que imaginamos sobre o problema?",
      "Sprint 2 — O que aprendemos quando conhecemos as pessoas?",
      "Sprint 3 — O que acontece quando pessoas e contexto mudam antes do plano terminar?",
    ],
    callout:
      "Agilidade não é ter certeza mais rápido. É aprender a mudar melhor.",
    accent: "final",
  },
];

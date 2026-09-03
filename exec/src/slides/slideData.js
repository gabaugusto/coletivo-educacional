export const slides = [
  {
    id: "coletivo",
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
    durationSeconds: 30,
    body:
      "As atividades são intencionalmente intensas. A proposta é tomar decisões com o que sabemos agora e revisar o caminho quando novas informações surgirem.",
    callout:
      "Durante todo o processo, uma pessoa da equipe registra fotos, anotações e evidências para compor o dossiê do grupo.",
    accent: "neutral",
  },
  {
    id: "papeis",
    type: "list",
    eyebrow: "ORGANIZAÇÃO",
    title: "Distribuição dos papéis",
    items: [
      "P.O. (Product Owner): Orientações, organização e gestão de tempo.",
      "Scrum Master: ajuda o grupo a priorizar.",
      "Documentarista: registra fotos, anotações e evidências.",
    ],
    durationSeconds: 60,
    callout:
      "Distribuam os três papéis antes de começar. Os papéis podem girar entre as sprints.",
    accent: "neutral",
  },
  {
    id: "cenario",
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
    id: "sprint1",
    type: "section",
    eyebrow: "SPRINT 1",
    title: "O problema antes dos dados",
    subtitle:
      "Construir um primeiro modelo do problema sem conhecer ainda os estudantes.",
    accent: "sprint1",
  },
  {
    id: "s1-atividade1",
    type: "activity",
    eyebrow: "SPRINT 1 · ATIVIDADE 1",
    title: "Entender o cenário",
    time: "10 min",
    durationSeconds: 600,
    objective:
      "Leiam o cenário, conversem e construam uma primeira interpretação do problema.",
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
    type: "activity",
    eyebrow: "SPRINT 1 · ATIVIDADE 2",
    title: "Desmontar o cenário",
    time: "5 min",
    durationSeconds: 300,
    objective:
      "Separar aquilo que é informação disponível daquilo que estamos apenas supondo.",
    deliverables: [
      "SABEMOS: evidências presentes no cenário.",
      "ACREDITAMOS: interpretações e hipóteses do grupo.",
      "FARÍAMOS: ações que tomaríamos.",
    ],
    accent: "sprint1",
  },
  {
    id: "s1-radar",
    type: "activity",
    eyebrow: "SPRINT 1 · ATIVIDADE 3",
    title: "Radar de Investigação",
    durationSeconds: 300,
    objective:
      "backlog inicial do que merece ser investigado primeiro.",
    deliverables: [
      "3 riscos que investigaríamos.",
      "3 perguntas que faríamos.",
      "3 sinais que observaríamos.",
    ],
    callout: "O backlog não é uma lista de soluções. É uma lista priorizada do que precisamos compreender.",
    accent: "sprint1",
  },
  {
    id: "s1-pitch",
    type: "activity",
    eyebrow: "SPRINT 1 · ATIVIDADE 4",
    title: "Pitch cruzado",
    durationSeconds: 240,
    objective:
      "Apresentem o Backlog para outra grupo e recebam uma provocação.",
    callout:
      "Pergunta de quem escuta: “O que vocês estão assumindo sem ainda possuir evidência?”",
    accent: "sprint1",
  },
  {
    id: "revelacao",
    type: "reveal",
    eyebrow: "A REVELAÇÃO",
    title: "Vocês receberam quatro versões da realidade.",
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
    type: "section",
    eyebrow: "NOVAS EVIDÊNCIAS",
    title: "Vocês criaram hipóteses sobre permanência.",
    subtitle: "Agora conhecerão as pessoas.",
    accent: "sprint2",
  },
  {
    id: "sprint2",
    type: "section",
    eyebrow: "SPRINT 2",
    title: "A realidade ganha rosto",
    subtitle:
      "Confrontar hipóteses iniciais com os perfis e evidências de uma turma fictícia.",
    accent: "sprint2",
  },
  {
    id: "alunos",
    type: "resource",
    eyebrow: "SPRINT 2 · RECURSO",
    title: "30 estudantes",
    image: "/qrcode.png",
    imageAlt: "QR Code para acessar os perfis dos estudantes",
    durationSeconds: 720,
    subtitle:
      "Acessem os perfis pelo QR Code ou pelo Teams.",
    callout:
      "Procurem evidências. Evitem transformar interpretação em diagnóstico. Analisem os estudantes e identifiquem situações que merecem atenção.",
    accent: "sprint2",

    deliverables: [
      "Agir agora",
      "Entender melhor",
      "Acompanhar",
      "Sem ação por enquanto",
    ],
  },
  {
    id: "s2-priorizar",
    originalSlide: 15,
    type: "activity",
    eyebrow: "SPRINT 2 · ATIVIDADE 2",
    title: "Priorizar",
    durationSeconds: 300,
    objective:
      "A equipe possui capacidade limitada. Escolham somente cinco frentes prioritárias. Vocês possuem capacidade para apenas cinco intervenções. Não sete. Não seis. CINCO!",
    accent: "sprint2",
  },
  {
    id: "s2-priorizar",
    type: "resource",
    eyebrow: "SPRINT 2 · Código",
    title: "Práxis",
    durationSeconds: 180,
    subtitle:
      "Digite o código \"PRÁXIS\" para atualizar a lista de estudantes com novos elementos.",
    callout:
      "Procurem evidências. Evitem transformar interpretação em diagnóstico. Analisem os estudantes e identifiquem situações que merecem atenção.",
    accent: "sprint2",

    deliverables: [
      "Agir agora",
      "Entender melhor",
      "Acompanhar",
      "Sem ação por enquanto",
    ],
  },
  {
    id: "s2-priorizar2",
    type: "activity",
    eyebrow: "SPRINT 2 · ATIVIDADE 3",
    title: "Priorizar de novo",

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
    type: "section",
    eyebrow: "SPRINT 3",
    title: "A hora da ação",
    subtitle:
      "O contexto muda antes que o plano termine. Agora será necessário adaptar.",
    accent: "sprint3",
  },
  {
    id: "s3-solucao",
    type: "activity",
    eyebrow: "SPRINT 3 · ATIVIDADE",
    title: "Soluções",
    durationSeconds: 1620,
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

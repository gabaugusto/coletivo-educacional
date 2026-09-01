export const SPRINT_CONFIG = {
  1: {
    durationMinutes: 20,
    title: 'Sprint 1 · Conheça sua turma',
    question: 'Quais situações exigem atenção agora?',
    mission: {
      objective: 'Analise a turma e identifique situações que merecem atenção.',
      challenge: 'Neste momento, estas são todas as informações disponíveis.',
      deliverable: 'Crie um backlog com no máximo 5 frentes prioritárias.',
      capacity: '5 frentes prioritárias ativas',
    },
  },
  2: {
    durationMinutes: 20,
    title: 'Sprint 2 · Novas informações',
    question: 'O que muda quando sabemos mais?',
    mission: {
      objective: 'Revise decisões anteriores diante de novas manifestações.',
      challenge: 'Algumas hipóteses podem ganhar força. Outras talvez deixem de fazer sentido.',
      deliverable: 'Atualize o backlog preservando a evolução das decisões.',
      capacity: '5 frentes prioritárias ativas',
    },
  },
  3: {
    durationMinutes: 20,
    title: 'Sprint 3 · O plano encontra a realidade',
    question: 'O que precisa mudar agora?',
    secondaryQuestion: 'E o que vamos parar de fazer?',
    mission: {
      objective: 'Repriorize o trabalho diante de um incidente novo.',
      challenge: 'A capacidade da equipe não aumentou, mas o cenário ficou mais complexo.',
      deliverable: 'Defina quais decisões permanecem, mudam ou deixam de ser prioridade.',
      capacity: '5 frentes prioritárias ativas',
    },
  },
}

export const ACCESS_CODES = {
  sprint1ToSprint2: 'DIALOGO',
  sprint2ToSprint3: 'PRAXIS',
  sprint2ToFinish: 'AUTONOMIA',
  sprint3ToFinish: 'TRANSFORMACAO',
}

export const normalizeAccessCode = (value) =>
  value
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toUpperCase()


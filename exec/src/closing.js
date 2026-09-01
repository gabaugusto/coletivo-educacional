export const EMPTY_CLOSING = {
  currentStep: 0,
  retrospective: { keep: '', change: '', abandon: '', emerge: '' },
  selectedExperiment: { source: null, text: '' },
  experiment: { idea: '', reason: '', firstStep: '', evidence: '' },
  collectiveContribution: '',
  contributionSubmitted: false,
  completed: false,
}

export function normalizeClosing(closing) {
  return {
    ...EMPTY_CLOSING,
    ...closing,
    retrospective: { ...EMPTY_CLOSING.retrospective, ...closing?.retrospective },
    selectedExperiment: { ...EMPTY_CLOSING.selectedExperiment, ...closing?.selectedExperiment },
    experiment: { ...EMPTY_CLOSING.experiment, ...closing?.experiment },
  }
}

export function getJourneySummary(backlog = [], completedSprints = []) {
  const reviewEvents = backlog.flatMap((item) => (item.history || []).slice(1))
  return {
    initialDecisions: backlog.filter((item) => item.createdAtSprint === 1).length,
    kept: reviewEvents.filter((entry) => entry.status === 'stayed').length,
    changed: reviewEvents.filter((entry) => entry.status === 'altered').length,
    abandoned: backlog.filter((item) => item.currentStatus === 'abandoned').length,
    emerged: backlog.filter((item) => item.createdAtSprint > 1).length,
    completedSprints: new Set(completedSprints).size,
  }
}

export async function submitCollectiveContribution(contribution) {
  // TODO: substituir este retorno local pela chamada à futura API do painel coletivo.
  return { ok: true, contribution, submittedLocally: true }
}

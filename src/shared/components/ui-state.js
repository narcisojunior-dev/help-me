export function createStateBox({ title, message, variant = 'default' }) {
  const box = document.createElement('div');
  box.className = 'state-box';
  box.dataset.variant = variant;
  box.setAttribute('role', variant === 'error' ? 'alert' : 'status');

  const heading = document.createElement('strong');
  heading.textContent = title;

  const body = document.createElement('p');
  body.className = 'mb-0 mt-1';
  body.textContent = message;

  box.append(heading, body);
  return box;
}

export function createLoadingState(message = 'Carregando informacoes...') {
  return createStateBox({ title: 'Carregando', message });
}

export function createErrorState(message = 'Nao foi possivel carregar os dados.') {
  return createStateBox({ title: 'Erro', message, variant: 'error' });
}

export function createEmptyState(message = 'Nenhum registro encontrado.') {
  return createStateBox({ title: 'Sem resultados', message, variant: 'empty' });
}

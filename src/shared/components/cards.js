export function createModuleCard({ title, description, href, color }) {
  const card = document.createElement('article');
  card.className = 'module-card';
  card.style.setProperty('--module-color', color);

  const heading = document.createElement('h2');
  heading.textContent = title;

  const copy = document.createElement('p');
  copy.textContent = description;

  const link = document.createElement('a');
  link.className = 'stretched-link fw-semibold';
  link.href = href;
  link.textContent = 'Abrir modulo';

  card.append(heading, copy, link);
  return card;
}

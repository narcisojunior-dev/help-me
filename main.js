import { createSupabaseClient } from './src/config/supabase.js';
import { adminModule } from './src/modules/admin/index.js';
import { essentialServicesModule } from './src/modules/essential-services/index.js';
import { locationsModule } from './src/modules/locations/index.js';
import { pharmaciesModule } from './src/modules/pharmacies/index.js';
import { searchModule } from './src/modules/search/index.js';
import { usefulPhonesModule } from './src/modules/useful-phones/index.js';
import { vaccinesModule } from './src/modules/vaccines/index.js';
import { createModuleCard } from './src/shared/components/cards.js';
import { createEmptyState, createStateBox } from './src/shared/components/ui-state.js';
import { clearElement, createElement } from './src/shared/utils/dom.js';

const moduleCards = [
  {
    module: usefulPhonesModule,
    color: 'var(--color-alert)',
  },
  {
    module: pharmaciesModule,
    color: 'var(--color-attention)',
  },
  {
    module: essentialServicesModule,
    color: 'var(--color-info)',
  },
  {
    module: vaccinesModule,
    color: 'var(--color-secondary)',
  },
];

function renderHome() {
  const app = document.querySelector('#app');
  const supabaseStatus = createSupabaseClient();

  clearElement(app);

  const hero = createElement('section', { className: 'page-band hero-panel', textContent: '' });
  hero.id = 'inicio';
  const heroContainer = createElement('div', { className: 'container' });
  const title = createElement('h1', {
    textContent: 'Informacoes locais importantes, organizadas para consulta rapida.',
  });
  const subtitle = createElement('p', {
    textContent:
      'Base modular preparada para busca por localidade, telefones uteis, farmacias de plantao, servicos essenciais e vacinas.',
  });
  heroContainer.append(title, subtitle);
  hero.append(heroContainer);

  const content = createElement('section', { className: 'page-band' });
  const container = createElement('div', { className: 'container' });

  const searchPanel = createElement('form', { className: 'search-panel mb-4' });
  searchPanel.setAttribute('role', 'search');
  searchPanel.innerHTML = `
    <div class="row g-3 align-items-end">
      <div class="col-12 col-lg-5">
        <label class="form-label" for="locationSearch">Localidade</label>
        <input class="form-control" id="locationSearch" type="search" placeholder="Cidade, bairro ou regiao">
      </div>
      <div class="col-12 col-lg-5">
        <label class="form-label" for="globalSearch">Busca</label>
        <input class="form-control" id="globalSearch" type="search" placeholder="Telefone, farmacia, servico ou vacina">
      </div>
      <div class="col-12 col-lg-2 d-grid">
        <button class="btn btn-primary" type="submit">Buscar</button>
      </div>
    </div>
  `;
  searchPanel.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const statusBox = supabaseStatus.isConfigured
    ? createStateBox({ title: 'Supabase', message: supabaseStatus.message })
    : createStateBox({
        title: 'Configuracao pendente',
        message: supabaseStatus.message,
        variant: 'empty',
      });
  statusBox.classList.add('config-warning', 'mb-4');

  const grid = createElement('div', { className: 'module-grid' });
  for (const item of moduleCards) {
    grid.append(
      createModuleCard({
        title: item.module.name,
        description: item.module.description,
        href: item.module.route,
        color: item.color,
      }),
    );
  }

  const foundations = createElement('div', { className: 'mt-4' });
  foundations.append(
    createEmptyState(
      `Modulos base disponiveis: ${locationsModule.name}, ${searchModule.name}, ${adminModule.name}.`,
    ),
  );

  container.append(searchPanel, statusBox, grid, foundations);
  content.append(container);
  app.append(hero, content);
}

renderHome();

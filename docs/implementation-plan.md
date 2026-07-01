# Plano de Implementacao - Help-me com Supabase

## 1. Visao Tecnica

O Help-me sera uma aplicacao web modular para consulta local de informacoes de emergencia e utilidade publica. O frontend sera desenvolvido com HTML, CSS e JavaScript modular, consumindo diretamente o Supabase como backend.

O Supabase sera responsavel por:

- Autenticacao de usuarios.
- Banco de dados PostgreSQL.
- Controle de acesso com Row Level Security (RLS).
- Regras de leitura publica e escrita administrativa.
- Armazenamento dos dados de localidades, telefones uteis, farmacias de plantao, servicos essenciais, vacinas e auditoria.

O MVP deve permitir consulta publica sem login e restringir cadastros, edicoes e exclusoes a administradores.

## 2. Stack e Decisoes Arquiteturais

### 2.1 Stack principal

- Frontend: HTML, CSS e JavaScript, bootstrap.
- Backend: Supabase.
- Banco de dados: PostgreSQL via Supabase.
- Autenticacao: Supabase Auth.
- Autorizacao: tabela `profiles` com campo `role`.
- Seguranca de dados: Row Level Security (RLS).
- Deploy frontend: servico estatico como Vercel, Netlify, GitHub Pages ou hospedagem equivalente.

### 2.2 Decisoes do MVP

- A consulta publica nao exige login.
- Login e cadastro existem para usuarios, mas a area administrativa exige perfil `admin`.
- Novos usuarios sao criados com role padrao `user`.
- O primeiro administrador sera promovido manualmente via SQL no painel do Supabase.
- O frontend deve validar permissoes para melhorar UX, mas a seguranca real deve estar nas politicas RLS.
- Integracoes externas, notificacoes, importacao em massa e app mobile nativo ficam fora do MVP.

## 3. Estrutura Modular Sugerida

```text
help-me/
  index.html
  main.js
  styles/
    style.css
  docs/
    PRD.md
    implementation-plan.md
  src/
    config/
      supabase.js
    modules/
      auth/
      locations/
      useful-phones/
      pharmacies/
      essential-services/
      vaccines/
      search/
      admin/
    shared/
      components/
      state/
      utils/
```

### 3.1 Modulos do frontend

- `auth`: login, cadastro, logout, recuperacao de senha e sessao atual.
- `locations`: carregamento e selecao de localidade.
- `useful-phones`: listagem e filtros de telefones uteis.
- `pharmacies`: listagem de farmacias de plantao e calculo de aberta agora.
- `essential-services`: listagem e filtros de servicos essenciais.
- `vaccines`: calendario de vacinas e campanhas ativas.
- `search`: busca global agrupada por tipo de resultado.
- `admin`: painel administrativo e CRUD dos modulos.
- `shared`: componentes reutilizaveis, formatadores, estados de loading/erro/vazio e helpers de data.

## 4. Modelagem Supabase

### 4.1 Tabelas principais

#### `profiles`

Representa o perfil complementar ao usuario do Supabase Auth.

Campos:

- `id`: uuid, primary key, referencia `auth.users.id`.
- `name`: text, obrigatorio.
- `email`: text, obrigatorio.
- `role`: text, valores `user` ou `admin`, padrao `user`.
- `main_location_id`: uuid, opcional, referencia `locations.id`.
- `status`: text, valores `active` ou `inactive`, padrao `active`.
- `created_at`: timestamp.
- `updated_at`: timestamp.

#### `locations`

Representa cidades, bairros ou regioes atendidas.

Campos:

- `id`: uuid, primary key.
- `name`: text, obrigatorio.
- `state`: text, obrigatorio.
- `city`: text, obrigatorio.
- `district`: text, opcional.
- `status`: text, valores `active` ou `inactive`, padrao `active`.
- `created_at`: timestamp.
- `updated_at`: timestamp.
- `created_by`: uuid, referencia `profiles.id`.
- `updated_by`: uuid, referencia `profiles.id`.

#### `useful_phones`

Representa telefones uteis e contatos de emergencia.

Campos:

- `id`: uuid, primary key.
- `name`: text, obrigatorio.
- `category`: text, obrigatorio.
- `primary_phone`: text, obrigatorio.
- `alternate_phones`: text[], opcional.
- `location_id`: uuid, referencia `locations.id`.
- `service_hours`: text, opcional.
- `notes`: text, opcional.
- `priority`: integer, padrao `0`.
- `status`: text, valores `draft`, `published`, `inactive` ou `expired`.
- `created_at`: timestamp.
- `updated_at`: timestamp.
- `created_by`: uuid, referencia `profiles.id`.
- `updated_by`: uuid, referencia `profiles.id`.

#### `on_call_pharmacies`

Representa farmacias em escala de plantao.

Campos:

- `id`: uuid, primary key.
- `name`: text, obrigatorio.
- `address`: text, obrigatorio.
- `district`: text, opcional.
- `location_id`: uuid, referencia `locations.id`.
- `phone`: text, obrigatorio.
- `whatsapp`: text, opcional.
- `shift_date`: date, obrigatorio.
- `starts_at`: time, obrigatorio.
- `ends_at`: time, obrigatorio.
- `is_24h`: boolean, padrao `false`.
- `map_url`: text, opcional.
- `notes`: text, opcional.
- `status`: text, valores `draft`, `published`, `inactive` ou `expired`.
- `created_at`: timestamp.
- `updated_at`: timestamp.
- `created_by`: uuid, referencia `profiles.id`.
- `updated_by`: uuid, referencia `profiles.id`.

#### `essential_services`

Representa servicos publicos e essenciais.

Campos:

- `id`: uuid, primary key.
- `name`: text, obrigatorio.
- `category`: text, obrigatorio.
- `description`: text, opcional.
- `address`: text, obrigatorio.
- `district`: text, opcional.
- `location_id`: uuid, referencia `locations.id`.
- `phone`: text, opcional.
- `service_hours`: text, opcional.
- `has_emergency_service`: boolean, padrao `false`.
- `latitude`: numeric, opcional.
- `longitude`: numeric, opcional.
- `map_url`: text, opcional.
- `required_documents`: text, opcional.
- `notes`: text, opcional.
- `status`: text, valores `draft`, `published`, `inactive` ou `expired`.
- `created_at`: timestamp.
- `updated_at`: timestamp.
- `created_by`: uuid, referencia `profiles.id`.
- `updated_by`: uuid, referencia `profiles.id`.

#### `vaccines`

Representa vacinas, campanhas e orientacoes de aplicacao.

Campos:

- `id`: uuid, primary key.
- `vaccine_name`: text, obrigatorio.
- `target_audience`: text, obrigatorio.
- `age_range`: text, opcional.
- `dose`: text, opcional.
- `recommended_period`: text, opcional.
- `location_id`: uuid, referencia `locations.id`.
- `application_places`: text, obrigatorio.
- `required_documents`: text, opcional.
- `campaign_name`: text, opcional.
- `starts_on`: date, opcional.
- `ends_on`: date, opcional.
- `source`: text, opcional.
- `notes`: text, opcional.
- `status`: text, valores `draft`, `published`, `inactive` ou `expired`.
- `created_at`: timestamp.
- `updated_at`: timestamp.
- `created_by`: uuid, referencia `profiles.id`.
- `updated_by`: uuid, referencia `profiles.id`.

#### `audit_logs`

Representa historico administrativo basico.

Campos:

- `id`: uuid, primary key.
- `actor_id`: uuid, referencia `profiles.id`.
- `action`: text, obrigatorio.
- `entity_type`: text, obrigatorio.
- `entity_id`: uuid, obrigatorio.
- `metadata`: jsonb, opcional.
- `created_at`: timestamp.

## 5. Politicas de Seguranca e RLS

### 5.1 Regras gerais

- Ativar RLS em todas as tabelas.
- Permitir leitura publica apenas de dados publicados e ativos.
- Permitir escrita apenas para administradores.
- Permitir que usuarios autenticados leiam o proprio `profile`.
- Permitir que usuarios autenticados atualizem apenas campos seguros do proprio `profile`.
- Bloquear qualquer escrita administrativa para `profiles.role != 'admin'`.

### 5.2 Funcao auxiliar recomendada

Criar uma funcao SQL `is_admin()` para simplificar politicas RLS:

```sql
create or replace function public.is_admin()
returns boolean
language sql
security definer
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
      and status = 'active'
  );
$$;
```

### 5.3 Promocao do primeiro administrador

Depois que o primeiro usuario se cadastrar pelo Supabase Auth, executar no SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'email-do-admin@exemplo.com';
```

## 6. Fases de Implementacao

### Fase 0 - Preparacao do projeto

Objetivo: organizar a base para desenvolvimento modular.

Entregas:

- Criar estrutura `src/` com modulos de frontend.
- Criar `src/config/supabase.js`.
- Documentar variaveis `SUPABASE_URL` e `SUPABASE_ANON_KEY`.
- Criar tokens de cores no CSS conforme paleta do PRD.
- Definir componentes compartilhados para loading, erro, vazio, cards e formularios.

Critérios de aceite:

- Projeto abre no navegador sem erros.
- Supabase Client pode ser inicializado com as chaves configuradas.
- CSS possui tokens principais da paleta.

### Fase 1 - Modelagem Supabase

Objetivo: criar o banco de dados inicial.

Entregas:

- Criar tabelas principais no Supabase.
- Criar constraints de `role`, `status` e campos obrigatorios.
- Criar relacionamentos com `location_id`, `created_by` e `updated_by`.
- Criar triggers para atualizar `updated_at`.
- Criar trigger para gerar `profiles` automaticamente apos cadastro no Auth.

Critérios de aceite:

- Novo usuario autenticado gera registro em `profiles` com role `user`.
- Todas as tabelas principais existem.
- Relacionamentos impedem dados orfaos.

### Fase 2 - Segurança e permissoes

Objetivo: garantir que a seguranca nao dependa apenas do frontend.

Entregas:

- Ativar RLS nas tabelas.
- Criar politicas de leitura publica para registros `published`.
- Criar politicas de escrita administrativa.
- Criar politicas para usuario ler e atualizar o proprio `profile`.
- Documentar promocao manual do primeiro admin.

Critérios de aceite:

- Usuario anonimo consegue ler dados publicados.
- Usuario anonimo nao consegue inserir, editar ou excluir dados.
- Usuario comum autenticado nao consegue escrever dados administrativos.
- Usuario admin consegue criar, editar e inativar registros.

### Fase 3 - Base visual e navegacao publica

Objetivo: entregar a experiencia inicial de consulta.

Entregas:

- Tela inicial com seletor de localidade.
- Busca principal visivel.
- Cards para Telefones uteis, Farmacias, Servicos essenciais e Vacinas.
- Layout responsivo para celular, tablet e desktop.
- Estados de loading, erro e lista vazia.

Critérios de aceite:

- Usuario consegue selecionar localidade.
- Usuario consegue navegar para cada modulo.
- Interface mantém boa leitura em telas pequenas.

### Fase 4 - Consultas publicas

Objetivo: conectar as telas publicas aos dados do Supabase.

Entregas:

- Listagem de localidades ativas.
- Telefones uteis por localidade, categoria e termo.
- Farmacias de plantao por localidade e data.
- Servicos essenciais por localidade, categoria e bairro.
- Vacinas por localidade, publico-alvo e campanha ativa.

Critérios de aceite:

- Apenas registros publicados aparecem nas telas publicas.
- Filtros retornam resultados coerentes.
- Falhas de carregamento exibem mensagem clara e opcao de tentar novamente.

### Fase 5 - Autenticacao

Objetivo: permitir entrada segura de usuarios e administradores.

Entregas:

- Tela ou modal de login.
- Cadastro de usuario comum.
- Logout.
- Recuperacao de senha pelo Supabase Auth.
- Leitura do `profile` apos login.
- Bloqueio visual do painel administrativo para nao admins.

Critérios de aceite:

- Usuario comum consegue criar conta e fazer login.
- Usuario comum nao ve opcoes administrativas.
- Admin autenticado consegue acessar o painel.
- Sessao expirada exige novo login.

### Fase 6 - Painel administrativo

Objetivo: permitir manutencao dos dados por administradores.

Entregas:

- Dashboard com contadores por modulo.
- CRUD de localidades.
- CRUD de telefones uteis.
- CRUD de farmacias de plantao.
- CRUD de servicos essenciais.
- CRUD de vacinas e campanhas.
- Validacao de campos obrigatorios.
- Registro de alteracoes em `audit_logs`.

Critérios de aceite:

- Admin cria, edita, publica, inativa e exclui registros.
- Sistema impede publicar registros obrigatorios incompletos.
- Alteracoes relevantes geram log de auditoria.

### Fase 7 - Regras especificas dos modulos

Objetivo: implementar comportamentos de negocio importantes.

Entregas:

- Telefones uteis com prioridade para contatos criticos.
- Links `tel:` para chamada direta em dispositivos moveis.
- Farmacias com calculo de "aberta agora".
- Suporte a plantao que atravessa meia-noite.
- Servicos essenciais com destaque para atendimento emergencial.
- Vacinas com destaque para campanhas ativas e fonte da informacao.

Critérios de aceite:

- Contatos criticos aparecem antes dos demais.
- Farmacia aberta no horario atual recebe destaque.
- Plantao vencido nao aparece como plantao atual.
- Campanhas encerradas nao aparecem em destaque.

### Fase 8 - Busca global e refinamento

Objetivo: melhorar descoberta e experiencia final.

Entregas:

- Busca global consultando tabelas publicas relevantes.
- Resultados agrupados por modulo.
- Priorizacao da localidade selecionada.
- Melhorias de acessibilidade, contraste e foco.
- Revisao de mensagens de erro e estados vazios.

Critérios de aceite:

- Busca retorna resultados de todos os modulos.
- Resultados exibem tipo, nome, localidade e acao principal.
- Navegacao por teclado funciona nos principais controles.

### Fase 9 - Documentacao e entrega do MVP

Objetivo: deixar o projeto pronto para instalacao, manutencao e validacao.

Entregas:

- Atualizar README com configuracao do Supabase.
- Documentar SQL inicial e politicas RLS.
- Documentar criacao do primeiro admin.
- Criar checklist manual de aceite do MVP.
- Registrar limitacoes conhecidas e proximos passos.

Critérios de aceite:

- Um desenvolvedor consegue configurar o projeto seguindo a documentacao.
- Checklist cobre consulta publica, login, admin, RLS e CRUDs.
- MVP fica pronto para validacao funcional.

## 7. Interfaces Publicas

### 7.1 Supabase Auth

- Cadastro de usuario comum.
- Login.
- Logout.
- Recuperacao de senha.
- Sessao atual.

### 7.2 Consultas publicas

- Localidades ativas.
- Telefones uteis publicados.
- Farmacias de plantao publicadas.
- Servicos essenciais publicados.
- Vacinas e campanhas publicadas.
- Busca global apenas em dados publicos.

### 7.3 Area administrativa

- CRUD de localidades.
- CRUD de telefones uteis.
- CRUD de farmacias de plantao.
- CRUD de servicos essenciais.
- CRUD de vacinas.
- Dashboard administrativo.
- Auditoria basica.

## 8. Plano de Testes

### 8.1 Testes funcionais

- Consultar dados publicos sem login.
- Filtrar por localidade.
- Filtrar telefones por categoria.
- Filtrar farmacias por data.
- Filtrar servicos por categoria e bairro.
- Filtrar vacinas por publico-alvo.
- Buscar termo global e ver resultados agrupados.

### 8.2 Testes de autenticacao

- Criar usuario comum.
- Confirmar criacao automatica do `profile`.
- Fazer login.
- Fazer logout.
- Recuperar senha.
- Bloquear painel para usuario comum.
- Permitir painel para administrador.

### 8.3 Testes de seguranca

- Validar que anonimo nao insere dados.
- Validar que usuario comum nao cria registros administrativos.
- Validar que usuario comum nao edita registros administrativos.
- Validar que admin consegue criar, editar e inativar registros.
- Validar que RLS protege dados mesmo se a chamada vier diretamente pelo cliente Supabase.

### 8.4 Testes de regras de negocio

- Registro `draft` nao aparece publicamente.
- Registro `inactive` nao aparece publicamente.
- Registro `expired` nao aparece publicamente.
- Farmacia aberta agora aparece destacada.
- Plantao que atravessa meia-noite funciona corretamente.
- Campanha de vacina encerrada nao aparece em destaque.

### 8.5 Testes de UX e responsividade

- Testar em celular, tablet e desktop.
- Validar contraste das cores principais.
- Validar foco visivel em campos e botoes.
- Validar estados de loading, erro e vazio.
- Validar que botoes de telefone usam `tel:`.

## 9. Checklist de Entrega do MVP

- [ ] Supabase configurado.
- [ ] Tabelas criadas.
- [ ] RLS ativado.
- [ ] Primeiro administrador promovido.
- [ ] Frontend conectado ao Supabase.
- [ ] Consulta publica funcionando.
- [ ] Autenticacao funcionando.
- [ ] Painel administrativo protegido.
- [ ] CRUDs administrativos funcionando.
- [ ] Busca global funcionando.
- [ ] README atualizado.
- [ ] Checklist manual executado.

## 10. Riscos e Mitigacoes

### 10.1 RLS mal configurado

Risco: usuarios comuns conseguirem alterar dados administrativos.

Mitigacao:

- Testar RLS diretamente pelo cliente Supabase.
- Manter politicas pequenas e explicitas.
- Usar funcao `is_admin()` para centralizar regra.

### 10.2 Dados desatualizados

Risco: usuarios consultarem informacoes antigas.

Mitigacao:

- Exibir `updated_at` nas telas publicas.
- Usar status `expired`.
- Criar rotina administrativa de revisao.

### 10.3 Frontend expondo chaves Supabase

Risco: confusao entre chave publica e chave de servico.

Mitigacao:

- Usar apenas `SUPABASE_ANON_KEY` no frontend.
- Nunca usar `service_role` no frontend.
- Confiar na RLS para proteger operacoes.

### 10.4 Complexidade do painel administrativo

Risco: tentar implementar todos os CRUDs de uma vez.

Mitigacao:

- Implementar CRUD de localidades primeiro.
- Reaproveitar componentes de formulario e tabela.
- Avancar modulo por modulo.

## 11. Proximos Passos Pos-MVP

- Notificacoes por localidade.
- Favoritos do usuario.
- Importacao de dados por planilha.
- Alertas para revisao de informacoes antigas.
- Relatorios administrativos.
- App mobile nativo ou PWA.
- Integracoes com fontes oficiais, quando disponiveis.

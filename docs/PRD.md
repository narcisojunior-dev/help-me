# PRD - Help-me

## 1. Visão Geral

### 1.1 Nome do produto

**Help-me**

### 1.2 Objetivo

O Help-me é um guia local de emergência e utilidade pública, criado para ajudar moradores, visitantes e famílias a encontrarem rapidamente informações essenciais por localidade, como telefones úteis, farmácias de plantão, serviços essenciais próximos e calendário de vacinas.

O sistema deve priorizar rapidez, clareza, confiabilidade das informações e controle editorial. Usuários comuns podem consultar os dados, enquanto administradores são responsáveis por cadastrar, revisar, atualizar e remover informações.

### 1.3 Problema a resolver

Em situações urgentes, as pessoas normalmente precisam procurar informações espalhadas em sites, redes sociais, listas antigas ou contatos informais. Isso aumenta o tempo de resposta e pode levar ao uso de dados desatualizados.

O Help-me centraliza informações confiáveis, organizadas por cidade, bairro ou região, permitindo consulta rápida em momentos críticos.

### 1.4 Público-alvo

- Moradores que precisam encontrar contatos e serviços de emergência.
- Famílias que acompanham vacinação de crianças, idosos ou grupos prioritários.
- Visitantes que não conhecem os serviços locais.
- Gestores municipais, administradores locais ou equipes responsáveis por manter informações públicas atualizadas.

## 2. Objetivos do Produto

### 2.1 Objetivos principais

- Facilitar o acesso rápido a informações de emergência e serviços essenciais.
- Permitir consulta por localidade para reduzir ruído e aumentar relevância.
- Centralizar telefones úteis, farmácias de plantão, serviços essenciais e calendário de vacinas.
- Garantir que apenas administradores possam cadastrar, editar ou excluir informações.
- Manter uma experiência simples, acessível e confiável para usuários comuns.

### 2.2 Objetivos secundários

- Reduzir dependência de listas manuais, posts antigos e informações descentralizadas.
- Criar base para expansão futura com notificações, mapas, favoritos e alertas regionais.
- Permitir auditoria básica das informações cadastradas por administradores.

## 3. Escopo do MVP

### 3.1 Incluído no MVP

- Cadastro e autenticação de usuários.
- Perfis de acesso: administrador e usuário comum.
- Consulta de telefones úteis por localidade e categoria.
- Consulta de farmácias de plantão por localidade, data e horário.
- Consulta de serviços essenciais por localidade, categoria e disponibilidade.
- Consulta de calendário de vacinas por faixa etária, público-alvo e localidade.
- Área administrativa para cadastrar, editar, ativar, inativar e excluir informações.
- Busca textual e filtros por localidade.
- Interface responsiva para celular, tablet e desktop.

### 3.2 Fora do MVP

- Atendimento médico remoto.
- Acionamento automático de ambulância, polícia ou bombeiros.
- Integração em tempo real com sistemas governamentais.
- Pagamentos, anúncios ou marketplace.
- Chat entre usuários e administradores.
- Avaliações públicas de serviços.

## 4. Perfis de Usuário e Permissões

### 4.1 Usuário comum

Usuário comum é qualquer pessoa que acessa o sistema para consultar informações.

Permissões:

- Visualizar telefones úteis.
- Visualizar farmácias de plantão.
- Visualizar serviços essenciais.
- Visualizar calendário de vacinas.
- Filtrar informações por localidade.
- Buscar informações por nome, categoria ou palavra-chave.
- Criar conta e atualizar seus próprios dados básicos.

Restrições:

- Não pode cadastrar informações.
- Não pode editar informações.
- Não pode excluir informações.
- Não pode acessar a área administrativa.

### 4.2 Administrador

Administrador é o usuário autorizado a manter as informações do sistema.

Permissões:

- Acessar painel administrativo.
- Cadastrar, editar, ativar, inativar e excluir telefones úteis.
- Cadastrar, editar, ativar, inativar e excluir farmácias de plantão.
- Cadastrar, editar, ativar, inativar e excluir serviços essenciais.
- Cadastrar, editar, ativar, inativar e excluir registros do calendário de vacinas.
- Gerenciar localidades disponíveis.
- Visualizar histórico básico de alterações.
- Gerenciar status de registros: rascunho, publicado, inativo ou expirado.

Restrições:

- Não deve alterar senha de outros administradores sem fluxo próprio de segurança.
- Não deve publicar registros sem campos obrigatórios completos.

## 5. Funcionalidades

### 5.1 Autenticação e controle de acesso

Descrição:

O sistema deve permitir que usuários criem conta, façam login e tenham acesso conforme seu perfil.

Requisitos funcionais:

- Permitir cadastro com nome, e-mail, senha e localidade principal.
- Permitir login com e-mail e senha.
- Permitir logout.
- Permitir recuperação de senha.
- Diferenciar usuário comum e administrador.
- Bloquear acesso administrativo para usuários comuns.
- Redirecionar usuários sem permissão para uma tela de acesso negado ou página inicial.

Regras de negócio:

- Todo novo usuário deve ser criado como usuário comum por padrão.
- A promoção para administrador deve ser feita apenas por outro administrador autorizado ou por configuração interna do sistema.
- Senhas devem ser armazenadas de forma segura, nunca em texto puro.
- Sessões expiradas devem exigir novo login.

Critérios de aceite:

- Um usuário comum não consegue acessar rotas administrativas.
- Um administrador consegue entrar no painel administrativo.
- Um usuário deslogado consegue consultar informações públicas, se o produto optar por consulta pública.
- A tentativa de login com credenciais inválidas mostra mensagem clara e segura.

### 5.2 Telefones úteis

Descrição:

Área com contatos importantes para emergências e serviços públicos, organizada por localidade e categoria.

Exemplos de categorias:

- Emergência médica.
- Polícia.
- Bombeiros.
- Defesa Civil.
- Conselho Tutelar.
- Hospitais e unidades de saúde.
- Prefeitura e serviços municipais.
- Assistência social.
- Transporte público.
- Energia, água e saneamento.

Campos sugeridos:

- Nome do serviço.
- Categoria.
- Telefone principal.
- Telefones alternativos.
- Localidade atendida.
- Horário de atendimento.
- Observações.
- Status do registro.
- Data da última atualização.

Requisitos funcionais:

- Listar telefones úteis por localidade.
- Filtrar por categoria.
- Buscar por nome do serviço ou número.
- Destacar contatos críticos, como SAMU, Bombeiros e Polícia.
- Permitir toque direto no número em dispositivos móveis.
- Permitir que administradores cadastrem, editem, inativem e excluam contatos.

Regras de negócio:

- Telefones críticos devem aparecer com prioridade.
- Registros inativos não devem aparecer para usuários comuns.
- Todo contato deve ter ao menos nome, categoria, telefone e localidade.
- A data da última atualização deve ser exibida para aumentar confiança.

Critérios de aceite:

- Ao escolher uma localidade, o usuário vê apenas contatos relevantes para ela.
- Ao tocar em um telefone no celular, o sistema inicia a ação de chamada.
- Um administrador consegue atualizar um telefone e a nova informação aparece para usuários comuns.

### 5.3 Farmácias de plantão por localidade

Descrição:

Área para consulta de farmácias disponíveis em regime de plantão, com foco em data, horário e localidade.

Campos sugeridos:

- Nome da farmácia.
- Endereço completo.
- Bairro.
- Localidade.
- Telefone.
- WhatsApp, se disponível.
- Data do plantão.
- Horário inicial e final.
- Funcionamento 24h.
- Link de rota/mapa.
- Observações.
- Status do registro.

Requisitos funcionais:

- Listar farmácias de plantão da localidade selecionada.
- Filtrar por data.
- Indicar farmácias abertas no momento da consulta.
- Exibir endereço, telefone e horário de plantão.
- Permitir abertura de rota em aplicativo de mapas.
- Permitir que administradores cadastrem escalas de plantão.
- Permitir edição e inativação de escalas incorretas ou vencidas.

Regras de negócio:

- Plantões vencidos não devem aparecer como atuais.
- Farmácias abertas no momento devem ter destaque visual.
- A escala deve aceitar plantões que atravessam a meia-noite.
- Registros devem exigir data, horário, nome, endereço e localidade.

Critérios de aceite:

- O usuário consegue ver qual farmácia está aberta agora em sua localidade.
- O administrador consegue cadastrar plantão para data futura.
- Um plantão expirado deixa de aparecer na lista principal de plantões atuais.

### 5.4 Serviços essenciais por localidade

Descrição:

Área para localizar serviços essenciais próximos ou relevantes para uma região.

Exemplos de serviços:

- Hospitais.
- UBS e postos de saúde.
- Delegacias.
- CRAS e CREAS.
- Escolas públicas.
- Abrigos.
- Centros de atendimento à mulher.
- Cartórios.
- Correios.
- Serviços de água, energia e saneamento.

Campos sugeridos:

- Nome do serviço.
- Categoria.
- Descrição curta.
- Endereço completo.
- Bairro.
- Localidade.
- Telefone.
- Horário de atendimento.
- Disponibilidade de atendimento emergencial.
- Coordenadas geográficas, quando disponíveis.
- Link de rota/mapa.
- Documentos necessários, quando aplicável.
- Observações.
- Status do registro.

Requisitos funcionais:

- Listar serviços por localidade.
- Filtrar por categoria.
- Buscar por nome, bairro ou palavra-chave.
- Exibir endereço, contato, horário e instruções básicas.
- Permitir indicação de serviço emergencial ou atendimento 24h.
- Permitir que administradores mantenham os dados atualizados.

Regras de negócio:

- Serviços essenciais devem estar vinculados a uma localidade.
- Serviços com atendimento emergencial devem ter marcação clara.
- Registros incompletos não devem ser publicados.
- O sistema deve permitir inativar serviços temporariamente fechados.

Critérios de aceite:

- O usuário consegue localizar um hospital ou posto de saúde filtrando por localidade.
- O usuário consegue abrir rota para um serviço com endereço cadastrado.
- O administrador consegue inativar um serviço sem excluir definitivamente o histórico.

### 5.5 Calendário de vacinas

Descrição:

Área para consulta de vacinas recomendadas por faixa etária, público-alvo, campanha e localidade.

Públicos possíveis:

- Crianças.
- Adolescentes.
- Adultos.
- Gestantes.
- Idosos.
- Profissionais de saúde.
- Grupos prioritários.

Campos sugeridos:

- Nome da vacina.
- Público-alvo.
- Faixa etária.
- Dose ou etapa.
- Período recomendado.
- Localidade.
- Locais de aplicação.
- Documentos necessários.
- Campanha vinculada, se houver.
- Data inicial e final da campanha.
- Observações.
- Fonte da informação.
- Status do registro.

Requisitos funcionais:

- Listar vacinas por público-alvo e faixa etária.
- Filtrar calendário por localidade.
- Exibir locais de aplicação.
- Informar documentos necessários.
- Destacar campanhas ativas.
- Permitir que administradores cadastrem campanhas e vacinas.
- Permitir atualização de datas, locais e orientações.

Regras de negócio:

- Campanhas vencidas devem sair da área de destaque.
- Cada vacina deve ter público-alvo, faixa etária ou regra de elegibilidade.
- Informações sensíveis devem exibir fonte ou data de atualização.
- O sistema deve deixar claro que a informação não substitui orientação profissional de saúde.

Critérios de aceite:

- O usuário consegue consultar vacinas recomendadas para uma criança por idade.
- O usuário consegue ver onde a vacina está disponível em sua localidade.
- O administrador consegue publicar uma campanha temporária e definir data final.

### 5.6 Busca e filtros

Descrição:

Busca central para encontrar rapidamente informações em todas as áreas do sistema.

Requisitos funcionais:

- Permitir busca por termo livre.
- Permitir filtro por localidade.
- Permitir filtro por categoria.
- Permitir filtro por status de funcionamento, quando aplicável.
- Exibir resultados agrupados por tipo: telefones, farmácias, serviços e vacinas.
- Priorizar resultados da localidade selecionada pelo usuário.

Regras de negócio:

- A localidade principal do usuário deve ser usada como filtro inicial, quando disponível.
- Resultados críticos devem aparecer antes de resultados informativos.
- Registros inativos ou expirados não devem aparecer para usuários comuns.

### 5.7 Painel administrativo

Descrição:

Área restrita para manutenção dos dados do Help-me.

Requisitos funcionais:

- Exibir resumo de registros por módulo.
- Listar registros cadastrados com filtros por tipo, localidade e status.
- Permitir criar, editar, publicar, inativar e excluir registros.
- Validar campos obrigatórios antes da publicação.
- Registrar data, hora e administrador responsável pela última alteração.
- Permitir pré-visualização do registro antes da publicação.

Regras de negócio:

- Apenas administradores podem acessar o painel.
- Alterações administrativas devem ficar registradas em histórico básico.
- Exclusões definitivas devem exigir confirmação.
- Inativação deve ser preferida quando o dado pode voltar a ser útil.

Critérios de aceite:

- Usuário comum recebe bloqueio ao tentar acessar painel administrativo.
- Administrador consegue filtrar registros por localidade.
- O sistema impede publicação de registros sem campos obrigatórios.

## 6. Requisitos Não Funcionais

### 6.1 Usabilidade

- O usuário deve encontrar informações críticas em poucos toques.
- A navegação deve ser clara e orientada por categorias.
- A interface deve ser responsiva.
- A linguagem deve ser objetiva, especialmente em contextos de emergência.
- A busca deve estar visível nas telas principais.

### 6.2 Acessibilidade

- Contraste mínimo recomendado de 4.5:1 para textos.
- Interface navegável por teclado em ambiente web.
- Botões e links com áreas de toque confortáveis.
- Textos de erro claros e próximos aos campos.
- Não depender apenas de cor para indicar urgência, status ou alerta.

### 6.3 Segurança

- Senhas devem usar hash seguro.
- Rotas administrativas devem exigir autenticação e autorização.
- Dados enviados em formulários devem ser validados.
- O sistema deve proteger contra ações administrativas não autorizadas.
- Sessões devem expirar após período de inatividade.

### 6.4 Performance

- Telas principais devem carregar rapidamente em conexões móveis.
- Listas devem suportar paginação ou carregamento incremental.
- A busca deve responder de forma eficiente para bases locais pequenas e médias.
- Dados críticos podem ser cacheados para melhorar disponibilidade.

### 6.5 Confiabilidade

- Cada registro deve exibir data de atualização.
- Informações expiradas devem ser tratadas automaticamente quando houver data final.
- O sistema deve permitir correção rápida por administradores.
- Falhas de carregamento devem exibir mensagem clara e opção de tentar novamente.

## 7. Modelo de Dados Inicial

### 7.1 Usuário

- id.
- nome.
- e-mail.
- senha_hash.
- perfil: administrador ou usuario.
- localidade_principal.
- status: ativo ou inativo.
- data_criacao.
- data_atualizacao.

### 7.2 Localidade

- id.
- nome.
- estado.
- cidade.
- bairro ou região, quando aplicável.
- status.

### 7.3 Telefone útil

- id.
- nome.
- categoria.
- telefone_principal.
- telefones_alternativos.
- localidade_id.
- horario_atendimento.
- observacoes.
- prioridade.
- status.
- atualizado_por.
- data_atualizacao.

### 7.4 Farmácia de plantão

- id.
- nome.
- endereco.
- bairro.
- localidade_id.
- telefone.
- whatsapp.
- data_plantao.
- horario_inicio.
- horario_fim.
- funcionamento_24h.
- link_mapa.
- observacoes.
- status.
- atualizado_por.
- data_atualizacao.

### 7.5 Serviço essencial

- id.
- nome.
- categoria.
- descricao.
- endereco.
- bairro.
- localidade_id.
- telefone.
- horario_atendimento.
- atendimento_emergencial.
- latitude.
- longitude.
- link_mapa.
- documentos_necessarios.
- observacoes.
- status.
- atualizado_por.
- data_atualizacao.

### 7.6 Vacina ou campanha

- id.
- nome_vacina.
- publico_alvo.
- faixa_etaria.
- dose.
- periodo_recomendado.
- localidade_id.
- locais_aplicacao.
- documentos_necessarios.
- campanha.
- data_inicio.
- data_fim.
- fonte.
- observacoes.
- status.
- atualizado_por.
- data_atualizacao.

## 8. Fluxos Principais

### 8.1 Consulta de informação por usuário comum

1. Usuário acessa o Help-me.
2. Sistema identifica ou solicita localidade.
3. Usuário escolhe uma categoria ou usa a busca.
4. Sistema lista informações relevantes e ativas.
5. Usuário visualiza detalhes, telefone, endereço, horário ou rota.

### 8.2 Cadastro de informação por administrador

1. Administrador faz login.
2. Sistema valida perfil administrativo.
3. Administrador acessa o painel.
4. Administrador escolhe o módulo.
5. Administrador preenche os campos obrigatórios.
6. Sistema valida dados.
7. Administrador publica o registro.
8. Registro fica disponível para usuários comuns.

### 8.3 Atualização de informação expirada

1. Administrador acessa lista de registros.
2. Sistema sinaliza registros vencidos ou desatualizados.
3. Administrador revisa datas, horários ou status.
4. Sistema registra a alteração e atualiza a data de atualização.

## 9. Priorização

### 9.1 Alta prioridade

- Autenticação e perfis de acesso.
- Consulta por localidade.
- Telefones úteis.
- Farmácias de plantão.
- Painel administrativo básico.
- Validação de campos obrigatórios.

### 9.2 Média prioridade

- Serviços essenciais com mapa ou link de rota.
- Calendário de vacinas.
- Busca global.
- Histórico básico de alterações.
- Destaque para registros abertos agora ou campanhas ativas.

### 9.3 Baixa prioridade

- Notificações push.
- Favoritos.
- Alertas regionais.
- Importação de dados em massa.
- Integrações externas.
- Relatórios avançados.

## 10. Métricas de Sucesso

- Tempo médio para encontrar um telefone de emergência.
- Percentual de buscas com resultado.
- Quantidade de registros atualizados nos últimos 30 dias.
- Quantidade de acessos por localidade.
- Taxa de erro em formulários administrativos.
- Percentual de farmácias de plantão com horário válido.
- Frequência de atualização do calendário de vacinas.

## 11. Riscos e Mitigações

### 11.1 Informações desatualizadas

Risco: usuários podem tomar decisões com dados antigos.

Mitigação:

- Exibir data de atualização.
- Permitir status expirado.
- Criar alertas administrativos para revisão periódica.

### 11.2 Uso indevido da área administrativa

Risco: usuário sem autorização altera dados importantes.

Mitigação:

- Controle de acesso por perfil.
- Validação no backend.
- Histórico de alterações.

### 11.3 Dados críticos incorretos

Risco: telefone ou horário errado em situação urgente.

Mitigação:

- Campos obrigatórios.
- Revisão administrativa.
- Fonte da informação quando aplicável.
- Destaque para última atualização.

### 11.4 Experiência confusa em emergência

Risco: usuário não encontra rapidamente o que precisa.

Mitigação:

- Busca visível.
- Categorias claras.
- Destaque para contatos críticos.
- Interface simples, com poucas etapas.

## 12. Paleta de Cores

A paleta deve transmitir confiança, urgência controlada e clareza. O produto lida com situações sensíveis, então a interface deve evitar excesso de vermelho e usar cores semânticas com equilíbrio.

### 12.1 Cores principais

| Token | Cor | Hex | Uso recomendado |
| --- | --- | --- | --- |
| Primária | Azul confiança | `#155EEF` | Botões principais, links, foco e navegação ativa |
| Primária escura | Azul institucional | `#0B3B8C` | Cabeçalhos, estados pressionados e áreas de maior autoridade |
| Secundária | Verde saúde | `#16A34A` | Vacinas, serviços de saúde, estados positivos |
| Alerta | Vermelho emergência | `#DC2626` | Emergências, ações destrutivas e avisos críticos |
| Atenção | Âmbar plantão | `#F59E0B` | Farmácias abertas, plantões e alertas moderados |
| Informação | Ciano serviço | `#0891B2` | Serviços essenciais e mensagens informativas |

### 12.2 Cores neutras

| Token | Hex | Uso recomendado |
| --- | --- | --- |
| Fundo principal | `#F8FAFC` | Background geral da aplicação |
| Superfície | `#FFFFFF` | Cards, listas, modais e formulários |
| Superfície suave | `#EEF2F7` | Blocos secundários e áreas de filtro |
| Borda | `#CBD5E1` | Divisores, inputs e contornos |
| Texto principal | `#0F172A` | Títulos e textos de alta importância |
| Texto secundário | `#475569` | Descrições, metadados e observações |
| Texto inverso | `#FFFFFF` | Texto sobre fundos escuros |

### 12.3 Cores semânticas por módulo

| Módulo | Cor | Hex | Justificativa |
| --- | --- | --- | --- |
| Telefones úteis | Vermelho emergência | `#DC2626` | Indica urgência e acesso rápido |
| Farmácias de plantão | Âmbar plantão | `#F59E0B` | Comunica atenção temporal sem parecer erro |
| Serviços essenciais | Ciano serviço | `#0891B2` | Reforça orientação, localização e informação |
| Calendário de vacinas | Verde saúde | `#16A34A` | Associa prevenção, saúde e confirmação |
| Administração | Azul institucional | `#0B3B8C` | Transmite controle, confiança e gestão |

### 12.4 Recomendações de uso visual

- Usar vermelho apenas para emergência real, erro ou ação destrutiva.
- Usar azul como cor principal de navegação e ação.
- Usar verde para saúde, vacina e confirmação de sucesso.
- Usar âmbar para plantões, horários e atenção.
- Manter fundos claros para leitura rápida em ambientes externos.
- Garantir contraste adequado entre texto e fundo.
- Não depender apenas da cor: combinar status com texto, ícone ou rótulo.

## 13. Diretrizes de UX

- A primeira tela deve priorizar busca, localidade e categorias principais.
- Informações críticas devem aparecer antes de conteúdos administrativos ou explicativos.
- Cada registro deve mostrar nome, categoria, localidade, contato e última atualização.
- Farmácias abertas agora e contatos de emergência devem ter destaque.
- O painel administrativo deve usar formulários claros, com validação antes da publicação.
- A interface deve funcionar bem em celular, pois o uso tende a acontecer em movimento ou urgência.
- Mensagens devem ser diretas, por exemplo: "Farmácia aberta agora", "Plantão encerrado" ou "Telefone atualizado em 23/06/2026".

## 14. Roadmap Sugerido

### Fase 1 - Base do MVP

- Estrutura de usuários e perfis.
- CRUD administrativo de localidades.
- CRUD de telefones úteis.
- Consulta pública por localidade.

### Fase 2 - Serviços temporais e localização

- Farmácias de plantão.
- Serviços essenciais.
- Filtros por categoria e bairro.
- Links de rota para mapas.

### Fase 3 - Saúde preventiva

- Calendário de vacinas.
- Campanhas por período.
- Destaques para campanhas ativas.

### Fase 4 - Qualidade e expansão

- Histórico avançado.
- Alertas de revisão de dados.
- Favoritos.
- Notificações por localidade.
- Importação de dados.

## 15. Premissas

- As informações cadastradas serão mantidas por administradores confiáveis.
- O sistema começará com uma ou poucas localidades e poderá expandir.
- O MVP pode funcionar com dados manuais antes de qualquer integração externa.
- A consulta principal deve ser simples o suficiente para usuários sem familiaridade técnica.

## 16. Questões em Aberto

- A consulta exigirá login ou será pública?
- Haverá múltiplos níveis de administrador, como superadministrador e editor local?
- Quais localidades serão atendidas no lançamento?
- Haverá validação externa das informações cadastradas?
- O sistema terá app mobile nativo, web responsivo ou ambos?
- Farmácias e serviços poderão solicitar atualização dos próprios dados no futuro?

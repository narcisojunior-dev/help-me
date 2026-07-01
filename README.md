# Help-me

Aplicacao web estatica para consulta local de informacoes de emergencia e utilidade publica.

## Como executar

Sirva a pasta com HTTP para que os modulos JavaScript sejam carregados corretamente:

```powershell
node tools/static-server.mjs
```

Depois acesse `http://127.0.0.1:8000`.

## Configuracao do Supabase

A fase 0 deixa o cliente Supabase preparado, mas as chaves devem ser configuradas antes de usar dados reais.

Variaveis esperadas:

- `SUPABASE_URL`: URL do projeto, no formato `https://<project-ref>.supabase.co`.
- `SUPABASE_ANON_KEY`: chave publica/publishable do projeto Supabase.

Para desenvolvimento estatico, preencha as metas em `index.html`:

```html
<meta name="supabase-url" content="https://<project-ref>.supabase.co">
<meta name="supabase-anon-key" content="sua-chave-publica">
```

Tambem e possivel definir em tempo de execucao antes de carregar `main.js`:

```html
<script>
  window.HELP_ME_SUPABASE_CONFIG = {
    url: 'https://<project-ref>.supabase.co',
    anonKey: 'sua-chave-publica',
  };
</script>
```

Nunca coloque chave `service_role` ou `sb_secret_...` no frontend.

## Estrutura

```text
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

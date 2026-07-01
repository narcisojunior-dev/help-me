const SUPABASE_URL_META = 'meta[name="supabase-url"]';
const SUPABASE_KEY_META = 'meta[name="supabase-anon-key"]';

export function getSupabaseConfig() {
  const runtimeConfig = window.HELP_ME_SUPABASE_CONFIG ?? {};
  const metaUrl = document.querySelector(SUPABASE_URL_META)?.content?.trim();
  const metaKey = document.querySelector(SUPABASE_KEY_META)?.content?.trim();

  return {
    url: runtimeConfig.url ?? metaUrl ?? '',
    anonKey: runtimeConfig.anonKey ?? metaKey ?? '',
  };
}

export function createSupabaseClient() {
  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    return {
      client: null,
      isConfigured: false,
      message: 'Configure SUPABASE_URL e SUPABASE_ANON_KEY para inicializar o Supabase.',
    };
  }

  if (!window.supabase?.createClient) {
    return {
      client: null,
      isConfigured: false,
      message: 'Biblioteca do Supabase nao foi carregada.',
    };
  }

  return {
    client: window.supabase.createClient(url, anonKey),
    isConfigured: true,
    message: 'Supabase inicializado.',
  };
}

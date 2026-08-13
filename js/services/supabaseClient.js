/**
 * Serviço de Conexão com o Supabase (Nuvem 24/7 Multi-Dispositivo)
 * Conecta o jogo no GitHub Pages diretamente ao Banco de Dados Relacional PostgreSQL no Supabase.
 */

// Insira abaixo a URL e a Chave Pública (anon/public key) do seu projeto no Supabase:
export const SUPABASE_URL = 'https://ofrxxkiyhfvulrqosfcu.supabase.co'; 
export const SUPABASE_ANON_KEY = 'sb_publishable_Gs6V7chvRMWJjmsCD3iX4w_w3qAewhb';

export class SupabaseService {
  constructor() {
    this.client = null;
    this.initClient();
  }

  initClient() {
    if (window.supabase && SUPABASE_URL && SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL') {
      try {
        this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('⚡ Conectado ao Supabase Cloud Database com sucesso!');
      } catch (e) {
        console.warn('Erro ao inicializar cliente Supabase:', e);
      }
    }
  }

  isConfigured() {
    if (!this.client && window.supabase && SUPABASE_URL && SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL') {
      this.initClient();
    }
    return Boolean(this.client);
  }

  // Busca todos os perfis cadastrados no Supabase
  async fetchProfiles() {
    if (!this.isConfigured()) return null;
    try {
      const { data, error } = await this.client
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (e) {
      console.warn('Erro ao buscar perfis do Supabase:', e);
      return null;
    }
  }

  // Registra um novo perfil na nuvem do Supabase
  async createProfile(profileData) {
    if (!this.isConfigured()) return null;
    try {
      const payload = {
        id: profileData.id,
        name: profileData.name,
        password_hash: profileData.passwordHash || '',
        password_hint: profileData.passwordHint || '',
        coins: profileData.coins || 20,
        gems: profileData.gems || 5,
        xp: profileData.xp || 0,
        level: profileData.level || 1,
        active_mascot: profileData.activeMascot || 'aranha',
        unlocked_mascots: profileData.unlockedMascots || ['aranha'],
        profile_photo: profileData.profilePhoto || null,
        photo_gallery: profileData.photoGallery || [],
        stars: profileData.stars || {},
        stats: profileData.stats || {}
      };

      const { data, error } = await this.client
        .from('profiles')
        .insert([payload])
        .select();

      if (error) throw error;
      return data ? data[0] : null;
    } catch (e) {
      console.warn('Erro ao criar perfil no Supabase:', e);
      return null;
    }
  }

  // Sincroniza e salva alterações de moedas, nível e mascote no Supabase
  async saveProfile(playerData) {
    if (!this.isConfigured() || !playerData || !playerData.id) return false;
    try {
      const payload = {
        coins: playerData.coins,
        gems: playerData.gems,
        xp: playerData.xp,
        level: playerData.level,
        active_mascot: playerData.activeMascot,
        unlocked_mascots: playerData.unlockedMascots,
        profile_photo: playerData.profilePhoto,
        photo_gallery: playerData.photoGallery,
        stars: playerData.stars,
        stats: playerData.stats,
        updated_at: new Date().toISOString()
      };

      const { error } = await this.client
        .from('profiles')
        .update(payload)
        .eq('id', playerData.id);

      if (error) throw error;
      return true;
    } catch (e) {
      console.warn('Erro ao salvar no Supabase:', e);
      return false;
    }
  }

  // Redefine a senha de um perfil no Supabase
  async resetPassword(profileId, newPasswordHash) {
    if (!this.isConfigured()) return false;
    try {
      const { error } = await this.client
        .from('profiles')
        .update({ password_hash: newPasswordHash, updated_at: new Date().toISOString() })
        .eq('id', profileId);

      if (error) throw error;
      return true;
    } catch (e) {
      console.warn('Erro ao redefinir senha no Supabase:', e);
      return false;
    }
  }

  // Remove um perfil do Supabase
  async deleteProfile(profileId) {
    if (!this.isConfigured()) return false;
    try {
      const { error } = await this.client
        .from('profiles')
        .delete()
        .eq('id', profileId);

      if (error) throw error;
      return true;
    } catch (e) {
      console.warn('Erro ao deletar perfil do Supabase:', e);
      return false;
    }
  }
}

export const supabaseService = new SupabaseService();

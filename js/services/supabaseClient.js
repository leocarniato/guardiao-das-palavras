/**
 * Serviço de Conexão com o Supabase REST API Nativo (Nuvem 24/7 Multi-Dispositivo)
 * Conecta o jogo no GitHub Pages diretamente ao Banco de Dados Relacional PostgreSQL no Supabase via HTTP REST Nativo.
 */

export const SUPABASE_URL = 'https://ofrxxkiyhfvulrqosfcu.supabase.co'; 
export const SUPABASE_ANON_KEY = 'sb_publishable_Gs6V7chvRMWJjmsCD3iX4w_w3qAewhb';

export class SupabaseService {
  constructor() {
    this.baseUrl = `${SUPABASE_URL}/rest/v1/profiles`;
  }

  getHeaders(extraHeaders = {}) {
    return {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...extraHeaders
    };
  }

  // Busca todos os perfis cadastrados no Supabase
  async fetchProfiles() {
    try {
      const res = await fetch(`${this.baseUrl}?select=*&order=updated_at.desc`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      }
    } catch (e) {
      console.warn('Erro ao buscar perfis do Supabase:', e);
    }
    return null;
  }

  // Registra um novo perfil na nuvem do Supabase
  async createProfile(profileData) {
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

      const res = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getHeaders({ 'Prefer': 'return=representation' }),
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) && data.length > 0 ? data[0] : payload;
      }
    } catch (e) {
      console.warn('Erro ao criar perfil no Supabase:', e);
    }
    return null;
  }

  // Sincroniza e salva alterações de moedas, nível e mascote no Supabase
  async saveProfile(playerData) {
    if (!playerData || !playerData.id) return false;
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

      const res = await fetch(`${this.baseUrl}?id=eq.${encodeURIComponent(playerData.id)}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(payload)
      });

      return res.ok;
    } catch (e) {
      console.warn('Erro ao salvar no Supabase:', e);
      return false;
    }
  }

  // Redefine a senha de um perfil no Supabase
  async resetPassword(profileId, newPasswordHash) {
    try {
      const payload = {
        password_hash: newPasswordHash,
        updated_at: new Date().toISOString()
      };

      const res = await fetch(`${this.baseUrl}?id=eq.${encodeURIComponent(profileId)}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(payload)
      });

      return res.ok;
    } catch (e) {
      console.warn('Erro ao redefinir senha no Supabase:', e);
      return false;
    }
  }

  // Remove um perfil do Supabase
  async deleteProfile(profileId) {
    try {
      const res = await fetch(`${this.baseUrl}?id=eq.${encodeURIComponent(profileId)}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      return res.ok;
    } catch (e) {
      console.warn('Erro ao deletar perfil do Supabase:', e);
      return false;
    }
  }
}

export const supabaseService = new SupabaseService();

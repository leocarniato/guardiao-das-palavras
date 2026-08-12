/**
 * Serviço de Banco de Dados na Nuvem (Cloud DB)
 * Sincroniza perfis e progressos do Guardião das Palavras em tempo real
 * entre computadores, celulares e tablets através de API REST HTTPS.
 */

const KV_STORAGE_KEY = 'guardiao_palavras_cloud_v3';

export class CloudDbService {
  constructor() {
    this.endpoint = 'https://kvdb.io/W3s99t4bQZ5N6x8L29mK1p/guardiao_profiles';
  }

  // Busca todos os perfis cadastrados na Nuvem
  async fetchProfiles() {
    try {
      const res = await fetch(this.endpoint, { method: 'GET' });
      if (res.ok) {
        const text = await res.text();
        if (text) {
          const parsed = JSON.parse(text);
          if (parsed && typeof parsed === 'object') {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('Conexão Cloud KVDB:', e);
    }
    return null;
  }

  // Salva toda a base de perfis na Nuvem
  async saveProfiles(profilesMap) {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profilesMap)
      });
      return true;
    } catch (e) {
      console.warn('Erro ao salvar na Nuvem:', e);
      return false;
    }
  }
}

export const cloudDb = new CloudDbService();

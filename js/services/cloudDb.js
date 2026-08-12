/**
 * Serviço de Banco de Dados na Nuvem e Sincronização Local
 */

export class CloudDbService {
  async fetchProfiles() {
    return null;
  }

  async saveProfiles(profilesMap) {
    return true;
  }
}

export const cloudDb = new CloudDbService();

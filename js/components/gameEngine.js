/**
 * Lógica Principal do Jogo Guardião das Palavras
 * Gerencia progresso, moedas, mascotes, pontuação, múltiplos perfis e galeria de fotos
 */

import { CATEGORIES, QUESTIONS_DATA } from '../data/questionsData.js';
import { cloudDb } from '../services/cloudDb.js';

export const MASCOTS = [
  {
    id: 'aranha',
    name: 'Cyber Aranha Hero',
    price: 0,
    icon: '🕷️',
    img: 'images/cyber_hero.jpg',
    theme: 'theme-spider',
    bgGradient: 'linear-gradient(135deg, #2D0606 0%, #7F1D1D 40%, #1E1B4B 100%)',
    neonColor: '#EF4444',
    description: 'Heroi Cyber com armadura de teias de energia!',
    quote: 'Soltando teias de conhecimento para acertar todas!'
  },
  {
    id: 'craque',
    name: 'Craque Camisa 10',
    price: 50,
    icon: '⚽',
    img: 'images/soccer_star.jpg',
    theme: 'theme-soccer',
    bgGradient: 'linear-gradient(135deg, #022C22 0%, #065F46 40%, #0F172A 100%)',
    neonColor: '#10B981',
    description: 'Astro do Futebol Mundial com bola de ouro estelar!',
    quote: 'Golaço de placa na rede da ortografia!'
  },
  {
    id: 'blox',
    name: 'Blox Mech Warrior',
    price: 100,
    icon: '🤖',
    img: 'images/blox_mech.jpg',
    theme: 'theme-blox',
    bgGradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 40%, #0284C7 100%)',
    neonColor: '#0EA5E9',
    description: 'Robô Mech Pro Gamer estilo Roblox com espada de plasma!',
    quote: 'Construindo vitórias bloco por bloco!'
  },
  {
    id: 'batman',
    name: 'Batman Cavaleiro das Sombras',
    price: 150,
    icon: '🦇',
    img: 'images/batman_hero.jpg',
    theme: 'theme-batman',
    bgGradient: 'linear-gradient(135deg, #090D16 0%, #1E293B 50%, #475569 100%)',
    neonColor: '#F59E0B',
    description: 'O Cavaleiro das Sombras com batrangue de acentuação!',
    quote: 'Eu sou a justiça ortográfica da noite!'
  },
  {
    id: 'minion',
    name: 'Agente Secreto Banana',
    price: 180,
    icon: '🍌',
    img: 'images/minion_agent.jpg',
    theme: 'theme-minion',
    bgGradient: 'linear-gradient(135deg, #78350F 0%, #B45309 40%, #1E3A8A 100%)',
    neonColor: '#F59E0B',
    description: 'Agente secreto super estiloso de terno e óculos escuros!',
    quote: 'Bello! Missão secreta ortográfica ativada!'
  },
  {
    id: 'pixel',
    name: 'Cavaleiro Dragão Cyber',
    price: 220,
    icon: '👾',
    img: 'images/pixel_dragon.jpg',
    theme: 'theme-dragon',
    bgGradient: 'linear-gradient(135deg, #3B0764 0%, #6B21A8 40%, #047857 100%)',
    neonColor: '#A855F7',
    description: 'Cavaleiro Dragão Épico em armadura púrpura reluzente!',
    quote: 'Game Over pros erros com espadas de raio!'
  },
  {
    id: 'veloz',
    name: 'Piloto Veloz F1',
    price: 300,
    icon: '🏎️',
    img: 'images/speed_race.jpg',
    theme: 'theme-race',
    bgGradient: 'linear-gradient(135deg, #18181B 0%, #881337 40%, #BE123C 100%)',
    neonColor: '#EC4899',
    description: 'Piloto de Fórmula 1 na pista rumo ao pódio da vitória!',
    quote: 'Vrummm! Aceleração máxima rumo à nota 10!'
  },
  {
    id: 'frenchie',
    name: 'Super Frenchie Raio-X',
    price: 400,
    gemPrice: 10,
    icon: '🐶',
    img: 'images/super_frenchie.jpg',
    theme: 'theme-dog',
    bgGradient: 'linear-gradient(135deg, #451A03 0%, #B45309 40%, #0F172A 100%)',
    neonColor: '#F59E0B',
    description: 'Super cãozinho French Bulldog voador que solta raios laser pelos olhos!',
    quote: 'Woof! Soltando raios laser de sabedoria!',
    secret: true
  }
];

const PROFILES_STORAGE_KEY = 'guardiao_palavras_profiles_v3';

export class GameEngine {
  constructor() {
    this.categories = CATEGORIES;
    this.questionsData = QUESTIONS_DATA;

    this.profilesData = this.loadProfilesData();
    this.activeProfileId = this.profilesData.activeProfileId || null;
    
    this.playerData = (this.activeProfileId && this.profilesData.profiles && this.profilesData.profiles[this.activeProfileId])
      ? this.profilesData.profiles[this.activeProfileId]
      : null;

    // Se ainda não existir perfil ativo, pega o primeiro perfil disponível ou cria o perfil inicial 'Pedro'
    if (!this.playerData) {
      const existingProfiles = Object.values(this.profilesData.profiles || {});
      if (existingProfiles.length > 0) {
        this.activeProfileId = existingProfiles[0].id;
        this.playerData = existingProfiles[0];
        this.profilesData.activeProfileId = this.activeProfileId;
      } else {
        const defaultProfile = this.createDefaultPlayerData('Pedro');
        defaultProfile.id = 'pedro';
        if (!this.profilesData.profiles) this.profilesData.profiles = {};
        this.profilesData.profiles['pedro'] = defaultProfile;
        this.activeProfileId = 'pedro';
        this.playerData = defaultProfile;
        this.savePlayerData();
      }
    }

    // Estado da partida atual
    this.currentCategory = null;
    this.currentQuestions = [];
    this.currentQuestionIndex = 0;
    this.levelScore = 0;
    this.levelCorrectCount = 0;
    this.streak = 0;
  }

  hasActiveProfile() {
    return Boolean(this.activeProfileId && this.playerData);
  }

  async hashPassword(password) {
    if (!password) return '';
    try {
      const msgBuffer = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return password;
    }
  }

  createDefaultPlayerData(name = 'Jogador', passwordHash = '', hint = '') {
    return {
      id: 'profile_' + Date.now(),
      name: name,
      passwordHash: passwordHash,
      passwordHint: hint,
      coins: 20,
      gems: 5,
      xp: 0,
      level: 1,
      activeMascot: 'aranha',
      unlockedMascots: ['aranha'],
      profilePhoto: null,
      photoGallery: [],
      stars: {},
      stats: {
        ao_am: { attempts: 0, correct: 0, incorrect: 0 },
        som_z: { attempts: 0, correct: 0, incorrect: 0 },
        m_pb: { attempts: 0, correct: 0, incorrect: 0 },
        ch_x: { attempts: 0, correct: 0, incorrect: 0 },
        g_j: { attempts: 0, correct: 0, incorrect: 0 },
        s_ss_c_cedilha: { attempts: 0, correct: 0, incorrect: 0 },
        acento_grafico: { attempts: 0, correct: 0, incorrect: 0 }
      }
    };
  }

  loadProfilesData() {
    try {
      const savedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
      if (savedProfiles) {
        const parsed = JSON.parse(savedProfiles);
        if (parsed && parsed.profiles && typeof parsed.profiles === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar perfis:', e);
    }

    return {
      activeProfileId: null,
      profiles: {}
    };
  }

  async fetchDbProfiles() {
    try {
      const cloudProfiles = await cloudDb.fetchProfiles();
      if (cloudProfiles && typeof cloudProfiles === 'object') {
        Object.keys(cloudProfiles).forEach(id => {
          this.profilesData.profiles[id] = cloudProfiles[id];
        });
        this.savePlayerData();
        return Object.values(this.profilesData.profiles);
      }
    } catch (e) {
      console.log('Conexão Cloud:', e);
    }

    try {
      const res = await fetch('/api/profiles');
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && Array.isArray(data.profiles)) {
          data.profiles.forEach(p => {
            if (!this.profilesData.profiles[p.id]) {
              this.profilesData.profiles[p.id] = {
                ...this.createDefaultPlayerData(p.name),
                ...p,
                passwordHash: p.hasPassword ? 'DB_PROTECTED' : ''
              };
            }
          });
          this.savePlayerData();
          return data.profiles;
        }
      }
    } catch (e) {}

    return this.getProfiles();
  }

  savePlayerData() {
    try {
      if (this.activeProfileId && this.playerData) {
        if (!this.playerData.photoGallery) {
          this.playerData.photoGallery = [];
        }
        this.profilesData.profiles[this.activeProfileId] = this.playerData;
        this.profilesData.activeProfileId = this.activeProfileId;
      }

      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(this.profilesData));

      // Sincronização em Nuvem Multi-Dispositivo (PC + Celular)
      if (Object.keys(this.profilesData.profiles).length > 0) {
        cloudDb.saveProfiles(this.profilesData.profiles).catch(() => {});
      }

      // Sincronização secundária com backend Python se disponível
      if (this.playerData) {
        fetch('/api/profiles/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.playerData)
        }).catch(() => {});
      }
    } catch (e) {
      console.warn('Erro ao salvar perfis:', e);
    }
  }

  getProfiles() {
    return Object.values(this.profilesData.profiles);
  }

  async createProfile(name, password, hint = '') {
    const cleanName = (name || '').trim() || 'Novo Jogador';
    const cleanPassword = (password || '').trim();
    const cleanHint = (hint || '').trim();
    
    const hash = await this.hashPassword(cleanPassword);
    const newId = 'profile_' + Date.now();
    const newProfile = this.createDefaultPlayerData(cleanName, hash, cleanHint);
    newProfile.id = newId;

    this.profilesData.profiles[newId] = newProfile;
    this.activeProfileId = newId;
    this.playerData = newProfile;
    this.savePlayerData();

    // Envia criação para API Python se ativa
    fetch('/api/profiles/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cleanName, password: cleanPassword })
    }).catch(() => {});

    return newProfile;
  }

  async verifyPassword(profileId, inputPassword) {
    const profile = this.profilesData.profiles[profileId];
    if (!profile) return false;

    if (!profile.passwordHash && !profile.password && profile.hasPassword === false) {
      return true;
    }

    const inputHash = await this.hashPassword(inputPassword.trim());
    const storedHash = profile.passwordHash || await this.hashPassword(profile.password || '');
    
    if (inputHash === storedHash || storedHash === 'DB_PROTECTED') {
      this.activeProfileId = profileId;
      this.playerData = profile;
      this.savePlayerData();
      return true;
    }

    try {
      const res = await fetch('/api/profiles/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: profileId, password: inputPassword })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.profile) {
          this.activeProfileId = profileId;
          this.playerData = data.profile;
          this.profilesData.profiles[profileId] = data.profile;
          this.savePlayerData();
          return true;
        }
      }
    } catch (e) {}

    return false;
  }

  async resetPasswordWithPin(profileId, masterPin, newPassword) {
    const profile = this.profilesData.profiles[profileId];
    if (!profile) return { success: false, message: 'Perfil não encontrado!' };

    const cleanPin = (masterPin || '').trim();
    if (cleanPin !== '1234') {
      return { success: false, message: 'PIN Mestre dos Pais incorreto! (Padrão: 1234)' };
    }

    const newHash = await this.hashPassword((newPassword || '').trim());
    profile.passwordHash = newHash;
    delete profile.password;

    this.activeProfileId = profileId;
    this.playerData = profile;
    this.savePlayerData();
    return { success: true };
  }

  async verifyPassword(profileId, inputPassword) {
    const profile = this.profilesData.profiles[profileId];
    if (!profile) return false;

    // Se o perfil não tem senha definida
    if (!profile.passwordHash && !profile.password && profile.hasPassword === false) {
      return true;
    }

    try {
      const res = await fetch('/api/profiles/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: profileId, password: inputPassword })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.profile) {
          this.activeProfileId = profileId;
          this.playerData = data.profile;
          this.profilesData.profiles[profileId] = data.profile;
          this.savePlayerData();
          return true;
        }
      } else if (res.status === 401) {
        return false;
      }
    } catch (e) {
      console.warn('Login em modo offline:', e);
    }

    const inputHash = await this.hashPassword(inputPassword.trim());
    const storedHash = profile.passwordHash || await this.hashPassword(profile.password || '');
    return inputHash === storedHash;
  }

  hasPassword(profileId) {
    const profile = this.profilesData.profiles[profileId];
    if (!profile) return false;
    return Boolean(profile.passwordHash || profile.password || profile.hasPassword);
  }

  async setProfilePassword(profileId, newPassword) {
    const profile = this.profilesData.profiles[profileId];
    if (!profile) return false;

    try {
      await fetch('/api/profiles/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: profileId, newPassword })
      });
    } catch (e) {}

    profile.passwordHash = await this.hashPassword(newPassword.trim());
    profile.hasPassword = Boolean(newPassword.trim());
    delete profile.password; // limpa campo antigo se houver
    this.savePlayerData();
    return true;
  }

  clearProfilePassword(profileId) {
    const profile = this.profilesData.profiles[profileId];
    if (!profile) return false;
    delete profile.passwordHash;
    delete profile.password;
    profile.hasPassword = false;
    this.savePlayerData();
    return true;
  }

  async selectProfile(profileId, inputPassword) {
    if (!this.profilesData.profiles[profileId]) return false;
    
    const isCorrect = await this.verifyPassword(profileId, inputPassword);
    if (!isCorrect) return false;

    this.activeProfileId = profileId;
    this.playerData = this.profilesData.profiles[profileId];
    this.savePlayerData();
    return true;
  }

  async deleteProfile(profileId) {
    const keys = Object.keys(this.profilesData.profiles);
    if (keys.length <= 1) {
      return { success: false, message: 'Não é possível excluir o único perfil existente!' };
    }

    try {
      await fetch('/api/profiles/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: profileId })
      });
    } catch (e) {}

    delete this.profilesData.profiles[profileId];
    if (this.activeProfileId === profileId) {
      this.activeProfileId = Object.keys(this.profilesData.profiles)[0];
      this.playerData = this.profilesData.profiles[this.activeProfileId];
    }
    this.savePlayerData();
    return { success: true };
  }

  saveProfilePhoto(photoBase64) {
    if (!this.playerData) return;
    this.playerData.customProfilePhoto = photoBase64;
    this.playerData.profilePhoto = photoBase64;
    
    if (!this.playerData.photoGallery) {
      this.playerData.photoGallery = [];
    }

    const activeMascotObj = this.getActiveMascot();
    this.playerData.photoGallery.unshift({
      id: 'photo_' + Date.now(),
      dataUrl: photoBase64,
      date: new Date().toLocaleDateString('pt-BR'),
      mascotName: activeMascotObj.name || 'Mascote'
    });

    if (this.playerData.photoGallery.length > 12) {
      this.playerData.photoGallery = this.playerData.photoGallery.slice(0, 12);
    }

    this.savePlayerData();
  }

  resetProfilePhotoToMascot() {
    if (!this.playerData) return;
    this.playerData.customProfilePhoto = null;
    this.playerData.profilePhoto = null;
    this.savePlayerData();
  }

  getPhotoGallery() {
    return (this.playerData && this.playerData.photoGallery) ? this.playerData.photoGallery : [];
  }

  setPhotoAsAvatar(photoId) {
    if (!this.playerData) return false;
    const photo = (this.playerData.photoGallery || []).find(p => p.id === photoId);
    if (photo) {
      this.playerData.customProfilePhoto = photo.dataUrl;
      this.playerData.profilePhoto = photo.dataUrl;
      this.savePlayerData();
      return true;
    }
    return false;
  }

  deleteGalleryPhoto(photoId) {
    if (!this.playerData.photoGallery) return false;
    this.playerData.photoGallery = this.playerData.photoGallery.filter(p => p.id !== photoId);
    this.savePlayerData();
    return true;
  }

  startLevel(categoryId) {
    const category = this.categories.find(c => c.id === categoryId);
    if (!category) return false;

    this.currentCategory = category;
    const rawQuestions = this.questionsData[categoryId] || [];

    this.currentQuestions = [...rawQuestions].sort(() => Math.random() - 0.5);
    this.currentQuestionIndex = 0;
    this.levelScore = 0;
    this.levelCorrectCount = 0;
    this.streak = 0;

    return true;
  }

  getCurrentQuestion() {
    if (!this.currentQuestions || this.currentQuestionIndex >= this.currentQuestions.length) {
      return null;
    }
    return {
      question: this.currentQuestions[this.currentQuestionIndex],
      index: this.currentQuestionIndex + 1,
      total: this.currentQuestions.length,
      category: this.currentCategory
    };
  }

  submitAnswer(answerInput) {
    const q = this.currentQuestions[this.currentQuestionIndex];
    if (!q) return null;

    let isCorrect = false;
    if (typeof answerInput === 'number') {
      isCorrect = (answerInput === q.correct);
    } else if (typeof answerInput === 'string') {
      const cleanTyped = answerInput.trim().toLowerCase();
      const targetOpt = (q.options[q.correct] || '').trim().toLowerCase();
      const fullWordClean = (q.word || '').trim().toLowerCase();
      
      isCorrect = (cleanTyped === targetOpt) || (cleanTyped === fullWordClean);
    }

    const catId = this.currentCategory.id;

    if (!this.playerData.stats[catId]) {
      this.playerData.stats[catId] = { attempts: 0, correct: 0, incorrect: 0 };
    }

    this.playerData.stats[catId].attempts++;

    let coinsEarned = 0;

    if (isCorrect) {
      this.levelCorrectCount++;
      this.streak++;
      this.playerData.stats[catId].correct++;

      const comboBonus = Math.min(this.streak * 2, 10);
      coinsEarned = 10 + comboBonus;
      this.playerData.coins += coinsEarned;
      this.playerData.xp += 15;

      this.levelScore += 100 + (this.streak * 10);
    } else {
      this.streak = 0;
      this.playerData.stats[catId].incorrect++;
    }

    this.playerData.level = Math.floor(this.playerData.xp / 100) + 1;
    this.currentQuestionIndex++;

    const isLevelFinished = this.currentQuestionIndex >= this.currentQuestions.length;
    let starsEarned = 0;

    if (isLevelFinished) {
      const accuracyRatio = this.levelCorrectCount / this.currentQuestions.length;
      if (accuracyRatio >= 0.9) starsEarned = 3;
      else if (accuracyRatio >= 0.6) starsEarned = 2;
      else if (accuracyRatio > 0) starsEarned = 1;

      const previousStars = this.playerData.stars[catId] || 0;
      if (starsEarned > previousStars) {
        this.playerData.stars[catId] = starsEarned;
      }
    }

    this.savePlayerData();

    return {
      isCorrect,
      correctIndex: q.correct,
      correctWord: q.word || q.options[q.correct],
      correctOption: q.options[q.correct],
      explanation: q.explanation,
      coinsEarned,
      streak: this.streak,
      isLevelFinished,
      starsEarned,
      totalCoins: this.playerData.coins,
      levelCorrectCount: this.levelCorrectCount,
      totalQuestions: this.currentQuestions.length
    };
  }

  getMascots() {
    const playerData = this.playerData || { unlockedMascots: ['aranha'], activeMascot: 'aranha', coins: 0 };
    return MASCOTS.map(mascot => {
      const isUnlocked = (playerData.unlockedMascots || []).includes(mascot.id);
      const isActive = (playerData.activeMascot || 'aranha') === mascot.id;
      return {
        ...mascot,
        unlocked: isUnlocked,
        active: isActive,
        canAfford: (playerData.coins || 0) >= mascot.price
      };
    });
  }

  buyMascot(mascotId) {
    if (!this.playerData) return { success: false, message: 'Perfil não selecionado!' };
    const mascot = MASCOTS.find(m => m.id === mascotId);
    if (!mascot) return { success: false, message: 'Mascote não encontrado!' };

    if ((this.playerData.unlockedMascots || []).includes(mascotId)) {
      return { success: false, message: 'Mascote já desbloqueado!' };
    }

    if ((this.playerData.coins || 0) < mascot.price) {
      return { success: false, message: 'Moedas insuficientes!' };
    }

    this.playerData.coins -= mascot.price;
    if (!this.playerData.unlockedMascots) this.playerData.unlockedMascots = ['aranha'];
    this.playerData.unlockedMascots.push(mascotId);
    this.playerData.activeMascot = mascotId;

    this.savePlayerData();
    return { success: true, message: `Você desbloqueou o ${mascot.name}! 🎉`, mascot };
  }

  selectMascot(mascotId) {
    if (!this.playerData) return false;
    const unlocked = this.playerData.unlockedMascots || ['aranha'];
    if (!unlocked.includes(mascotId)) {
      return false;
    }
    this.playerData.activeMascot = mascotId;
    this.savePlayerData();
    return true;
  }

  getActiveMascot() {
    const activeId = (this.playerData && this.playerData.activeMascot) ? this.playerData.activeMascot : 'aranha';
    return MASCOTS.find(m => m.id === activeId) || MASCOTS[0];
  }

  // Modo Puzzle Matriz (Desafio Multi-Preenchimento com Palavras Completas)
  startMatrixPuzzle() {
    const allQuestions = [];
    Object.keys(this.questionsData).forEach(catId => {
      const list = this.questionsData[catId] || [];
      list.forEach(q => allQuestions.push({ ...q, categoryId: catId }));
    });

    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    this.currentMatrixQuestions = shuffled.slice(0, 4);

    // Resposta esperada no modo Matrix = palavra completa q.word (ex: "balão", "cantaram", "cenoura", "leão")
    const correctWords = this.currentMatrixQuestions.map(q => q.word);
    
    // Distratores com palavras completas
    const extraPool = ['picolé', 'árvore', 'rápido', 'mágico', 'pássaro', 'lâmpada', 'abacaxi', 'cachorro', 'futebol', 'amizade', 'tesouro', 'princesa', 'maçã', 'ônibus'];
    const distractors = extraPool.filter(w => !correctWords.includes(w)).slice(0, 2);

    const bankPool = [...correctWords, ...distractors].sort(() => Math.random() - 0.5);

    return {
      questions: this.currentMatrixQuestions,
      wordBank: bankPool
    };
  }

  submitMatrixPuzzle(userSelections) {
    if (!this.currentMatrixQuestions) return { success: false };

    let correctCount = 0;
    this.currentMatrixQuestions.forEach((q, idx) => {
      const selected = userSelections[idx];
      const targetWord = q.word; // Compara com a palavra completa
      if (selected && (selected.trim().toLowerCase() === targetWord.trim().toLowerCase())) {
        correctCount++;
      }
    });

    const isComplete = correctCount === this.currentMatrixQuestions.length;
    let coinsEarned = 0;
    let gemsEarned = 0;

    if (isComplete) {
      coinsEarned = 35;
      gemsEarned = 1;
      this.playerData.coins += coinsEarned;
      this.playerData.gems = (this.playerData.gems || 0) + gemsEarned;
      this.playerData.xp += 30;
      this.playerData.level = Math.floor(this.playerData.xp / 100) + 1;
      this.savePlayerData();
    }

    return {
      isComplete,
      correctCount,
      total: this.currentMatrixQuestions.length,
      coinsEarned,
      gemsEarned,
      totalCoins: this.playerData.coins,
      totalGems: this.playerData.gems
    };
  }
}

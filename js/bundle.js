/**
 * Guardião das Palavras - Single Bundle JS (Compatível com file:// e http://)
 * Suporte completo a Celular/Smartphones, WebCam, Mascotes no Quadrado Perfeito (object-fit: contain)
 * e Troca Automática da Foto de Perfil ao Mudar de Mascote/Tema.
 */

// 1. DADOS DE PERGUNTAS E CATEGORIAS
const CATEGORIES = [
  {
    id: 'ao_am',
    title: 'Missão ÃO ou AM (Futuro vs Passado)',
    subtitle: 'Eles cantaram ontem ou cantarão amanhã?',
    description: 'Aprenda quando usar -ÃO para ações no futuro e -AM para ações no passado!',
    icon: '🔮',
    bgGradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
    badgeColor: '#818CF8'
  },
  {
    id: 'som_z',
    title: 'Missão Som de Z (Z, S ou X)',
    subtitle: 'Mesa, Beleza ou Exemplo?',
    description: 'Descubra qual letra faz o som de Z em cada palavra!',
    icon: '⚡',
    bgGradient: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)',
    badgeColor: '#34D399'
  },
  {
    id: 'm_pb',
    title: 'Missão M antes de P e B',
    subtitle: 'Campo, Tambor ou Anjo?',
    description: 'Regra de ouro: Antes de P e B só se usa M!',
    icon: '🛡️',
    bgGradient: 'linear-gradient(135deg, #701A75 0%, #A21CAF 100%)',
    badgeColor: '#F0ABFC'
  },
  {
    id: 'ch_x',
    title: 'Missão CH ou X',
    subtitle: 'Chuva, Xícara ou Caicha?',
    description: 'Desvende o enigma do som de CH e X nas palavras!',
    icon: '🕵️',
    bgGradient: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 100%)',
    badgeColor: '#FB923C'
  },
  {
    id: 'g_j',
    title: 'Missão G ou J',
    subtitle: 'Girafa, Jibóia ou Gelo?',
    description: 'Treine a grafia correta de palavras com G e J!',
    icon: '🦒',
    bgGradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
    badgeColor: '#4ADE80'
  },
  {
    id: 's_ss_c_cedilha',
    title: 'Missão S, SS, C ou Ç',
    subtitle: 'Massa, Sol, Cabeça ou Cenoura?',
    description: 'Mestre da escrita: Acerte a grafia correta do som de S!',
    icon: '🎯',
    bgGradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
    badgeColor: '#38BDF8'
  },
  {
    id: 'acento_grafico',
    title: 'Missão Acentuação Mágica',
    subtitle: 'Café, Árvore, Lâmpada ou Ônibus?',
    description: 'Coloque os acentos agudo (´) e circunflexo (^) nos lugares certos!',
    icon: '✨',
    bgGradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 100%)',
    badgeColor: '#C084FC'
  }
];

const QUESTIONS_DATA = {
  ao_am: [
    { word: 'Eles viajarão', options: ['ÃO', 'AM'], correct: 0, explanation: 'Viajarão (com ÃO) indica uma ação que ainda vai acontecer no FUTURO (amanhã).' },
    { word: 'Eles viajaram', options: ['AM', 'ÃO'], correct: 0, explanation: 'Viajaram (com AM) indica uma ação que já aconteceu no PASSADO (ontem).' },
    { word: 'Amanhã os meninos jogarão', options: ['ÃO', 'AM'], correct: 0, explanation: 'Como a frase diz "Amanhã", o verbo fica no futuro: jogarão (ÃO).' },
    { word: 'Ontem as meninas comeram', options: ['AM', 'ÃO'], correct: 0, explanation: 'Como a frase diz "Ontem", o verbo fica no passado: comeram (AM).' },
    { word: 'No próximo sábado eles cantarão', options: ['ÃO', 'AM'], correct: 0, explanation: 'Próximo sábado é futuro, por isso usamos cantarão (ÃO).' },
    { word: 'Na semana passada eles correram', options: ['AM', 'ÃO'], correct: 0, explanation: 'Semana passada é passado, por isso usamos correram (AM).' },
    { word: 'Eles brincarão', options: ['ÃO', 'AM'], correct: 0, explanation: 'Brincarão (ÃO) é futuro.' },
    { word: 'Eles brincaram', options: ['AM', 'ÃO'], correct: 0, explanation: 'Brincaram (AM) é passado.' },
    { word: 'Ano que vem eles estudarão', options: ['ÃO', 'AM'], correct: 0, explanation: 'Ano que vem é futuro: estudarão (ÃO).' },
    { word: 'Ontem à noite eles assistiram', options: ['AM', 'ÃO'], correct: 0, explanation: 'Ontem à noite é passado: assistiram (AM).' }
  ],
  som_z: [
    { word: 'Mesa', options: ['S', 'Z', 'X'], correct: 0, explanation: 'A palavra MESA é escrita com S, mas tem som de Z por estar entre duas vogais.' },
    { word: 'Beleza', options: ['Z', 'S', 'X'], correct: 0, explanation: 'A palavra BELEZA é escrita com Z!' },
    { word: 'Exemplo', options: ['X', 'Z', 'S'], correct: 0, explanation: 'EXEMPLO é escrito com X, mas a letra X tem som de Z nesta palavra!' },
    { word: 'Casa', options: ['S', 'Z', 'X'], correct: 0, explanation: 'CASA é escrita com S (com som de Z entre vogais).' },
    { word: 'Azul', options: ['Z', 'S', 'X'], correct: 0, explanation: 'AZUL é escrita com Z.' },
    { word: 'Exame', options: ['X', 'Z', 'S'], correct: 0, explanation: 'EXAME é escrito com X (com som de Z).' },
    { word: 'Princesa', options: ['S', 'Z', 'X'], correct: 0, explanation: 'PRINCESA é escrita com S.' },
    { word: 'Natureza', options: ['Z', 'S', 'X'], correct: 0, explanation: 'NATUREZA é escrita com Z.' },
    { word: 'Exército', options: ['X', 'Z', 'S'], correct: 0, explanation: 'EXÉRCITO é escrito com X com som de Z.' },
    { word: 'Rosa', options: ['S', 'Z', 'X'], correct: 0, explanation: 'ROSA é escrita com S.' }
  ],
  m_pb: [
    { word: 'Campo', options: ['M', 'N'], correct: 0, explanation: 'Usamos M antes da letra P (caMpo).' },
    { word: 'Tambor', options: ['M', 'N'], correct: 0, explanation: 'Usamos M antes da letra B (taMbor).' },
    { word: 'Canto', options: ['N', 'M'], correct: 0, explanation: 'Usamos N pois a letra seguinte é T (não é P nem B).' },
    { word: 'Samba', options: ['M', 'N'], correct: 0, explanation: 'Usamos M antes de B (saMba).' },
    { word: 'Lâmpada', options: ['M', 'N'], correct: 0, explanation: 'Usamos M antes de P (lâMpada).' },
    { word: 'Ponte', options: ['N', 'M'], correct: 0, explanation: 'Usamos N pois a letra seguinte é T.' },
    { word: 'Bomba', options: ['M', 'N'], correct: 0, explanation: 'Usamos M antes de B (boMba).' },
    { word: 'Computador', options: ['M', 'N'], correct: 0, explanation: 'Usamos M antes de P (coMputador).' },
    { word: 'Dente', options: ['N', 'M'], correct: 0, explanation: 'Usamos N pois a letra seguinte é T.' },
    { word: 'Umbigo', options: ['M', 'N'], correct: 0, explanation: 'Usamos M antes de B (uMbigo).' }
  ],
  ch_x: [
    { word: 'Chuva', options: ['CH', 'X'], correct: 0, explanation: 'CHUVA se escreve com CH!' },
    { word: 'Xícara', options: ['X', 'CH'], correct: 0, explanation: 'XÍCARA se escreve com X!' },
    { word: 'Caixa', options: ['X', 'CH'], correct: 0, explanation: 'CAIXA se escreve com X!' },
    { word: 'Chave', options: ['CH', 'X'], correct: 0, explanation: 'CHAVE se escreve com CH!' },
    { word: 'Lixo', options: ['X', 'CH'], correct: 0, explanation: 'LIXO se escreve com X!' },
    { word: 'Chocolate', options: ['CH', 'X'], correct: 0, explanation: 'CHOCOLATE se escreve com CH!' },
    { word: 'Peixe', options: ['X', 'CH'], correct: 0, explanation: 'PEIXE se escreve com X!' },
    { word: 'Chinelos', options: ['CH', 'X'], correct: 0, explanation: 'CHINELOS se escreve com CH!' },
    { word: 'Bexiga', options: ['X', 'CH'], correct: 0, explanation: 'BEXIGA se escreve com X!' },
    { word: 'Mochila', options: ['CH', 'X'], correct: 0, explanation: 'MOCHILA se escreve com CH!' }
  ],
  g_j: [
    { word: 'Girafa', options: ['G', 'J'], correct: 0, explanation: 'GIRAFA se escreve com G!' },
    { word: 'Jibóia', options: ['J', 'G'], correct: 0, explanation: 'JIBÓIA se escreve com J!' },
    { word: 'Gelo', options: ['G', 'J'], correct: 0, explanation: 'GELO se escreve com G!' },
    { word: 'Janela', options: ['J', 'G'], correct: 0, explanation: 'JANELA se escreve com J!' },
    { word: 'Gente', options: ['G', 'J'], correct: 0, explanation: 'GENTE se escreve com G!' },
    { word: 'Jacaré', options: ['J', 'G'], correct: 0, explanation: 'JACARÉ se escreve com J!' },
    { word: 'Relógio', options: ['G', 'J'], correct: 0, explanation: 'RELÓGIO se escreve com G!' },
    { word: 'Jogo', options: ['J', 'G'], correct: 0, explanation: 'JOGO se escreve com J!' },
    { word: 'Mágico', options: ['G', 'J'], correct: 0, explanation: 'MÁGICO se escreve com G!' },
    { word: 'Jardim', options: ['J', 'G'], correct: 0, explanation: 'JARDIM se escreve com J!' }
  ],
  s_ss_c_cedilha: [
    { word: 'Massa', options: ['SS', 'S', 'Ç', 'C'], correct: 0, explanation: 'MASSA se escreve com SS entre vogais para manter o som forte de S!' },
    { word: 'Sol', options: ['S', 'SS', 'C', 'Ç'], correct: 0, explanation: 'No início de palavras só se usa S simples (nunca SS ou Ç).' },
    { word: 'Cabeça', options: ['Ç', 'C', 'S', 'SS'], correct: 0, explanation: 'CABEÇA se escreve com Ç antes da vogal A!' },
    { word: 'Cenoura', options: ['C', 'S', 'Ç', 'SS'], correct: 0, explanation: 'CENOURA se escreve com C (antes de E e I o C tem som de S).' },
    { word: 'Pássaro', options: ['SS', 'S', 'Ç', 'C'], correct: 0, explanation: 'PÁSSARO se escreve com SS!' },
    { word: 'Sapo', options: ['S', 'SS', 'C', 'Ç'], correct: 0, explanation: 'SAPO começa com S simples.' },
    { word: 'Coração', options: ['Ç', 'C', 'S', 'SS'], correct: 0, explanation: 'CORAÇÃO se escreve com Ç!' },
    { word: 'Cidade', options: ['C', 'S', 'Ç', 'SS'], correct: 0, explanation: 'CIDADE se escreve com C!' },
    { word: 'Osso', options: ['SS', 'S', 'Ç', 'C'], correct: 0, explanation: 'OSSO se escreve com SS!' },
    { word: 'Abraço', options: ['Ç', 'C', 'S', 'SS'], correct: 0, explanation: 'ABRAÇO se escreve com Ç!' }
  ],
  acento_grafico: [
    { word: 'Café', options: ['É', 'E'], correct: 0, explanation: 'CAFÉ leva acento agudo no É por ser oxítona aberta!' },
    { word: 'Árvore', options: ['Á', 'A'], correct: 0, explanation: 'ÁRVORE leva acento agudo no Á por ser proparoxítona!' },
    { word: 'Lâmpada', options: ['Â', 'A'], correct: 0, explanation: 'LÂMPADA leva acento circunflexo (Â) por ter som fechado e nasal!' },
    { word: 'Ônibus', options: ['Ô', 'O'], correct: 0, explanation: 'ÔNIBUS leva acento circunflexo (Ô)!' },
    { word: 'Picolé', options: ['É', 'E'], correct: 0, explanation: 'PICOLÉ leva acento agudo no É!' },
    { word: 'Mágico', options: ['Á', 'A'], correct: 0, explanation: 'MÁGICO leva acento agudo no Á!' },
    { word: 'Vovô', options: ['Ô', 'O'], correct: 0, explanation: 'VOVÔ tem som fechado e leva acento circunflexo!' },
    { word: 'Vovó', options: ['Ó', 'O'], correct: 0, explanation: 'VOVÓ tem som aberto e leva acento agudo!' },
    { word: 'Rápido', options: ['Á', 'A'], correct: 0, explanation: 'RÁPIDO leva acento agudo no Á!' },
    { word: 'Música', options: ['Ú', 'U'], correct: 0, explanation: 'MÚSICA leva acento agudo no Ú!' }
  ]
};

// 2. GERENCIADOR DE ÁUDIO E EFEITOS SONOROS
class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.bgmAudio = null;
    this.isBGMPlaying = false;
    this.bgmVolume = 0.25;

    this.themeBGMMap = {
      'theme-spider': 'js/audio/bgm_spider.mp3',
      'theme-soccer': 'js/audio/bgm_soccer.mp3',
      'theme-blox': 'js/audio/bgm_blox.mp3',
      'theme-batman': 'js/audio/bgm_batman.mp3',
      'theme-minion': 'js/audio/bgm_minion.mp3',
      'theme-dragon': 'js/audio/bgm_dragon.mp3',
      'theme-race': 'js/audio/bgm_race.mp3',
      'theme-dog': 'js/audio/bgm_dog.mp3'
    };

    this.currentTheme = 'theme-spider';
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playClick() {
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  playSuccess() {
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.setValueAtTime(659.25, now + 0.1);
      osc1.frequency.setValueAtTime(783.99, now + 0.2);

      osc2.frequency.setValueAtTime(1046.50, now + 0.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc1.start(now);
      osc2.start(now + 0.2);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } catch (e) {}
  }

  playError() {
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(164.81, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  playFanfare() {
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.25, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.12 + 0.3);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.3);
      });
    } catch (e) {}
  }

  toggleBGM() {
    if (this.isBGMPlaying) {
      this.pauseBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  startBGM() {
    if (!this.bgmAudio) {
      const src = this.themeBGMMap[this.currentTheme] || this.themeBGMMap['theme-spider'];
      this.bgmAudio = new Audio(src);
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = this.bgmVolume;
    }
    this.bgmAudio.play().then(() => {
      this.isBGMPlaying = true;
    }).catch(e => {
      console.log("Aguardando clique do usuário para BGM:", e);
    });
  }

  pauseBGM() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.isBGMPlaying = false;
    }
  }

  updateBGMTheme(themeClass) {
    if (this.currentTheme === themeClass) return;
    this.currentTheme = themeClass;

    const newSrc = this.themeBGMMap[themeClass] || this.themeBGMMap['theme-spider'];
    if (this.bgmAudio) {
      const wasPlaying = this.isBGMPlaying;
      this.bgmAudio.pause();
      this.bgmAudio = new Audio(newSrc);
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = this.bgmVolume;

      if (wasPlaying) {
        this.bgmAudio.play().catch(() => {});
      }
    }
  }

  speakText(text) {
    if (!text) return;
    const cleanText = text.replace(/\[.*?\]/g, '').trim();

    try {
      const ttsUrl = `/api/tts?q=${encodeURIComponent(cleanText)}`;
      const audio = new Audio(ttsUrl);
      audio.play().catch(() => {
        this.fallbackSpeechSynthesis(cleanText);
      });
    } catch (e) {
      this.fallbackSpeechSynthesis(cleanText);
    }
  }

  fallbackSpeechSynthesis(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.includes('pt') || v.lang.includes('PT'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

const soundManager = new SoundManager();

// 3. CLOUD DB SERVICE
class CloudDbService {
  async fetchProfiles() {
    return null;
  }

  async saveProfiles(profilesMap) {
    return true;
  }
}

const cloudDb = new CloudDbService();

// 4. PARENT REPORT COMPONENT
class ParentReportComponent {
  render(containerEl, playerData) {
    if (!containerEl) return;
    if (!playerData) {
      containerEl.innerHTML = `<div style="color: #94A3B8; text-align: center; padding: 24px;">Nenhum perfil selecionado.</div>`;
      return;
    }

    const stats = playerData.stats || {};
    const categories = CATEGORIES;

    let totalAttempts = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;

    const rowsHTML = categories.map(cat => {
      const st = stats[cat.id] || { attempts: 0, correct: 0, incorrect: 0 };
      totalAttempts += st.attempts;
      totalCorrect += st.correct;
      totalIncorrect += st.incorrect;

      const accuracy = st.attempts > 0 ? Math.round((st.correct / st.attempts) * 100) : 0;

      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
          <td style="padding: 12px; font-weight: 700; color: #FFF; font-family: var(--font-body);">${cat.icon} ${cat.title.split('(')[0]}</td>
          <td style="padding: 12px; text-align: center; color: #38BDF8; font-weight: 700;">${st.attempts}</td>
          <td style="padding: 12px; text-align: center; color: #34D399; font-weight: 700;">${st.correct}</td>
          <td style="padding: 12px; text-align: center; color: #F87171; font-weight: 700;">${st.incorrect}</td>
          <td style="padding: 12px; text-align: center;">
            <span style="background: ${accuracy >= 70 ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)'}; color: ${accuracy >= 70 ? '#34D399' : '#F87171'}; padding: 4px 10px; border-radius: 12px; font-weight: 800; font-size: 0.9rem;">${accuracy}%</span>
          </td>
        </tr>
      `;
    }).join('');

    const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    containerEl.innerHTML = `
      <div style="background: #0F172A; border: 2px solid #38BDF8; border-radius: 20px; padding: 24px; color: #FFF;">
        <h3 style="font-family: var(--font-heading); color: #38BDF8; font-size: 1.4rem; margin-bottom: 8px;">
          📊 Relatório de Desempenho: <span style="color: #F59E0B;">${playerData.name}</span>
        </h3>
        <p style="color: #94A3B8; font-size: 0.95rem; margin-bottom: 20px;">
          Acompanhe em tempo real a evolução da criança em cada regra ortográfica.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div style="background: rgba(56, 189, 248, 0.1); border: 1.5px solid #38BDF8; border-radius: 16px; padding: 16px; text-align: center;">
            <div style="font-size: 0.85rem; color: #94A3B8; font-weight: 700;">TOTAL DE QUESTÕES</div>
            <div style="font-size: 1.8rem; font-weight: 900; color: #38BDF8; margin-top: 4px;">${totalAttempts}</div>
          </div>
          <div style="background: rgba(52, 211, 153, 0.1); border: 1.5px solid #34D399; border-radius: 16px; padding: 16px; text-align: center;">
            <div style="font-size: 0.85rem; color: #94A3B8; font-weight: 700;">ACERTOS TOTAL</div>
            <div style="font-size: 1.8rem; font-weight: 900; color: #34D399; margin-top: 4px;">${totalCorrect}</div>
          </div>
          <div style="background: rgba(245, 158, 11, 0.1); border: 1.5px solid #F59E0B; border-radius: 16px; padding: 16px; text-align: center;">
            <div style="font-size: 0.85rem; color: #94A3B8; font-weight: 700;">PRECISÃO GERAL</div>
            <div style="font-size: 1.8rem; font-weight: 900; color: #F59E0B; margin-top: 4px;">${overallAccuracy}%</div>
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="background: #1E293B; color: #38BDF8; font-family: var(--font-heading); font-size: 0.85rem;">
                <th style="padding: 12px; border-radius: 10px 0 0 10px;">MISSÃO / REGRA</th>
                <th style="padding: 12px; text-align: center;">TENTATIVAS</th>
                <th style="padding: 12px; text-align: center;">ACERTOS</th>
                <th style="padding: 12px; text-align: center;">ERROS</th>
                <th style="padding: 12px; text-align: center; border-radius: 0 10px 10px 0;">PRECISÃO</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

const parentReport = new ParentReportComponent();

// 5. MASCOTES E LÓGICA PRINCIPAL DO JOGO (GAME ENGINE)
const MASCOTS = [
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

class GameEngine {
  constructor() {
    this.categories = CATEGORIES;
    this.questionsData = QUESTIONS_DATA;

    this.profilesData = this.loadProfilesData();
    this.activeProfileId = this.profilesData.activeProfileId || null;
    
    this.playerData = (this.activeProfileId && this.profilesData.profiles && this.profilesData.profiles[this.activeProfileId])
      ? this.profilesData.profiles[this.activeProfileId]
      : null;

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
      customProfilePhoto: null,
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
    } catch (e) {}

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

      if (this.playerData) {
        fetch('/api/profiles/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.playerData)
        }).catch(() => {});
      }
    } catch (e) {
      console.error('Erro ao salvar progresso:', e);
    }
  }

  getProfiles() {
    return Object.values(this.profilesData.profiles || {});
  }

  async createProfile(name, password = '', hint = '') {
    const pwdHash = await this.hashPassword(password);
    const newProfile = this.createDefaultPlayerData(name, pwdHash, hint);

    this.profilesData.profiles[newProfile.id] = newProfile;
    this.activeProfileId = newProfile.id;
    this.playerData = newProfile;
    this.savePlayerData();

    try {
      const res = await fetch('/api/profiles/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.profile) {
          this.profilesData.profiles[data.profile.id] = { ...newProfile, ...data.profile };
          delete this.profilesData.profiles[newProfile.id];
          this.activeProfileId = data.profile.id;
          this.playerData = this.profilesData.profiles[data.profile.id];
          this.savePlayerData();
        }
      }
    } catch (e) {}

    return newProfile;
  }

  hasPassword(profileId) {
    const profile = this.profilesData.profiles[profileId];
    return Boolean(profile && profile.passwordHash);
  }

  async verifyPassword(profileId, passwordInput) {
    const profile = this.profilesData.profiles[profileId];
    if (!profile || !profile.passwordHash) return true;

    if (profile.passwordHash === 'DB_PROTECTED') {
      try {
        const res = await fetch('/api/profiles/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: profileId, password: passwordInput })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.profile) {
            this.profilesData.profiles[profileId] = { ...profile, ...data.profile };
            return true;
          }
        }
      } catch (e) {}
      return false;
    }

    const inputHash = await this.hashPassword(passwordInput);
    return profile.passwordHash === inputHash;
  }

  async resetPasswordWithMasterPin(profileId, masterPinInput, newPassword) {
    if (masterPinInput !== '1234') {
      return { success: false, message: 'PIN Mestre dos Pais incorreto! O PIN padrão é 1234.' };
    }

    const profile = this.profilesData.profiles[profileId];
    if (!profile) return { success: false, message: 'Perfil não encontrado!' };

    const newHash = await this.hashPassword(newPassword);
    profile.passwordHash = newHash;
    this.savePlayerData();

    try {
      fetch('/api/profiles/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: profileId, newPassword })
      }).catch(() => {});
    } catch (e) {}

    return { success: true, message: 'Senha redefinida com sucesso!' };
  }

  async selectProfile(profileId, passwordInput = '') {
    if (!this.profilesData.profiles[profileId]) return false;

    if (this.hasPassword(profileId)) {
      const isCorrect = await this.verifyPassword(profileId, passwordInput);
      if (!isCorrect) return false;
    }

    this.activeProfileId = profileId;
    this.playerData = this.profilesData.profiles[profileId];
    this.savePlayerData();
    return true;
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

  setProfilePhotoFromGallery(photoId) {
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

  deletePhotoFromGallery(photoId) {
    if (!this.playerData || !this.playerData.photoGallery) return false;
    this.playerData.photoGallery = this.playerData.photoGallery.filter(p => p.id !== photoId);
    this.savePlayerData();
    return true;
  }

  startLevel(categoryId) {
    this.currentCategory = this.categories.find(c => c.id === categoryId);
    if (!this.currentCategory) return false;

    const allQ = this.questionsData[categoryId] || [];
    this.currentQuestions = [...allQ].sort(() => Math.random() - 0.5).slice(0, 5);

    this.currentQuestionIndex = 0;
    this.levelScore = 0;
    this.levelCorrectCount = 0;
    this.streak = 0;

    return true;
  }

  getCurrentQuestion() {
    if (this.currentQuestionIndex < this.currentQuestions.length) {
      return this.currentQuestions[this.currentQuestionIndex];
    }
    return null;
  }

  submitAnswer(selectedOptionIndex) {
    const q = this.getCurrentQuestion();
    if (!q) return null;

    const isCorrect = (selectedOptionIndex === q.correct);
    let coinsEarned = 0;

    if (!this.playerData) {
      this.playerData = this.createDefaultPlayerData('Pedro');
    }

    const catId = this.currentCategory ? this.currentCategory.id : 'geral';

    if (!this.playerData.stats) this.playerData.stats = {};
    if (!this.playerData.stats[catId]) {
      this.playerData.stats[catId] = { attempts: 0, correct: 0, incorrect: 0 };
    }
    this.playerData.stats[catId].attempts++;

    if (isCorrect) {
      this.levelCorrectCount++;
      this.streak++;
      coinsEarned = 10 + (this.streak > 1 ? 5 : 0);
      this.levelScore += coinsEarned;

      this.playerData.stats[catId].correct++;
      this.playerData.coins = (this.playerData.coins || 0) + coinsEarned;
      this.playerData.xp = (this.playerData.xp || 0) + 15;
      soundManager.playSuccess();
    } else {
      this.streak = 0;
      this.playerData.stats[catId].incorrect++;
      soundManager.playError();
    }

    this.playerData.level = Math.floor((this.playerData.xp || 0) / 100) + 1;

    this.currentQuestionIndex++;
    const isLevelFinished = (this.currentQuestionIndex >= this.currentQuestions.length);

    let starsEarned = 0;
    if (isLevelFinished) {
      const accuracy = (this.levelCorrectCount / this.currentQuestions.length);
      if (accuracy === 1) starsEarned = 3;
      else if (accuracy >= 0.6) starsEarned = 2;
      else if (accuracy >= 0.4) starsEarned = 1;

      if (!this.playerData.stars) this.playerData.stars = {};
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

  startMatrixPuzzle() {
    const allQuestions = [];
    Object.keys(this.questionsData).forEach(catId => {
      const list = this.questionsData[catId] || [];
      list.forEach(q => allQuestions.push({ ...q, categoryId: catId }));
    });

    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    this.currentMatrixQuestions = shuffled.slice(0, 4);

    const correctWords = this.currentMatrixQuestions.map(q => q.word);
    const extraPool = ['picolé', 'árvore', 'rápido', 'mágico', 'pássaro', 'lâmpada', 'abacaxi', 'cachorro', 'futebol', 'amizade', 'tesouro', 'princesa', 'maçã', 'ônibus'];
    const distractors = extraPool.filter(w => !correctWords.includes(w)).slice(0, 2);

    const bankPool = [...correctWords, ...distractors].sort(() => Math.random() - 0.5);

    return {
      questions: this.currentMatrixQuestions,
      wordBank: bankPool
    };
  }

  submitMatrixAnswers(answersArray) {
    if (!this.currentMatrixQuestions || this.currentMatrixQuestions.length === 0) {
      return null;
    }

    let correctCount = 0;
    const results = this.currentMatrixQuestions.map((q, idx) => {
      const userAns = (answersArray[idx] || '').trim().toLowerCase();
      const expected = (q.word || '').trim().toLowerCase();
      const isOk = (userAns === expected);
      if (isOk) correctCount++;
      return {
        question: q,
        userAnswer: answersArray[idx],
        expectedWord: q.word,
        isCorrect: isOk
      };
    });

    const isAllCorrect = (correctCount === this.currentMatrixQuestions.length);
    let coinsEarned = 0;
    let gemsEarned = 0;

    if (!this.playerData) {
      this.playerData = this.createDefaultPlayerData('Pedro');
    }

    if (isAllCorrect) {
      coinsEarned = 30;
      gemsEarned = 1;
      this.playerData.coins = (this.playerData.coins || 0) + coinsEarned;
      this.playerData.gems = (this.playerData.gems || 0) + gemsEarned;
      this.playerData.xp = (this.playerData.xp || 0) + 30;
      this.playerData.level = Math.floor(this.playerData.xp / 100) + 1;
      soundManager.playFanfare();
    } else {
      soundManager.playError();
    }

    this.savePlayerData();

    return {
      isAllCorrect,
      correctCount,
      totalCount: this.currentMatrixQuestions.length,
      results,
      coinsEarned,
      gemsEarned,
      totalCoins: this.playerData.coins,
      totalGems: this.playerData.gems
    };
  }

  resetProgress() {
    if (!this.playerData) return;
    this.playerData.coins = 20;
    this.playerData.gems = 5;
    this.playerData.xp = 0;
    this.playerData.level = 1;
    this.playerData.activeMascot = 'aranha';
    this.playerData.unlockedMascots = ['aranha'];
    this.playerData.stars = {};
    this.playerData.stats = {};
    this.savePlayerData();
  }
}

// 6. GERENCIADOR DE INTERFACE E EFEITOS VISUAIS (UI CONTROLLER)
class UIController {
  constructor(gameEngine) {
    this.game = gameEngine;
    this.canvas = document.getElementById('confetti-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animationId = null;
    this.webcamStream = null;
    this.lastCapturedPhoto = null;

    this.initCanvasResize();
  }

  initCanvasResize() {
    if (!this.canvas) return;
    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
  }

  showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => {
      s.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('active');
    }

    soundManager.playClick();
    this.updateHeaderStats();
  }

  updateHeaderStats() {
    const activeMascot = this.game.getActiveMascot();
    const playerData = this.game.playerData || {
      name: 'Criar Perfil / Login',
      coins: 0,
      gems: 0,
      level: 1
    };

    if (activeMascot && activeMascot.bgGradient) {
      document.body.style.background = activeMascot.bgGradient;
      document.documentElement.style.setProperty('--neon-glow', activeMascot.neonColor || '#10B981');
    }

    // Se o jogador tiver tirado uma foto própria personalizada (customProfilePhoto), usa a foto dele.
    // Se NÃO tiver foto de webcam/celular personalizada, A FOTO DO PERFIL MUDA AUTOMATICAMENTE JUNTO COM O MASCOTE EQUIPADO!
    const userPhotoEl = document.getElementById('header-user-photo');
    if (userPhotoEl) {
      const displayPhoto = (playerData && playerData.customProfilePhoto) 
        ? playerData.customProfilePhoto 
        : (activeMascot ? activeMascot.img : null);

      if (displayPhoto) {
        userPhotoEl.src = displayPhoto;
        userPhotoEl.style.width = '42px';
        userPhotoEl.style.height = '42px';
        userPhotoEl.style.borderRadius = '50%';
        userPhotoEl.style.objectFit = 'cover';
        userPhotoEl.style.border = '2px solid var(--neon-glow, #34D399)';
        userPhotoEl.style.display = 'inline-block';
      } else {
        userPhotoEl.style.display = 'none';
      }
    }

    const userNameEl = document.getElementById('header-user-name');
    if (userNameEl) {
      userNameEl.textContent = playerData ? `👤 ${playerData.name}` : `👤 Entrar / Criar Perfil`;
    }

    if (activeMascot && activeMascot.theme) {
      soundManager.updateBGMTheme(activeMascot.theme);
    }

    const coinEls = document.querySelectorAll('.global-coins-count');
    coinEls.forEach(el => el.textContent = playerData.coins || 0);

    const gemEls = document.querySelectorAll('.global-gems-count');
    gemEls.forEach(el => el.textContent = playerData.gems || 0);

    const levelEls = document.querySelectorAll('.global-player-level');
    levelEls.forEach(el => el.textContent = playerData.level || 1);

    const mascotEls = document.querySelectorAll('.global-active-mascot');
    mascotEls.forEach(el => {
      el.textContent = `${activeMascot.icon} ${activeMascot.name}`;
    });

    const heroMascotContainer = document.querySelector('.hero-mascot-container');
    if (heroMascotContainer && activeMascot) {
      if (activeMascot.img) {
        heroMascotContainer.innerHTML = `
          <img class="hero-mascot-real-img" src="${activeMascot.img}" alt="${activeMascot.name}" />
          <span class="hero-sparkles">⚡</span>
        `;
      } else {
        heroMascotContainer.innerHTML = `
          <span class="hero-mascot-icon">${activeMascot.icon || '🕷️'}</span>
          <span class="hero-sparkles">⚡</span>
        `;
      }
    }
  }

  renderCategorySelection(containerEl, onSelectCategory) {
    if (!containerEl) return;
    const playerData = this.game.playerData || { stars: {} };

    containerEl.style.cssText = 'display: grid !important; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important; gap: 24px !important; padding-bottom: 40px !important;';

    containerEl.innerHTML = this.game.categories.map(cat => {
      const starsEarned = (playerData.stars && playerData.stars[cat.id]) ? playerData.stars[cat.id] : 0;
      const totalQ = (this.game.questionsData[cat.id] || []).length || 10;
      const progressPercent = Math.min(100, Math.round((starsEarned / 3) * 100));

      const starsHTML = [1, 2, 3].map(i => 
        `<span class="star-icon ${i <= starsEarned ? 'filled' : ''}" style="font-size: 1.4rem !important; filter: ${i <= starsEarned ? 'none' : 'grayscale(1)'} !important; opacity: ${i <= starsEarned ? '1' : '0.4'} !important;">⭐</span>`
      ).join('');

      return `
        <div class="category-card" data-id="${cat.id}" style="background: #0F172A !important; border: 2.5px solid #38BDF8 !important; border-radius: 24px !important; padding: 24px !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; gap: 16px !important; box-shadow: 0 12px 30px rgba(0,0,0,0.6) !important; cursor: pointer !important; transition: all 0.2s ease !important;">
          <div class="cat-banner-header" style="background: ${cat.bgGradient} !important; border-radius: 16px !important; padding: 18px !important; display: flex !important; align-items: center !important; justify-content: space-between !important; box-shadow: 0 6px 16px rgba(0,0,0,0.4) !important;">
            <div style="display: flex !important; align-items: center !important; gap: 14px !important;">
              <span class="cat-icon-badge" style="font-size: 3rem !important; background: rgba(0,0,0,0.3) !important; padding: 8px 14px !important; border-radius: 16px !important; border: 1.5px solid rgba(255,255,255,0.3) !important;">${cat.icon}</span>
              <div>
                <span style="font-family: 'Orbitron', sans-serif !important; font-size: 0.8rem !important; color: #FDE047 !important; font-weight: 800 !important; text-transform: uppercase !important; letter-spacing: 1px !important;">MISSÃO ORTOGRÁFICA</span>
                <h4 style="font-family: 'Orbitron', sans-serif !important; font-size: 1.15rem !important; color: #FFFFFF !important; font-weight: 800 !important; text-shadow: 0 2px 4px rgba(0,0,0,0.6) !important;">${cat.title.split('(')[0]}</h4>
              </div>
            </div>
            <div class="cat-stars" style="display: flex !important; gap: 4px !important; background: rgba(0,0,0,0.4) !important; padding: 6px 10px !important; border-radius: 20px !important;">${starsHTML}</div>
          </div>

          <div class="cat-card-body" style="display: flex !important; flex-direction: column !important; gap: 8px !important;">
            <p class="cat-subtitle" style="color: #FBBF24 !important; font-family: 'Plus Jakarta Sans', sans-serif !important; font-weight: 800 !important; font-size: 1.05rem !important;">${cat.subtitle}</p>
            <p class="cat-desc" style="color: #CBD5E1 !important; font-size: 0.95rem !important; line-height: 1.5 !important;">${cat.description}</p>
            
            <div style="margin-top: 8px !important; background: #020617 !important; border: 1.5px solid rgba(56,189,248,0.3) !important; border-radius: 14px !important; padding: 10px 14px !important;">
              <div style="display: flex !important; justify-content: space-between !important; align-items: center !important; margin-bottom: 6px !important;">
                <span style="font-family: 'Orbitron', sans-serif !important; font-size: 0.85rem !important; color: #38BDF8 !important; font-weight: 700 !important;">📊 QUANTIDADE CONCLUÍDA</span>
                <span style="font-family: 'Orbitron', sans-serif !important; font-size: 0.85rem !important; color: #10B981 !important; font-weight: 800 !important;">${starsEarned}/3 Estrelas (${totalQ} Questões)</span>
              </div>
              <div style="width: 100% !important; height: 10px !important; background: #1E293B !important; border-radius: 10px !important; overflow: hidden !important;">
                <div style="width: ${progressPercent}% !important; height: 100% !important; background: linear-gradient(90deg, #10B981, #34D399) !important; border-radius: 10px !important; transition: width 0.3s ease !important;"></div>
              </div>
            </div>
          </div>

          <button class="btn btn-3d btn-primary btn-block play-cat-btn" style="background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%) !important; color: #FFFFFF !important; font-family: 'Orbitron', sans-serif !important; font-weight: 800 !important; font-size: 1.1rem !important; padding: 14px 20px !important; border-radius: 16px !important; border: none !important; cursor: pointer !important; box-shadow: 0 6px 0 #0369A1 !important; margin-top: 6px !important;">
            ▶️ JOGAR AGORA
          </button>
        </div>
      `;
    }).join('');

    containerEl.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.getAttribute('data-id');
        onSelectCategory(catId);
      });
    });
  }

  getMaskedParts(question) {
    if (!question || !question.word) {
      return { prefix: '', gapText: '[ _____ ]', suffix: '' };
    }

    const word = question.word.trim();
    const options = question.options || [];
    const correctIdx = question.correct || 0;
    const correctOpt = (options[correctIdx] || '').trim();

    if (correctOpt.length > 0 && correctOpt.length <= 3) {
      const optLower = correctOpt.toLowerCase();
      const wordLower = word.toLowerCase();

      if (wordLower.endsWith(optLower)) {
        const prefix = word.substring(0, word.length - correctOpt.length);
        return { prefix, gapText: '[ ___ ]', suffix: '' };
      }

      if (wordLower.startsWith(optLower)) {
        const suffix = word.substring(correctOpt.length);
        return { prefix: '', gapText: '[ ___ ]', suffix };
      }
    }

    return { prefix: '', gapText: `[ ${word} ]`, suffix: '' };
  }

  renderQuestion(question, onSelectOption) {
    const activeMascot = this.game.getActiveMascot();
    const catBadge = document.querySelector('.game-cat-badge');
    if (catBadge && this.game.currentCategory) {
      catBadge.textContent = this.game.currentCategory.title.split('(')[0];
      catBadge.style.background = this.game.currentCategory.badgeColor || '#38BDF8';
    }

    const counterEl = document.querySelector('.question-counter');
    if (counterEl) {
      counterEl.textContent = `Pergunta ${this.game.currentQuestionIndex + 1} de ${this.game.currentQuestions.length}`;
    }

    const progressFill = document.querySelector('.game-progress-fill');
    if (progressFill) {
      const percent = Math.round(((this.game.currentQuestionIndex) / this.game.currentQuestions.length) * 100);
      progressFill.style.width = `${percent}%`;
    }

    const mascotAvatar = document.querySelector('.game-mascot-avatar');
    if (mascotAvatar) {
      if (activeMascot.img) {
        mascotAvatar.innerHTML = `<img src="${activeMascot.img}" alt="${activeMascot.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />`;
      } else {
        mascotAvatar.textContent = activeMascot.icon || '🕷️';
      }
    }

    const mascotBubble = document.querySelector('.game-mascot-bubble');
    if (mascotBubble) {
      mascotBubble.textContent = activeMascot.quote || 'Leia a frase com atenção e complete a palavra!';
    }

    const sentenceEl = document.querySelector('.game-sentence');
    if (sentenceEl) {
      const { prefix, gapText, suffix } = this.getMaskedParts(question);
      sentenceEl.innerHTML = `
        ${prefix ? `<span>${prefix}</span>` : ''}
        <span class="gap-highlight">${gapText}</span>
        ${suffix ? `<span>${suffix}</span>` : ''}
      `;
    }

    const btnSpeak = document.querySelector('.btn-speak-word');
    if (btnSpeak) {
      btnSpeak.onclick = () => {
        const cleanWord = question.word ? question.word.replace(/\[.*?\]/g, '').trim() : '';
        soundManager.speakText(cleanWord);
      };
    }

    const optionsContainer = document.querySelector('.game-options-grid');
    if (optionsContainer) {
      optionsContainer.innerHTML = question.options.map((opt, idx) => `
        <button class="btn btn-3d btn-option" data-index="${idx}">
          ${opt}
        </button>
      `).join('');

      optionsContainer.querySelectorAll('.btn-option').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          onSelectOption(idx);
        });
      });
    }
  }

  showFeedbackModal(result, onNext) {
    const modal = document.getElementById('feedback-modal');
    if (!modal) {
      onNext();
      return;
    }

    const iconEl = modal.querySelector('.feedback-icon');
    const titleEl = modal.querySelector('.feedback-title');
    const textEl = modal.querySelector('.feedback-text');
    const rewardEl = modal.querySelector('.feedback-reward');
    const btnNext = modal.querySelector('.btn-feedback-next');

    if (result.isCorrect) {
      if (iconEl) iconEl.textContent = '🎉';
      if (titleEl) {
        titleEl.textContent = 'Parabéns! Resposta Correta!';
        titleEl.style.color = '#10B981';
      }
      if (rewardEl) {
        rewardEl.style.display = 'block';
        rewardEl.textContent = `+${result.coinsEarned} Moedas 🪙 ${result.streak > 1 ? `(Combo ${result.streak}x 🔥)` : ''}`;
      }
      this.triggerConfetti(30);
    } else {
      if (iconEl) iconEl.textContent = '💡';
      if (titleEl) {
        titleEl.textContent = 'Quase lá!';
        titleEl.style.color = '#EF4444';
      }
      if (rewardEl) rewardEl.style.display = 'none';
    }

    if (textEl) {
      textEl.innerHTML = `
        <p style="font-size: 1.2rem; font-weight: 800; color: #FFF; margin-bottom: 12px;">
          Palavra correta: <span style="color: #38BDF8; font-size: 1.4rem;">${result.correctWord}</span>
        </p>
        <p style="color: #CBD5E1; line-height: 1.5;">${result.explanation}</p>
      `;
    }

    if (btnNext) {
      btnNext.textContent = result.isLevelFinished ? 'Ver Resultado da Missão 🏆' : 'Próxima Pergunta ➡️';
      btnNext.onclick = () => {
        modal.classList.remove('active');
        onNext();
      };
    }

    modal.classList.add('active');
  }

  showVictoryModal(result, onRestart, onSelectLevel) {
    const modal = document.getElementById('victory-modal');
    if (!modal) return;

    const statsEl = modal.querySelector('.victory-stats');
    if (statsEl) {
      statsEl.innerHTML = `
        <p style="font-size: 1.2rem; color: #FFF; font-weight: 800; margin-bottom: 8px;">
          Acertos: ${result.levelCorrectCount} de ${result.totalQuestions}
        </p>
        <p style="font-size: 1.4rem; color: #F59E0B; font-weight: 900;">
          +${result.starsEarned} Estrelas ⭐ | Moedas Total: ${result.totalCoins} 🪙
        </p>
      `;
    }

    const btnRestart = modal.querySelector('.btn-victory-restart');
    if (btnRestart) {
      btnRestart.onclick = () => {
        modal.classList.remove('active');
        onRestart();
      };
    }

    const btnMenu = modal.querySelector('.btn-victory-menu');
    if (btnMenu) {
      btnMenu.onclick = () => {
        modal.classList.remove('active');
        onSelectLevel();
      };
    }

    this.triggerConfetti(80);
    soundManager.playFanfare();
    modal.classList.add('active');
  }

  renderMatrixGame() {
    const matrixData = this.game.startMatrixPuzzle();
    const sentencesContainer = document.getElementById('matrix-sentences-container');
    const wordBankContainer = document.getElementById('matrix-word-bank');
    const btnSubmit = document.getElementById('btn-submit-matrix');

    if (!sentencesContainer || !wordBankContainer) return;

    this.userMatrixAnswers = Array(matrixData.questions.length).fill('');

    sentencesContainer.innerHTML = matrixData.questions.map((q, idx) => {
      const { prefix, gapText, suffix } = this.getMaskedParts(q);
      return `
        <div class="matrix-sentence-box" data-index="${idx}" style="background: #020617; border: 2px solid #38BDF8; border-radius: 16px; padding: 16px; margin-bottom: 12px;">
          <div style="font-size: 0.85rem; color: #F59E0B; font-weight: 800; margin-bottom: 6px;">FRASE ${idx + 1}:</div>
          <div style="font-size: 1.1rem; color: #FFF; font-weight: 700;">
            ${prefix} <span class="matrix-slot" data-index="${idx}" style="display: inline-block; min-width: 120px; padding: 6px 14px; background: rgba(56,189,248,0.2); border: 2px dashed #38BDF8; border-radius: 12px; color: #34D399; font-weight: 900; text-align: center; cursor: pointer;">Clique no banco...</span> ${suffix}
          </div>
        </div>
      `;
    }).join('');

    wordBankContainer.innerHTML = matrixData.wordBank.map((word) => `
      <button class="btn btn-3d btn-matrix-word" data-word="${word}" style="background: #1E293B; color: #FFF; border: 2px solid #38BDF8; padding: 10px 18px; border-radius: 14px; font-weight: 800; margin: 4px; cursor: pointer;">
        ${word}
      </button>
    `).join('');

    wordBankContainer.querySelectorAll('.btn-matrix-word').forEach(btn => {
      btn.onclick = () => {
        const word = btn.getAttribute('data-word');
        const emptyIdx = this.userMatrixAnswers.findIndex(ans => ans === '');
        if (emptyIdx !== -1) {
          this.userMatrixAnswers[emptyIdx] = word;
          const slot = sentencesContainer.querySelector(`.matrix-slot[data-index="${emptyIdx}"]`);
          if (slot) {
            slot.textContent = word;
            slot.style.borderStyle = 'solid';
            slot.style.background = 'rgba(52, 211, 153, 0.3)';
          }
          btn.style.opacity = '0.3';
          btn.disabled = true;
        }
      };
    });

    sentencesContainer.querySelectorAll('.matrix-slot').forEach(slot => {
      slot.onclick = () => {
        const idx = parseInt(slot.getAttribute('data-index'), 10);
        const currentWord = this.userMatrixAnswers[idx];
        if (currentWord) {
          this.userMatrixAnswers[idx] = '';
          slot.textContent = 'Clique no banco...';
          slot.style.borderStyle = 'dashed';
          slot.style.background = 'rgba(56,189,248,0.2)';

          const bankBtn = Array.from(wordBankContainer.querySelectorAll('.btn-matrix-word')).find(b => b.getAttribute('data-word') === currentWord);
          if (bankBtn) {
            bankBtn.style.opacity = '1';
            bankBtn.disabled = false;
          }
        }
      };
    });

    if (btnSubmit) {
      btnSubmit.onclick = () => {
        if (this.userMatrixAnswers.some(ans => ans === '')) {
          alert('Por favor, preencha todas as lacunas do desafio antes de validar!');
          return;
        }

        const res = this.game.submitMatrixAnswers(this.userMatrixAnswers);
        if (res) {
          if (res.isAllCorrect) {
            this.triggerConfetti(60);
            this.updateHeaderStats();
            alert(`🎉 EXCELENTE! Você acertou todas as frases do Puzzle!\n+${res.coinsEarned} Moedas 🪙 | +${res.gemsEarned} Gema Secreta 💎`);
            this.showScreen('menu-screen');
          } else {
            alert(`Quase lá! Você acertou ${res.correctCount} de ${res.totalCount} frases. Tente novamente!`);
          }
        }
      };
    }
  }

  // Renderização dos Mascotes Enquadrados perfeitamente no Quadrado (object-fit: contain)
  renderShop(containerEl) {
    if (!containerEl) return;
    const mascots = this.game.getMascots();

    containerEl.style.cssText = 'display: grid !important; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important; gap: 20px !important; padding-bottom: 40px !important;';

    containerEl.innerHTML = mascots.map(m => `
      <div class="shop-card ${m.active ? 'equipped' : ''}" style="background: #0F172A !important; border: 2.5px solid ${m.active ? '#10B981' : '#38BDF8'} !important; border-radius: 24px !important; padding: 20px !important; display: flex !important; flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 14px !important; box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;">
        <!-- Caixa Quadrada com gradiente do tema e imagem que ENCAIXA 100% no quadrado (object-fit: contain) -->
        <div class="shop-mascot-img-container" style="width: 100% !important; height: 220px !important; max-height: 220px !important; background: ${m.bgGradient || '#020617'} !important; border-radius: 18px !important; overflow: hidden !important; position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; border: 2px solid ${m.neonColor || '#38BDF8'} !important; box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important; padding: 8px !important;">
          <img class="shop-mascot-real-img" src="${m.img}" alt="${m.name}" style="width: 100% !important; height: 100% !important; object-fit: contain !important; object-position: center !important; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.7)) !important;" />
          <span style="position: absolute !important; top: 10px !important; right: 10px !important; background: rgba(15,23,42,0.85) !important; padding: 4px 10px !important; border-radius: 12px !important; font-size: 1.4rem !important; border: 1px solid rgba(255,255,255,0.2) !important;">${m.icon}</span>
        </div>

        <h4 style="font-family: 'Orbitron', sans-serif !important; color: #FFF !important; font-size: 1.1rem !important; font-weight: 800 !important; margin: 4px 0 0 0 !important;">${m.name}</h4>
        <p style="color: #94A3B8 !important; font-size: 0.9rem !important; line-height: 1.4 !important; flex: 1 !important; margin: 0 !important;">${m.description}</p>
        
        <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
          ${m.active ? `
            <button class="btn btn-3d btn-success btn-block" disabled style="opacity: 0.9 !important; font-weight: 800 !important;">
              ✅ MASCOTE EQUIPADO
            </button>
          ` : m.unlocked ? `
            <button class="btn btn-3d btn-primary btn-block select-mascot-btn" data-id="${m.id}" style="font-weight: 800 !important;">
              ⚡ EQUIPAR TEMA E FOTO
            </button>
          ` : `
            <button class="btn btn-3d btn-warning btn-block buy-mascot-btn" data-id="${m.id}" style="font-weight: 800 !important;">
              🪙 DESBLOQUEAR POR ${m.price} MOEDAS
            </button>
          `}
          ${m.unlocked ? `
            <button class="btn btn-3d btn-info btn-block photo-mascot-btn" data-id="${m.id}" style="font-weight: 800 !important;">
              📸 TIRAR FOTO DE PERFIL
            </button>
          ` : ''}
        </div>
      </div>
    `).join('');

    containerEl.querySelectorAll('.select-mascot-btn').forEach(btn => {
      btn.onclick = () => {
        const mascotId = btn.getAttribute('data-id');
        if (this.game.selectMascot(mascotId)) {
          this.updateHeaderStats();
          this.renderShop(containerEl);
          soundManager.playClick();
        }
      };
    });

    containerEl.querySelectorAll('.buy-mascot-btn').forEach(btn => {
      btn.onclick = () => {
        const mascotId = btn.getAttribute('data-id');
        const res = this.game.buyMascot(mascotId);
        alert(res.message);
        if (res.success) {
          this.updateHeaderStats();
          this.renderShop(containerEl);
          soundManager.playFanfare();
          this.triggerConfetti(40);
          const mascotObj = this.game.getMascots().find(m => m.id === mascotId);
          if (mascotObj) {
            setTimeout(() => this.openPhotoBooth(mascotObj), 600);
          }
        }
      };
    });

    containerEl.querySelectorAll('.photo-mascot-btn').forEach(btn => {
      btn.onclick = () => {
        const mascotId = btn.getAttribute('data-id');
        const mascotObj = this.game.getMascots().find(m => m.id === mascotId);
        if (mascotObj) {
          this.openPhotoBooth(mascotObj);
        }
      };
    });
  }

  // Estúdio de Foto com Suporte a WebCam USB e Câmera do Celular / Smartphones
  openPhotoBooth(mascot) {
    const modal = document.getElementById('photobooth-modal');
    if (!modal) return;

    const videoEl = document.getElementById('webcam-video');
    const mascotImgEl = document.getElementById('photobooth-mascot-img');
    const mascotNameEl = document.getElementById('photobooth-mascot-name');
    const countdownEl = document.getElementById('photobooth-countdown');
    const btnSnap = document.getElementById('btn-snap-photo');
    const btnClose = document.getElementById('btn-close-photobooth');

    if (mascotImgEl) mascotImgEl.src = mascot.img || '';
    if (mascotNameEl) mascotNameEl.textContent = mascot.name || '';
    if (countdownEl) countdownEl.style.display = 'none';

    // Suporte Avançado a Câmeras (Desktop WebCam e Celulares Frontal/Traseira)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
      })
      .then(stream => {
        this.webcamStream = stream;
        if (videoEl) videoEl.srcObject = stream;
      })
      .catch(err => {
        console.warn('Câmera em tempo real indisponível:', err);
      });
    }

    // Configuração para Celulares / Upload de Foto Nativo do Aparelho
    const inputMobile = document.getElementById('input-mobile-photo');
    const btnUpload = document.getElementById('btn-upload-photo');

    if (btnUpload && inputMobile) {
      btnUpload.onclick = () => {
        inputMobile.value = '';
        inputMobile.click();
      };

      inputMobile.onchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const userImg = new Image();
          userImg.onload = () => {
            this.processMobilePhotoCanvas(userImg, mascot, () => {
              this.closePhotoBooth();
            });
          };
          userImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
      };
    }

    if (btnSnap) {
      btnSnap.onclick = () => {
        btnSnap.disabled = true;
        let count = 3;
        if (countdownEl) {
          countdownEl.style.display = 'flex';
          countdownEl.textContent = count;
        }

        const timer = setInterval(() => {
          count--;
          if (count > 0) {
            if (countdownEl) countdownEl.textContent = count;
            soundManager.playClick();
          } else {
            clearInterval(timer);
            if (countdownEl) countdownEl.textContent = '📸';
            soundManager.playSuccess();
            
            this.capturePhoto(mascot, () => {
              btnSnap.disabled = false;
              if (countdownEl) countdownEl.style.display = 'none';
              this.closePhotoBooth();
            });
          }
        }, 1000);
      };
    }

    const btnDownload = document.getElementById('btn-download-last-photo');
    if (btnDownload) {
      btnDownload.onclick = () => {
        if (this.lastCapturedPhoto) {
          this.downloadDataUrl(this.lastCapturedPhoto, `foto_mascote_${mascot.id}.png`);
        } else if (this.game.playerData && (this.game.playerData.customProfilePhoto || this.game.playerData.profilePhoto)) {
          this.downloadDataUrl(this.game.playerData.customProfilePhoto || this.game.playerData.profilePhoto, `foto_perfil_${this.game.playerData.name}.png`);
        } else {
          alert('Tire uma foto primeiro para poder baixar!');
        }
      };
    }

    if (btnClose) {
      btnClose.onclick = () => this.closePhotoBooth();
    }

    modal.classList.add('active');
  }

  processMobilePhotoCanvas(userImg, mascot, onDone) {
    const canvas = document.getElementById('photobooth-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 360;

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Metade Esquerda: Foto enviada do Celular
    ctx.save();
    ctx.drawImage(userImg, 0, 0, 320, 320);
    ctx.restore();

    // Linha Neon
    ctx.fillStyle = mascot.neonColor || '#38BDF8';
    ctx.fillRect(318, 0, 4, 320);

    // Metade Direita: Mascote
    const mascotImg = new Image();
    mascotImg.crossOrigin = 'anonymous';
    mascotImg.src = mascot.img;

    mascotImg.onload = () => {
      ctx.drawImage(mascotImg, 320, 0, 320, 320);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.fillRect(0, 320, 640, 40);

      ctx.fillStyle = mascot.neonColor || '#38BDF8';
      ctx.font = 'bold 16px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`⚡ ${mascot.name} & Guardião da Ortografia!`, 320, 346);

      const photoBase64 = canvas.toDataURL('image/png');
      this.lastCapturedPhoto = photoBase64;
      this.game.saveProfilePhoto(photoBase64);
      this.updateHeaderStats();
      soundManager.playFanfare();
      this.triggerConfetti(60);
      alert('🎉 Foto enviada com sucesso para o perfil!');
      if (onDone) onDone();
    };

    mascotImg.onerror = () => {
      const photoBase64 = canvas.toDataURL('image/png');
      this.game.saveProfilePhoto(photoBase64);
      this.updateHeaderStats();
      if (onDone) onDone();
    };
  }

  closePhotoBooth() {
    const modal = document.getElementById('photobooth-modal');
    if (modal) modal.classList.remove('active');
    if (this.webcamStream) {
      this.webcamStream.getTracks().forEach(track => track.stop());
      this.webcamStream = null;
    }
  }

  downloadDataUrl(dataUrl, filename = 'minha_foto_mascote.png') {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  capturePhoto(mascot, onDone) {
    const videoEl = document.getElementById('webcam-video');
    const canvas = document.getElementById('photobooth-canvas');
    if (!videoEl || !canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 360;

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(320, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoEl, 0, 0, 320, 320);
    ctx.restore();

    ctx.fillStyle = mascot.neonColor || '#38BDF8';
    ctx.fillRect(318, 0, 4, 320);

    const mascotImg = new Image();
    mascotImg.crossOrigin = 'anonymous';
    mascotImg.src = mascot.img;

    mascotImg.onload = () => {
      ctx.drawImage(mascotImg, 320, 0, 320, 320);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.fillRect(0, 320, 640, 40);

      ctx.fillStyle = mascot.neonColor || '#38BDF8';
      ctx.font = 'bold 16px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`⚡ ${mascot.name} & Guardião da Ortografia!`, 320, 346);

      const photoBase64 = canvas.toDataURL('image/png');
      this.lastCapturedPhoto = photoBase64;
      this.game.saveProfilePhoto(photoBase64);
      this.updateHeaderStats();
      soundManager.playFanfare();
      this.triggerConfetti(60);
      if (onDone) onDone();
    };

    mascotImg.onerror = () => {
      const photoBase64 = canvas.toDataURL('image/png');
      this.game.saveProfilePhoto(photoBase64);
      this.updateHeaderStats();
      if (onDone) onDone();
    };
  }

  renderParentPanel(containerEl) {
    parentReport.render(containerEl, this.game.playerData);
  }

  openProfileModal(options = {}) {
    const modal = document.getElementById('profile-modal');
    if (!modal) return;

    this.renderProfilesList();

    const btnClose = document.getElementById('btn-close-profile-modal');
    if (btnClose) {
      if (options.mandatory && !this.game.hasActiveProfile()) {
        btnClose.style.display = 'none';
      } else {
        btnClose.style.display = 'inline-block';
        btnClose.onclick = () => modal.classList.remove('active');
      }
    }

    const btnCreate = document.getElementById('btn-create-profile');
    const inputName = document.getElementById('input-new-profile-name');
    const inputPassword = document.getElementById('input-new-profile-password');
    const inputHint = document.getElementById('input-new-profile-hint');

    const btnToggleNew = document.getElementById('btn-toggle-new-password');
    if (btnToggleNew && inputPassword) {
      btnToggleNew.onclick = () => {
        const isPass = inputPassword.type === 'password';
        inputPassword.type = isPass ? 'text' : 'password';
        btnToggleNew.textContent = isPass ? '🙈' : '👁️';
      };
    }

    if (btnCreate && inputName && inputPassword) {
      btnCreate.onclick = async () => {
        const name = inputName.value.trim();
        const password = inputPassword.value.trim();
        const hint = inputHint ? inputHint.value.trim() : '';

        if (!name) {
          alert('Por favor, digite um nome para o novo perfil.');
          inputName.focus();
          return;
        }

        if (!password) {
          alert('Por favor, crie uma senha para proteger o seu perfil!');
          inputPassword.focus();
          return;
        }

        await this.game.createProfile(name, password, hint);
        inputName.value = '';
        inputPassword.value = '';
        if (inputHint) inputHint.value = '';

        soundManager.playFanfare();
        this.triggerConfetti(40);
        this.updateHeaderStats();
        this.renderProfilesList();
        modal.classList.remove('active');
        alert(`🎉 Perfil do ${name} criado e protegido por senha com sucesso! Boa sorte!`);
      };
    }

    modal.classList.add('active');
  }

  renderProfilesList() {
    const container = document.getElementById('profiles-list-container');
    if (!container) return;

    const profiles = this.game.getProfiles();
    const activeId = this.game.activeProfileId;
    const activeMascot = this.game.getActiveMascot();

    container.innerHTML = profiles.map(p => {
      const isActive = p.id === activeId;
      const mascot = (this.game.getMascots().find(m => m.id === (p.activeMascot || 'aranha'))) || activeMascot || {};
      
      const photoSrc = p.customProfilePhoto || p.profilePhoto || mascot.img;
      const photoHtml = photoSrc 
        ? `<img class="profile-card-photo" src="${photoSrc}" alt="${p.name}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #34D399;" />`
        : `<div class="profile-card-avatar-badge" style="font-size: 2rem;">${mascot.icon || '👤'}</div>`;

      return `
        <div class="profile-select-card ${isActive ? 'active-profile' : ''}" data-id="${p.id}" style="background: #020617; border: 2px solid ${isActive ? '#10B981' : '#38BDF8'}; border-radius: 16px; padding: 14px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 12px;">
            ${photoHtml}
            <div>
              <div style="color: #FFF; font-weight: 800; font-size: 1.1rem;">${p.name} ${isActive ? '✅' : ''}</div>
              <div style="color: #94A3B8; font-size: 0.85rem;">Nível ${p.level || 1} • ${p.coins || 0} Moedas 🪙</div>
            </div>
          </div>
          <button class="btn btn-3d ${isActive ? 'btn-success' : 'btn-primary'} select-profile-btn" data-id="${p.id}">
            ${isActive ? 'ATIVO' : 'JOGAR'}
          </button>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.select-profile-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const profileId = btn.getAttribute('data-id');
        if (profileId === activeId) return;

        if (this.game.hasPassword(profileId)) {
          this.openPasswordModal(profileId);
        } else {
          this.game.selectProfile(profileId);
          this.updateHeaderStats();
          this.renderProfilesList();
          document.getElementById('profile-modal').classList.remove('active');
        }
      };
    });
  }

  openPasswordModal(profileId) {
    const modal = document.getElementById('login-password-modal');
    if (!modal) return;

    const inputPwd = document.getElementById('input-login-password');
    const btnConfirm = document.getElementById('btn-confirm-login-password');
    const btnCancel = document.getElementById('btn-cancel-login-password');
    const errorMsg = document.getElementById('login-password-error');

    if (inputPwd) inputPwd.value = '';
    if (errorMsg) errorMsg.style.display = 'none';

    if (btnCancel) {
      btnCancel.onclick = () => modal.classList.remove('active');
    }

    if (btnConfirm && inputPwd) {
      btnConfirm.onclick = async () => {
        const pwd = inputPwd.value.trim();
        const success = await this.game.selectProfile(profileId, pwd);
        if (success) {
          modal.classList.remove('active');
          document.getElementById('profile-modal').classList.remove('active');
          this.updateHeaderStats();
          soundManager.playFanfare();
        } else {
          if (errorMsg) errorMsg.style.display = 'block';
        }
      };
    }

    modal.classList.add('active');
  }

  openGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;

    const container = document.getElementById('gallery-list-container');
    const btnClose = document.getElementById('btn-close-gallery-modal');

    if (btnClose) {
      btnClose.onclick = () => modal.classList.remove('active');
    }

    const photos = this.game.getPhotoGallery();
    if (container) {
      let resetBtnHtml = `
        <div style="margin-bottom: 16px; text-align: center;">
          <button id="btn-sync-mascot-photo" class="btn btn-3d btn-success" style="width: 100%;">
            🔄 Usar Foto do Mascote Equipado (Mudar foto com o tema)
          </button>
        </div>
      `;

      if (photos.length === 0) {
        container.innerHTML = resetBtnHtml + `<div style="color: #94A3B8; text-align: center; padding: 24px;">Nenhuma foto capturada ainda. Tire fotos no estúdio com a câmera ou celular!</div>`;
      } else {
        container.innerHTML = resetBtnHtml + photos.map(p => `
          <div class="gallery-photo-card" style="background: #020617; border: 2px solid #38BDF8; border-radius: 16px; padding: 10px; margin-bottom: 12px;">
            <img src="${p.dataUrl}" alt="Foto" style="width: 100%; height: 160px; object-fit: cover; border-radius: 12px;" />
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
              <span style="font-size: 0.8rem; color: #94A3B8;">${p.date} (${p.mascotName || 'Mascote'})</span>
              <button class="btn btn-3d btn-primary use-photo-btn" data-id="${p.id}">Usar no Perfil</button>
            </div>
          </div>
        `).join('');

        container.querySelectorAll('.use-photo-btn').forEach(btn => {
          btn.onclick = () => {
            const photoId = btn.getAttribute('data-id');
            if (this.game.setProfilePhotoFromGallery(photoId)) {
              this.updateHeaderStats();
              modal.classList.remove('active');
              alert('Foto definida como perfil com sucesso!');
            }
          };
        });
      }

      const btnSyncMascot = document.getElementById('btn-sync-mascot-photo');
      if (btnSyncMascot) {
        btnSyncMascot.onclick = () => {
          this.game.resetProfilePhotoToMascot();
          this.updateHeaderStats();
          modal.classList.remove('active');
          alert('🔄 Foto sincronizada com o mascote equipado! A foto do topo agora mudará automaticamente ao trocar de mascote.');
        };
      }
    }

    modal.classList.add('active');
  }

  triggerConfetti(count = 50) {
    if (!this.canvas || !this.ctx) return;
    const colors = ['#38BDF8', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#818CF8'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -10,
        r: Math.random() * 6 + 4,
        d: Math.random() * count,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    if (!this.animationId) {
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
      p.x += Math.sin(p.d);

      this.ctx.beginPath();
      this.ctx.lineWidth = p.r;
      this.ctx.strokeStyle = p.color;
      this.ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
      this.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
      this.ctx.stroke();
    }

    this.particles = this.particles.filter(p => p.y <= this.canvas.height);

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.animationId = null;
    }
  }
}

// 7. INICIALIZAÇÃO E EVENT LISTENERS DO APP
document.addEventListener('DOMContentLoaded', () => {
  const game = new GameEngine();
  const ui = new UIController(game);

  const unlockAudio = () => {
    soundManager.initContext();
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  };
  document.addEventListener('click', unlockAudio);
  document.addEventListener('touchstart', unlockAudio);

  const btnToggleBGM = document.getElementById('btn-toggle-bgm');
  if (btnToggleBGM) {
    btnToggleBGM.onclick = () => {
      const isPlaying = soundManager.toggleBGM();
      const iconSpan = btnToggleBGM.querySelector('.bgm-icon');
      if (iconSpan) iconSpan.textContent = isPlaying ? '🎵 Música: ON' : '🎵 Música: OFF';
      btnToggleBGM.classList.toggle('active', isPlaying);
    };
  }

  ui.updateHeaderStats();
  game.fetchDbProfiles().then(() => {
    ui.updateHeaderStats();
    if (!game.hasActiveProfile()) {
      ui.openProfileModal({ mandatory: true });
    }
  });

  const btnBrandHome = document.getElementById('btn-brand-home');
  if (btnBrandHome) {
    btnBrandHome.onclick = () => ui.showScreen('menu-screen');
  }

  const btnHeaderShop = document.getElementById('btn-header-shop');
  if (btnHeaderShop) {
    btnHeaderShop.onclick = () => {
      ui.renderShop(document.getElementById('shop-cards-container'));
      ui.showScreen('shop-screen');
    };
  }

  const btnHeaderProfile = document.getElementById('btn-header-profile');
  if (btnHeaderProfile) {
    btnHeaderProfile.onclick = () => {
      ui.openProfileModal();
    };
  }

  const btnHeaderGallery = document.getElementById('btn-header-gallery');
  if (btnHeaderGallery) {
    btnHeaderGallery.onclick = () => {
      ui.openGalleryModal();
    };
  }

  const btnHeaderPhotobooth = document.getElementById('btn-header-photobooth');
  if (btnHeaderPhotobooth) {
    btnHeaderPhotobooth.onclick = () => {
      ui.openPhotoBooth(game.getActiveMascot());
    };
  }

  const btnStartGame = document.getElementById('btn-start-game');
  if (btnStartGame) {
    btnStartGame.onclick = () => {
      ui.renderCategorySelection(
        document.getElementById('category-cards-container'),
        (categoryId) => handleStartLevel(categoryId)
      );
      ui.showScreen('level-select-screen');
    };
  }

  const btnStartMatrix = document.getElementById('btn-start-matrix-puzzle');
  if (btnStartMatrix) {
    btnStartMatrix.onclick = () => {
      ui.renderMatrixGame();
      ui.showScreen('matrix-game-screen');
    };
  }

  const btnOpenShop = document.getElementById('btn-open-shop');
  if (btnOpenShop) {
    btnOpenShop.onclick = () => {
      ui.renderShop(document.getElementById('shop-cards-container'));
      ui.showScreen('shop-screen');
    };
  }

  const btnOpenParent = document.getElementById('btn-open-parent');
  if (btnOpenParent) {
    btnOpenParent.onclick = () => {
      ui.renderParentPanel(document.getElementById('parent-panel-container'));
      ui.showScreen('parent-screen');
    };
  }

  document.querySelectorAll('.btn-back-menu').forEach(btn => {
    btn.onclick = () => ui.showScreen('menu-screen');
  });

  const btnBackCat = document.querySelector('.btn-back-categories');
  if (btnBackCat) {
    btnBackCat.onclick = () => {
      ui.renderCategorySelection(
        document.getElementById('category-cards-container'),
        (categoryId) => handleStartLevel(categoryId)
      );
      ui.showScreen('level-select-screen');
    };
  }

  const btnResetData = document.getElementById('btn-reset-data');
  if (btnResetData) {
    btnResetData.onclick = () => {
      if (confirm('Tem certeza de que deseja resetar todo o progresso do jogo? Esta ação não poderá ser desfeita.')) {
        game.resetProgress();
        ui.updateHeaderStats();
        ui.renderParentPanel(document.getElementById('parent-panel-container'));
        alert('Progresso resetado com sucesso!');
      }
    };
  }

  function handleStartLevel(categoryId) {
    if (game.startLevel(categoryId)) {
      ui.showScreen('game-screen');
      loadCurrentQuestion();
    }
  }

  function loadCurrentQuestion() {
    const qData = game.getCurrentQuestion();
    if (!qData) return;

    ui.renderQuestion(qData, (selectedOptionIndex) => {
      handleAnswer(selectedOptionIndex);
    });
  }

  function handleAnswer(selectedOptionIndex) {
    const result = game.submitAnswer(selectedOptionIndex);
    if (!result) return;

    ui.showFeedbackModal(result, () => {
      if (result.isLevelFinished) {
        ui.showVictoryModal(
          result,
          () => handleStartLevel(game.currentCategory.id),
          () => {
            ui.renderCategorySelection(
              document.getElementById('category-cards-container'),
              (catId) => handleStartLevel(catId)
            );
            ui.showScreen('level-select-screen');
          }
        );
      } else {
        loadCurrentQuestion();
      }
    });
  }
});

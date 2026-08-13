/**
 * Gerenciador de Áudio e Síntese de Voz (Web Audio API & SpeechSynthesis)
 * 100% Autônomo - Sem necessidade de arquivos de áudio externos (.mp3)
 */

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.synth = window.speechSynthesis || null;
    this.isMuted = false;
  }

  // Inicializa ou retoma o AudioContext após interação do usuário
  initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Som de Clique nos botões (Pop suave)
  playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Som de Acerto / Vitória Empolgante (Fanfarra + Arpejo Épico)
  playCorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      // Arpejo Triunfal de Vitória (C5 -> E5 -> G5 -> C6 -> E6 -> G6)
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      notes.forEach((freq, index) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = index % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + index * 0.06);

        const startTime = this.audioCtx.currentTime + index * 0.06;
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch (e) {
      console.warn('Audio correct error:', e);
    }
  }

  // Música de Fundo Animada Procedural por Tema de Mascote
  startBGM(themeId = 'theme-spider') {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.initContext();
    if (!this.audioCtx || this.isMuted) return;

    this.isBGMPlaying = true;
    this.currentTheme = themeId;

    // Temas Musicais (Notas, Onda e Tempo)
    const themes = {
      'theme-spider': { chords: [[261.63, 329.63, 392.0], [293.66, 349.23, 440.0]], wave: 'sawtooth', speed: 320 },
      'theme-soccer': { chords: [[261.63, 329.63, 392.0], [349.23, 440.0, 523.25]], wave: 'triangle', speed: 360 },
      'theme-blox': { chords: [[220.0, 277.18, 329.63], [261.63, 329.63, 392.0]], wave: 'square', speed: 280 },
      'theme-batman': { chords: [[146.83, 174.61, 220.0], [130.81, 164.81, 196.0]], wave: 'sine', speed: 480 },
      'theme-minion': { chords: [[329.63, 415.3, 493.88], [349.23, 440.0, 523.25]], wave: 'triangle', speed: 300 },
      'theme-dragon': { chords: [[220.0, 261.63, 329.63], [174.61, 220.0, 261.63]], wave: 'sawtooth', speed: 380 },
      'theme-race': { chords: [[293.66, 349.23, 440.0], [329.63, 392.0, 493.88]], wave: 'square', speed: 250 },
      'theme-dog': { chords: [[261.63, 329.63, 392.0], [329.63, 392.0, 493.88]], wave: 'sine', speed: 340 }
    };

    const cfg = themes[themeId] || themes['theme-spider'];
    let step = 0;

    this.bgmInterval = setInterval(() => {
      if (!this.isBGMPlaying || this.isMuted || !this.audioCtx) return;
      try {
        const chord = cfg.chords[step % cfg.chords.length];
        const bassFreq = chord[0] / 2;

        // Baixo
        const bassOsc = this.audioCtx.createOscillator();
        const bassGain = this.audioCtx.createGain();
        bassOsc.type = cfg.wave;
        bassOsc.frequency.setValueAtTime(bassFreq, this.audioCtx.currentTime);
        bassGain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
        bassGain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.25);
        bassOsc.connect(bassGain);
        bassGain.connect(this.audioCtx.destination);
        bassOsc.start();
        bassOsc.stop(this.audioCtx.currentTime + 0.25);

        // Melodia
        const melFreq = chord[step % chord.length] * (themeId === 'theme-batman' ? 1.5 : 2);
        const melOsc = this.audioCtx.createOscillator();
        const melGain = this.audioCtx.createGain();
        melOsc.type = 'sine';
        melOsc.frequency.setValueAtTime(melFreq, this.audioCtx.currentTime);
        melGain.gain.setValueAtTime(0.03, this.audioCtx.currentTime);
        melGain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.2);
        melOsc.connect(melGain);
        melGain.connect(this.audioCtx.destination);
        melOsc.start();
        melOsc.stop(this.audioCtx.currentTime + 0.2);

        step++;
      } catch (e) {
        console.warn('BGM error:', e);
      }
    }, cfg.speed);
  }

  updateBGMTheme(themeId) {
    if (this.isBGMPlaying) {
      this.startBGM(themeId);
    }
  }

  stopBGM() {
    this.isBGMPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleBGM(themeId = 'theme-spider') {
    if (this.isBGMPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM(themeId);
      return true;
    }
  }

  // Som de Erro suave (Aviso gentil, sem assustar a criança)
  playWrong() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(220, this.audioCtx.currentTime); // A3
      osc1.frequency.exponentialRampToValueAtTime(174.61, this.audioCtx.currentTime + 0.2); // F3

      osc2.frequency.setValueAtTime(233.08, this.audioCtx.currentTime); // Bb3
      osc2.frequency.exponentialRampToValueAtTime(185, this.audioCtx.currentTime + 0.2); // F#3

      gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.audioCtx.currentTime + 0.3);
      osc2.stop(this.audioCtx.currentTime + 0.3);
    } catch (e) {
      console.warn('Audio wrong error:', e);
    }
  }

  // Som de Moedas / Estrelas (Ding metálico)
  playCoin() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(987.77, this.audioCtx.currentTime); // B5
      osc1.frequency.setValueAtTime(1318.51, this.audioCtx.currentTime + 0.08); // E6

      osc2.frequency.setValueAtTime(1975.53, this.audioCtx.currentTime + 0.08); // B6

      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.audioCtx.currentTime + 0.35);
      osc2.stop(this.audioCtx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio coin error:', e);
    }
  }

  // Som de Fanfarra ao concluir uma fase
  playFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const notes = [
        { freq: 523.25, duration: 0.12 }, // C5
        { freq: 659.25, duration: 0.12 }, // E5
        { freq: 783.99, duration: 0.12 }, // G5
        { freq: 1046.50, duration: 0.35 }  // C6
      ];

      let now = this.audioCtx.currentTime;
      notes.forEach((note) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, now);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + note.duration);
        now += note.duration + 0.04;
      });
    } catch (e) {
      console.warn('Audio fanfare error:', e);
    }
  }

  // Pronúncia Perfeita da Palavra utilizando o Google Tradutor
  speakWord(word, onEndCallback = null) {
    if (!word || this.isMuted) return;

    const cleanWord = word.replace(/\[.*?\]/g, '').replace(/[._-]/g, ' ').trim();
    if (!cleanWord) return;

    try {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }

      // URL Oficial do Google Tradutor HD (client=tw-ob)
      const googleDirectUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanWord)}&tl=pt-BR&client=tw-ob`;
      const localApiUrl = `/api/tts?q=${encodeURIComponent(cleanWord)}`;
      const targetUrl = (window.location.protocol.startsWith('http')) ? localApiUrl : googleDirectUrl;

      const audio = new Audio();
      audio.crossOrigin = "anonymous";
      audio.src = targetUrl;
      this.currentAudio = audio;

      audio.onended = () => {
        this.currentAudio = null;
        if (onEndCallback) onEndCallback();
      };

      audio.onerror = () => {
        const fallbackAudio = new Audio(googleDirectUrl);
        fallbackAudio.play().catch(() => {
          this.speakWordFallback(cleanWord, onEndCallback);
        });
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const fallbackAudio = new Audio(googleDirectUrl);
          fallbackAudio.play().catch(() => {
            this.speakWordFallback(cleanWord, onEndCallback);
          });
        });
      }
    } catch (e) {
      this.speakWordFallback(cleanWord, onEndCallback);
    }
  }

  // Fallback da Web Speech API com voz natural de alta qualidade (Google / Natural)
  speakWordFallback(cleanText, onEndCallback = null) {
    if (!this.synth) return;
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const applyBestVoice = () => {
      const voices = this.synth.getVoices();
      const bestVoice = voices.find(v => 
        (v.lang.includes('pt') || v.lang.includes('PT')) && 
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Online'))
      ) || voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt_BR'))
        || voices.find(v => v.lang.includes('pt'));

      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      if (onEndCallback) {
        utterance.onend = onEndCallback;
        utterance.onerror = onEndCallback;
      }

      this.synth.speak(utterance);
    };

    if (this.synth.getVoices().length === 0) {
      this.synth.onvoiceschanged = applyBestVoice;
    } else {
      applyBestVoice();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const soundManager = new SoundManager();

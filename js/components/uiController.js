/**
 * Gerenciador de Interface e Efeitos Visuais (UIController)
 * Gerencia a alternância de telas, modais, animações e confetes no Canvas.
 */

import { soundManager } from '../audio/soundEffects.js';
import { parentReport } from './parentReport.js';

export class UIController {
  constructor(gameEngine) {
    this.game = gameEngine;
    this.canvas = document.getElementById('confetti-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animationId = null;

    this.initCanvasResize();
  }

  // Redimensiona o canvas de confetes para tela cheia
  initCanvasResize() {
    if (!this.canvas) return;
    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
  }

  // Mostra a tela desejada e oculta as demais
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

  // Atualiza as estatísticas exibidas no topo (moedas, nível, mascote, tema e foto de perfil)
  updateHeaderStats() {
    const activeMascot = this.game.getActiveMascot();
    const playerData = this.game.playerData || {
      name: 'Criar Perfil / Login',
      coins: 0,
      gems: 0,
      level: 1,
      profilePhoto: null
    };

    // Aplica o Tema Visual Completo do Mascote no Fundo da Aplicação
    if (activeMascot && activeMascot.bgGradient) {
      document.body.style.background = activeMascot.bgGradient;
      document.documentElement.style.setProperty('--neon-glow', activeMascot.neonColor || '#10B981');
    }

    // Exibe a Foto no Header: se houver foto personalizada de webcam/celular, exibe ela.
    // Se NÃO houver foto personalizada, a foto no topo MUDA AUTOMATICAMENTE JUNTO COM O MASCOTE EQUIPADO!
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

    // Exibe o Nome do Perfil Ativo no Header
    const userNameEl = document.getElementById('header-user-name');
    if (userNameEl) {
      userNameEl.textContent = this.game.playerData ? `👤 ${playerData.name}` : `👤 Entrar / Criar Perfil`;
    }

    // Atualiza BGM de acordo com o tema do Mascote
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

    // Atualiza Imagem do Mascote no Menu Principal Hero Section
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

  // Renderiza o menu de seleção de categorias/fases com quadros, foto, progresso e quantidade feita
  renderCategorySelection(containerEl, onSelectCategory) {
    if (!containerEl) return;
    const playerData = this.game.playerData;

    containerEl.style.cssText = 'display: grid !important; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important; gap: 24px !important; padding-bottom: 40px !important;';

    containerEl.innerHTML = this.game.categories.map(cat => {
      const starsEarned = playerData.stars[cat.id] || 0;
      const totalQ = (this.game.questionsData[cat.id] || []).length || 15;
      const progressPercent = Math.min(100, Math.round((starsEarned / 3) * 100));

      const starsHTML = [1, 2, 3].map(i => 
        `<span class="star-icon ${i <= starsEarned ? 'filled' : ''}" style="font-size: 1.4rem !important; filter: ${i <= starsEarned ? 'none' : 'grayscale(1)'} !important; opacity: ${i <= starsEarned ? '1' : '0.4'} !important;">⭐</span>`
      ).join('');

      return `
        <div class="category-card" data-id="${cat.id}" style="background: #0F172A !important; border: 2.5px solid #38BDF8 !important; border-radius: 24px !important; padding: 24px !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; gap: 16px !important; box-shadow: 0 12px 30px rgba(0,0,0,0.6) !important; cursor: pointer !important; transition: all 0.2s ease !important;">
          <!-- Top Banner com foto/ícone da missão -->
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
            
            <!-- Barra de Quantidade Feita / Progresso -->
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
      card.addEventListener('click', (e) => {
        const catId = card.getAttribute('data-id');
        onSelectCategory(catId);
      });
    });
  }

  // Extrai o radical e sufixo da palavra para a pergunta exibir a lacuna integrada ao radical
  getMaskedParts(question) {
    if (!question || !question.word) {
      return { prefix: '', gapText: '[ _____ ]', suffix: '' };
    }

    const word = question.word.trim();
    const options = question.options || [];
    const correctIdx = question.correct || 0;
    const correctOpt = (options[correctIdx] || '').trim();

    // Se as opções forem fragmentos curtos (ex: "ÃO", "AM", "S", "Z", "M", "N", "CH", "X", "G", "J", "SS", "Ç")
    if (correctOpt.length > 0 && correctOpt.length <= 3) {
      const optLower = correctOpt.toLowerCase();
      const wordLower = word.toLowerCase();

      // 1. Fragmento no FINAL da palavra (ex: "trarão" -> "trar" + "ão")
      if (wordLower.endsWith(optLower)) {
        const prefix = word.substring(0, word.length - correctOpt.length);
        return { prefix, gapText: '[ ___ ]', suffix: '' };
      }

      // 2. Fragmento no INÍCIO da palavra (ex: "girafa" -> "g" + "irafa")
      if (wordLower.startsWith(optLower)) {
        const suffix = word.substring(correctOpt.length);
        return { prefix: '', gapText: '[ ___ ]', suffix };
      }

      // 3. Fragmento no MEIO da palavra (ex: "casa" -> "ca" + "s" + "a" ou "campo" -> "ca" + "m" + "po")
      const matchIdx = wordLower.indexOf(optLower);
      if (matchIdx !== -1) {
        const prefix = word.substring(0, matchIdx);
        const suffix = word.substring(matchIdx + correctOpt.length);
        return { prefix, gapText: '[ ___ ]', suffix };
      }
    }

    // Caso contrário (opções de palavras inteiras)
    return { prefix: '', gapText: '[ _____ ]', suffix: '' };
  }

  // Renderiza a pergunta na tela de jogo
  renderQuestion(questionData, onSubmitAnswer) {
    const questionScreen = document.getElementById('game-screen');
    if (!questionScreen || !questionData) return;

    const { question, index, total, category } = questionData;
    const mascot = this.game.getActiveMascot();

    // Atualiza Barra de Progresso da Fase
    const progressPercent = Math.round((index / total) * 100);
    const progressBar = questionScreen.querySelector('.game-progress-fill');
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    const questionCounter = questionScreen.querySelector('.question-counter');
    if (questionCounter) questionCounter.textContent = `Pergunta ${index} de ${total}`;

    // Categoria Badge
    const catBadge = questionScreen.querySelector('.game-cat-badge');
    if (catBadge) {
      catBadge.textContent = `${category.icon} ${category.title}`;
      catBadge.style.backgroundColor = category.color;
    }

    // Card Container
    const cardEl = questionScreen.querySelector('.game-card');
    if (cardEl) {
      cardEl.style.cssText = 'background: #0F172A !important; color: #FFFFFF !important; border: 3px solid #38BDF8 !important; border-radius: 28px !important; padding: 32px !important; box-shadow: 0 20px 60px rgba(0,0,0,0.9) !important;';
    }

    // Mascote Reação
    const mascotFeedback = questionScreen.querySelector('.mascot-feedback-area, .game-mascot-box');
    if (mascotFeedback) {
      mascotFeedback.style.cssText = 'background: #1E293B !important; border: 2.5px solid #38BDF8 !important; border-radius: 20px !important; padding: 16px 24px !important; display: flex !important; align-items: center !important; gap: 16px !important; margin-bottom: 24px !important; box-shadow: 0 8px 24px rgba(0,0,0,0.4) !important;';
    }

    const mascotAvatar = questionScreen.querySelector('.game-mascot-avatar');
    if (mascotAvatar) {
      mascotAvatar.textContent = mascot.icon;
      mascotAvatar.style.cssText = 'font-size: 2.5rem !important; flex-shrink: 0 !important;';
    }

    const mascotBubble = questionScreen.querySelector('.game-mascot-bubble');
    if (mascotBubble) {
      mascotBubble.textContent = mascot.quote;
      mascotBubble.style.cssText = 'color: #FFFFFF !important; font-family: "Plus Jakarta Sans", sans-serif !important; font-weight: 800 !important; font-size: 1.15rem !important; text-shadow: 0 2px 4px rgba(0,0,0,0.9) !important;';
    }

    // Extrai o radical e sufixo para exibir ex: "trar[ ___ ]"
    const maskedInfo = this.getMaskedParts(question);

    // Container da Frase
    const sentenceContainer = questionScreen.querySelector('.sentence-container');
    if (sentenceContainer) {
      sentenceContainer.style.cssText = 'background: #020617 !important; border: 3px solid #38BDF8 !important; border-radius: 24px !important; padding: 32px 24px !important; margin-bottom: 28px !important; text-align: center !important; box-shadow: 0 10px 30px rgba(0,0,0,0.6) !important;';
    }

    // Frase da Pergunta com o radical e a lacuna destacada
    const sentenceEl = questionScreen.querySelector('.game-sentence');
    if (sentenceEl) {
      const gapHTML = `<span style="display: inline-flex !important; align-items: center !important; font-family: 'Plus Jakarta Sans', sans-serif !important; font-weight: 800 !important; color: #FFFFFF !important; font-size: 1.65rem !important;">${maskedInfo.prefix}<span class="gap-placeholder" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%) !important; color: #FFFFFF !important; font-family: 'Orbitron', sans-serif !important; font-weight: 900 !important; font-size: 1.35rem !important; padding: 6px 20px !important; border-radius: 16px !important; border: 2.5px solid #FBBF24 !important; box-shadow: 0 0 20px rgba(245, 158, 11, 0.7) !important; display: inline-block !important; letter-spacing: 2px !important; margin: 0 4px !important;">${maskedInfo.gapText}</span>${maskedInfo.suffix}</span>`;

      const highlightedSentence = question.sentence.replace(/_____|___/, gapHTML);
      sentenceEl.innerHTML = highlightedSentence;
      sentenceEl.style.cssText = 'color: #FFFFFF !important; font-family: "Plus Jakarta Sans", sans-serif !important; font-weight: 800 !important; font-size: 1.65rem !important; line-height: 1.8 !important; text-shadow: 0 2px 8px rgba(0,0,0,0.9) !important; margin-bottom: 20px !important;';
    }

    // Botão de Áudio (Ouvir Pronúncia da Palavra)
    const audioBtn = questionScreen.querySelector('.btn-speak-word');
    if (audioBtn) {
      audioBtn.style.cssText = 'background: linear-gradient(135deg, #10B981 0%, #059669 100%) !important; color: #FFFFFF !important; border: none !important; border-radius: 30px !important; padding: 12px 26px !important; font-family: "Orbitron", sans-serif !important; font-size: 1rem !important; font-weight: 800 !important; cursor: pointer !important; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.5) !important;';
      audioBtn.onclick = () => {
        soundManager.speakWord(question.word);
        audioBtn.classList.add('pulse-audio');
        setTimeout(() => audioBtn.classList.remove('pulse-audio'), 1200);
      };
    }

    // Alterna entre Múltipla Escolha e Modo Digitação (Perguntas pares = Digitação)
    const isTypingMode = (index % 2 === 0);

    const optionsContainer = questionScreen.querySelector('.game-options-grid');
    if (optionsContainer) {
      if (isTypingMode) {
        optionsContainer.innerHTML = `
          <div class="typing-container" style="grid-column: 1 / -1 !important; background: #0F172A !important; border: 3px solid #38BDF8 !important; border-radius: 24px !important; padding: 24px !important; display: flex !important; flex-direction: column !important; gap: 18px !important; box-shadow: 0 10px 30px rgba(0,0,0,0.6) !important;">
            <p class="typing-label" style="font-family: 'Plus Jakarta Sans', sans-serif !important; font-size: 1.15rem !important; color: #FFFFFF !important; font-weight: 800 !important; text-align: center !important;">✏️ Digite no campo abaixo a(s) letra(s) ou a palavra inteira:</p>
            <div class="typing-input-row" style="display: flex !important; gap: 12px !important; width: 100% !important;">
              <input type="text" class="input-typing" placeholder="Digite aqui a resposta e aperte Enter..." autocomplete="off" spellcheck="false" style="flex: 1 !important; background: #020617 !important; border: 3px solid #38BDF8 !important; border-radius: 16px !important; padding: 14px 20px !important; font-family: 'Orbitron', sans-serif !important; font-size: 1.35rem !important; font-weight: 800 !important; color: #FFFFFF !important; outline: none !important;" />
              <button class="btn btn-3d btn-primary btn-submit-typing" style="background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%) !important; color: #FFFFFF !important; font-family: 'Orbitron', sans-serif !important; font-weight: 800 !important; font-size: 1.1rem !important; padding: 14px 24px !important; border-radius: 16px !important; border: none !important; cursor: pointer !important; box-shadow: 0 6px 0 #0369A1 !important;">🚀 Confirmar</button>
            </div>
            <div class="quick-accents" style="display: flex !important; flex-wrap: wrap !important; align-items: center !important; justify-content: center !important; gap: 10px !important;">
              <span class="accent-title" style="font-size: 0.95rem !important; color: #94A3B8 !important; font-weight: 700 !important; width: 100% !important; text-align: center !important; margin-bottom: 4px !important;">Atalhos rápidos:</span>
              ${['ão', 'am', 'á', 'à', 'ã', 'â', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú', 'ç', 'ch', 'x', 's', 'z', 'm', 'n'].map(v => `<button class="btn-accent" data-val="${v}" style="background: linear-gradient(135deg, #1E293B, #0F172A) !important; border: 2px solid #38BDF8 !important; color: #FFFFFF !important; font-family: 'Plus Jakarta Sans', sans-serif !important; font-weight: 800 !important; font-size: 1.15rem !important; padding: 10px 18px !important; border-radius: 14px !important; cursor: pointer !important; box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;">${v}</button>`).join('')}
            </div>
          </div>
        `;

        const inputEl = optionsContainer.querySelector('.input-typing');
        const submitBtn = optionsContainer.querySelector('.btn-submit-typing');

        setTimeout(() => { if (inputEl) inputEl.focus(); }, 100);

        const handleTypeSubmit = () => {
          const typedVal = inputEl.value.trim();
          if (!typedVal) return;
          inputEl.disabled = true;
          submitBtn.disabled = true;
          onSubmitAnswer(typedVal);
        };

        submitBtn.onclick = handleTypeSubmit;
        inputEl.onkeydown = (e) => {
          if (e.key === 'Enter') handleTypeSubmit();
        };

        optionsContainer.querySelectorAll('.btn-accent').forEach(accBtn => {
          accBtn.onclick = () => {
            inputEl.value += accBtn.getAttribute('data-val');
            inputEl.focus();
          };
        });

      } else {
        // Múltipla Escolha Padrão (Usando 'Plus Jakarta Sans' para o texto da opção para exibir til 'ÃO' perfeito sem distorção)
        optionsContainer.innerHTML = question.options.map((opt, idx) => `
          <button class="btn btn-3d btn-option" data-index="${idx}" style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%) !important; border: 3px solid #38BDF8 !important; border-radius: 20px !important; padding: 22px 28px !important; display: flex !important; align-items: center !important; gap: 18px !important; cursor: pointer !important; box-shadow: 0 8px 24px rgba(0,0,0,0.6) !important;">
            <span class="option-letter" style="background: #F59E0B !important; color: #0F172A !important; font-family: 'Orbitron', sans-serif !important; font-size: 1.3rem !important; font-weight: 900 !important; width: 44px !important; height: 44px !important; border-radius: 14px !important; display: flex !important; align-items: center !important; justify-content: center !important; flex-shrink: 0 !important; box-shadow: 0 4px 10px rgba(0,0,0,0.4) !important;">${String.fromCharCode(65 + idx)}</span>
            <span class="option-text" style="color: #FFFFFF !important; font-family: 'Plus Jakarta Sans', sans-serif !important; font-size: 1.45rem !important; font-weight: 800 !important; text-shadow: 0 2px 6px rgba(0,0,0,0.8) !important;">${opt}</span>
          </button>
        `).join('');

        const optionBtns = optionsContainer.querySelectorAll('.btn-option');
        optionBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            optionBtns.forEach(b => b.disabled = true);
            const selectedIdx = parseInt(btn.getAttribute('data-index'), 10);
            onSubmitAnswer(selectedIdx);
          });
        });
      }
    }

    this.updateHeaderStats();
  }

  // Modal de Explicação / Feedback com Exibição de Palavra Completa e Recompensas 3D Espaçadas
  showFeedbackModal(result, onNext) {
    const modal = document.getElementById('feedback-modal');
    if (!modal) return;

    const modalContainer = modal.querySelector('.modal-card');
    if (modalContainer) {
      modalContainer.style.cssText = 'background: #0F172A !important; border: 3px solid #38BDF8 !important; border-radius: 28px !important; padding: 28px 32px !important; text-align: center !important; color: #FFFFFF !important; box-shadow: 0 25px 70px rgba(0,0,0,0.9) !important; max-width: 520px !important; width: 100% !important;';
    }

    const iconEl = modal.querySelector('.feedback-icon');
    const titleEl = modal.querySelector('.feedback-title');
    const textEl = modal.querySelector('.feedback-text');
    const rewardEl = modal.querySelector('.feedback-reward');
    const btnNext = modal.querySelector('.btn-feedback-next');

    if (result.isCorrect) {
      soundManager.playCorrect();
      this.triggerConfetti(75);

      const victoryShouts = [
        "⚽ GOLAÇO DE PLACA! MANDOU MUITO!",
        "🕷️ MITOU DEMAIS! ACERTO PERFEITO!",
        "🤖 PRO GAMER DESTRAVADO! NÍVEL MÁXIMO!",
        "🍌 BANANANA! QUE JOGADA INCRÍVEL!",
        "🏎️ ACELEROU A 300KM/H E MANDOU BEM!",
        "👾 GAME OVER PROS ERROS! PARABÉNS!"
      ];
      const randomShout = victoryShouts[Math.floor(Math.random() * victoryShouts.length)];

      if (iconEl) {
        iconEl.textContent = '🔥';
        iconEl.style.cssText = 'font-size: 3.2rem !important; margin-bottom: 8px !important;';
      }

      if (titleEl) {
        titleEl.textContent = randomShout;
        titleEl.style.cssText = 'font-family: "Orbitron", sans-serif !important; font-size: 1.25rem !important; font-weight: 900 !important; color: #34D399 !important; text-transform: uppercase !important; margin-bottom: 16px !important; line-height: 1.4 !important;';
      }

      if (textEl) {
        textEl.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.15) !important; border: 2px solid #10B981 !important; border-radius: 20px !important; padding: 16px 20px !important; margin-bottom: 18px !important;">
            <p style="font-size: 0.95rem !important; color: #94A3B8 !important; margin-bottom: 4px !important; font-weight: 700 !important; text-transform: uppercase !important; font-family: 'Orbitron', sans-serif !important;">A PALAVRA CORRETA É:</p>
            <p style="font-family: 'Plus Jakarta Sans', sans-serif !important; font-size: 2.2rem !important; font-weight: 900 !important; color: #34D399 !important; text-transform: uppercase !important; text-shadow: 0 0 15px rgba(52, 211, 153, 0.5) !important; margin: 0 !important;">${result.correctWord}</p>
          </div>
          <p style="color: #CBD5E1 !important; font-weight: 700 !important; font-size: 1.05rem !important;">🎉 Você deu um show de ortografia!</p>
        `;
      }

      if (rewardEl) {
        rewardEl.style.display = 'block';
        rewardEl.innerHTML = `
          <div style="margin: 20px 0 16px !important;">
            <p style="font-family: 'Orbitron', sans-serif !important; font-size: 0.85rem !important; font-weight: 800 !important; color: #F59E0B !important; text-transform: uppercase !important; letter-spacing: 1px !important; margin-bottom: 12px !important;">🎁 RECOMPENSAS CONQUISTADAS:</p>
            <div style="display: flex !important; justify-content: center !important; gap: 12px !important; flex-wrap: wrap !important;">
              
              <div style="flex: 1 !important; min-width: 100px !important; background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.3)) !important; border: 2px solid #F59E0B !important; border-radius: 16px !important; padding: 12px 8px !important; text-align: center !important; box-shadow: 0 6px 16px rgba(245, 158, 11, 0.3) !important;">
                <div style="font-size: 1.6rem !important; margin-bottom: 2px !important;">🪙</div>
                <div style="font-family: 'Orbitron', sans-serif !important; font-size: 1.2rem !important; font-weight: 900 !important; color: #FBBF24 !important;">+${result.coinsEarned}</div>
                <div style="font-size: 0.75rem !important; font-weight: 800 !important; color: #FDE68A !important; text-transform: uppercase !important;">Moedas</div>
              </div>

              <div style="flex: 1 !important; min-width: 100px !important; background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(2, 132, 199, 0.3)) !important; border: 2px solid #38BDF8 !important; border-radius: 16px !important; padding: 12px 8px !important; text-align: center !important; box-shadow: 0 6px 16px rgba(56, 189, 248, 0.3) !important;">
                <div style="font-size: 1.6rem !important; margin-bottom: 2px !important;">⚡</div>
                <div style="font-family: 'Orbitron', sans-serif !important; font-size: 1.2rem !important; font-weight: 900 !important; color: #38BDF8 !important;">+100</div>
                <div style="font-size: 0.75rem !important; font-weight: 800 !important; color: #BAE6FD !important; text-transform: uppercase !important;">XP Gamer</div>
              </div>

              ${result.streak > 1 ? `
              <div style="flex: 1 !important; min-width: 100px !important; background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(124, 58, 237, 0.3)) !important; border: 2px solid #A855F7 !important; border-radius: 16px !important; padding: 12px 8px !important; text-align: center !important; box-shadow: 0 6px 16px rgba(168, 85, 247, 0.3) !important;">
                <div style="font-size: 1.6rem !important; margin-bottom: 2px !important;">🔥</div>
                <div style="font-family: 'Orbitron', sans-serif !important; font-size: 1.2rem !important; font-weight: 900 !important; color: #C084FC !important;">x${result.streak}</div>
                <div style="font-size: 0.75rem !important; font-weight: 800 !important; color: #E9D5FF !important; text-transform: uppercase !important;">Combo</div>
              </div>
              ` : ''}

            </div>
          </div>
        `;
      }
    } else {
      soundManager.playWrong();

      if (iconEl) {
        iconEl.textContent = '💡';
        iconEl.style.cssText = 'font-size: 3.2rem !important; margin-bottom: 8px !important;';
      }

      if (titleEl) {
        titleEl.textContent = 'QUASE LÁ! VAMOS APRENDER?';
        titleEl.style.cssText = 'font-family: "Orbitron", sans-serif !important; font-size: 1.25rem !important; font-weight: 900 !important; color: #FBBF24 !important; text-transform: uppercase !important; margin-bottom: 16px !important;';
      }

      if (textEl) {
        textEl.innerHTML = `
          <div style="background: rgba(245, 158, 11, 0.15) !important; border: 2px solid #F59E0B !important; border-radius: 20px !important; padding: 16px 20px !important; margin-bottom: 18px !important;">
            <p style="font-size: 0.95rem !important; color: #94A3B8 !important; margin-bottom: 4px !important; font-weight: 700 !important; text-transform: uppercase !important; font-family: 'Orbitron', sans-serif !important;">A RESPOSTA CORRETA É:</p>
            <p style="font-family: 'Plus Jakarta Sans', sans-serif !important; font-size: 2.2rem !important; font-weight: 900 !important; color: #FBBF24 !important; text-transform: uppercase !important; margin: 0 !important;">${result.correctWord}</p>
          </div>
          <div style="background: #020617 !important; border: 1.5px solid rgba(255,255,255,0.12) !important; border-radius: 18px !important; padding: 16px 20px !important; text-align: left !important; margin-bottom: 18px !important;">
            <strong style="color: #38BDF8 !important; font-family: 'Orbitron', sans-serif !important; font-size: 0.9rem !important;">📖 DICA DO GUARDIÃO:</strong>
            <p style="color: #CBD5E1 !important; font-size: 1.05rem !important; margin-top: 6px !important; line-height: 1.6 !important; font-weight: 600 !important;">${result.explanation}</p>
          </div>
        `;
      }

      if (rewardEl) {
        rewardEl.style.display = 'none';
      }
    }

    if (btnNext) {
      btnNext.style.cssText = 'width: 100% !important; margin-top: 10px !important; padding: 16px 28px !important; font-size: 1.15rem !important; font-family: "Orbitron", sans-serif !important; font-weight: 800 !important; border-radius: 18px !important; cursor: pointer !important; background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%) !important; color: #FFFFFF !important; border: none !important; box-shadow: 0 6px 0 #0369A1 !important; text-transform: uppercase !important;';
      btnNext.onclick = () => {
        modal.classList.remove('active');
        soundManager.playClick();
        onNext();
      };
    }

    modal.classList.add('active');
  }

  // Tela de Vitória de Fase
  showVictoryModal(result, onRestartLevel, onBackToMenu) {
    soundManager.playFanfare();
    this.triggerConfetti(100);

    const modal = document.getElementById('victory-modal');
    if (!modal) return;

    const starsEl = modal.querySelector('.victory-stars');
    const starsEarned = result.starsEarned || 1;
    starsEl.innerHTML = [1, 2, 3].map(i => `
      <span class="victory-star ${i <= starsEarned ? 'earned' : ''}">⭐</span>
    `).join('');

    const statsEl = modal.querySelector('.victory-stats');
    statsEl.innerHTML = `
      <p>Você acertou <strong>${result.levelCorrectCount}</strong> de <strong>${result.totalQuestions}</strong> perguntas!</p>
      <div class="victory-coins">+${result.starsEarned * 20} 🪙 Moedas de Bônus!</div>
    `;

    const btnRestart = modal.querySelector('.btn-victory-restart');
    if (btnRestart) {
      btnRestart.onclick = () => {
        modal.classList.remove('active');
        onRestartLevel();
      };
    }

    const btnMenu = modal.querySelector('.btn-victory-menu');
    if (btnMenu) {
      btnMenu.onclick = () => {
        modal.classList.remove('active');
        onBackToMenu();
      };
    }

    modal.classList.add('active');
  }

  // Renderiza a Loja de Mascotes com Imagens 3D Realistas e Botão de Foto
  renderShop(containerEl) {
    if (!containerEl) return;
    const mascots = this.game.getMascots();

    containerEl.innerHTML = mascots.map(mascot => {
      let actionBtn = '';
      let photoBtn = '';

      const isSecretLocked = mascot.secret && !mascot.unlocked;

      if (mascot.unlocked || mascot.active) {
        photoBtn = `
          <button class="btn btn-3d btn-info btn-block btn-photo-mascot" data-id="${mascot.id}" style="margin-top: 8px;">
            📸 Tirar Foto de Perfil
          </button>
        `;
      }

      if (mascot.active) {
        actionBtn = `<button class="btn btn-disabled btn-block" disabled>✅ Mascote Equipado</button>`;
      } else if (mascot.unlocked) {
        actionBtn = `<button class="btn btn-3d btn-success btn-block btn-select-mascot" data-id="${mascot.id}">⚡ Equipar & Mudar Tema</button>`;
      } else {
        const canAfford = mascot.canAfford;
        actionBtn = `
          <button class="btn btn-3d ${canAfford ? 'btn-warning' : 'btn-disabled'} btn-block btn-buy-mascot" 
                  data-id="${mascot.id}" ${!canAfford ? 'disabled' : ''}>
            🪙 Desbloquear por ${mascot.price} Moedas
          </button>
        `;
      }

      const mascotName = isSecretLocked ? '❓ Mascote Secreto Misterioso' : mascot.name;
      const mascotDesc = isSecretLocked ? 'Personagem secreto do mundo obscuro! Solta raios laser pelos olhos e voa pelo céu!' : mascot.description;
      const mascotQuote = isSecretLocked ? '??? (Desbloqueie para revelar!)' : `"${mascot.quote}"`;
      const mascotImgStyle = isSecretLocked ? 'filter: brightness(0) drop-shadow(0 0 16px #F59E0B);' : '';
      const mascotBadge = isSecretLocked ? '❓' : mascot.icon;

      return `
        <div class="shop-card ${mascot.active ? 'active-mascot' : ''}" style="--neon-accent: ${mascot.neonColor};">
          <div class="shop-mascot-img-container">
            <img class="shop-mascot-real-img" src="${mascot.img}" alt="${mascotName}" style="${mascotImgStyle}" />
            <span class="shop-mascot-badge">${mascotBadge}</span>
          </div>
          <h3>${mascotName}</h3>
          <p class="shop-desc">${mascotDesc}</p>
          <p class="shop-quote">${mascotQuote}</p>
          <div class="shop-card-footer">
            ${actionBtn}
            ${photoBtn}
          </div>
        </div>
      `;
    }).join('');

    // Handlers para Equipar / Mudar Tema
    containerEl.querySelectorAll('.btn-select-mascot').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (this.game.selectMascot(id)) {
          soundManager.playFanfare();
          this.triggerConfetti(50);
          this.renderShop(containerEl);
          this.updateHeaderStats();
        }
      });
    });

    // Handlers para Compra de Mascote (Abre automaticamente o estúdio de fotos ao comprar!)
    containerEl.querySelectorAll('.btn-buy-mascot').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const res = this.game.buyMascot(id);
        if (res.success) {
          soundManager.playFanfare();
          this.triggerConfetti(80);
          this.renderShop(containerEl);
          this.updateHeaderStats();

          // Abre o Photo Booth de WebCam para comemorar a compra!
          const mascotObj = this.game.getMascots().find(m => m.id === id);
          if (mascotObj) {
            setTimeout(() => this.openPhotoBooth(mascotObj), 600);
          }
        }
      });
    });

    // Handlers para Tirar Foto com Mascote
    containerEl.querySelectorAll('.btn-photo-mascot').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const mascotObj = this.game.getMascots().find(m => m.id === id);
        if (mascotObj) {
          this.openPhotoBooth(mascotObj);
        }
      });
    });
  }

  // Abre o Photo Booth de WebCam USB com o Mascote
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

    // Solicita acesso à Câmera USB do Navegador
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
        .then(stream => {
          this.webcamStream = stream;
          if (videoEl) videoEl.srcObject = stream;
        })
        .catch(err => {
          console.warn('Erro ao acessar webcam USB:', err);
          alert('Não foi possível conectar com a câmera USB. Verifique se ela está conectada e se você deu permissão no navegador!');
        });
    } else {
      alert('Seu navegador não suporta acesso à câmera.');
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
            soundManager.playCorrect();
            
            // Captura foto no canvas
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
        } else if (this.game.playerData.profilePhoto) {
          this.downloadDataUrl(this.game.playerData.profilePhoto, `foto_perfil_${this.game.playerData.name}.png`);
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

  downloadDataUrl(dataUrl, filename = 'minha_foto_mascote.png') {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Captura o frame da câmera + mascote e gera a foto de perfil do jogador (Lado a Lado)
  capturePhoto(mascot, onDone) {
    const videoEl = document.getElementById('webcam-video');
    const canvas = document.getElementById('photobooth-canvas');
    if (!videoEl || !canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 360;

    // Fundo Escuro
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Metade Esquerda (0 a 320): Vídeo da Câmera Espelhado e Centralizado Proporcionalmente
    const vW = videoEl.videoWidth || 640;
    const vH = videoEl.videoHeight || 480;
    let srcW = vW, srcH = vH, srcX = 0, srcY = 0;
    if (vW > vH) {
      srcW = vH;
      srcX = (vW - vH) / 2;
    } else if (vH > vW) {
      srcH = vW;
      srcY = (vH - vW) / 2;
    }

    ctx.save();
    ctx.translate(320, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoEl, srcX, srcY, srcW, srcH, 0, 0, 320, 320);
    ctx.restore();

    // Divisor Neon Central
    ctx.fillStyle = mascot.neonColor || '#38BDF8';
    ctx.fillRect(318, 0, 4, 320);

    // Metade Direita (320 a 640): Imagem 3D do Mascote
    const mascotImg = new Image();
    mascotImg.crossOrigin = 'anonymous';
    mascotImg.src = mascot.img;

    mascotImg.onload = () => {
      ctx.drawImage(mascotImg, 320, 0, 320, 320);

      // Rodapé da Insígnia do Perfil
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

  closePhotoBooth() {
    const modal = document.getElementById('photobooth-modal');
    if (modal) modal.classList.remove('active');

    if (this.webcamStream) {
      this.webcamStream.getTracks().forEach(track => track.stop());
      this.webcamStream = null;
    }
  }

  // Renderiza o Painel dos Pais
  renderParentPanel(containerEl) {
    if (!containerEl) return;
    const html = parentReport.renderReport(this.game.playerData, this.game.categories, this.game.getProfiles());
    containerEl.innerHTML = html;

    containerEl.querySelectorAll('.btn-parent-reset-password').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const newPwd = prompt(`Digite a nova senha para o perfil de ${name}:`);
        if (newPwd && newPwd.trim()) {
          await this.game.setProfilePassword(id, newPwd.trim());
          alert(`🎉 Senha do perfil de ${name} alterada com sucesso!`);
          this.renderParentPanel(containerEl);
        }
      };
    });
  }

  openAdminPinModal() {
    const pinModal = document.getElementById('admin-pin-modal');
    if (!pinModal) return;

    const inputPin = document.getElementById('input-admin-pin');
    const btnConfirm = document.getElementById('btn-confirm-admin-pin');
    const btnCancel = document.getElementById('btn-cancel-admin-pin');
    const errorMsg = document.getElementById('admin-pin-error');

    if (inputPin) inputPin.value = '';
    if (errorMsg) errorMsg.style.display = 'none';

    if (btnCancel) {
      btnCancel.onclick = () => pinModal.classList.remove('active');
    }

    if (btnConfirm && inputPin) {
      btnConfirm.onclick = () => {
        const pin = inputPin.value.trim();
        if (this.game.adminVerifyMasterPin(pin)) {
          pinModal.classList.remove('active');
          soundManager.playFanfare();
          this.openAdminModal();
        } else {
          if (errorMsg) errorMsg.style.display = 'block';
          soundManager.playError();
        }
      };
    }

    pinModal.classList.add('active');
  }

  openAdminModal() {
    const adminModal = document.getElementById('admin-modal');
    if (!adminModal) return;

    this.renderAdminProfilesGrid();

    const btnClose = document.getElementById('btn-close-admin-modal');
    if (btnClose) {
      btnClose.onclick = () => adminModal.classList.remove('active');
    }

    const inputNewPin = document.getElementById('input-admin-new-pin');
    const btnChangePin = document.getElementById('btn-admin-change-pin');
    if (btnChangePin && inputNewPin) {
      btnChangePin.onclick = () => {
        const newPin = inputNewPin.value.trim();
        const res = this.game.adminSetMasterPin(newPin);
        alert(res.message);
        if (res.success) {
          inputNewPin.value = '';
        }
      };
    }

    adminModal.classList.add('active');
  }

  renderAdminProfilesGrid() {
    const container = document.getElementById('admin-profiles-grid');
    if (!container) return;

    const profiles = this.game.getProfiles();

    if (profiles.length === 0) {
      container.innerHTML = `<div style="color: #94A3B8; text-align: center; padding: 20px;">Nenhum usuário cadastrado.</div>`;
      return;
    }

    container.innerHTML = profiles.map(p => {
      const activeMascotObj = this.game.getMascots().find(m => m.id === (p.activeMascot || 'aranha')) || {};
      const photoSrc = p.customProfilePhoto || p.profilePhoto || activeMascotObj.img;
      const photoHtml = photoSrc 
        ? `<img src="${photoSrc}" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover; border: 2px solid #34D399;" />`
        : `<div style="font-size: 2rem;">👤</div>`;

      return `
        <div class="admin-profile-card" style="background: #020617; border: 2px solid #38BDF8; border-radius: 18px; padding: 16px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            ${photoHtml}
            <div>
              <div style="color: #FFF; font-weight: 800; font-size: 1.15rem; font-family: var(--font-heading);">${p.name}</div>
              <div style="color: #94A3B8; font-size: 0.85rem;">
                Nível ${p.level || 1} • ${p.coins || 0} Moedas 🪙 • ${p.gems || 0} Gemas 💎 • ${p.passwordHash ? '🔒 Com Senha' : '🔓 Sem Senha'}
              </div>
            </div>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <button class="btn btn-3d btn-primary btn-admin-reset-pwd" data-id="${p.id}" data-name="${p.name}" style="padding: 8px 14px; font-size: 0.85rem;">
              🔑 Redefinir Senha
            </button>
            <button class="btn btn-3d btn-success btn-admin-add-coins" data-id="${p.id}" style="padding: 8px 14px; font-size: 0.85rem;">
              🪙 +100 Moedas
            </button>
            <button class="btn btn-3d btn-warning btn-admin-unlock-all" data-id="${p.id}" style="padding: 8px 14px; font-size: 0.85rem;">
              🔓 Lib. Mascotes
            </button>
            <button class="btn btn-3d btn-danger btn-admin-delete-user" data-id="${p.id}" data-name="${p.name}" style="background: #DC2626 !important; border-color: #EF4444 !important; color: #FFF !important; padding: 8px 14px; font-size: 0.85rem;">
              🗑️ Apagar Usuário
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.btn-admin-reset-pwd').forEach(btn => {
      btn.onclick = async () => {
        const pId = btn.getAttribute('data-id');
        const pName = btn.getAttribute('data-name');
        const newPwd = prompt(`Digite a nova senha para o perfil '${pName}':`);
        if (newPwd !== null && newPwd.trim() !== '') {
          const res = await this.game.adminResetPassword(pId, newPwd.trim());
          alert(res.message);
          this.renderAdminProfilesGrid();
        }
      };
    });

    container.querySelectorAll('.btn-admin-add-coins').forEach(btn => {
      btn.onclick = () => {
        const pId = btn.getAttribute('data-id');
        if (this.game.adminGrantCoins(pId, 100)) {
          soundManager.playSuccess();
          this.updateHeaderStats();
          this.renderAdminProfilesGrid();
          alert('🪙 100 Moedas concedidas com sucesso!');
        }
      };
    });

    container.querySelectorAll('.btn-admin-unlock-all').forEach(btn => {
      btn.onclick = () => {
        const pId = btn.getAttribute('data-id');
        if (this.game.adminUnlockAllMascots(pId)) {
          soundManager.playFanfare();
          this.updateHeaderStats();
          this.renderAdminProfilesGrid();
          alert('🔓 Todos os mascotes desbloqueados para o jogador!');
        }
      };
    });

    container.querySelectorAll('.btn-admin-delete-user').forEach(btn => {
      btn.onclick = async () => {
        const pId = btn.getAttribute('data-id');
        const pName = btn.getAttribute('data-name');

        if (confirm(`Tem certeza de que deseja apagar permanentemente o perfil do usuário '${pName}'? Esta ação não pode ser desfeita.`)) {
          const res = await this.game.deleteProfile(pId);
          alert(res.message || 'Perfil apagado!');
          this.updateHeaderStats();
          this.renderAdminProfilesGrid();
        }
      };
    });
  }

  // Efeito de Confetes no Canvas HTML5
  triggerConfetti(count = 50) {
    if (!this.ctx || !this.canvas) return;

    const colors = ['#F59E0B', '#10B981', '#0EA5E9', '#EC4899', '#8B5CF6', '#F97316'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -10 - Math.random() * 20,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    if (!this.animationId) {
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.008;

      if (p.opacity <= 0 || p.y > this.canvas.height + 20) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.animationId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  // Modal de Perfis / Login (Troca de Jogador)
  async openProfileModal(options = {}) {
    const modal = document.getElementById('profile-modal');
    if (!modal) return;

    await this.game.fetchDbProfiles();
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

    container.innerHTML = profiles.map(p => {
      const isActive = p.id === activeId;
      const mascot = (this.game.getMascots().find(m => m.id === (p.activeMascot || 'aranha'))) || {};
      
      const photoHtml = p.profilePhoto 
        ? `<img class="profile-card-photo" src="${p.profilePhoto}" alt="${p.name}" />`
        : `<div class="profile-card-avatar-badge">${mascot.icon || '👤'}</div>`;

      const hasPass = this.game.hasPassword(p.id);

      return `
        <div class="profile-select-card ${isActive ? 'active-profile' : ''}">
          <div class="profile-card-header">
            ${photoHtml}
            <div class="profile-card-info">
              <h4 class="profile-card-name">${p.name} ${hasPass ? '🔒' : '⚠️ Sem Senha'}</h4>
              <p class="profile-card-meta">⭐ Nível ${p.level || 1} • 🪙 ${p.coins || 0} Moedas</p>
            </div>
          </div>
          <div class="profile-card-actions">
            ${isActive 
              ? `<button class="btn btn-disabled btn-block" disabled>✅ Jogando Agora</button>`
              : `<button class="btn btn-3d btn-primary btn-block btn-switch-profile" data-id="${p.id}">⚡ Escolher ${p.name}</button>`
            }
            ${profiles.length > 1 && !isActive
              ? `<button class="btn btn-disabled btn-block btn-delete-profile" data-id="${p.id}" style="margin-top:6px; background:#EF4444; color:#FFF;">🗑️ Excluir</button>`
              : ''
            }
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.btn-switch-profile').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const targetProfile = profiles.find(p => p.id === id);
        if (!targetProfile) return;

        this.promptPasswordLoginModal(targetProfile, async () => {
          soundManager.playFanfare();
          this.triggerConfetti(40);
          this.updateHeaderStats();
          const modal = document.getElementById('profile-modal');
          if (modal) modal.classList.remove('active');
          alert(`⚡ Perfil alterado para ${this.game.playerData.name}!`);
        });
      };
    });

    container.querySelectorAll('.btn-delete-profile').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const targetProfile = profiles.find(p => p.id === id);
        if (!targetProfile) return;

        if (this.game.hasPassword(id)) {
          const inputPwd = prompt(`Para excluir o perfil de ${targetProfile.name}, digite a senha correspondente:`);
          if (!inputPwd) return;
          const isOk = await this.game.verifyPassword(id, inputPwd);
          if (!isOk) {
            alert('❌ Senha incorreta! O perfil não foi excluído.');
            return;
          }
        } else {
          if (!confirm(`Tem certeza de que deseja excluir o perfil de ${targetProfile.name}?`)) {
            return;
          }
        }

        this.game.deleteProfile(id);
        this.updateHeaderStats();
        this.renderProfilesList();
        alert(`🗑️ Perfil de ${targetProfile.name} excluído.`);
      };
    });
  }

  promptPasswordLoginModal(profile, onSuccess) {
    const pwdModal = document.getElementById('login-password-modal');
    if (!pwdModal) return;

    const targetNameEl = document.getElementById('login-password-target-name');
    const inputPwd = document.getElementById('input-login-password');
    const errorEl = document.getElementById('login-password-error');
    const btnConfirm = document.getElementById('btn-confirm-login-password');
    const btnCancel = document.getElementById('btn-cancel-login-password');
    const btnToggleLogin = document.getElementById('btn-toggle-login-password');

    const hasPass = this.game.hasPassword(profile.id);

    if (btnToggleLogin && inputPwd) {
      btnToggleLogin.onclick = () => {
        const isPass = inputPwd.type === 'password';
        inputPwd.type = isPass ? 'text' : 'password';
        btnToggleLogin.textContent = isPass ? '🙈' : '👁️';
      };
    }

    if (targetNameEl) {
      if (hasPass) {
        targetNameEl.textContent = `Digite a senha para acessar o perfil de ${profile.name}:`;
      } else {
        targetNameEl.textContent = `O perfil de ${profile.name} ainda não possui senha. Crie uma senha para entrar:`;
      }
    }

    if (inputPwd) {
      inputPwd.type = 'password';
      inputPwd.value = '';
      if (btnToggleLogin) btnToggleLogin.textContent = '👁️';
      inputPwd.placeholder = hasPass ? 'Digite a senha do perfil...' : 'Crie a nova senha do perfil...';
      setTimeout(() => inputPwd.focus(), 150);
    }

    if (errorEl) {
      errorEl.style.display = 'none';
    }

    const handleConfirm = async () => {
      const typed = inputPwd.value.trim();
      if (!typed) {
        if (errorEl) {
          errorEl.textContent = '⚠️ Por favor, digite a senha.';
          errorEl.style.display = 'block';
        }
        inputPwd.focus();
        return;
      }

      if (!hasPass) {
        await this.game.setProfilePassword(profile.id, typed);
        await this.game.selectProfile(profile.id, typed);
        pwdModal.classList.remove('active');
        if (onSuccess) onSuccess();
        return;
      }

      const isCorrect = await this.game.verifyPassword(profile.id, typed);
      if (isCorrect) {
        await this.game.selectProfile(profile.id, typed);
        pwdModal.classList.remove('active');
        if (onSuccess) onSuccess();
      } else {
        if (errorEl) {
          errorEl.textContent = '❌ Senha incorreta! Tente novamente.';
          errorEl.style.display = 'block';
        }
        soundManager.playWrong();
        inputPwd.value = '';
        inputPwd.focus();
      }
    };

    if (btnConfirm) {
      btnConfirm.onclick = handleConfirm;
    }

    if (inputPwd) {
      inputPwd.onkeydown = (e) => {
        if (e.key === 'Enter') handleConfirm();
      };
    }

    if (btnCancel) {
      btnCancel.onclick = () => {
        pwdModal.classList.remove('active');
      };
    }

    const btnForgot = document.getElementById('btn-forgot-password');
    if (btnForgot) {
      btnForgot.onclick = () => {
        pwdModal.classList.remove('active');
        this.openRecoveryModal(profile, onSuccess);
      };
    }

    pwdModal.classList.add('active');
  }

  openRecoveryModal(profile, onSuccess) {
    const recoveryModal = document.getElementById('recovery-password-modal');
    if (!recoveryModal) return;

    const targetNameEl = document.getElementById('recovery-target-name');
    const hintBox = document.getElementById('recovery-hint-box');
    const hintText = document.getElementById('recovery-hint-text');
    const inputPin = document.getElementById('input-recovery-pin');
    const inputNewPwd = document.getElementById('input-recovery-new-pwd');
    const errorMsg = document.getElementById('recovery-error-msg');
    const btnConfirm = document.getElementById('btn-confirm-recovery');
    const btnCancel = document.getElementById('btn-cancel-recovery');

    if (targetNameEl) {
      targetNameEl.textContent = `Jogador: ${profile.name}`;
    }

    if (profile.passwordHint && hintBox && hintText) {
      hintText.textContent = profile.passwordHint;
      hintBox.style.display = 'block';
    } else if (hintBox) {
      hintBox.style.display = 'none';
    }

    if (inputPin) inputPin.value = '';
    if (inputNewPwd) inputNewPwd.value = '';
    if (errorMsg) errorMsg.style.display = 'none';

    if (btnConfirm) {
      btnConfirm.onclick = async () => {
        const pin = inputPin.value.trim();
        const newPwd = inputNewPwd.value.trim();

        if (!newPwd) {
          alert('Por favor, digite a nova senha!');
          inputNewPwd.focus();
          return;
        }

        const res = await this.game.resetPasswordWithPin(profile.id, pin, newPwd);
        if (res.success) {
          recoveryModal.classList.remove('active');
          const profileModal = document.getElementById('profile-modal');
          if (profileModal) profileModal.classList.remove('active');
          soundManager.playFanfare();
          this.triggerConfetti(40);
          this.updateHeaderStats();
          alert(`🎉 Senha do perfil ${profile.name} redefinida com sucesso!`);
          if (onSuccess) onSuccess();
        } else {
          if (errorMsg) {
            errorMsg.textContent = `❌ ${res.message}`;
            errorMsg.style.display = 'block';
          }
          soundManager.playWrong();
        }
      };
    }

    if (btnCancel) {
      btnCancel.onclick = () => {
        recoveryModal.classList.remove('active');
      };
    }

    recoveryModal.classList.add('active');
  }

  // Modal Galeria de Fotos Salvas
  openGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;

    this.renderGalleryList();

    const btnClose = document.getElementById('btn-close-gallery-modal');
    if (btnClose) {
      btnClose.onclick = () => modal.classList.remove('active');
    }

    modal.classList.add('active');
  }

  renderGalleryList() {
    const container = document.getElementById('gallery-list-container');
    if (!container) return;

    const gallery = this.game.getPhotoGallery();
    const currentPhoto = this.game.playerData.profilePhoto;

    if (gallery.length === 0) {
      container.innerHTML = `
        <div class="gallery-empty-state">
          <div style="font-size: 3.5rem;">📸</div>
          <p style="font-size: 1.2rem; color: #94A3B8; margin-top: 10px;">Você ainda não tem fotos salvas nesta galeria!</p>
          <small style="color: #64748B;">Compre um mascote na loja e tire fotos épicas no estúdio!</small>
        </div>
      `;
      return;
    }

    container.innerHTML = gallery.map(item => {
      const isSelected = currentPhoto === item.dataUrl;
      return `
        <div class="gallery-photo-card ${isSelected ? 'selected-photo' : ''}">
          <img class="gallery-photo-img" src="${item.dataUrl}" alt="Foto Perfil" />
          <div class="gallery-photo-meta">
            <span style="font-weight:700; color:#38BDF8;">⚡ ${item.mascotName || 'Mascote'}</span>
            <small style="color:#94A3B8;">📅 ${item.date || ''}</small>
          </div>
          <div class="gallery-photo-actions" style="margin-top: 10px;">
            ${isSelected 
              ? `<button class="btn btn-disabled btn-block" disabled>✅ Foto em Uso</button>`
              : `<button class="btn btn-3d btn-success btn-block btn-set-avatar" data-id="${item.id}">✅ Usar de Perfil</button>`
            }
            <button class="btn btn-3d btn-warning btn-block btn-download-gallery-photo" data-url="${item.dataUrl}">💾 Baixar Foto (PNG)</button>
            <button class="btn btn-3d btn-disabled btn-block btn-delete-photo" data-id="${item.id}" style="margin-top:6px; background:#EF4444; color:#FFF;">🗑️ Excluir</button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.btn-set-avatar').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        if (this.game.setPhotoAsAvatar(id)) {
          soundManager.playCorrect();
          this.updateHeaderStats();
          this.renderGalleryList();
          alert('🎉 Foto de perfil atualizada com sucesso!');
        }
      };
    });

    container.querySelectorAll('.btn-download-gallery-photo').forEach(btn => {
      btn.onclick = () => {
        const url = btn.getAttribute('data-url');
        if (url) {
          this.downloadDataUrl(url, `foto_galeria_${Date.now()}.png`);
        }
      };
    });

    container.querySelectorAll('.btn-delete-photo').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Deseja excluir esta foto da galeria?')) {
          this.game.deleteGalleryPhoto(id);
          this.updateHeaderStats();
          this.renderGalleryList();
        }
      };
    });
  }

  // Renderiza a Tela do Modo Matrix Puzzle
  renderMatrixGame() {
    const screen = document.getElementById('matrix-game-screen');
    if (!screen) return;

    const data = this.game.startMatrixPuzzle();
    this.matrixQuestions = data.questions;
    this.matrixSelections = {};

    const container = document.getElementById('matrix-sentences-container');
    const bank = document.getElementById('matrix-word-bank');

    if (container) {
      container.innerHTML = data.questions.map((q, idx) => `
        <div class="matrix-sentence-card">
          <span class="matrix-num-badge">#${idx + 1}</span>
          <p class="matrix-sentence-text">
            ${q.sentence.replace(/\S*(?:_____|___)\S*/, `<span class="matrix-slot-badge" data-idx="${idx}" title="Clique para desmarcar se desejar">[ _____ ]</span>`)}
          </p>
        </div>
      `).join('');

      // Clique no Slot Preenchido para Desfazer / Limpar a resposta
      container.querySelectorAll('.matrix-slot-badge').forEach(slot => {
        slot.onclick = () => {
          const idx = slot.getAttribute('data-idx');
          const currentVal = this.matrixSelections[idx];
          if (currentVal) {
            delete this.matrixSelections[idx];
            slot.textContent = '[ _____ ]';
            slot.style.backgroundColor = 'rgba(245, 158, 11, 0.15)';
            slot.style.color = '#FBBF24';
            slot.style.borderColor = '#F59E0B';

            // Reativa o chip correspondente no banco
            const chip = bank.querySelector(`.btn-matrix-word-chip[data-word="${currentVal}"][disabled]`);
            if (chip) {
              chip.disabled = false;
              chip.style.opacity = '1';
            }
            soundManager.playClick();
          }
        };
      });
    }

    if (bank) {
      bank.innerHTML = data.wordBank.map((word, wIdx) => `
        <button class="btn-matrix-word-chip" data-word="${word}" data-widx="${wIdx}">
          ✨ ${word}
        </button>
      `).join('');

      bank.querySelectorAll('.btn-matrix-word-chip').forEach(chip => {
        chip.onclick = () => {
          const word = chip.getAttribute('data-word');
          const emptyIdx = [0, 1, 2, 3].find(i => !this.matrixSelections[i]);
          if (typeof emptyIdx !== 'undefined') {
            this.matrixSelections[emptyIdx] = word;
            chip.disabled = true;
            chip.style.opacity = '0.4';

            const slot = container.querySelector(`.matrix-slot-badge[data-idx="${emptyIdx}"]`);
            if (slot) {
              slot.textContent = `[ ${word} ]`;
              slot.style.backgroundColor = '#10B981';
              slot.style.color = '#FFFFFF';
              slot.style.borderColor = '#34D399';
            }
            soundManager.playClick();
          } else {
            alert('Todas as 4 lacunas já foram preenchidas! Clique em "🚀 Validar Respostas"!');
          }
        };
      });
    }

    const btnSubmit = document.getElementById('btn-submit-matrix');
    if (btnSubmit) {
      btnSubmit.onclick = () => {
        const res = this.game.submitMatrixPuzzle(this.matrixSelections);
        if (res.isComplete) {
          soundManager.playFanfare();
          this.triggerConfetti(90);
          this.updateHeaderStats();
          alert(`🎉 PARABÉNS! Você venceu a Batalha de Puzzles!\n\nGanhou +${res.coinsEarned} 🪙 Moedas & +${res.gemsEarned} 💎 Gema Secreta!`);
          this.renderMatrixGame();
        } else {
          soundManager.playWrong();
          alert(`Você acertou ${res.correctCount} de ${res.total} palavras. Tente novamente!`);
        }
      };
    }
  }
}

/**
 * Ponto de Entrada Principal (App) - Guardião das Palavras
 * Conecta o GameEngine, UIController e SoundManager.
 */

import { GameEngine } from './components/gameEngine.js';
import { UIController } from './components/uiController.js';
import { soundManager } from './audio/soundEffects.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializa o Engine de Lógica e a Controller de Interface
  const game = new GameEngine();
  const ui = new UIController(game);

  // Desbloqueia o AudioContext no primeiro clique do usuário (Requisito dos Navegadores)
  const unlockAudio = () => {
    soundManager.initContext();
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  };
  document.addEventListener('click', unlockAudio);
  document.addEventListener('touchstart', unlockAudio);

  // Botão de Alternar Música de Fundo (BGM)
  const btnToggleBGM = document.getElementById('btn-toggle-bgm');
  if (btnToggleBGM) {
    btnToggleBGM.onclick = () => {
      const isPlaying = soundManager.toggleBGM();
      btnToggleBGM.querySelector('.bgm-icon').textContent = isPlaying ? '🎵 Música: ON' : '🎵 Música: OFF';
      btnToggleBGM.classList.toggle('active', isPlaying);
    };
  }

  // 2. Atualiza Estatísticas Iniciais no Header
  ui.updateHeaderStats();

  // 3. Configurações de Navegação Principal (Botões do Menu)
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

  // Botões de Voltar ao Menu nas Telas Secundárias
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

  // Botão de Reset de Dados no Painel dos Pais
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

  // 4. Fluxo de Início de Fase
  function handleStartLevel(categoryId) {
    if (game.startLevel(categoryId)) {
      ui.showScreen('game-screen');
      loadCurrentQuestion();
    }
  }

  // Carrega e Exibe a Pergunta Atual
  function loadCurrentQuestion() {
    const qData = game.getCurrentQuestion();
    if (!qData) return;

    ui.renderQuestion(qData, (selectedOptionIndex) => {
      handleAnswer(selectedOptionIndex);
    });
  }

  // Processa a Resposta Escolhida
  function handleAnswer(selectedOptionIndex) {
    const result = game.submitAnswer(selectedOptionIndex);
    if (!result) return;

    // Exibe Feedback em Modal
    ui.showFeedbackModal(result, () => {
      if (result.isLevelFinished) {
        // Fase concluída
        ui.showVictoryModal(
          result,
          () => handleStartLevel(game.currentCategory.id), // Jogar novamente
          () => {
            ui.renderCategorySelection(
              document.getElementById('category-cards-container'),
              (catId) => handleStartLevel(catId)
            );
            ui.showScreen('level-select-screen');
          }
        );
      } else {
        // Próxima pergunta
        loadCurrentQuestion();
      }
    });
  }
});

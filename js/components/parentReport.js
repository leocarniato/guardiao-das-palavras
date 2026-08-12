/**
 * Painel dos Pais (Relatório Pedagógico & Desempenho)
 * Exibe gráfico de acertos por regra ortográfica e recomendações de estudo personalizadas.
 */

export class ParentReport {
  constructor() {
    this.tipsPerRule = {
      ao_am: 'Dica para trabalhar em casa: Treine com ações! "-AM" se já aconteceu no passado (Ontem eles cantaram) e "-ÃO" se ainda vai acontecer no futuro (Amanhã eles cantarão).',
      som_z: 'Dica para trabalhar em casa: Lembre a criança de que o S entre duas vogais (ex: m-e-s-a) ganha som de Z! Já o Z é usado em substantivos de qualidade como beleza e rapidez.',
      m_pb: 'Dica para trabalhar em casa: Regra do "Papai e Bebê"! O M vem sempre antes das letras P (Papai) e B (Bebê). Antes de qualquer outra consoante, usamos N.',
      ch_x: 'Dica para trabalhar em casa: Pratique a leitura em voz alta de palavras com CH (chuva, chave) e X (xícara, lixo). Criar listas ilustradas de palavras ajuda na fixação visual!',
      g_j: 'Dica para trabalhar em casa: Associe imagens! Girafa e Gelo usam G. Jacaré, Jiboia e Loja usam J.',
      s_ss_c_cedilha: 'Dica para trabalhar em casa: Explique que o SS é usado entre vogais para fazer som forte de S (massa, passarinho) e que o Ç é usado apenas antes de A, O, U (maçã, pedaço).'
    };
  }

  // Gera o HTML completo do relatório dos pais
  renderReport(playerData, categories, allProfiles = []) {
    const pData = playerData || { level: 1, coins: 0, stats: {} };
    const stats = pData.stats || {};
    let totalAttempts = 0;
    let totalCorrect = 0;

    // Calcula métricas globais
    categories.forEach(cat => {
      const catStat = stats[cat.id] || { attempts: 0, correct: 0, incorrect: 0 };
      totalAttempts += catStat.attempts;
      totalCorrect += catStat.correct;
    });

    const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    // Encontra a regra que necessita de maior atenção (menor percentual de acerto)
    let lowestCat = null;
    let lowestAccuracy = 101;

    const categoryStatsHTML = categories.map(cat => {
      const catStat = stats[cat.id] || { attempts: 0, correct: 0, incorrect: 0 };
      const accuracy = catStat.attempts > 0 ? Math.round((catStat.correct / catStat.attempts) * 100) : 0;

      if (catStat.attempts > 0 && accuracy < lowestAccuracy) {
        lowestAccuracy = accuracy;
        lowestCat = cat;
      }

      // Determina cor com base na taxa de acerto
      let statusColor = '#10B981'; // Verde (Excelente)
      let statusLabel = 'Excelente';
      if (accuracy < 60) {
        statusColor = '#EF4444'; // Vermelho (Atenção)
        statusLabel = 'Precisa Praticar';
      } else if (accuracy < 80) {
        statusColor = '#F59E0B'; // Amarelo (Bom)
        statusLabel = 'Bom Progresso';
      }

      return `
        <div class="report-card">
          <div class="report-card-header">
            <div class="report-cat-title">
              <span class="report-icon">${cat.icon}</span>
              <div>
                <h4>${cat.title}</h4>
                <p class="report-subtitle">${cat.subtitle}</p>
              </div>
            </div>
            <div class="report-badge" style="background: ${statusColor}15; color: ${statusColor}; border: 1px solid ${statusColor}40;">
              ${catStat.attempts === 0 ? 'Não jogado' : `${accuracy}% - ${statusLabel}`}
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${catStat.attempts === 0 ? 0 : accuracy}%; background: ${statusColor};"></div>
          </div>

          <div class="report-details">
            <span>✅ Acertos: <strong>${catStat.correct}</strong></span>
            <span>❌ Revisões: <strong>${catStat.incorrect}</strong></span>
            <span>📝 Questões respondidas: <strong>${catStat.attempts}</strong></span>
          </div>
        </div>
      `;
    }).join('');

    // Gera mensagem personalizada de recomendação de estudo
    let recommendationHTML = '';
    if (lowestCat && lowestAccuracy < 100) {
      const tip = this.tipsPerRule[lowestCat.id] || 'Pratique mais esta categoria com a criança!';
      recommendationHTML = `
        <div class="recommendation-box">
          <div class="rec-header">
            <span class="rec-icon">💡</span>
            <h3>Recomendação de Estudo Personalizada</h3>
          </div>
          <p class="rec-text">
            Identificamos que a categoria com maior oportunidade de melhoria no momento é <strong>"${lowestCat.title}"</strong> (taxa de acertos: <strong>${lowestAccuracy}%</strong>).
          </p>
          <div class="rec-tip">
            <strong>📌 Como apoiar a criança:</strong>
            <p>${tip}</p>
          </div>
        </div>
      `;
    } else if (totalAttempts === 0) {
      recommendationHTML = `
        <div class="recommendation-box">
          <div class="rec-header">
            <span class="rec-icon">🌟</span>
            <h3>Bem-vindo ao Painel dos Pais!</h3>
          </div>
          <p class="rec-text">
            À medida que seu filho jogar e responder às perguntas ortográficas, este painel exibirá gráficos detalhados sobre o ritmo de aprendizado e recomendações pedagógicas personalizadas.
          </p>
        </div>
      `;
    } else {
      recommendationHTML = `
        <div class="recommendation-box success">
          <div class="rec-header">
            <span class="rec-icon">🎉</span>
            <h3>Excelente Desempenho!</h3>
          </div>
          <p class="rec-text">
            Parabéns! O jogador está demonstrando um domínio fantástico em todas as regras ortográficas jogadas até agora. Continue incentivando a prática diária!
          </p>
        </div>
      `;
    }

    const passwordManagerHTML = (allProfiles && allProfiles.length > 0) ? `
      <div style="margin-top: 32px; background: rgba(30, 41, 59, 0.7); border: 2px solid #38BDF8; border-radius: 24px; padding: 24px;">
        <h3 class="section-title" style="margin-bottom: 12px; color: #F59E0B; font-family: 'Orbitron', sans-serif;">🔑 Controle de Senhas dos Pais</h3>
        <p style="color: #94A3B8; font-size: 0.95rem; margin-bottom: 16px;">Como responsável, você tem controle total para redefinir ou criar uma nova senha para a criança se ela esquecer:</p>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${allProfiles.map(p => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: #020617; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 12px 18px; flex-wrap: wrap; gap: 10px;">
              <div>
                <strong style="color: #FFF; font-size: 1.1rem; font-family: 'Plus Jakarta Sans', sans-serif;">👤 ${p.name}</strong>
                <span style="font-size: 0.85rem; color: ${p.passwordHash ? '#34D399' : '#F59E0B'}; margin-left: 8px; font-weight: 700;">${p.passwordHash ? '🔒 Protegido com Senha' : '⚠️ Sem Senha'}</span>
              </div>
              <button class="btn btn-3d btn-warning btn-parent-reset-password" data-id="${p.id}" data-name="${p.name}">
                🔄 Redefinir Senha
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    return `
      <div class="parent-dashboard">
        <div class="dashboard-summary">
          <div class="summary-card">
            <span class="summary-number">${overallAccuracy}%</span>
            <span class="summary-label">Taxa Geral de Acertos</span>
          </div>
          <div class="summary-card">
            <span class="summary-number">${totalCorrect}</span>
            <span class="summary-label">Palavras Acertadas</span>
          </div>
          <div class="summary-card">
            <span class="summary-number">${pData.level || 1}</span>
            <span class="summary-label">Nível de Sabedoria</span>
          </div>
          <div class="summary-card">
            <span class="summary-number">${pData.coins || 0} 🪙</span>
            <span class="summary-label">Moedas Conquistadas</span>
          </div>
        </div>

        ${recommendationHTML}

        <h3 class="section-title">📊 Desempenho Detalhado por Categoria Ortográfica</h3>
        <div class="report-grid">
          ${categoryStatsHTML}
        </div>

        ${passwordManagerHTML}
      </div>
    `;
  }
}

export const parentReport = new ParentReport();

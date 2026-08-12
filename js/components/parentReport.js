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
  renderReport(playerData, categories) {
    const stats = playerData.stats || {};
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
            <span class="summary-number">${playerData.level}</span>
            <span class="summary-label">Nível de Sabedoria</span>
          </div>
          <div class="summary-card">
            <span class="summary-number">${playerData.coins} 🪙</span>
            <span class="summary-label">Moedas Conquistadas</span>
          </div>
        </div>

        ${recommendationHTML}

        <h3 class="section-title">📊 Desempenho Detalhado por Categoria Ortográfica</h3>
        <div class="report-grid">
          ${categoryStatsHTML}
        </div>
      </div>
    `;
  }
}

export const parentReport = new ParentReport();

/**
 * BANCO DE DADOS PEDAGÓGICO - GUARDIÃO DAS PALAVRAS
 * Alinhado à BNCC para o 3º ano do Ensino Fundamental
 * 
 * Categorias Ortográficas:
 * 1. ao_am: Distinção entre -ÃO (Futuro / Substantivos) e -AM (Passado) - 16 desafios
 * 2. s_z: Som de Z escrito com S ou Z - 16 desafios
 * 3. m_n: Regra de M antes de P e B, e N antes de outras consoantes - 16 desafios
 * 4. ch_x: Ortografia com CH ou X - 14 desafios
 * 5. g_j: Ortografia com G ou J - 14 desafios
 * 6. s_ss_c_ç: Grafia com S, SS, C ou Ç - 15 desafios
 */

const WORD_BANK = {
  // =========================================================================
  // 1. TROCA DE -ÃO E -AM (Passado vs Futuro / Substantivos)
  // =========================================================================
  ao_am: [
    {
      id: "ao_am_1",
      type: "fill_blank",
      sentence: "Ontem, os passarinhos _____ muito no jardim.",
      fullWord: "cantaram",
      missingPart: "am",
      options: ["am", "ão"],
      audioText: "Ontem os passarinhos cantaram muito no jardim.",
      hint: "Dica do Tempo: 'Ontem' indica passado! Verbos no passado terminam com -AM.",
      ruleExplanation: "Usamos -AM para ações que já aconteceram (passado)!",
      difficulty: 1
    },
    {
      id: "ao_am_2",
      type: "fill_blank",
      sentence: "Amanhã, os alunos _____ para o museu da cidade.",
      fullWord: "viajarão",
      missingPart: "ão",
      options: ["ão", "am"],
      audioText: "Amanhã os alunos viajarão para o museu da cidade.",
      hint: "Dica do Tempo: 'Amanhã' indica futuro! Verbos no futuro terminam com -ÃO.",
      ruleExplanation: "Usamos -ÃO para ações que ainda vão acontecer (futuro)!",
      difficulty: 1
    },
    {
      id: "ao_am_3",
      type: "fill_blank",
      sentence: "O vovô comprou um _____ quentinho na padaria.",
      fullWord: "pão",
      missingPart: "ão",
      options: ["ão", "am"],
      audioText: "O vovô comprou um pão quentinho na padaria.",
      hint: "Dica do Nome: 'Pão' é o nome de um alimento (substantivo)! Termina com -ÃO.",
      ruleExplanation: "Substantivos (nomes de coisas ou alimentos) como 'pão' terminam com -ÃO!",
      difficulty: 1
    },
    {
      id: "ao_am_4",
      type: "fill_blank",
      sentence: "No almoço, comemos arroz com _____ saboroso.",
      fullWord: "feijão",
      missingPart: "ão",
      options: ["ão", "am"],
      audioText: "No almoço comemos arroz com feijão saboroso.",
      hint: "Dica do Nome: 'Feijão' é um substantivo e termina com -ÃO.",
      ruleExplanation: "Substantivos (nomes de alimentos) terminam com -ÃO!",
      difficulty: 1
    },
    {
      id: "ao_am_5",
      type: "fill_blank",
      sentence: "Semana passada, as crianças _____ bastante no parque.",
      fullWord: "brincaram",
      missingPart: "am",
      options: ["am", "ão"],
      audioText: "Semana passada as crianças brincaram bastante no parque.",
      hint: "Dica do Tempo: 'Semana passada' já aconteceu! Verbos no passado terminam com -AM.",
      ruleExplanation: "Ações que já aconteceram no passado levam a terminação -AM!",
      difficulty: 1
    },
    {
      id: "ao_am_6",
      type: "fill_blank",
      sentence: "No próximo domingo, meus tios _____ em nossa casa.",
      fullWord: "almoçarão",
      missingPart: "ão",
      options: ["ão", "am"],
      audioText: "No próximo domingo meus tios almoçarão em nossa casa.",
      hint: "Dica do Tempo: 'Próximo domingo' é futuro! Verbos no futuro terminam com -ÃO.",
      ruleExplanation: "Ações que vão acontecer no futuro terminam com -ÃO!",
      difficulty: 2
    },
    {
      id: "ao_am_7",
      type: "fill_blank",
      sentence: "Ontem à noite, eles _____ um filme muito divertido.",
      fullWord: "assistiram",
      missingPart: "am",
      options: ["am", "ão"],
      audioText: "Ontem à noite eles assistiram um filme muito divertido.",
      hint: "Dica do Tempo: 'Ontem à noite' já passou! Verbos no passado terminam com -AM.",
      ruleExplanation: "Ações passadas no plural terminam com -AM!",
      difficulty: 1
    },
    {
      id: "ao_am_8",
      type: "fill_blank",
      sentence: "O menino soltou a linha do seu _____ colorido.",
      fullWord: "balão",
      missingPart: "ão",
      options: ["ão", "am"],
      audioText: "O menino soltou a linha do seu balão colorido.",
      hint: "Dica do Nome: 'Balão' é o nome de um brinquedo/objeto, então termina com -ÃO.",
      ruleExplanation: "Nomes de objetos (substantivos) terminam com -ÃO!",
      difficulty: 1
    },
    {
      id: "ao_am_9",
      type: "fill_blank",
      sentence: "Os atletas _____ muito rápido na corrida de ontem.",
      fullWord: "correram",
      missingPart: "am",
      options: ["am", "ão"],
      audioText: "Os atletas correram muito rápido na corrida de ontem.",
      hint: "Dica do Tempo: 'De ontem' mostra passado! Verbos no passado terminam com -AM.",
      ruleExplanation: "Verbos no passado levam a terminação -AM!",
      difficulty: 2
    },
    {
      id: "ao_am_10",
      type: "fill_blank",
      sentence: "Ano que vem, os estudantes _____ para o quarto ano.",
      fullWord: "passarão",
      missingPart: "ão",
      options: ["ão", "am"],
      audioText: "Ano que vem os estudantes passarão para o quarto ano.",
      hint: "Dica do Tempo: 'Ano que vem' indica futuro! Verbos no futuro terminam com -ÃO.",
      ruleExplanation: "Verbos no futuro recebem a terminação -ÃO!",
      difficulty: 2
    },
    {
      id: "ao_am_11",
      type: "fill_blank",
      sentence: "Na festa de ontem, todos _____ parabéns com alegria.",
      fullWord: "cantaram",
      missingPart: "am",
      options: ["am", "ão"],
      audioText: "Na festa de ontem todos cantaram parabéns com alegria.",
      hint: "Dica do Tempo: 'Ontem' é passado! Verbos no passado terminam com -AM.",
      ruleExplanation: "Ações já concluídas terminam em -AM!",
      difficulty: 2
    },
    {
      id: "ao_am_12",
      type: "fill_blank",
      sentence: "O _____ é o rei da selva e tem uma linda juba.",
      fullWord: "leão",
      missingPart: "ão",
      options: ["ão", "am"],
      audioText: "O leão é o rei da selva e tem uma linda juba.",
      hint: "Dica do Nome: 'Leão' é o nome do animal, por isso termina com -ÃO.",
      ruleExplanation: "Nomes de animais (substantivos) usam a terminação -ÃO!",
      difficulty: 1
    },
    {
      id: "ao_am_13",
      type: "fill_blank",
      sentence: "Quando as aulas voltarem, os professores _____ livros novos.",
      fullWord: "trarão",
      missingPart: "ão",
      options: ["ão", "am"],
      audioText: "Quando as aulas voltarem os professores trarão livros novos.",
      hint: "Dica do Tempo: 'Quando voltarem' indica um evento futuro! Usamos -ÃO.",
      ruleExplanation: "Ações futuras com eles ou elas terminam com -ÃO!",
      difficulty: 3
    },
    {
      id: "ao_am_14",
      type: "fill_blank",
      sentence: "Os cachorros _____ bastante durante a noite passada.",
      fullWord: "latiram",
      missingPart: "am",
      options: ["am", "ão"],
      audioText: "Os cachorros latiram bastante durante a noite passada.",
      hint: "Dica do Tempo: 'Noite passada' indica passado! Verbos no passado terminam com -AM.",
      ruleExplanation: "Usamos -AM para ações no passado!",
      difficulty: 2
    },
    {
      id: "ao_am_15",
      type: "fill_blank",
      sentence: "Na próxima semana, os astrônomos _____ as estrelas.",
      fullWord: "estudarão",
      missingPart: "ão",
      options: ["ão", "am"],
      audioText: "Na próxima semana os astrônomos estudarão as estrelas.",
      hint: "Dica do Tempo: 'Próxima semana' indica futuro! Usamos -ÃO.",
      ruleExplanation: "Usamos -ÃO para ações no futuro!",
      difficulty: 3
    },
    {
      id: "ao_am_16",
      type: "fill_blank",
      sentence: "Lavei minhas mãos com água e _____ cheiroso.",
      fullWord: "sabão",
      missingPart: "ão",
      options: ["ão", "am"],
      audioText: "Lavei minhas mãos com água e sabão cheiroso.",
      hint: "Dica do Nome: 'Sabão' é o nome de um produto de higiene! Termina com -ÃO.",
      ruleExplanation: "Nomes de objetos ou produtos (substantivos) usam -ÃO!",
      difficulty: 1
    }
  ],

  // =========================================================================
  // 2. SOM DE Z ESCRITO COM S OU Z
  // =========================================================================
  s_z: [
    {
      id: "s_z_1",
      type: "fill_blank",
      sentence: "A me_____a da sala é feita de madeira boa.",
      fullWord: "mesa",
      missingPart: "s",
      options: ["s", "z"],
      audioText: "A mesa da sala é feita de madeira boa.",
      hint: "Dica do S com som de Z: Entre duas vogais (e...a), a letra S tem som de Z!",
      ruleExplanation: "A letra S entre duas vogais soa como Z, como em 'mesa'.",
      difficulty: 1
    },
    {
      id: "s_z_2",
      type: "fill_blank",
      sentence: "A princesa admirou a bele_____a do jardim florido.",
      fullWord: "beleza",
      missingPart: "z",
      options: ["z", "s"],
      audioText: "A princesa admirou a beleza do jardim florido.",
      hint: "Dica do -EZA: Palavras que vêm de qualidades (belo -> beleza) terminam com Z!",
      ruleExplanation: "Substantivos derivados com o sufixo -eza são escritos com Z!",
      difficulty: 2
    },
    {
      id: "s_z_3",
      type: "fill_blank",
      sentence: "A vovó cultivou uma ro_____a cheirosa no vaso.",
      fullWord: "rosa",
      missingPart: "s",
      options: ["s", "z"],
      audioText: "A vovó cultivou uma rosa cheirosa no vaso.",
      hint: "Dica do S entre vogais: Entre o 'o' e o 'a', a letra S ganha som de Z!",
      ruleExplanation: "Entre vogais, usa-se S para fazer o som de Z.",
      difficulty: 1
    },
    {
      id: "s_z_4",
      type: "fill_blank",
      sentence: "O raposinho usou sua esperte_____a para resolver o mistério.",
      fullWord: "esperteza",
      missingPart: "z",
      options: ["z", "s"],
      audioText: "O raposinho usou sua esperteza para resolver o mistério.",
      hint: "Dica do -EZA: Vem da palavra 'esperto', então termina com -EZA com Z!",
      ruleExplanation: "Palavras terminadas em -eza (derivadas de esperto) usam Z!",
      difficulty: 2
    },
    {
      id: "s_z_5",
      type: "fill_blank",
      sentence: "Os piratas acharam um te_____ouro cheio de moedas de ouro.",
      fullWord: "tesouro",
      missingPart: "s",
      options: ["s", "z"],
      audioText: "Os piratas acharam um tesouro cheio de moedas de ouro.",
      hint: "Dica do S entre vogais: Entre 'e' e 'o', a letra S soa como Z!",
      ruleExplanation: "No meio da palavra entre vogais, escreve-se S com som de Z.",
      difficulty: 1
    },
    {
      id: "s_z_6",
      type: "fill_blank",
      sentence: "O atleta venceu a corrida com grande rapide_____.",
      fullWord: "rapidez",
      missingPart: "z",
      options: ["z", "s"],
      audioText: "O atleta venceu a corrida com grande rapidez.",
      hint: "Dica do -EZ: Vem da palavra 'rápido', terminando com Z!",
      ruleExplanation: "Substantivos abstratos terminados em -ez (como rapidez) usam Z!",
      difficulty: 3
    },
    {
      id: "s_z_7",
      type: "fill_blank",
      sentence: "Nossa ca_____a é aconchegante e cheia de amor.",
      fullWord: "casa",
      missingPart: "s",
      options: ["s", "z"],
      audioText: "Nossa casa é aconchegante e cheia de amor.",
      hint: "Dica do S entre vogais: Em 'casa', a letra S está entre 'a' e 'a'!",
      ruleExplanation: "A palavra 'casa' é grafada com S entre vogais.",
      difficulty: 1
    },
    {
      id: "s_z_8",
      type: "fill_blank",
      sentence: "A duque_____a vestia um lindo vestido na festa real.",
      fullWord: "duqueza",
      missingPart: "z",
      options: ["z", "s"],
      audioText: "A duqueza vestia um lindo vestido na festa real.",
      hint: "Dica dos Títulos: O título feminino 'duqueza' termina com -EZA com Z!",
      ruleExplanation: "Títulos com o sufixo nobre -eza são grafados com Z!",
      difficulty: 3
    },
    {
      id: "s_z_9",
      type: "fill_blank",
      sentence: "O motorista tocou a bu_____ina do carro.",
      fullWord: "buzina",
      missingPart: "z",
      options: ["z", "s"],
      audioText: "O motorista tocou a buzina do carro.",
      hint: "Dica da Letra Z: A palavra 'buzina' usa a letra Z original no meio!",
      ruleExplanation: "'Buzina' é escrita nativamente com a letra Z.",
      difficulty: 1
    },
    {
      id: "s_z_10",
      type: "fill_blank",
      sentence: "Gosto de colocar a_____eitona verde na minha salada.",
      fullWord: "azeitona",
      missingPart: "z",
      options: ["z", "s"],
      audioText: "Gosto de colocar azeitona verde na minha salada.",
      hint: "Dica da Letra Z: 'Azeitona' é escrita com Z!",
      ruleExplanation: "A palavra azeitona começa com az- e utiliza Z.",
      difficulty: 2
    },
    {
      id: "s_z_11",
      type: "fill_blank",
      sentence: "Devemos respeitar e cuidar da nossa nature_____a.",
      fullWord: "natureza",
      missingPart: "z",
      options: ["z", "s"],
      audioText: "Devemos respeitar e cuidar da nossa natureza.",
      hint: "Dica do -EZA: 'Natureza' termina com o sufixo -EZA, com Z!",
      ruleExplanation: "'Natureza' escreve-se com Z no final (-eza).",
      difficulty: 2
    },
    {
      id: "s_z_12",
      type: "fill_blank",
      sentence: "Coloquei as flores em um va_____o de cristal.",
      fullWord: "vaso",
      missingPart: "s",
      options: ["s", "z"],
      audioText: "Coloquei as flores em um vaso de cristal.",
      hint: "Dica do S entre vogais: O S entre 'a' e 'o' fica com som de Z!",
      ruleExplanation: "'Vaso' é escrito com a letra S entre vogais.",
      difficulty: 1
    },
    {
      id: "s_z_13",
      type: "fill_blank",
      sentence: "Nossa ami_____ade é muito especial e verdadeira.",
      fullWord: "amizade",
      missingPart: "z",
      options: ["z", "s"],
      audioText: "Nossa amizade é muito especial e verdadeira.",
      hint: "Dica da Letra Z: Vem de 'amigo' e ganha o sufixo formando 'amizade' com Z!",
      ruleExplanation: "A palavra 'amizade' é escrita com Z.",
      difficulty: 2
    },
    {
      id: "s_z_14",
      type: "fill_blank",
      sentence: "Ele veste uma cami_____a azul para ir à escola.",
      fullWord: "camisa",
      missingPart: "s",
      options: ["s", "z"],
      audioText: "Ele veste uma camisa azul para ir à escola.",
      hint: "Dica do S entre vogais: Entre 'i' e 'a', a letra S tem som de Z!",
      ruleExplanation: "'Camisa' é grafada com S entre vogais.",
      difficulty: 1
    },
    {
      id: "s_z_15",
      type: "fill_blank",
      sentence: "O rei possuía uma grande rique_____a no seu castelo.",
      fullWord: "riqueza",
      missingPart: "z",
      options: ["z", "s"],
      audioText: "O rei possuía uma grande riqueza no seu castelo.",
      hint: "Dica do -EZA: Vem de 'rico', formando 'riqueza' com Z!",
      ruleExplanation: "Substantivos derivados de adjetivos (rico -> riqueza) usam Z.",
      difficulty: 3
    },
    {
      id: "s_z_16",
      type: "fill_blank",
      sentence: "Fomos visitar os animais no _____oológico no domingo.",
      fullWord: "zoológico",
      missingPart: "z",
      options: ["z", "s"],
      audioText: "Fomos visitar os animais no zoológico no domingo.",
      hint: "Dica do Z Inicial: No começo da palavra 'zoológico', usamos a letra Z!",
      ruleExplanation: "Palavras que iniciam com som de Z usam a letra Z.",
      difficulty: 1
    }
  ],

  // =========================================================================
  // 3. USO DE M ANTES DE P E B E N ANTES DAS OUTRAS CONSOANTES
  // =========================================================================
  m_n: [
    {
      id: "m_n_1",
      type: "fill_blank",
      sentence: "As crianças jogam futebol no ca_____po da escola.",
      fullWord: "campo",
      missingPart: "m",
      options: ["m", "n"],
      audioText: "As crianças jogam futebol no campo da escola.",
      hint: "Regra do P e B: Antes da letra P, usamos sempre a letra M!",
      ruleExplanation: "Usamos M antes das consoantes P e B (caMpo).",
      difficulty: 1
    },
    {
      id: "m_n_2",
      type: "fill_blank",
      sentence: "Descansamos debaixo da so_____bra da grande árvore.",
      fullWord: "sombra",
      missingPart: "m",
      options: ["m", "n"],
      audioText: "Descansamos debaixo da sombra da grande árvore.",
      hint: "Regra do P e B: Antes da letra B, usamos a letra M!",
      ruleExplanation: "Usamos M antes das consoantes P e B (soMbra).",
      difficulty: 1
    },
    {
      id: "m_n_3",
      type: "fill_blank",
      sentence: "O menino escova o de_____te depois das refeições.",
      fullWord: "dente",
      missingPart: "n",
      options: ["n", "m"],
      audioText: "O menino escova o dente depois das refeições.",
      hint: "Regra Geral: A letra seguinte é T. Como não é P nem B, usamos N!",
      ruleExplanation: "Usamos N antes de qualquer consoante que não seja P ou B (deNte).",
      difficulty: 1
    },
    {
      id: "m_n_4",
      type: "fill_blank",
      sentence: "O bo_____beiro apagou o fogo com muita bravura.",
      fullWord: "bombeiro",
      missingPart: "m",
      options: ["m", "n"],
      audioText: "O bombeiro apagou o fogo com muita bravura.",
      hint: "Regra do P e B: Veja a consoante que vem depois! É o B, então usamos M!",
      ruleExplanation: "Antes de B usamos M (boMbeiro).",
      difficulty: 1
    },
    {
      id: "m_n_5",
      type: "fill_blank",
      sentence: "Acendi a lâ_____pada para iluminar o quarto escuro.",
      fullWord: "lâmpada",
      missingPart: "m",
      options: ["m", "n"],
      audioText: "Acendi a lâmpada para iluminar o quarto escuro.",
      hint: "Regra do P e B: Depois do espaço vem a letra P! Usamos a letra M!",
      ruleExplanation: "Antes da consoante P usamos M (lâMpada).",
      difficulty: 2
    },
    {
      id: "m_n_6",
      type: "fill_blank",
      sentence: "O ve_____to forte balançou as folhas dos coqueiros.",
      fullWord: "vento",
      missingPart: "n",
      options: ["n", "m"],
      audioText: "O vento forte balançou as folhas dos coqueiros.",
      hint: "Regra Geral: A letra seguinte é T. Como não é P nem B, usamos N!",
      ruleExplanation: "Antes de T usamos a letra N (veNto).",
      difficulty: 1
    },
    {
      id: "m_n_7",
      type: "fill_blank",
      sentence: "Lembre de colocar a ta_____pa no pote de doces.",
      fullWord: "tampa",
      missingPart: "m",
      options: ["m", "n"],
      audioText: "Lembre de colocar a tampa no pote de doces.",
      hint: "Regra do P e B: Antes da letra P usamos a letra M!",
      ruleExplanation: "Antes de P usamos M (taMpa).",
      difficulty: 1
    },
    {
      id: "m_n_8",
      type: "fill_blank",
      sentence: "Regamos a pla_____ta do jardim todas as manhãs.",
      fullWord: "planta",
      missingPart: "n",
      options: ["n", "m"],
      audioText: "Regamos a planta do jardim todas as manhãs.",
      hint: "Regra Geral: Depois vem a letra T, por isso usamos a letra N!",
      ruleExplanation: "Usamos N antes da consoante T (plaNta).",
      difficulty: 1
    },
    {
      id: "m_n_9",
      type: "fill_blank",
      sentence: "O elefante usou sua tro_____ba para pegar água.",
      fullWord: "tromba",
      missingPart: "m",
      options: ["m", "n"],
      audioText: "O elefante usou sua tromba para pegar água.",
      hint: "Regra do P e B: A letra seguinte é B! Então a resposta é M!",
      ruleExplanation: "Antes da letra B usa-se M (troMba).",
      difficulty: 2
    },
    {
      id: "m_n_10",
      type: "fill_blank",
      sentence: "Atravessamos a po_____te para chegar ao parque.",
      fullWord: "ponte",
      missingPart: "n",
      options: ["n", "m"],
      audioText: "Atravessamos a ponte para chegar ao parque.",
      hint: "Regra Geral: A consoante é T. Usamos N antes de T!",
      ruleExplanation: "Usamos N antes de consoantes que não são P ou B (poNte).",
      difficulty: 1
    },
    {
      id: "m_n_11",
      type: "fill_blank",
      sentence: "Papai prendeu as calças usando um ci_____to de couro.",
      fullWord: "cinto",
      missingPart: "n",
      options: ["n", "m"],
      audioText: "Papai prendeu as calças usando um cinto de couro.",
      hint: "Regra Geral: Depois do espaço vem o T, logo usamos a letra N!",
      ruleExplanation: "Antes de T usamos N (ciNto).",
      difficulty: 2
    },
    {
      id: "m_n_12",
      type: "fill_blank",
      sentence: "Hoje o te_____po está ensolarado e ótimo para brincar.",
      fullWord: "tempo",
      missingPart: "m",
      options: ["m", "n"],
      audioText: "Hoje o tempo está ensolarado e ótimo para brincar.",
      hint: "Regra do P e B: Repare no P depois da lacuna! Usamos M!",
      ruleExplanation: "Antes de P usamos a letra M (teMpo).",
      difficulty: 2
    },
    {
      id: "m_n_13",
      type: "fill_blank",
      sentence: "Subimos no topo da mo_____tanha para ver o pôr do sol.",
      fullWord: "montanha",
      missingPart: "n",
      options: ["n", "m"],
      audioText: "Subimos no topo da montanha para ver o pôr do sol.",
      hint: "Regra Geral: A letra seguinte é T, então colocamos N!",
      ruleExplanation: "Usamos N antes de T (moNtanha).",
      difficulty: 2
    },
    {
      id: "m_n_14",
      type: "fill_blank",
      sentence: "Tocamos a ca_____painha para anunciar nossa chegada.",
      fullWord: "campainha",
      missingPart: "m",
      options: ["m", "n"],
      audioText: "Tocamos a campainha para anunciar nossa chegada.",
      hint: "Regra do P e B: Antes da letra P usa-se a letra M!",
      ruleExplanation: "Antes de P usa-se sempre M (caMpainha).",
      difficulty: 2
    },
    {
      id: "m_n_15",
      type: "fill_blank",
      sentence: "A turma dançou ao ritmo do sa_____ba animado.",
      fullWord: "samba",
      missingPart: "m",
      options: ["m", "n"],
      audioText: "A turma dançou ao ritmo do samba animado.",
      hint: "Regra do P e B: Antes do B vem sempre a letra M!",
      ruleExplanation: "Antes de B escreve-se M (saMba).",
      difficulty: 2
    },
    {
      id: "m_n_16",
      type: "fill_blank",
      sentence: "Um lindo passarinho pousou no ca_____to da janela.",
      fullWord: "canto",
      missingPart: "n",
      options: ["n", "m"],
      audioText: "Um lindo passarinho pousou no canto da janela.",
      hint: "Regra Geral: A consoante T exige o uso da letra N!",
      ruleExplanation: "Antes da consoante T usamos N (caNto).",
      difficulty: 3
    }
  ],

  // =========================================================================
  // 4. CH OU X
  // =========================================================================
  ch_x: [
    {
      id: "ch_x_1",
      type: "fill_blank",
      sentence: "A vovó serve o café numa _____ícara de porcelana.",
      fullWord: "xícara",
      missingPart: "x",
      options: ["x", "ch"],
      audioText: "A vovó serve o café numa xícara de porcelana.",
      hint: "Dica do X: A palavra 'xícara' começa com a letra X!",
      ruleExplanation: "'Xícara' é escrita com a letra X inicial.",
      difficulty: 1
    },
    {
      id: "ch_x_2",
      type: "fill_blank",
      sentence: "Tomei um copo de _____á bem quentinho antes de dormir.",
      fullWord: "chá",
      missingPart: "ch",
      options: ["ch", "x"],
      audioText: "Tomei um copo de chá bem quentinho antes de dormir.",
      hint: "Dica do CH: A palavra 'chá' começa com a família do CH!",
      ruleExplanation: "A bebida 'chá' é escrita com CH.",
      difficulty: 1
    },
    {
      id: "ch_x_3",
      type: "fill_blank",
      sentence: "Devemos jogar o _____o sempre dentro da lixeira.",
      fullWord: "lixo",
      missingPart: "x",
      options: ["x", "ch"],
      audioText: "Devemos jogar o lixo sempre dentro da lixeira.",
      hint: "Dica do X: A palavra 'lixo' é escrita com X!",
      ruleExplanation: "A palavra 'lixo' tem a grafia correta com X.",
      difficulty: 1
    },
    {
      id: "ch_x_4",
      type: "fill_blank",
      sentence: "Adoro comer um pedaço de _____ocolate na sobremesa.",
      fullWord: "chocolate",
      missingPart: "ch",
      options: ["ch", "x"],
      audioText: "Adoro comer um pedaço de chocolate na sobremesa.",
      hint: "Dica do CH: 'Chocolate' começa com a combinação CH!",
      ruleExplanation: "Chocolate é grafado com CH no início.",
      difficulty: 1
    },
    {
      id: "ch_x_5",
      type: "fill_blank",
      sentence: "O colorido pei_____e nada alegremente no aquário.",
      fullWord: "peixe",
      missingPart: "x",
      options: ["x", "ch"],
      audioText: "O colorido peixe nada alegremente no aquário.",
      hint: "Dica do Ditongo: Depois de ditongo (ei), geralmente usamos X! (pei-xe)",
      ruleExplanation: "Após o ditongo 'ei', emprega-se a letra X.",
      difficulty: 1
    },
    {
      id: "ch_x_6",
      type: "fill_blank",
      sentence: "A forte _____uva molhou toda a rua pela manhã.",
      fullWord: "chuva",
      missingPart: "ch",
      options: ["ch", "x"],
      audioText: "A forte chuva molhou toda a rua pela manhã.",
      hint: "Dica do CH: 'Chuva' e 'chuveiro' começam com CH!",
      ruleExplanation: "'Chuva' é escrita com CH no início.",
      difficulty: 1
    },
    {
      id: "ch_x_7",
      type: "fill_blank",
      sentence: "Guardei meus brinquedos em uma cai_____a de papelão.",
      fullWord: "caixa",
      missingPart: "x",
      options: ["x", "ch"],
      audioText: "Guardei meus brinquedos em uma caixa de papelão.",
      hint: "Dica do Ditongo: Depois do ditongo 'ai', usamos a letra X! (cai-xa)",
      ruleExplanation: "Escreve-se X após o ditongo 'ai'.",
      difficulty: 1
    },
    {
      id: "ch_x_8",
      type: "fill_blank",
      sentence: "Coloquei os cadernos dentro da minha mo_____ila escolar.",
      fullWord: "mochila",
      missingPart: "ch",
      options: ["ch", "x"],
      audioText: "Coloquei os cadernos dentro da minha mochila escolar.",
      hint: "Dica do CH: A palavra 'mochila' usa o som do CH!",
      ruleExplanation: "'Mochila' é escrita com CH na segunda sílaba.",
      difficulty: 1
    },
    {
      id: "ch_x_9",
      type: "fill_blank",
      sentence: "O mágico tirou um coelho de dentro do seu _____apéu.",
      fullWord: "chapéu",
      missingPart: "ch",
      options: ["ch", "x"],
      audioText: "O mágico tirou um coelho de dentro do seu chapéu.",
      hint: "Dica do CH: 'Chapéu' começa com a letra C seguida de H!",
      ruleExplanation: "'Chapéu' escreve-se com CH.",
      difficulty: 2
    },
    {
      id: "ch_x_10",
      type: "fill_blank",
      sentence: "Comprei um saboroso abaca_____i no hortifrúti.",
      fullWord: "abacaxi",
      missingPart: "x",
      options: ["x", "ch"],
      audioText: "Comprei um saboroso abacaxi no hortifrúti.",
      hint: "Dica do X: A palavra 'abacaxi' termina com a letra X!",
      ruleExplanation: "'Abacaxi' é escrito com X no final da palavra.",
      difficulty: 2
    },
    {
      id: "ch_x_11",
      type: "fill_blank",
      sentence: "Preciso da _____ave certa para abrir o portão.",
      fullWord: "chave",
      missingPart: "ch",
      options: ["ch", "x"],
      audioText: "Preciso da chave certa para abrir o portão.",
      hint: "Dica do CH: 'Chave' e 'chaveiro' começam com CH!",
      ruleExplanation: "A palavra 'chave' é grafada com CH.",
      difficulty: 2
    },
    {
      id: "ch_x_12",
      type: "fill_blank",
      sentence: "A fumaça saía suavemente pela _____aminé da casa.",
      fullWord: "chaminé",
      missingPart: "ch",
      options: ["ch", "x"],
      audioText: "A fumaça saía suavemente pela chaminé da casa.",
      hint: "Dica do CH: 'Chaminé' é escrita com a dupla CH!",
      ruleExplanation: "'Chaminé' usa o dígrafo CH.",
      difficulty: 3
    },
    {
      id: "ch_x_13",
      type: "fill_blank",
      sentence: "A vovó cobriu os ombros com um macio _____ale de lã.",
      fullWord: "xale",
      missingPart: "x",
      options: ["x", "ch"],
      audioText: "A vovó cobriu os ombros com um macio xale de lã.",
      hint: "Dica do X: 'Xale' começa com a letra X!",
      ruleExplanation: "'Xale' é grafado com X inicial.",
      difficulty: 3
    },
    {
      id: "ch_x_14",
      type: "fill_blank",
      sentence: "Ela pintou o desenho usando o lápis da cor ro_____o.",
      fullWord: "roxo",
      missingPart: "x",
      options: ["x", "ch"],
      audioText: "Ela pintou o desenho usando o lápis da cor roxo.",
      hint: "Dica do X: A cor 'roxo' usa a letra X!",
      ruleExplanation: "A cor 'roxo' escreve-se com X.",
      difficulty: 2
    }
  ],

  // =========================================================================
  // 5. G OU J
  // =========================================================================
  g_j: [
    {
      id: "g_j_1",
      type: "fill_blank",
      sentence: "A _____irafa tem um pescoço bem comprido para comer folhas altas.",
      fullWord: "girafa",
      missingPart: "g",
      options: ["g", "j"],
      audioText: "A girafa tem um pescoço bem comprido para comer folhas altas.",
      hint: "Dica do G: 'Girafa' se escreve com G antes do I!",
      ruleExplanation: "A palavra 'girafa' começa com a letra G.",
      difficulty: 1
    },
    {
      id: "g_j_2",
      type: "fill_blank",
      sentence: "O _____acaré estava descansando nas margens do lago.",
      fullWord: "jacaré",
      missingPart: "j",
      options: ["j", "g"],
      audioText: "O jacaré estava descansando nas margens do lago.",
      hint: "Dica do J: 'Jacaré' começa com a letra J!",
      ruleExplanation: "A palavra 'jacaré' usa J no início.",
      difficulty: 1
    },
    {
      id: "g_j_3",
      type: "fill_blank",
      sentence: "Coloquei uma pedra de _____elo para esfriar o suco.",
      fullWord: "gelo",
      missingPart: "g",
      options: ["g", "j"],
      audioText: "Coloquei uma pedra de gelo para esfriar o suco.",
      hint: "Dica do G: 'Gelo' e 'geladeira' começam com G!",
      ruleExplanation: "'Gelo' é escrito com a letra G.",
      difficulty: 1
    },
    {
      id: "g_j_4",
      type: "fill_blank",
      sentence: "A cobra _____iboia deslizou silenciosamente sobre as folhas.",
      fullWord: "jiboia",
      missingPart: "j",
      options: ["j", "g"],
      audioText: "A cobra jiboia deslizou silenciosamente sobre as folhas.",
      hint: "Dica do J: Palavras de origem indígena como 'jiboia' usam J!",
      ruleExplanation: "'Jiboia' escreve-se com J.",
      difficulty: 2
    },
    {
      id: "g_j_5",
      type: "fill_blank",
      sentence: "O _____ágico fez o coelho desaparecer da cartola!",
      fullWord: "mágico",
      missingPart: "g",
      options: ["g", "j"],
      audioText: "O mágico fez o coelho desaparecer da cartola!",
      hint: "Dica do G: 'Mágico' vem de magia, que se escreve com G!",
      ruleExplanation: "'Mágico' usa a letra G na sílaba -gi-.",
      difficulty: 1
    },
    {
      id: "g_j_6",
      type: "fill_blank",
      sentence: "Olhei no reló_____io para saber a hora da aula de artes.",
      fullWord: "relógio",
      missingPart: "g",
      options: ["g", "j"],
      audioText: "Olhei no relógio para saber a hora da aula de artes.",
      hint: "Dica do G: A terminação -ógio (relógio) usa a letra G!",
      ruleExplanation: "Terminações em -ágio, -égio, -ógio usam G.",
      difficulty: 2
    },
    {
      id: "g_j_7",
      type: "fill_blank",
      sentence: "Plantei uma linda flor amarela no _____arrinho da varanda.",
      fullWord: "jarrinho",
      missingPart: "j",
      options: ["j", "g"],
      audioText: "Plantei uma linda flor amarela no jarrinho da varanda.",
      hint: "Dica do J: Vem da palavra 'jarra', que se escreve com J!",
      ruleExplanation: "Derivados de palavras com J mantêm a letra J (jarra -> jarrinho).",
      difficulty: 2
    },
    {
      id: "g_j_8",
      type: "fill_blank",
      sentence: "O pedreiro usou o ti_____olo vermelho na construção.",
      fullWord: "tijolo",
      missingPart: "j",
      options: ["j", "g"],
      audioText: "O pedreiro usou o tijolo vermelho na construção.",
      hint: "Dica do J: 'Tijolo' tem a letra J no meio!",
      ruleExplanation: "A palavra 'tijolo' é grafada com J.",
      difficulty: 2
    },
    {
      id: "g_j_9",
      type: "fill_blank",
      sentence: "Abertura da _____anela deixa o vento fresco entrar.",
      fullWord: "janela",
      missingPart: "j",
      options: ["j", "g"],
      audioText: "Abertura da janela deixa o vento fresco entrar.",
      hint: "Dica do J: 'Janela' e 'janelinha' começam com J!",
      ruleExplanation: "'Janela' escreve-se com J.",
      difficulty: 1
    },
    {
      id: "g_j_10",
      type: "fill_blank",
      sentence: "Virei a pá_____ina do livro para continuar a leitura.",
      fullWord: "página",
      missingPart: "g",
      options: ["g", "j"],
      audioText: "Virei a página do livro para continuar a leitura.",
      hint: "Dica do G: 'Página' é escrita com a letra G!",
      ruleExplanation: "'Página' usa G na sílaba -gi-.",
      difficulty: 2
    },
    {
      id: "g_j_11",
      type: "fill_blank",
      sentence: "A coru_____a pia durante a noite no alto da árvore.",
      fullWord: "coruja",
      missingPart: "j",
      options: ["j", "g"],
      audioText: "A coruja pia durante a noite no alto da árvore.",
      hint: "Dica do J: 'Coruja' termina com a sílaba -ja, com J!",
      ruleExplanation: "'Coruja' é escrita com J.",
      difficulty: 2
    },
    {
      id: "g_j_12",
      type: "fill_blank",
      sentence: "Suco de laran_____a feito na hora é delicioso.",
      fullWord: "laranja",
      missingPart: "j",
      options: ["j", "g"],
      audioText: "Suco de laranja feito na hora é delicioso.",
      hint: "Dica do J: 'Laranja' e 'laranjeira' usam a letra J!",
      ruleExplanation: "Palavras terminadas em -ja usam a letra J.",
      difficulty: 1
    },
    {
      id: "g_j_13",
      type: "fill_blank",
      sentence: "O _____igante da história subia até o topo das nuvens.",
      fullWord: "gigante",
      missingPart: "g",
      options: ["g", "j"],
      audioText: "O gigante da história subia até o topo das nuvens.",
      hint: "Dica do G: 'Gigante' começa com G na primeira sílaba!",
      ruleExplanation: "'Gigante' é escrito com G inicial.",
      difficulty: 3
    },
    {
      id: "g_j_14",
      type: "fill_blank",
      sentence: "Coloquei a sopa bem quente dentro de uma ti_____ela.",
      fullWord: "tigela",
      missingPart: "g",
      options: ["g", "j"],
      audioText: "Coloquei a sopa bem quente dentro de uma tigela.",
      hint: "Dica do G: 'Tigela' escreve-se com G!",
      ruleExplanation: "'Tigela' é grafada com G.",
      difficulty: 3
    }
  ],

  // =========================================================================
  // 6. GRAFIA COM S, SS, C OU Ç
  // =========================================================================
  s_ss_c_ç: [
    {
      id: "s_ss_c_ç_1",
      type: "fill_blank",
      sentence: "A minha fruta favorita no lanche é a ma_____ã vermelha.",
      fullWord: "maçã",
      missingPart: "ç",
      options: ["ç", "c", "ss", "s"],
      audioText: "A minha fruta favorita no lanche é a maçã vermelha.",
      hint: "Dica do Ç: Usa-se Ç antes de A, O, U para ter som de S! Nenhuma palavra começa com Ç.",
      ruleExplanation: "A letra Ç é usada antes de A, O, U para som de S.",
      difficulty: 1
    },
    {
      id: "s_ss_c_ç_2",
      type: "fill_blank",
      sentence: "O garoto sentiu o cora_____ão bater mais forte de emoção.",
      fullWord: "coração",
      missingPart: "ç",
      options: ["ç", "c", "ss", "s"],
      audioText: "O garoto sentiu o coração bater mais forte de emoção.",
      hint: "Dica do Ç: Em '-ção', usamos sempre a letra Ç!",
      ruleExplanation: "Substantivos terminados em -ção usam Ç.",
      difficulty: 1
    },
    {
      id: "s_ss_c_ç_3",
      type: "fill_blank",
      sentence: "A vovó preparou um do_____e caseiro delicioso de sobremesa.",
      fullWord: "doce",
      missingPart: "c",
      options: ["c", "ç", "ss", "s"],
      audioText: "A vovó preparou um doce caseiro delicioso de sobremesa.",
      hint: "Dica do C: Antes de E e I, a letra C tem som de S sem precisarmos de cedilha!",
      ruleExplanation: "Usamos C antes de E ou I (não existe Ç antes de E ou I).",
      difficulty: 1
    },
    {
      id: "s_ss_c_ç_4",
      type: "fill_blank",
      sentence: "Um fofo pas_____arinho pousou no galho da árvore.",
      fullWord: "passarinho",
      missingPart: "ss",
      options: ["ss", "s", "ç", "c"],
      audioText: "Um fofo passarinho pousou no galho da árvore.",
      hint: "Dica do SS: Para ter som de S forte entre duas vogais, usamos SS!",
      ruleExplanation: "Usamos SS entre vogais para manter o som forte de S.",
      difficulty: 1
    },
    {
      id: "s_ss_c_ç_5",
      type: "fill_blank",
      sentence: "Calcei o meu _____apato para ir jogar bola no parque.",
      fullWord: "sapato",
      missingPart: "s",
      options: ["s", "ss", "c", "ç"],
      audioText: "Calcei o meu sapato para ir jogar bola no parque.",
      hint: "Dica do S Inicial: No começo das palavras, usamos apenas 1 S! Nenhuma palavra começa com SS ou Ç.",
      ruleExplanation: "Início de palavra com som de S usa-se apenas um S.",
      difficulty: 1
    },
    {
      id: "s_ss_c_ç_6",
      type: "fill_blank",
      sentence: "O cachorrinho enterrou o o_____o no quintal da casa.",
      fullWord: "osso",
      missingPart: "ss",
      options: ["ss", "s", "c", "ç"],
      audioText: "O cachorrinho enterrou o osso no quintal da casa.",
      hint: "Dica do SS: Entre o 'o' e o 'o', usamos SS para o som ficar forte!",
      ruleExplanation: "Usamos SS entre duas vogais.",
      difficulty: 1
    },
    {
      id: "s_ss_c_ç_7",
      type: "fill_blank",
      sentence: "O médico aplicou a va_____ina para proteger a criança.",
      fullWord: "vacina",
      missingPart: "c",
      options: ["c", "ç", "ss", "s"],
      audioText: "O médico aplicou a vacina para proteger a criança.",
      hint: "Dica do C: Antes da vogal I, a letra C tem som de S!",
      ruleExplanation: "Antes da vogal I, a letra C soa como S.",
      difficulty: 2
    },
    {
      id: "s_ss_c_ç_8",
      type: "fill_blank",
      sentence: "Fomos ao _____irco ver o show de mágicas e malabares.",
      fullWord: "circo",
      missingPart: "c",
      options: ["c", "s", "ss", "ç"],
      audioText: "Fomos ao circo ver o show de mágicas e malabares.",
      hint: "Dica do C Inicial: No início da palavra 'circo', a letra C antes do I tem som de S!",
      ruleExplanation: "Usamos C no início de palavras antes de I.",
      difficulty: 2
    },
    {
      id: "s_ss_c_ç_9",
      type: "fill_blank",
      sentence: "O fofo coelho adora roer uma _____enoura fresca.",
      fullWord: "cenoura",
      missingPart: "c",
      options: ["c", "s", "ss", "ç"],
      audioText: "O fofo coelho adora roer uma cenoura fresca.",
      hint: "Dica do C: Antes do E, a letra C tem som de S!",
      ruleExplanation: "Antes da vogal E, usa-se C.",
      difficulty: 1
    },
    {
      id: "s_ss_c_ç_10",
      type: "fill_blank",
      sentence: "Fizemos um agradável pas_____eio no parque no domingo.",
      fullWord: "passeio",
      missingPart: "ss",
      options: ["ss", "s", "ç", "c"],
      audioText: "Fizemos um agradável passeio no parque no domingo.",
      hint: "Dica do SS: Para som forte de S entre vogais (a...e), usamos SS!",
      ruleExplanation: "A palavra 'passeio' é escrita com SS entre vogais.",
      difficulty: 2
    },
    {
      id: "s_ss_c_ç_11",
      type: "fill_blank",
      sentence: "A menina amarrou uma fita de la_____o na cabeça.",
      fullWord: "laço",
      missingPart: "ç",
      options: ["ç", "c", "ss", "s"],
      audioText: "A menina amarrou uma fita de laço na cabeça.",
      hint: "Dica do Ç: Antes da letra O, usamos Ç para ter som de S!",
      ruleExplanation: "Usamos Ç antes de O (laço).",
      difficulty: 2
    },
    {
      id: "s_ss_c_ç_12",
      type: "fill_blank",
      sentence: "O palha_____o fez todo mundo rir com suas trapalhadas.",
      fullWord: "palhaço",
      missingPart: "ç",
      options: ["ç", "c", "ss", "s"],
      audioText: "O palhaço fez todo mundo rir com suas trapalhadas.",
      hint: "Dica do Ç: 'Palhaço' é escrito com Ç antes da letra O!",
      ruleExplanation: "Usamos Ç antes de O (palhaço).",
      difficulty: 2
    },
    {
      id: "s_ss_c_ç_13",
      type: "fill_blank",
      sentence: "Tomamos uma _____opa bem quente no dia frio de inverno.",
      fullWord: "sopa",
      missingPart: "s",
      options: ["s", "ss", "c", "ç"],
      audioText: "Tomamos uma sopa bem quente no dia frio de inverno.",
      hint: "Dica do S Inicial: No começo da palavra usamos S simples!",
      ruleExplanation: "Início de palavra com som de S usa um único S.",
      difficulty: 1
    },
    {
      id: "s_ss_c_ç_14",
      type: "fill_blank",
      sentence: "Coloquei as cal_____as de algodão na gaveta de roupas.",
      fullWord: "calça",
      missingPart: "ç",
      options: ["ç", "c", "ss", "s"],
      audioText: "Coloquei as calças de algodão na gaveta de roupas.",
      hint: "Dica do Ç: 'Calça' usa a letra Ç antes do A!",
      ruleExplanation: "Usamos Ç antes de A (calça).",
      difficulty: 2
    },
    {
      id: "s_ss_c_ç_15",
      type: "fill_blank",
      sentence: "Na lenda do mar, a _____ereia cantava para os navegantes.",
      fullWord: "sereia",
      missingPart: "s",
      options: ["s", "ss", "c", "ç"],
      audioText: "Na lenda do mar a sereia cantava para os navegantes.",
      hint: "Dica do S Inicial: No começo de 'sereia' usamos a letra S!",
      ruleExplanation: "No início da palavra usamos S.",
      difficulty: 2
    }
  ]
};

// Suporte para ambientes de navegação (script tag) e módulos (ESM / CommonJS)
if (typeof window !== 'undefined') {
  window.WORD_BANK = WORD_BANK;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WORD_BANK;
}

export default WORD_BANK;

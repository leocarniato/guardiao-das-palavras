/**
 * Base de Dados Completa de Perguntas Ortográficas (91 Exercícios)
 * Alinhado à BNCC 3º Ano do Ensino Fundamental
 */

export const CATEGORIES = [
  {
    "id": "ao_am",
    "title": "⚽ Futebol (-ÃO ou -AM?)",
    "subtitle": "Passado (-am) vs Futuro (-ão)",
    "icon": "⚽",
    "color": "#10B981",
    "bgGradient": "linear-gradient(135deg, #059669 0%, #10B981 100%)",
    "description": "Partida de Futebol! Marque um golaço no passado (-AM) ou no futuro (-ÃO)!"
  },
  {
    "id": "som_z",
    "title": "🕷️ Teia do Teioso (S ou Z?)",
    "subtitle": "Homem-Aranha & Som de Z",
    "icon": "🕷️",
    "color": "#EF4444",
    "bgGradient": "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
    "description": "Lance a teia do Aranha Gamer e descubra se o som de Z é com S ou Z!"
  },
  {
    "id": "m_pb",
    "title": "🤖 Mundo Roblox (M antes de P e B)",
    "subtitle": "Construção de Blocos",
    "icon": "🤖",
    "color": "#0EA5E9",
    "bgGradient": "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
    "description": "Regra Pro do Roblox: Coloque o bloco M antes do P e do B!"
  },
  {
    "id": "ch_x",
    "title": "🍌 Desafio Minion (CH ou X?)",
    "subtitle": "Banana Power & Mistérios",
    "icon": "🍌",
    "color": "#F59E0B",
    "bgGradient": "linear-gradient(135deg, #D97706 0%, #FBBF24 100%)",
    "description": "Bananahaha! Ajude os Minions a escolher CH ou X!"
  },
  {
    "id": "g_j",
    "title": "🎮 Arena Gamer (G ou J?)",
    "subtitle": "Batalha dos Games",
    "icon": "🎮",
    "color": "#8B5CF6",
    "bgGradient": "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
    "description": "Level Up! Derrote o Chefão escolhendo a letra G ou J!"
  },
  {
    "id": "s_ss_c_cedilha",
    "title": "🏎️ Pista Veloz (S, SS, C ou Ç?)",
    "subtitle": "Corrida de Fórmula 1",
    "icon": "🏎️",
    "color": "#EC4899",
    "bgGradient": "linear-gradient(135deg, #DB2777 0%, #F472B6 100%)",
    "description": "Acelere fundo para vencer a corrida do som de S!"
  },
  {
    "id": "acento_grafico",
    "title": "🦇 Gotham da Noite (Com Acento ou Sem Acento?)",
    "subtitle": "Batman & Acentuação Mágica",
    "icon": "🦇",
    "color": "#F59E0B",
    "bgGradient": "linear-gradient(135deg, #1E293B 0%, #334155 50%, #D97706 100%)",
    "description": "Ajude o Batman a ilumina Gotham escolhendo se a palavra tem acento ou não!"
  }
];

export const QUESTIONS_DATA = {
  "ao_am": [
    {
      "id": "ao_am_1",
      "sentence": "Ontem, os passarinhos _____ muito no jardim.",
      "word": "cantaram",
      "options": [
        "AM",
        "ÃO"
      ],
      "correct": 0,
      "audioText": "Ontem os passarinhos cantaram muito no jardim.",
      "explanation": "Dica do Tempo: 'Ontem' indica passado! Verbos no passado terminam com -AM. Usamos -AM para ações que já aconteceram (passado)!"
    },
    {
      "id": "ao_am_2",
      "sentence": "Amanhã, os alunos _____ para o museu da cidade.",
      "word": "viajarão",
      "options": [
        "ÃO",
        "AM"
      ],
      "correct": 0,
      "audioText": "Amanhã os alunos viajarão para o museu da cidade.",
      "explanation": "Dica do Tempo: 'Amanhã' indica futuro! Verbos no futuro terminam com -ÃO. Usamos -ÃO para ações que ainda vão acontecer (futuro)!"
    },
    {
      "id": "ao_am_3",
      "sentence": "O vovô comprou um _____ quentinho na padaria.",
      "word": "pão",
      "options": [
        "ÃO",
        "AM"
      ],
      "correct": 0,
      "audioText": "O vovô comprou um pão quentinho na padaria.",
      "explanation": "Dica do Nome: 'Pão' é o nome de um alimento (substantivo)! Termina com -ÃO. Substantivos (nomes de coisas ou alimentos) como 'pão' terminam com -ÃO!"
    },
    {
      "id": "ao_am_4",
      "sentence": "No almoço, comemos arroz com _____ saboroso.",
      "word": "feijão",
      "options": [
        "ÃO",
        "AM"
      ],
      "correct": 0,
      "audioText": "No almoço comemos arroz com feijão saboroso.",
      "explanation": "Dica do Nome: 'Feijão' é um substantivo e termina com -ÃO. Substantivos (nomes de alimentos) terminam com -ÃO!"
    },
    {
      "id": "ao_am_5",
      "sentence": "Semana passada, as crianças _____ bastante no parque.",
      "word": "brincaram",
      "options": [
        "AM",
        "ÃO"
      ],
      "correct": 0,
      "audioText": "Semana passada as crianças brincaram bastante no parque.",
      "explanation": "Dica do Tempo: 'Semana passada' já aconteceu! Verbos no passado terminam com -AM. Ações que já aconteceram no passado levam a terminação -AM!"
    },
    {
      "id": "ao_am_6",
      "sentence": "No próximo domingo, meus tios _____ em nossa casa.",
      "word": "almoçarão",
      "options": [
        "ÃO",
        "AM"
      ],
      "correct": 0,
      "audioText": "No próximo domingo meus tios almoçarão em nossa casa.",
      "explanation": "Dica do Tempo: 'Próximo domingo' é futuro! Verbos no futuro terminam com -ÃO. Ações que vão acontecer no futuro terminam com -ÃO!"
    },
    {
      "id": "ao_am_7",
      "sentence": "Ontem à noite, eles _____ um filme muito divertido.",
      "word": "assistiram",
      "options": [
        "AM",
        "ÃO"
      ],
      "correct": 0,
      "audioText": "Ontem à noite eles assistiram um filme muito divertido.",
      "explanation": "Dica do Tempo: 'Ontem à noite' já passou! Verbos no passado terminam com -AM. Ações passadas no plural terminam com -AM!"
    },
    {
      "id": "ao_am_8",
      "sentence": "O menino soltou a linha do seu _____ colorido.",
      "word": "balão",
      "options": [
        "ÃO",
        "AM"
      ],
      "correct": 0,
      "audioText": "O menino soltou a linha do seu balão colorido.",
      "explanation": "Dica do Nome: 'Balão' é o nome de um brinquedo/objeto, então termina com -ÃO. Nomes de objetos (substantivos) terminam com -ÃO!"
    },
    {
      "id": "ao_am_9",
      "sentence": "Os atletas _____ muito rápido na corrida de ontem.",
      "word": "correram",
      "options": [
        "AM",
        "ÃO"
      ],
      "correct": 0,
      "audioText": "Os atletas correram muito rápido na corrida de ontem.",
      "explanation": "Dica do Tempo: 'De ontem' mostra passado! Verbos no passado terminam com -AM. Verbos no passado levam a terminação -AM!"
    },
    {
      "id": "ao_am_10",
      "sentence": "Ano que vem, os estudantes _____ para o quarto ano.",
      "word": "passarão",
      "options": [
        "ÃO",
        "AM"
      ],
      "correct": 0,
      "audioText": "Ano que vem os estudantes passarão para o quarto ano.",
      "explanation": "Dica do Tempo: 'Ano que vem' indica futuro! Verbos no futuro terminam com -ÃO. Verbos no futuro recebem a terminação -ÃO!"
    },
    {
      "id": "ao_am_11",
      "sentence": "Na festa de ontem, todos _____ parabéns com alegria.",
      "word": "cantaram",
      "options": [
        "AM",
        "ÃO"
      ],
      "correct": 0,
      "audioText": "Na festa de ontem todos cantaram parabéns com alegria.",
      "explanation": "Dica do Tempo: 'Ontem' é passado! Verbos no passado terminam com -AM. Ações já concluídas terminam em -AM!"
    },
    {
      "id": "ao_am_12",
      "sentence": "O _____ é o rei da selva e tem uma linda juba.",
      "word": "leão",
      "options": [
        "ÃO",
        "AM"
      ],
      "correct": 0,
      "audioText": "O leão é o rei da selva e tem uma linda juba.",
      "explanation": "Dica do Nome: 'Leão' é o nome do animal, por isso termina com -ÃO. Nomes de animais (substantivos) usam a terminação -ÃO!"
    },
    {
      "id": "ao_am_13",
      "sentence": "Quando as aulas voltarem, os professores _____ livros novos.",
      "word": "trarão",
      "options": [
        "ÃO",
        "AM"
      ],
      "correct": 0,
      "audioText": "Quando as aulas voltarem os professores trarão livros novos.",
      "explanation": "Dica do Tempo: 'Quando voltarem' indica um evento futuro! Usamos -ÃO. Ações futuras com eles ou elas terminam com -ÃO!"
    },
    {
      "id": "ao_am_14",
      "sentence": "Os cachorros _____ bastante durante a noite passada.",
      "word": "latiram",
      "options": [
        "AM",
        "ÃO"
      ],
      "correct": 0,
      "audioText": "Os cachorros latiram bastante durante a noite passada.",
      "explanation": "Dica do Tempo: 'Noite passada' indica passado! Verbos no passado terminam com -AM. Usamos -AM para ações no passado!"
    },
    {
      "id": "ao_am_15",
      "sentence": "Na próxima semana, os astrônomos _____ as estrelas.",
      "word": "estudarão",
      "options": [
        "ÃO",
        "AM"
      ],
      "correct": 0,
      "audioText": "Na próxima semana os astrônomos estudarão as estrelas.",
      "explanation": "Dica do Tempo: 'Próxima semana' indica futuro! Usamos -ÃO. Usamos -ÃO para ações no futuro!"
    },
    {
      "id": "ao_am_16",
      "sentence": "Lavei minhas mãos com água e _____ cheiroso.",
      "word": "sabão",
      "options": [
        "ÃO",
        "AM"
      ],
      "correct": 0,
      "audioText": "Lavei minhas mãos com água e sabão cheiroso.",
      "explanation": "Dica do Nome: 'Sabão' é o nome de um produto de higiene! Termina com -ÃO. Nomes de objetos ou produtos (substantivos) usam -ÃO!"
    }
  ],
  "som_z": [
    {
      "id": "s_z_1",
      "sentence": "A me_____a da sala é feita de madeira boa.",
      "word": "mesa",
      "options": [
        "S",
        "Z"
      ],
      "correct": 0,
      "audioText": "A mesa da sala é feita de madeira boa.",
      "explanation": "Dica do S com som de Z: Entre duas vogais (e...a), a letra S tem som de Z! A letra S entre duas vogais soa como Z, como em 'mesa'."
    },
    {
      "id": "s_z_2",
      "sentence": "A princesa admirou a bele_____a do jardim florido.",
      "word": "beleza",
      "options": [
        "Z",
        "S"
      ],
      "correct": 0,
      "audioText": "A princesa admirou a beleza do jardim florido.",
      "explanation": "Dica do -EZA: Palavras que vêm de qualidades (belo -> beleza) terminam com Z! Substantivos derivados com o sufixo -eza são escritos com Z!"
    },
    {
      "id": "s_z_3",
      "sentence": "A vovó cultivou uma ro_____a cheirosa no vaso.",
      "word": "rosa",
      "options": [
        "S",
        "Z"
      ],
      "correct": 0,
      "audioText": "A vovó cultivou uma rosa cheirosa no vaso.",
      "explanation": "Dica do S entre vogais: Entre o 'o' e o 'a', a letra S ganha som de Z! Entre vogais, usa-se S para fazer o som de Z."
    },
    {
      "id": "s_z_4",
      "sentence": "O raposinho usou sua esperte_____a para resolver o mistério.",
      "word": "esperteza",
      "options": [
        "Z",
        "S"
      ],
      "correct": 0,
      "audioText": "O raposinho usou sua esperteza para resolver o mistério.",
      "explanation": "Dica do -EZA: Vem da palavra 'esperto', então termina com -EZA com Z! Palavras terminadas em -eza (derivadas de esperto) usam Z!"
    },
    {
      "id": "s_z_5",
      "sentence": "Os piratas acharam um te_____ouro cheio de moedas de ouro.",
      "word": "tesouro",
      "options": [
        "S",
        "Z"
      ],
      "correct": 0,
      "audioText": "Os piratas acharam um tesouro cheio de moedas de ouro.",
      "explanation": "Dica do S entre vogais: Entre 'e' e 'o', a letra S soa como Z! No meio da palavra entre vogais, escreve-se S com som de Z."
    },
    {
      "id": "s_z_6",
      "sentence": "O atleta venceu a corrida com grande rapide_____.",
      "word": "rapidez",
      "options": [
        "Z",
        "S"
      ],
      "correct": 0,
      "audioText": "O atleta venceu a corrida com grande rapidez.",
      "explanation": "Dica do -EZ: Vem da palavra 'rápido', terminando com Z! Substantivos abstratos terminados em -ez (como rapidez) usam Z!"
    },
    {
      "id": "s_z_7",
      "sentence": "Nossa ca_____a é aconchegante e cheia de amor.",
      "word": "casa",
      "options": [
        "S",
        "Z"
      ],
      "correct": 0,
      "audioText": "Nossa casa é aconchegante e cheia de amor.",
      "explanation": "Dica do S entre vogais: Em 'casa', a letra S está entre 'a' e 'a'! A palavra 'casa' é grafada com S entre vogais."
    },
    {
      "id": "s_z_8",
      "sentence": "A duque_____a vestia um lindo vestido na festa real.",
      "word": "duqueza",
      "options": [
        "Z",
        "S"
      ],
      "correct": 0,
      "audioText": "A duqueza vestia um lindo vestido na festa real.",
      "explanation": "Dica dos Títulos: O título feminino 'duqueza' termina com -EZA com Z! Títulos com o sufixo nobre -eza são grafados com Z!"
    },
    {
      "id": "s_z_9",
      "sentence": "O motorista tocou a bu_____ina do carro.",
      "word": "buzina",
      "options": [
        "Z",
        "S"
      ],
      "correct": 0,
      "audioText": "O motorista tocou a buzina do carro.",
      "explanation": "Dica da Letra Z: A palavra 'buzina' usa a letra Z original no meio! 'Buzina' é escrita nativamente com a letra Z."
    },
    {
      "id": "s_z_10",
      "sentence": "Gosto de colocar a_____eitona verde na minha salada.",
      "word": "azeitona",
      "options": [
        "Z",
        "S"
      ],
      "correct": 0,
      "audioText": "Gosto de colocar azeitona verde na minha salada.",
      "explanation": "Dica da Letra Z: 'Azeitona' é escrita com Z! A palavra azeitona começa com az- e utiliza Z."
    },
    {
      "id": "s_z_11",
      "sentence": "Devemos respeitar e cuidar da nossa nature_____a.",
      "word": "natureza",
      "options": [
        "Z",
        "S"
      ],
      "correct": 0,
      "audioText": "Devemos respeitar e cuidar da nossa natureza.",
      "explanation": "Dica do -EZA: 'Natureza' termina com o sufixo -EZA, com Z! 'Natureza' escreve-se com Z no final (-eza)."
    },
    {
      "id": "s_z_12",
      "sentence": "Coloquei as flores em um va_____o de cristal.",
      "word": "vaso",
      "options": [
        "S",
        "Z"
      ],
      "correct": 0,
      "audioText": "Coloquei as flores em um vaso de cristal.",
      "explanation": "Dica do S entre vogais: O S entre 'a' e 'o' fica com som de Z! 'Vaso' é escrito com a letra S entre vogais."
    },
    {
      "id": "s_z_13",
      "sentence": "Nossa ami_____ade é muito especial e verdadeira.",
      "word": "amizade",
      "options": [
        "Z",
        "S"
      ],
      "correct": 0,
      "audioText": "Nossa amizade é muito especial e verdadeira.",
      "explanation": "Dica da Letra Z: Vem de 'amigo' e ganha o sufixo formando 'amizade' com Z! A palavra 'amizade' é escrita com Z."
    },
    {
      "id": "s_z_14",
      "sentence": "Ele veste uma cami_____a azul para ir à escola.",
      "word": "camisa",
      "options": [
        "S",
        "Z"
      ],
      "correct": 0,
      "audioText": "Ele veste uma camisa azul para ir à escola.",
      "explanation": "Dica do S entre vogais: Entre 'i' e 'a', a letra S tem som de Z! 'Camisa' é grafada com S entre vogais."
    },
    {
      "id": "s_z_15",
      "sentence": "O rei possuía uma grande rique_____a no seu castelo.",
      "word": "riqueza",
      "options": [
        "Z",
        "S"
      ],
      "correct": 0,
      "audioText": "O rei possuía uma grande riqueza no seu castelo.",
      "explanation": "Dica do -EZA: Vem de 'rico', formando 'riqueza' com Z! Substantivos derivados de adjetivos (rico -> riqueza) usam Z."
    },
    {
      "id": "s_z_16",
      "sentence": "Fomos visitar os animais no _____oológico no domingo.",
      "word": "zoológico",
      "options": [
        "Z",
        "S"
      ],
      "correct": 0,
      "audioText": "Fomos visitar os animais no zoológico no domingo.",
      "explanation": "Dica do Z Inicial: No começo da palavra 'zoológico', usamos a letra Z! Palavras que iniciam com som de Z usam a letra Z."
    }
  ],
  "m_pb": [
    {
      "id": "m_n_1",
      "sentence": "As crianças jogam futebol no ca_____po da escola.",
      "word": "campo",
      "options": [
        "M",
        "N"
      ],
      "correct": 0,
      "audioText": "As crianças jogam futebol no campo da escola.",
      "explanation": "Regra do P e B: Antes da letra P, usamos sempre a letra M! Usamos M antes das consoantes P e B (caMpo)."
    },
    {
      "id": "m_n_2",
      "sentence": "Descansamos debaixo da so_____bra da grande árvore.",
      "word": "sombra",
      "options": [
        "M",
        "N"
      ],
      "correct": 0,
      "audioText": "Descansamos debaixo da sombra da grande árvore.",
      "explanation": "Regra do P e B: Antes da letra B, usamos a letra M! Usamos M antes das consoantes P e B (soMbra)."
    },
    {
      "id": "m_n_3",
      "sentence": "O menino escova o de_____te depois das refeições.",
      "word": "dente",
      "options": [
        "N",
        "M"
      ],
      "correct": 0,
      "audioText": "O menino escova o dente depois das refeições.",
      "explanation": "Regra Geral: A letra seguinte é T. Como não é P nem B, usamos N! Usamos N antes de qualquer consoante que não seja P ou B (deNte)."
    },
    {
      "id": "m_n_4",
      "sentence": "O bo_____beiro apagou o fogo com muita bravura.",
      "word": "bombeiro",
      "options": [
        "M",
        "N"
      ],
      "correct": 0,
      "audioText": "O bombeiro apagou o fogo com muita bravura.",
      "explanation": "Regra do P e B: Veja a consoante que vem depois! É o B, então usamos M! Antes de B usamos M (boMbeiro)."
    },
    {
      "id": "m_n_5",
      "sentence": "Acendi a lâ_____pada para iluminar o quarto escuro.",
      "word": "lâmpada",
      "options": [
        "M",
        "N"
      ],
      "correct": 0,
      "audioText": "Acendi a lâmpada para iluminar o quarto escuro.",
      "explanation": "Regra do P e B: Depois do espaço vem a letra P! Usamos a letra M! Antes da consoante P usamos M (lâMpada)."
    },
    {
      "id": "m_n_6",
      "sentence": "O ve_____to forte balançou as folhas dos coqueiros.",
      "word": "vento",
      "options": [
        "N",
        "M"
      ],
      "correct": 0,
      "audioText": "O vento forte balançou as folhas dos coqueiros.",
      "explanation": "Regra Geral: A letra seguinte é T. Como não é P nem B, usamos N! Antes de T usamos a letra N (veNto)."
    },
    {
      "id": "m_n_7",
      "sentence": "Lembre de colocar a ta_____pa no pote de doces.",
      "word": "tampa",
      "options": [
        "M",
        "N"
      ],
      "correct": 0,
      "audioText": "Lembre de colocar a tampa no pote de doces.",
      "explanation": "Regra do P e B: Antes da letra P usamos a letra M! Antes de P usamos M (taMpa)."
    },
    {
      "id": "m_n_8",
      "sentence": "Regamos a pla_____ta do jardim todas as manhãs.",
      "word": "planta",
      "options": [
        "N",
        "M"
      ],
      "correct": 0,
      "audioText": "Regamos a planta do jardim todas as manhãs.",
      "explanation": "Regra Geral: Depois vem a letra T, por isso usamos a letra N! Usamos N antes da consoante T (plaNta)."
    },
    {
      "id": "m_n_9",
      "sentence": "O elefante usou sua tro_____ba para pegar água.",
      "word": "tromba",
      "options": [
        "M",
        "N"
      ],
      "correct": 0,
      "audioText": "O elefante usou sua tromba para pegar água.",
      "explanation": "Regra do P e B: A letra seguinte é B! Então a resposta é M! Antes da letra B usa-se M (troMba)."
    },
    {
      "id": "m_n_10",
      "sentence": "Atravessamos a po_____te para chegar ao parque.",
      "word": "ponte",
      "options": [
        "N",
        "M"
      ],
      "correct": 0,
      "audioText": "Atravessamos a ponte para chegar ao parque.",
      "explanation": "Regra Geral: A consoante é T. Usamos N antes de T! Usamos N antes de consoantes que não são P ou B (poNte)."
    },
    {
      "id": "m_n_11",
      "sentence": "Papai prendeu as calças usando um ci_____to de couro.",
      "word": "cinto",
      "options": [
        "N",
        "M"
      ],
      "correct": 0,
      "audioText": "Papai prendeu as calças usando um cinto de couro.",
      "explanation": "Regra Geral: Depois do espaço vem o T, logo usamos a letra N! Antes de T usamos N (ciNto)."
    },
    {
      "id": "m_n_12",
      "sentence": "Hoje o te_____po está ensolarado e ótimo para brincar.",
      "word": "tempo",
      "options": [
        "M",
        "N"
      ],
      "correct": 0,
      "audioText": "Hoje o tempo está ensolarado e ótimo para brincar.",
      "explanation": "Regra do P e B: Repare no P depois da lacuna! Usamos M! Antes de P usamos a letra M (teMpo)."
    },
    {
      "id": "m_n_13",
      "sentence": "Subimos no topo da mo_____tanha para ver o pôr do sol.",
      "word": "montanha",
      "options": [
        "N",
        "M"
      ],
      "correct": 0,
      "audioText": "Subimos no topo da montanha para ver o pôr do sol.",
      "explanation": "Regra Geral: A letra seguinte é T, então colocamos N! Usamos N antes de T (moNtanha)."
    },
    {
      "id": "m_n_14",
      "sentence": "Tocamos a ca_____painha para anunciar nossa chegada.",
      "word": "campainha",
      "options": [
        "M",
        "N"
      ],
      "correct": 0,
      "audioText": "Tocamos a campainha para anunciar nossa chegada.",
      "explanation": "Regra do P e B: Antes da letra P usa-se a letra M! Antes de P usa-se sempre M (caMpainha)."
    },
    {
      "id": "m_n_15",
      "sentence": "A turma dançou ao ritmo do sa_____ba animado.",
      "word": "samba",
      "options": [
        "M",
        "N"
      ],
      "correct": 0,
      "audioText": "A turma dançou ao ritmo do samba animado.",
      "explanation": "Regra do P e B: Antes do B vem sempre a letra M! Antes de B escreve-se M (saMba)."
    },
    {
      "id": "m_n_16",
      "sentence": "Um lindo passarinho pousou no ca_____to da janela.",
      "word": "canto",
      "options": [
        "N",
        "M"
      ],
      "correct": 0,
      "audioText": "Um lindo passarinho pousou no canto da janela.",
      "explanation": "Regra Geral: A consoante T exige o uso da letra N! Antes da consoante T usamos N (caNto)."
    }
  ],
  "ch_x": [
    {
      "id": "ch_x_1",
      "sentence": "A vovó serve o café numa _____ícara de porcelana.",
      "word": "xícara",
      "options": [
        "X",
        "CH"
      ],
      "correct": 0,
      "audioText": "A vovó serve o café numa xícara de porcelana.",
      "explanation": "Dica do X: A palavra 'xícara' começa com a letra X! 'Xícara' é escrita com a letra X inicial."
    },
    {
      "id": "ch_x_2",
      "sentence": "Tomei um copo de _____á bem quentinho antes de dormir.",
      "word": "chá",
      "options": [
        "CH",
        "X"
      ],
      "correct": 0,
      "audioText": "Tomei um copo de chá bem quentinho antes de dormir.",
      "explanation": "Dica do CH: A palavra 'chá' começa com a família do CH! A bebida 'chá' é escrita com CH."
    },
    {
      "id": "ch_x_3",
      "sentence": "Devemos jogar o _____o sempre dentro da lixeira.",
      "word": "lixo",
      "options": [
        "X",
        "CH"
      ],
      "correct": 0,
      "audioText": "Devemos jogar o lixo sempre dentro da lixeira.",
      "explanation": "Dica do X: A palavra 'lixo' é escrita com X! A palavra 'lixo' tem a grafia correta com X."
    },
    {
      "id": "ch_x_4",
      "sentence": "Adoro comer um pedaço de _____ocolate na sobremesa.",
      "word": "chocolate",
      "options": [
        "CH",
        "X"
      ],
      "correct": 0,
      "audioText": "Adoro comer um pedaço de chocolate na sobremesa.",
      "explanation": "Dica do CH: 'Chocolate' começa com a combinação CH! Chocolate é grafado com CH no início."
    },
    {
      "id": "ch_x_5",
      "sentence": "O colorido pei_____e nada alegremente no aquário.",
      "word": "peixe",
      "options": [
        "X",
        "CH"
      ],
      "correct": 0,
      "audioText": "O colorido peixe nada alegremente no aquário.",
      "explanation": "Dica do Ditongo: Depois de ditongo (ei), geralmente usamos X! (pei-xe) Após o ditongo 'ei', emprega-se a letra X."
    },
    {
      "id": "ch_x_6",
      "sentence": "A forte _____uva molhou toda a rua pela manhã.",
      "word": "chuva",
      "options": [
        "CH",
        "X"
      ],
      "correct": 0,
      "audioText": "A forte chuva molhou toda a rua pela manhã.",
      "explanation": "Dica do CH: 'Chuva' e 'chuveiro' começam com CH! 'Chuva' é escrita com CH no início."
    },
    {
      "id": "ch_x_7",
      "sentence": "Guardei meus brinquedos em uma cai_____a de papelão.",
      "word": "caixa",
      "options": [
        "X",
        "CH"
      ],
      "correct": 0,
      "audioText": "Guardei meus brinquedos em uma caixa de papelão.",
      "explanation": "Dica do Ditongo: Depois do ditongo 'ai', usamos a letra X! (cai-xa) Escreve-se X após o ditongo 'ai'."
    },
    {
      "id": "ch_x_8",
      "sentence": "Coloquei os cadernos dentro da minha mo_____ila escolar.",
      "word": "mochila",
      "options": [
        "CH",
        "X"
      ],
      "correct": 0,
      "audioText": "Coloquei os cadernos dentro da minha mochila escolar.",
      "explanation": "Dica do CH: A palavra 'mochila' usa o som do CH! 'Mochila' é escrita com CH na segunda sílaba."
    },
    {
      "id": "ch_x_9",
      "sentence": "O mágico tirou um coelho de dentro do seu _____apéu.",
      "word": "chapéu",
      "options": [
        "CH",
        "X"
      ],
      "correct": 0,
      "audioText": "O mágico tirou um coelho de dentro do seu chapéu.",
      "explanation": "Dica do CH: 'Chapéu' começa com a letra C seguida de H! 'Chapéu' escreve-se com CH."
    },
    {
      "id": "ch_x_10",
      "sentence": "Comprei um saboroso abaca_____i no hortifrúti.",
      "word": "abacaxi",
      "options": [
        "X",
        "CH"
      ],
      "correct": 0,
      "audioText": "Comprei um saboroso abacaxi no hortifrúti.",
      "explanation": "Dica do X: A palavra 'abacaxi' termina com a letra X! 'Abacaxi' é escrito com X no final da palavra."
    },
    {
      "id": "ch_x_11",
      "sentence": "Preciso da _____ave certa para abrir o portão.",
      "word": "chave",
      "options": [
        "CH",
        "X"
      ],
      "correct": 0,
      "audioText": "Preciso da chave certa para abrir o portão.",
      "explanation": "Dica do CH: 'Chave' e 'chaveiro' começam com CH! A palavra 'chave' é grafada com CH."
    },
    {
      "id": "ch_x_12",
      "sentence": "A fumaça saía suavemente pela _____aminé da casa.",
      "word": "chaminé",
      "options": [
        "CH",
        "X"
      ],
      "correct": 0,
      "audioText": "A fumaça saía suavemente pela chaminé da casa.",
      "explanation": "Dica do CH: 'Chaminé' é escrita com a dupla CH! 'Chaminé' usa o dígrafo CH."
    },
    {
      "id": "ch_x_13",
      "sentence": "A vovó cobriu os ombros com um macio _____ale de lã.",
      "word": "xale",
      "options": [
        "X",
        "CH"
      ],
      "correct": 0,
      "audioText": "A vovó cobriu os ombros com um macio xale de lã.",
      "explanation": "Dica do X: 'Xale' começa com a letra X! 'Xale' é grafado com X inicial."
    },
    {
      "id": "ch_x_14",
      "sentence": "Ela pintou o desenho usando o lápis da cor ro_____o.",
      "word": "roxo",
      "options": [
        "X",
        "CH"
      ],
      "correct": 0,
      "audioText": "Ela pintou o desenho usando o lápis da cor roxo.",
      "explanation": "Dica do X: A cor 'roxo' usa a letra X! A cor 'roxo' escreve-se com X."
    }
  ],
  "g_j": [
    {
      "id": "g_j_1",
      "sentence": "A _____irafa tem um pescoço bem comprido para comer folhas altas.",
      "word": "girafa",
      "options": [
        "G",
        "J"
      ],
      "correct": 0,
      "audioText": "A girafa tem um pescoço bem comprido para comer folhas altas.",
      "explanation": "Dica do G: 'Girafa' se escreve com G antes do I! A palavra 'girafa' começa com a letra G."
    },
    {
      "id": "g_j_2",
      "sentence": "O _____acaré estava descansando nas margens do lago.",
      "word": "jacaré",
      "options": [
        "J",
        "G"
      ],
      "correct": 0,
      "audioText": "O jacaré estava descansando nas margens do lago.",
      "explanation": "Dica do J: 'Jacaré' começa com a letra J! A palavra 'jacaré' usa J no início."
    },
    {
      "id": "g_j_3",
      "sentence": "Coloquei uma pedra de _____elo para esfriar o suco.",
      "word": "gelo",
      "options": [
        "G",
        "J"
      ],
      "correct": 0,
      "audioText": "Coloquei uma pedra de gelo para esfriar o suco.",
      "explanation": "Dica do G: 'Gelo' e 'geladeira' começam com G! 'Gelo' é escrito com a letra G."
    },
    {
      "id": "g_j_4",
      "sentence": "A cobra _____iboia deslizou silenciosamente sobre as folhas.",
      "word": "jiboia",
      "options": [
        "J",
        "G"
      ],
      "correct": 0,
      "audioText": "A cobra jiboia deslizou silenciosamente sobre as folhas.",
      "explanation": "Dica do J: Palavras de origem indígena como 'jiboia' usam J! 'Jiboia' escreve-se com J."
    },
    {
      "id": "g_j_5",
      "sentence": "O _____ágico fez o coelho desaparecer da cartola!",
      "word": "mágico",
      "options": [
        "G",
        "J"
      ],
      "correct": 0,
      "audioText": "O mágico fez o coelho desaparecer da cartola!",
      "explanation": "Dica do G: 'Mágico' vem de magia, que se escreve com G! 'Mágico' usa a letra G na sílaba -gi-."
    },
    {
      "id": "g_j_6",
      "sentence": "Olhei no reló_____io para saber a hora da aula de artes.",
      "word": "relógio",
      "options": [
        "G",
        "J"
      ],
      "correct": 0,
      "audioText": "Olhei no relógio para saber a hora da aula de artes.",
      "explanation": "Dica do G: A terminação -ógio (relógio) usa a letra G! Terminações em -ágio, -égio, -ógio usam G."
    },
    {
      "id": "g_j_7",
      "sentence": "Plantei uma linda flor amarela no _____arrinho da varanda.",
      "word": "jarrinho",
      "options": [
        "J",
        "G"
      ],
      "correct": 0,
      "audioText": "Plantei uma linda flor amarela no jarrinho da varanda.",
      "explanation": "Dica do J: Vem da palavra 'jarra', que se escreve com J! Derivados de palavras com J mantêm a letra J (jarra -> jarrinho)."
    },
    {
      "id": "g_j_8",
      "sentence": "O pedreiro usou o ti_____olo vermelho na construção.",
      "word": "tijolo",
      "options": [
        "J",
        "G"
      ],
      "correct": 0,
      "audioText": "O pedreiro usou o tijolo vermelho na construção.",
      "explanation": "Dica do J: 'Tijolo' tem a letra J no meio! A palavra 'tijolo' é grafada com J."
    },
    {
      "id": "g_j_9",
      "sentence": "Abertura da _____anela deixa o vento fresco entrar.",
      "word": "janela",
      "options": [
        "J",
        "G"
      ],
      "correct": 0,
      "audioText": "Abertura da janela deixa o vento fresco entrar.",
      "explanation": "Dica do J: 'Janela' e 'janelinha' começam com J! 'Janela' escreve-se com J."
    },
    {
      "id": "g_j_10",
      "sentence": "Virei a pá_____ina do livro para continuar a leitura.",
      "word": "página",
      "options": [
        "G",
        "J"
      ],
      "correct": 0,
      "audioText": "Virei a página do livro para continuar a leitura.",
      "explanation": "Dica do G: 'Página' é escrita com a letra G! 'Página' usa G na sílaba -gi-."
    },
    {
      "id": "g_j_11",
      "sentence": "A coru_____a pia durante a noite no alto da árvore.",
      "word": "coruja",
      "options": [
        "J",
        "G"
      ],
      "correct": 0,
      "audioText": "A coruja pia durante a noite no alto da árvore.",
      "explanation": "Dica do J: 'Coruja' termina com a sílaba -ja, com J! 'Coruja' é escrita com J."
    },
    {
      "id": "g_j_12",
      "sentence": "Suco de laran_____a feito na hora é delicioso.",
      "word": "laranja",
      "options": [
        "J",
        "G"
      ],
      "correct": 0,
      "audioText": "Suco de laranja feito na hora é delicioso.",
      "explanation": "Dica do J: 'Laranja' e 'laranjeira' usam a letra J! Palavras terminadas em -ja usam a letra J."
    },
    {
      "id": "g_j_13",
      "sentence": "O _____igante da história subia até o topo das nuvens.",
      "word": "gigante",
      "options": [
        "G",
        "J"
      ],
      "correct": 0,
      "audioText": "O gigante da história subia até o topo das nuvens.",
      "explanation": "Dica do G: 'Gigante' começa com G na primeira sílaba! 'Gigante' é escrito com G inicial."
    },
    {
      "id": "g_j_14",
      "sentence": "Coloquei a sopa bem quente dentro de uma ti_____ela.",
      "word": "tigela",
      "options": [
        "G",
        "J"
      ],
      "correct": 0,
      "audioText": "Coloquei a sopa bem quente dentro de uma tigela.",
      "explanation": "Dica do G: 'Tigela' escreve-se com G! 'Tigela' é grafada com G."
    }
  ],
  "s_ss_c_cedilha": [
    {
      "id": "s_ss_c_ç_1",
      "sentence": "A minha fruta favorita no lanche é a ma_____ã vermelha.",
      "word": "maçã",
      "options": [
        "Ç",
        "C",
        "SS",
        "S"
      ],
      "correct": 0,
      "audioText": "A minha fruta favorita no lanche é a maçã vermelha.",
      "explanation": "Dica do Ç: Usa-se Ç antes de A, O, U para ter som de S! Nenhuma palavra começa com Ç. A letra Ç é usada antes de A, O, U para som de S."
    },
    {
      "id": "s_ss_c_ç_2",
      "sentence": "O garoto sentiu o cora_____ão bater mais forte de emoção.",
      "word": "coração",
      "options": [
        "Ç",
        "C",
        "SS",
        "S"
      ],
      "correct": 0,
      "audioText": "O garoto sentiu o coração bater mais forte de emoção.",
      "explanation": "Dica do Ç: Em '-ção', usamos sempre a letra Ç! Substantivos terminados em -ção usam Ç."
    },
    {
      "id": "s_ss_c_ç_3",
      "sentence": "A vovó preparou um do_____e caseiro delicioso de sobremesa.",
      "word": "doce",
      "options": [
        "C",
        "Ç",
        "SS",
        "S"
      ],
      "correct": 0,
      "audioText": "A vovó preparou um doce caseiro delicioso de sobremesa.",
      "explanation": "Dica do C: Antes de E e I, a letra C tem som de S sem precisarmos de cedilha! Usamos C antes de E ou I (não existe Ç antes de E ou I)."
    },
    {
      "id": "s_ss_c_ç_4",
      "sentence": "Um fofo pas_____arinho pousou no galho da árvore.",
      "word": "passarinho",
      "options": [
        "SS",
        "S",
        "Ç",
        "C"
      ],
      "correct": 0,
      "audioText": "Um fofo passarinho pousou no galho da árvore.",
      "explanation": "Dica do SS: Para ter som de S forte entre duas vogais, usamos SS! Usamos SS entre vogais para manter o som forte de S."
    },
    {
      "id": "s_ss_c_ç_5",
      "sentence": "Calcei o meu _____apato para ir jogar bola no parque.",
      "word": "sapato",
      "options": [
        "S",
        "SS",
        "C",
        "Ç"
      ],
      "correct": 0,
      "audioText": "Calcei o meu sapato para ir jogar bola no parque.",
      "explanation": "Dica do S Inicial: No começo das palavras, usamos apenas 1 S! Nenhuma palavra começa com SS ou Ç. Início de palavra com som de S usa-se apenas um S."
    },
    {
      "id": "s_ss_c_ç_6",
      "sentence": "O cachorrinho enterrou o o_____o no quintal da casa.",
      "word": "osso",
      "options": [
        "SS",
        "S",
        "C",
        "Ç"
      ],
      "correct": 0,
      "audioText": "O cachorrinho enterrou o osso no quintal da casa.",
      "explanation": "Dica do SS: Entre o 'o' e o 'o', usamos SS para o som ficar forte! Usamos SS entre duas vogais."
    },
    {
      "id": "s_ss_c_ç_7",
      "sentence": "O médico aplicou a va_____ina para proteger a criança.",
      "word": "vacina",
      "options": [
        "C",
        "Ç",
        "SS",
        "S"
      ],
      "correct": 0,
      "audioText": "O médico aplicou a vacina para proteger a criança.",
      "explanation": "Dica do C: Antes da vogal I, a letra C tem som de S! Antes da vogal I, a letra C soa como S."
    },
    {
      "id": "s_ss_c_ç_8",
      "sentence": "Fomos ao _____irco ver o show de mágicas e malabares.",
      "word": "circo",
      "options": [
        "C",
        "S",
        "SS",
        "Ç"
      ],
      "correct": 0,
      "audioText": "Fomos ao circo ver o show de mágicas e malabares.",
      "explanation": "Dica do C Inicial: No início da palavra 'circo', a letra C antes do I tem som de S! Usamos C no início de palavras antes de I."
    },
    {
      "id": "s_ss_c_ç_9",
      "sentence": "O fofo coelho adora roer uma _____enoura fresca.",
      "word": "cenoura",
      "options": [
        "C",
        "S",
        "SS",
        "Ç"
      ],
      "correct": 0,
      "audioText": "O fofo coelho adora roer uma cenoura fresca.",
      "explanation": "Dica do C: Antes do E, a letra C tem som de S! Antes da vogal E, usa-se C."
    },
    {
      "id": "s_ss_c_ç_10",
      "sentence": "Fizemos um agradável pas_____eio no parque no domingo.",
      "word": "passeio",
      "options": [
        "SS",
        "S",
        "Ç",
        "C"
      ],
      "correct": 0,
      "audioText": "Fizemos um agradável passeio no parque no domingo.",
      "explanation": "Dica do SS: Para som forte de S entre vogais (a...e), usamos SS! A palavra 'passeio' é escrita com SS entre vogais."
    },
    {
      "id": "s_ss_c_ç_11",
      "sentence": "A menina amarrou uma fita de la_____o na cabeça.",
      "word": "laço",
      "options": [
        "Ç",
        "C",
        "SS",
        "S"
      ],
      "correct": 0,
      "audioText": "A menina amarrou uma fita de laço na cabeça.",
      "explanation": "Dica do Ç: Antes da letra O, usamos Ç para ter som de S! Usamos Ç antes de O (laço)."
    },
    {
      "id": "s_ss_c_ç_12",
      "sentence": "O palha_____o fez todo mundo rir com suas trapalhadas.",
      "word": "palhaço",
      "options": [
        "Ç",
        "C",
        "SS",
        "S"
      ],
      "correct": 0,
      "audioText": "O palhaço fez todo mundo rir com suas trapalhadas.",
      "explanation": "Dica do Ç: 'Palhaço' é escrito com Ç antes da letra O! Usamos Ç antes de O (palhaço)."
    },
    {
      "id": "s_ss_c_ç_13",
      "sentence": "Tomamos uma _____opa bem quente no dia frio de inverno.",
      "word": "sopa",
      "options": [
        "S",
        "SS",
        "C",
        "Ç"
      ],
      "correct": 0,
      "audioText": "Tomamos uma sopa bem quente no dia frio de inverno.",
      "explanation": "Dica do S Inicial: No começo da palavra usamos S simples! Início de palavra com som de S usa um único S."
    },
    {
      "id": "s_ss_c_ç_14",
      "sentence": "Coloquei as cal_____as de algodão na gaveta de roupas.",
      "word": "calça",
      "options": [
        "Ç",
        "C",
        "SS",
        "S"
      ],
      "correct": 0,
      "audioText": "Coloquei as calças de algodão na gaveta de roupas.",
      "explanation": "Dica do Ç: 'Calça' usa a letra Ç antes do A! Usamos Ç antes de A (calça)."
    },
    {
      "id": "s_ss_c_ç_15",
      "sentence": "Na lenda do mar, a _____ereia cantava para os navegantes.",
      "word": "sereia",
      "options": [
        "S",
        "SS",
        "C",
        "Ç"
      ],
      "correct": 0,
      "audioText": "Na lenda do mar a sereia cantava para os navegantes.",
      "explanation": "Dica do S Inicial: No começo de 'sereia' usamos a letra S! No início da palavra usamos S."
    }
  ],
  "acento_grafico": [
    {
      "id": "acento_grafico_1",
      "sentence": "Ontem a minha _____ me contou uma história linda.",
      "word": "vovó",
      "options": ["vovó", "vovo"],
      "correct": 0,
      "audioText": "Ontem a minha vovó me contou uma história linda.",
      "explanation": "Dica do Acento: 'Vovó' (a mãe da mãe/pai) tem acento agudo no Ó! Som aberto = Ó."
    },
    {
      "id": "acento_grafico_2",
      "sentence": "O meu _____ gosta de jogar xadrez no parque.",
      "word": "vovô",
      "options": ["vovô", "vovo"],
      "correct": 0,
      "audioText": "O meu vovô gosta de jogar xadrez no parque.",
      "explanation": "Dica do Acento: 'Vovô' (o pai da mãe/pai) tem acento circunflexo no Ô! Som fechado = Ô."
    },
    {
      "id": "acento_grafico_3",
      "sentence": "O _____ amarelo passou bem rápido pela rua.",
      "word": "ônibus",
      "options": ["ônibus", "onibus"],
      "correct": 0,
      "audioText": "O ônibus amarelo passou bem rápido pela rua.",
      "explanation": "Dica de Proparoxítona: 'Ônibus' tem acento circunflexo no Ô! Todas as proparoxítonas são acentuadas."
    },
    {
      "id": "acento_grafico_4",
      "sentence": "Aquela _____ alta no jardim tem muitas frutas.",
      "word": "árvore",
      "options": ["árvore", "arvore"],
      "correct": 0,
      "audioText": "Aquela árvore alta no jardim tem muitas frutas.",
      "explanation": "Dica de Acentuação: 'Árvore' tem acento agudo no Á!"
    },
    {
      "id": "acento_grafico_5",
      "sentence": "Comi uma _____ bem doce na hora do lanche.",
      "word": "maçã",
      "options": ["maçã", "maca"],
      "correct": 0,
      "audioText": "Comi uma maçã bem doce na hora do lanche.",
      "explanation": "Dica do Til: 'Maçã' tem til no Ã para dar o som nasal (ã)!"
    },
    {
      "id": "acento_grafico_6",
      "sentence": "O _____ voou bem alto no céu azul.",
      "word": "pássaro",
      "options": ["pássaro", "passaro"],
      "correct": 0,
      "audioText": "O pássaro voou bem alto no céu azul.",
      "explanation": "Dica de Acentuação: 'Pássaro' tem acento agudo no Á!"
    },
    {
      "id": "acento_grafico_7",
      "sentence": "Vou acender a _____ para ler o meu livro.",
      "word": "lâmpada",
      "options": ["lâmpada", "lampada"],
      "correct": 0,
      "audioText": "Vou acender a lâmpada para ler o meu livro.",
      "explanation": "Dica do Acento: 'Lâmpada' leva acento circunflexo no Â!"
    },
    {
      "id": "acento_grafico_8",
      "sentence": "No domingo ensolarado eu tomei um _____ gelado.",
      "word": "picolé",
      "options": ["picolé", "picole"],
      "correct": 0,
      "audioText": "No domingo ensolarado eu tomei um picolé gelado.",
      "explanation": "Dica de Oxítona: 'Picolé' termina com É forte, por isso tem acento agudo!"
    },
    {
      "id": "acento_grafico_9",
      "sentence": "Ele correu muito _____ e venceu a corrida!",
      "word": "rápido",
      "options": ["rápido", "rapido"],
      "correct": 0,
      "audioText": "Ele correu muito rápido e venceu a corrida!",
      "explanation": "Dica de Acentuação: 'Rápido' tem acento agudo no Á!"
    },
    {
      "id": "acento_grafico_10",
      "sentence": "O show do _____ foi muito legal e divertido.",
      "word": "mágico",
      "options": ["mágico", "magico"],
      "correct": 0,
      "audioText": "O show do mágico foi muito legal e divertido.",
      "explanation": "Dica de Acentuação: 'Mágico' tem acento agudo no Á!"
    },
    {
      "id": "acento_grafico_11",
      "sentence": "A minha família foi ao _____ ver os animais.",
      "word": "zoológico",
      "options": ["zoológico", "zoologico"],
      "correct": 0,
      "audioText": "A minha família foi ao zoológico ver os animais.",
      "explanation": "Dica de Acentuação: 'Zoológico' tem acento agudo no Ó!"
    },
    {
      "id": "acento_grafico_12",
      "sentence": "Meu amigo tomou uma xícara de _____ quente.",
      "word": "café",
      "options": ["café", "cafe"],
      "correct": 0,
      "audioText": "Meu amigo tomou uma xícara de café quente.",
      "explanation": "Dica do É: 'Café' termina com É acentuado!"
    },
    {
      "id": "acento_grafico_13",
      "sentence": "Vou tomar um copo de _____ gelado no almoço.",
      "word": "suco",
      "options": ["suco", "súco"],
      "correct": 0,
      "audioText": "Vou tomar um copo de suco gelado no almoço.",
      "explanation": "Dica Sem Acento: A palavra 'suco' NÃO tem acento!"
    },
    {
      "id": "acento_grafico_14",
      "sentence": "Eu recebi um lindo _____ de aniversário dos meus pais.",
      "word": "presente",
      "options": ["presente", "présente"],
      "correct": 0,
      "audioText": "Eu recebi um lindo presente de aniversário dos meus pais.",
      "explanation": "Dica Sem Acento: A palavra 'presente' NÃO tem acento!"
    },
    {
      "id": "acento_grafico_15",
      "sentence": "O martelo é um _____ muito útil para construir casas.",
      "word": "objeto",
      "options": ["objeto", "objéto"],
      "correct": 0,
      "audioText": "O martelo é um objeto muito útil para construir casas.",
      "explanation": "Dica Sem Acento: A palavra 'objeto' NÃO tem acento!"
    }
  ]
};

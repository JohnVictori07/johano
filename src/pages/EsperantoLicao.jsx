import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from './Nav'

const licoes = {
  1: {
    titulo:'Saluton!', subtitulo:'Cumprimentos básicos', icon:'👋',
    introducao:'O Esperanto é famoso por ser fácil de pronunciar — cada letra tem sempre o mesmo som, sem exceções! Nesta lição você aprenderá os cumprimentos essenciais.',
    pronuncia:'Em Esperanto, todas as letras se pronunciam sempre da mesma forma. O "j" soa como "i" em "pai". O "ĝ" soa como "dj". Simples assim!',
    vocabulario:[
      {eo:'Saluton',pt:'Olá / Saudação',ex:'Saluton, kiel vi fartas?'},
      {eo:'Bonan matenon',pt:'Bom dia',ex:'Bonan matenon! Ĉu vi bone dormis?'},
      {eo:'Bonan tagon',pt:'Boa tarde',ex:'Bonan tagon, amiko!'},
      {eo:'Bonan vesperon',pt:'Boa noite',ex:'Bonan vesperon, ĉiuj!'},
      {eo:'Bonan nokton',pt:'Boa noite (despedida)',ex:'Bonan nokton! Ĝis morgaŭ.'},
      {eo:'Ĝis revido',pt:'Até logo',ex:'Ĝis revido, amiko!'},
      {eo:'Dankon',pt:'Obrigado(a)',ex:'Dankon pro via helpo!'},
      {eo:'Nedankinde',pt:'De nada',ex:'Nedankinde! Ĝoju!'},
      {eo:'Bonvolu',pt:'Por favor',ex:'Bonvolu helpi min.'},
      {eo:'Pardonu',pt:'Com licença / Desculpe',ex:'Pardonu, kie estas la banĉambro?'},
    ],
    dialogos:[{titulo:'No centro espírita',linhas:[
      {quem:'Ana',texto:'Saluton, kiel vi fartas?'},
      {quem:'Pedro',texto:'Mi fartas bone, dankon! Kaj vi?'},
      {quem:'Ana',texto:'Ankaŭ bone. Ĝis revido!'},
      {quem:'Pedro',texto:'Ĝis revido! Bonan tagon!'},
    ]}],
    exercicios:[
      {pergunta:'Como se diz "Bom dia" em Esperanto?',opcoes:['Bonan vesperon','Bonan matenon','Bonan nokton','Saluton'],correta:1},
      {pergunta:'O que significa "Dankon"?',opcoes:['Por favor','De nada','Obrigado','Com licença'],correta:2},
      {pergunta:'Como se despedir em Esperanto?',opcoes:['Saluton','Pardonu','Ĝis revido','Bonvolu'],correta:2},
      {pergunta:'O que significa "Nedankinde"?',opcoes:['Obrigado','De nada','Com licença','Boa noite'],correta:1},
    ]
  },
  2: {
    titulo:'Mi estas...',subtitulo:'Apresentação pessoal',icon:'🙋',
    introducao:'Aprenda a se apresentar em Esperanto! Você vai aprender a dizer seu nome, sua nacionalidade, de onde é e como está.',
    pronuncia:'O verbo "esti" (ser/estar) no presente é sempre "estas" para todas as pessoas. Não existem conjugações diferentes — uma das grandes facilidades do Esperanto!',
    vocabulario:[
      {eo:'Mi',pt:'Eu',ex:'Mi estas João.'},
      {eo:'Vi',pt:'Você / Tu',ex:'Vi estas bela.'},
      {eo:'Li / Ŝi',pt:'Ele / Ela',ex:'Li estas mia amiko.'},
      {eo:'Ni',pt:'Nós',ex:'Ni estas esperantistoj.'},
      {eo:'Esti',pt:'Ser / Estar',ex:'Mi estas feliĉa.'},
      {eo:'Nomiĝi',pt:'Chamar-se',ex:'Mi nomiĝas Ana.'},
      {eo:'Loĝi',pt:'Morar',ex:'Mi loĝas en Brazilo.'},
      {eo:'Paroli',pt:'Falar',ex:'Mi parolas Esperanton.'},
      {eo:'Lerni',pt:'Aprender',ex:'Mi lernas Esperanton.'},
      {eo:'Kiel vi fartas?',pt:'Como você está?',ex:'Saluton! Kiel vi fartas?'},
    ],
    dialogos:[{titulo:'Primeiro encontro',linhas:[
      {quem:'Maria',texto:'Saluton! Mi nomiĝas Maria. Kaj vi?'},
      {quem:'João',texto:'Saluton! Mi nomiĝas João. Mi loĝas en São Paulo.'},
      {quem:'Maria',texto:'Mi loĝas en Rio de Janeiro. Ĉu vi parolas Esperanton?'},
      {quem:'João',texto:'Jes! Mi lernas Esperanton en Johano!'},
    ]}],
    exercicios:[
      {pergunta:'Como se diz "Eu me chamo João"?',opcoes:['Mi estas João','Mi nomiĝas João','Mi loĝas João','Mi parolas João'],correta:1},
      {pergunta:'O que significa "Mi loĝas en Brazilo"?',opcoes:['Eu falo no Brasil','Eu aprendo no Brasil','Eu moro no Brasil','Eu sou do Brasil'],correta:2},
      {pergunta:'Como perguntar "Como você está?"',opcoes:['Kio estas vi?','Kiel vi fartas?','Kie vi loĝas?','Kiu vi estas?'],correta:1},
      {pergunta:'O que significa "Ni"?',opcoes:['Eu','Você','Ele','Nós'],correta:3},
    ]
  },
  3: {
    titulo:'Nombroj',subtitulo:'Números 1 a 100',icon:'🔢',
    introducao:'Os números em Esperanto são incrivelmente simples! Você aprende 13 palavras e consegue contar até 1 bilhão.',
    pronuncia:'"Unu, du, tri, kvar, kvin, ses, sep, ok, naŭ, dek" — os números de 1 a 10. Para formar outros, é só combinar! Dek unu = 11, dudek = 20...',
    vocabulario:[
      {eo:'Unu',pt:'1 — Um',ex:'Mi havas unu libron.'},
      {eo:'Du',pt:'2 — Dois',ex:'Du pomoj estas sur la tablo.'},
      {eo:'Tri',pt:'3 — Três',ex:'Tri amikoj venas.'},
      {eo:'Kvar',pt:'4 — Quatro',ex:'Kvar sezonoj ekzistas.'},
      {eo:'Kvin',pt:'5 — Cinco',ex:'Kvin minutoj restas.'},
      {eo:'Ses',pt:'6 — Seis',ex:'Ses tagoj pasis.'},
      {eo:'Sep',pt:'7 — Sete',ex:'Sep tagoj estas en semajno.'},
      {eo:'Ok',pt:'8 — Oito',ex:'Ok horoj da dormo.'},
      {eo:'Naŭ',pt:'9 — Nove',ex:'Naŭ planedoj.'},
      {eo:'Dek',pt:'10 — Dez',ex:'Dek fingroj.'},
      {eo:'Dudek',pt:'20 — Vinte',ex:'Dudek jaroj.'},
      {eo:'Cent',pt:'100 — Cem',ex:'Cent jaroj.'},
      {eo:'Mil',pt:'1000 — Mil',ex:'Mil esperantistoj.'},
    ],
    dialogos:[{titulo:'No mercado',linhas:[
      {quem:'Vendedor',texto:'Bonan tagon! Kiom kostas ĉi tio?'},
      {quem:'Cliente',texto:'Kvin reais, bonvolu.'},
      {quem:'Vendedor',texto:'Dankon! Ĉu vi havas dekduon?'},
      {quem:'Cliente',texto:'Jes, jen dek du reais.'},
    ]}],
    exercicios:[
      {pergunta:'Como se diz "Sete" em Esperanto?',opcoes:['Ses','Sep','Ok','Naŭ'],correta:1},
      {pergunta:'O que significa "Dek kvin"?',opcoes:['Quatorze','Quinze','Dezesseis','Treze'],correta:1},
      {pergunta:'Como se diz "Vinte" em Esperanto?',opcoes:['Du dek','Dudek','Dek du','Dek ok'],correta:1},
      {pergunta:'O que significa "Cent"?',opcoes:['Dez','Cinquenta','Cem','Mil'],correta:2},
    ]
  },
  4: {
    titulo:'Koloroj',subtitulo:'Cores e adjetivos',icon:'🎨',
    introducao:'Em Esperanto, os adjetivos sempre terminam em -a. Isso torna muito fácil identificá-los! Aprenda as cores e outros adjetivos essenciais nesta lição.',
    pronuncia:'Os adjetivos em Esperanto terminam sempre em -a: ruĝa (vermelho), blua (azul), granda (grande). Quando o adjetivo está no plural, adiciona-se -j: ruĝaj floroj (flores vermelhas).',
    vocabulario:[
      {eo:'Ruĝa',pt:'Vermelho(a)',ex:'La rozo estas ruĝa.'},
      {eo:'Blua',pt:'Azul',ex:'La ĉielo estas blua.'},
      {eo:'Verda',pt:'Verde',ex:'La herbo estas verda.'},
      {eo:'Flava',pt:'Amarelo(a)',ex:'La suno estas flava.'},
      {eo:'Blanka',pt:'Branco(a)',ex:'La neĝo estas blanka.'},
      {eo:'Nigra',pt:'Preto(a)',ex:'La nokto estas nigra.'},
      {eo:'Granda',pt:'Grande',ex:'La elefanto estas granda.'},
      {eo:'Malgranda',pt:'Pequeno(a)',ex:'La muso estas malgranda.'},
      {eo:'Bela',pt:'Bonito(a)',ex:'La floro estas bela.'},
      {eo:'Bona',pt:'Bom/Boa',ex:'Vi estas bona amiko.'},
      {eo:'Nova',pt:'Novo(a)',ex:'Mi havas novan libron.'},
      {eo:'Malnova',pt:'Velho(a) / Antigo(a)',ex:'La templo estas malnova.'},
    ],
    dialogos:[{titulo:'Descrevendo o mundo',linhas:[
      {quem:'Ana',texto:'Kia estas via preferata koloro?'},
      {quem:'Pedro',texto:'Mi amas la bluan koloron. Kaj vi?'},
      {quem:'Ana',texto:'Mi preferas la verdan. Ĝi estas la koloro de espero!'},
      {quem:'Pedro',texto:'Jes! La verda stelo de Esperanto estas bela simbolo.'},
    ]}],
    exercicios:[
      {pergunta:'Como se diz "vermelho" em Esperanto?',opcoes:['Blua','Verda','Ruĝa','Flava'],correta:2},
      {pergunta:'O que significa "granda"?',opcoes:['Bonito','Grande','Pequeno','Verde'],correta:1},
      {pergunta:'Como se forma o oposto de um adjetivo em Esperanto?',opcoes:['Prefixo mal-','Sufixo -ne','Prefixo non-','Sufixo -mal'],correta:0},
      {pergunta:'O que significa "bela"?',opcoes:['Boa','Nova','Bonito(a)','Velha'],correta:2},
    ]
  },
  5: {
    titulo:'Familio',subtitulo:'Família',icon:'👨‍👩‍👧',
    introducao:'Em Esperanto, a família tem uma lógica muito elegante: palavras masculinas e femininas são formadas com prefixos simples. Aprenda a falar sobre seus familiares!',
    pronuncia:'Em Esperanto, "patro" (pai) e "patrino" (mãe) — o sufixo -in indica o feminino. "Frato" (irmão) e "fratino" (irmã). Esta regra se aplica a toda a família!',
    vocabulario:[
      {eo:'Patro',pt:'Pai',ex:'Mia patro estas kuracisto.'},
      {eo:'Patrino',pt:'Mãe',ex:'Mia patrino estas instruistino.'},
      {eo:'Frato',pt:'Irmão',ex:'Mi havas du fratojn.'},
      {eo:'Fratino',pt:'Irmã',ex:'Mia fratino loĝas en Brazilo.'},
      {eo:'Filo',pt:'Filho',ex:'Ili havas tri filojn.'},
      {eo:'Filino',pt:'Filha',ex:'Mia filino lernas Esperanton.'},
      {eo:'Avo',pt:'Avô',ex:'Mia avo rakontis al mi pri la spiritismo.'},
      {eo:'Avino',pt:'Avó',ex:'Mia avino estas tre saĝa.'},
      {eo:'Edzo',pt:'Marido',ex:'Ŝia edzo estas bona homo.'},
      {eo:'Edzino',pt:'Esposa',ex:'Lia edzino estas tre kara.'},
      {eo:'Infano',pt:'Criança / Filho(a)',ex:'La infanoj ludas en la ĝardeno.'},
      {eo:'Familio',pt:'Família',ex:'Mia familio estas tre granda.'},
    ],
    dialogos:[{titulo:'Falando sobre a família',linhas:[
      {quem:'Maria',texto:'Ĉu vi havas familion?'},
      {quem:'João',texto:'Jes! Mi havas edzinon kaj du infanojn.'},
      {quem:'Maria',texto:'Kiaj estas viaj infanoj?'},
      {quem:'João',texto:'Ili estas tre bonaj kaj feliĉaj. Mia filo lernas Esperanton!'},
    ]}],
    exercicios:[
      {pergunta:'Como se diz "Mãe" em Esperanto?',opcoes:['Patro','Patrino','Fratino','Avino'],correta:1},
      {pergunta:'O que significa "frato"?',opcoes:['Filho','Pai','Irmão','Avô'],correta:2},
      {pergunta:'Como se forma o feminino em Esperanto?',opcoes:['Prefixo mal-','Sufixo -in','Prefixo fe-','Sufixo -a'],correta:1},
      {pergunta:'O que significa "infano"?',opcoes:['Família','Esposa','Criança','Irmã'],correta:2},
    ]
  },
  6: {
    titulo:'Verboj',subtitulo:'Verbos no presente',icon:'⚡',
    introducao:'Os verbos em Esperanto são extremamente simples — apenas uma terminação para o presente! Todos os verbos no presente terminam em -as, sem exceções.',
    pronuncia:'Presente: -as (mi estas, vi estas, li estas — todos iguais!). Infinitivo: -i (esti, havi, iri). Não há verbos irregulares em Esperanto — uma grande vantagem!',
    vocabulario:[
      {eo:'Esti (-as)',pt:'Ser / Estar',ex:'Mi estas feliĉa.'},
      {eo:'Havi (-as)',pt:'Ter',ex:'Vi havas belan libron.'},
      {eo:'Iri (-as)',pt:'Ir',ex:'Ni iras al la centro.'},
      {eo:'Veni (-as)',pt:'Vir',ex:'Li venas de Brazilo.'},
      {eo:'Fari (-as)',pt:'Fazer',ex:'Ŝi faras bonegan laboron.'},
      {eo:'Voli (-as)',pt:'Querer',ex:'Mi volas lerni Esperanton.'},
      {eo:'Povi (-as)',pt:'Poder',ex:'Ĉu vi povas helpi min?'},
      {eo:'Scii (-as)',pt:'Saber',ex:'Mi scias la respondon.'},
      {eo:'Vidi (-as)',pt:'Ver',ex:'Ni vidas la belajn stelojn.'},
      {eo:'Ami (-as)',pt:'Amar',ex:'Mi amas mian familion.'},
      {eo:'Paroli (-as)',pt:'Falar',ex:'Ni parolas Esperanton.'},
      {eo:'Pensi (-as)',pt:'Pensar',ex:'Li pensas pri la vivo.'},
    ],
    dialogos:[{titulo:'No centro espírita',linhas:[
      {quem:'Ana',texto:'Ĉu vi volas iri al la spiritisma centro?'},
      {quem:'Pedro',texto:'Jes, mi volas! Kiam ni iras?'},
      {quem:'Ana',texto:'Ni iras vendrede. Ĉu vi povas veni?'},
      {quem:'Pedro',texto:'Mi pensas, ke jes. Mi amas tiujn kunvenojn!'},
    ]}],
    exercicios:[
      {pergunta:'Qual é a terminação dos verbos no presente em Esperanto?',opcoes:['-is','-as','-os','-us'],correta:1},
      {pergunta:'Como se diz "Eu quero" em Esperanto?',opcoes:['Mi havas','Mi iras','Mi volas','Mi povas'],correta:2},
      {pergunta:'O que significa "ni iras"?',opcoes:['Nós temos','Nós vamos','Nós fazemos','Nós vemos'],correta:1},
      {pergunta:'Qual é o infinitivo de "ami"?',opcoes:['Amar','Ter','Ir','Ver'],correta:0},
    ]
  },
  7: {
    titulo:'Demandoj',subtitulo:'Fazendo perguntas',icon:'❓',
    introducao:'Saber fazer perguntas é essencial em qualquer idioma. Em Esperanto, as palavras interrogativas são muito lógicas e fáceis de aprender!',
    pronuncia:'As palavras interrogativas em Esperanto começam com "ki-": Kio (o quê), Kiu (quem), Kie (onde), Kiam (quando), Kiel (como), Kiom (quanto), Kial (por quê). Para perguntas sim/não, use "Ĉu".',
    vocabulario:[
      {eo:'Ĉu?',pt:'(pergunta sim/não)',ex:'Ĉu vi parolas Esperanton?'},
      {eo:'Kio?',pt:'O quê? / O que?',ex:'Kio estas tio?'},
      {eo:'Kiu?',pt:'Quem? / Qual?',ex:'Kiu estas vi?'},
      {eo:'Kie?',pt:'Onde?',ex:'Kie vi loĝas?'},
      {eo:'Kiam?',pt:'Quando?',ex:'Kiam vi venas?'},
      {eo:'Kiel?',pt:'Como?',ex:'Kiel vi fartas?'},
      {eo:'Kiom?',pt:'Quanto(s)?',ex:'Kiom kostas ĉi tio?'},
      {eo:'Kial?',pt:'Por quê?',ex:'Kial vi lernas Esperanton?'},
      {eo:'Jes',pt:'Sim',ex:'Jes, mi parolas Esperanton.'},
      {eo:'Ne',pt:'Não',ex:'Ne, mi ne komprenas.'},
    ],
    dialogos:[{titulo:'Conhecendo alguém',linhas:[
      {quem:'Ana',texto:'Kiu vi estas? Mi ne konas vin.'},
      {quem:'Pedro',texto:'Mi nomiĝas Pedro. Mi estas spiritisto.'},
      {quem:'Ana',texto:'Kial vi lernas Esperanton?'},
      {quem:'Pedro',texto:'Ĉar Esperanto estas la lingvo de frateco! Kiel vi?'},
    ]}],
    exercicios:[
      {pergunta:'Como perguntar "Onde você mora?" em Esperanto?',opcoes:['Kiam vi loĝas?','Kiel vi loĝas?','Kie vi loĝas?','Kio vi loĝas?'],correta:2},
      {pergunta:'O que significa "Kial"?',opcoes:['Como','Quando','Onde','Por quê'],correta:3},
      {pergunta:'Como se faz uma pergunta de sim/não em Esperanto?',opcoes:['Com "Ki-"','Com "Ĉu"','Com "Ne"','Com "Jes"'],correta:1},
      {pergunta:'O que significa "Kiom kostas"?',opcoes:['Onde compra','Quanto custa','Como paga','Quando abre'],correta:1},
    ]
  },
  8: {
    titulo:'Manĝaĵoj',subtitulo:'Comida e cotidiano',icon:'🍽️',
    introducao:'Aprenda o vocabulário do dia a dia — comida, bebida e a rotina. Em Esperanto, o sufixo -aĵo significa "coisa de", então "manĝi" (comer) + aĵo = manĝaĵo (comida)!',
    pronuncia:'Sufixos importantes: -aĵo (coisa feita de / produto de), -ejo (lugar de), -isto (profissional). Assim: kuiri (cozinhar) → kuiristo (cozinheiro) → kuirejo (cozinha)!',
    vocabulario:[
      {eo:'Pano',pt:'Pão',ex:'Mi manĝas panon matene.'},
      {eo:'Akvo',pt:'Água',ex:'Bonvolu doni al mi akvon.'},
      {eo:'Kafo',pt:'Café',ex:'Mi trinkas kafon ĉiun matenon.'},
      {eo:'Teo',pt:'Chá',ex:'Ĉu vi volas teon?'},
      {eo:'Frukto',pt:'Fruta',ex:'La fruktoj estas freŝaj.'},
      {eo:'Legomo',pt:'Legume / Verdura',ex:'Manĝu legomojn ĉiutage!'},
      {eo:'Manĝi',pt:'Comer',ex:'Ni manĝas kune.'},
      {eo:'Trinki',pt:'Beber',ex:'Li trinkas akvon.'},
      {eo:'Kuiri',pt:'Cozinhar',ex:'Ŝi kuiras bonege.'},
      {eo:'Matenmanĝo',pt:'Café da manhã',ex:'Mia matenmanĝo estas simpla.'},
      {eo:'Tagmanĝo',pt:'Almoço',ex:'Ni tagmanĝas je la dek-dua.'},
      {eo:'Vespermanĝo',pt:'Jantar',ex:'Vespermanĝo estas mia plej ŝatata manĝo.'},
    ],
    dialogos:[{titulo:'No restaurante',linhas:[
      {quem:'Kelnero',texto:'Bonan tagon! Kion vi volas manĝi?'},
      {quem:'Cliente',texto:'Mi volas rizon kun legomoj, bonvolu.'},
      {quem:'Kelnero',texto:'Kaj kion vi deziras trinki?'},
      {quem:'Cliente',texto:'Akvon, dankon. Kaj poste kafon, bonvolu.'},
    ]}],
    exercicios:[
      {pergunta:'O que significa "manĝi"?',opcoes:['Beber','Cozinhar','Comer','Comprar'],correta:2},
      {pergunta:'Como se diz "café da manhã" em Esperanto?',opcoes:['Tagmanĝo','Vespermanĝo','Matenmanĝo','Manĝaĵo'],correta:2},
      {pergunta:'O que significa o sufixo -ejo?',opcoes:['Profissional de','Lugar de','Coisa de','Ação de'],correta:1},
      {pergunta:'Como se diz "Eu bebo água"?',opcoes:['Mi manĝas akvon','Mi trinkas akvon','Mi kuiras akvon','Mi havas akvon'],correta:1},
    ]
  },
  9: {
    titulo:'Tempo',subtitulo:'Tempo e clima',icon:'🌤️',
    introducao:'Aprenda a falar sobre o tempo, as horas, os dias da semana e as estações do ano. Em Esperanto, os dias e meses são fáceis de lembrar!',
    pronuncia:'Os dias da semana em Esperanto têm a terminação -tago (dia): lundo (segunda), mardo (terça), merkredo (quarta), ĵaŭdo (quinta), vendredo (sexta), sabato (sábado), dimanĉo (domingo).',
    vocabulario:[
      {eo:'Hodiaŭ',pt:'Hoje',ex:'Hodiaŭ estas bela tago.'},
      {eo:'Morgaŭ',pt:'Amanhã',ex:'Morgaŭ ni iras al la centro.'},
      {eo:'Hieraŭ',pt:'Ontem',ex:'Hieraŭ estis malvarme.'},
      {eo:'Lundo',pt:'Segunda-feira',ex:'Lunde mi laboras.'},
      {eo:'Vendredo',pt:'Sexta-feira',ex:'Vendrede estas la kunveno.'},
      {eo:'Sabato',pt:'Sábado',ex:'Sabate mi ripozas.'},
      {eo:'Dimanĉo',pt:'Domingo',ex:'Dimanĉe mi vizitas mian familion.'},
      {eo:'Printempo',pt:'Primavera',ex:'La printempo estas bela sezono.'},
      {eo:'Somero',pt:'Verão',ex:'En somero estas varme.'},
      {eo:'Aŭtuno',pt:'Outono',ex:'La folioj falas en aŭtuno.'},
      {eo:'Vintro',pt:'Inverno',ex:'En vintro estas malvarme.'},
      {eo:'Pluvas',pt:'Está chovendo',ex:'Hodiaŭ pluvas forte.'},
    ],
    dialogos:[{titulo:'Falando sobre o tempo',linhas:[
      {quem:'Ana',texto:'Kia estas la vetero hodiaŭ?'},
      {quem:'Pedro',texto:'Estas varme kaj suna. Perfekta tago!'},
      {quem:'Ana',texto:'Ĉu morgaŭ estos pluvo?'},
      {quem:'Pedro',texto:'Ne, mi pensas, ke morgaŭ estos ankaŭ bele.'},
    ]}],
    exercicios:[
      {pergunta:'Como se diz "hoje" em Esperanto?',opcoes:['Hieraŭ','Morgaŭ','Hodiaŭ','Nuntempe'],correta:2},
      {pergunta:'O que significa "vendredo"?',opcoes:['Segunda','Quarta','Sexta','Domingo'],correta:2},
      {pergunta:'Como se diz "Está chovendo"?',opcoes:['Neĝas','Pluvas','Blovas','Sunas'],correta:1},
      {pergunta:'Qual é a estação do verão em Esperanto?',opcoes:['Vintro','Printempo','Aŭtuno','Somero'],correta:3},
    ]
  },
  10: {
    titulo:'Revizio',subtitulo:'Revisão completa',icon:'🎓',
    introducao:'Parabéns por chegar até aqui! Esta é a lição de revisão do nível iniciante. Vamos consolidar tudo que aprendemos com vocabulário misturado e exercícios variados.',
    pronuncia:'Revisão geral: presente (-as), passado (-is), futuro (-os). Adjetivos (-a), substantivos (-o), advérbios (-e). Plural (-j), acusativo (-n). Estas regras formam a base de todo o Esperanto!',
    vocabulario:[
      {eo:'Saluton / Ĝis revido',pt:'Olá / Até logo',ex:'Saluton! Ĝis revido!'},
      {eo:'Mi nomiĝas...',pt:'Eu me chamo...',ex:'Mi nomiĝas João.'},
      {eo:'Kiel vi fartas?',pt:'Como vai você?',ex:'Kiel vi fartas hodiaŭ?'},
      {eo:'Bone, dankon!',pt:'Bem, obrigado!',ex:'Bone, dankon! Kaj vi?'},
      {eo:'Mi volas...',pt:'Eu quero...',ex:'Mi volas lerni Esperanton.'},
      {eo:'Kie estas...?',pt:'Onde está...?',ex:'Kie estas la necesejo?'},
      {eo:'Kiom kostas?',pt:'Quanto custa?',ex:'Kiom kostas ĉi tiu libro?'},
      {eo:'Mi ne komprenas',pt:'Eu não entendo',ex:'Pardonu, mi ne komprenas.'},
      {eo:'Ĉu vi parolas...?',pt:'Você fala...?',ex:'Ĉu vi parolas Esperanton?'},
      {eo:'Tre bone!',pt:'Muito bem!',ex:'Vi parolas Esperanton tre bone!'},
    ],
    dialogos:[{titulo:'Conversa completa',linhas:[
      {quem:'Ana',texto:'Saluton! Mi nomiĝas Ana. Kiu vi estas?'},
      {quem:'Pedro',texto:'Saluton, Ana! Mi estas Pedro. Mi loĝas en São Paulo.'},
      {quem:'Ana',texto:'Kial vi lernas Esperanton?'},
      {quem:'Pedro',texto:'Ĉar mi amas la ideon de frateco inter ĉiuj homoj!'},
      {quem:'Ana',texto:'Tre bone! Ĝis revido, Pedro!'},
      {quem:'Pedro',texto:'Ĝis revido, Ana! Bonan tagon!'},
    ]}],
    exercicios:[
      {pergunta:'Como se diz "Eu não entendo"?',opcoes:['Mi ne scias','Mi ne komprenas','Mi ne volas','Mi ne povas'],correta:1},
      {pergunta:'O que significa "Tre bone"?',opcoes:['Muito obrigado','Muito bem','Muito grande','Muito belo'],correta:1},
      {pergunta:'Como perguntar "Quanto custa?"',opcoes:['Kio kostas?','Kiel kostas?','Kiom kostas?','Kiu kostas?'],correta:2},
      {pergunta:'Qual é a terminação dos verbos no presente?',opcoes:['-is','-os','-as','-us'],correta:2},
    ]
  },
  11: {
    titulo:'Pasinteco',subtitulo:'Verbos no passado',icon:'⏮️',
    introducao:'No Esperanto, formar o passado é simples: basta trocar a terminação -as por -is. Sem exceções, sem verbos irregulares. Aprenda a contar o que aconteceu!',
    pronuncia:'Presente: -as (mi estas). Passado: -is (mi estis). É só trocar o "a" pelo "i"! Exemplos: Mi iris (eu fui), Ni manĝis (nós comemos), Ŝi venis (ela veio).',
    vocabulario:[
      {eo:'Estis',pt:'Foi / Era / Estava',ex:'Hieraŭ estis varme.'},
      {eo:'Iris',pt:'Foi (movimento)',ex:'Mi iris al la centro hieraŭ.'},
      {eo:'Venis',pt:'Veio',ex:'Li venis frue.'},
      {eo:'Faris',pt:'Fez',ex:'Ŝi faris bonegan laboron.'},
      {eo:'Havis',pt:'Teve',ex:'Ni havis belan kunvenon.'},
      {eo:'Parolis',pt:'Falou',ex:'Ili parolis pri la spiritismo.'},
      {eo:'Lernis',pt:'Aprendeu',ex:'Mi lernis multajn vortojn.'},
      {eo:'Vidis',pt:'Viu',ex:'Vi vidis la belajn stelojn.'},
      {eo:'Manĝis',pt:'Comeu',ex:'Ni manĝis kune hieraŭ.'},
      {eo:'Dormis',pt:'Dormiu',ex:'La infanoj dormis bone.'},
    ],
    dialogos:[{titulo:'O que aconteceu ontem',linhas:[
      {quem:'Maria',texto:'Kion vi faris hieraŭ?'},
      {quem:'João',texto:'Mi iris al la spiritisma centro kaj lernis multajn aferojn.'},
      {quem:'Maria',texto:'Ĉu vi parolis kun multaj homoj?'},
      {quem:'João',texto:'Jes! Ni havis tre interesan diskuton pri reenkarnado.'},
    ]}],
    exercicios:[
      {pergunta:'Qual é a terminação do passado em Esperanto?',opcoes:['-as','-is','-os','-us'],correta:1},
      {pergunta:'Como se diz "Eu fui" em Esperanto?',opcoes:['Mi iras','Mi iris','Mi iros','Mi iru'],correta:1},
      {pergunta:'O que significa "Ni manĝis"?',opcoes:['Nós comemos (passado)','Nós comemos (presente)','Nós comeremos','Nós estamos comendo'],correta:0},
      {pergunta:'Como se diz "Ela veio" no passado?',opcoes:['Ŝi venas','Ŝi venis','Ŝi venos','Ŝi venus'],correta:1},
    ]
  },
  12: {
    titulo:'Estonteco',subtitulo:'Verbos no futuro',icon:'⏩',
    introducao:'O futuro em Esperanto é igualmente simples: troque -as por -os! Com apenas três terminações você domina todos os tempos verbais do Esperanto.',
    pronuncia:'Presente: -as. Passado: -is. Futuro: -os. É só memorizar: as, is, os! Exemplos: Mi iros (eu irei), Ni faros (nós faremos), Vi vidos (você verá).',
    vocabulario:[
      {eo:'Estos',pt:'Será / Estará',ex:'Morgaŭ estos bela tago.'},
      {eo:'Iros',pt:'Irá',ex:'Mi iros al la centro morgaŭ.'},
      {eo:'Venos',pt:'Virá',ex:'Li venos baldaŭ.'},
      {eo:'Faros',pt:'Fará',ex:'Ni faros bonegan aferon.'},
      {eo:'Havos',pt:'Terá',ex:'Vi havos sukcesson.'},
      {eo:'Lernos',pt:'Aprenderá',ex:'Mi lernos Esperanton bone.'},
      {eo:'Parolos',pt:'Falará',ex:'Ni parolos Esperante baldaŭ.'},
      {eo:'Baldaŭ',pt:'Em breve',ex:'Baldaŭ ni renkontiĝos.'},
      {eo:'Poste',pt:'Depois',ex:'Poste mi faros tion.'},
      {eo:'Estonte',pt:'No futuro',ex:'Estonte ĉiuj parolos Esperante!'},
    ],
    dialogos:[{titulo:'Planos para o futuro',linhas:[
      {quem:'Ana',texto:'Kion vi faros morgaŭ?'},
      {quem:'Pedro',texto:'Mi iros al la biblioteko kaj lernos pli pri Esperanto.'},
      {quem:'Ana',texto:'Bonege! Ĉu vi venos al nia kunveno vendrede?'},
      {quem:'Pedro',texto:'Jes, mi venos! Ni parolos pri niaj progresoj.'},
    ]}],
    exercicios:[
      {pergunta:'Qual é a terminação do futuro em Esperanto?',opcoes:['-as','-is','-os','-us'],correta:2},
      {pergunta:'Como se diz "Eu irei" em Esperanto?',opcoes:['Mi iras','Mi iris','Mi iros','Mi iru'],correta:2},
      {pergunta:'O que significa "baldaŭ"?',opcoes:['Ontem','Hoje','Amanhã','Em breve'],correta:3},
      {pergunta:'Complete: presente -as, passado -is, futuro ___',opcoes:['-us','-os','-es','-is'],correta:1},
    ]
  },
  13: {
    titulo:'Sufiksoj',subtitulo:'Sufixos e prefixos',icon:'🔧',
    introducao:'O grande segredo do Esperanto! Com poucos sufixos e prefixos você cria milhares de palavras novas. Esta é uma das maiores vantagens da língua.',
    pronuncia:'Prefixo mal- indica o oposto: bona (bom) → malbona (mau), granda → malgranda, varma → malvarma. Sufixo -in indica feminino, -ist indica profissional, -ej indica lugar.',
    vocabulario:[
      {eo:'Mal- (oposto)',pt:'Contrário de',ex:'Bona → malbona (bom → mau)'},
      {eo:'-in (feminino)',pt:'Forma feminina',ex:'Frato → fratino (irmão → irmã)'},
      {eo:'-ist (profissional)',pt:'Profissional de',ex:'Muziko → muzikisto (músico)'},
      {eo:'-ej (lugar)',pt:'Lugar de',ex:'Lerni → lernejo (escola)'},
      {eo:'-aĵ (coisa)',pt:'Coisa / produto',ex:'Manĝi → manĝaĵo (comida)'},
      {eo:'-ul (pessoa)',pt:'Pessoa com característica',ex:'Bona → bonulo (bondoso)'},
      {eo:'-ar (conjunto)',pt:'Conjunto de',ex:'Arbo → arbaro (floresta)'},
      {eo:'-et (diminutivo)',pt:'Pequeno',ex:'Domo → dometo (casinha)'},
      {eo:'-eg (aumentativo)',pt:'Grande / intenso',ex:'Granda → grandega (enorme)'},
      {eo:'Re- (repetição)',pt:'Fazer de novo',ex:'Fari → refari (refazer)'},
    ],
    dialogos:[{titulo:'Criando palavras novas',linhas:[
      {quem:'Ana',texto:'Kio estas "spiritisto"?'},
      {quem:'Pedro',texto:'"Spirito" plus "-isto" — do so, spiritisto estas iu, kiu studas la spiritismon!'},
      {quem:'Ana',texto:'Saĝe! Kaj "spiritismo"?'},
      {quem:'Pedro',texto:'"Spirito" plus "-ismo" — la doktrino mem. Esperanto estas tiel logika!'},
    ]}],
    exercicios:[
      {pergunta:'O que significa o prefixo "mal-"?',opcoes:['Muito','Pouco','Oposto','Novamente'],correta:2},
      {pergunta:'Como se forma "escola" em Esperanto (lerni = aprender)?',opcoes:['Lernisto','Lernejo','Lernaĵo','Lernulo'],correta:1},
      {pergunta:'O que significa "-eg"?',opcoes:['Pequeno','Grande/intenso','Oposto','Lugar'],correta:1},
      {pergunta:'Como se diz "recomeçar" (komenci = começar)?',opcoes:['Komenco','Rekomenco','Rekomenco','Rekomenco'],correta:2},
    ]
  },
  14: {
    titulo:'Akuzativo',subtitulo:'O acusativo -n',icon:'🎯',
    introducao:'O acusativo é um dos conceitos mais importantes do Esperanto. O sufixo -n indica o objeto direto da frase, permitindo colocar as palavras em qualquer ordem!',
    pronuncia:'Em "Mi amas vin" (Eu te amo), "vin" tem -n porque é o objeto. "La kato manĝas la muson" — muson tem -n porque é o que foi comido. Adjetivos também recebem -n: "Mi vidas belan floron."',
    vocabulario:[
      {eo:'Objekto + -n',pt:'Objeto direto',ex:'Mi vidas la libron. (Eu vejo o livro)'},
      {eo:'Min',pt:'Me / A mim',ex:'Ŝi amas min.'},
      {eo:'Vin',pt:'Te / A você',ex:'Mi amas vin.'},
      {eo:'Lin / Ŝin',pt:'O / A (ele/ela)',ex:'Ni helpas lin.'},
      {eo:'Nin',pt:'Nos / A nós',ex:'Vi helpas nin.'},
      {eo:'Direkto + -n',pt:'Direção',ex:'Mi iras al la urbon. (Eu vou à cidade)'},
      {eo:'Homon',pt:'A pessoa (objeto)',ex:'Mi vidas la homon.'},
      {eo:'Libron',pt:'O livro (objeto)',ex:'Mi legas interesan libron.'},
      {eo:'Floron',pt:'A flor (objeto)',ex:'Li donas floron al ŝi.'},
      {eo:'Dankon',pt:'Obrigado (acusativo de danko)',ex:'Mi diras dankon al vi.'},
    ],
    dialogos:[{titulo:'Praticando o acusativo',linhas:[
      {quem:'Ana',texto:'Mi legas interesan libron pri spiritismo.'},
      {quem:'Pedro',texto:'Kian libron? Ĉu vi rekomendas ĝin al mi?'},
      {quem:'Ana',texto:'Jes! Mi rekomendas ĝin al ĉiuj. Ĝi helpas min kompreni la vivon.'},
      {quem:'Pedro',texto:'Bonege! Mi trovos ĝin kaj legos ĝin baldaŭ.'},
    ]}],
    exercicios:[
      {pergunta:'Para que serve o sufixo -n em Esperanto?',opcoes:['Indica plural','Indica objeto direto','Indica adjetivo','Indica passado'],correta:1},
      {pergunta:'Complete: "Mi amas ___" (te amo)',opcoes:['vi','vin','al vi','via'],correta:1},
      {pergunta:'Como se diz "Eu vejo o livro"?',opcoes:['Mi vidas libro','Mi vidas la libro','Mi vidas la libron','Mi vidas al libro'],correta:2},
      {pergunta:'Por que "dankon" tem -n?',opcoes:['É plural','É objeto direto (obrigado a você)','É adjetivo','É direção'],correta:1},
    ]
  },
  15: {
    titulo:'Esprimoj',subtitulo:'Expressões do cotidiano',icon:'💬',
    introducao:'Aprenda expressões úteis para o dia a dia em Esperanto. Estas frases vão ajudá-lo a soar mais natural nas conversações!',
    pronuncia:'Expressões fixas são importantes em qualquer idioma. Em Esperanto, muitas expressões seguem padrões lógicos, mas algumas são convencionadas pelo uso. Aprenda-as como um bloco!',
    vocabulario:[
      {eo:'Ĝojan feston!',pt:'Feliz festa / Parabéns!',ex:'Ĝojan naskiĝtagon!'},
      {eo:'Bonan apetiton!',pt:'Bom apetite!',ex:'Bonan apetiton al ĉiuj!'},
      {eo:'Feliĉan novjaron!',pt:'Feliz Ano Novo!',ex:'Feliĉan novjaron, amikoj!'},
      {eo:'Kion nova?',pt:'O que há de novo?',ex:'Saluton! Kion nova ĉe vi?'},
      {eo:'Nenion specialan',pt:'Nada especial',ex:'Nenion specialan, dankon.'},
      {eo:'Laŭ mia opinio',pt:'Na minha opinião',ex:'Laŭ mia opinio, ĝi estas bona ideo.'},
      {eo:'Kompreneble!',pt:'Claro! / Naturalmente!',ex:'Kompreneble mi helpos vin!'},
      {eo:'Bedaŭrinde',pt:'Infelizmente',ex:'Bedaŭrinde mi ne povas veni.'},
      {eo:'Eble',pt:'Talvez / Possivelmente',ex:'Eble ni renkontiĝos morgaŭ.'},
      {eo:'Tamen',pt:'Porém / No entanto',ex:'Estas malfacile, tamen mi provos.'},
    ],
    dialogos:[{titulo:'Conversa informal',linhas:[
      {quem:'Ana',texto:'Saluton Pedro! Kion nova?'},
      {quem:'Pedro',texto:'Nenion specialan. Tamen mi lernis multajn novajn vortojn en Esperanto!'},
      {quem:'Ana',texto:'Kompreneble! Vi estas tre diligenta. Ĉu vi venos al la kunveno?'},
      {quem:'Pedro',texto:'Eble. Bedaŭrinde mi havas multan laboron. Tamen mi provos!'},
    ]}],
    exercicios:[
      {pergunta:'O que significa "kompreneble"?',opcoes:['Talvez','Infelizmente','Claro/Naturalmente','Porém'],correta:2},
      {pergunta:'Como se deseja "Bom apetite" em Esperanto?',opcoes:['Bonan tagon!','Bonan apetiton!','Ĝojan feston!','Bonan nokton!'],correta:1},
      {pergunta:'O que significa "bedaŭrinde"?',opcoes:['Claro','Talvez','Infelizmente','No entanto'],correta:2},
      {pergunta:'Como se diz "Na minha opinião"?',opcoes:['Laŭ mia opinio','Mia opinio','En mia kapo','Mi pensas ke'],correta:0},
    ]
  },
  16: {
    titulo:'Legado',subtitulo:'Leitura de textos',icon:'📖',
    introducao:'Chegou a hora de ler textos em Esperanto! Vamos praticar a leitura com textos simples relacionados à doutrina espírita e à fraternidade universal.',
    pronuncia:'Ao ler, lembre: cada letra tem um som fixo. O "c" soa como "ts", o "ĉ" como "tch", o "ŝ" como "sh". Leia devagar e com atenção à pronúncia de cada sílaba.',
    vocabulario:[
      {eo:'Legi',pt:'Ler',ex:'Mi legas libron pri spiritismo.'},
      {eo:'Skribi',pt:'Escrever',ex:'Ŝi skribas leteron al sia amiko.'},
      {eo:'Kompreni',pt:'Entender / Compreender',ex:'Ĉu vi komprenas ĉi tiun tekston?'},
      {eo:'Traduki',pt:'Traduzir',ex:'Mi tradukas la libron al Esperanto.'},
      {eo:'Vorto',pt:'Palavra',ex:'Mi lernas novajn vortojn ĉiutage.'},
      {eo:'Frazo',pt:'Frase',ex:'Ĉi tiu frazo estas facila.'},
      {eo:'Teksto',pt:'Texto',ex:'La teksto estas interesa.'},
      {eo:'Libro',pt:'Livro',ex:'Mi amas legi librojn.'},
      {eo:'Historio',pt:'História',ex:'La historio de Esperanto estas fascinanta.'},
      {eo:'Rakonto',pt:'Conto / Narrativa',ex:'Li rakontis belan rakonton.'},
    ],
    dialogos:[{titulo:'Texto para leitura: Pri Esperanto',linhas:[
      {quem:'Teksto',texto:'Esperanto estas internacia lingvo, kreita de Ludoviko Lazaro Zamenhof en 1887.'},
      {quem:'Teksto',texto:'La celo de Esperanto estas faciligi komunikadon inter homoj de diversaj landoj.'},
      {quem:'Teksto',texto:'Hodiaŭ, milionoj da homoj en la tuta mondo parolas Esperanton.'},
      {quem:'Teksto',texto:'Ĉiuj estas bonvenaj en la Esperanto-komunumo!'},
    ]}],
    exercicios:[
      {pergunta:'O que significa "kompreni"?',opcoes:['Ler','Escrever','Entender','Traduzir'],correta:2},
      {pergunta:'Como se diz "livro" em Esperanto?',opcoes:['Vorto','Teksto','Frazo','Libro'],correta:3},
      {pergunta:'O que significa "traduki"?',opcoes:['Escrever','Traduzir','Ler','Falar'],correta:1},
      {pergunta:'Quem criou o Esperanto?',opcoes:['Allan Kardec','Chico Xavier','Zamenhof','Léon Denis'],correta:2},
    ]
  },
  17: {
    titulo:'Kulturo',subtitulo:'Cultura Esperantista',icon:'🌍',
    introducao:'O Esperanto tem uma cultura rica e vibrante! Aprenda sobre o movimento, os encontros mundiais, as tradições e os valores que unem os esperantistas do mundo todo.',
    pronuncia:'Vocabulário cultural importante: Esperantisto (esperantista), Universala Kongreso (Congresso Universal), Verda Stelo (Estrela Verde), Homaranismo (filosofia de Zamenhof de fraternidade humana).',
    vocabulario:[
      {eo:'Esperantisto',pt:'Esperantista',ex:'Mi estas esperantisto ekde du jaroj.'},
      {eo:'Kongreso',pt:'Congresso',ex:'La Universala Kongreso okazas ĉiujare.'},
      {eo:'Renkontiĝo',pt:'Encontro',ex:'Ni havas renkontiĝon ĉiun monaton.'},
      {eo:'Komunumo',pt:'Comunidade',ex:'La Esperanto-komunumo estas granda familio.'},
      {eo:'Kulturo',pt:'Cultura',ex:'Esperanto havas propran kulturon.'},
      {eo:'Muziko',pt:'Música',ex:'Estas multa muziko en Esperanto.'},
      {eo:'Poezio',pt:'Poesia',ex:'Zamenhof amis poezion.'},
      {eo:'Amikeco',pt:'Amizade',ex:'Amikeco estas grava valoro en Esperanto.'},
      {eo:'Paco',pt:'Paz',ex:'Ni batalas por paco en la mondo.'},
      {eo:'Frateco',pt:'Fraternidade',ex:'Frateco estas la koro de Esperanto.'},
    ],
    dialogos:[{titulo:'Sobre o movimento esperantista',linhas:[
      {quem:'Ana',texto:'Ĉu vi jam iris al Universala Kongreso?'},
      {quem:'Pedro',texto:'Ne ankoraŭ, sed mi volas iri! Estas esperantistoj el la tuta mondo!'},
      {quem:'Ana',texto:'Jes! Oni parolas nur Esperante tie. Estas mirinda sperto.'},
      {quem:'Pedro',texto:'Mi esperas iri la venontan jaron. La frateco tie estas vera!'},
    ]}],
    exercicios:[
      {pergunta:'O que é o "Universala Kongreso"?',opcoes:['Um dicionário','O Congresso Universal de Esperanto','Um livro de gramática','Uma rádio'],correta:1},
      {pergunta:'O que significa "frateco"?',opcoes:['Paz','Amizade','Fraternidade','Comunidade'],correta:2},
      {pergunta:'Como se chama quem fala Esperanto?',opcoes:['Esperantano','Esperantulo','Esperantisto','Esperantano'],correta:2},
      {pergunta:'Quem foi Zamenhof?',opcoes:['Um espírita','O criador do Esperanto','Um músico','Um político'],correta:1},
    ]
  },
  18: {
    titulo:'Skribo',subtitulo:'Escrita e redação',icon:'✍️',
    introducao:'Aprenda a escrever em Esperanto! Vamos praticar a escrita de mensagens, e-mails e textos curtos. A escrita em Esperanto segue regras muito consistentes.',
    pronuncia:'Na escrita, preste atenção às letras especiais: ĉ, ĝ, ĥ, ĵ, ŝ, ŭ. Cada uma tem um som específico. Se não tiver o teclado especial, use ch, gh, hh, jh, sh, u para substituir.',
    vocabulario:[
      {eo:'Letero',pt:'Carta / E-mail',ex:'Mi skribas leteron al mia amiko.'},
      {eo:'Mesaĝo',pt:'Mensagem',ex:'Mi sendis mesaĝon al vi.'},
      {eo:'Kara...',pt:'Querido(a)... (início de carta)',ex:'Kara amiko, mi skribas al vi...'},
      {eo:'Amike',pt:'Amigavelmente (despedida)',ex:'Amike, João'},
      {eo:'Teme de',pt:'Assunto / Tema de',ex:'Teme de: Nia renkontiĝo'},
      {eo:'Komenci',pt:'Começar',ex:'Mi komencas mian leteron.'},
      {eo:'Fini',pt:'Terminar',ex:'Mi finas mian mesaĝon.'},
      {eo:'Sendi',pt:'Enviar',ex:'Mi sendas ĉi tiun leteron al vi.'},
      {eo:'Ricevi',pt:'Receber',ex:'Ĉu vi ricevis mian mesaĝon?'},
      {eo:'Respondi',pt:'Responder',ex:'Bonvolu respondi al mia letero.'},
    ],
    dialogos:[{titulo:'Exemplo de carta em Esperanto',linhas:[
      {quem:'João',texto:'Kara Ana, mi skribas al vi por diri, ke mi tre ĝuis nian lastan renkontiĝon.'},
      {quem:'João',texto:'Ni parolis pri tiaj gravaj temoj — spiritismo, Esperanto kaj frateco.'},
      {quem:'João',texto:'Mi esperas, ke ni denove renkontiĝos baldaŭ.'},
      {quem:'João',texto:'Amike, João'},
    ]}],
    exercicios:[
      {pergunta:'Como se começa uma carta formal em Esperanto?',opcoes:['Saluton!','Kara...','Bonan tagon','Ĝis revido'],correta:1},
      {pergunta:'O que significa "sendi"?',opcoes:['Receber','Escrever','Enviar','Responder'],correta:2},
      {pergunta:'Como se despede amigavelmente numa carta?',opcoes:['Dankon','Ĝis revido','Amike','Pardonu'],correta:2},
      {pergunta:'O que significa "ricevi"?',opcoes:['Enviar','Receber','Escrever','Ler'],correta:1},
    ]
  },
  19: {
    titulo:'Vortprovizo',subtitulo:'Vocabulário avançado',icon:'📚',
    introducao:'Amplie seu vocabulário com palavras e expressões mais sofisticadas. Nesta lição você aprenderá termos relacionados ao pensamento, às emoções e à vida espiritual em Esperanto.',
    pronuncia:'Palavras compostas em Esperanto são formadas juntando raízes: "spirito" + "isma" = spiritisma (espírita). "Hom" + "aro" = homaro (humanidade). A lógica é sempre consistente!',
    vocabulario:[
      {eo:'Animo',pt:'Alma',ex:'La animo estas eterna.'},
      {eo:'Spirito',pt:'Espírito',ex:'La spirito evoluas tra multaj vivoj.'},
      {eo:'Evoluo',pt:'Evolução',ex:'La spirita evoluo estas senfina.'},
      {eo:'Karmo',pt:'Karma / Lei de causa e efeito',ex:'La karmo estas justa leĝo.'},
      {eo:'Reenkarnado',pt:'Reencarnação',ex:'Reenkarnado estas la reveno al nova vivo.'},
      {eo:'Amo',pt:'Amor',ex:'Amo estas la plej alta leĝo.'},
      {eo:'Saĝo',pt:'Sabedoria',ex:'La saĝo venas per sperto.'},
      {eo:'Lumo',pt:'Luz',ex:'La lumo de la vero gvidas nin.'},
      {eo:'Homaro',pt:'Humanidade',ex:'Ni servas la tutan homaron.'},
      {eo:'Progreso',pt:'Progresso',ex:'Ĉiu spirito progresas laŭ siaj penoj.'},
    ],
    dialogos:[{titulo:'Filosofia espírita em Esperanto',linhas:[
      {quem:'Ana',texto:'Kio estas la celo de la homa vivo, laŭ la spiritismo?'},
      {quem:'Pedro',texto:'Laŭ Kardec, la celo estas la spirita evoluo — iĝi pli bona kaj pli saĝa.'},
      {quem:'Ana',texto:'Kaj kiel ni progresas?'},
      {quem:'Pedro',texto:'Per amo, karitato kaj la leĝo de kaŭzo kaj efiko — tio, kion ni semas, ni rikoltas!'},
    ]}],
    exercicios:[
      {pergunta:'Como se diz "alma" em Esperanto?',opcoes:['Spirito','Animo','Lumo','Saĝo'],correta:1},
      {pergunta:'O que significa "homaro"?',opcoes:['Homem','Humanidade','Comunidade','Família'],correta:1},
      {pergunta:'Como se diz "reencarnação" em Esperanto?',opcoes:['Karmo','Evoluo','Reenkarnado','Spiritismo'],correta:2},
      {pergunta:'O que significa "saĝo"?',opcoes:['Amor','Luz','Sabedoria','Paz'],correta:2},
    ]
  },
  20: {
    titulo:'Libera Babilado',subtitulo:'Conversa livre',icon:'🏆',
    introducao:'Parabéns! Você chegou à última lição! Agora é hora de usar tudo que aprendeu numa conversa livre. Esta lição é diferente — sem exercícios fixos, apenas vocabulário útil para conversar.',
    pronuncia:'Você domina os fundamentos do Esperanto! Lembre: presente (-as), passado (-is), futuro (-os). Adjetivos (-a), objetos (-n), plural (-j). Use esses padrões com confiança!',
    vocabulario:[
      {eo:'Mi ŝatas...',pt:'Eu gosto de...',ex:'Mi ŝatas lerni Esperanton.'},
      {eo:'Laŭ mi...',pt:'Na minha opinião...',ex:'Laŭ mi, Esperanto estas bela lingvo.'},
      {eo:'Mi pensas, ke...',pt:'Eu acho que...',ex:'Mi pensas, ke ni progresas bone.'},
      {eo:'Ĉu vi konsentas?',pt:'Você concorda?',ex:'Ĉu vi konsentas kun mi?'},
      {eo:'Mi konsentas',pt:'Eu concordo',ex:'Jes, mi plene konsentas!'},
      {eo:'Mi ne konsentas',pt:'Eu discordo',ex:'Bedaŭrinde, mi ne konsentas.'},
      {eo:'Interesa!',pt:'Interessante!',ex:'Tio estas tre interesa!'},
      {eo:'Mirinde!',pt:'Maravilhoso!',ex:'La vivo estas mirinda!'},
      {eo:'Mi gratulas vin!',pt:'Eu te parabenizo!',ex:'Mi gratulas vin pro via progreso!'},
      {eo:'Ĝis la revido!',pt:'Até a próxima!',ex:'Ĝis la revido, esperantisto!'},
    ],
    dialogos:[{titulo:'Conversa final — celebrando o aprendizado',linhas:[
      {quem:'Johano',texto:'Gratulojn! Vi finis la kurson de Esperanto en Johano!'},
      {quem:'Studento',texto:'Dankon, Johano! Estas mirinde, kion mi lernis!'},
      {quem:'Johano',texto:'Laŭ mi, vi progresis tre bone. Ĉu vi ŝatas Esperanton?'},
      {quem:'Studento',texto:'Jes, mi amas ĝin! Mi pensas, ke Esperanto estas la lingvo de la homaro.'},
      {quem:'Johano',texto:'Mi plene konsentas! Daŭrigu praktiki en nia babilejo. Ĝis la revido!'},
      {quem:'Studento',texto:'Ĝis la revido, Johano! Dankon pro ĉio!'},
    ]}],
    exercicios:[
      {pergunta:'Como se diz "Eu gosto de" em Esperanto?',opcoes:['Mi volas','Mi amas','Mi ŝatas','Mi havas'],correta:2},
      {pergunta:'O que significa "mi konsentas"?',opcoes:['Eu discordo','Eu concordo','Eu entendo','Eu gosto'],correta:1},
      {pergunta:'Como parabenizar alguém em Esperanto?',opcoes:['Dankon!','Mirinde!','Gratulojn!','Bonege!'],correta:2},
      {pergunta:'Como se despedir até a próxima em Esperanto?',opcoes:['Ĝis revido','Bonan nokton','Ĝis la revido','Dankon'],correta:2},
    ]
  },
}

function speak(texto) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(texto)
  utt.lang = 'eo'
  utt.rate = 0.85
  window.speechSynthesis.speak(utt)
}

export default function EsperantoLicao() {
  const { numero } = useParams()
  const navigate = useNavigate()
  const num = parseInt(numero)
  const licao = licoes[num]
  const [aba, setAba] = useState('vocabulario')
  const [exercicioAtual, setExercicioAtual] = useState(0)
  const [respostaSelecionada, setRespostaSelecionada] = useState(null)
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [acertos, setAcertos] = useState(0)
  const [exercicioConcluido, setExercicioConcluido] = useState(false)
  const [licaoConcluida, setLicaoConcluida] = useState(false)
  const [falando, setFalando] = useState(null)

  useEffect(() => { window.speechSynthesis.getVoices() }, [])

  if (!licao) {
    return (
      <div style={{ fontFamily:"'Crimson Pro',Georgia,serif" }}>
        <Nav />
        <div style={{ padding:'48px 32px', textAlign:'center' }}>
          <h2 style={{ fontFamily:"'Cinzel',serif", color:'#1a3a6b', marginBottom:'16px' }}>Lição em construção</h2>
          <p style={{ color:'#666', marginBottom:'24px' }}>Esta lição ainda está sendo preparada. Volte em breve!</p>
          <button onClick={()=>navigate('/esperanto/aprender')} style={{ background:'#1a3a6b', color:'#fff', border:'none', borderRadius:'4px', padding:'10px 20px', fontFamily:"'Cinzel',serif", fontSize:'13px', cursor:'pointer' }}>← Voltar ao curso</button>
        </div>
      </div>
    )
  }

  const falar = (texto, id) => {
    setFalando(id)
    speak(texto)
    setTimeout(() => setFalando(null), 2000)
  }

  const responder = (idx) => {
    if (mostrarResultado) return
    setRespostaSelecionada(idx)
    setMostrarResultado(true)
    if (idx === licao.exercicios[exercicioAtual].correta) setAcertos(a => a+1)
  }

  const proximoExercicio = () => {
    if (exercicioAtual < licao.exercicios.length - 1) {
      setExercicioAtual(e => e+1)
      setRespostaSelecionada(null)
      setMostrarResultado(false)
    } else {
      setExercicioConcluido(true)
    }
  }

  const concluirLicao = () => {
    const progresso = JSON.parse(localStorage.getItem('johano_eo_progresso') || '{}')
    progresso[num] = 'completo'
    localStorage.setItem('johano_eo_progresso', JSON.stringify(progresso))
    setLicaoConcluida(true)
  }

  const ex = licao.exercicios[exercicioAtual]

  return (
    <div style={{ fontFamily:"'Crimson Pro',Georgia,serif", background:'#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Crimson+Pro:ital,wght@0,300;0,400;1,400&display=swap');
        *{box-sizing:border-box;}
        .el-tabs{display:flex;border-bottom:1px solid #e0d8c8;padding:0 32px;overflow-x:auto;scrollbar-width:none;}
        .el-tabs::-webkit-scrollbar{display:none;}
        .el-tab{padding:13px 20px;font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.06em;cursor:pointer;border-bottom:2px solid transparent;background:transparent;border-top:none;border-left:none;border-right:none;color:#666;white-space:nowrap;}
        .el-tab.active{color:#1a3a6b;border-bottom-color:#1a3a6b;}
        .el-sec{padding:32px 32px 48px;max-width:800px;}
        .el-voc-item{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid #f0ece4;}
        .el-speak-btn{width:32px;height:32px;border-radius:50%;background:#eef2f8;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;transition:all 0.2s;}
        .el-speak-btn:hover{background:#1a3a6b;color:#fff;}
        .el-speak-btn.falando{background:#c9a650;}
        .el-dialog{background:#f8f6f2;border-radius:8px;padding:20px;margin-bottom:20px;}
        .el-ex-card{background:#f8f6f2;border-radius:8px;padding:24px;}
        .el-opcao{width:100%;text-align:left;padding:12px 16px;margin-bottom:8px;border:1px solid #e0d8c8;border-radius:6px;background:#fff;cursor:pointer;font-family:'Crimson Pro',Georgia,serif;font-size:15px;color:#333;transition:all 0.2s;}
        .el-opcao:hover:not(:disabled){border-color:#1a3a6b;background:#eef2f8;}
        .el-opcao.correta{border-color:#3b6d11 !important;background:#eaf3de !important;color:#3b6d11 !important;}
        .el-opcao.errada{border-color:#c00 !important;background:#fcebeb !important;color:#c00 !important;}
        @media(max-width:768px){
          .el-tabs{padding:0 16px;}
          .el-sec{padding:20px 16px 36px;}
        }
      `}</style>

      <Nav />

      <div style={{ background:'linear-gradient(135deg,#1a3a6b,#2a5aad)', padding:'36px 32px', color:'#fff' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
          <button onClick={()=>navigate('/esperanto/aprender')} style={{ background:'rgba(255,255,255,0.15)', border:'none', borderRadius:'4px', padding:'6px 12px', color:'#fff', cursor:'pointer', fontSize:'13px' }}>← Voltar ao curso</button>
          <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)' }}>Lição {num} de 20</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px' }}>
          <span style={{ fontSize:'36px' }}>{licao.icon}</span>
          <div>
            <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'26px', fontWeight:600, letterSpacing:'0.06em', marginBottom:'2px' }}>{licao.titulo}</h1>
            <p style={{ fontSize:'14px', color:'#c9a650', fontStyle:'italic' }}>{licao.subtitulo}</p>
          </div>
        </div>
        <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.75)', lineHeight:1.8, fontWeight:300, maxWidth:'600px' }}>{licao.introducao}</p>
      </div>

      <div className="el-tabs">
        {[['vocabulario','📖 Vocabulário'],['pronuncia','🔊 Pronúncia'],['dialogos','💬 Diálogo'],['exercicios','✏️ Exercícios']].map(([id,label]) => (
          <button key={id} className={`el-tab${aba===id?' active':''}`} onClick={()=>setAba(id)}>{label}</button>
        ))}
      </div>

      {aba==='vocabulario' && (
        <div className="el-sec">
          <p style={{ fontSize:'13px', color:'#aaa', marginBottom:'16px', fontStyle:'italic' }}>Clique em 🔊 para ouvir a pronúncia</p>
          {licao.vocabulario.map((v,i) => (
            <div className="el-voc-item" key={i}>
              <button className={`el-speak-btn${falando===i?' falando':''}`} onClick={()=>falar(v.eo, i)}>🔊</button>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', color:'#1a3a6b', minWidth:'180px' }}>{v.eo}</span>
              <span style={{ fontSize:'14px', color:'#666', flex:1 }}>{v.pt}</span>
              <span style={{ fontSize:'12px', color:'#aaa', fontStyle:'italic', flex:1 }}>{v.ex}</span>
            </div>
          ))}
          <div style={{ marginTop:'20px', padding:'16px', background:'#f8f6f2', borderRadius:'6px', border:'1px solid #e0d8c8' }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'8px' }}>📢 Dica de pronúncia</p>
            <p style={{ fontSize:'13.5px', color:'#666', lineHeight:1.7, fontWeight:300 }}>{licao.pronuncia}</p>
          </div>
          <div style={{ marginTop:'16px', background:'#eef2f8', border:'1px solid #d0d8e8', borderRadius:'8px', padding:'16px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px' }}>
            <div>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'3px' }}>Pronto com o vocabulário?</p>
              <p style={{ fontSize:'12px', color:'#888', fontWeight:300 }}>Próximo passo: ouça a pronúncia de cada palavra</p>
            </div>
            <button onClick={()=>setAba('pronuncia')} style={{ background:'#1a3a6b', color:'#fff', border:'none', borderRadius:'4px', padding:'12px 24px', fontFamily:"'Cinzel',serif", fontSize:'13px', letterSpacing:'0.06em', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>🔊 Pronúncia →</button>
          </div>

        </div>
      )}

      {aba==='pronuncia' && (
        <div className="el-sec">
          <div style={{ background:'#f8f6f2', borderRadius:'8px', padding:'24px', marginBottom:'20px' }}>
            <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'15px', color:'#1a3a6b', marginBottom:'10px' }}>Como pronunciar</h3>
            <p style={{ fontSize:'15px', color:'#555', lineHeight:1.85, fontWeight:300 }}>{licao.pronuncia}</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:'10px' }}>
            {licao.vocabulario.map((v,i) => (
              <div key={i} onClick={()=>falar(v.eo, i)} style={{ padding:'14px', background:falando===i?'#1a3a6b':'#f8f6f2', borderRadius:'6px', border:'1px solid #e0d8c8', cursor:'pointer', textAlign:'center' }}>
                <div style={{ fontSize:'22px', marginBottom:'6px' }}>🔊</div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:falando===i?'#c9a650':'#1a3a6b' }}>{v.eo}</div>
                <div style={{ fontSize:'11px', color:falando===i?'rgba(255,255,255,0.7)':'#aaa', marginTop:'3px' }}>{v.pt}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:'16px', background:'#eef2f8', border:'1px solid #d0d8e8', borderRadius:'8px', padding:'16px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px' }}>
            <div>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'3px' }}>Pronúncia praticada?</p>
              <p style={{ fontSize:'12px', color:'#888', fontWeight:300 }}>Próximo passo: leia e ouça os diálogos</p>
            </div>
            <button onClick={()=>setAba('dialogos')} style={{ background:'#1a3a6b', color:'#fff', border:'none', borderRadius:'4px', padding:'12px 24px', fontFamily:"'Cinzel',serif", fontSize:'13px', letterSpacing:'0.06em', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>💬 Diálogo →</button>
          </div>
        </div>
      )}

      {aba==='dialogos' && (
        <div className="el-sec">
          {licao.dialogos.map((d,di) => (
            <div className="el-dialog" key={di}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'14px' }}>📖 {d.titulo}</p>
              {d.linhas.map((l,li) => (
                <div key={li} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'10px' }}>
                  <span style={{ fontSize:'11px', fontWeight:600, color:'#1a3a6b', minWidth:'60px', paddingTop:'2px' }}>{l.quem}:</span>
                  <span style={{ fontSize:'15px', color:'#333', fontStyle:'italic', flex:1 }}>{l.texto}</span>
                  <button className={`el-speak-btn${falando===`${di}-${li}`?' falando':''}`} onClick={()=>falar(l.texto, `${di}-${li}`)}>🔊</button>
                </div>
              ))}
            </div>
          ))}
          <div style={{ padding:'14px', background:'#f8f6f2', borderRadius:'6px', border:'1px solid #e0d8c8', marginBottom:'12px' }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'6px' }}>💡 Dica</p>
            <p style={{ fontSize:'13px', color:'#555', fontWeight:300 }}>Leia o diálogo em voz alta antes de ouvir. Compare sua pronúncia com o áudio!</p>
          </div>
          <div style={{ background:'#eef2f8', border:'1px solid #d0d8e8', borderRadius:'8px', padding:'16px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px' }}>
            <div>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', marginBottom:'3px' }}>Diálogo praticado?</p>
              <p style={{ fontSize:'12px', color:'#888', fontWeight:300 }}>Próximo passo: teste seus conhecimentos</p>
            </div>
            <button onClick={()=>setAba('exercicios')} style={{ background:'#c9a650', color:'#1a3a6b', border:'none', borderRadius:'4px', padding:'12px 24px', fontFamily:"'Cinzel',serif", fontSize:'13px', letterSpacing:'0.06em', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, fontWeight:600 }}>✏️ Exercícios →</button>
          </div>

        </div>
      )}

      {aba==='exercicios' && (
        <div className="el-sec">
          {!exercicioConcluido ? (
            <div className="el-ex-card">
              <p style={{ fontSize:'11px', letterSpacing:'0.14em', color:'#aaa', textTransform:'uppercase', marginBottom:'8px' }}>Questão {exercicioAtual+1} de {licao.exercicios.length}</p>
              <div style={{ height:'4px', background:'#e0d8c8', borderRadius:'2px', marginBottom:'20px' }}>
                <div style={{ height:'100%', width:`${(exercicioAtual/licao.exercicios.length)*100}%`, background:'#c9a650', borderRadius:'2px', transition:'width 0.3s' }}></div>
              </div>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'17px', color:'#1a3a6b', marginBottom:'20px', lineHeight:1.4 }}>{ex.pergunta}</p>
              {ex.opcoes.map((op,i) => (
                <button key={i} className={`el-opcao${mostrarResultado&&i===ex.correta?' correta':mostrarResultado&&i===respostaSelecionada&&i!==ex.correta?' errada':''}`} onClick={()=>responder(i)} disabled={mostrarResultado}>{op}</button>
              ))}
              {mostrarResultado && (
                <div style={{ marginTop:'16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <p style={{ fontSize:'14px', color:respostaSelecionada===ex.correta?'#3b6d11':'#c00', fontWeight:500 }}>
                    {respostaSelecionada===ex.correta ? '✅ Correto!' : `❌ Resposta: ${ex.opcoes[ex.correta]}`}
                  </p>
                  <button onClick={proximoExercicio} style={{ background:'#1a3a6b', color:'#fff', border:'none', borderRadius:'4px', padding:'10px 20px', fontFamily:"'Cinzel',serif", fontSize:'12px', cursor:'pointer' }}>
                    {exercicioAtual < licao.exercicios.length-1 ? 'Próxima →' : 'Ver resultado →'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'40px 24px', background:'#f8f6f2', borderRadius:'8px' }}>
              {!licaoConcluida ? (
                <>
                  <div style={{ fontSize:'56px', marginBottom:'16px' }}>{acertos===licao.exercicios.length?'🏆':acertos>=licao.exercicios.length/2?'⭐':'📖'}</div>
                  <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', color:'#1a3a6b', marginBottom:'8px' }}>{acertos}/{licao.exercicios.length} acertos</h3>
                  <p style={{ fontSize:'15px', color:'#666', marginBottom:'24px', fontWeight:300 }}>
                    {acertos===licao.exercicios.length?'Perfeito! Você dominou esta lição!':acertos>=licao.exercicios.length/2?'Muito bem! Continue praticando.':'Continue estudando e tente novamente!'}
                  </p>
                  <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
                    <button onClick={()=>{ setExercicioAtual(0); setRespostaSelecionada(null); setMostrarResultado(false); setAcertos(0); setExercicioConcluido(false) }} style={{ background:'transparent', border:'1px solid #e0d8c8', borderRadius:'4px', padding:'10px 20px', fontFamily:"'Cinzel',serif", fontSize:'12px', cursor:'pointer', color:'#666' }}>Tentar novamente</button>
                    <button onClick={concluirLicao} style={{ background:'#1a3a6b', color:'#fff', border:'none', borderRadius:'4px', padding:'10px 20px', fontFamily:"'Cinzel',serif", fontSize:'12px', cursor:'pointer' }}>✅ Concluir lição</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize:'56px', marginBottom:'16px' }}>🎉</div>
                  <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', color:'#1a3a6b', marginBottom:'8px' }}>Lição {num} concluída!</h3>
                  <p style={{ fontSize:'15px', color:'#666', marginBottom:'24px', fontWeight:300 }}>Parabéns! Seu progresso foi salvo.</p>
                  <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
                    <button onClick={()=>navigate('/esperanto/aprender')} style={{ background:'transparent', border:'1px solid #e0d8c8', borderRadius:'4px', padding:'10px 20px', fontFamily:"'Cinzel',serif", fontSize:'12px', cursor:'pointer', color:'#666' }}>← Voltar ao curso</button>
                    {num < 20 && <button onClick={()=>navigate(`/esperanto/licao/${num+1}`)} style={{ background:'#1a3a6b', color:'#fff', border:'none', borderRadius:'4px', padding:'10px 20px', fontFamily:"'Cinzel',serif", fontSize:'12px', cursor:'pointer' }}>Próxima lição →</button>}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <footer style={{ padding:'28px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #e0d8c8', background:'#f8f6f2', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'#1a3a6b', letterSpacing:'0.1em' }}>✦ JOHANO</div>
        <div style={{ display:'flex', gap:'10px' }}>
          {num > 1 && <button onClick={()=>navigate(`/esperanto/licao/${num-1}`)} style={{ background:'transparent', border:'1px solid #e0d8c8', borderRadius:'4px', padding:'6px 12px', fontSize:'12px', color:'#666', cursor:'pointer' }}>← Anterior</button>}
          {num < 20 && <button onClick={()=>navigate(`/esperanto/licao/${num+1}`)} style={{ background:'#1a3a6b', border:'none', borderRadius:'4px', padding:'6px 12px', fontSize:'12px', color:'#fff', cursor:'pointer' }}>Próxima →</button>}
        </div>
      </footer>
    </div>
  )
}
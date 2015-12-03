/**USAGE: 
 *  pt-br: glossary.UI.start['pt_BR'] ou glossary.UI.start[language]
 *  var language possui o idioma usado pelo device e selecionado pelo usuário
 */ 
var glossary = {
  UI: {
		startA: { //glossary.UI.startA[language]
      pt_BR: '[JOGO-A]',
      en_US: '[GAME-A]'
    },
		startB: { //glossary.UI.startB[language]
      pt_BR: '[JOGO-B]',
      en_US: '[GAME-B]'
    },
		tutorial: { //glossary.UI.tutorial[language]
      pt_BR: '[TUTORIAL]',
      en_US: '[TUTORIAL]'
    },
		settings: { //glossary.UI.settings[language]
      pt_BR: '[OPÇÕES]',
      en_US: '[SETTINGS]'
    },
		credits: { //glossary.UI.credits[language]
      pt_BR: '[CRÉDITOS]',
      en_US: '[CREDITS]'
    },
    optionsTitle :{ //glossary.UI.optionsTitle[language]
      pt_BR: 'MENU DE OPÇÕES',
      en_US: 'SETTINGS MENU'
    },
    optionsTxt :{ //glossary.UI.optionsTxt[language]
      pt_BR: 'EFEITOS SONOROS\n\n\n\n\nREGIÃO/REGION\n\n\n\n\nVIBRAÇÃO\n\n\n\n\nRESETAR PLACAR',
      en_US: 'SOUND EFFECTS\n\n\n\n\nREGIÃO/REGION\n\n\n\n\nVIBRATION\n\n\n\n\nRESET HI-SCORE'
    },
    firstRunSetupTitle :{ //glossary.UI.firstRunSetupTitle[language]
      all: 'INITIAL SETUP'
    },
    firstRunSetupTxt :{ //glossary.UI.firstRunSetupTxt['all']
      all: 'SOM/SOUND?\n\n\n\n\nIDIOMA/LANGUAGE\n\n\n\n\nVIBRAR/VIBRATE?',
    },
    menuTitleA :{ //glossary.UI.menuTitleA[language]
      pt_BR: 'MODO INFINITO',
      en_US: 'ENDLESS GAME'
    },
    menuTitleB :{ //glossary.UI.menuTitleB[language]
      pt_BR: 'MODO CARAVANA',
      en_US: 'CARAVAN GAME'
    },
    menuTxt :{ //glossary.UI.optionsTxt[language]
      pt_BR: 'MÚSICA\n\n\n\n\nPERSONAGEM',
      en_US: 'MUSIC\n\n\n\n\nCHARACTER'
    },
    sim :{ //glossary.UI.sim[language]
      pt_BR: '[SIM]',
      en_US: '[YES]'
    },
    nao :{ //glossary.UI.nao[language]
      pt_BR: '[NÃO]',
      en_US: '[NO]'
    },
    salvar :{ //glossary.UI.salvar[language]
      pt_BR: '[SALVAR]',
      en_US: '[SAVE]'
    },
    voltar :{ //glossary.UI.voltar[language]
      pt_BR: '[VOLTAR]',
      en_US: '[BACK]'
    },
    jogar :{ //glossary.UI.proximo[language]
      pt_BR: '[JOGAR]',
      en_US: '[PLAY]'
    },
    nameentry :{ //glossary.UI.nameentry[language]
      pt_BR: 'DIGITE NOME',
      en_US: 'ENTER NAME'
    },
    pos1entry :{ //glossary.UI.pos1entry[language]
      pt_BR: '1º',
      en_US: '1st'
    },
    pos2entry :{ //glossary.UI.pos2entry[language]
      pt_BR: '2º',
      en_US: '2nd'
    },
    pos3entry :{ //glossary.UI.pos3entry[language]
      pt_BR: '3º',
      en_US: '3rd'
    },
    posDentry :{ //glossary.UI.posDentry[language]
      pt_BR: 'º',
      en_US: 'th'
    },
    deletar :{ //glossary.UI.deletar[language]
      pt_BR: '[APAGAR]',
      en_US: '[DELETE]'
    },
    entrar :{ //glossary.UI.entrar[language]
      pt_BR: '[FEITO]',
      en_US: '[ENTER]'
    },
    fim :{ //glossary.UI.fim[language]
      pt_BR: '[  FIM  ]',
      en_US: '[  END  ]'
    },
    continuar :{ //glossary.UI.continuar[language]
      pt_BR: '[RETOMAR]',
      en_US: '[RESUME]'
    },
    sair :{ //glossary.UI.sair[language]
      pt_BR: '[SAIR]',
      en_US: '[QUIT]'
    }
	},
  text: {
    tutorialTitle: { //glossary.text.tutorialTitle[language]
      pt_BR: '   *COMO JOGAR*',
      en_US: '   *HOW TO PLAY*'
    },
    tutorialSkip: { //glossary.text.tutorialSkip[language]
      pt_BR: 'TOQUE PARA PULAR',
      en_US: '  TAP TO SKIP'
    },
    tutorialPg1: { //glossary.text.tutorialPg1[language]
      pt_BR: 'Arraste o personagem para mirar e solte para definir a posição de lançamento da bola',
      en_US: 'Drag character to aim and drop to set the ball launch position'
    },
    tutorialPg2: { //glossary.text.tutorialPg2[language]
      pt_BR: 'Toque na tela para selecionar o ângulo',
      en_US: 'Tap screen to select the angle'
    },
    tutorialPg3: { //glossary.text.tutorialPg3[language]
      pt_BR: 'Você pode tocar nas setas 3 vezes a cada arremesso para dar efeito de curva na bola',
      en_US: 'You can touch arrows 3 times in a roll to set curve effect in the ball'
    },
    tutorialPg4: { //glossary.text.tutorialPg4[language]
      pt_BR: 'JOGO-A: Perde vida caso não houve strike ou spare num round\n\nJOGO-B: Tente o maior placar em 2 minutos',
      en_US: 'GAME-A: Lose life if there was no strike or spare in a round\n\nGAME-B: Try the highest score in 2 minutes',
    },
    readyMsg: { //glossary.text.readyMsg[language]
      pt_BR: "\nVAMOS MARCAR O\nPLACAR MÁXIMO!",
      en_US: "\nLET'S GO FOR\nTHE HISCORE!"
    },
    diamondMsg: { //glossary.text.diamondMsg[language]
      pt_BR: "\nDERRUBE TODOS\nOS PINOS!",
      en_US: "\nKNOCK DOWN\nALL PINS!"
    },
    strikeMsg: { //glossary.text.strikeMsg[language]
      pt_BR: "SHOW DE BOLA!\nRECOMPENSA BÔNUS\nAPÓS 2 JOGADAS",
      en_US: "AWESOME!\nBONUS REWARD\nAFTER 2 ROLLS"
    },
    spareMsg: { //glossary.text.spareMsg[language]
      pt_BR: "BOA JOGADA!\nRECOMPENSA BÔNUS\nAPÓS PRÓXIMA JOGADA",
      en_US: "NICE JOB!\nBONUS REWARD\nAFTER NEXT ROLL"
    },
    strikeDiamondMsg: { //glossary.text.strikeDiamondMsg[language]
      pt_BR: "GANHOU 1 DIAMANTE!\nE BÔNUS DE STRIKE\nAPÓS 2 JOGADAS",
      en_US: "YOU GOT A DIAMOND!\nAND STRIKE BONUS\nAFTER 2 ROLL"
    },
    spareDiamondMsg: { //glossary.text.spareDiamondMsg[language]
      pt_BR: "GANHOU 1 DIAMANTE!\nE BÔNUS DE SPARE\nAPÓS PRÓXIMA JOGADA",
      en_US: "YOU GOT A DIAMOND!\nAND SPARE BONUS\nAFTER NEXT ROLL"
    },
    nolife: { //glossary.text.timeup[language]
      pt_BR: "ACABOU!!!",
      en_US: "GAME SET!"
    },
    timeup: { //glossary.text.timeup[language]
      pt_BR: "TEMPO!!!",
      en_US: "TIME UP!"
    },
    gameover: { //glossary.text.gameover[language]
      pt_BR: "FIM DE JOGO\n\nOBRIGADO PELA PARTIDA! :)",
      en_US: "GAME OVER\n\nTHANKS FOR PLAYING! :)"
    }
	},
	// ...
};
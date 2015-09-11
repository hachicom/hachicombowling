/**USAGE: 
 *  pt-br: glossary.UI.start['pt_BR'] ou glossary.UI.start[language]
 *  var language possui o idioma usado pelo device e selecionado pelo usuário
 */ 
var glossary = {
  UI: {
		start: { //glossary.UI.start[language]
      pt_BR: '[INICIAR]',
      en_US: '[START]'
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
      pt_BR: 'SOM & BGM\n\n\n\n\nREGIÃO/REGION\n\n\n\n\nVIBRAÇÃO\n\n\n\n\nRESETAR PLACAR',
      en_US: 'SFX & BGM\n\n\n\n\nREGIÃO/REGION\n\n\n\n\nVIBRATION\n\n\n\n\nRESET HI-SCORE'
    },
    firstRunSetupTitle :{ //glossary.UI.firstRunSetupTitle[language]
      all: 'INITIAL SETUP'
    },
    firstRunSetupTxt :{ //glossary.UI.firstRunSetupTxt['all']
      all: 'SOM/SOUND?\n\n\n\n\nIDIOMA/LANGUAGE\n\n\n\n\nVIBRAR/VIBRATE?',
    },
    menuTitle :{ //glossary.UI.menuTitle[language]
      pt_BR: 'PARTIDA 2 MINS',
      en_US: '2 MINUTE GAME'
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
      pt_BR: 'Arraste o personagem para mirar\ne solte para jogar a bola',
      en_US: 'Drag character to aim\nand drop to throw the ball'
    },
    tutorialPg2: { //glossary.text.tutorialPg2[language]
      pt_BR: 'Toque na tela para\nselecionar o ângulo',
      en_US: 'Tap screen to select\nthe ball angle'
    },
    tutorialPg3: { //glossary.text.tutorialPg3[language]
      pt_BR: 'Você pode tocar nas setas\n2 vezes a cada arremesso\npara controlar a bola',
      en_US: 'You can touch arrows\n2 times in a throw\nto control the ball'
    },
    tutorialPg4: { //glossary.text.tutorialPg4[language]
      pt_BR: 'Tente obter o maior\nplacar em 2 minutos!',
      en_US: 'Try to achieve the\nhighest score in 2 minutes!',
    },
    readyMsg: { //glossary.text.readyMsg[language]
      pt_BR: "\nVAMOS MARCAR O\nPLACAR MÁXIMO!",
      en_US: "\nLET'S GO FOR\nTHE HISCORE!"
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
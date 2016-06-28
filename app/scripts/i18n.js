'use strict';

var i18nStrings = {};

i18nStrings.defaultI10n = 'pt-BR';

i18nStrings.filterLocale = function(locale){
	var selectLocale = locale || i18nStrings.defaultI10n;
	return _.where(i18nStrings.generalContent,{l10n:selectLocale});
};

i18nStrings.generalContent = [];

i18nStrings.generalContent.push({
	l10n:'en',
	language:'English',
	months:['January','February','March','April','May','June','July','August','September','November',
          'December'],
	appName:'CONEMO',
	beginLessonButtonLabel:'Begin',
	toolBoxLabel:'Toolbox',
	backLabel:'Back',
	nextLabel:'Next',
	configureUserLabel:'Configure Your User Account',
	contactHelpLabel:'Contact Nurse / Nurse Assistant',
  contactHelpBody: 'Only press the "help request" button if you need ' +
                   'assistance with CONEMO, the cellphone or have a question ' +
                   'related to the intervention. If you have a health ' +
                   'problem, please go to your health care center or in case ' +
                   'of an emergency call 106.',
	instructionsLabel:'Instructions',
	contactTypes:['Ask for Help'],
	thankYouAlert:'Thank you, the nurse / nurse assistant has been contacted.',
	unreadLabel:'unread',
  videoLinks: [
    'https://conemo.northwestern.edu/system/EN1.mp4',
      'https://conemo.northwestern.edu/system/EN2.mp4'
  ],
  yes: 'yes',
  no: 'no',
  welcomeToConemo: 'Welcome to CONEMO!',
  activityChoices: ['Activity 1', 'Activity 2', 'Activity 3'],
  todaysDate: 'Today\'s date',
  ifCorrectContinue: 'If this is correct, please Continue.',
  didYouDoActivity: 'Did you',
  noActivity: 'That\'s unfortunate, it can really help to do the things you schedule.'
});

i18nStrings.generalContent.push({
	l10n:'pt-BR',
	language:'Português',
	months:['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro',
          'Outubro','Novembro','Dezembro'],
	appName:'CONEMO',
	beginLessonButtonLabel:'Iniciar',
	toolBoxLabel:'Sessões anteriores',
	backLabel:'Anterior',
	nextLabel:'Próximo',
	configureUserLabel:'Configure sua Conta de Usuário',
	contactHelpLabel:'Pedir ajuda',
  contactHelpBody: 'Somente pressione o botão "Pedir Ajuda" se você ' +
                   'precisa de assistência ou tem dúvidas sobre o CONEMO. ' +
                   'Se você tem um problema de saúde ou uma emergência ' +
                   'médica, ligue 192.',
	instructionsLabel:'Instruções',
	instructionsLesson: 'Sessão de exemplo',
	contactTypes:['Pedir ajuda'],
	thankYouAlert:'Obrigado, a/o auxiliar de enfermagem foi contactada/o e vai te chamar nos ' +
    'próximos 2 dias úteis.',
	unreadLabel:'não lido',
  videoLinks: [
    'https://conemo.northwestern.edu/system/SP1.mp4',
    'https://conemo.northwestern.edu/system/SP2.mp4',
    'https://conemo.northwestern.edu/system/SP3.mp4',
    'https://conemo.northwestern.edu/system/SP4.mp4',
    'https://conemo.northwestern.edu/system/countdown.mp4'
  ],
  yes: 'sim',
  no: 'não',
  welcomeToConemo: 'Benvindo ao CONEMO!',
  activityChoices: ['Ouvir música', 'Ligar para um amigo ou membro da família',
                   'Fazer uma caminhada curta', 'Ler um livro', 'Cozinhar',
                   'Pintar', 'Vestir-se bem', 'Assistir um filme', 'Cantar',
                   'Conversar com vizinhos', 'Fazer crochê', 'Cuidar do jardim'],
  todaysDate: 'Data de hoje',
  ifCorrectContinue: 'Se isso é correto, clique em Iniciar.',
  didYouDoActivity: 'Você conseguiu',
  noActivity: 'Sabemos que pode ser difícil começar, mas lembra-se que isso vai ' +
              'lhe ajudar a se sentir melhor. Se quiser, pode mudar sua seleção e ' +
              'tentar outra atividade.'
});

i18nStrings.generalContent.push({
	l10n:'es-PE',
	language:'Español',
	months:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre',
          'Noviembre','Diciembre'],
	appName:'CONEMO',
	beginLessonButtonLabel:'Inicio',
	toolBoxLabel:'Sesiones',
	backLabel:'Anterior',
	nextLabel:'Siguiente',
	configureUserLabel:'Configurar cuenta',
	contactHelpLabel:'Solicitar ayuda',
  contactHelpBody: 'Solo presiona el botón "Solicitar ayuda" si necesitas ' +
                   'ayuda o tienes dudas sobre CONEMO. Si tienes un problema ' +
                   'de salud, por favor ve a tu centro de salud o, si es una ' +
                   'emergencia, llama al 106.',
	instructionsLabel:'Instrucciones',
	instructionsLesson: 'Sesión de entrenamiento',
	contactTypes:['Solicitar ayuda'],
	thankYouAlert:'Muchas gracias. La enfermera ha sido contactada. Ella te llamará dentro ' +
    'de los siguientes 2 días laborales.',
	unreadLabel:'No leído',
  videoLinks: [
    'https://conemo.northwestern.edu/system/LM1.mp4',
    'https://conemo.northwestern.edu/system/LM2.mp4',
    'https://conemo.northwestern.edu/system/LM3.mp4',
    'https://conemo.northwestern.edu/system/LM4.mp4',
    'https://conemo.northwestern.edu/system/countdown.mp4'
  ],
  yes: 'sí',
  no: 'no',
  welcomeToConemo: '¡Bienvenido a CONEMO!',
  activityChoices: ['Escuchar música', 'Llamar a un amigo o familiar',
                   'Hacer una caminata corta', 'Leer un libro', 'Cocinar algo',
                   'Dibujar o pintar', 'Arreglarte', 'Ver una película',
                   'Cantar', 'Conversar con tu vecino', 'Tejer', 'Hacer jardinería'],
  todaysDate: 'Fecha de hoy',
  ifCorrectContinue: 'Si la fecha y hora son correctas, por favor continúe.',
  didYouDoActivity: '¿Pudiste',
  noActivity: 'Ser más activo te ayudará a sentirte mejor y a tener una vida ' +
              'más sana y feliz. Recuerda que todavía puedes seleccionar otra ' +
              'actividad si quieres e intentar de nuevo. Lo importante es seguir ' +
              'intentando.'
});

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
	contactHelpLabel:'Contact Study Staff',
	instructionsLabel:'Instructions',
	instructionsContent:'stuff',
	contactTypes:['Ask for Help'],
	thankYouAlert:'Thank you, the study staff have been contacted.',
	unreadLabel:'unread',
	downloaderText: {
        textFile: 'file',
        textFiles: 'files',
        textMissingContent: 'Please download the most recent content.',
        textUnavailableMedia: '<p>This media is unavailable.</p>',
        textUnsupportedFileType: 'That file type is not currently supported.',
        textAlert: 'That file type is not currently supported.'
    },
    videoLinks: [
    	'https://conemo.northwestern.edu/system/EN1.mp4',
        'https://conemo.northwestern.edu/system/EN2.mp4'
    ],
    yes: 'yes',
    no: 'no',
    welcomeToConemo: 'Welcome to CONEMO!'
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
	contactHelpLabel:'Solicitação de ajuda',
	instructionsLabel:'Instruções',
	instructionsLesson: 'Sessão de exemplo',
	instructionsContent:'<h2><i class="glyphicon glyphicon-question-sign"></i> Como funciona o App:' +
    '</h2><ol class="well"><li>3 vezes por semana você deverá fazer o login no aplicativo ' +
    'CONEMO, haverá novas ferramentas e informações cada vez que você acessá-lo</li><li>' +
    'Cada vez que você fizer seu login, você irá aprender algumas estratégias testadas que ' +
    'são desenvolvidas para mantê-lo mais saudável e feliz</li><li>Se você esquecer de ' +
    'acessar o aplicativo por mais de duas vezes, você será contactado por seu auxiliar de ' +
    'enfermagem para ter certeza de ' +
    'que você continue acessando e participando do programa</li></ol><h2><i class="glyphicon ' +
    'glyphicon-wrench"></i> Sessões anteriores</h2><ol class="well"><li>Você pode voltar para ' +
    'sessões mais antigas (dos dias anteriores), se você quiser, visitando a caixa de ' +
    'ferramentas</li><li>Se você pular sessões, você pode visitar as sessões anteriores ' +
    'para voltar a elas</li></ol> <h2><i class="glyphicon glyphicon-phone"></i> Solicitação ' +
    'de Ajuda</h2> <ol class="well"><li>Se precisar de ajuda a qualquer momento, pressione o ' +
    'botão de Solicitação de ajuda.</li><li>Não se preocupe, você pode pedir ajuda ' +
    '<ol><li>com o aplicativo, se você estiver com problemas com a internet, o CONEMO ou ' +
    'precisa de assistência geral da auxiliar de enfermagem</li><li>para uma auxiliar de ' +
    'enfermagem com o seu telefone</li></ol>',
	contactTypes:['Ask for Help'],
	thankYouAlert:'Obrigado, a equipe do estudo foi contactada',
	unreadLabel:'não lido',
	downloaderText: {
        textFile: 'arquivo',
        textFiles: 'arquivos',
        textMissingContent: 'Por favor, baixe os videos mais recentes em "Instruções."',
        textUnavailableMedia: '<p>Arquivo indisponível no momento</p>',
        textUnsupportedFileType: 'Este tipo de arquivo não é compatível.',
        textAlert: 'Testing in Português'
    },
    videoLinks: [
    	'https://conemo.northwestern.edu/system/SP1.mp4',
      'https://conemo.northwestern.edu/system/SP2.mp4',
      'https://conemo.northwestern.edu/system/SP3.mp4',
      'https://conemo.northwestern.edu/system/SP4.mp4',
    	'https://conemo.northwestern.edu/system/countdown.mp4'
    ],
    yes: 'sim',
    no: 'não',
    welcomeToConemo: 'Benvindo ao CONEMO!'
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
	instructionsLabel:'Instrucciones',
	instructionsLesson: 'Sesión de entrenamiento',
	instructionsContent: '<h2><i class="glyphicon glyphicon-question-sign"></i> ¿Cómo ' +
    'funciona el aplicativo?</h2><ol class="well"><li>Debes ingresar al aplicativo CONEMO ' +
    '3 veces a la semana. Cada vez que lo hagas, el aplicativo te dará nueva información ' +
    'y nuevas tareas.</li><li>Cada vez que uses el aplicativo, aprenderás nuevas estrategias ' +
    'para mantenerte sano y feliz.</li><li>Si olvidas ingresar al aplicativo más de 2 veces ' +
    'seguidas, una enfermera te llamará para saber si todo está bien e invitarte a seguir ' +
    'usando CONEMO.</li></ol><h2><i class="glyphicon glyphicon-wrench"></i> Sesiones</h2><ol ' +
    'class="well"><li>Si quieres mirar una de las sesiones anteriores debes apretar el botón ' +
    '“Sesiones” y ahí encontrarás la sesión que quieres usar.</li><li>Si pierdes una ' +
    'sesión o no la haces a tiempo, siempre puedes recuperarla apretando el botón ' +
    '“Sesiones”.</li></ol> <h2><i class="glyphicon glyphicon-phone"></i> Solicitar ' +
    'ayuda</h2> <ol class="well"><li>Si en algún momento necesitas ayuda de la ' +
    'enfermera, por favor aprieta el botón “Solicitar ayuda”.</li><li>Luego elige una de ' +
    'las siguientes alternativas: <ol><li>Necesito ayuda con el aplicativo,</li><li>' +
    'Necesito ayuda de mi enfermera</li><li>Tengo dificultades con la conexión de ' +
    'internet</li></ol>',
	contactTypes:['Ask for Help'],
	thankYouAlert:'Gracias. Tu mensaje ha sido enviado. Tu enfermera o enfermero te llamará pronto.',
	unreadLabel:'No leído',
	downloaderText: {
        textFile: 'archivo',
        textFiles: 'archivos',
        textMissingContent: 'Por favor, descargue la versión más reciente de los vídeos en ' +
          '"Instrucciones."',
        textUnavailableMedia: '<p>En este momento este archivo no está disponible.</p>',
        textUnsupportedFileType: 'En este momento este archivo no es compatible.',
        textAlert: 'Testing in Português'
    },
    videoLinks: [
			'https://conemo.northwestern.edu/system/LM1.mp4',
	    'https://conemo.northwestern.edu/system/LM2.mp4',
	    'https://conemo.northwestern.edu/system/LM3.mp4',
	    'https://conemo.northwestern.edu/system/LM4.mp4',
	   	'https://conemo.northwestern.edu/system/countdown.mp4'
    ],
    yes: 'sí',
    no: 'no',
    welcomeToConemo: '¡Bienvenido a CONEMO!'
});

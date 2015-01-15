$.fn.serializeObject=function(){var a={},b=this.serializeArray();return $.each(b,function(){a[this.name]?(a[this.name].push||(a[this.name]=[a[this.name]]),a[this.name].push(this.value||"")):a[this.name]=this.value||""}),a};var i18nStrings={};i18nStrings.defaultI10n="pt-BR",i18nStrings.filterLocale=function(a){var b=a||i18nStrings.defaultI10n;return _.where(i18nStrings.generalContent,{l10n:b})},i18nStrings.generalContent=[],i18nStrings.generalContent.push({l10n:"en",language:"English",months:["January","February","March","April","May","June","July","August","September","November","December"],appName:"CONEMO",beginLessonButtonLabel:"Begin",toolBoxLabel:"Toolbox",backLabel:"Back",nextLabel:"Next",configureUserLabel:"Configure Your User Account",contactHelpLabel:"Contact Study Staff",instructionsLabel:"Instructions",instructionsContent:"stuff",contactTypes:["I need help with the app","I need general assistance from my nurse","I am having issues with connectivity"],thankYouAlert:"Thank you, the study staff have been contacted.",unreadLabel:"unread",download:"download",downloaderText:{textDownloadComplete:"Download Complete!",textDownloading:"Downloading",textFile:"file",textFiles:"files",textDownloadingError:"Something went wrong with the download and a report has been sent.",textMissingPlugin:"File transfer plug in is missing. Downloads may not be complete.",textMissingContent:"Please download the most recent content.",textUnavailableMedia:"<p>This media is unavailable.</p>",textUnsupportedFileType:"That file type is not currently supported.",textAlert:"That file type is not currently supported."},videoLinks:["https://conemo.northwestern.edu/system/EN1.mp4","https://conemo.northwestern.edu/system/EN2.mp4"],yes:"yes",no:"no"}),i18nStrings.generalContent.push({l10n:"pt-BR",language:"Português",months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],appName:"CONEMO",beginLessonButtonLabel:"Iniciar",toolBoxLabel:"Sessões anteriores",backLabel:"Anterior",nextLabel:"Próximo",configureUserLabel:"Configure sua Conta de Usuário",contactHelpLabel:"Solicitação de ajuda",instructionsLabel:"Instruções",instructionsLesson:"Sessão de exemplo",instructionsContent:"<h2><i class='glyphicon glyphicon-question-sign'></i> Como funciona o App:</h2><ol class='well'><li>3 vezes por semana você deverá fazer o login no aplicativo CONEMO, haverá novas ferramentas e informações cada vez que você acessá-lo</li><li>Cada vez que você fizer seu login, você irá aprender algumas estratégias testadas que são desenvolvidas para mantê-lo mais saudável e feliz</li><li>Se você esquecer de acessar o aplicativo por mais de duas vezes, você será contactado por seu auxiliar de enfermagem para ter certeza de que você continue acessando e participando do programa</li></ol><h2><i class='glyphicon glyphicon-wrench'></i> Sessões anteriores</h2><ol class='well'><li>Você pode voltar para sessões mais antigas (dos dias anteriores), se você quiser, visitando a caixa de ferramentas</li><li>Se você pular sessões, você pode visitar as sessões anteriores para voltar a elas</li></ol> <h2><i class='glyphicon glyphicon-phone'></i> Solicitação de Ajuda</h2> <ol class='well'><li>Se precisar de ajuda a qualquer momento, pressione o botão de Solicitação de ajuda.</li><li>Não se preocupe, você pode pedir ajuda <ol><li>com o aplicativo, se você estiver com problemas com a internet, o CONEMO ou precisa de assistência geral da auxiliar de enfermagem</li><li>para uma auxiliar de enfermagem com o seu telefone</li></ol>",contactTypes:["Preciso de ajuda com o aplicativo","Preciso de assistência geral da minha Auxiliar de Enfermagem","Estou com problemas em conectar a internet"],thankYouAlert:"Obrigado, a equipe do estudo foi contactada",unreadLabel:"não lido",download:"Baixar",downloaderText:{textDownloadComplete:"Download completo!",textDownloading:"Baixando",textFile:"arquivo",textFiles:"arquivos",textDownloadingError:"Falha no download! Uma mensagem foi enviada.",textMissingPlugin:"Um plugin está faltando. O download pode não estar completo.",textMissingContent:'Por favor, baixe os videos mais recentes em "Instruções."',textUnavailableMedia:"<p>Arquivo indisponível no momento</p>",textUnsupportedFileType:"Este tipo de arquivo não é compatível.",textAlert:"Testing in Português"},videoLinks:["https://github.com/cbitstech/conemo_app/raw/cordova-master/video/SP1.mp4","https://github.com/cbitstech/conemo_app/raw/cordova-master/video/SP2.mp4","https://github.com/cbitstech/conemo_app/raw/cordova-master/video/SP3.mp4","https://github.com/cbitstech/conemo_app/raw/cordova-master/video/SP4.mp4","https://github.com/cbitstech/conemo_app/raw/cordova-master/video/countdown.mp4"],yes:"sim",no:"não"}),i18nStrings.generalContent.push({l10n:"es-PE",language:"Español",months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],appName:"CONEMO",beginLessonButtonLabel:"Inicio",toolBoxLabel:"Sesiones",backLabel:"Anterior",nextLabel:"Siguiente",configureUserLabel:"Configurar cuenta",contactHelpLabel:"Solicitar ayuda",instructionsLabel:"Instrucciones",instructionsLesson:"Sesión de entrenamiento",instructionsContent:"<h2><i class='glyphicon glyphicon-question-sign'></i> ¿Cómo funciona el aplicativo?</h2><ol class='well'><li>Debes ingresar al aplicativo CONEMO 3 veces a la semana. Cada vez que lo hagas, el aplicativo te dará nueva información y nuevas tareas.</li><li>Cada vez que uses el aplicativo, aprenderás nuevas estrategias para mantenerte sano y feliz.</li><li>Si olvidas ingresar al aplicativo más de 2 veces seguidas, una enfermera te llamará para saber si todo está bien e invitarte a seguir usando CONEMO.</li></ol><h2><i class='glyphicon glyphicon-wrench'></i> Sesiones</h2><ol class='well'><li>Si quieres mirar una de las sesiones anteriores debes apretar el botón “Sesiones” y ahí encontrarás la sesión que quieres usar.</li><li>Si pierdes una sesión o no la haces a tiempo, siempre puedes recuperarla apretando el botón “Sesiones”.</li></ol> <h2><i class='glyphicon glyphicon-phone'></i> Solicitar ayuda</h2> <ol class='well'><li>Si en algún momento necesitas ayuda de la enfermera, por favor aprieta el botón “Solicitar ayuda”.</li><li>Luego elige una de las siguientes alternativas: <ol><li>Necesito ayuda con el aplicativo,</li><li>Necesito ayuda de mi enfermera</li><li>Tengo dificultades con la conexión de internet</li></ol>",contactTypes:["Necesito ayuda con el aplicativo","Necesito ayuda de mi enfermera","Tengo dificultades con la conexión de internet"],thankYouAlert:"Gracias. Tu mensaje ha sido enviado. Tu enfermera o enfermero te llamará pronto.",unreadLabel:"No leído",download:"Descargar",downloaderText:{textDownloadComplete:"Descarga completa!",textDownloading:"Descargando",textFile:"archivo",textFiles:"archivos",textDownloadingError:"Algo falló con la descarga y un reporte ha sido enviado.",textMissingPlugin:"Falta una aplicación. Puede que las descargas no se hayan completado.",textMissingContent:'Por favor, descargue la versión más reciente de los vídeos en "Instrucciones."',textUnavailableMedia:"<p>En este momento este archivo no está disponible.</p>",textUnsupportedFileType:"En este momento este archivo no es compatible.",textAlert:"Testing in Português"},videoLinks:["https://conemo.northwestern.edu/system/LM1.mp4","https://conemo.northwestern.edu/system/LM2.mp4","https://conemo.northwestern.edu/system/LM3.mp4","https://conemo.northwestern.edu/system/LM4.mp4","https://conemo.northwestern.edu/system/countdown.mp4"],yes:"sí",no:"no"});var PurpleRobotClient=new PurpleRobot;if(PurpleRobot.setEnvironment("production"),"undefined"==typeof localStorage.l10n||"undefined"===localStorage.l10n){var l10n="pt-BR";localStorage.config=JSON.stringify({l10n:l10n})}else var l10n=localStorage.l10n;var l10nStrings=i18nStrings.filterLocale(l10n)[0];l10nStrings.availableLocales=_.pluck(i18nStrings.generalContent,"l10n");var lessonsRead=[];"undefined"==typeof localStorage.lessonsRead&&(localStorage.lessonsRead=JSON.stringify([])),angular.module("conemoAppApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/lesson/:id",{templateUrl:"views/lesson.html",controller:"LessonCtrl"}).when("/toolbox",{templateUrl:"views/toolbox.html",controller:"ToolboxCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/contact/:type",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/instructions",{templateUrl:"views/instructions.html",controller:"InstructionsCtrl"}).when("/instructions/:key",{templateUrl:"views/instructions.html",controller:"InstructionsCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope",function(a){a.unreadLabel=l10nStrings.unreadLabel,a.checkLessonRead=function(a){return lessonsRead=JSON.parse(localStorage.lessonsRead),-1!==lessonsRead.indexOf(a)?!0:void 0}}]).run(["$rootScope","LessonService",function(a,b){b.get(function(b){a.lessons=_.where(b.lessons,{l10n:l10n})})}]).run(["$rootScope","DialogueService",function(a,b){b.get(function(b){a.dialogues=_.where(b.dialogues,{l10n:l10n})})}]).run(["$rootScope",function(a){a.downloader=new Downloader,a.downloader.getFileSystem(),a.downloader.setDownloadLinks(l10nStrings.videoLinks),downloaderGlobal.text=l10nStrings.downloaderText,a.downloadVideos=function(){a.downloader.downloadMultiple()}}]).run(["$rootScope","DialogueService","LessonService",function(a){a.$watch(function(){return localStorage.config},function(){var b=JSON.parse(localStorage.config).l10n,c=i18nStrings.filterLocale(b)[0];downloaderGlobal.text=c.downloaderText;var d=c.videoLinks;a.downloader.setDownloadLinks(d)})}]).run(["$rootScope",function(a){a.$on("$routeChangeSuccess",function(){"es-PE"===l10n?$("body").addClass("es-PE"):$("body").removeClass("es-PE")})}]).run(["$window",function(){function a(){var a=navigator.connection.type,b={};b[Connection.UNKNOWN]="Unknown connection",b[Connection.ETHERNET]="Ethernet connection",b[Connection.WIFI]="WiFi connection",b[Connection.CELL_2G]="Cell 2G connection",b[Connection.CELL_3G]="Cell 3G connection",b[Connection.CELL_4G]="Cell 4G connection",b[Connection.CELL]="Cell generic connection",b[Connection.NONE]="No network connection",localStorage.setItem("connection",b[a])}function b(){if(void 0==localStorage.onResume)window.location.href="";else{var a=localStorage.onResume;localStorage.onResume="",window.location.href=a}}document.addEventListener("deviceready",a,!1),document.addEventListener("resume",b,!1)}]),angular.module("conemoAppApp").filter("translate",["$rootScope","conemoConfig",function(a,b){function c(a){var b=_.find(i18nStrings.generalContent,{l10n:d.l10n}),c=new Date,e=c.getMonth();return"undefined"==typeof b?"locale not found: "+d.l10n:"months"===a?b[a][e]:"undefined"==typeof b[a]?"translation not found: "+d.l10n+" => "+a:b[a]}var d=null,e=!1;return function(f){return null===d?(e||(e=!0,b.get().then(function(a){d=a}),a.$on("conemoConfig:changed",function(a,b){d=b})),""):c(f)}}]).filter("reverse",function(){return function(a){return a.slice().reverse()}}),angular.module("conemoAppApp").factory("conemoConfig",["$rootScope",function(a){function b(){}return a.appVersion="0.1.38",b.prototype.get=function(){return $.Deferred().resolve(JSON.parse(localStorage.config))},b.prototype.set=function(b){localStorage.config=JSON.stringify(b),a.$emit("conemoConfig:changed",b)},new b}]).factory("LessonService",["$resource",function(a){return a("scripts/lessons.json")}]).factory("DialogueService",["$resource",function(a){return a("scripts/dialogues.json")}]).service("startDateService",function(){this.setStartDate=function(){if("undefined"==typeof localStorage.startDate){var a=new Date;a.setHours(0,0,0,0),localStorage.startDate=a}else{var a=new Date(localStorage.startDate),b={user_id:localStorage.userId,date_created:new Date,start_date:a,l10n:localStorage.l10n};PurpleRobotClient.emitReading("start_date",b).execute()}},this.getDateDiff=function(a,b){var c=864e5;return Math.round((b.getTime()-a.getTime())/c)},this.getDaysInTreatment=function(){var a=new Date;a.setHours(0,0,0,0);var b=new Date(localStorage.startDate),c=this.getDateDiff(b,a)+1;return c},this.test=function(){console.log("i'm a test")}}),angular.module("conemoAppApp").controller("MainCtrl",["$scope","conemoConfig","$rootScope","$route","startDateService",function(a,b,c,d,e){function f(){if("undefined"==typeof localStorage.lessonTriggersScheduled||"undefined"===localStorage.lessonTriggersScheduled){for(var a=[],b="YYYYMMDDTHHmmss",c=1;c<j.length;c++){var d={releaseDay:moment().add("d",j[c].dayInTreatment-1),title:j[c].title};a.push(d)}var e=0;_.each(a,function(c,d){var f=moment(c.releaseDay).hour(8).minute(0).second(0).format(b),g=moment(f,b).add("minutes",1).format(b);PurpleRobotClient.updateTrigger({script:PurpleRobotClient.vibrate("buzz").showScriptNotification({title:"CONEMO: ",message:c.title,isPersistent:!0,isSticky:!1,script:PurpleRobotClient.launchApplication("edu.northwestern.cbits.conemo")}),triggerId:"LESSON"+d,startAt:f,endAt:g,repeatRule:"FREQ=DAILY;COUNT=1",fire_on_boot:!0}).execute({done:function(){e++,e===a.length&&$("body").prepend("<div id='confirm-lessons' style='background-color: green;'>Lessons set</div>"),setTimeout(function(){$("#confirm-lessons").fadeOut("slow")},2e3)}})}),setTimeout(function(){e!==a.length},4e3)}localStorage.setItem("lessonTriggersScheduled",moment().toDate())}function g(){if("undefined"==typeof localStorage.dialogueTriggersScheduled||"undefined"===localStorage.dialogueTriggersScheduled){for(var a=[],b="YYYYMMDDTHHmmss",c=0;c<k.length;c++){var d={releaseDay:moment().add("d",k[c].dayInTreatment-1),days_in_treatment:i,guid:k[c].guid,message:k[c].message,yes_text:k[c].yes_text,no_text:k[c].no_text,yes_button:l10nStrings.yes,no_button:l10nStrings.no};a.push(d)}var e=0;_.each(a,function(c,d){var f=moment(c.releaseDay).hour(8).minute(1).second(0).format(b),g=moment(f,b).add("minutes",1).format(b);PurpleRobotClient.updateTrigger({script:PurpleRobotClient.vibrate("buzz").showNativeDialog({title:"CONEMO: ",message:c.message,buttonLabelA:c.no_button,scriptA:PurpleRobotClient.showNativeDialog({title:"CONEMO: ",message:c.no_text,buttonLabelA:"OK",scriptA:PurpleRobotClient.emitReading("dialogue_data",{user_id:localStorage.userId,dialogue_guid:c.guid,days_in_treatment:c.days_in_treatment,answer:l10nStrings.no}),buttonLabelB:"",scriptB:PurpleRobotClient.doNothing(),tag:"",priority:1}),buttonLabelB:c.yes_button,scriptB:PurpleRobotClient.showNativeDialog({title:"CONEMO: ",message:c.yes_text,buttonLabelA:"OK",scriptA:PurpleRobotClient.emitReading("dialogue_data",{user_id:localStorage.userId,dialogue_guid:c.guid,days_in_treatment:c.days_in_treatment,answer:l10nStrings.yes}),buttonLabelB:"",scriptB:PurpleRobotClient.doNothing(),tag:"",priority:1}),tag:"CONEMO DIALOGUE",priority:1}),triggerId:"DIALOGUE"+d,startAt:f,endAt:g,repeatRule:"FREQ=DAILY;COUNT=1",fire_on_boot:!0}).execute({done:function(){e++,e===a.length&&$("body").prepend("<div id='confirm-dialogues' style='background-color: green;'>Dialogues set</div>"),setTimeout(function(){$("#confirm-dialogues").fadeOut("slow")},2e3)}})})}localStorage.setItem("dialogueTriggersScheduled",moment().toDate())}if("undefined"==typeof localStorage.userId||"undefined"===localStorage.userId)PurpleRobotClient.setUserId("CONEMO").updateConfig({config_enable_data_server:!0,config_restrict_data_wifi:!1}).execute({done:function(){$("body").prepend("<div id='confirm' style='background-color: green;'>User ID set</div>"),$("#confirm").fadeOut(2e3)}}),a.showAccountSetup=!0,a.showHomeScreen=!1;else{a.userId=localStorage.userId,a.showAccountSetup=!1,a.showHomeScreen=!1;var h={user_id:localStorage.userId,date_created:new Date,l10n:localStorage.l10n};(new PurpleRobot).emitReading("app_login",h).execute()}a.setStartDate=e.setStartDate,a.availableLocales=l10nStrings.availableLocales,a.setLocale=function(){localStorage.l10n=this.locale,b.set({l10n:this.locale})};var i=e.getDaysInTreatment(),j=_.sortBy(c.lessons,"dayInTreatment"),k=_.sortBy(c.dialogues,"dayInTreatment"),l=new Date;"undefined"!=typeof localStorage.userId&&(a.setStartDate(),f(),g()),a.setUserAccountInfo=function(){localStorage.userId=this.userId,window.location.reload()},a.enableStep=function(a){$("#"+a).removeClass("hidden")},a.isDownloading=function(){return"none"===angular.element("#progressContainer").css("display")?!0:!1};var m=function(a,b){var c={},a=e.getDaysInTreatment();return _.each(b,function(b,d){b.dayInTreatment<=a&&(c=b,c.currentSessionIndex=d+1)}),c},n=m(i,j);a.filesDownloaded=typeof localStorage.lastDownload,a.userId=localStorage.userId,a.currentLessonTitle=n.title,a.currentLessonDay=l.getDate(),a.l10n=l10n,a.currentSessionIndex=n.currentSessionIndex,a.currentLessonGuid=n.guid,a.downloadLabel=l10nStrings.download,a.downloadComplete=l10nStrings.downloaderText.textDownloadComplete}]),angular.module("conemoAppApp").controller("LessonCtrl",["$scope","$routeParams","$sce","$location","$rootScope","startDateService",function(a,b,c,d,e,f){var g=$(window).height(),h=($(window).width(),_.where(e.lessons,{guid:b.id})[0]),i=_.sortBy(h.slides,"position"),j=function(a){var b="";return _.each(a,function(a,c){b+='<div style="height:'+g+'px;" class="slide"  data-index="'+c+'" data-position="'+a.position+'">'+a.content+"</div>"}),b=e.downloader.insert("video",b)};a.navButtonGenerator=function(b){1==i.length?(a.showHome=!0,a.showBack=!1,a.showNext=!1):b==i.length-1?(a.showHome=!0,a.showBack=!0,a.showNext=!1):0==b?(a.showHome=!1,a.showBack=!1,a.showNext=!0):(a.showHome=!1,a.showBack=!0,a.showNext=!0)},a.slideNavigator=function(b){if(a.navButtonGenerator(a.currentSlideIndex),"number"!=typeof b)switch(b){case"next":a.currentSlideIndex++;break;case"back":a.currentSlideIndex--}$("html, body").animate({scrollTop:g*a.currentSlideIndex+"px"})},a.updatePageCounter=function(){a.currentSlideIndex=Math.round(pageYOffset/g),a.pageCounter=a.currentSlideIndex+1+" / "+i.length,a.navButtonGenerator(a.currentSlideIndex)};var k=f.getDaysInTreatment();a.backLabel=l10nStrings.backLabel,a.nextLabel=l10nStrings.nextLabel,a.showSlides=!1,a.slideContent=c.trustAsHtml(j(i)),a.currentSlideIndex=0,a.pageCounter=a.currentSlideIndex+1+" / "+i.length,a.slideNavigator(a.currentSlideIndex),a.saveForm=function(a){var c={user_id:localStorage.userId,lesson_guid:b.id,days_in_treatment:k,days_in_treatment_assigned:h.dayInTreatment,date_created:new Date,l10n:localStorage.l10n};return c.form_payload=JSON.stringify($("#slideShowForm").serializeObject()),(new PurpleRobot).emitReading("lesson_data",c).execute(),-1===lessonsRead.indexOf(h.guid)&&(lessonsRead.push(h.guid),localStorage.setItem("lessonsRead",JSON.stringify(lessonsRead))),d.path(a),!1}}]).directive("scroll",["$window",function(a){return function(b,c,d){angular.element(a).bind("scroll",function(){b.$apply(d.scroll)})}}]).directive("moDateInput",["$window",function(a){return{require:"^ngModel",restrict:"A",link:function(b,c,d,e){var f=a.moment,g=d.moMediumDate;d.$observe("moDateInput",function(a){g!=a&&e.$modelValue&&(g=a,e.$modelValue=new Date(e.$setViewValue))}),e.$formatters.unshift(function(a){if(b=b,!g||!a)return"";var c=f(a).format(g);return c}),e.$parsers.unshift(function(a){b=b;var c=f(a,g);return c&&c.isValid()&&c.year()>1950?c.toDate():""})}}}]),angular.module("conemoAppApp").controller("ContactCtrl",["$scope",function(a){a.contactHelpLabel=l10nStrings.contactHelpLabel,a.contactTypes=l10nStrings.contactTypes,a.thankYouAlert=l10nStrings.thankYouAlert,a.contactStaff=function(){var b={user_id:localStorage.userId,message:this.contactType,date_created:new Date,l10n:localStorage.l10n};(new PurpleRobot).emitReading("staff_messages",b).execute(),a.successAlertVisible=!0}}]),angular.module("conemoAppApp").controller("InstructionsCtrl",["$scope","$rootScope","$routeParams",function(a,b,c){localStorage.onResume="",a.instructionsLabel=l10nStrings.instructionsLabel,a.$watch("checked",function(a,b){if(a!==b){var c=document.getElementById("samplevideo-es"),d=document.getElementById("samplevideo-pt"),e=new Downloader;c.innerHTML=e.insert("video",c.textContent),d.innerHTML=e.insert("video",d.textContent)}}),a.checked=!1,"showSample"==c.key&&(a.checked=!0,window.scrollTo(0,document.body.scrollHeight)),a.toggleChecked=function(){a.checked=a.checked===!1?!0:!1},a.l10n=l10n,a.demoDialogue_esPE=function(){localStorage.onResume="#/instructions/showSample",PurpleRobotClient.vibrate("buzz").showNativeDialog({title:"CONEMO: ",message:"¿Has podido seguir las instrucciones de esta sesión de entrenamiento?",buttonLabelA:"No",scriptA:PurpleRobotClient.showNativeDialog({title:"CONEMO: ",message:"¡Pregunta a tu enfermera todas tus dudas! Te ayudará a usar el aplicativo la mejor manera posible.",buttonLabelA:"OK",scriptA:PurpleRobotClient.doNothing(),buttonLabelB:"",scriptB:PurpleRobotClient.doNothing(),tag:"",priority:1}),buttonLabelB:"Sí",scriptB:PurpleRobotClient.showNativeDialog({title:"CONEMO: ",message:"¡Qué bien! ¡Empecemos!",buttonLabelA:"OK",scriptA:PurpleRobotClient.doNothing(),buttonLabelB:"",scriptB:PurpleRobotClient.doNothing(),tag:"",priority:1}),tag:"CONEMO EJEMPLO",priority:1}).execute()},a.demoDialogue_ptBR=function(){localStorage.onResume="#/instructions/showSample",PurpleRobotClient.vibrate("buzz").showNativeDialog({title:"CONEMO: ",message:"Benvindo ao CONEMO!",buttonLabelA:"Não",scriptA:PurpleRobotClient.doNothing(),buttonLabelB:"Sim",scriptB:PurpleRobotClient.doNothing(),tag:"CONEMO",priority:1}).execute()},a.demoNotification_esPE=function(){localStorage.onResume="#/instructions/showSample",PurpleRobotClient.vibrate("buzz").showScriptNotification({title:"CONEMO: ",message:"¡Bienvenido a CONEMO!",isPersistent:!0,isSticky:!1,script:PurpleRobotClient.doNothing()}).execute()},a.demoNotification_ptBR=function(){localStorage.onResume="#/instructions/showSample",PurpleRobotClient.vibrate("buzz").showScriptNotification({title:"CONEMO: ",message:"Benvindo ao CONEMO!",isPersistent:!0,isSticky:!1,script:PurpleRobotClient.doNothing()}).execute()}}]),angular.module("conemoAppApp").controller("ToolboxCtrl",["$scope","$rootScope","startDateService",function(a,b,c){var d=c.getDaysInTreatment();a.availableLessons=_.filter(b.lessons,function(a){return a.dayInTreatment<=d}),a.beginLessonButtonLabel=l10nStrings.beginLessonButtonLabel}]);
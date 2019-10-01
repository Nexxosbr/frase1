/****************************************************************************
** Desenvolvido por: Equipe webAula						                   **
** Data modificação: 28/10/2004                                            **
** Contato: (31) 3273.2822			                                       **
** Objetivo: - Evitar que o carregamento de arquivos que estejam em cache  **
**           - Fazer comunicação SCORM entre o conteúdo e o LMS            **
**           - Permitir que o Flash acesse algumas variáveis SCORM Padrão  **
**           - Recupera valores enviados via querystring para o htm        **
*****************************************************************************/

/* 1. Se implementado == false, o conteúdo não criará CACHE, caso implementado == true, o conteúdo gravará CACHE e não precisará ser carregado a cada novo acesso */

var implementado=false;

/* 2. Identifica qual é o ID do tópico para ser utilizado durante as funções de setagem de variáveis. Caso necessário, esse parâmetro tenha que ser variável, a mudança pode ser feita através da função fc_flash onde o parâmetro IDTOPICO definirá o valor (Ex: vr_idTopico = idtopico). Se o valor de idtopico for alterado, é necessário modificar a função fc_iniciaSCO no item: SETA VARIÁVEIS */

var vr_idTopico = "topico";

/* 3. A classe Clversao define um valor diferente para cada novo carregamento e atribui à variável VERSÂO, que é utilizada na querystring do tópico. Caso o conteúdo já tenha sido  */

function Clversao()
{
	if(implementado==false)
		this.versao=new Date().getTime();
	  else
		this.versao = "final";
}

/* 3.1 Instancia o objeto Criado */
var ob_topico = new Clversao();

/* 4. Inicia a comunicação entre o CONTEÚDO e a APISCORM do LMS. Além disso, atribui o conteúdo de algumas chamadas SCORM para algumas variáveis padrão no flash */

function fc_iniciaSCO()
{
	/* 4.1 Inicia Comunicação */
	loadPage();

	/* 4.2 Define e atribui o valor às variáveis */
	var vr_nomeCompleto = doLMSGetValue('cmi.core.student_name');
	var vr_location = doLMSGetValue('cmi.core.lesson_location');
	var vr_comments = doLMSGetValue('cmi.comments');
	var vr_nota = doLMSGetValue('cmi.core.score.raw');
	var vr_status = doLMSGetValue('cmi.core.lesson_status');
	var vr_suspendData = doLMSGetValue('cmi.suspend_data');

	/* 4.3 Separando somente o primeiro nome*/
	var vr_nomeAluno = "";
	for (var m=0; m<vr_nomeCompleto.length; m++)
	{
		vr_nomeAluno += vr_nomeCompleto.charAt(m);
		if (vr_nomeCompleto.charAt(m)==" ")
		{
			break;
		}
	}

	/* 4.4 Seta as variáveis definidas para o Flash. As variáveis podem ser acessadas através do _root.nomeDaVariável */
	document.topico.SetVariable("vr_nomeCompleto",vr_nomeCompleto);
	document.topico.SetVariable("vr_location",vr_location);
	document.topico.SetVariable("vr_comments",vr_comments);
	document.topico.SetVariable("vr_nota",vr_nota);
	document.topico.SetVariable("vr_nomeAluno",vr_nomeAluno);
	document.topico.SetVariable("vr_suspendData",vr_suspendData);
	document.topico.SetVariable("vr_statusTopico",vr_status);
}

/* 5. As funções definidas permitem o conteúdo setar alguns valores contendo dados dos alunos para o LMS através do padrão SCORM */

/* 5.1 Grava o comentário */
function fc_setComments(str)
{
	doLMSSetValue('cmi.comments',str);//Seta a última tela do tópico
}

/* 5.2 Grava o location */
function fc_setLocation(str)
{
	doLMSSetValue('cmi.core.lesson_location',str);//Seta a string de telas
	doLMSCommit('');
	//alert("Grava Location :: :: " + str);
}

/* 5.2 Recupera location */
function fc_getLocation()
{
	var vr_location = doLMSGetValue('cmi.core.lesson_location');
	document.topico.SetVariable("vr_location",vr_location);
	//alert("Recupera Location: " + vr_location);
}

/* 5.2 Grava o suspend_data */
function fc_setSuspendData(str)
{
	doLMSSetValue('cmi.suspend_data',str);//Seta a string de telas
	doLMSCommit('');
	//alert("Grava Suspend :: :: " + str);
}

/* 5.3 Grava nota do aluno */
function fc_setNota(str)
{
	doLMSSetValue('cmi.core.score.raw',str);
}

/* 5.4 Grava o status e o location da última tela vista*/
function fc_setStatus(str)
{
	doLMSSetValue('cmi.core.lesson_status',str);
	doLMSCommit('');
}

/* 6. Função que carregará o arquivo .swf, levando em consideração as informações passadas na chamada da função pelo arquivo HTM */
function fc_flash(nome)
{
	/* 6.1 O laço for verifica se há parâmetros além dos obrigatórios e os define como querystrings (informações adicionais passadas para o arquivo swf); */
	var ar_querystring=new Array();
	for(i=1; i<arguments.length; i++)
	{
		ar_querystring[i-1] = "&" +  arguments[i];
	}
	var querystring = ar_querystring.join("");

	/* 6.2 Envia a tag Object para o HTML já com todos os parâmetros definidos, fazendo com que o arquivo seja carregado na tela */
	document.write("<OBJECT classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0' WIDTH='100%' HEIGHT='100%' id='" + vr_idTopico + "' ALIGN='top'><PARAM NAME=movie VALUE='" + nome +"?versao=" + ob_topico.versao + querystring +"'><PARAM NAME=loop VALUE=false> <PARAM NAME=quality VALUE=best><PARAM NAME=wmode VALUE=transparent><PARAM NAME=salign VALUE=MM><PARAM NAME=bgcolor VALUE=#FFFFFF><EMBED src='" + nome + "?versao=" + ob_topico.versao + querystring +"' loop=false quality=best salign=MM bgcolor=#FFFFFF  WIDTH='100%' HEIGHT='100%' NAME='" + vr_idTopico + "' ALIGN='top' TYPE='application/x-shockwave-flash' PLUGINSPAGE='http://www.macromedia.com/go/getflashplayer'></EMBED></OBJECT>");
}

/* 7. Função que irá recuperar os valores das querystrings enviadas para o htm*/
function GetQueryStringValue(variable)
{
   var QueryString = document.location.search;
   var voffset = QueryString.indexOf(variable, 0);
   var soffset = 0;
   var aoffset = 0;

   if (voffset == -1) return ("");
	  soffset = QueryString.indexOf("=", voffset);
	  
	  if (soffset == -1) return ("");
	  aoffset = QueryString.indexOf("&", soffset);

	  if (aoffset == -1)
		 return (unescape(QueryString.substring((soffset + 1), QueryString.length)));
	   else
		 return (unescape(QueryString.substring((soffset + 1), aoffset)));
}


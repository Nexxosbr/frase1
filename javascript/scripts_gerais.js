/*
Desenvolvido por Darlesson
*/
ie = (document.all)? true:false;
/* Compatibilizando o event.type para Mozilla */
function MOZEventHandlers(_eventos){var i; for (i=0; i< _eventos.length; i++){document.addEventListener(_eventos[i], function(e){window.event = e;}, true);}}
if(!document.all){MOZEventHandlers(["click","mousedown","mouseup","mouseover","mouseout","mousemove","keyup","keydown","onload"]);}
//-->
<!--
/* Redimensiona o conteúdo conforme janela */
var numAlturaResize;
var numLarguraResize;
var numClientHeight;
var numClientWidth;
var booLoad = false;
function redimensionaSite(){
	numClientHeight = document.body.clientHeight;
	numClientWidth = document.body.clientWidth;
	var numIfrAltura = numClientHeight - (document.getElementById("cabecalho").clientHeight + document.getElementById("rodape").clientHeight);
	var numIfrLargura = document.body.clientWidth - 10;
	numAlturaResize = numIfrAltura;
	numLarguraResize = numIfrLargura;
	document.getElementById("ifrConteudo").style.height = (numIfrAltura - 16)+"px";
	document.getElementById("conteudo").style.height = (numIfrAltura - 16)+"px";
	document.getElementById("ifrConteudo").style.width = (numIfrLargura - 10)+"px";
	document.getElementById("conteudo").style.width = (numIfrLargura - 10)+"px";
	booLoad = true;
}
function redimensionaSite2(){
	var numDifClientHeight;
	var numDifClientWidth;
	numDifClientHeight = numClientHeight - document.body.clientHeight;
	numDifClientWidth = numClientWidth - document.body.clientWidth;
	document.getElementById("ifrConteudo").style.height = ((numAlturaResize-numDifClientHeight)-16)+"px";
	document.getElementById("conteudo").style.height = ((numAlturaResize-numDifClientHeight)-16)+"px";
	document.getElementById("ifrConteudo").style.width = ((numLarguraResize-numDifClientWidth)-10)+"px";
	document.getElementById("conteudo").style.width = ((numLarguraResize-numDifClientWidth)-10)+"px";
}
//-->
/* Menu Superior */
var numMsStatus = 0;
var numDifLeft = 0;
var numDifTop = 0;
var idSubStatus;
var idSubMS;
var msArray = new Array();
function menuArray(status,idMS){
	if(status == "inserir"){
		var x = false;
		for (var i=0; i < msArray.length; i++){
			if(msArray[i] == idMS){
				x = true;
			}
		}
		if(x == false){
			msArray[msArray.length] = idMS;
		}
	}else if(status == "excluir"){
		var idEOF = document.getElementById(idMS);
		var idPosOF;
		for (var i=0; i < msArray.length; i++){
			if(msArray[i] == idMS){
				idPosOF = i;
			}
		}
		if(idPosOF == (msArray.length-1)){
			msArray.pop();
			document.getElementById(idMS).style.display = "none";
			document.getElementById("ifr"+idMS).style.display = "none";
		}
	}
	//caixaAvisos(msArray.length+", <b>"+idSubMS+", "+msArray[msArray.length-1]+"</b>, "+msArray);
}
function menuPopup(n,idMS,e){
	var strIdMs = document.getElementById("msItem_"+n);
	if(booLoad == false){
		caixaAvisos("Aguarde o carregamento total da página.");
	}else{
		if(numMsStatus == 0){
			var numMs = 15;
			for (var i=0; i < numMs; i++) {
				//alert(document.getElementById("msItem_"+i).className)
				if(document.getElementById("msItem_"+i)){
					if(document.getElementById("msItem_"+i).className == "ms_item ms_desabilitado"){
						document.getElementById("msItem_"+i).className = "ms_item";
					}else if(document.getElementById("msItem_"+i).className == "ms_item ms_desabilitado hand"){
						document.getElementById("msItem_"+i).className = "ms_item hand";
					}
				}
			}
		}
		numMsStatus = 1;
		if(event.type == "mouseover"){
			var scrollT = document.body.scrollTop;
			if(ie == true){
				var numPosLeft = event.offsetX;
				var numPosTop = event.offsetY;
				numDifLeft = ((event.x - numPosLeft)+6);
				numDifTop = ((event.y - numPosTop)+document.getElementById("localizacaoPad").clientHeight)+scrollT;
			}else{
				var numPosLeft = event.layerX;
				var numPosTop = event.layerY;
				numDifLeft = ((event.pageX - numPosLeft)+6);
				numDifTop = ((event.pageY - numPosTop)+document.getElementById("localizacaoPad").clientHeight)+scrollT;
			}
			var x = false;
			for(var i=0; i < msArray.length; i++){
				if(msArray[i].substring(0,msArray[i].indexOf("_")) != idMS){
					x = true;
				}
			}
			if(x == true){
				for(var i=0; i < msArray.length; i++){
					document.getElementById(msArray[i]).style.display = "none";
					document.getElementById("ifr"+msArray[i]).style.display = "none";
					msArray.pop();
				}
			}
			mostrarPopup(n,idMS);
		}else if(event.type == "mouseout"){
			document.getElementById(idMS).style.display = "none";
			document.getElementById("ifr"+idMS).style.display = "none";
		}
	}
}
function mostrarPopup(n,idMS){
	var strId = document.getElementById(idMS);
	strId.style.top = (numDifTop-4)+"px";
	strId.style.left = numDifLeft+"px";
	if(ie){
		document.getElementById("ifr"+idMS).style.top = (numDifTop-4)+"px";
		document.getElementById("ifr"+idMS).style.left = numDifLeft+"px";
	}
	scrollPopup(idMS);
}
function scrollPopup(idMS){
	var strId = document.getElementById(idMS)
	var numObjectTop = document.getElementById("cabecalho").clientHeight - document.getElementById("localizacaoPad").clientHeight;
	if(!ie){
		document.getElementById(idMS).style.MozOpacity = 0;
		document.getElementById(idMS).style.display = "block";
	}
	//caixaAvisos(document.getElementById(idMS).clientHeight)
	if((document.getElementById(idMS).clientHeight) > ((document.body.clientHeight) - (numObjectTop+document.getElementById("localizacaoPad").clientHeight))){
		document.getElementById(idMS+"_descer").style.display = "block";
		document.getElementById(idMS+"_subir").style.display = "block";
		document.getElementById(idMS+"_scroll").style.height = document.body.clientHeight - ((numObjectTop+document.getElementById("localizacaoPad").clientHeight)+28);
	}else if(document.getElementById(idMS+"_descer").style.display == "block"){
		document.getElementById(idMS+"_descer").style.display = "none";
		document.getElementById(idMS+"_subir").style.display = "none";
	}
	//caixaAvisos((document.getElementById(idMS).clientHeight)+", "+(document.body.clientHeight - (numObjectTop+document.getElementById("localizacaoPad").clientHeight)))
	strId.style.display = "block";
	if(!ie){
		document.getElementById(idMS).style.MozOpacity = 1;
	}else{
		document.getElementById("ifr"+idMS).style.width = (document.getElementById(idMS).clientWidth+2)+"px";
		document.getElementById("ifr"+idMS).style.height = (document.getElementById(idMS).clientHeight+2)+"px";
		document.getElementById("ifr"+idMS).style.display = "block";
	}
}
function menuEvent(id){
	if(event.type == "mouseover"){
		document.getElementById(id).style.display = "block";
		if(ie){
			document.getElementById("ifr"+id).style.display = "block";
		}
		menuArray("inserir",id);
	}else if(event.type == "mouseout"){
		var booIdSubMS = (document.getElementById(idSubMS))? true:false;
		if(booIdSubMS == true){
			if(document.getElementById(idSubMS).style.display == "block"){
				menuArray("excluir",id);
			}
		}else{
			menuArray("excluir",id);
		}
	}
}
function menuHover(id){
	var idMs = document.getElementById(id);
	if(event.type == "mouseover"){
		if(idMs.className.indexOf("itemSubMenu") > -1){
			idMs.className = "itemSubMenu itemSubMenuHover";
			mostrarSubPopup(id);
		}else{
			idMs.className = "itemMenu itemMenuHover";
			idSubMS = msArray[msArray.length-1];
		}
	}else{
		if(idMs.className.indexOf("itemSubMenu") > -1){
			idMs.className = "itemSubMenu";
			if(idSubStatus.style.display == "block"){
				idSubStatus.style.display = "none";
				document.getElementById("ifr"+idSubMS).style.display = "none";
			}
		}else{
			idMs.className = "itemMenu";
		}
	}
}
var numSubDifLeft = 0;
var numSubDifTop = 0;
function scrollSubPopup(){
	var strId = document.getElementById(idSubMS)
	strId.style.top = (numSubDifTop-4)+"px";
	strId.style.left = numSubDifLeft+"px";
	document.getElementById(idSubMS).style.display = "block";
	if(ie){
		document.getElementById("ifr"+idSubMS).style.top = (numSubDifTop-4)+"px";
		document.getElementById("ifr"+idSubMS).style.left = numSubDifLeft+"px";
		document.getElementById("ifr"+idSubMS).style.display = "block";
	}
}
function mostrarSubPopup(id){
	var idSubMenu = id+"_0";
	var strSubMenu = document.getElementById(idSubMenu);
	var booSubMenu = (strSubMenu)? true:false;
	if(booSubMenu == true){
		idSubStatus = strSubMenu;
		var scrollT = document.body.scrollTop;
		if(ie){
			var numPosLeft = event.offsetX;
			var numPosTop = event.offsetY;
			numSubDifLeft = ((event.x - numPosLeft)+178);
			numSubDifTop = ((event.y - numPosTop)+8)+scrollT;
		}else{
			var numPosLeft = event.layerX;
			var numPosTop = event.layerY;
			numSubDifLeft = ((event.pageX - numPosLeft)+178);
			numSubDifTop = ((event.pageY - numPosTop)+8)+scrollT;
		}
		idSubMS = idSubMenu;
		if(ie){
			document.getElementById("ifr"+idSubMenu).style.width = (document.getElementById(idSubMenu).clientWidth+2)+"px";
			document.getElementById("ifr"+idSubMenu).style.height = (document.getElementById(idSubMenu).clientHeight+2)+"px";
			document.getElementById("ifr"+idSubMenu).style.display = "block";
		}
		scrollSubPopup();
	}
}
function evento2(ID){
	document.getElementById(ID).onmouseover = evento;
}

/*
function mostrarPopup(n){
	var docXML;
	var docArchive = "xml/menu.xml";
	if(document.implementation && document.implementation.createDocument){
		// Mozilla
		docXML = document.implementation.createDocument("", "doc", null);
		docXML.load(docArchive);
	}else if(window.ActiveXObject){
		// IE
		docXML = new ActiveXObject("Microsoft.XMLDOM");
		docXML.async = false;
		docXML.load(docArchive);
	}
	var nodes = docXML.documentElement.childNodes;
	var nodesId = nodes.length;
	alert()
	document.getElementById("msItem_popup").style.display = "block";
	for(var i=0; i < nodesId; i++){
		document.getElementById("msItem_popup").innerText = nodes[i].text;
	}
}
*/
//-->
/* Link do menu superior */
function linkMs(URL,id,target){
	if(URL == undefined){
		//Sem ação
	}else if(target == "_blank"){
		window.open(URL);
	}else if(target == "open"){
		window.open(URL,"","menubar=no,toolbar=no,status=no");
	}else{
		document.getElementById("ifrConteudo").src = URL;
	}
}
//-->
/* Capturar ID*/
function pegarID(){
	var idCap;
	if(ie == true){
		idCap = event.srcElement.id +", "+ event.srcElement.parentNode.parentNode.id +", "+ event.srcElement.tagName +", "+ event.srcElement.parentNode.tagName +", "+ event.type;
	}else{
		idCap = event.target.id +", "+ event.target.parentNode.parentNode.id +", "+ event.target.tagName +", "+ event.target.parentNode.tagName +", "+ event.type;
	}
	//caixaAvisos(idCap);
}
//-->
/* Caixa de avisos */
function caixaAvisos(texto){
	document.getElementById("recebeDiv").innerHTML = "<div id='teste' style='position:absolute; top:10px; left:300px; background-color:#FFFFFF; border:1px solid #000000;'>"+texto+"</div>";
}
//-->
/*
Compatibilizar classes CSS para Mozilla.
*/
var numStyle = document.styleSheets.length;
if(!ie){
	for(var x=0; x < numStyle; x++){
		var numCSSRules = document.styleSheets[x].cssRules.length;
		for(var y=0; y < numCSSRules; y++){
			var objCSSRules = document.styleSheets[x].cssRules[y];
			if(objCSSRules.selectorText == ".ms_item"){
				objCSSRules.style.position = "relative";
			}
			if(objCSSRules.styleSheet){
				var numImportCssRules = objCSSRules.styleSheet.cssRules.length;
				for(var z=0; z < numImportCssRules; z++){
					if(objCSSRules.styleSheet.cssRules[z].selectorText == ".ms_item"){
						objCSSRules.styleSheet.cssRules[z].style.position = "relative";
					}
				}
			}
		}
	}
}
//-->
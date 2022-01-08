$(document).ready(combineAnimates);
$('.navLink:first-of-type').click(function(){
	$('.animText').css('opacity','0');
	combineAnimates();
});

//Ensemble d'animations :
function combineAnimates(){
	//Animation du titre, affichage caractère par caractère :
	let titleH1 = document.getElementById('titleH1');
	let texte = "DEV WEB";
	let index = 0;  //variable globale index utilisée dans la fonction writeText
	setInterval(function(){		
		if(index < texte.length){
		if(texte.slice(index , index+1) == ' '){ //ne marque pas de temps d'arrêt si rencontre un espace
			index+=2;		
		}else{
			index++;
		}		
		titleH1.textContent = texte.slice(0 , index);	
	}		
	},500);

	//Animations éléments de texte :
	for(let i = 1 ; i <= 8 ; i++){
		window.setTimeout(function(){
		appear($('#animText' + i ) , 500*i);
	},500*i);
	}

	/*for(let i = 1 ; i <= 8 ; i++){	//ne fonctionne pas avec une classe : n'affiche que les trois premiers elements
		window.setTimeout(function(){
		appear($('.animText:nth-child(' + i + ')') , 500*i);
	},500*i);
	}*/

	//Animation scintillement coeurs :
	//La désynchronisation ne fonctionne qu'avec les id et pas les class :
	glitter($('#animImg1') , 1000);
	glitter($('#animImg3') , 1000);
	window.setTimeout(function(){
		glitter($('#animImg2') , 1000);
	},500);
	window.setTimeout(function(){
		glitter($('#animImg4') , 1000);
	},500);

	//Stop animation scintillement images :
	window.setTimeout(function(){
		$('.animImg').stop().animate();
	},10000);
}

//**************************************************************************************
//************ FONCTIONS ***************************************************************
function glitter(image , duree) { //fait scintiller une image
    image.animate(
		{opacity : '0'},
		duree						
		).animate(
			{opacity : '1'},
			duree,
			function(){
				glitter(image,duree);
			}									
	)
};

function appear(image , duree) {
	image.animate({opacity : '1'} , duree)
}
let welcomeText='HTML CSS JAVASCRIPT PHP SQL';
let index=0;
function displayIntro(){
	document.getElementById('subtitle').innerHTML=welcomeText.slice(0,index);
	if(index<welcomeText.length){
		index++;
	}
}


//affichage d'un caractère toutes les 100 ms à partir du chargement de la page :
setInterval(displayIntro,100);	




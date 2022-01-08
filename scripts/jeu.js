let nbImg = 0;	//nb d'images dans un niveau de jeu
let nbCols = 0;	//nb de colonnes de la grid pour un niveau de jeu
let level = 0;
let point = 0;
let score = 0;
let nbSrc = 22;		//nb total d'images sources pour les cartes
let bonus = 0;
let total = 0; 		//total = bonus + score
let firstPlay = 0;		//flag pour le déclenchement du jeu à partir soit du bouton play la 1ere fois, soit des boutons de sélect de dif en cas de replay
let affichScore = 0;	//passe à 1 pendant l'affichage du score ; permet de fermer le layer d'affichage du score dès qu'on clique sur un bouton de select de dif
let second = 0;
let minute = 0;
let secondText = '';
let minuteText = '';
let chrono = undefined;
//charger zone de jeu 4 x 3 au chargement de la page :
window.onload = formatLevel(0);
//Listeners sur les boutons de sélection du niveau :
for(let i=0 ; i < document.getElementsByClassName('selectButton').length ; i++){
	document.getElementsByClassName('selectButton')[i].addEventListener('click', function(event){
		//modification du style des boutons :
		for(let i=0 ; i < document.getElementsByClassName('selectButton').length ; i++){
			document.getElementsByClassName('selectButton')[i].style.backgroundColor = "var(--main)";
			document.getElementsByClassName('selectButton')[i].style.borderColor = "white";		
			document.getElementsByClassName('selectButton')[i].style.color = "white";
		}	
		document.getElementsByClassName('selectButton')[i].style.backgroundColor = "var(--third)";	
		document.getElementsByClassName('selectButton')[i].style.borderColor = "var(--third)";	
		document.getElementsByClassName('selectButton')[i].style.color = "var(--main)";	
		//si affichage score en cours, masquer le layer d'affichage du score :
		if(affichScore == 1){
			fermeScoreLayer();
			affichScore = 0;
		}
		//modification du niveau de jeu :
		level = i;
		formatLevel(i);		
		//si replay :
		if(firstPlay == 1){			
			playGame(level);
		}
	});
}

//Listener sur le bouton play :
document.getElementById('play').addEventListener('click', function(event){
	//Préparation zone jeu :	
	document.getElementById('playLayer').style.display = 'none';	
	document.getElementById('gameScore').style.display = 'flex';
	//Modification flag firstPlay pour le replay :
	if (firstPlay == 0)firstPlay = 1 ;
	//Lancement jeu :
	playGame(level);	
});

//Fonction jeu :
function playGame(level){
	document.getElementById('time').innerHTML='00:00';
	second = 0;
	minute = 0;
	//lancement chrono :
	if(chrono != undefined)	clearInterval(chrono);
	chrono = setInterval(incrementSecond,1000);
	//CONSTITUTION DU TABLEAU DE SOURCES IMAGES :
	srcArray=new Array();
	for(let i  = 0 ; i < nbSrc ; i++){
		srcArray[i] = 'images/gameset/na' + i + '.svg';	
	}
	//on mélange :
	for(let i = 0 ; i < srcArray.length ; i++){
		drawnPosition = Math.floor(Math.random()*srcArray.length);	//position de l"objet tiré au sort
		srcArray.push(srcArray[drawnPosition]);	//on ajoute l"objet tiré au sort à la fin de la collection
		srcArray.splice(drawnPosition , 1);  //on retire l"objet tiré au sort de sa position initiale
	}
	//on ne garde que les images nécessaires au niveau de jeu :	
	for(let i = 0 ; i < nbSrc - nbImg/2 ; i++){
		srcArray.pop();		
	}
	//on ajoute un double de chaque image :
	for(let i = 0 ; i < nbImg/2 ; i++){
		srcArray[i + nbImg/2] = srcArray[i];
	}
	//on mélange à nouveau :	
	for(let i = 0 ; i < srcArray.length ; i++){
		drawnPosition=Math.floor(Math.random()*srcArray.length);	//position de l"objet tiré au sort
		srcArray.push(srcArray[drawnPosition]);	//on ajoute l"objet tiré au sort à la fin de la collection		
		srcArray.splice(drawnPosition,1);  //on retire l"objet tiré au sort de sa position initiale
	}	
	//afficher la liste de		
	//JEU :	
	let tour=0;		
	let nbPairs=0;//quand toutes les paires retournées, jeu fini
	let prev=-1;
	//INITIALISATION DES TABLEAUX DE CLICKS ET DE STATUS:
	clicksArray=new Array();  //tableau nb de clics pour chaque carte
	statesArray=new Array();	//tableau status de chaque carte : gagnée ou pas
	for(let i=0;i<nbImg;i++){
		clicksArray[i] = 0;
		statesArray[i] = 0;
	}

//LISTENERS SUR LES CARTES IMAGES :
	for(let i = 0 ; i < nbImg ; i++){		
		document.getElementById('id'+i).addEventListener('click',function(event){
			if(i !== prev && statesArray[i] !== 1){				
				document.getElementById('id' + i).src = srcArray[i];				
				tour++;
				clicksArray[i]++;							
				if(tour %2 !== 0){  //si tour impair
					prev=i;
				}else{  //si le tour est pair
					if(srcArray[i] !== srcArray[prev]){ //les deux cartes ne matchent pas
						setTimeout(function(){
							document.getElementById('id' + i).src='images/dos.svg';
							document.getElementById('id' + prev).src='images/dos.svg';
						},500);
					}else{	//les deux cartes matchent
						statesArray[i] = 1; statesArray[prev] = 1;
						score = score + Math.ceil(point/(clicksArray[i] + clicksArray[prev]))*100;
						document.getElementById('score').innerHTML = score;
						nbPairs++;						
						if(nbPairs == nbImg/2){//jeu fini
								clearInterval(chrono); //arrêt du chrono à la fin du jeu
								//Affichage du layer score :
								affichScore = 1;
								bonus = Math.ceil(200/((minute*60)+second))*100;
								document.getElementById('scoreLayer').style.display='flex';	
								document.getElementById('partialScore').innerHTML='SCORE : ' + score;
								document.getElementById('bonus').innerHTML='BONUS TEMPS : ' + bonus;
								total = score + bonus;
								document.getElementById('total').innerHTML='TOTAL : ' + total;																	
								//Listener sur le bouton rejouer :
								document.getElementById('replay').addEventListener('click',function(event){									
									fermeScoreLayer();																											
								});
							}//fin du if jeu fini						
						} //fin if les deux cartes matchent ou ne matchent pas
					} //fin if le tour est pair
				}			
		}); //fin listener sur cartes image
	}//fin boucle for
}//FIN DE LA FONCTION JEU

//Fonction de préparation du jeu selon le niveau :
function formatLevel(level){
	switch(level){
			case 0:
				nbImg = 12;	
				nbCols = 4;					
				point = 10;
				break;
			case 1:
				nbImg = 20;	
				nbCols = 5;					
				point = 20;
				break;
			case 2:
				nbImg = 30;	
				nbCols = 6;					
				point = 30;
				break;
			case 3:
				nbImg = 42;	
				nbCols = 7;					
				point = 40;
				break;
			default:
				nbImg = 12;	
				nbCols = 4;				
				point = 10;
		}		
		//vider le bloc contenant les cartes :
		document.getElementById('gameLayer').innerHTML = '';		
		//créer un nouveau tableau de cartes images :
		imgArray = new Array(); 
		for(let i = 0 ; i < nbImg ; i++){
			imgArray[i] = new Image();
			imgArray[i].src = 'images/dos.svg';		
			imgArray[i].id = 'id' + i;		
			imgArray[i].style.width = '100%';		
			document.getElementById('gameLayer').appendChild(imgArray[i]);
		}
		//grid template du bloc contenant les cartes :
		document.getElementById('gameLayer').style.gridTemplateColumns = 'repeat(' + nbCols + ', 1fr)';
}

//Fonction pour animer le chrono :
function incrementSecond(){	
	if(second < 59){
		second = second + 1;
	}else{
		second = 0;
		minute = minute + 1;
	}
	if (second < 10){
		secondText = '0' + second;
	}else{
		secondText = second;
	}
	if (minute < 10){
		minuteText = '0' + minute;
	}else{
		minuteText = minute;
	}	
	document.getElementById('time').innerHTML= minuteText + ':' + secondText;
}

//Fonction pour fermer le layer score :
function fermeScoreLayer(){
	document.getElementById('scoreLayer').style.display = 'none';	
	score = 0 ; bonus = 0;									
	document.getElementById('score').innerHTML = '';
	affichScore = 0;									
	formatLevel(level);
	playGame(level);
}
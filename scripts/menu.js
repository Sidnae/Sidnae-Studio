let menuState=0;
document.getElementById('burgerMenu').addEventListener('click', function(event){
	if (menuState==0){
		for(let i=0;i<document.getElementsByClassName('navLink').length;i++){
		document.getElementsByClassName('navLink')[i].style.display='block';
		}
		document.getElementById('pageHeader').style.height = '12.6rem';
		document.getElementById('intro').style.paddingTop = '14.6rem';
		menuState=1;
	}else{
		for(let i=0;i<document.getElementsByClassName('navLink').length;i++){
		document.getElementsByClassName('navLink')[i].style.display='none';
		}
		document.getElementById('pageHeader').style.height = '5.6rem';
		document.getElementById('intro').style.paddingTop = '7.6rem';
		menuState=0;
	}
	
});

function slideMenu(){
	if(window.innerWidth>window.innerHeight){
		for(let i=0;i<document.getElementsByClassName('navLink').length;i++){
		document.getElementsByClassName('navLink')[i].style.display='block';
		}
		document.getElementById('pageHeader').style.height = '5.6rem';
		document.getElementById('intro').style.paddingTop = '7.6rem';				
	}else{
		for(let i=0;i<document.getElementsByClassName('navLink').length;i++){
		document.getElementsByClassName('navLink')[i].style.display='none';
		}		
	}
	menuState=0;
}

window.onresize = slideMenu;


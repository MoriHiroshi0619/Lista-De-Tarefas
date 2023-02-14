let btnMobile = document.querySelector('.btn-mobile');


function toggleMenu(event){
    if(event.type === 'touchstart'){
        event.preventDefault();
    }

    let nav = document.querySelector('.nav');
    nav.classList.toggle('active');
    
    if(nav.classList.contains('active')){
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no"; 
    }else{
        document.documentElement.style.overflow = 'auto';
        document.body.scroll = "yes"; 
    }
}


btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);


(function(){
    const menuButton = document.getElementById('menuButton');
    const nav = document.getElementById('mainNav') || document.querySelector('.nav');
    const header = document.querySelector('.site-header');

    function isOpen(){
        return nav && nav.classList.contains('open');
    }

    function closeMenu(){
        if(!nav || !menuButton) return;
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded','false');
        menuButton.setAttribute('aria-label','Abrir menu');
    }
    function openMenu(){
        if(!nav || !menuButton) return;
        nav.classList.add('open');
        menuButton.setAttribute('aria-expanded','true');
        menuButton.setAttribute('aria-label','Fechar menu');
    }

    if(menuButton){
        menuButton.addEventListener('click', function(){
            if(isOpen()) closeMenu(); else openMenu();
        });
    }

    
    document.addEventListener('click', function(e){
        if(!nav || !menuButton) return;
        if(!nav.contains(e.target) && !menuButton.contains(e.target)){
            closeMenu();
        }
    });

    
    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape') closeMenu();
    });

   
    function getHeaderOffset(){
        if(!header) return 0;
        return header.getBoundingClientRect().height + 8; 
    }

    document.querySelectorAll('a[href^="#"]').forEach(function(link){
        link.addEventListener('click', function(e){
            const href = this.getAttribute('href');
            if(!href || href === '#') return;
            const targetId = href.slice(1);
            const target = document.getElementById(targetId);
            if(target){
                e.preventDefault();
                closeMenu();
                const offset = getHeaderOffset();
                const targetTop = window.scrollY + target.getBoundingClientRect().top - offset;
                window.scrollTo({top: Math.max(0, Math.floor(targetTop)), behavior: 'smooth'});
                
                setTimeout(()=>{ target.setAttribute('tabindex','-1'); target.focus(); }, 450);
            }
        });
    });

    
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

})();

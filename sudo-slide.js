function SudoSlides(name = '.dnvSlide'){
    const _C = document.querySelector(`.${name} .galery_list`),
    totalGLIT = _C.children.length;
    _C.style.setProperty("--n", totalGLIT);
    let x0 = null;
    let locked = false;
    let timeOutLoop = '';
    let slideAuto = document.querySelector(`.${name}.galery_content`).getAttribute('data-auto') || false;
    let slideLoop = document.querySelector(`.${name}.galery_content`).getAttribute('data-loop') || false;
    let timeLoop = document.querySelector(`.${name}.galery_content`).getAttribute('data-time') || false;
    // // prev, next
    let checkNav = document.querySelector(`.${name} .galery_prev`) || null;
    if(checkNav){
	    let prev = document.querySelector(`.${name} .galery_prev`);
	    let next = document.querySelector(`.${name} .galery_next`);
	    prev.addEventListener("click", () => {
			if (itemGlR == 0) {
				return;
			} else if (itemGlR > 0) {
				let glr = document.querySelector(`.${name} .galery_list`);
				itemGlR = itemGlR - 1;
				glr.style.setProperty("--i", itemGlR);
				glr.style.setProperty("--tx", "0px");
				glr.style.setProperty("--f", 0);
			}
	    	if(slideAuto != 'false'){
		    	clearTimeout(timeOutLoop);
		    	loopSlides();
		    }
	    });
	    next.addEventListener("click", () => {
			let glr = document.querySelector(`.${name} .galery_list`);
			if (itemGlR+1 < totalGLIT) {
				itemGlR += 1;
			} else {
				if(slideLoop != 'false'){
					itemGlR = 0;
				}
			}
	        glr.style.setProperty("--i", itemGlR);
	        glr.style.setProperty("--tx", "0px");
	        glr.style.setProperty("--f", 0.5667);
	        if(slideAuto != 'false'){
		    	clearTimeout(timeOutLoop);
		    	loopSlides();
		    }
	    });
	}
    // slider event listeners for mouse and touch (start, move, end)
    _C.addEventListener("mousemove", drag, false);
    _C.addEventListener("touchmove", drag, false);
    _C.addEventListener("mousedown", lock, false);
    _C.addEventListener("touchstart", lock, false);
    _C.addEventListener("mouseup", move, false);
    _C.addEventListener("touchend", move, false);
    // override Edge swipe behaviour
    _C.addEventListener(
        "touchmove",
        e => {
            e.preventDefault();
        },
        false
    );
    let itemGlR = 0;

    function lock(e){
        x0 = unify(e).clientX;
        let glr = document.querySelector(`.${name} .galery_list`);
        glr.classList.toggle("smooth", !(locked = true));
    }

    if(slideAuto != 'false') {
    	loopSlides();
    }
    function loopSlides(){
    	clearTimeout(timeOutLoop);
    	timeOutLoop = setTimeout(function(){
		    let glr = document.querySelector(`.${name} .galery_list`);
	    	if (itemGlR+1 < totalGLIT) {
		        itemGlR += 1;
		     } else {
		      	itemGlR = 0;
		    }
	        glr.style.setProperty("--i", itemGlR);
	        glr.style.setProperty("--tx", "0px");
	        glr.style.setProperty("--f", 0.5667);
            document.querySelector(`.${name} .galery_list`).classList.toggle ('smooth');
		    loopSlides();
	    }, parseInt(timeLoop))
    }
    function move(e){
        if (locked) {
            let windowWidth = window.innerWidth;
            let dx = unify(e).clientX - x0;
            let totalGLIT = document.querySelector(`.${name} .galery_list`).children.length;
            let s = Math.sign(dx);
            let f = +(s * dx / windowWidth).toFixed(2);
            let glr = document.querySelector(`.${name} .galery_list`);
            if ((itemGlR > 0 || s < 0) && (itemGlR < totalGLIT - 1 || s > 0) && f > 0.2) {
                itemGlR -= s;
                glr.style.setProperty("--i", itemGlR);
                f = 1 - f;
            } else if((itemGlR >= totalGLIT - 1) && slideLoop != 'false') {
            	itemGlR = 0;
            	glr.style.setProperty("--i", itemGlR);
            	f = 0.5667;
            }
            glr.style.setProperty("--tx", "0px");
            glr.style.setProperty("--f", f);
            locked = false;
            document.querySelector(`.${name} .galery_list`).classList.toggle ('smooth');
            x0 = null;
            if(slideAuto != 'false'){
		    	clearTimeout(timeOutLoop);
		    	loopSlides();
		    }
        }
    }
    // drag-animation for the slider when it reaches the end
    function drag(e){
        if (locked) {
            _C.style.setProperty("--tx", `${Math.round(unify(e).clientX - x0)}px`);
        }
    }
}
// unify touch and click cases:
let old_toch = { clientX: 106, screenX: 106};
function unify(e) {
    if( [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
        let toch =  e.changedTouches ? e.changedTouches[0] : (e.touches ? e.touches[0] : e);
        if(typeof toch !== 'undefined') {
            old_toch = toch;
        }
        return old_toch;
    }else {
        return e.changedTouches ? e.changedTouches[0] : e;
    }
}
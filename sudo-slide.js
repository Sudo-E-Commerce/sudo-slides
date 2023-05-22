function sudoSlide(elem = '', resp=[], nav = true, dots = true, autoP = true, timeS = 0, nextI = 0, margin = 0, customDot = 0, dotAttribute = '', responsiveDot = []){
    const slide = document.querySelector(`#${elem}`);
    if (!slide) {
      return false;
    }
    const images = slide.querySelectorAll(`img`);
    images.forEach(image => {
        image.addEventListener('dragstart', e => {
            e.preventDefault();
        });
    });
    var slideC = document.querySelector(`#${elem} .s-content`);
    if(slideC){
        slideC.style.transform = `translateX(0px)`;
        var parent = document.querySelector(`#${elem}`).parentNode;
        var width = parent.clientWidth;
        var listI = slideC.children;
        var widthS = 0;
        var qtyItem = 0;
        var autoScroll = 0;
        resp.forEach(function(elm, index) {
            let maxWidth = elm.maxWidth;
            let minWidth = elm.minWidth;
            if(width <= maxWidth && width > minWidth ){
                qtyItem = elm.qtyItem;
                nextI = elm.nextI || nextI;
                widthS = (width / qtyItem * listI.length) + (margin * (qtyItem - 1) * listI.length / (2 * qtyItem));
                slideC.style.width = `${widthS}px`;
                Array.from(listI).forEach(child => {
                  child.style.width = `${(widthS / listI.length) - (margin * (qtyItem - 1) / qtyItem)}px`;
                  child.style.marginRight = `${margin}px`;
                });
                // next, prev
                if (nav) {
                    slide.insertAdjacentHTML("beforeend", `<div class="nav"><div class="nav-next"></div><div class="nav-prev"></div></div>`);
                    var next = slide.querySelector(`.nav-next`);
                    var prev = slide.querySelector(`.nav-prev`);
                    [next, prev].forEach((el) => {
                        el.addEventListener(
                            "click",
                            function () {
                            if (el === next) {
                                right(nextI || 1);
                            } else {
                                left(nextI || 1);
                            }

                            if (autoP) {
                                clearInterval(autoScroll);
                                    setLoopSlide();
                                }
                            },
                            { passive: true }
                        );
                    });
                }
                //dots
                if(dots){
                    let dotsHtml = `<div class="dots">`;
                    if(customDot) dotsHtml = `<div class="dots-custom"><div class="s-wrap" id="dot-custom-${elem}"><div class="s-content">`;
                    for(let j = 0; j <= (Math.round((listI.length - qtyItem) / nextI)); j++){
                        let dot = ''
                        if(customDot) {
                            dot = `
                                <div class="dot-custom">
                                    <img src="${listI[j].getAttribute(dotAttribute)}" loading="lazy" alt="">
                                </div>
                            `;
                        }
                        dotsHtml += `<div class="dot dot-${j} ${j == 0 ? 'active' : ''}">${dot}</div>`;
                    }
                    dotsHtml += `</div>`;
                    if(customDot) dotsHtml += `</div></div>`
                    slide.insertAdjacentHTML("beforeend", dotsHtml);
                    if(customDot) {
                        sudoSlide(
                            `dot-custom-${elem}`,
                            responsiveDot,
                            true, false, false, 5000, 1, 0, 0
                        );
                    }
                    let dotActive = document.querySelector(`#${elem} .dot.active`);
                    let listDots = document.querySelectorAll(`#${elem} .dot`);
                    const checkDot = () => {
                        dotActive.classList.remove('active');
                        dotActive = document.querySelector(`#${elem} .dot-${i}`);
                        dotActive.classList.add('active');
                    }
                    for (let dotItem of listDots) {
                        dotItem.addEventListener('click', function(e){
                            var dotClick = e.target;
                            dotClass = dotClick.getAttribute('class');
                            dotIndex = dotClass.replace(/[^\d]+/g, "");
                            if(dotIndex != i){
                                i = dotIndex - 1;
                                right(nextI);
                            }
                            checkDot();
                        }, { passive: true });
                    }
                }
                // next và pev
                var i = 0;
                function left(qtynextI){
                    i = Math.max(0, i - 1);
                    let transform = ((widthS / listI.length)) * i * qtynextI;
                    slideC.style.transform = `translateX(${-transform}px)`;
                    if(dots){
                        let dotActive = document.querySelector(`#${elem} .dot.active`);
                        let listDots = document.querySelectorAll(`#${elem} .dot`);
                        dotActive.classList.remove('active');
                        dotActive = document.querySelector(`#${elem} .dot-${i}`);
                        dotActive.classList.add('active');
                    }
                    if(autoP){
                        clearInterval(autoScroll)
                        setLoopSlide()
                    }
                }
                function right(qtynextI) {
                    const maxIndex = Math.round((listI.length - qtyItem) / qtynextI);
                    i = i >= maxIndex ? 0 : i + 1;
                    const transform = ((widthS / listI.length)) * Math.min(i * qtynextI, (listI.length - qtyItem) / qtynextI) ;
                    slideC.style.transform = `translateX(${-transform}px)`;
                    if(dots) {
                        let dotActive = document.querySelector(`#${elem} .dot.active`);
                        let listDots = document.querySelectorAll(`#${elem} .dot`);
                        dotActive.classList.remove('active');
                        dotActive = document.querySelector(`#${elem} .dot-${i}`);
                        dotActive.classList.add('active');
                    }
                    if(autoP) {
                        clearInterval(autoScroll);
                        setLoopSlide();
                    }
                }
                function setLoopSlide(){
                    autoScroll = setInterval(() => right(nextI || 1), timeS);
                }
                autoP && setLoopSlide();
                let isDragStart = false, mousedown, mouseup, touch;
                let link = '';
                const dragStart = (e) => {
                    e.preventDefault();
                    if (e.button === 2) return false;
                    mousedown = (e.type === 'mousedown') ? e.pageX : e.changedTouches[e.changedTouches.length - 1].pageX;
                    isDragStart = true;
                }
                const dragEnd = (e) => {
                    if (e.button === 2) return false;
                    mouseup = (e.type === 'mouseup') ? e.pageX : e.changedTouches[e.changedTouches.length - 1].pageX;
                    isDragStart = false;
                    checkHref = e.target;
                    if (mousedown < mouseup) left(nextI || 1);
                    else if (mousedown > mouseup) right(nextI || 1);
                    else {
                        let dataLink = checkHref.getAttribute('data-href') || '';
                        if (dataLink != '') window.location.href = dataLink;
                    }
                }
                const dragMobileStart = (e) => {
                    touch = e.changedTouches[e.changedTouches.length - 1];
                    mousedown = touch.pageX;
                    isDragStart = true;
                }
                const dragMobileEnd = (e) => {
                    touch = e.changedTouches[e.changedTouches.length - 1];
                    mouseup = touch.pageX;
                    isDragStart = false;
                    checkHref = e.target;
                    if (mousedown < mouseup) left(nextI || 1);
                    else if (mousedown > mouseup) right(nextI || 1);
                    else {
                        let dataLink = checkHref.getAttribute('data-href') || '';
                        if (dataLink != '') window.location.href = dataLink;
                    }
                }
                slideC.addEventListener('mousedown', dragStart, {passive: true});
                slideC.addEventListener("touchstart", dragMobileStart, {passive: true});
                slideC.addEventListener('mouseup', dragEnd, {passive: true});
                slideC.addEventListener("touchend", dragMobileEnd, {passive: true});
            }
        });
    }
}

'use strict';

var $ = MONAD();

$.config = {
    'slow': 16,
    'default': 20,
    'fast': 24
}

// DOM Manipulation 
$.fn('html',function(el) {       
    return el.innerHTML;
});

$.fn('text',function(el) { 
    console.log('text');   
    return el.innerText;
});

$.fn('hide',function(el) {
    el.style.display = 'none';
    return el;
});

$.fn('addClass',function(el){
    var args = [];    
    for(var i = 1, len = arguments.length ; i < len; i++ ) {            
        args.push(arguments[i]);
    }                       
    el.classList.add.apply(el.classList,args);
    return el;
});

$.fn('removeClass',function(el){
    var args = [];    
    for(var i = 1, len = arguments.length ; i < len; i++ ) {            
        args.push(arguments[i]);
    }                       
    el.classList.remove.apply(el.classList,args);
    return el;
});

$.fn('hide',function(el){
    el.style.display = 'none';
    return el;
});

$.fn('show',function(el){
    el.style.display = 'block';
    return el;
});

$.fn('log',function(el){
    return el;
});

$.fn('fadeOut',function(el){

    el.style.opacity = 1;

    var duration = 1500;

    var cbFunc = arguments[1] || null;    
        

    var tick = function () {        
        el.style.opacity = +el.style.opacity - ($.config.slow / duration);
        if(+el.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick,16));
        }
    };

    tick();

    if(typeof cbFunc === "function") {    
        cbFunc.call(undefined,el); 
    }

    return el;
});

$.fn('fadeIn',function(el){

    el.style.opacity = 0;

    var duration = 500;

    var tick = function () {
        el.style.opacity = +el.style.opacity + ($.config.default  / duration);        
        if(+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick,16));
        }
    };

    tick();
    return el;
});

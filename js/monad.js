function MONAD() {
  var prototype = Object.create(null);
  var ddd = true;
  function unit(value) {
    var monad = Object.create(prototype);
    if(ddd) {
        value = this.checkElement(value);
        ddd = false;
    }

    monad.bind = function(func, args) { 
        var str = "", 
            arr = [],
            result;

        for(var i = 0, len = value.length; i < len ; i++) {
            result = func.apply(undefined,[value[i]].concat(Array.prototype.slice.apply(args || [])));
            if(typeof result === "string") {
                str += result;
            } else {
                arr.push(result);                            
            }
        }
        
        if(arr.length > 0) {
            return arr;
        }
        return str; 
    };

    return monad;
  }

  this.checkElement = function(value) {
    var nodeType,ele;
    
    console.log(value);

    if(value[0].nodeType) {        
        return value;
    }

    if(typeof value === 'string') {
        ele = document.querySelectorAll(value);        
        if(ele.length > 0) {            
            nodeType = ele[0].nodeType;
            if(nodeType === 1 || nodeType === 9 || nodeType === 11) {                
                return ele;
            }
        }
    } 

    throw new Error(value + ' is not a valid DOM element.');    
  }

  unit.fn = function(name,func){  
    prototype[name] = function () {  
        var args = [];
        // ES6 spread argument is more aplicable 
        for(var i = 0 ,len = arguments.length ; i < len ; i++ ) {
            args.push(arguments[i]);        
        }                
        return unit(this.bind(func,args));
    };
    return unit;
  }

  return unit;
}


function MONAD() {
  var prototype = Object.create(null);
  
  function unit(value) {
    var monad = Object.create(prototype);
    value = this.checkElement(value);

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
    
    value = document.querySelectorAll(value);
    
    return value;
  }

  unit.fn = function(name,func){     
    prototype[name] = function () {  
      var args = [];
      for(var i = 0 ,len = arguments.length ; i < len ; i++ ) {
        args.push(arguments[i]);        
      }                
      return this.bind(func,args);
    };
  }
  return unit;
}


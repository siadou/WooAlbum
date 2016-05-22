
Array.prototype.contains = function(obj){
    var i = this.length;
    while(i--) {
        if(this[i] === obj) {
            return false;
        }
        return true;
    }
}
function Modal(ele) {
    if (!(this instanceof Modal)) return new Modal(ele);
    var div = document.createElement("div");
    div.setAttribute("class", 'modal');
    div.appendChild(ele);
    this.ele = div;
    this.effect = "";
    this._append = false;
    this.ele.addEventListener("click", function(evt){
        var target = evt.target;
        if(target.nodeName.toLowerCase() !== 'img') {
            this.hide();
        }
    }.bind(this));
}

Modal.prototype = {
    EffectName : ['fade'],
    setEffect : function(effect){
        effect =  effect.toLowerCase();
        if(this.EffectName.contains(effect)) {
            this.effect = effect;
        }
    },
    setElement : function(ele){
        //var div = document.createElement("div");
        //div.setAttribute("class", 'modal');
        //div.appendChild(this.ele);
        //this.ele = div;
        this.ele.innerHTML = "";
        this.ele.appendChild(ele);
    },
    show  : function(){
        if(this._append) {
            this.ele.style.display = "block";
        } else {
            this._append = true;
            document.body.appendChild(this.ele);
            this.ele.style.display = "block";
        }
    },
    hide : function(){
        //document.body.removeChild(this.ele);
            this.ele.style.display = "none";
        //}
    },
    addClass : function(name){
        var oldClass = this.ele.getAttribute("class");
        var oldClassA = oldClass.split(" ");
        if(!oldClassA.contains(name)) {
            this.ele.setAttribute("class", oldClass + " " + name); 
        } 
    },
    removeClass : function(name){
        var oldClass = this.ele.getAttribute("class");
        var oldClassA = oldClass.split(" ");
        var i = oldClassA.length;
        var newClass = "";
        while(i--) {
            if(oldClassA[i] !== name) {
                newClass += " " + oldClassA[i];
            }    
        }
        this.ele.setAttribute("class", newClass);
    },
}

export default Modal;



import BaseAlbum from "./BaseAlbum.js";
'use strict';
function PuzzleAlbum(opt){
    BaseAlbum.call(this, opt); 
    this.type = 'puzzle';
    this.tmp = {
        index : 0,
    }
    this.calSize  = null;
    this.init(opt); 
}

PuzzleAlbum.prototype = new BaseAlbum();
PuzzleAlbum.prototype.constructor = PuzzleAlbum;

PuzzleAlbum.prototype._clearTmp = function(){
    this.tmp.index = 0; 
} 
PuzzleAlbum.prototype.enableScrollFetch = function(){
    this.scrollFetch = false;
    // do nothing
} 
PuzzleAlbum.prototype._layItem = function(div, include){
    this.tmp.index++ ;
    var size = this.calSize(this.tmp.index);
    var style = "";
    for(var k in size) {
        style += k + ":" + size[k] + ";";
    }
    div.setAttribute("style", style);
    this.hideLoading();
    this.container.appendChild(div);
    if(!include) {
        this.elements.push(div);
    }
}

PuzzleAlbum.prototype.setSize = function (width, height) {
    if(width === undefined || height === undefined) {
        console.error("WOOALBUM ERROR : undefined container width or height!");    
    }
    if(this.config.size === undefined) {
        this.config.size = {
            width : 'auto',    
            height : 'auto',    
        };
    }
    this.config.size.width = width;
    this.config.size.height = height;
    if(width === 'auto') {
        this.size.width = window.innerWidth - 20;
    } else {
        this.size.width = parseInt(width);
    }
    this.container.style.width = this.size.width + "px"; 
    if(height === 'auto') {
        this.size.height = window.innerHeight;
    } else {
        this.size.height = parseInt(height);
    }
    this.container.style.height = this.size.height + "px"; 

};


PuzzleAlbum.prototype._calLay = function(){
    var size = {
        1 : function(count){
            var in_size  = {
                1 : {width: "100%", height : "100%"} 
            }
            return in_size[1];
        } , 
        2 : function(count){
            var gutterx = this.gutter.x / 2;
            var in_size  = {
                1 : {width: "66.6666666666666%", height : "100%", position:"absolute", left:"-"+ gutterx +"px"}, 
                2 : {width: "66.6666666666666%", height : "100%", position:"absolute", right:"-"+ gutterx +"px"}, 
            }
            return in_size[count];
        } , 
        3 : function(count){
            var x = this.size.width;
            var y = this.size.height;
            var gutterx = this.gutter.x;
            var guttery = this.gutter.y;
            var height_tmp = parseInt((y - guttery)/ 2);
            var in_size  = {
                1 : {width: "" + (x - height_tmp - gutterx) + "px", height : "100%" , float:"left"}, 
                2 : {width: "" + height_tmp + "px", height : "" + height_tmp + "px", float:"right"}, 
                3 : {width: "" + height_tmp + "px", height : "" + height_tmp + "px", position:"absolute", bottom:"0", right:"0"}, 
            }
            return in_size[count];
        } , 
        4 : function(count){
            var x = this.size.width;
            var y = this.size.height;
            var gutterx = this.gutter.x;
            var guttery = this.gutter.y;
            var tmp_w = (x - gutterx) / 2;
            var tmp_h = (y - guttery) / 2;
            var in_size  = {
                1 : {width: tmp_w + "px", height : tmp_h + "px", position:"absolute", left:"0", top:"0"}, 
                2 : {width: tmp_w + "px", height : tmp_h + "px", position:"absolute", right:"0", top:"0"}, 
                3 : {width: tmp_w + "px", height : tmp_h + "px" , position:"absolute", left:"0", bottom:"0"}, 
                4 : {width: tmp_w + "px", height : tmp_h + "px", position:"absolute", right:"0", bottom:"0"}, 
            }
            return in_size[count];
        } , 
        5 : function(count){
            var x = this.size.width;
            var y = this.size.height;
            var gutterx = this.gutter.x;
            var guttery = this.gutter.y;
            var tmp_w = parseInt((x - 2 * gutterx)/ 3);
            var tmp_h = parseInt((y - guttery)/ 3);
            var in_size  = {
                1 : {width: "" + (tmp_w * 2 + gutterx) + "px", height : "" + tmp_h * 2 + "px", position: "absolute", left: 0, top: 0 }, 
                2 : {width: "" + tmp_w + "px", height : "" + tmp_w + "px", position: "absolute", right:0, top: 0 }, 
                3 : {width: "" + tmp_w + "px", height : "" + tmp_h + "px", position: "absolute", left : 0, bottom: 0}, 
                4 : {width: "" + tmp_w + "px", height : "" + tmp_h + "px", position: "absolute", bottom: 0, left: (tmp_w + gutterx) + "px"}, 
                5 : {width: "" + tmp_w + "px", height : "" + (y - tmp_w - guttery) + "px", position:"absolute", bottom: "0", right:"0"}, 
            }
            return in_size[count];
        } , 
        6 : function(count){
            var x = this.size.width;
            var y = this.size.height;
            var gutterx = this.gutter.x;
            var guttery = this.gutter.y;
            var tmp_w = parseInt((x - 2 * gutterx)/ 3);
            var tmp_h = parseInt((y - 2 * guttery)/ 3);
            var in_size  = {
                1 : {width: "" + (tmp_w * 2 + gutterx) + "px", height : "" + (tmp_h * 2+ guttery) + "px", position: "absolute", left: 0, top: 0 }, 
                2 : {width: "" + tmp_w + "px", height : "" + tmp_h + "px", position: "absolute", right: 0, top: 0 }, 
                3 : {width: "" + tmp_w + "px", height : "" + tmp_h + "px", position: "absolute", right: 0, top: "" + (tmp_h + guttery) + "px" }, 
                4 : {width: "" + tmp_w + "px", height : "" + tmp_h + "px", position: "absolute", left: 0, bottom: 0 }, 
                5 : {width: "" + tmp_w + "px", height : "" + tmp_h + "px", position: "absolute", left: "" + (tmp_w + gutterx) + "px", bottom: 0 }, 
                6 : {width: "" + tmp_w + "px", height : "" + tmp_h + "px", position: "absolute", right: 0, bottom: 0 }, 
            }
            return in_size[count];
        }
    };

    var len = this.images.length;
    if(len > 6) {
        len = 6;
    }
    if(len < 1) {
        len = 1;
    }
    this.calSize = size[len];
    var oldclass = this.container.getAttribute("class");
    var reg = /\sele-[1-6]/;
    if(reg.test(oldclass)) {
        var newclass = oldclass.replace(reg, " ele-" + len + " ");
        this.container.setAttribute("class", newclass);
    } else {
        this.container.setAttribute("class", oldclass + " ele-" + len);
    }

}

BaseAlbum.prototype.addImage = function (image) {
    if (typeof image === 'string') {
        this.addImage([image]);
        return;
    }
    for(var i = 0, len = image.length; i < len; i++) {
        this.images.push(image[i]);
    }
    this._calLay();
    this._clearTmp();
    this.layLoadItems();
    for(var i = 0, len = image.length; i < len; i++) {
        this._addImage(image[i]);
    }
};



PuzzleAlbum.prototype._init = function(config){
}

export default PuzzleAlbum;



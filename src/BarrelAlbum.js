import BaseAlbum from "./BaseAlbum.js";
function BarrelAlbum(opt) {
    BaseAlbum.call(this, opt);
    this.type = 'barrel';
    this.barrelBin = {
        max : 0,
        min : 0,
    };
    this.barrelHeight = {
        max : 0,
        min : 0,
    };
    this.tmp = {
        row : [],
        ratioSum : 0,
        ratioMax : 0,
        ratioMaxK : 0,
        ratioThre : {
            min : 0,
            max : 0,
        },
        top : 0,
    };
    this.init(opt); 
}


BarrelAlbum.prototype = new BaseAlbum();
BarrelAlbum.prototype.constructor = BarrelAlbum;


BarrelAlbum.prototype._clearTmp = function(){
    this.tmp.row = [];
    this.tmp.ratioSum = 0;
    this.tmp.top = 0;
    this.tmp.ratioMax = 0;
    this.tmp.ratioMaxK = 0;
}


BarrelAlbum.prototype._layItem = function(div, include){
    div.style.visibility = 'hidden';
    div.style.display = 'block';
    this.tmp.row.push(div);
    var img = div.getElementsByTagName("img")[0];
    var _tmpr =  img.offsetWidth/ img.offsetHeight;
    this.tmp.ratioSum += _tmpr;
    if(_tmpr > this.tmp.ratioMax) {
        this.tmp.ratioMax = _tmpr;
        this.tmp.ratioMaxK = this.tmp.row.length - 1;
    }
    var _tmpw = this.size.width - this.gutter.x * (this.tmp.row.length -1);
    this.tmp.ratioThre.min = _tmpw / this.barrelHeight.max;
    this.tmp.ratioThre.max = _tmpw / this.barrelHeight.min;
    if(this.tmp.ratioSum >= this.tmp.ratioThre.min && this.tmp.ratioSum <= this.tmp.ratioThre.max) {
        this.hideLoading();
        //console.log(this.tmpRatio);
        //push this.tmpRow
        var height = Math.round(_tmpw / this.tmp.ratioSum);
        var left = 0;
        for(var i = 0, len = this.tmp.row.length; i < len ; i++) {
            var div = this.tmp.row[i];
            var img = div.getElementsByTagName('img')[0];
            div.style.height = height + 'px';
            img.style.height =  height + 'px';
            div.style.top = this.tmp.top + 'px';
            div.style.left = left + 'px';
            div.style.display = 'block';
            div.style.visibility = '';
            left += this.gutter.x + this.tmp.row[i].offsetWidth; 
            //console.log(img.getAttribute("src"));
        }
        // 最后一个对齐
        var last = this.tmp.row[this.tmp.row.length -1 ] ;
        last.style.left = (this.size.width - last.offsetWidth) + 'px';
        
        this.tmp.top += this.gutter.y + height;
        this.container.style.height = (this.tmp.top - this.gutter.y) + 'px';
        this.tmp.row = [];
        this.tmp.ratioSum = 0;
        this.tmp.ratioMax = 0;
        this.tmp.ratioMaxK = 0;
    } else if(this.tmp.ratioSum > this.tmp.ratioThre.max){
        this.hideLoading();
        /*
         * 找到最长的图片进行压缩
         */
        console.log("woooooo~");
        var height = this.barrelHeight.min;
        var left = 0;
        var maxHeight = Math.round((this.tmp.ratioThre.max + this.tmp.ratioMax - this.tmp.ratioSum) * height / this.tmp.ratioMax);
        var maxPad = Math.round((height - maxHeight) / 2);
        for(var i = 0, len = this.tmp.row.length; i < len ; i++) {
            var div = this.tmp.row[i];
            var img = div.getElementsByTagName('img')[0];
            if( i !== this.tmp.ratioMaxK) {
                div.style.height = height + 'px';
                img.style.height = height + 'px';
                div.style.top = this.tmp.top + 'px';
            } else {
                div.style.height = maxHeight + 'px';
                img.style.height =  maxHeight + 'px';
                div.style.top = (this.tmp.top + maxPad) + 'px';
            }
            div.style.left = left + 'px';
            div.style.display = 'block';
            div.style.visibility = '';
            left += this.gutter.x + this.tmp.row[i].offsetWidth; 
        }
        var last = this.tmp.row[this.tmp.row.length -1 ] ;
        last.style.left = (this.size.width - last.offsetWidth) + 'px';
        
        this.tmp.top += this.gutter.y + height;
        this.container.style.height = (this.tmp.top - this.gutter.y) + 'px';
        this.tmp.row = [];
        this.tmp.ratioSum = 0;
        this.tmp.ratioMax = 0;
        this.tmp.ratioMaxK = 0;
    } else {
        div.style.display = 'none';
    }
    if(!include) {
        this.elements.push(div);
        if(this.elements.length == this.images.length) {
            // last element
            if(this.isResizeRefreshEnabled()) {
                // auto
                if(this.config.size.height === 'auto') {
                    if(this.container.offsetHeight <= window.innerHeight) {
                        this.fetchData();             
                    }
                } else {
                    if(this.container.offsetHeight <= this.config.size.height) {
                        this.fetchData();
                    }
                }
                // count
            }
        }
    }
}

BarrelAlbum.prototype._initCfg = function(config){
    var barrel = config.barrel;
    this.setBarrelHeight(barrel.heightMin , barrel.heightMax, false);
}


BarrelAlbum.prototype._calLay = function(){
    this.tmp.ratioThre.min = this.size.width / this.barrelHeight.max;
    this.tmp.ratioThre.max = this.size.width / this.barrelHeight.min;
}


BarrelAlbum.prototype._init = function(){
}



/************* 以下是本库提供的公有方法 *************/

/**
 * 设置木桶模式每行图片数的上下限
 * @param {number} min 最少图片数（含）
 * @param {number} max 最多图片数（含）
 */
BarrelAlbum.prototype.setBarrelBin = function (min, max) {

    // 注意异常情况的处理，做一个健壮的库
    if (min === undefined || max === undefined || min > max) {
        console.error('error barrel bin value!');
        return;
    }
    this.barrelBin.min = parseInt(min);
    this.barrelBin.max = parseInt(max);
};



/**
 * 获取木桶模式每行图片数的上限
 * @return {number} 最多图片数（含）
 */
BarrelAlbum.prototype.getBarrelBinMax = function () {
    return this.barrelBin.max;
};



/**
 * 获取木桶模式每行图片数的下限
 * @return {number} 最少图片数（含）
 */
BarrelAlbum.prototype.getBarrelBinMin = function () {
    return this.barrelBin.min;
};



/**
 * 设置木桶模式每行高度的上下限，单位像素
 * @param {number} min 最小高度
 * @param {number} max 最大高度
 * @param {boolean}  refresh 是否刷新, 默认为true 
 */
BarrelAlbum.prototype.setBarrelHeight = function (min, max, refresh) {
    if (min === undefined || max === undefined || min > max) {
        console.error('error barrel height value');
        return;
    }
    if(refresh === undefined) {
        refresh = true;
    }
    this.barrelHeight.min = parseInt(min);
    this.barrelHeight.max = parseInt(max);
    if(refresh) {
        this._reload();   
    }
};



/**
 * 获取木桶模式每行高度的上限
 * @return {number} 最多图片数（含）
 */
BarrelAlbum.prototype.getBarrelHeightMax = function () {
    return this.height.max;
};



/**
 * 获取木桶模式每行高度的下限
 * @return {number} 最少图片数（含）
 */
BarrelAlbum.prototype.getBarrelHeightMin = function () {
    return this.height.max;
};

export default BarrelAlbum;

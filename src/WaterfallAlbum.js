'use strict'
import BaseAlbum from "./BaseAlbum.js";
function WaterfallAlbum(opt){
    BaseAlbum.call(this, opt); 
    this.type = 'waterfall';
    this.col = {
        num : 0,
    };
    this.tmp = {
        col : [],
    };
    this.colWidth = 0;
    this.init(opt); 

}
WaterfallAlbum.prototype = new BaseAlbum();

WaterfallAlbum.prototype.constructor = WaterfallAlbum;

WaterfallAlbum.prototype._clearTmp = function(){
    this.tmp.col = [];
    for(var i = 0; i < this.col.num; i++) {
        this.tmp.col.push(0 -  this.gutter.y);
    }
}

WaterfallAlbum.prototype._layItem = function(div, include){
    var img = div.getElementsByTagName("img")[0];
    var no = this.__checkCol();
    console.log(no);
    console.log(this.tmp.col);
    div.style.height = (this.colWidth * img.offsetHeight / img.offsetWidth) + "px";
    img.style.height = div.style.height;
    div.style.width = this.colWidth + "px";
    img.style.width = div.style.width;
    div.style.left = ((this.colWidth + this.gutter.y) * no) + "px";
    div.style.top = (this.tmp.col[no] + this.gutter.y) + "px";
    this.container.style.minHeight = this.tmp.col[this.__checkMaxCol()] + 'px';
    this.tmp.col[no] += parseInt(img.style.height) + this.gutter.y ; 
    this.hideLoading();
    div.style.visibility = '';
    if(!include) {
        this.elements.push(div);
    }
}

WaterfallAlbum.prototype.__checkMaxCol = function(){
    var k = 0;
    var tmp = this.tmp.col[k];
    for(var i = 1, len = this.tmp.col.length; i < len; i++) {
        if(this.tmp.col[i] > tmp) {
            k = i;
            tmp = this.tmp.col[i];
        }
    }
    return k;
}
WaterfallAlbum.prototype.__checkCol = function(){
    var k = 0;
    var tmp = this.tmp.col[k];
    for(var i = 1, len = this.tmp.col.length; i < len; i++) {
        if(this.tmp.col[i] < tmp) {
            k = i;
            tmp = this.tmp.col[i];
        }
    }
    return k;
}

WaterfallAlbum.prototype._initCfg = function(config){
    var waterfall = config.waterfall;
    this.setColNum(waterfall.colNum, false);
}

WaterfallAlbum.prototype._calLay = function(){
    this.colWidth = (this.size.width + this.gutter.x) / this.col.num - this.gutter.x;
    if(this.colWidth < 0) {
        console.error("col width can't be negative!");
    }
}

WaterfallAlbum.prototype._init = function(config){
    for(var i = 0; i < this.col.num; i++) {
        this.tmp.col.push(0 -  this.gutter.y);
    }
}

/************* 以下是本库提供的公有方法 *************/

/**
 * 设置瀑布模式的列数
 * @param {number} 瀑布模式的列数
 * @param {boolean}  refresh 是否刷新, 默认为true 
 */ 
WaterfallAlbum.prototype.setColNum = function(num, refresh){
    num = parseInt(num);
    if(num === undefined || num <= 0) {
        return console.error("WOOALBUM ERROR : undefined waterfall col number");
    }
    if(refresh === undefined) {
        refresh = true;
    }
    this.col.num = parseInt(num);
    if(refresh) {
        this._reload();    
    }
}

/**
 * 获得瀑布模式的列数
 * @return {number} 瀑布模式的列数
 */ 
WaterfallAlbum.prototype.getColNum = function(){
    return this.col.num;
}

export default WaterfallAlbum;



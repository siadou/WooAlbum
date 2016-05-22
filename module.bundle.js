/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackMissingModule() { throw new Error("Cannot find module \"./src/WaterfallAlbum\""); }());
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	import BaseAlbum from "./BaseAlbum.js";
	//(function (window) {
	'use strict';
	function PuzzleAlbum() {
	    BaseAlbum.call(this);
	    this.type = 'PUZZLE';
	    this.tmp = {
	        index: 0
	    };
	    this.calSize = null;
	}

	PuzzleAlbum.prototype = new BaseAlbum();
	PuzzleAlbum.prototype.constructor = BarrelAlbum;

	//layItem
	//layLoadItems
	//
	PuzzleAlbum.prototype.clearTmp = function () {
	    this.tmp.index = 0;
	};
	PuzzleAlbum.prototype.layItem = function (div) {
	    this.tmp.index = this.tmp.index++;
	    var size = this.calSize(this.tmp.index);
	    var style = "";
	    for (var k in size) {
	        style += k + ":" + size[k] + ";";
	    }
	    div.setAttribute("style", style);
	    this.container.appendChild(div);
	};

	//PuzzleAlbum.prototype.layLoadItems = function(){
	//}

	PuzzleAlbum.prototype.calLay = function () {};
	PuzzleAlbum.prototype._init = function () {
	    var size = {
	        1: function (count) {
	            var in_size = {
	                1: { width: "100%", height: "100%" }
	            };
	            return in_size[1];
	        },
	        2: function (count) {
	            var in_size = {
	                1: { width: "66.6666666666666%", height: "100%", position: "absolute", left: "-1px" },
	                2: { width: "66.6666666666666%", height: "100%", position: "absolute", right: "-1px" }
	            };
	            return in_size[count];
	        },
	        3: function (count) {
	            var height_tmp = parseInt(y / 2);
	            var in_size = {
	                1: { width: "" + (x - height_tmp) + "px", height: "100%", float: "left" },
	                2: { width: "" + height_tmp + "px", height: "" + height_tmp + "px", float: "left" },
	                3: { width: "" + height_tmp + "px", height: "" + height_tmp + "px", float: "left" }
	            };
	            return in_size[count];
	        },
	        4: function (count) {
	            var in_size = {
	                1: { width: "50%", height: "50%", float: "left" }
	            };
	            return in_size[1];
	        },
	        5: function (count) {
	            var height_tmp = parseInt(x / 3);
	            var in_size = {
	                1: { width: "66.6666666666666%", height: "66.6666666666666%", float: "left" },
	                2: { width: "" + height_tmp + "px", height: "" + height_tmp + "px", float: "left" },
	                3: { width: "33.33333333333333%", height: "33.33333333333333%", float: "left", clear: "both" },
	                4: { width: "33.33333333333333%", height: "33.33333333333333%", float: "left" },
	                5: { width: "" + height_tmp + "px", height: "" + (y - height_tmp) + "px", position: "absolute", bottom: "0", right: "0" }
	            };
	            return in_size[count];
	        },
	        6: function (count) {
	            var in_size = {
	                1: { width: "66.6666666666666%", height: "66.6666666666666%", float: "left" },
	                2: { width: "33.33333333333333%", height: "33.33333333333333%", float: "left" },
	                3: { width: "33.33333333333333%", height: "33.33333333333333%", float: "left" },
	                4: { width: "33.33333333333333%", height: "33.33333333333333%", float: "left" },
	                5: { width: "33.33333333333333%", height: "33.33333333333333%", float: "left" },
	                6: { width: "33.33333333333333%", height: "33.33333333333333%", float: "left" }
	            };
	            return in_size[count];
	        }
	    };
	    this.calSize = size[this.images.length];
	};
	//}(window));

	export default PuzzleAlbum;

/***/ },
/* 3 */
/***/ function(module, exports) {

	import BaseAlbum from "./BaseAlbum.js";
	function BarrelAlbum() {
	    BaseAlbum.call(this);
	    this.barrelBin = {
	        max: 0,
	        min: 0
	    };
	    this.barrelHeight = {
	        max: 0,
	        min: 0
	    };
	    this.tmp = {
	        row: [],
	        ratio: 0,
	        top: 0
	    };
	}

	BarrelAlbum.prototype = new BaseAlbum();
	BarrelAlbum.prototype.constructor = BarrelAlbum;
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
	    this.bin.min = parseInt(min);
	    this.bin.max = parseInt(max);
	};

	/**
	 * 获取木桶模式每行图片数的上限
	 * @return {number} 最多图片数（含）
	 */
	BarrelAlbum.prototype.getBarrelBinMax = function () {
	    return this.bin.max;
	};

	/**
	 * 获取木桶模式每行图片数的下限
	 * @return {number} 最少图片数（含）
	 */
	BarrelAlbum.prototype.getBarrelBinMin = function () {
	    return this.bin.min;
	};

	/**
	 * 设置木桶模式每行高度的上下限，单位像素
	 * @param {number} min 最小高度
	 * @param {number} max 最大高度
	 */
	BarrelAlbum.prototype.setBarrelHeight = function (min, max) {
	    if (min === undefined || max === undefined || min > max) {
	        console.error('error barrel height value');
	        return;
	    }
	    this.bin.min = parseInt(min);
	    this.bin.max = parseInt(max);
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

	BarrelAlbum.prototype.clearTmp = function () {
	    this.tmp.row = [];
	    this.tmp.ratio = 0;
	    this.tmp.top = 0;
	};

	BarrelAlbum.prototype.layItem = function (div) {
	    var oldRatio = this.tmp.ratio;
	    div.style.visibility = 'hidden';
	    div.style.display = 'block';
	    this.tmp.row.push(div);
	    var img = div.getElementsByTagName("img")[0];
	    this.tmp.ratio += img.offsetWidth / img.offsetHeight;
	    if (this.tmp.ratio > this.ratioThre.min) {
	        //console.log(this.tmpRatio);
	        //push this.tmpRow
	        //var height = (this.conwidth + this.option.lineMar) / this.tmpRatio;
	        var height = (this.conwidth - this.option.lineMar * (this.tmp.row.length - 1)) / this.tmp.ratio;
	        console.log(this.tmp.ratio);
	        console.log(height);
	        var left = 0;
	        for (var i = 0, len = this.tmp.row.length; i < len; i++) {
	            var div = this.tmp.row[i];
	            var img = div.getElementsByTagName('img')[0];
	            div.style.height = Math.round(height) + 'px';
	            img.style.height = Math.round(height) + 'px';
	            div.style.top = this.tmp.top + 'px';
	            div.style.left = left + 'px';
	            div.style.display = 'block';
	            div.style.visibility = '';
	            left += this.option.lineMar + this.tmp.row[i].offsetWidth;
	            //console.log(img.getAttribute("src"));
	        }
	        // 最后一个对齐
	        var last = this.tmp.row[this.tmp.row.length - 1];
	        last.style.left = this.conwidth - last.offsetWidth + 'px';

	        this.tmp.top += this.option.lineSpace + height;
	        this.element.style.height = this.tmp.top - this.option.lineSpace + 'px';
	        this.tmp.row = [];
	        this.tmp.ratio = 0;
	    } else if (this.tmp.ratio > this.ratioThre.max) {
	        /*
	        console.log("oversizewarning!!!");
	        console.log(this.tmpRatio);
	        var height = (this.conwidth + this.option.lineMar) / this.tmpRatio;
	        console.log(height);
	        var left = 0;
	        for(var i = 0, len = this.tmpRow.length; i < len ; i++) {
	            var div = this.tmpRow[i];
	            var img = div.getElementsByTagName('img')[0];
	            div.style.height = height + 'px';
	            img.style.height =  height + 'px';
	            div.style.top = this.tmpTop + 'px';
	            div.style.left = left + 'px';
	            div.style.display = 'block';
	            div.style.visibility = "";
	            left += this.option.lineMar + this.tmpRow[i].offsetWidth; 
	            //console.log(img.getAttribute("src"));
	        }
	        this.tmpTop += this.option.lineSpace + height;
	        this.element.style.height = (this.tmpTop - this.option.lineSpace) + 'px';
	        this.tmpRow = [];
	        this.tmpRatio = 0;
	        */
	    } else {
	            div.style.display = 'none';
	        }
	};

	BarrelAlbum.prototype.calLay = function () {};

	BarrelAlbum.prototype._init = function () {};

	export default BarrelAlbum;

/***/ }
/******/ ]);
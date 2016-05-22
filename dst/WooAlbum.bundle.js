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
/******/ 	__webpack_require__.p = "./dst";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _WaterfallAlbum = __webpack_require__(1);

	var _WaterfallAlbum2 = _interopRequireDefault(_WaterfallAlbum);

	var _PuzzleAlbum = __webpack_require__(4);

	var _PuzzleAlbum2 = _interopRequireDefault(_PuzzleAlbum);

	var _BarrelAlbum = __webpack_require__(5);

	var _BarrelAlbum2 = _interopRequireDefault(_BarrelAlbum);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function WooAlbum(type, opt) {
	    function replaceFirstUpper(str) {
	        str = str.toLowerCase();
	        return str.replace(/\b(\w)|\s(\w)/g, function (m) {
	            return m.toUpperCase();
	        });
	    }
	    var _type = type.toLowerCase();
	    var TYPE = {
	        'waterfall': _WaterfallAlbum2.default,
	        'puzzle': _PuzzleAlbum2.default,
	        'barrel': _BarrelAlbum2.default
	    };
	    if (TYPE[_type] === undefined) {
	        console.error("The type doesnt exsist!");
	    } else {
	        return new TYPE[_type](opt);
	    }
	}
	window.WooAlbum = WooAlbum;
	exports.default = WooAlbum;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _BaseAlbum = __webpack_require__(2);

	var _BaseAlbum2 = _interopRequireDefault(_BaseAlbum);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function WaterfallAlbum(opt) {
	    _BaseAlbum2.default.call(this, opt);
	    this.type = 'waterfall';
	    this.col = {
	        num: 0
	    };
	    this.tmp = {
	        col: []
	    };
	    this.colWidth = 0;
	    this.init(opt);
	}
	WaterfallAlbum.prototype = new _BaseAlbum2.default();

	WaterfallAlbum.prototype.constructor = WaterfallAlbum;

	WaterfallAlbum.prototype._clearTmp = function () {
	    this.tmp.col = [];
	    for (var i = 0; i < this.col.num; i++) {
	        this.tmp.col.push(0 - this.gutter.y);
	    }
	};

	WaterfallAlbum.prototype._layItem = function (div, include) {
	    var img = div.getElementsByTagName("img")[0];
	    var no = this.__checkCol();
	    console.log(no);
	    console.log(this.tmp.col);
	    div.style.height = this.colWidth * img.offsetHeight / img.offsetWidth + "px";
	    img.style.height = div.style.height;
	    div.style.width = this.colWidth + "px";
	    img.style.width = div.style.width;
	    div.style.left = (this.colWidth + this.gutter.y) * no + "px";
	    div.style.top = this.tmp.col[no] + this.gutter.y + "px";
	    this.container.style.minHeight = this.tmp.col[this.__checkMaxCol()] + 'px';
	    this.tmp.col[no] += parseInt(img.style.height) + this.gutter.y;
	    this.hideLoading();
	    div.style.visibility = '';
	    if (!include) {
	        this.elements.push(div);
	    }
	};

	WaterfallAlbum.prototype.__checkMaxCol = function () {
	    var k = 0;
	    var tmp = this.tmp.col[k];
	    for (var i = 1, len = this.tmp.col.length; i < len; i++) {
	        if (this.tmp.col[i] > tmp) {
	            k = i;
	            tmp = this.tmp.col[i];
	        }
	    }
	    return k;
	};
	WaterfallAlbum.prototype.__checkCol = function () {
	    var k = 0;
	    var tmp = this.tmp.col[k];
	    for (var i = 1, len = this.tmp.col.length; i < len; i++) {
	        if (this.tmp.col[i] < tmp) {
	            k = i;
	            tmp = this.tmp.col[i];
	        }
	    }
	    return k;
	};

	WaterfallAlbum.prototype._initCfg = function (config) {
	    var waterfall = config.waterfall;
	    this.setColNum(waterfall.colNum, false);
	};

	WaterfallAlbum.prototype._calLay = function () {
	    this.colWidth = (this.size.width + this.gutter.x) / this.col.num - this.gutter.x;
	    if (this.colWidth < 0) {
	        console.error("col width can't be negative!");
	    }
	};

	WaterfallAlbum.prototype._init = function (config) {
	    for (var i = 0; i < this.col.num; i++) {
	        this.tmp.col.push(0 - this.gutter.y);
	    }
	};

	/************* 以下是本库提供的公有方法 *************/

	/**
	 * 设置瀑布模式的列数
	 * @param {number} 瀑布模式的列数
	 * @param {boolean}  refresh 是否刷新, 默认为true 
	 */
	WaterfallAlbum.prototype.setColNum = function (num, refresh) {
	    num = parseInt(num);
	    if (num === undefined || num <= 0) {
	        return console.error("WOOALBUM ERROR : undefined waterfall col number");
	    }
	    if (refresh === undefined) {
	        refresh = true;
	    }
	    this.col.num = parseInt(num);
	    if (refresh) {
	        this._reload();
	    }
	};

	/**
	 * 获得瀑布模式的列数
	 * @return {number} 瀑布模式的列数
	 */
	WaterfallAlbum.prototype.getColNum = function () {
	    return this.col.num;
	};

	exports.default = WaterfallAlbum;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Modal = __webpack_require__(3);

	var _Modal2 = _interopRequireDefault(_Modal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 三种布局模式的基类
	 * @constructor
	 * @param {object} config
	 */
	function BaseAlbum(config) {
	    // 布局的枚举类型
	    this.LAYOUT = {
	        PUZZLE: 1, // 拼图布局
	        WATERFALL: 2, // 瀑布布局
	        BARREL: 3 // 木桶布局
	    };
	    this.images = [];
	    this.container = null;
	    this.elements = [];
	    this.layout = 1;
	    this.gutter = {
	        x: 0,
	        y: 0
	    };
	    // {number|string 'auto'}
	    this.size = {
	        width: 'auto',
	        height: 'auto'
	    };
	    this.fullScreen = false;
	    this.resizeRefresh = false;
	    this.scrollFetch = false;
	    this.enableAjax = false;
	    this.ajaxUrl = "";
	    this.modal = null;
	    this.config = config;
	    //this.init(opt);
	    this.page = 0;
	    this.loadingEle = null;
	    this.loading = false;
	}
	// 私有变量可以写在这里
	// var xxx = ...

	BaseAlbum.prototype._eventScrollFetch = function () {
	    function getScrollTop() {
	        var scrollTop = 0;
	        if (document.documentElement && document.documentElement.scrollTop) {
	            scrollTop = document.documentElement.scrollTop;
	        } else if (document.body) {
	            scrollTop = document.body.scrollTop;
	        }
	        return scrollTop;
	    }
	    //获取当前可是范围的高度
	    function getClientHeight() {
	        var clientHeight = 0;
	        if (document.body.clientHeight && document.documentElement.clientHeight) {
	            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
	        } else {
	            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
	        }
	        return clientHeight;
	    }
	    //获取文档完整的高度
	    function getScrollHeight() {
	        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	    }
	    if (getScrollTop() + getClientHeight() == getScrollHeight()) {
	        this.fetchData();
	    }
	};

	BaseAlbum.prototype._eventFullscreen = function (evt) {
	    var target = evt.target;
	    if (target.nodeName.toLowerCase() == "img") {
	        var child = target.cloneNode();
	        child.style.width = "";
	        child.style.height = "";
	        if (this.modal) {
	            this.modal.setElement(child);
	        } else {
	            this.modal = (0, _Modal2.default)(child);
	        }
	        this.modal.show();
	    }
	};

	BaseAlbum.prototype._eventResizeRefresh = function () {
	    var old = this.size.width;
	    this.setSize(this.config.size.width || 'auto', this.config.size.height || 'auto', false);
	    this._clearTmp();
	    this._calLay();
	    //if(this.size.width !== old) {
	    this.layLoadItems();
	    //}
	};

	BaseAlbum.prototype._reload = function () {
	    this._clearTmp();
	    this._calLay();
	    this.layLoadItems();
	};

	BaseAlbum.prototype._fetchAjax = function (url, callback) {
	    function ajax(obj) {
	        var xmlHttpReq = null;
	        if (window.ActiveXObject) {
	            //IE浏览器使用ActiveX
	            xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	        } else if (window.XMLHttpRequest) {
	            //其它浏览器使用window的子对象XMLHttpRequest
	            xmlHttpReq = new XMLHttpRequest();
	        }
	        if (xmlHttpReq != null) {
	            xmlHttpReq.open("GET", obj.url, true);
	            //设置回调，当请求的状态发生变化时，就会被调用，传递参数xmlHttpReq
	            xmlHttpReq.onreadystatechange = function () {
	                if (xmlHttpReq.readyState == 4) {
	                    if (xmlHttpReq.status == 200) {
	                        obj.success(xmlHttpReq.responseText);
	                    }
	                }
	            };
	            //提交请求
	            xmlHttpReq.send(null);
	        }
	    };
	    ajax({
	        url: url,
	        success: function (data) {
	            var data = JSON.parse(data);
	            callback(data);
	        }.bind(this)
	    });
	};

	BaseAlbum.prototype._addImage = function (image) {
	    var div = document.createElement("div");
	    div.style.position = 'absolute';
	    div.setAttribute("class", "item");
	    var img = document.createElement("img");
	    img.setAttribute("src", image);
	    img.onload = function (evt) {
	        var div = evt.target.parentNode;
	        this._layItem(div, false);
	    }.bind(this);
	    div.appendChild(img);
	    div.style.visibility = 'hidden';
	    this.container.appendChild(div);
	};

	/************* 以下是本库提供的公有方法 *************/

	/**
	 * 初始化并设置相册
	 * 当相册原本包含图片时，该方法会替换原有图片
	 * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
	 */
	BaseAlbum.prototype.setImage = function (image) {
	    if (typeof image === 'string') {
	        this.setImage([image]);
	        return;
	    }
	    this.container.innerHTML = "";
	    this.elements = [];
	    this.images = [];
	    this._clearTmp();
	    //for(var i = 0, len = image.length; i < len; i++) {
	    //    this._addImage(image[i]);
	    //}
	    this.addImage(image);
	};

	/**
	 * 获取相册所有图像对应的 DOM 元素
	 * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
	 */
	BaseAlbum.prototype.getImageDomElements = function () {
	    return this.elements;
	};

	/**
	 * 向相册添加图片
	 * 在拼图布局下，根据图片数量重新计算布局方式；其他布局下向尾部追加图片
	 * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
	 */
	BaseAlbum.prototype.addImage = function (image) {
	    if (typeof image === 'string') {
	        this.addImage([image]);
	        return;
	    }
	    for (var i = 0, len = image.length; i < len; i++) {
	        this.images.push(image[i]);
	        this._addImage(image[i]);
	    }
	};

	/**
	 * 移除相册中的图片
	 * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
	 * @return {boolean} 是否全部移除成功
	 */
	BaseAlbum.prototype.removeImage = function (image) {};

	/**
	 * 设置相册的布局
	 * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
	 */
	BaseAlbum.prototype.setLayout = function (layout) {
	    this.layout = this.LAYOUT[layout];
	};

	/**
	 * 获取相册的布局
	 * @return {number} 布局枚举类型的值
	 */
	BaseAlbum.prototype.getLayout = function () {
	    return this.layout;
	};

	/**
	 * 设置图片之间的间距
	 * 注意这个值仅代表图片间的间距，不应直接用于图片的 margin 属性，如左上角图的左边和上边应该紧贴相册的左边和上边
	 * 相册本身的 padding 始终是 0，用户想修改相册外框的空白需要自己设置相框元素的 padding
	 * @param {number}  x  图片之间的横向间距
	 * @param {number} [y] 图片之间的纵向间距，如果是 undefined 则等同于 x
	 * @param {boolean}  refresh 是否刷新, 默认为true 
	 */
	BaseAlbum.prototype.setGutter = function (x, y, refresh) {
	    if (x === undefined) {
	        console.error('error gutter value!');
	        return;
	    }
	    if (refresh === undefined) {
	        refresh = true;
	    }
	    this.gutter.x = parseInt(x);
	    if (y === undefined) {
	        this.gutter.y = parseInt(x);
	    } else {
	        this.gutter.y = parseInt(y);
	    }
	    if (refresh) {
	        this._reload();
	    }
	};

	/**
	 * 允许点击图片时全屏浏览图片
	 */
	BaseAlbum.prototype.enableFullscreen = function () {
	    this.fullScreen = true;
	    this.container.addEventListener("click", this._eventFullscreen);
	};

	/**
	 * 禁止点击图片时全屏浏览图片
	 */
	BaseAlbum.prototype.disableFullscreen = function () {
	    this.fullScreen = false;
	    this.container.removeEventListener("click", this._eventFullscreen);
	};

	/**
	 * 获取点击图片时全屏浏览图片是否被允许
	 * @return {boolean} 是否允许全屏浏览
	 */
	BaseAlbum.prototype.isFullscreenEnabled = function () {
	    return this.fullScreen;
	};

	/**
	 * 允许滚动到相册底部通过ajax加载新图片 (注意：不适用于类型为PUZZLE的拼图模式)
	 */

	BaseAlbum.prototype.enableScrollFetch = function () {
	    this.scrollFetch = true;
	    window.addEventListener('scroll', this._eventScrollFetch.bind(this));
	};

	/**
	 * 禁止滚动到相册底部通过ajax加载新图片
	 */
	BaseAlbum.prototype.disableScrollFetch = function () {
	    this.scrollFetch = false;
	    window.removeEventListener('scroll', this._eventScrollFetch);
	};

	/**
	 * 获取滚动到相册底部是否允许通过ajax加载新图片
	 * @return {boolean} 是否允许滚动加载
	 */
	BaseAlbum.prototype.isScrollFetchEnabled = function () {
	    return this.scrollFetch;
	};

	/**
	 * 向相册中继续追加图片
	 */
	BaseAlbum.prototype.fetchData = function () {
	    if (!this.enableAjax) {
	        return;
	    }
	    this.showLoading();
	    this.page++;
	    var url = this.config.ajax.getNextpage(this.page);
	    this._fetchAjax(url, function (data) {
	        var images = this.config.ajax.getImages(data);
	        //for(var i = 0, len = images.length; i < len; i++) {
	        //    this._addImage(images[i]);
	        //}
	        this.addImage(images);
	        //this.hideLoading;
	    }.bind(this));
	};

	/**
	 * 允许当宽度为auto时,允许window resize的时候自适应宽度
	 */
	BaseAlbum.prototype.enableResizeRefresh = function () {
	    this.resizeRefresh = true;
	    window.addEventListener('resize', this._eventResizeRefresh.bind(this));
	};

	/**
	 * 禁止当宽度为auto时,允许window resize的时候自适应宽度
	 */
	BaseAlbum.prototype.disableResizeRefresh = function () {
	    this.resizeRefresh = false;
	    window.removeEventListener('resize', this._eventResizeRefresh);
	};

	/**
	 * 判断是否当宽度为auto时,允许window resize的时候自适应宽度
	 * @return {boolean} 是否允许自适应宽度
	 */
	BaseAlbum.prototype.isResizeRefreshEnabled = function () {
	    return this.resizeRefresh;
	};

	/*
	 *当宽度设置为auto的时候，宽度为屏幕宽度
	 *当高度设置为auto的时候，高度为内容的高度
	 * @param {number} || {string 'auto'} width 
	 * @param {number} || {string 'auto'} height 
	 * @param {boolean}  refresh 是否刷新, 默认为true 
	 */
	BaseAlbum.prototype.setSize = function (width, height, refresh) {
	    if (width === undefined || height === undefined) {
	        console.error("WOOALBUM ERROR : undefined container width or height!");
	    }
	    if (refresh === undefined) {
	        refresh = true;
	    }
	    if (this.config.size === undefined) {
	        this.config.size = {
	            width: 'auto',
	            height: 'auto'
	        };
	    }
	    this.config.size.width = width;
	    this.config.size.height = height;
	    if (width === 'auto') {
	        this.size.width = window.innerWidth - 20;
	    } else {
	        this.size.width = parseInt(width);
	    }
	    this.container.style.width = this.size.width + "px";
	    if (height !== 'auto') {
	        //this.size.height = window.innerHeight;
	        this.size.height = parseInt(height);
	        this.container.style.height = this.size.height + "px";
	    }
	    if (refresh) {
	        this._reload();
	    }
	};

	/**
	 * 获取container的大小
	 * @return {width : number, height: number} 获取container的宽度和高度
	 */
	BaseAlbum.prototype.getSize = function () {
	    return this.size;
	};

	BaseAlbum.prototype.setAjaxurl = function (url) {
	    this.enableAjax = true;
	    this.ajaxUrl = url;
	};

	BaseAlbum.prototype.setContainer = function (ele) {
	    if (ele === undefined || !ele) {
	        console.error("WOOALBUM ERROR : undefined container element!");
	    } else {
	        this.container = ele;
	        var _oldclass = ele.getAttribute("class");
	        _oldclass = _oldclass ? _oldclass + " " : "";
	        ele.setAttribute("class", _oldclass + 'wooalbum ' + this.type);
	    }
	};

	/**
	 * 获取相册最外层的元素
	 * @return {HTMLElement} 
	 */
	BaseAlbum.prototype.getContainer = function () {
	    return this.container;
	};

	/**
	 * 重排已经加载完成的元素
	 */
	BaseAlbum.prototype.layLoadItems = function () {
	    var divs = this.getImageDomElements();
	    for (var i = 0, len = divs.length; i < len; i++) {
	        this._layItem(divs[i], true);
	    }
	};

	/**
	 * 显示加载中的loading条
	 */
	BaseAlbum.prototype.showLoading = function () {
	    if (!this.loadingEle) {
	        var div = document.createElement("div");
	        div.innerHTML = "<div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div>";
	        div.setAttribute("class", "loading");
	        this.loadingEle = div;
	    }
	    this.container.appendChild(this.loadingEle);
	    this.loading = true;
	};

	/**
	 * 显示加载中的loading条
	 */
	BaseAlbum.prototype.hideLoading = function () {
	    if (this.loading) {
	        this.container.removeChild(this.loadingEle);
	        this.loading = false;
	    }
	};

	BaseAlbum.prototype.init = function (config) {
	    this.setContainer(config.container);
	    this.setLayout();
	    // set size
	    var size = config.size || {};
	    this.setSize(size.width || 'auto', size.height || 'auto', false); // set gutter
	    var gutter = config.gutter;
	    this.setGutter(gutter.x, gutter.y, false);
	    // set image source
	    var ajax = config.ajax;
	    if (ajax.has) {
	        this.setAjaxurl(ajax.url);
	        this.fetchData();
	    } else {
	        var image = config.image;
	        this.setImage(image.src || []);
	    }
	    var enableResizerefresh = config.enableResizerefresh;
	    if (enableResizerefresh) {
	        this.enableResizeRefresh();
	    }
	    var enableFullscreen = config.enableFullscreen;
	    if (enableFullscreen) {
	        this.enableFullscreen();
	    }
	    var enableScrollfetch = config.enableScrollfetch;
	    if (enableScrollfetch) {
	        this.enableScrollFetch();
	    }
	    // call child config init
	    if (this._initCfg) {
	        this._initCfg(config);
	    }
	    this._calLay();
	    // call child init
	    this._init(config);
	};

	exports.default = BaseAlbum;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	Array.prototype.contains = function (obj) {
	    var i = this.length;
	    while (i--) {
	        if (this[i] === obj) {
	            return false;
	        }
	        return true;
	    }
	};
	function Modal(ele) {
	    if (!(this instanceof Modal)) return new Modal(ele);
	    var div = document.createElement("div");
	    div.setAttribute("class", 'modal');
	    div.appendChild(ele);
	    this.ele = div;
	    this.effect = "";
	    this._append = false;
	    this.ele.addEventListener("click", function (evt) {
	        var target = evt.target;
	        if (target.nodeName.toLowerCase() !== 'img') {
	            this.hide();
	        }
	    }.bind(this));
	}

	Modal.prototype = {
	    EffectName: ['fade'],
	    setEffect: function setEffect(effect) {
	        effect = effect.toLowerCase();
	        if (this.EffectName.contains(effect)) {
	            this.effect = effect;
	        }
	    },
	    setElement: function setElement(ele) {
	        //var div = document.createElement("div");
	        //div.setAttribute("class", 'modal');
	        //div.appendChild(this.ele);
	        //this.ele = div;
	        this.ele.innerHTML = "";
	        this.ele.appendChild(ele);
	    },
	    show: function show() {
	        if (this._append) {
	            this.ele.style.display = "block";
	        } else {
	            this._append = true;
	            document.body.appendChild(this.ele);
	            this.ele.style.display = "block";
	        }
	    },
	    hide: function hide() {
	        //document.body.removeChild(this.ele);
	        this.ele.style.display = "none";
	        //}
	    },
	    addClass: function addClass(name) {
	        var oldClass = this.ele.getAttribute("class");
	        var oldClassA = oldClass.split(" ");
	        if (!oldClassA.contains(name)) {
	            this.ele.setAttribute("class", oldClass + " " + name);
	        }
	    },
	    removeClass: function removeClass(name) {
	        var oldClass = this.ele.getAttribute("class");
	        var oldClassA = oldClass.split(" ");
	        var i = oldClassA.length;
	        var newClass = "";
	        while (i--) {
	            if (oldClassA[i] !== name) {
	                newClass += " " + oldClassA[i];
	            }
	        }
	        this.ele.setAttribute("class", newClass);
	    }
	};

	exports.default = Modal;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _BaseAlbum = __webpack_require__(2);

	var _BaseAlbum2 = _interopRequireDefault(_BaseAlbum);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	'use strict';
	function PuzzleAlbum(opt) {
	    _BaseAlbum2.default.call(this, opt);
	    this.type = 'puzzle';
	    this.tmp = {
	        index: 0
	    };
	    this.calSize = null;
	    this.init(opt);
	}

	PuzzleAlbum.prototype = new _BaseAlbum2.default();
	PuzzleAlbum.prototype.constructor = PuzzleAlbum;

	PuzzleAlbum.prototype._clearTmp = function () {
	    this.tmp.index = 0;
	};
	PuzzleAlbum.prototype.enableScrollFetch = function () {
	    this.scrollFetch = false;
	    // do nothing
	};
	PuzzleAlbum.prototype._layItem = function (div, include) {
	    this.tmp.index++;
	    var size = this.calSize(this.tmp.index);
	    var style = "";
	    for (var k in size) {
	        style += k + ":" + size[k] + ";";
	    }
	    div.setAttribute("style", style);
	    this.hideLoading();
	    this.container.appendChild(div);
	    if (!include) {
	        this.elements.push(div);
	    }
	};

	PuzzleAlbum.prototype.setSize = function (width, height) {
	    if (width === undefined || height === undefined) {
	        console.error("WOOALBUM ERROR : undefined container width or height!");
	    }
	    if (this.config.size === undefined) {
	        this.config.size = {
	            width: 'auto',
	            height: 'auto'
	        };
	    }
	    this.config.size.width = width;
	    this.config.size.height = height;
	    if (width === 'auto') {
	        this.size.width = window.innerWidth - 20;
	    } else {
	        this.size.width = parseInt(width);
	    }
	    this.container.style.width = this.size.width + "px";
	    if (height === 'auto') {
	        this.size.height = window.innerHeight;
	    } else {
	        this.size.height = parseInt(height);
	    }
	    this.container.style.height = this.size.height + "px";
	};

	PuzzleAlbum.prototype._calLay = function () {
	    var size = {
	        1: function _(count) {
	            var in_size = {
	                1: { width: "100%", height: "100%" }
	            };
	            return in_size[1];
	        },
	        2: function _(count) {
	            var gutterx = this.gutter.x / 2;
	            var in_size = {
	                1: { width: "66.6666666666666%", height: "100%", position: "absolute", left: "-" + gutterx + "px" },
	                2: { width: "66.6666666666666%", height: "100%", position: "absolute", right: "-" + gutterx + "px" }
	            };
	            return in_size[count];
	        },
	        3: function _(count) {
	            var x = this.size.width;
	            var y = this.size.height;
	            var gutterx = this.gutter.x;
	            var guttery = this.gutter.y;
	            var height_tmp = parseInt((y - guttery) / 2);
	            var in_size = {
	                1: { width: "" + (x - height_tmp - gutterx) + "px", height: "100%", float: "left" },
	                2: { width: "" + height_tmp + "px", height: "" + height_tmp + "px", float: "right" },
	                3: { width: "" + height_tmp + "px", height: "" + height_tmp + "px", position: "absolute", bottom: "0", right: "0" }
	            };
	            return in_size[count];
	        },
	        4: function _(count) {
	            var x = this.size.width;
	            var y = this.size.height;
	            var gutterx = this.gutter.x;
	            var guttery = this.gutter.y;
	            var tmp_w = (x - gutterx) / 2;
	            var tmp_h = (y - guttery) / 2;
	            var in_size = {
	                1: { width: tmp_w + "px", height: tmp_h + "px", position: "absolute", left: "0", top: "0" },
	                2: { width: tmp_w + "px", height: tmp_h + "px", position: "absolute", right: "0", top: "0" },
	                3: { width: tmp_w + "px", height: tmp_h + "px", position: "absolute", left: "0", bottom: "0" },
	                4: { width: tmp_w + "px", height: tmp_h + "px", position: "absolute", right: "0", bottom: "0" }
	            };
	            return in_size[count];
	        },
	        5: function _(count) {
	            var x = this.size.width;
	            var y = this.size.height;
	            var gutterx = this.gutter.x;
	            var guttery = this.gutter.y;
	            var tmp_w = parseInt((x - 2 * gutterx) / 3);
	            var tmp_h = parseInt((y - guttery) / 3);
	            var in_size = {
	                1: { width: "" + (tmp_w * 2 + gutterx) + "px", height: "" + tmp_h * 2 + "px", position: "absolute", left: 0, top: 0 },
	                2: { width: "" + tmp_w + "px", height: "" + tmp_w + "px", position: "absolute", right: 0, top: 0 },
	                3: { width: "" + tmp_w + "px", height: "" + tmp_h + "px", position: "absolute", left: 0, bottom: 0 },
	                4: { width: "" + tmp_w + "px", height: "" + tmp_h + "px", position: "absolute", bottom: 0, left: tmp_w + gutterx + "px" },
	                5: { width: "" + tmp_w + "px", height: "" + (y - tmp_w - guttery) + "px", position: "absolute", bottom: "0", right: "0" }
	            };
	            return in_size[count];
	        },
	        6: function _(count) {
	            var x = this.size.width;
	            var y = this.size.height;
	            var gutterx = this.gutter.x;
	            var guttery = this.gutter.y;
	            var tmp_w = parseInt((x - 2 * gutterx) / 3);
	            var tmp_h = parseInt((y - 2 * guttery) / 3);
	            var in_size = {
	                1: { width: "" + (tmp_w * 2 + gutterx) + "px", height: "" + (tmp_h * 2 + guttery) + "px", position: "absolute", left: 0, top: 0 },
	                2: { width: "" + tmp_w + "px", height: "" + tmp_h + "px", position: "absolute", right: 0, top: 0 },
	                3: { width: "" + tmp_w + "px", height: "" + tmp_h + "px", position: "absolute", right: 0, top: "" + (tmp_h + guttery) + "px" },
	                4: { width: "" + tmp_w + "px", height: "" + tmp_h + "px", position: "absolute", left: 0, bottom: 0 },
	                5: { width: "" + tmp_w + "px", height: "" + tmp_h + "px", position: "absolute", left: "" + (tmp_w + gutterx) + "px", bottom: 0 },
	                6: { width: "" + tmp_w + "px", height: "" + tmp_h + "px", position: "absolute", right: 0, bottom: 0 }
	            };
	            return in_size[count];
	        }
	    };

	    var len = this.images.length;
	    if (len > 6) {
	        len = 6;
	    }
	    if (len < 1) {
	        len = 1;
	    }
	    this.calSize = size[len];
	    var oldclass = this.container.getAttribute("class");
	    var reg = /\sele-[1-6]/;
	    if (reg.test(oldclass)) {
	        var newclass = oldclass.replace(reg, " ele-" + len + " ");
	        this.container.setAttribute("class", newclass);
	    } else {
	        this.container.setAttribute("class", oldclass + " ele-" + len);
	    }
	};

	_BaseAlbum2.default.prototype.addImage = function (image) {
	    if (typeof image === 'string') {
	        this.addImage([image]);
	        return;
	    }
	    for (var i = 0, len = image.length; i < len; i++) {
	        this.images.push(image[i]);
	    }
	    this._calLay();
	    this._clearTmp();
	    this.layLoadItems();
	    for (var i = 0, len = image.length; i < len; i++) {
	        this._addImage(image[i]);
	    }
	};

	PuzzleAlbum.prototype._init = function (config) {};

	exports.default = PuzzleAlbum;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _BaseAlbum = __webpack_require__(2);

	var _BaseAlbum2 = _interopRequireDefault(_BaseAlbum);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function BarrelAlbum(opt) {
	    _BaseAlbum2.default.call(this, opt);
	    this.type = 'barrel';
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
	        ratioSum: 0,
	        ratioMax: 0,
	        ratioMaxK: 0,
	        ratioThre: {
	            min: 0,
	            max: 0
	        },
	        top: 0
	    };
	    this.init(opt);
	}

	BarrelAlbum.prototype = new _BaseAlbum2.default();
	BarrelAlbum.prototype.constructor = BarrelAlbum;

	BarrelAlbum.prototype._clearTmp = function () {
	    this.tmp.row = [];
	    this.tmp.ratioSum = 0;
	    this.tmp.top = 0;
	    this.tmp.ratioMax = 0;
	    this.tmp.ratioMaxK = 0;
	};

	BarrelAlbum.prototype._layItem = function (div, include) {
	    div.style.visibility = 'hidden';
	    div.style.display = 'block';
	    this.tmp.row.push(div);
	    var img = div.getElementsByTagName("img")[0];
	    var _tmpr = img.offsetWidth / img.offsetHeight;
	    this.tmp.ratioSum += _tmpr;
	    if (_tmpr > this.tmp.ratioMax) {
	        this.tmp.ratioMax = _tmpr;
	        this.tmp.ratioMaxK = this.tmp.row.length - 1;
	    }
	    var _tmpw = this.size.width - this.gutter.x * (this.tmp.row.length - 1);
	    this.tmp.ratioThre.min = _tmpw / this.barrelHeight.max;
	    this.tmp.ratioThre.max = _tmpw / this.barrelHeight.min;
	    if (this.tmp.ratioSum >= this.tmp.ratioThre.min && this.tmp.ratioSum <= this.tmp.ratioThre.max) {
	        this.hideLoading();
	        //console.log(this.tmpRatio);
	        //push this.tmpRow
	        var height = Math.round(_tmpw / this.tmp.ratioSum);
	        var left = 0;
	        for (var i = 0, len = this.tmp.row.length; i < len; i++) {
	            var div = this.tmp.row[i];
	            var img = div.getElementsByTagName('img')[0];
	            div.style.height = height + 'px';
	            img.style.height = height + 'px';
	            div.style.top = this.tmp.top + 'px';
	            div.style.left = left + 'px';
	            div.style.display = 'block';
	            div.style.visibility = '';
	            left += this.gutter.x + this.tmp.row[i].offsetWidth;
	            //console.log(img.getAttribute("src"));
	        }
	        // 最后一个对齐
	        var last = this.tmp.row[this.tmp.row.length - 1];
	        last.style.left = this.size.width - last.offsetWidth + 'px';

	        this.tmp.top += this.gutter.y + height;
	        this.container.style.height = this.tmp.top - this.gutter.y + 'px';
	        this.tmp.row = [];
	        this.tmp.ratioSum = 0;
	        this.tmp.ratioMax = 0;
	        this.tmp.ratioMaxK = 0;
	    } else if (this.tmp.ratioSum > this.tmp.ratioThre.max) {
	        this.hideLoading();
	        /*
	         * 找到最长的图片进行压缩
	         */
	        console.log("woooooo~");
	        var height = this.barrelHeight.min;
	        var left = 0;
	        var maxHeight = Math.round((this.tmp.ratioThre.max + this.tmp.ratioMax - this.tmp.ratioSum) * height / this.tmp.ratioMax);
	        var maxPad = Math.round((height - maxHeight) / 2);
	        for (var i = 0, len = this.tmp.row.length; i < len; i++) {
	            var div = this.tmp.row[i];
	            var img = div.getElementsByTagName('img')[0];
	            if (i !== this.tmp.ratioMaxK) {
	                div.style.height = height + 'px';
	                img.style.height = height + 'px';
	                div.style.top = this.tmp.top + 'px';
	            } else {
	                div.style.height = maxHeight + 'px';
	                img.style.height = maxHeight + 'px';
	                div.style.top = this.tmp.top + maxPad + 'px';
	            }
	            div.style.left = left + 'px';
	            div.style.display = 'block';
	            div.style.visibility = '';
	            left += this.gutter.x + this.tmp.row[i].offsetWidth;
	        }
	        var last = this.tmp.row[this.tmp.row.length - 1];
	        last.style.left = this.size.width - last.offsetWidth + 'px';

	        this.tmp.top += this.gutter.y + height;
	        this.container.style.height = this.tmp.top - this.gutter.y + 'px';
	        this.tmp.row = [];
	        this.tmp.ratioSum = 0;
	        this.tmp.ratioMax = 0;
	        this.tmp.ratioMaxK = 0;
	    } else {
	        div.style.display = 'none';
	    }
	    if (!include) {
	        this.elements.push(div);
	        if (this.elements.length == this.images.length) {
	            // last element
	            if (this.isResizeRefreshEnabled()) {
	                // auto
	                if (this.config.size.height === 'auto') {
	                    if (this.container.offsetHeight <= window.innerHeight) {
	                        this.fetchData();
	                    }
	                } else {
	                    if (this.container.offsetHeight <= this.config.size.height) {
	                        this.fetchData();
	                    }
	                }
	                // count
	            }
	        }
	    }
	};

	BarrelAlbum.prototype._initCfg = function (config) {
	    var barrel = config.barrel;
	    this.setBarrelHeight(barrel.heightMin, barrel.heightMax, false);
	};

	BarrelAlbum.prototype._calLay = function () {
	    this.tmp.ratioThre.min = this.size.width / this.barrelHeight.max;
	    this.tmp.ratioThre.max = this.size.width / this.barrelHeight.min;
	};

	BarrelAlbum.prototype._init = function () {};

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
	    if (refresh === undefined) {
	        refresh = true;
	    }
	    this.barrelHeight.min = parseInt(min);
	    this.barrelHeight.max = parseInt(max);
	    if (refresh) {
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

	exports.default = BarrelAlbum;

/***/ }
/******/ ]);
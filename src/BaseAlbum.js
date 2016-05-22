'use strict'
import Modal from "./Modal.js";

/**
 * 三种布局模式的基类
 * @constructor
 * @param {object} config
 */
function BaseAlbum(config) {
    // 布局的枚举类型
    this.LAYOUT = {
        PUZZLE: 1,    // 拼图布局
        WATERFALL: 2, // 瀑布布局
        BARREL: 3     // 木桶布局
    };
    this.images = [];
    this.container = null;
    this.elements = [];
    this.layout = 1;
    this.gutter = {
        x : 0,
        y : 0, 
    };
    // {number|string 'auto'} 
    this.size = {
        width : 'auto',
        height : 'auto',
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
        }
        else if (document.body) {
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
    if(target.nodeName.toLowerCase() == "img") {    
        var child = target.cloneNode(); 
        child.style.width = "";
        child.style.height = ""; 
        if(this.modal) {
            this.modal.setElement(child);
        } else {
            this.modal = Modal(child);
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
                    if(xmlHttpReq.status == 200) {
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
            success: function(data){
                var data = JSON.parse(data);
                callback(data);
            }.bind(this)
    });
};

BaseAlbum.prototype._addImage = function (image) {
    var div = document.createElement("div");
    div.style.position = 'absolute';
    div.setAttribute("class","item");
    var img = document.createElement("img");
    img.setAttribute("src", image);
    img.onload = function(evt){
        var div = evt.target.parentNode;
        this._layItem(div,false);
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
BaseAlbum.prototype.getImageDomElements = function() {
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
    for(var i = 0, len = image.length; i < len; i++) {
        this.images.push(image[i]);
        this._addImage(image[i]);
    }
};


/**
 * 移除相册中的图片
 * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
 * @return {boolean} 是否全部移除成功
 */
BaseAlbum.prototype.removeImage = function (image) {
};



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
BaseAlbum.prototype.getLayout = function() {
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
    if(x === undefined) {
        console.error('error gutter value!');
        return;
    }
    if(refresh === undefined) {
        refresh = true;
    }
    this.gutter.x = parseInt(x);
    if(y === undefined) {
        this.gutter.y = parseInt(x);
    } else {
        this.gutter.y = parseInt(y);
    }
    if(refresh) {
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
    window.addEventListener('scroll',this. _eventScrollFetch.bind(this));
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
    if(!this.enableAjax) {
        return ;
    }
    this.showLoading();
    this.page++;
    var url = this.config.ajax.getNextpage(this.page);
    this._fetchAjax(url, function(data){
        var images = this.config.ajax.getImages(data);
        //for(var i = 0, len = images.length; i < len; i++) {
        //    this._addImage(images[i]); 
        //}
        this.addImage(images);
        //this.hideLoading;
    }.bind(this));
}


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
    if(width === undefined || height === undefined) {
        console.error("WOOALBUM ERROR : undefined container width or height!");    
    }
    if(refresh === undefined) {
        refresh = true;    
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
    if(height !== 'auto') {
        //this.size.height = window.innerHeight;
        this.size.height = parseInt(height);
        this.container.style.height = this.size.height + "px"; 
    }
    if(refresh) {
        this._reload();    
    }

};


/**
 * 获取container的大小
 * @return {width : number, height: number} 获取container的宽度和高度
 */
BaseAlbum.prototype.getSize = function () {
    return this.size;
}

BaseAlbum.prototype.setAjaxurl = function(url) {
    this.enableAjax = true;
    this.ajaxUrl = url;
}


BaseAlbum.prototype.setContainer = function(ele) {
    if(ele === undefined || !ele) {
        console.error("WOOALBUM ERROR : undefined container element!");
    } else {
        this.container = ele;
        var _oldclass = ele.getAttribute("class");
        _oldclass = _oldclass ? _oldclass + " " : "";    
        ele.setAttribute("class", _oldclass + 'wooalbum ' + this.type);
    }
}


/**
 * 获取相册最外层的元素
 * @return {HTMLElement} 
 */ 
BaseAlbum.prototype.getContainer = function() {
    return this.container;
}

/**
 * 重排已经加载完成的元素
 */
BaseAlbum.prototype.layLoadItems = function() {
    var divs = this.getImageDomElements();
    for(var i = 0, len = divs.length; i < len; i++) {
        this._layItem(divs[i], true);
    }
}

/**
 * 显示加载中的loading条
 */
BaseAlbum.prototype.showLoading = function() {
    if(!this.loadingEle) {
        var div = document.createElement("div");
        div.innerHTML = "<div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div>";
        div.setAttribute("class", "loading");
        this.loadingEle = div;
    }
    this.container.appendChild(this.loadingEle);
    this.loading = true;
}


/**
 * 显示加载中的loading条
 */
BaseAlbum.prototype.hideLoading = function() {
    if(this.loading) {
        this.container.removeChild(this.loadingEle);
        this.loading = false;
    }
}

BaseAlbum.prototype.init = function(config) {
    this.setContainer(config.container);
    this.setLayout();
    // set size
    var size = config.size || {};
    this.setSize(size.width || 'auto', size.height || 'auto', false); // set gutter 
    var gutter = config.gutter;
    this.setGutter(gutter.x, gutter.y, false);
    // set image source 
    var ajax = config.ajax;
    if(ajax.has) {
        this.setAjaxurl(ajax.url);
        this.fetchData();
    } else {
        var image = config.image;
        this.setImage(image.src || []);
    }
    var enableResizerefresh = config.enableResizerefresh;
    if(enableResizerefresh) {
        this.enableResizeRefresh();
    }
    var enableFullscreen = config.enableFullscreen;
    if(enableFullscreen) {
        this.enableFullscreen();
    }
    var enableScrollfetch = config.enableScrollfetch;
    if(enableScrollfetch) {
        this.enableScrollFetch();
    }
    // call child config init
    if(this._initCfg) {
        this._initCfg(config);
    }
    this._calLay();
    // call child init
    this._init(config);
}

export default BaseAlbum;


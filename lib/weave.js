(function (window, document) {
    //language
    var lan = {
        init: function () {
            window.lan = lan;
            var slan = sessionStorage.lang;
            if (!slan || slan != 'zh-CN' && slan != 'en') {
                sessionStorage.lang = document.getElementsByTagName('html')[0].getAttribute('lang');
            }
        },
        setLan: function (input) {
            sessionStorage.lang = input;
            var url = window.location.href.split('?')[0];
            wv.href(url);
            return input;
        },
        clean: function () {
            sessionStorage.removeItem('lang');
            return true;
        },
        t: function (txt) {
            switch (sessionStorage.lang) {
                case "zh-CN":
                    if (lan.ch[txt]) {
                        return lan.ch[txt];
                    } else {
                        return txt;
                    }
                    break;
                case "en":
                default:
                    return txt;
            }
        },
        ch: {
            'OK': '好的',
            'Cancel': '取消',
            'Confirm': '确认',
            'Login': '登录',
            'Signup': '注册',
            'Username cannot be blank': '用户名不能为空',
            'Login Weave Mind': '登录竹节',
            'Forgot': '忘记密码',
            'wvMind': '竹节脑图',
            'An email has been send to your address': '邮件已发送至邮箱',
            'Check your input please': '请检查输入',
            'Set Name': '脑图集名',
            'Mind Name': '脑图名',
            'New Mind': '新脑图',
            'New Set': '新脑图集',
            'Public': '已发布',
            'Private': '私有',
            'Signup Success': '注册成功',
            'Create Success': '创建成功',
            'Delete Success': '删除成功',
            'Modify Success': '修改成功',
            'Upload Success': '上传成功',
            'Login Success': '登录成功',
            'Has Favored': '收藏成功',
            'Cancel Favor': '取消收藏',
            'Move Out Success': '移出成功',
            'Found ': '发现',
            ' local editions': '个本地版本',
            'File Saved': '保存成功',
            'Bad Network': '亲，网络不给力啊',
            'Rename': '重命名',
            'Saveas': '另存',
            'Delete': '删除',
            'Share': '分享地址',
            'Import': '导入',
            'Save': '保存',
            'Help': '帮助',
            'Move out': '移出文件夹',
            'Copy Manually': '手动复制',
            'Loading...': '玩命加载中...',
            'Opps, some file is uploading': '已有文件在上传',
            'Email': '邮箱',
            'Username': '用户名',
            'Password': '密码',
            'Log out?': '注销登录？',
            'Logoff Success': '已登出',
            'Change Set Cover': '更改脑图封面',
            'Publish to wvShare': '发布到脑库',
            'Range': '排序',
            'Image maxsize is 5Mb': '图片不能超过5MB',
            'Output': '输出',
            'File exceeds size limit': '文件溢出',
            'Stage View': '段落视图',
            'Mind View': '脑图视图',
            'List View': '大纲视图',
            'Table View': '网格视图',
            'Image View': '图片视图',
            'Add Mind': '添加脑图',
            'No Search Results': '未搜索到',
            'Topic Copied': '已复制',
            'Root Topic Cannot Be Delete': '根主题不能删除哦',
            'No Image Contains': '不包含图片',
            'Not Support Output': '当前浏览器不支持输出',
            ' Copy': '副本',
            'Only support .xmind .km': '支持的格式有.xmind .km',
            'Need VIP authority': '需要高级用户权限',
            'Must be published before share': '分享前需要更改为已发布状态',
            'Clear the file cache beyond the storage limit': '超出存储上限，清除文件缓存？'
        }
    };
    //core model
    var wv = {
        apiUrl: 'http://mapidev.weavent.com',
        shareUrl: 'http://minddev.weavent.com',
        defHead: '/images/portrait_big.png',
        defMind: 'data:image/png;base64,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',
        defLogo: 'data:image/png;base64,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',
        dlgFrom: {},
        submitObj: {},
        init: function () {
            window.wv = wv;
            window.requestAnimFrame = function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
            }();
            String.prototype.temp = function (obj) {
                //填充数据
                return this.replace(/\$\w+\$/gi, function (matchs) {
                    var returns = obj[matchs.replace(/\$/g, "")];
                    return returns + "" == "undefined" ? "" : returns;
                });
            };
            Array.prototype.remove = function (dx) {
                //数组删除元素
                if (isNaN(dx) || dx > this.length) {
                    return false;
                }
                for (var i = 0, n = 0; i < this.length; i++) {
                    if (this[i] != this[dx]) {
                        this[n++] = this[i];
                    }
                }
                this.length -= 1;
            };
            HTMLElement.prototype.addEvent = function (type, fn, capture) {
                if (window.addEventListener) {
                    this.addEventListener(type, fn, capture);
                } else if (window.attachEvent) {
                    this.attachEvent("on" + type, function (e) {
                        fn.call(this, e);
                    });
                }
            };
            document.body.addEvent('keydown', function backKey(e) {
                var theEvent = e || window.event;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                if (code === 27 && wv.log.heap.length > 0) {
                    var ele = wv.log.heap[wv.log.heap.length - 1].ele;
                    wv.log.pop(ele);
                } else if (code === 27 && wv.log.heap.length === 0) {
                    history.go(-1);
                }
                return false;
            }, false);
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            var bIsWC = sUserAgent.match(/MicroMessenger/i) == "micromessenger";
            sessionStorage.isMobile = false;
            sessionStorage.isMobile = bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsWC;
            sessionStorage.isWechat = bIsWC ? true : false;
            sessionStorage.isFromApp = typeof iosObj != 'undefined' ? true : false;
        },
        onload: function (fn) {
            var done = false,
                top = true,
                document = window.document,
                root = document.documentElement,
                add = document.addEventListener ? 'addEventListener' : 'attachEvent',
                rem = document.addEventListener ? 'removeEventListener' : 'detachEvent',
                pre = document.addEventListener ? '' : 'on',
                init = function (e) {
                if (e.type == 'readystatechange' && document.readyState != 'complete') return;
                (e.type == 'load' ? window : document)[rem](pre + e.type, init, false);
                if (!done && (done = true)) fn.call(window, e.type || e);
            },
                poll = function () {
                try {
                    root.doScroll('left');
                } catch (e) {
                    setTimeout(poll, 50);
                    return;
                }
                init('poll');
            };

            if (document.readyState == 'complete') fn.call(window, 'lazy');else {
                if (document.createEventObject && root.doScroll) {
                    try {
                        top = !window.frameElement;
                    } catch (e) {}
                    if (top) poll();
                }
                document[add](pre + 'DOMContentLoaded', init, false);
                document[add](pre + 'readystatechange', init, false);
                window[add](pre + 'load', init, false);
            }
        },
        id: function (arg) {
            if (typeof arg === "string") {
                arg = document.getElementById(arg);
            }
            return arg;
        },
        tag: function (tag, ele) {
            if (typeof ele === "string") {
                ele = document.getElementById(ele);
            }
            var el = ele || document;
            return el.getElementsByTagName(tag)[0];
        },
        class: function (name, ele) {
            if (typeof ele === "string") {
                ele = document.getElementById(ele);
            }
            var el = ele || document;
            return el.getElementsByClassName(name)[0];
        },
        name: function (name, ele) {
            if (typeof ele === "string") {
                ele = document.getElementById(ele);
            }
            var el = ele || document;
            return el.getElementsByName(name)[0];
        },
        find: function (str) {
            return document.querySelector(str);
        },
        dataInit: function (input) {
            var data = document.getElementById(input);
            data = data ? JSON.parse(data.value) : {};
            wv.clean(input);
            return data;
        },
        ajax: function (opt) {
            opt = opt || {};
            opt.method = opt.method || 'POST';
            opt.url = opt.url || '';
            opt.async = opt.async || true;
            opt.data = opt.data || null;
            opt.success = opt.success || function () {};
            opt.error = opt.error || function () {
                wv.toast("亲，网络不给力啊");
            };
            var xmlHttp = null;
            if (XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
            } else {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            var params = [];
            for (var key in opt.data) {
                if (wv.util.isArray(opt.data[key])) {
                    for (var i = 0; i < opt.data[key].length; i++) {
                        params.push(key + '[' + i + ']=' + opt.data[key][i]);
                    }
                } else {
                    params.push(key + '=' + opt.data[key]);
                }
            }
            var postData = params.join('&');
            if (opt.method.toUpperCase() === 'POST') {
                xmlHttp.open(opt.method, opt.url, opt.async);
                xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                xmlHttp.setRequestHeader('Accept', 'application/json,*/*');
                xmlHttp.send(postData);
            } else if (opt.method.toUpperCase() === 'GET') {
                xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
                xmlHttp.send(null);
            }
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var data = xmlHttp.responseText; //返回的对象data
                    if (opt.method === 'POST') {
                        //post方法请求，对json进行解析
                        data = JSON.parse(data);
                        if (data.error === 'NA') {
                            opt.success(data);
                        } else if (data.message) {
                            wv.toast(data.message);
                        } else {
                            console.log('error');
                        }
                    } else if (opt.method === 'GET') {
                        //get方法请求，直接返回
                        opt.success(data);
                    }
                }
            };
        },
        compose: function (model, viewId) {
            var view;
            if (wv.id(viewId)) {
                view = wv.id(viewId).value;
            } else {
                view = viewId;
            }
            var htmlStr = '';
            if (wv.util.isArray(model)) {
                for (var i = model.length - 1; i >= 0; i--) {
                    if (model[i]) {
                        htmlStr += view.temp(model[i]);
                    }
                }
            } else {
                htmlStr = view.temp(model);
            }
            return wv.toHTML(htmlStr);
        },
        append: function (dom, parent, clear) {
            if (clear && wv.id(parent)) {
                if (typeof parent === "string") {
                    wv.id(parent).innerHTML = '';
                    wv.id(parent).appendChild(dom);
                } else {
                    parent.innerHTML = '';
                    parent.appendChild(dom);
                }
            } else {
                if (typeof parent === "string") {
                    if (wv.id(parent)) {
                        wv.id(parent).appendChild(dom);
                    }
                } else {
                    if (parent) {
                        parent.appendChild(dom);
                    }
                }
            }
        },
        insert: function (dom, parent, clear) {
            if (clear && wv.id(parent)) {
                if (typeof parent === "string") {
                    wv.id(parent).innerHTML = '';
                    wv.id(parent).insertBefore(dom, parent.children[0]);
                } else {
                    parent.innerHTML = '';
                    parent.insertBefore(dom, parent.children[0]);
                }
            } else {
                if (typeof parent === "string") {
                    if (wv.id(parent)) {
                        wv.id(parent).insertBefore(dom, parent.children[0]);
                    }
                } else {
                    if (parent) {
                        parent.insertBefore(dom, parent.children[0]);
                    }
                }
            }
        },
        getIMG: function (img, width) {
            if (width > 1024) width = 1024;
            return wv.apiUrl + '/image/view/' + img.guid + '_' + width + '.' + img.extension;
        },
        getRequest: function () {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                if (str.indexOf("&") != -1) {
                    strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                    }
                } else {
                    theRequest[str.split("=")[0]] = decodeURI(str.split("=")[1]);
                }
            }
            return theRequest;
        },
        href: function (obj) {
            var href = typeof obj == "string" ? obj : obj.getAttribute('href');
            var token = userInit && userInit.token ? '&token=' + userInit.token : '';
            var link = href.indexOf("?") == -1 ? '?' : '&';
            href += link + 'lang=' + sessionStorage.lang + token;
            window.location.href = href;
        },
        toHTML: function (text) {
            var i,
                a = document.createElement("div"),
                b = document.createDocumentFragment();
            a.innerHTML = text;
            while (i = a.firstChild) {
                b.appendChild(i);
            }
            return b;
        },
        loading: function () {
            var dlgtxt = "<div class='waitingBg' id='waitBg'>" + "<div class='waiting float rotateAnimation'><p>" + lan.t('loading...') + "</p><i class='fa fa-spinner fa-pulse fa-fw'></i></div>" + "</div>";
            var bg = wv.toHTML(dlgtxt);
            document.body.appendChild(bg);
        },
        loaded: function () {
            var bg = wv.id('waitBg');
            if (bg) {
                wv.anim.out(bg, bg, 'opacity', 200, wv.clean);
            }
        },
        clean: function (obj) {
            if (typeof obj === "string") {
                obj = wv.id(obj);
            }
            if (obj && obj.parentNode) {
                obj.parentNode.removeChild(obj);
            }
        },
        toast: function (str) {
            var id = wv.util.randId(4);
            var txt = "<a class='toast' id='" + id + "'>" + str + "</a>";
            document.body.appendChild(wv.toHTML(txt));
            var bg = wv.id(id);
            setTimeout(function () {
                wv.anim.out(bg, bg, 'opacity', 200, wv.clean);
            }, 1500);
        },
        confirm: function (str, callback, arg) {
            //确认对话框
            var dlgtxt = "<dialog id='confirmDlg' out='opacity' select='false'>" + "<ul type='confirm'>" + "<li type='confirm'><h1>" + str + "</h1></li>" + "<li>" + "<button id='cfmNeg' type='confirm' anim='blinkLight'>" + lan.t('Cancel') + "</button>" + "<button id='cfmPos'type='confirm' font='bolder' anim='blinkLight'>" + lan.t('Confirm') + "</button>" + "</li>" + "</ul>" + "</dialog>";
            var dlg = wv.toHTML(dlgtxt);
            document.body.appendChild(dlg);
            dlg = wv.id('confirmDlg');
            wv.log.in(dlg);
            wv.id('cfmNeg').onclick = function () {
                wv.log.out(dlg);
            };
            wv.id('cfmPos').onclick = function () {
                wv.log.out(dlg);
                callback(arg);
            };
            return false;
        },
        refresh: function (str) {
            if (str) wv.toast(str);
            setTimeout(function () {
                history.go(0);
            }, 800);
        },
        target: function (e) {
            var ev = e || window.event;
            return ev.srcElement ? ev.srcElement : ev.target;
        },
        stopPropagation: function (e) {
            var ev = e || window.event;
            ev.stopPropagation();
        },
        preventDefault: function (e) {
            var ev = e || window.event;
            ev.preventDefault();
            ev.returnValue = false;
        },
        scroll: function (ele, tapFn) {
            var scrollHdl = new Hammer.Manager(ele, { recognizers: [[Hammer.Tap, { direction: Hammer.DIRECTION_VERTICAL }]] }),
                top = 0,
                moveY = 0,
                wheelDeltaY = 0,
                maxScrollH = ele.scrollHeight - ele.clientHeight;
            if (tapFn) scrollHdl.on('tap', tapFn);
            if (sessionStorage.isMobile == 'false') {
                scrollHdl.add(new Hammer.Pan({ direction: Hammer.DIRECTION_VERTICAL }));
                scrollHdl.on("panstart panmove panend", onPan);
                var indi = createDefaultScrollbar('v', null, true);
                Hammer.on(ele, 'wheel mousewheel DOMMouseScroll', onScroll);
            } else {
                ele.style.overflow = 'auto';
            }
            function onPan(ev) {
                var canRan = true;
                switch (ev.type) {
                    case "panstart":
                        top = ele.scrollTop;
                        break;
                    case "panmove":
                        ele.scrollTop = top - ev.deltaY;
                        indi.style.top = ele.scrollTop / ele.scrollHeight * 100 + '%';
                        break;
                    case "panend":
                        canRan = true;
                        var distance = -ev.velocityY * 320,
                            delta;
                        var init = ele.scrollTop;
                        top = init + distance;
                        if (top > maxScrollH) distance = maxScrollH - init;
                        if (top < 0) distance = -init;
                        var start = 0,
                            during = 20;
                        var _run = function () {
                            start++;
                            delta = easeOut(start, init, distance, during);
                            ele.scrollTop = delta;
                            indi.style.top = delta / ele.scrollHeight * 100 + '%';
                        };
                        if (start < during && canRan) requestAnimationFrame(_run);
                        break;
                }
            }
            function onScroll(e) {
                if ('deltaY' in e) {
                    if (e.deltaMode === 1) {
                        wheelDeltaY = -e.deltaY * 20;
                    } else {
                        wheelDeltaY = -e.deltaY;
                    }
                } else if ('wheelDeltaY' in e) {
                    wheelDeltaY = e.wheelDeltaY / 120 * 20;
                } else if ('wheelDelta' in e) {
                    wheelDeltaY = e.wheelDelta / 120 * 20;
                } else if ('detail' in e) {
                    wheelDeltaY = -e.detail / 3 * 20;
                } else {
                    return;
                }
                ele.scrollTop -= wheelDeltaY;
                indi.style.top = ele.scrollTop / ele.scrollHeight * 100 + '%';
            }
            function createDefaultScrollbar(direction, interactive, type) {
                var scrollbar = document.createElement('div'),
                    indicator = document.createElement('div');
                if (type === true) {
                    scrollbar.style.cssText = 'position:absolute;z-index:9999';
                    indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
                }
                indicator.className = 'iScrollIndicator';
                if (direction == 'h') {
                    if (type === true) {
                        scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
                        indicator.style.height = '100%';
                    }
                    scrollbar.className = 'iScrollHorizontalScrollbar';
                } else {
                    if (type === true) {
                        scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
                        indicator.style.width = '100%';
                    }
                    scrollbar.className = 'iScrollVerticalScrollbar';
                }
                scrollbar.style.cssText += ';overflow:hidden';
                if (!interactive) {
                    scrollbar.style.pointerEvents = 'none';
                }
                scrollbar.appendChild(indicator);
                indicator.style.height = ele.clientHeight / ele.scrollHeight * 100 + '%';
                document.body.appendChild(scrollbar);
                return indicator;
            }

            function easeOut(t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            }
            return scrollHdl;
        },
        scrollH: function (ele, tapFn) {
            var scrollHdl = new Hammer.Manager(ele, { recognizers: [[Hammer.Tap]] }),
                left = 0,
                moveY = 0,
                wheelDeltaX = 0;
            if (sessionStorage.isMobile == 'false') {
                scrollHdl.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL }));
                scrollHdl.on("panstart panmove panend", onPan);
                Hammer.on(ele, 'wheel mousewheel DOMMouseScroll', onScroll);
            } else {
                ele.style.overflowX = 'auto';
            }
            if (tapFn) scrollHdl.on("tap", tapFn);
            function onPan(ev) {
                switch (ev.type) {
                    case "panstart":
                        left = ele.scrollLeft;
                        break;
                    case "panmove":
                        ele.scrollLeft = left - ev.deltaX;
                        break;
                }
            }
            function onScroll(e) {
                if ('deltaY' in e) {
                    if (e.deltaMode === 1) {
                        wheelDeltaX = -e.deltaY * 20;
                    } else {
                        wheelDeltaX = -e.deltaY;
                    }
                } else if ('wheelDeltaY' in e) {
                    wheelDeltaX = e.wheelDeltaX / 120 * 20;
                } else if ('wheelDelta' in e) {
                    wheelDeltaX = e.wheelDelta / 120 * 20;
                } else if ('detail' in e) {
                    wheelDeltaX = -e.detail / 3 * 20;
                } else {
                    return;
                }
                ele.scrollLeft -= wheelDeltaX;
            }
            return scrollHdl;
        }
    };
    wv.anim = {
        out: function (animObj, outObj, animateClass, time, callback) {
            var clickable = true;
            if (clickable) {
                clickable = false;
                var cls = '';
                cls = animObj.getAttribute('class');
                animObj.setAttribute('class', cls + ' ' + animateClass);
                setTimeout(function () {
                    animObj.setAttribute('class', cls);
                    if (callback) {
                        callback(outObj);
                    }
                    clickable = true;
                }, time);
            }
        },
        cls: function (animObj, animateClass, time, callback) {
            var cls = '';
            cls = animObj.getAttribute('class');
            animObj.setAttribute('class', cls + ' ' + animateClass);
            setTimeout(function () {
                animObj.setAttribute('class', cls);
                if (callback) {
                    callback();
                }
            }, time);
        }
    };
    wv.util = {
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },
        backBtn: function () {
            if (logs.length > 0) {
                var ele = logs[logs.length - 1].ele;
                logPop(ele);
            } else if (logs.length === 0) {
                history.go(-1);
            }
        },
        insertAfter: function (newEl, target) {
            var parent = target.parentNode;
            if (parent.lastChild == target) {
                parent.appendChild(newEl);
            } else {
                parent.insertBefore(newEl, target.nextSibling);
            }
        },
        selectImg: function (type) {
            var str = "<input type='file' id='imgUpload'/>";
            document.body.appendChild(wv.toHTML(str));
            wv.id('imgUpload').addEvent('change', function () {
                wv.util.uploadImg(type);
            }, false);
            wv.util.fireClick(wv.id('imgUpload'));
        },
        checkUrl: function (url, callback) {
            xhr = new window.XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 1) callback();
            };
            xhr.open("GET", url);
        },
        splitTxt: function (obj) {
            if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                var startPos = obj.selectionStart,
                    endPos = obj.selectionEnd,
                    cursorPos = startPos,
                    tmpStr = obj.value;
                return [tmpStr.substring(0, cursorPos), tmpStr.substring(cursorPos, tmpStr.length)];
            }
            return false;
        },
        uploadImg: function (modelType) {
            var modelId,
                xhr,
                beforeUpload = function () {
                wv.loading();
                switch (modelType) {
                    case 'MindUserImage':
                        modelId = userInit.userId;
                        break;
                    case 'MindContentImage':
                        modelId = wvFile.id;
                        break;
                    case 'MindSetImage':
                        modelId = wv.submitObj.setId;
                        break;
                }
                var file = wv.id('imgUpload').files[0],
                    fileSize = Math.round(file.size / 1024 * 100) / 100;
                if (!file) {
                    uploadEnd();
                    return;
                }
                if (fileSize > 5 * 1024) {
                    uploadEnd(lan.t('Image maxsize is 5Mb'));
                    return;
                }
                beginUpload(file);
            },
                beginUpload = function (file) {
                var square = modelType === 'MindContentImage' ? false : true;
                var callback = function (base64) {
                    var fd = new FormData();
                    fd.append("base64Data", base64);
                    fd.append("token", userInit.token);
                    fd.append("modelType", modelType);
                    fd.append("modelId", modelId);
                    xhr = new window.XMLHttpRequest();
                    xhr.onError = uploadFailed;
                    xhr.onAbort = uploadCanceled;
                    xhr.onreadystatechange = uploadResposed;
                    xhr.open("POST", wv.apiUrl + "/image/upload");
                    xhr.send(fd);
                };
                wv.util.getBase64Img(file, square, callback);
            },
                uploadResposed = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var data = JSON.parse(xhr.responseText),
                        img = data.data,
                        url,
                        resImg;
                    if (data.error === 'NA') {
                        switch (modelType) {
                            case 'MindUserImage':
                                resImg = wv.id('portrait');
                                url = wv.getIMG(img, resImg.clientWidth);
                                userInit.portrait = url;
                                wv.ajax({ url: '/user/flush' });
                                break;
                            case 'MindContentImage':
                                var width = wv.tag('title', wvFile.actChild).clientWidth;
                                url = wv.getIMG(img, width);
                                wvFile.actChild.parentNode.setAttribute('image', url);
                                resImg = wv.tag('img', wvFile.actChild);
                                if (!resImg) {
                                    resImg = document.createElement('img');
                                    resImg.setAttribute('draggable', false);
                                }
                                wvFile.actChild.appendChild(resImg);
                                wvFile.save(true);
                                break;
                            case 'MindSetImage':
                                if (wv.id('coverPt')) {
                                    resImg = wv.id('coverPt');
                                }
                                if (wv.id(wv.submitObj.setGuid)) {
                                    resImg = wv.id(wv.submitObj.setGuid);
                                }
                                url = wv.getIMG(img, resImg.clientWidth);
                                break;
                        }
                        wv.util.loadImg(url, function () {
                            if (resImg.tagName === 'IMG') resImg.src = url;else {
                                resImg.style.backgroundImage = 'url(' + url + ')';
                            }
                            uploadEnd();
                        });
                    } else {
                        uploadEnd(data.message);
                    }
                }
            },
                uploadFailed = function () {
                uploadEnd('Bad Network');
            },
                uploadCanceled = function () {
                uploadEnd('Bad Network');
            },
                uploadEnd = function (str) {
                if (str) wv.toast(lan.t(str));
                wv.clean('imgUpload');
                wv.loaded();
            };
            beforeUpload();
        },
        uploadBase64: function (base64) {
            wv.loading();
            var fd = new FormData();
            fd.append("base64Data", base64);
            fd.append("token", userInit.token);
            fd.append("modelType", 'MindContentImage');
            fd.append("modelId", wvFile.id);
            xhr = new window.XMLHttpRequest();
            xhr.onreadystatechange = uploadResposed;
            xhr.open("POST", wv.apiUrl + "/image/upload");
            xhr.send(fd);
            function uploadResposed() {
                wv.loaded();
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var data = JSON.parse(xhr.responseText),
                        img = data.data,
                        url,
                        resImg;
                    if (data.error === 'NA') {
                        var width = wv.tag('title', wvFile.actChild).clientWidth;
                        url = wv.getIMG(img, width);
                        wvFile.actChild.parentNode.setAttribute('image', url);
                        resImg = wv.tag('img', wvFile.actChild);
                        if (!resImg) {
                            resImg = document.createElement('img');
                            resImg.setAttribute('draggable', false);
                        }
                        wvFile.actChild.appendChild(resImg);
                        wvFile.save(true);
                        wv.util.loadImg(url, function () {
                            if (resImg.tagName === 'IMG') resImg.src = url;else {
                                resImg.style.backgroundImage = 'url(' + url + ')';
                            }
                            wv.loaded();
                        });
                    } else {
                        wv.loaded();
                    }
                }
            }
        },
        getBase64Img: function (file, square, callback) {
            if (square) {
                var img = new Image();
                img.src = window.URL.createObjectURL(file);
                img.crossOrigin = 'anonymous';
                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d');
                img.onload = function () {
                    var des = [img.width, img.height],
                        rate = des[0] / des[1],
                        shortSide = rate < 1 ? des[0] : des[1],
                        compact = shortSide > 800 ? 800 / shortSide : false;
                    shortSide = compact ? 800 : shortSide;
                    canvas.width = canvas.height = shortSide;
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, shortSide, shortSide);

                    if (compact && rate < 1) {
                        ctx.drawImage(img, 0, (shortSide - des[1] * compact) / 2, des[0] * compact, des[1] * compact);
                    } else if (compact && rate > 1) {
                        ctx.drawImage(img, (shortSide - des[0] * compact) / 2, 0, des[0] * compact, des[1] * compact);
                    } else if (!compact && rate < 1) {
                        ctx.drawImage(img, 0, (shortSide - des[1]) / 2);
                    } else {
                        ctx.drawImage(img, (shortSide - des[0]) / 2, 0);
                    }
                    var dataUrl = canvas.toDataURL('image/jpg');
                    callback(dataUrl.replace("data:image/jpg;base64,", ""));
                };
            } else {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    callback(wv.target(e).result.replace(/^data:image\/(png|jpg);base64,/, ""));
                };
            }
        },
        wechatImg: function (img) {
            var thumb = new Image();
            thumb.src = wv.getIMG(img, 300);
            wv.id('wx_pic').innerHTML = '';
            wv.id('wx_pic').appendChild(thumb);
        },
        loadImg: function (url, callback) {
            var pre = new Image();
            pre.src = url;
            pre.onload = function () {
                callback();
            };
        },
        lazyImg: function (url, ele) {
            var pre = new Image(),
                parent;
            pre.src = url;
            pre.onload = function () {
                ele.src = url;
            };
        },
        next: function (node) {
            var tempLast = node.parentNode.lastChild;
            if (node == tempLast) return null;
            var tempObj = node.nextSibling;
            while (tempObj.nodeType != 1 && tempObj.nextSibling != null) {
                tempObj = tempObj.nextSibling;
            }
            return tempObj.nodeType == 1 ? tempObj : null;
        },
        previous: function (node) {
            var tempFirst = node.parentNode.firstChild;
            if (node == tempFirst) return null;
            var tempObj = node.previousSibling;
            while (tempObj.nodeType != 1 && tempObj.previousSibling != null) {
                tempObj = tempObj.previousSibling;
            }
            return tempObj.nodeType == 1 ? tempObj : null;
        },
        chars: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        randId: function (n) {
            var res = "";
            for (var i = 0; i < n; i++) {
                var id = Math.ceil(Math.random() * 35);
                res += wv.util.chars[id];
            }
            return res;
        },
        addCSS: function (sheet, selector, rules) {
            if (navigator.userAgent.indexOf("Firefox") > 0) {
                sheet.insertRule(selector + "{" + rules + "}", sheet.cssRules.length);
            } else if ("insertRule" in sheet) {
                try {
                    sheet.insertRule(selector + "{" + rules + "}", sheet.rules.length);
                } catch (e) {
                    sheet.insertRule(selector + "{" + rules + "}", sheet.cssRules.length);
                }
            } else if ("addRule" in sheet) {
                sheet.addRule(selector, rules, sheet.rules.length);
            }
        },
        delCSS: function (sheet, index) {
            if (sheet.deleteRule) {
                sheet.deleteRule(index);
            } else if (sheet.removeRule) {
                //仅对IE有效
                sheet.removeRule(index);
            }
        },
        // 简单的节流函数
        throttle: function (func, wait, mustRun) {
            var timeout,
                startTime = new Date();
            return function () {
                var context = this,
                    args = arguments,
                    curTime = new Date();
                clearTimeout(timeout);
                // 如果达到了规定的触发时间间隔，触发 handler
                if (curTime - startTime >= mustRun) {
                    func.apply(context, args);
                    startTime = curTime;
                    // 没达到触发间隔，重新设定定时器
                } else {
                    timeout = setTimeout(func, wait);
                }
            };
        },
        getLeft: function (element) {
            var actualLeft = element.offsetLeft;
            var current = element.offsetParent;
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            return actualLeft;
        },
        getTop: function (element) {
            var actualTop = element.offsetTop;
            var current = element.offsetParent;
            while (current !== null) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            return actualTop;
        },
        fireClick: function (ele) {
            var ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
            ev.initEvent('click', true, true);
            ev.view = ev.view || window;
            ev.detail = 1;
            ev.button = 0;
            ev.relatedTarget = null;
            ev._constructed = true;
            ele.dispatchEvent(ev);
        },
        shareTo: function (url, picurl) {
            var view = '  ' + lan.t(ucfirst(wvEvnt.view));
            var html = "<dialog id='shareDlg' out='opacity'>" + "<ul type='dlg'>" + "<ul>" + "<li type='title'><label class='fa fa-share-alt'></label><h1>" + lan.t('Share') + view + "</h1></li>" + "<li type='input'>" + "<input value='" + url + "' spellcheck='false'>" + "</li>" + "</ul>" + "<ul type='cover'>" + "<button class='qq' id='qq'></button>" + "<button class='sina' id='sina'></button>" + "<button class='qqzone' id='qqzone'></button>" + "<button class='facebook' id='facebook'></button>" + "</ul>" + "</ul>" + "</dialog>";
            wv.append(wv.toHTML(html), document.body);
            wv.log.in('shareDlg');
            new Hammer(wv.id('shareDlg'), [Hammer.Tap]).on("tap", evHandler);

            function evHandler(ev) {
                var target = wv.target(ev);
                switch (target.id) {
                    case 'shareDlg':
                        wv.log.out('shareDlg');
                        break;
                    case 'qq':
                        openWin('qq');
                        break;
                    case 'sina':
                        openWin('sina');
                        break;
                    case 'qqzone':
                        openWin('qqzone');
                        break;
                    case 'facebook':
                        if (typeof FB != 'undefined') {
                            shareFB();
                        } else {
                            wv.toast(lan.t('Cannot connect Facebook'));
                        }
                        break;
                    default:
                        return;
                }
            }

            function ucfirst(str) {
                switch (str) {
                    case 'mind':
                        str = 'Mind View';
                        break;
                    case 'list':
                        str = 'List View';
                        break;
                    case 'phase':
                        str = 'Phase View';
                        break;
                    case 'image':
                        str = 'Image View';
                        break;
                    case 'table':
                        str = 'Table View';
                        break;
                    default:
                        str = '';
                }
                return str;
            }

            function openWin(to) {
                url = encodeURIComponent(url);
                var href;
                switch (to) {
                    case 'qq':
                        href = 'http://v.t.qq.com/share/share.php?title=' + document.title + '&url=' + url + '&pic=' + picurl;
                        break;
                    case 'sina':
                        href = 'http://v.t.sina.com.cn/share/share.php?title=' + document.title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl;
                        break;
                    case 'qqzone':
                        href = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + document.title + '&url=' + url + '&pics=' + picurl;
                        break;
                    default:
                        return;
                }
                window.open(href, 'newwindow', 'height=400,width=400,top=100,left=100');
            }

            function shareFB() {
                FB.ui({
                    method: 'share',
                    display: 'popup',
                    href: url
                }, function (response) {});
            }
        },
        getStyle: function (dom, attr) {
            return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];
        },
        getNum: function (str) {
            return parseInt(str.replace(re = /[a-zA-Z]/g, ''), 10);
        },
        cleanStr: function (string) {
            return string.replace(/['"<>&]/g, '');
        }
    };
    wv.ui = {
        AsideBtn: function () {
            var aside = wv.id('asidePnl');
            if (aside.getAttribute('checked') === 'checked') {
                wv.log.pop(aside);
            } else {
                aside.setAttribute('checked', 'checked');
                wv.log.push(aside);
            }
        },
        Aside: function (ev) {
            switch (wv.target(ev).getAttribute('name')) {
                case 'asidePnl':
                    wv.ui.AsideBtn();
                    break;
                case 'portraitImg':
                    wv.href('/site/myinfo');
                    break;
                case 'wvshare':
                    wv.href('/site/wvshare');
                    break;
                case 'mylist':
                    wv.href('/site/mylist');
                    break;
                case 'favorite':
                    wv.href('/site/favorite');
                    break;
                case 'pro':
                    wv.href('/site/pro');
                    break;
                case 'help':
                    wv.href('/site/help');
                    break;
                default:
                    return;
            }
        },
        switchCheck: function (obj, str) {
            if (obj.getAttribute('switch') === 'true') {
                obj.setAttribute('switch', 'false');
                wv.submitObj.isPrivate = 'false';
                wv.submitObj.isPrivateTxt = lan.t('Public');
            } else {
                obj.setAttribute('switch', 'true');
                wv.submitObj.isPrivate = 'true';
                wv.submitObj.isPrivateTxt = lan.t('Private');
            }
        },
        cleartxt: function (obj) {
            obj.parentNode.getElementsByTagName('input')[0].value = '';
        },
        Header: function (ev) {
            var target = wv.target(ev);
            switch (target.getAttribute('name')) {
                case 'home':
                    wv.href('/site/index');
                    break;
                case 'share':
                    wv.href('/site/wvshare');
                    break;
                case 'about':
                    wv.href('/site/about');
                    break;
                case 'login':
                    wv.user.login();
                    break;
                case 'signup':
                    wv.href('/site/signup');
                    break;
                case 'mylist':
                    wv.href('/site/mylist');
                    break;
                case 'lang':
                    lan.setLan(sessionStorage.lang === 'zh-CN' ? 'en' : 'zh-CN');
                    break;
                default:
                    return;
            }
        }
    };
    wv.mt = {
        back: function () {
            if (typeof iosObj != 'undefined') {
                iosObj.returnButton();
            } else if (window.history.length == 1) {
                wv.href('/site/wvshare');
            } else {
                window.history.go(-1);
            }
        },
        share: function () {
            if (sessionStorage.isFromApp == 'true') {
                var mindGuid = wv.submitObj.mindGuid || wvFile.guid;
                var url = wv.shareUrl + '/site/mind/' + mindGuid;
                iosObj.mindShare(url + ',' + wvFile.name + ',' + wvEvnt.view);
            } else {
                wvFile.share();
            }
        },
        output: function () {
            if (sessionStorage.isFromApp == 'true') {
                if (wvEvnt.view === 'mind') {
                    var tpc = wv.tag('topic'),
                        pt = parseInt(tpc.style.paddingTop, 10),
                        pl = parseInt(tpc.style.paddingLeft, 10),
                        scale = wvView.scroll.scale;
                    height = (tpc.clientHeight - pt * 2) * scale, width = (tpc.clientWidth - pl * 2) * scale;
                    wvView.scroll.scrollTo(-pl * scale, -pt * scale);
                    iosObj.mindFileOutPutPSize(height + ',' + width);
                } else {
                    var tpc = wv.tag('topic'),
                        scale = wvView.scroll.scale;
                    height = tpc.clientHeight * scale, width = tpc.clientWidth * scale;
                    wvView.scroll.scrollTo(0, 0);
                    iosObj.mindFileOutPutPSize(height + ',' + width);
                }
            } else {
                wvFile.output();
            }
        },
        hrefTo: function (guid) {
            if (typeof iosObj != 'undefined') {
                iosObj.hrefTo(guid);
            }
        }
    };
    wv.user = {
        login: function () {
            if (userInit && userInit.token) {
                wv.href('/site/mylist');
                return;
            }
            var dlgtxt = "<mask id='loginDlg' out='opacity' select='false'>" + "<dialog>" + "<header><section><label><i class='fa fa-user'></i></label><h1>" + lan.t('Login Weave Mind') + "</h1></section></header>" + "<ul>" + "<li type='input'>" + "<input id='username' placeholder='" + lan.t('Email') + "'/>" + "<i class='fa fa-times-circle' id='cleartxt'></i>" + "</li>" + "<li type='input'>" + "<input id='password' placeholder='" + lan.t('Password') + "' type='password'/>" + "<pre id='forgetPwd'>" + lan.t('Forgot') + "</pre>" + "</li>" + "</ul>" + "<ul><li id='loginBtn'><em>" + lan.t('Login') + "</em><pre class='fa fa-angle-right'></pre></li></ul>" + "<ul><li id='signupBtn'><em>" + lan.t('Signup') + "</em><pre class='fa fa-angle-right'></pre></li></ul>" + "</dialog>" + "</mask>",
                evHandler = function (ev) {
                var target = wv.target(ev);
                switch (target.id) {
                    case 'loginDlg':
                        wv.log.out(target);
                        break;
                    case 'cleartxt':
                        wv.ui.cleartxt(target);
                        break;
                    case 'forgetPwd':
                        wv.href('/site/resetpwd/');
                        break;
                    case 'signupBtn':
                        wv.href('/site/signup/');
                        break;
                    case 'loginBtn':
                        if (!wv.id('username').value || !wv.id('password').value) {
                            wv.toast(lan.t('Check your input please'));
                            return;
                        }
                        wv.ajax({
                            url: "/user/login",
                            data: {
                                account: wv.id('username').value,
                                password: wv.id('password').value
                            },
                            success: function (data) {
                                wv.toast(lan.t('Login Success'));
                                userInit.token = data.data.token;
                                setTimeout(function () {
                                    wv.href('/site/mylist');
                                }, 800);
                            }
                        });
                        break;
                    default:
                        return;
                }
            };
            document.body.appendChild(wv.toHTML(dlgtxt));
            wv.log.in('loginDlg');
            var hm = new Hammer(wv.id('loginDlg'));
            hm.on('tap', evHandler);
        },
        logout: function () {
            wv.confirm(lan.t("Log out?"), callback);

            function callback() {
                wv.ajax({
                    url: "/user/logout",
                    method: 'GET',
                    success: function (data) {
                        wv.toast(lan.t('Logoff Success'));
                        setTimeout(function () {
                            window.location.href = '/site/index';
                        }, 800);
                    }
                });
            }
        },
        modinfo: function () {
            var str = "<dialog id='renameDlg' out='opacity' select='false'>" + "<ul type='dlg'>" + "<ul>" + "<li type='title'><label><i class='fa fa-user'></i></label><h1>" + lan.t('Username') + "</h1></li>" + "<li type='input'>" + "<input value='" + userInit.userName + "' id='newNickName' autocomplete='off'>" + "<i class='fa fa-times-circle' id='cleartxt'></i>" + "</li>" + "</ul>" + "<ul><li type='button' id='renameBtn'>" + lan.t('Confirm') + "</li></ul>" + "</ul>" + "</dialog>",
                evHandler = function (ev) {
                var target = wv.target(ev);
                switch (target.id) {
                    case 'renameDlg':
                        wv.log.out(target);
                        break;
                    case 'renameBtn':
                        if (!wv.id('newNickName').value) {
                            wv.toast(lang.t('Username cannot be blank'));
                            return;
                        }
                        userInit.userName = wv.id('newNickName').value;
                        wv.ajax({
                            url: wv.apiUrl + "/user/modify-name",
                            data: {
                                token: userInit.token,
                                userName: userInit.userName
                            },
                            success: function (data) {
                                wv.ajax({ url: '/user/flush' });
                                wv.refresh(lan.t('Modificaiton Succeed'));
                            }
                        });
                        wv.log.out('renameDlg');
                        break;
                    case 'cleartxt':
                        wv.ui.cleartxt(target);
                        break;
                    default:
                        return;
                }
            };
            document.body.appendChild(wv.toHTML(str));
            wv.log.in('renameDlg');
            wv.id('renameDlg').addEvent('click', evHandler, false);
        },
        check: function () {
            window.userInit = wv.dataInit('userInit') || {};
            if (userInit && userInit.token) {
                var img = userInit.userImage;
                userInit.portrait = img && img.guid ? wv.getIMG(img, 96) : wv.defHead;
            }
            // if (!wv.id('loginState')||wv.id('loginState').innerHTML!='') return;
            // var html = (userInit && userInit.token) ?
            //     "<span name='mylist' id='portraitH' style='background-image:url(" + userInit.portrait + "')></span>" :
            //     "<span name='login'>" + lan.t('Login') + "</span><span>|</span><span name='signup'>" + lan.t('Signup') + "</span>";
            // wv.id('loginState').appendChild(wv.toHTML(html));
        }
    };
    wv.log = {
        heap: [],
        in: function (arg) {
            if (typeof arg === "string") {
                arg = wv.id(arg);
            }
            arg.style.display = 'block';
            wv.log.push(arg);
        },
        out: function (ele) {
            if (typeof ele === "string") {
                ele = wv.id(ele);
            }
            wv.log.pop(ele);
        },
        push: function (ele) {
            var tag = ele.tagName;
            var out = ele.getAttribute('out');
            var arr = wv.log.heap;
            arr.push({ 'ele': ele, 'tag': tag, 'out': out });
        },
        pop: function (ele) {
            var arr = wv.log.heap;
            var tag = ele.tagName;
            switch (tag) {
                case 'ASIDE':
                    for (var m = arr.length - 1; m >= 0; m--) {
                        if (arr[m].tag == 'ASIDE') {
                            arr[m].ele.setAttribute('checked', '');
                            arr.remove(m);
                        }
                    }
                    break;
                case 'FORM':
                    for (var j = arr.length - 1; j >= 0; j--) {
                        if (arr[j].tag == 'DIV') {
                            arr.remove(j);
                        } else if (arr[j].ele == ele) {
                            wv.anim.out(arr[j].ele, arr[j].ele, arr[j].out, 190, wv.clean);
                            arr.remove(j);
                        }
                    }
                    break;
                default:
                    for (var n = arr.length - 1; n >= 0; n--) {
                        if (arr[n].ele == ele) {
                            if (arr[n].out) {
                                wv.anim.out(arr[n].ele, arr[n].ele, arr[n].out, 190, wv.clean);
                                arr.remove(n);
                            } else {
                                wv.clean(arr[n].ele);
                                arr.remove(n);
                            }
                        }
                    }
                    break;
            }
        }
    };
    lan.init();
    wv.init();
})(window, document);

!function (a, b, c, d) {
    "use strict";
    function e(a, b, c) {
        return setTimeout(j(a, c), b);
    }function f(a, b, c) {
        return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
    }function g(a, b, c) {
        var e;if (a) if (a.forEach) a.forEach(b, c);else if (a.length !== d) for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a);
    }function h(b, c, d) {
        var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";return function () {
            var c = new Error("get-stack-trace"),
                d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                f = a.console && (a.console.warn || a.console.log);return f && f.call(a.console, e, d), b.apply(this, arguments);
        };
    }function i(a, b, c) {
        var d,
            e = b.prototype;d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c);
    }function j(a, b) {
        return function () {
            return a.apply(b, arguments);
        };
    }function k(a, b) {
        return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a;
    }function l(a, b) {
        return a === d ? b : a;
    }function m(a, b, c) {
        g(q(b), function (b) {
            a.addEventListener(b, c, !1);
        });
    }function n(a, b, c) {
        g(q(b), function (b) {
            a.removeEventListener(b, c, !1);
        });
    }function o(a, b) {
        for (; a;) {
            if (a == b) return !0;a = a.parentNode;
        }return !1;
    }function p(a, b) {
        return a.indexOf(b) > -1;
    }function q(a) {
        return a.trim().split(/\s+/g);
    }function r(a, b, c) {
        if (a.indexOf && !c) return a.indexOf(b);for (var d = 0; d < a.length;) {
            if (c && a[d][c] == b || !c && a[d] === b) return d;d++;
        }return -1;
    }function s(a) {
        return Array.prototype.slice.call(a, 0);
    }function t(a, b, c) {
        for (var d = [], e = [], f = 0; f < a.length;) {
            var g = b ? a[f][b] : a[f];r(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
        }return c && (d = b ? d.sort(function (a, c) {
            return a[b] > c[b];
        }) : d.sort()), d;
    }function u(a, b) {
        for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) {
            if (c = ma[g], e = c ? c + f : b, e in a) return e;g++;
        }return d;
    }function v() {
        return ua++;
    }function w(b) {
        var c = b.ownerDocument || b;return c.defaultView || c.parentWindow || a;
    }function x(a, b) {
        var c = this;this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
            k(a.options.enable, [a]) && c.handler(b);
        }, this.init();
    }function y(a) {
        var b,
            c = a.options.inputClass;return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z);
    }function z(a, b, c) {
        var d = c.pointers.length,
            e = c.changedPointers.length,
            f = b & Ea && d - e === 0,
            g = b & (Ga | Ha) && d - e === 0;c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
    }function A(a, b) {
        var c = a.session,
            d = b.pointers,
            e = d.length;c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);var f = c.firstInput,
            g = c.firstMultiple,
            h = g ? g.center : f.center,
            i = b.center = E(d);b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);var j = F(b.deltaTime, b.deltaX, b.deltaY);b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);var k = a.element;o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k;
    }function B(a, b) {
        var c = b.center,
            d = a.offsetDelta || {},
            e = a.prevDelta || {},
            f = a.prevInput || {};b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
    }function C(a, b) {
        var c,
            e,
            f,
            g,
            h = a.lastInterval || b,
            i = b.timeStamp - h.timeStamp;if (b.eventType != Ha && (i > Da || h.velocity === d)) {
            var j = b.deltaX - h.deltaX,
                k = b.deltaY - h.deltaY,
                l = F(i, j, k);e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b;
        } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g;
    }function D(a) {
        for (var b = [], c = 0; c < a.pointers.length;) b[c] = { clientX: pa(a.pointers[c].clientX), clientY: pa(a.pointers[c].clientY) }, c++;return { timeStamp: ra(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY };
    }function E(a) {
        var b = a.length;if (1 === b) return { x: pa(a[0].clientX), y: pa(a[0].clientY) };for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++;return { x: pa(c / b), y: pa(d / b) };
    }function F(a, b, c) {
        return { x: b / a || 0, y: c / a || 0 };
    }function G(a, b) {
        return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma;
    }function H(a, b, c) {
        c || (c = Qa);var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];return Math.sqrt(d * d + e * e);
    }function I(a, b, c) {
        c || (c = Qa);var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];return 180 * Math.atan2(e, d) / Math.PI;
    }function J(a, b) {
        return I(b[1], b[0], Ra) + I(a[1], a[0], Ra);
    }function K(a, b) {
        return H(b[0], b[1], Ra) / H(a[0], a[1], Ra);
    }function L() {
        this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments);
    }function M() {
        this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }function N() {
        this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments);
    }function O(a, b) {
        var c = s(a.touches),
            d = s(a.changedTouches);return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d];
    }function P() {
        this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments);
    }function Q(a, b) {
        var c = s(a.touches),
            d = this.targetIds;if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];var e,
            f,
            g = s(a.changedTouches),
            h = [],
            i = this.target;if (f = c.filter(function (a) {
            return o(a.target, i);
        }), b === Ea) for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++;return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0;
    }function R() {
        x.apply(this, arguments);var a = j(this.handler, this);this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = [];
    }function S(a, b) {
        a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b);
    }function T(a) {
        var b = a.changedPointers[0];if (b.identifier === this.primaryTouch) {
            var c = { x: b.clientX, y: b.clientY };this.lastTouches.push(c);var d = this.lastTouches,
                e = function () {
                var a = d.indexOf(c);a > -1 && d.splice(a, 1);
            };setTimeout(e, cb);
        }
    }function U(a) {
        for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) {
            var e = this.lastTouches[d],
                f = Math.abs(b - e.x),
                g = Math.abs(c - e.y);if (db >= f && db >= g) return !0;
        }return !1;
    }function V(a, b) {
        this.manager = a, this.set(b);
    }function W(a) {
        if (p(a, jb)) return jb;var b = p(a, kb),
            c = p(a, lb);return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb;
    }function X() {
        if (!fb) return !1;var b = {},
            c = a.CSS && a.CSS.supports;return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (d) {
            b[d] = c ? a.CSS.supports("touch-action", d) : !0;
        }), b;
    }function Y(a) {
        this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = [];
    }function Z(a) {
        return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "";
    }function $(a) {
        return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "";
    }function _(a, b) {
        var c = b.manager;return c ? c.get(a) : a;
    }function aa() {
        Y.apply(this, arguments);
    }function ba() {
        aa.apply(this, arguments), this.pX = null, this.pY = null;
    }function ca() {
        aa.apply(this, arguments);
    }function da() {
        Y.apply(this, arguments), this._timer = null, this._input = null;
    }function ea() {
        aa.apply(this, arguments);
    }function fa() {
        aa.apply(this, arguments);
    }function ga() {
        Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }function ha(a, b) {
        return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b);
    }function ia(a, b) {
        this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function (a) {
            var b = this.add(new a[0](a[1]));a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
        }, this);
    }function ja(a, b) {
        var c = a.element;if (c.style) {
            var d;g(a.options.cssProps, function (e, f) {
                d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || "";
            }), b || (a.oldCssProps = {});
        }
    }function ka(a, c) {
        var d = b.createEvent("Event");d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
    }var la,
        ma = ["", "webkit", "Moz", "MS", "ms", "o"],
        na = b.createElement("div"),
        oa = "function",
        pa = Math.round,
        qa = Math.abs,
        ra = Date.now;la = "function" != typeof Object.assign ? function (a) {
        if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");for (var b = Object(a), c = 1; c < arguments.length; c++) {
            var e = arguments[c];if (e !== d && null !== e) for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f]);
        }return b;
    } : Object.assign;var sa = h(function (a, b, c) {
        for (var e = Object.keys(b), f = 0; f < e.length;) (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;return a;
    }, "extend", "Use `assign`."),
        ta = h(function (a, b) {
        return sa(a, b, !0);
    }, "merge", "Use `assign`."),
        ua = 1,
        va = /mobile|tablet|ip(ad|hone|od)|android/i,
        wa = "ontouchstart" in a,
        xa = u(a, "PointerEvent") !== d,
        ya = wa && va.test(navigator.userAgent),
        za = "touch",
        Aa = "pen",
        Ba = "mouse",
        Ca = "kinect",
        Da = 25,
        Ea = 1,
        Fa = 2,
        Ga = 4,
        Ha = 8,
        Ia = 1,
        Ja = 2,
        Ka = 4,
        La = 8,
        Ma = 16,
        Na = Ja | Ka,
        Oa = La | Ma,
        Pa = Na | Oa,
        Qa = ["x", "y"],
        Ra = ["clientX", "clientY"];x.prototype = { handler: function () {}, init: function () {
            this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler);
        }, destroy: function () {
            this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler);
        } };var Sa = { mousedown: Ea, mousemove: Fa, mouseup: Ga },
        Ta = "mousedown",
        Ua = "mousemove mouseup";i(L, x, { handler: function (a) {
            var b = Sa[a.type];b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: Ba, srcEvent: a }));
        } });var Va = { pointerdown: Ea, pointermove: Fa, pointerup: Ga, pointercancel: Ha, pointerout: Ha },
        Wa = { 2: za, 3: Aa, 4: Ba, 5: Ca },
        Xa = "pointerdown",
        Ya = "pointermove pointerup pointercancel";a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, { handler: function (a) {
            var b = this.store,
                c = !1,
                d = a.type.toLowerCase().replace("ms", ""),
                e = Va[d],
                f = Wa[a.pointerType] || a.pointerType,
                g = f == za,
                h = r(b, a.pointerId, "pointerId");e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1));
        } });var Za = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
        $a = "touchstart",
        _a = "touchstart touchmove touchend touchcancel";i(N, x, { handler: function (a) {
            var b = Za[a.type];if (b === Ea && (this.started = !0), this.started) {
                var c = O.call(this, a, b);b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a });
            }
        } });var ab = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
        bb = "touchstart touchmove touchend touchcancel";i(P, x, { handler: function (a) {
            var b = ab[a.type],
                c = Q.call(this, a, b);c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a });
        } });var cb = 2500,
        db = 25;i(R, x, { handler: function (a, b, c) {
            var d = c.pointerType == za,
                e = c.pointerType == Ba;if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
                if (d) S.call(this, b, c);else if (e && U.call(this, c)) return;this.callback(a, b, c);
            }
        }, destroy: function () {
            this.touch.destroy(), this.mouse.destroy();
        } });var eb = u(na.style, "touchAction"),
        fb = eb !== d,
        gb = "compute",
        hb = "auto",
        ib = "manipulation",
        jb = "none",
        kb = "pan-x",
        lb = "pan-y",
        mb = X();V.prototype = { set: function (a) {
            a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim();
        }, update: function () {
            this.set(this.manager.options.touchAction);
        }, compute: function () {
            var a = [];return g(this.manager.recognizers, function (b) {
                k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
            }), W(a.join(" "));
        }, preventDefaults: function (a) {
            var b = a.srcEvent,
                c = a.offsetDirection;if (this.manager.session.prevented) return void b.preventDefault();var d = this.actions,
                e = p(d, jb) && !mb[jb],
                f = p(d, lb) && !mb[lb],
                g = p(d, kb) && !mb[kb];if (e) {
                var h = 1 === a.pointers.length,
                    i = a.distance < 2,
                    j = a.deltaTime < 250;if (h && i && j) return;
            }return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0;
        }, preventSrc: function (a) {
            this.manager.session.prevented = !0, a.preventDefault();
        } };var nb = 1,
        ob = 2,
        pb = 4,
        qb = 8,
        rb = qb,
        sb = 16,
        tb = 32;Y.prototype = { defaults: {}, set: function (a) {
            return la(this.options, a), this.manager && this.manager.touchAction.update(), this;
        }, recognizeWith: function (a) {
            if (f(a, "recognizeWith", this)) return this;var b = this.simultaneous;return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
        }, dropRecognizeWith: function (a) {
            return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this);
        }, requireFailure: function (a) {
            if (f(a, "requireFailure", this)) return this;var b = this.requireFail;return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this;
        }, dropRequireFailure: function (a) {
            if (f(a, "dropRequireFailure", this)) return this;a = _(a, this);var b = r(this.requireFail, a);return b > -1 && this.requireFail.splice(b, 1), this;
        }, hasRequireFailures: function () {
            return this.requireFail.length > 0;
        }, canRecognizeWith: function (a) {
            return !!this.simultaneous[a.id];
        }, emit: function (a) {
            function b(b) {
                c.manager.emit(b, a);
            }var c = this,
                d = this.state;qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d));
        }, tryEmit: function (a) {
            return this.canEmit() ? this.emit(a) : void (this.state = tb);
        }, canEmit: function () {
            for (var a = 0; a < this.requireFail.length;) {
                if (!(this.requireFail[a].state & (tb | nb))) return !1;a++;
            }return !0;
        }, recognize: function (a) {
            var b = la({}, a);return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void (this.state = tb));
        }, process: function (a) {}, getTouchAction: function () {}, reset: function () {} }, i(aa, Y, { defaults: { pointers: 1 }, attrTest: function (a) {
            var b = this.options.pointers;return 0 === b || a.pointers.length === b;
        }, process: function (a) {
            var b = this.state,
                c = a.eventType,
                d = b & (ob | pb),
                e = this.attrTest(a);return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb;
        } }), i(ba, aa, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Pa }, getTouchAction: function () {
            var a = this.options.direction,
                b = [];return a & Na && b.push(lb), a & Oa && b.push(kb), b;
        }, directionTest: function (a) {
            var b = this.options,
                c = !0,
                d = a.distance,
                e = a.direction,
                f = a.deltaX,
                g = a.deltaY;return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
        }, attrTest: function (a) {
            return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a));
        }, emit: function (a) {
            this.pX = a.deltaX, this.pY = a.deltaY;var b = $(a.direction);b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a);
        } }), i(ca, aa, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function () {
            return [jb];
        }, attrTest: function (a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob);
        }, emit: function (a) {
            if (1 !== a.scale) {
                var b = a.scale < 1 ? "in" : "out";a.additionalEvent = this.options.event + b;
            }this._super.emit.call(this, a);
        } }), i(da, Y, { defaults: { event: "press", pointers: 1, time: 251, threshold: 9 }, getTouchAction: function () {
            return [hb];
        }, process: function (a) {
            var b = this.options,
                c = a.pointers.length === b.pointers,
                d = a.distance < b.threshold,
                f = a.deltaTime > b.time;if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset();else if (a.eventType & Ea) this.reset(), this._timer = e(function () {
                this.state = rb, this.tryEmit();
            }, b.time, this);else if (a.eventType & Ga) return rb;return tb;
        }, reset: function () {
            clearTimeout(this._timer);
        }, emit: function (a) {
            this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input)));
        } }), i(ea, aa, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function () {
            return [jb];
        }, attrTest: function (a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob);
        } }), i(fa, aa, { defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Na | Oa, pointers: 1 }, getTouchAction: function () {
            return ba.prototype.getTouchAction.call(this);
        }, attrTest: function (a) {
            var b,
                c = this.options.direction;return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga;
        }, emit: function (a) {
            var b = $(a.offsetDirection);b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
        } }), i(ga, Y, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 }, getTouchAction: function () {
            return [ib];
        }, process: function (a) {
            var b = this.options,
                c = a.pointers.length === b.pointers,
                d = a.distance < b.threshold,
                f = a.deltaTime < b.time;if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout();if (d && f && c) {
                if (a.eventType != Ga) return this.failTimeout();var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
                    h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;var i = this.count % b.taps;if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () {
                    this.state = rb, this.tryEmit();
                }, b.interval, this), ob) : rb;
            }return tb;
        }, failTimeout: function () {
            return this._timer = e(function () {
                this.state = tb;
            }, this.options.interval, this), tb;
        }, reset: function () {
            clearTimeout(this._timer);
        }, emit: function () {
            this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
        } }), ha.VERSION = "2.0.8", ha.defaults = { domEvents: !1, touchAction: gb, enable: !0, inputTarget: null, inputClass: null, preset: [[ea, { enable: !1 }], [ca, { enable: !1 }, ["rotate"]], [fa, { direction: Na }], [ba, { direction: Na }, ["swipe"]], [ga], [ga, { event: "doubletap", taps: 2 }, ["tap"]], [da]], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };var ub = 1,
        vb = 2;ia.prototype = { set: function (a) {
            return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
        }, stop: function (a) {
            this.session.stopped = a ? vb : ub;
        }, recognize: function (a) {
            var b = this.session;if (!b.stopped) {
                this.touchAction.preventDefaults(a);var c,
                    d = this.recognizers,
                    e = b.curRecognizer;(!e || e && e.state & rb) && (e = b.curRecognizer = null);for (var f = 0; f < d.length;) c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++;
            }
        }, get: function (a) {
            if (a instanceof Y) return a;for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];return null;
        }, add: function (a) {
            if (f(a, "add", this)) return this;var b = this.get(a.options.event);return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
        }, remove: function (a) {
            if (f(a, "remove", this)) return this;if (a = this.get(a)) {
                var b = this.recognizers,
                    c = r(b, a);-1 !== c && (b.splice(c, 1), this.touchAction.update());
            }return this;
        }, on: function (a, b) {
            if (a !== d && b !== d) {
                var c = this.handlers;return g(q(a), function (a) {
                    c[a] = c[a] || [], c[a].push(b);
                }), this;
            }
        }, off: function (a, b) {
            if (a !== d) {
                var c = this.handlers;return g(q(a), function (a) {
                    b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a];
                }), this;
            }
        }, emit: function (a, b) {
            this.options.domEvents && ka(a, b);var c = this.handlers[a] && this.handlers[a].slice();if (c && c.length) {
                b.type = a, b.preventDefault = function () {
                    b.srcEvent.preventDefault();
                };for (var d = 0; d < c.length;) c[d](b), d++;
            }
        }, destroy: function () {
            this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
        } }, la(ha, { INPUT_START: Ea, INPUT_MOVE: Fa, INPUT_END: Ga, INPUT_CANCEL: Ha, STATE_POSSIBLE: nb, STATE_BEGAN: ob, STATE_CHANGED: pb, STATE_ENDED: qb, STATE_RECOGNIZED: rb, STATE_CANCELLED: sb, STATE_FAILED: tb, DIRECTION_NONE: Ia, DIRECTION_LEFT: Ja, DIRECTION_RIGHT: Ka, DIRECTION_UP: La, DIRECTION_DOWN: Ma, DIRECTION_HORIZONTAL: Na, DIRECTION_VERTICAL: Oa, DIRECTION_ALL: Pa, Manager: ia, Input: x, TouchAction: V, TouchInput: P, MouseInput: L, PointerEventInput: M, TouchMouseInput: R, SingleTouchInput: N, Recognizer: Y, AttrRecognizer: aa, Tap: ga, Pan: ba, Swipe: fa, Pinch: ca, Rotate: ea, Press: da, on: m, off: n, each: g, merge: ta, extend: sa, assign: la, inherit: i, bindFn: j, prefixed: u });var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};wb.Hammer = ha, "function" == typeof define && define.amd ? define(function () {
        return ha;
    }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha;
}(window, document, "Hammer");
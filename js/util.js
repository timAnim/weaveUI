    wv.util = {
        apiUrl: 'http://mapidev.weavent.com',
        shareUrl: 'http://minddev.weavent.com',
        defHead: '/images/portrait_big.png',
        defMind: 'data:image/png;base64,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',
        defLogo: 'data:image/png;base64,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',
        submitObj: {},
        isArray: function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },
        backBtn: function() {
            if (logs.length > 0) {
                var ele = logs[logs.length - 1].ele;
                logPop(ele);
            } else if (logs.length === 0) {
                history.go(-1);
            }
        },
        insertAfter: function(newEl, target) {
            var parent = target.parentNode;
            if (parent.lastChild == target) {
                parent.appendChild(newEl);
            } else {
                parent.insertBefore(newEl, target.nextSibling);
            }
        },
        selectImg: function(type) {
            var str = "<input type='file' id='imgUpload'/>";
            document.body.appendChild(wv.toHTML(str));
            wv.id('imgUpload').addEvent('change', function() {
                wv.util.uploadImg(type);
            }, false);
            wv.util.fireClick(wv.id('imgUpload'));
        },
        checkUrl: function(url, callback) {
            xhr = new window.XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 1) callback();
            };
            xhr.open("GET", url);
        },
        splitTxt: function(obj) {
            if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                var startPos = obj.selectionStart,
                    endPos = obj.selectionEnd,
                    cursorPos = startPos,
                    tmpStr = obj.value;
                return [tmpStr.substring(0, cursorPos), tmpStr.substring(cursorPos, tmpStr.length)]
            }
            return false;
        },
        uploadImg: function(modelType) {
            var modelId, xhr,
                beforeUpload = function() {
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
                        return
                    }
                    if (fileSize > 5 * 1024) {
                        uploadEnd(lan.t('Image maxsize is 5Mb'));
                        return
                    }
                    beginUpload(file);
                },
                beginUpload = function(file) {
                    var square = (modelType === 'MindContentImage') ? false : true;
                    var callback = function(base64) {
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
                uploadResposed = function() {
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
                            wv.util.loadImg(url, function() {
                                if (resImg.tagName === 'IMG') resImg.src = url;
                                else { resImg.style.backgroundImage = 'url(' + url + ')'; }
                                uploadEnd();
                            });
                        } else {
                            uploadEnd(data.message);
                        }
                    }
                },
                uploadFailed = function() {
                    uploadEnd('Bad Network');
                },
                uploadCanceled = function() {
                    uploadEnd('Bad Network');
                },
                uploadEnd = function(str) {
                    if (str) wv.toast(lan.t(str));
                    wv.clean('imgUpload');
                    wv.loaded();
                }
            beforeUpload();
        },
        uploadBase64: function(base64) {
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
                        wv.util.loadImg(url, function() {
                            if (resImg.tagName === 'IMG') resImg.src = url;
                            else { resImg.style.backgroundImage = 'url(' + url + ')'; }
                            wv.loaded();
                        });
                    } else {
                        wv.loaded();
                    }
                }
            }
        },
        getBase64Img: function(file, square, callback) {
            if (square) {
                var img = new Image();
                img.src = window.URL.createObjectURL(file);
                img.crossOrigin = 'anonymous';
                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d');
                img.onload = function() {
                    var des = [img.width, img.height],
                        rate = des[0] / des[1],
                        shortSide = (rate < 1) ? des[0] : des[1],
                        compact = (shortSide > 800) ? (800 / shortSide) : false;
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
                }
            } else {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    callback(wv.target(e).result.replace(/^data:image\/(png|jpg);base64,/, ""));
                }
            }
        },
        wechatImg: function(img) {
            var thumb = new Image();
            thumb.src = wv.getIMG(img, 300);
            wv.id('wx_pic').innerHTML = '';
            wv.id('wx_pic').appendChild(thumb);
        },
        loadImg: function(url, callback) {
            var pre = new Image();
            pre.src = url;
            pre.onload = function() {
                callback();
            }
        },
        lazyImg: function(url, ele) {
            var pre = new Image(),
                parent;
            pre.src = url;
            pre.onload = function() {
                ele.src = url;
            }
        },
        next: function(node) {
            var tempLast = node.parentNode.lastChild;
            if (node == tempLast) return null;
            var tempObj = node.nextSibling;
            while (tempObj.nodeType != 1 && tempObj.nextSibling != null) {
                tempObj = tempObj.nextSibling;
            }
            return (tempObj.nodeType == 1) ? tempObj : null;
        },
        previous: function(node) {
            var tempFirst = node.parentNode.firstChild;
            if (node == tempFirst) return null;
            var tempObj = node.previousSibling;
            while (tempObj.nodeType != 1 && tempObj.previousSibling != null) {
                tempObj = tempObj.previousSibling;
            }
            return (tempObj.nodeType == 1) ? tempObj : null;
        },
        chars: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        randId: function(n) {
            var res = "";
            for (var i = 0; i < n; i++) {
                var id = Math.ceil(Math.random() * 35);
                res += wv.util.chars[id];
            }
            return res;
        },
        addCSS: function(sheet, selector, rules) {
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
        delCSS: function(sheet, index) {
            if (sheet.deleteRule) {
                sheet.deleteRule(index);
            } else if (sheet.removeRule) { //仅对IE有效
                sheet.removeRule(index);
            }
        },
        // 简单的节流函数
        throttle: function(func, wait, mustRun) {
            var timeout,
                startTime = new Date();
            return function() {
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
        getLeft: function(element) {
            var actualLeft = element.offsetLeft;
            var current = element.offsetParent;
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            return actualLeft;
        },
        getTop: function(element) {
            var actualTop = element.offsetTop;
            var current = element.offsetParent;
            while (current !== null) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            return actualTop;
        },
        fireClick: function(ele) {
            var ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
            ev.initEvent('click', true, true);
            ev.view = ev.view || window;
            ev.detail = 1;
            ev.button = 0;
            ev.relatedTarget = null;
            ev._constructed = true;
            ele.dispatchEvent(ev);
        },
        shareTo: function(url, picurl) {
            var view = '  ' + lan.t(ucfirst(wvEvnt.view));
            var html =
                "<dialog id='shareDlg' out='opacity'>" +
                "<ul type='dlg'>" +
                "<ul>" +
                "<li type='title'><label class='fa fa-share-alt'></label><h1>" + lan.t('Share') + view + "</h1></li>" +
                "<li type='input'>" +
                "<input value='" + url + "' spellcheck='false'>" +
                "</li>" +
                "</ul>" +
                "<ul type='cover'>" +
                "<button class='qq' id='qq'></button>" +
                "<button class='sina' id='sina'></button>" +
                "<button class='qqzone' id='qqzone'></button>" +
                "<button class='facebook' id='facebook'></button>" +
                "</ul>" +
                "</ul>" +
                "</dialog>";
            wv.append(wv.toHTML(html), document.body);
            wv.log.in('shareDlg');
            (new Hammer(wv.id('shareDlg'), [Hammer.Tap])).on("tap", evHandler);

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
                        if (typeof(FB) != 'undefined') {
                            shareFB();
                        } else {
                            wv.toast(lan.t('Cannot connect Facebook'))
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
                    href: url,
                }, function(response) {});
            }
        },
        getStyle: function(dom, attr) {
            return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];
        },
        getNum: function(str) {
            return parseInt(str.replace(re = /[a-zA-Z]/g, ''), 10);
        },
        cleanStr: function(string) {
            return string.replace(/['"<>&]/g, '');
        },
        onload: function(fn) {
            var done = false,
                top = true,
                document = window.document,
                root = document.documentElement,

                add = document.addEventListener ? 'addEventListener' : 'attachEvent',
                rem = document.addEventListener ? 'removeEventListener' : 'detachEvent',
                pre = document.addEventListener ? '' : 'on',

                init = function(e) {
                    if (e.type == 'readystatechange' && document.readyState != 'complete') return;
                    (e.type == 'load' ? window : document)[rem](pre + e.type, init, false);
                    if (!done && (done = true)) fn.call(window, e.type || e);
                },

                poll = function() {
                    try { root.doScroll('left'); } catch (e) {
                        setTimeout(poll, 50);
                        return;
                    }
                    init('poll');
                };

            if (document.readyState == 'complete') fn.call(window, 'lazy');
            else {
                if (document.createEventObject && root.doScroll) {
                    try { top = !window.frameElement; } catch (e) {}
                    if (top) poll();
                }
                document[add](pre + 'DOMContentLoaded', init, false);
                document[add](pre + 'readystatechange', init, false);
                window[add](pre + 'load', init, false);
            }
        },
        loading: function() {
            var dlgtxt =
                "<div class='waitingBg' id='waitBg'>" +
                "<div class='waiting float rotateAnimation'><p>" + lan.t('loading...') + "</p><i class='fa fa-spinner fa-pulse fa-fw'></i></div>" +
                "</div>";
            var bg = this.toHTML(dlgtxt);
            document.body.appendChild(bg);
        },
        loaded: function() {
            var bg = this.id('waitBg');
            if (bg) { this.anim.out(bg, bg, 'opacity', 200, this.clean); }
        },
        ajax: function(opt) {
            opt = opt || {};
            opt.method = opt.method || 'POST';
            opt.url = opt.url || '';
            opt.async = opt.async || true;
            opt.data = opt.data || null;
            opt.success = opt.success || function() {};
            opt.error = opt.error || function() {
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
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var data = xmlHttp.responseText; //返回的对象data
                    if (opt.method === 'POST') { //post方法请求，对json进行解析
                        data = JSON.parse(data);
                        if (data.error === 'NA') {
                            opt.success(data);
                        } else if (data.message) {
                            wv.toast(data.message);
                        } else {
                            console.log('error');
                        }
                    } else if (opt.method === 'GET') { //get方法请求，直接返回
                        opt.success(data);
                    }
                }
            };
        },
        insert: function(dom, parent, clear) {
            if (clear && wv.id(parent)) {
                if (typeof(parent) === "string") {
                    wv.id(parent).innerHTML = '';
                    wv.id(parent).insertBefore(dom, parent.children[0]);
                } else {
                    parent.innerHTML = '';
                    parent.insertBefore(dom, parent.children[0]);
                }
            } else {
                if (typeof(parent) === "string") {
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
        getIMG: function(img, width) {
            if (width > 1024) width = 1024;
            return wv.apiUrl + '/image/view/' + img.guid + '_' + width + '.' + img.extension;
        },
        getRequest: function() {
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
        refresh: function(str) {
            if (str) wv.toast(str);
            setTimeout(function() {
                history.go(0);
            }, 800);
        },
        scrollH: function(ele, tapFn) {
            var scrollHdl = new Hammer.Manager(ele, {
                    recognizers: [
                        [Hammer.Tap]
                    ]
                }),
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
        },
    };

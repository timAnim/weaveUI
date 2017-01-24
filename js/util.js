    wv.util = {
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
        checkUrl:function(url,callback){
            xhr = new window.XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if (xhr.readyState==1)  callback();
            };
            xhr.open("GET", url);
        },
        splitTxt:function (obj) {
            if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                var startPos = obj.selectionStart,
                    endPos = obj.selectionEnd,
                    cursorPos = startPos,
                    tmpStr = obj.value;
                return [tmpStr.substring(0, cursorPos),tmpStr.substring(cursorPos, tmpStr.length)]
            }
            return false;
        },
        uploadImg: function(modelType) {
            var modelId,xhr,
                beforeUpload = function() {
                    wv.loading();
                    switch (modelType) {
                        case 'MindUserImage':
                            modelId= userInit.userId;
                            break;
                        case 'MindContentImage':
                            modelId= wvFile.id;
                            break;
                        case 'MindSetImage':
                            modelId= wv.submitObj.setId;
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
                    var square= (modelType==='MindContentImage')?false:true;
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
                    wv.util.getBase64Img(file,square,callback);
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
                                    url = wv.getIMG(img,resImg.clientWidth);
                                    userInit.portrait = url;
                                    wv.ajax({ url: '/user/flush' });
                                    break;
                                case 'MindContentImage':
                                    var width = wv.tag('title', wvFile.actChild).clientWidth;
                                    url = wv.getIMG(img,width);
                                    wvFile.actChild.parentNode.setAttribute('image', url);
                                    resImg = wv.tag('img', wvFile.actChild);
                                    if (!resImg){
                                        resImg = document.createElement('img');
                                        resImg.setAttribute('draggable',false);
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
                                    url=wv.getIMG(img,resImg.clientWidth);
                                    break;
                            }
                            wv.util.loadImg(url, function() {
                                if (resImg.tagName==='IMG') resImg.src =url;
                                else{resImg.style.backgroundImage = 'url(' + url + ')';}
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
                uploadEnd=function(str) {
                    if (str) wv.toast(lan.t(str));
                    wv.clean('imgUpload');
                    wv.loaded();
                }
            beforeUpload();
        },
        uploadBase64:function(base64){
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
                        url = wv.getIMG(img,width);
                        wvFile.actChild.parentNode.setAttribute('image', url);
                        resImg = wv.tag('img', wvFile.actChild);
                        if (!resImg){
                            resImg = document.createElement('img');
                            resImg.setAttribute('draggable',false);
                        }
                        wvFile.actChild.appendChild(resImg);
                        wvFile.save(true);
                        wv.util.loadImg(url, function() {
                            if (resImg.tagName==='IMG') resImg.src =url;
                            else{resImg.style.backgroundImage = 'url(' + url + ')';}
                             wv.loaded();
                        });
                    } else {
                         wv.loaded();
                    }
                }
            }
        },
        getBase64Img:function(file,square,callback) {
            if (square) {
                var img = new Image();
                img.src = window.URL.createObjectURL(file);
                img.crossOrigin = 'anonymous';
                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d');
                img.onload = function() {
                    var des = [img.width,img.height],
                        rate=des[0]/des[1],
                        shortSide = (rate<1) ? des[0] : des[1],
                        compact=(shortSide>800)?(800/shortSide):false;
                    shortSide=compact?800:shortSide;
                    canvas.width = canvas.height=shortSide;
                    ctx.fillStyle="white";
                    ctx.fillRect(0,0,shortSide,shortSide);

                    if (compact&&rate<1) {
                        ctx.drawImage(img, 0, (shortSide-des[1]*compact)/2, des[0]*compact, des[1]*compact );
                    }else if(compact&&rate>1){
                        ctx.drawImage(img, (shortSide-des[0]*compact)/2, 0, des[0]*compact, des[1]*compact );
                    }else if (!compact&&rate<1) {
                        ctx.drawImage(img, 0, (shortSide-des[1])/2);
                    }else{
                        ctx.drawImage(img, (shortSide-des[0])/2, 0);
                    }
                    var dataUrl = canvas.toDataURL('image/jpg');
                    callback(dataUrl.replace("data:image/jpg;base64,",""));
                }
            }else{
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    callback(wv.target(e).result.replace(/^data:image\/(png|jpg);base64,/, ""));
                }
            }
        },
        wechatImg: function(img) {
            var thumb=new Image();
            thumb.src=wv.getIMG(img,300);
            wv.id('wx_pic').innerHTML='';
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
            var pre=new Image(),parent;
            pre.src = url;
            pre.onload = function() {
                ele.src=url;
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
            var view='  '+lan.t(ucfirst(wvEvnt.view));
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
            (new Hammer(wv.id('shareDlg'),[Hammer.Tap])).on("tap", evHandler);

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
                        if (typeof(FB)!='undefined') {
                            shareFB();
                        }else{
                            wv.toast(lan.t('Cannot connect Facebook'))
                        }
                        break;
                    default:
                        return;
                }
            }

            function ucfirst(str){
                switch (str){
                    case 'mind':
                        str='Mind View';
                        break;
                    case 'list':
                        str='List View';
                        break;
                    case 'phase':
                        str='Phase View';
                        break;
                    case 'image':
                        str='Image View';
                        break;
                    case 'table':
                        str='Table View';
                        break;
                    default:
                        str='';
                }
                return str;
            }

            function openWin(to) {
                url=encodeURIComponent(url);
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

            function shareFB(){
                FB.ui({
                    method: 'share',
                    display: 'popup',
                    href: url,
                  }, function(response){});
            }
        },
        getStyle: function(dom, attr){
            return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];
        },
        getNum: function(str){
            return parseInt(str.replace(re = /[a-zA-Z]/g, ''),10);
        },
        cleanStr: function(string){
            return string.replace(/['"<>&]/g, '');
        },
    };
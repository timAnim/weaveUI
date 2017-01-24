require(['lan'], function(lan) {
    require(["weave", "Hammer"], function(wv, Hammer) {
        require(['component'], function(component) {

            var show = function(id) {
                var dom = wv.toHTML(wv.id(id).value);
                wv.append(dom, document.body);
                wv.log.in(id.split('-tmp')[0]);
            }

            var command = wv.find('body');

            var tapHandler = function(ev) {
                var target = ev.target;
                var tag = target.tagName;
                if (tag == 'I') target = target.parentNode;
                switch (tag) {
                    case 'EM':
                    case 'PRE':
                    case 'LABEL':
                        target = target.parentNode;
                        break;
                    case 'ARTICLE':
                    case 'FORM':
                        if (target.getAttribute('pause') != 'true') return;
                        wv.log.pop();
                        break;
                }
                switch (target.id) {
                    case 'footer-switch':
                        var checked = (command.getAttribute('footer') == 'true') ? false : true;
                        command.setAttribute('footer', checked);
                        target.setAttribute('checked', checked);
                        break;
                    case 'login-btn':
                        component.Login();
                        break;
                    case 'form-btn':
                        show('form-tmp');
                        break;
                    case 'input-btn':
                        new component.InputDialog({
                            title: '选择',
                            data: {
                                placeholder:'输入文本',
                                type:'text',
                            },
                            onSubmit: function(res) {
                                var pre = wv.tag('pre', target);
                                if (pre) pre.innerHTML = res;
                            }
                        });
                        break;
                    case 'confirm-btn':
                        new component.Confirm({
                            title: '选择',
                            onSubmit: function(res) {
                                var pre = wv.tag('pre', target);
                                if (pre) pre.innerHTML = res;
                            }
                        });
                        break;
                    case 'toast-btn':
                        component.Toast('Toast');
                        break;
                    case 'menu-btn':
                        show('menu-tmp');
                        break;
                    case 'aside-btn':
                        wv.log.in('aside');
                        break;
                    case 'close-form':
                        wv.log.pop();
                        break;
                    case 'check-btn':
                        new component.CheckDialog({
                            title: '选择',
                            data: checkDlgData,
                            onSubmit: function(res) {
                                var pre = wv.tag('pre', target);
                                if (pre) pre.innerHTML = res.txtArr.join(',');
                            }
                        });
                        break;
                    case 'radio-btn':
                        new component.RadioDialog({
                            title: '选择',
                            onCreate: function(dialog) {
                                dialog.setData(radioDlgData);
                            },
                            onSubmit: function(res) {
                                var pre = wv.tag('pre', target);
                                if (pre) pre.innerHTML = res.txtArr.join(',');
                            }
                        });
                        break;
                }
            };
            wv.scroll(wv.find('content'));
            wv.ontap(tapHandler);
        });
    });
});

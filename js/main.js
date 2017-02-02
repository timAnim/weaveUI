var menu;
require(['lan', "Hammer"], function(lan, Hammer) {
    require(["base"], function(base) {
        require(['iDialog', 'dtPicker'], function(iDialog, dt) {
            base.log.onIn = function(ele, last) {
                if (ele.tagName == 'MODAL') document.body.setAttribute('ul', false);
                else last.setAttribute('pause', true);
            }
            base.log.onPop = function(ele, last) {
                if (ele.tagName == 'MODAL') document.body.setAttribute('ul', true);
                else last.setAttribute('pause', false);
            }
            menu = new iDialog({
                title: '选择',
                type: 'menu',
                data: menuData,
                clean: false,
                onSubmit: function(res) {}
            });
            var aside = new iDialog({
                img: '/image/img01.jpg',
                data: menuData,
                type: 'aside',
                clean: false,
                onSubmit: function(res) {}
            });

            var date = document.getElementsByName('date-picker')[0];
            var dateP = new iDialog.DatePicker({
                'ele': date,
                clean: false,
                minDate: '2016-01-01',
                maxDate: '2017-01-01',
            });

            var time = document.getElementsByName('time-picker')[0];
            var timeP = new dt({
                'ele': time,
                clean: false,
            });

            var modal = new iDialog.Modal({
                template: 'modal-tmp',
                clean: false,
                tapHandler: function(ev) {
                    var target = ev.target;
                    var name = target.getAttribute('name');
                    if (!name) return;
                    switch (name) {
                        case 'toggle-btn':
                            var toggle = base.find('label', target);
                            var flag = (toggle.getAttribute('checked') == 'true') ? false : true;
                            toggle.setAttribute('checked', flag);
                            break;
                        case 'close-modal':
                            base.log.pop();
                            break;
                    }
                }
            });

            var tapHandler = function(ev) {
                var target = ev.target;
                var name = target.getAttribute('name');
                if (!name) return;
                switch (name) {
                    case 'footer-switch':
                        var command = base.find('body');
                        var checked = (command.getAttribute('footer') == 'true') ? false : true;
                        command.setAttribute('footer', checked);
                        target.setAttribute('checked', checked);
                        break;
                    case 'login-btn':
                        var login = new iDialog({
                            type: 'login',
                            title: '登录',
                            clean: false,
                            onSubmit: function(res) {
                                console.log(res);
                            }
                        });
                        login.show();
                        break;
                    case 'modal-btn':
                        modal.show();
                        break;
                    case 'input-btn':
                        var input = new iDialog({
                            title: '选择',
                            type: 'input',
                            clean: true,
                            data: {
                                placeholder: '输入文本',
                                type: 'text',
                            },
                            onOut: function(res) {
                                var pre = base.find('pre', target);
                                if (pre) pre.innerHTML = res;
                            }
                        });
                        input.show();
                        break;
                    case 'confirm-btn':
                        var confirm = new iDialog({
                            title: '选择',
                            type: 'confirm',
                            clean: true,
                            onOut: function(res) {
                                var pre = base.find('pre', target);
                                if (pre) pre.innerHTML = res;
                            }
                        });
                        confirm.show();
                        break;
                    case 'toast-btn':
                        base.toast('Toast');
                        break;
                    case 'menu-btn':
                        menu.show();
                        break;
                    case 'aside-btn':
                        aside.show();
                        break;
                    case 'check-btn':
                        var check = new iDialog({
                            title: '选择',
                            type: 'check',
                            clean: true,
                            data: checkDlgData,
                            onOut: function(res) {
                                var pre = base.find('pre', target);
                                if (pre) pre.innerHTML = res.txtArr.join(',');
                            }
                        });
                        check.show();
                        break;
                    case 'radio-btn':
                        var radio = new iDialog({
                            title: '选择',
                            type: 'radio',
                            clean: true,
                            data: radioDlgData,
                            onOut: function(res) {
                                var pre = base.find('pre', target);
                                if (pre) pre.innerHTML = res.txtArr.join(',');
                            }
                        });
                        radio.show();
                        break;
                    case 'date-picker':
                        dateP.show();
                        break;
                    case 'time-picker':
                        timeP.show();
                        break;
                }
            };
            base.scroll(base.find('content'));
            base.ontap(tapHandler, base.find('main'));
        });
    });
});

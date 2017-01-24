var component = {
    cleartxt: function(obj) {
        obj.parentNode.getElementsByTagName('input')[0].value = '';
    },
    Login: function() {
        if (userInit && userInit.token) {
            wv.href('/site/mylist');
            return;
        }
        var evHandler = function(ev) {
            var target = ev.target;
            switch (target.id) {
                case 'loginDlg':
                    wv.log.pop();
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
                        success: function(data) {
                            wv.toast(lan.t('Login Success'));
                            userInit.token = data.data.token;
                            setTimeout(function() {
                                wv.href('/site/mylist');
                            }, 800);
                        }
                    });
                    break;
                default:
                    return;
            }
        };
        document.body.appendChild(wv.toHTML(this.template.login));
        wv.log.in('loginDlg');
        wv.ontap(evHandler, wv.id('loginDlg'));
    },
    logout: function() {
        wv.confirm(lan.t("Log out?"), callback);

        function callback() {
            wv.ajax({
                url: "/user/logout",
                method: 'GET',
                success: function(data) {
                    wv.toast(lan.t('Logoff Success'));
                    setTimeout(function() {
                        window.location.href = '/site/index'
                    }, 800);
                }
            });
        }
    },
    check: function() {
        window.userInit = wv.dataInit('userInit') || {};
        if (userInit && userInit.token) {
            var img = userInit.userImage;
            userInit.portrait = (img && img.guid) ? wv.getIMG(img, 96) : wv.defHead;
        }
    },
};


define(function() {
    var templates = {
        dialog: "<dialog id='$id$' out='out-bottom'>" +
            "<ul>" +
            "<header><label><i class='fa fa-user'></i></label>" +
            "<h1>$title$</h1></header>" +
            "<content></content>" +
            "</ul>" +
            "<ul>" +
            "<li>" +
            "<button type='positive'>OK</button>" +
            "</li>" +
            "</ul>" +
            "</dialog>",
        checkItem: "<li class='blink-theme' name='check' id='$id$'>" +
            "<em>$value$</em>" +
            "<pre>$secondary$</pre>" +
            "<label type='switch' checked='false'>" +
            "<i class='fa fa-square-o'></i>" +
            "<i class='fa fa-check-square'></i>" +
            "</label>" +
            "</li>",
        radioItem: "<li class='blink-theme' name='radio' id='$id$'>" +
            "<em>$value$</em>" +
            "<pre>$secondary$</pre>" +
            "<label type='switch' checked='false'>" +
            "<i class='fa fa-circle-o'></i>" +
            "<i class='fa fa-dot-circle-o'></i>" +
            "</label>" +
            "</li>",
        inputItem: "<li>" +
            "<input autocomplete='off' value='$value$' type='$type$' placeholder='$placeholder$'>" +
            "<button name='clear'><i class='fa fa-times-circle'></i></button>" +
            "</li>",
        login: "<dialog id='loginDlg' out='out-bottom' >" +
            "<ul>" +
            "<header><label><i class='fa fa-user'></i></label><h1>" + lan.t('Login Weave Mind') + "</h1></header>" +
            "<li>" +
            "<input id='username' placeholder='" + lan.t('Email') + "'/>" +
            "<button name='clear'><i class='fa fa-times-circle'></i></button>" +
            "</li>" +
            "<li>" +
            "<input id='password' placeholder='" + lan.t('Password') + "' type='password'/>" +
            "<button id='forgetPwd'>" + lan.t('Forgot') + "</button>" +
            "</li>" +
            "</ul>" +
            "<ul><button type='positive' id='loginBtn'>" + lan.t('Login') + "</ul>" +
            "<ul><button type='positive' id='signupBtn'>" + lan.t('Signup') + "</ul>" +
            "</dialog>",
        confirm: "<confirm id='$id$' out='out-bottom'>" +
            "<ul>" +
            "<h1>$title$</h1>" +
            "<li>" +
            "<button res='false' type='negtive'>" + lan.t('Cancel') + "</button>" +
            "<button res='true' type='positive'>" + lan.t('Confirm') + "</button>" +
            "</li>" +
            "</ul>" +
            "</confirm>",
    };

    var util = {
        chars: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        randId: function(n) {
            var res = "";
            for (var i = 0; i < n; i++) {
                var id = Math.ceil(Math.random() * 35);
                res += this.chars[id];
            }
            return res;
        },
    };

    var getResult = function(dialog) {
        var list = wv.findAll('label', dialog);
        var txtArr = [],
            idArr = [],
            id, em;
        for (var i = list.length - 1; i >= 0; i--) {
            if (list[i].getAttribute('checked') == 'true') {
                id = list[i].parentNode.id;
                em = wv.find('em', list[i].parentNode).innerHTML;
                idArr.push(id);
                txtArr.push(em);
            };
        }
        return { idArr: idArr, txtArr: txtArr };
    };
    // 用于继承的父类
    var Dialog = new Function();
    Dialog.prototype.template_dialog = templates.dialog;
    Dialog.prototype.init = function(init) {
        this.id = util.randId(4);
        this.title = init.title || this.defaultTitle;
        this.default = init.default || null;
        this.data = init.data || [];
        this.onSubmit = init.onSubmit || function() {};
        var dlg = wv.compose({
            id: this.id,
            title: this.title,
        }, this.template_dialog);
        document.body.appendChild(dlg);
        wv.log.in(this.id);
        var submit = wv.findAll('button', this.id);
        var self = this;
        for (var i = submit.length - 1; i >= 0; i--) {
            wv.ontap(function(ev) {
                self.submit.call(self, self, ev);
            }, submit[i]);
        }
        if (init.data) this.setData(init.data);
        if (init.onCreate) init.onCreate(this);
    };
    Dialog.prototype.setData = function(data) {
        this.data = data;
        var con = wv.tag('content', this.id);
        var list = wv.compose(data, this.template_item);
        con.appendChild(list);
    };
    Dialog.prototype.submit = function(obj) {
        var result = getResult(wv.id(obj.id));
        obj.onSubmit(result);
        wv.log.pop();
    };
    // 多选对话框
    var CheckDialog = function(init) {
        this.init(init);
    };
    CheckDialog.prototype = new Dialog();
    CheckDialog.prototype.defaultTitle = '多选框';
    CheckDialog.prototype.template_item = templates.checkItem;
    // 单选对话框
    var RadioDialog = function(init) {
        this.init(init);
    };
    RadioDialog.prototype = new Dialog();
    RadioDialog.prototype.defaultTitle = '单选框';
    RadioDialog.prototype.template_item = templates.radioItem;

    var InputDialog = function(init) {
        this.init(init);
    };
    InputDialog.prototype = new Dialog();
    InputDialog.prototype.defaultTitle = '输入文本';
    InputDialog.prototype.template_item = templates.inputItem;
    InputDialog.prototype.submit = function(obj) {
        var result = wv.tag('input', wv.id(obj.id)).value;
        obj.onSubmit(result);
        wv.log.pop();
    };
    // 
    var Toast = function(str) {
        var tst = document.createElement('toast');
        tst.innerHTML = str;
        tst.id = util.randId(4);;
        document.body.appendChild(tst);
        setTimeout(function() {
            wv.anim.out(tst, tst, 'out-opacity', 200, wv.clean);
        }, 1500);
    };
    //确认对话框

    var Confirm = function(init) {
        this.init(init);
    };
    Confirm.prototype = new Dialog();
    Confirm.prototype.defaultTitle = '确认';
    Confirm.prototype.template_dialog = templates.confirm;
    Confirm.prototype.submit = function(obj, ev) {
        var res = (ev.target.getAttribute('res') == 'true') ? true : false;
        obj.onSubmit(res);
        wv.log.pop();
    };
    // 监听
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
        var name = target.getAttribute('name');
        if (!name) return;
        switch (name) {
            case 'check':
                var toggle = wv.find('label', target);
                var flag = (toggle.getAttribute('checked') == 'true') ? false : true;
                toggle.setAttribute('checked', flag);
                break;
            case 'radio':
                var list = target.parentNode;
                list = wv.findAll('label', list);
                for (var i = list.length - 1; i >= 0; i--) {
                    list[i].setAttribute('checked', false);
                }
                var toggle = wv.find('label', target);
                var flag = (toggle.getAttribute('checked') == 'true') ? false : true;
                toggle.setAttribute('checked', flag);
                break;
            case 'toggle':
                var toggle = wv.find('label', target);
                var flag = (toggle.getAttribute('checked') == 'true') ? false : true;
                toggle.setAttribute('checked', flag);
                break;
            case 'clear':
                var input = wv.find('input', target.parentNode);
                input.value = '';
                break;
        }

    };
    wv.ontap(tapHandler);

    return {
        CheckDialog: CheckDialog,
        RadioDialog: RadioDialog,
        InputDialog: InputDialog,
        Toast: Toast,
        Confirm: Confirm,
    };
});

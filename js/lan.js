//language
var lan = {
    init: function() {
        window.lan = lan;
        var slan = sessionStorage.lang;
        if (!slan || (slan != 'zh-CN' && slan != 'en')) {
            sessionStorage.lang = document.getElementsByTagName('html')[0].getAttribute('lang');
        }
    },
    setLan: function(input) {
        sessionStorage.lang = input;
        var url = window.location.href.split('?')[0];
        wv.href(url);
        return input;
    },
    clean: function() {
        sessionStorage.removeItem('lang');
        return true;
    },
    t: function(txt) {
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
        'Clear the file cache beyond the storage limit': '超出存储上限，清除文件缓存？',
    }
};
define(function(){
    lan.init();
    return lan;
});

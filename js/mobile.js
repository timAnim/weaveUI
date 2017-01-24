    wv.mt = {
        back: function() {
            if (typeof(iosObj) != 'undefined') {
                iosObj.returnButton();
            } else if (window.history.length == 1) {
                wv.href('/site/wvshare');
            } else {
                window.history.go(-1);
            }
        },
        share: function() {
            if (sessionStorage.isFromApp == 'true') {
                var mindGuid = wv.submitObj.mindGuid || wvFile.guid;
                var url = wv.shareUrl + '/site/mind/' + mindGuid;
                iosObj.mindShare(url + ',' + wvFile.name+','+wvEvnt.view);
            } else {
                wvFile.share();
            }
        },
        output: function(){
            if (sessionStorage.isFromApp == 'true') {
                if (wvEvnt.view==='mind') {
                    var tpc=wv.tag('topic'),
                        pt=parseInt(tpc.style.paddingTop,10),
                        pl=parseInt(tpc.style.paddingLeft,10),
                        scale=wvView.scroll.scale;
                        height=(tpc.clientHeight-pt*2)*scale,
                        width=(tpc.clientWidth-pl*2)*scale;
                    wvView.scroll.scrollTo(-pl*scale,-pt*scale);
                    iosObj.mindFileOutPutPSize(height + ',' + width);
                }else{
                    var tpc=wv.tag('topic'),
                        scale=wvView.scroll.scale;
                        height=tpc.clientHeight*scale,
                        width=tpc.clientWidth*scale;
                    wvView.scroll.scrollTo(0,0);
                    iosObj.mindFileOutPutPSize(height + ',' + width);                    
                }
            } else {
                wvFile.output();
            }
        },
        hrefTo:function(guid){
            if (typeof(iosObj) != 'undefined'){
                iosObj.hrefTo(guid);
            }
        }
    };
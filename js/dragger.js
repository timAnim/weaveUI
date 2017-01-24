//isM是否是移动设备 
//data初始化
//res 拖拽源
//enterObj 
//overObj 
//indi 
var Dragger = {
    origin: { x: 0, y: 0 },
    boundery: [0,0,0,0],
    init: function(data) {
        this.onStart = data.onStart||function(){return};
        this.onDrag = data.onDrag||function(){return};
        this.onLeave = data.onLeave||function(){return};
        this.onMove = data.onMove||function(){return};
        this.onEnter = data.onEnter||function(){return};
        this.onDrop = data.onDrop||function(){return};
        this.onEnd = data.onEnd||function(){return};
        this.isM = (sessionStorage.isMobile == 'true');
        this.dropEles = [];
        this.outer = data.outer;
        for (var i = data.dropEles.length - 1; i >= 0; i--) Dragger.dropEles.push(data.dropEles[i]);
        if (Dragger.isM) {
            document.addEventListener('touchend', Dragger.dragEnd, false);
        }else{
            document.addEventListener("mouseup", Dragger.dragEnd, false);
            document.addEventListener("pointerup", Dragger.dragEnd, false);
        }
    },
    dragStart: function(ev) {
        Dragger.res = ev.target;
        Dragger.origin.x = ev.center.x;
        Dragger.origin.y = ev.center.y;
        Dragger.boundery=[
            Dragger.outer.getBoundingClientRect().top,
            Dragger.outer.getBoundingClientRect().right,
            Dragger.outer.getBoundingClientRect().bottom,
            Dragger.outer.getBoundingClientRect().left
        ];
        if (Dragger.isM) {
            document.body.addEvent("touchmove", Dragger.dragMove, false);
        }else{
            document.body.addEvent("pointermove", Dragger.dragMove, false);
            document.body.addEvent("mousemove", Dragger.dragMove, false);
        }
        document.body.appendChild(wv.toHTML('<div id="indicator"></div>'));
        Dragger.indi = wv.id('indicator');
        Dragger.indi.setAttribute('style', 'left:' + Dragger.origin.x + 'px;top:' + Dragger.origin.y + 'px');
        if (Dragger.onStart && Dragger.res) {
            Dragger.onStart(Dragger.res);
        }
    },
    dragMove: function(ev) {
        ev.preventDefault();
        var boundL, boundT, boundR, boundB,
            posX = ev.changedTouches ? ev.changedTouches[0].clientX : ev.clientX,
            posY = ev.changedTouches ? ev.changedTouches[0].clientY : ev.clientY,
            isentered = false,
            isnew = false,
            dropEles=Dragger.dropEles;

        var top=Dragger.outer.scrollTop;
        var left=Dragger.outer.scrollLeft;
        if (posY <= (Dragger.boundery[0] + 10)) {
            top-=10;
            Dragger.outer.scrollTop=+ top;
        } else if (posY >= (Dragger.boundery[2] - 10)) {
            top+=10;
            Dragger.outer.scrollTop=+ top;
        }

        if (posX <= (Dragger.boundery[3] + 10)) {
            left-=10;
            Dragger.outer.scrollLeft=+ left;
        } else if (posX >= (Dragger.boundery[1] - 10)) {
            left+=10;
            Dragger.outer.scrollLeft=+ left;
        }

        Dragger.indi.setAttribute('style', 'left:' + posX + 'px;top:' + posY + 'px');
        for (var n = dropEles.length - 1; n >= 0; n--) {
            boundL = dropEles[n].getBoundingClientRect().left;
            boundT = dropEles[n].getBoundingClientRect().top;
            boundR = dropEles[n].getBoundingClientRect().right;
            boundB = dropEles[n].getBoundingClientRect().bottom;
            if (posX < boundR && posX > boundL && posY > boundT && posY < boundB) {
                isentered = true;
                Dragger.overObj = dropEles[n];
                if (Dragger.enterObj != Dragger.overObj) isnew = true;
            }
        }
        if (isentered) {
            if (isnew) {
                Dragger.onEnter(Dragger.overObj);
                if (Dragger.enterObj) {
                    Dragger.onLeave(Dragger.enterObj);
                }
            }
            Dragger.enterObj = Dragger.overObj;
        } else {
            if (Dragger.enterObj) {
                Dragger.onLeave(Dragger.enterObj);
            }
            Dragger.enterObj = Dragger.overObj = null;
        }
        Dragger.onMove(Dragger.overObj, posX, posY);
    },
    dragEnd: function(ev) {
        if (Dragger.enterObj) {
            Dragger.onDrop(Dragger.res, Dragger.enterObj);
        }
        if (Dragger.res) {
            Dragger.onEnd(Dragger.res);
        }
        Dragger.dragCancel();
    },
    dragCancel: function() {
        if (Dragger.isM) {
            document.body.removeEventListener("touchmove", Dragger.dragMove, false);
        }else{
            document.body.removeEventListener("pointermove", Dragger.dragMove, false);
            document.body.removeEventListener("mousemove", Dragger.dragMove, false);
        }
        wv.clean('indicator');
        Dragger.res = null;
        Dragger.overObj = Dragger.enterObj = null;
    },
};

var Resizer = {
    isM: false,
    delta: 0,
    origin: 0,
    seed: 0,
    data: {},
    init: function(data) {
        Resizer.isM = (sessionStorage.isMobile == 'true');
        Resizer.data = data;
        if (Resizer.isM) {
            Resizer.data.handler.addEvent("touchstart", Resizer.start, false);
        }else{
            Resizer.data.handler.addEvent("pointerdown", Resizer.start, false);
            Resizer.data.handler.addEvent("mousedown", Resizer.start, false);
        }
    },
    start: function(ev) {
        Resizer.origin = ev.changedTouches ? ev.changedTouches[0].clientX : ev.clientX;
        if (Resizer.isM) {
            document.addEventListener('touchmove' , Resizer.move, false);
        }else{
            document.addEventListener('pointermove', Resizer.move, false);
            document.addEventListener('mousemove', Resizer.move, false);
        }
        if (Resizer.isM) {
            document.addEventListener('touchend', Resizer.end, false);
        }else{
            document.addEventListener('pointerup', Resizer.end, false);
            document.addEventListener('mouseup', Resizer.end, false);
        }
        if (Resizer.data.onStart) { Resizer.data.onStart(Resizer.origin); }
        if (Resizer.seed === 0) {
            Resizer.seed = setInterval(function() { Resizer.data.onDrag(Resizer.delta); }, 16);
        }
    },
    move: function(ev) {
        Resizer.delta = (ev.changedTouches ? ev.changedTouches[0].clientX : ev.clientX);
        Resizer.delta-= Resizer.origin;
    },
    end: function(ev) {
        if (Resizer.data.onEnd) {
            Resizer.data.onEnd(Resizer.delta);
        }
        document.removeEventListener('touchmove', Resizer.move);
        document.removeEventListener('mousemove', Resizer.move);
        document.removeEventListener('pointermove', Resizer.move);
        document.removeEventListener('touchend', Resizer.end);
        document.removeEventListener('pointerup', Resizer.end);
        document.removeEventListener('mouseup', Resizer.end);
        clearInterval(Resizer.seed);
        Resizer.seed = 0;
    }
};

var Pincher ={
    init: function(callback) {
        var panHdl = new Hammer.Manager(callback.ele), 
        canvas=callback.ele;
        panHdl.scale=callback.initScale;
        panHdl.add(new Hammer.Tap());
        panHdl.add(new Hammer.Press());
        var list,ticking,initDistance,distance,scale,seed,
        onPinchStart=function(ev) {
            list=ev.touchList||ev.touches;
            if (!list||list.length!==2) return;
            useScroll(false);
            ev.preventDefault();
            initDistance=Pincher.distance(list[0],list[1]);
            if (callback.onPinchStart) callback.onPinchStart(list);
            seed=setInterval(function() {
                if (callback.onPinch)callback.onPinch(scale);
            },50);
        },
        onPinch=function(ev) {
            list=ev.touchList||ev.touches;
            if (!list||list.length!==2) return;
            distance=Pincher.distance(list[0],list[1]);
            scale=distance/initDistance;
            ev.preventDefault();
            // window.requestAnimFrame(function(){
            //     ticking = false;
            //     if (callback.onPinch)callback.onPinch(scale);
            // });
            // ticking = true;
        },
        onPinchEnd=function(ev){
            useScroll(true);
            if (callback.onPinchEnd)callback.onPinchEnd(ev);
            clearInterval(seed);

        },
        onPan=function(ev){
            if (!panHdl.usePan) return;
            switch(ev.type){
                case "panstart":
                    if (callback.onPanStart)callback.onPanStart(ev);
                break;
                case "panmove":
                    ticking=false;
                    ev.preventDefault();
                    window.requestAnimFrame(function(){
                        ticking = false;
                        if (callback.onPan)callback.onPan(ev);
                    });
                    ticking = true;
                break;
                case "panend":
                    if (callback.onPanEnd)callback.onPanEnd(callback.scale);
                break;

            }
        },
        onScroll=function(e){
            e.preventDefault();
            if ( 'deltaY' in e ) {
                if (e.deltaMode === 1) {
                    wheelDeltaY = -e.deltaY * 20;
                } else {
                    wheelDeltaY = -e.deltaY;
                }
            } else if ( 'wheelDeltaY' in e ) {
                wheelDeltaY = e.wheelDeltaY / 120 * 20;
            } else if ( 'wheelDelta' in e ) {
                wheelDeltaY = e.wheelDelta / 120 * 20;
            } else if ( 'detail' in e ) {
                wheelDeltaY = -e.detail / 3 * 20;
            } else {
                return;
            }
            if (callback.onScroll)callback.onScroll(wheelDeltaY,e);
        },
        onTap=function(ev){
            if (callback.onTap)callback.onTap(ev);
        },
        onPress=function(ev){
            if (callback.onPress)callback.onPress(ev);
        },
        zoom=function(scale){
            canvas.children[0].style.transform='scale('+scale+')';
        },
        scrollTo=function(tgt,px,py,adjustX,adjustY){
            var tp=wv.util.getTop(tgt);
            var left=wv.util.getLeft(tgt);
            adjustX=adjustX||0;
            adjustY=adjustY||tgt.clientHeight/2;
            canvas.scrollTop= tp*panHdl.scale + adjustY - py ;
            canvas.scrollLeft= left*panHdl.scale + adjustX - px;
        },
        destroy=function() {
            canvas.removeEventListener("touchstart", onPinchStart);
            canvas.removeEventListener("touchmove", onPinch);
            canvas.removeEventListener("touchend", onPinchEnd);
        },
        useScroll=function(useScroll){
            if (sessionStorage.isMobile=='true'){
                if (useScroll) canvas.style.overflow='auto';
                else canvas.style.overflow='hidden';
            }
            panHdl.usePan=useScroll;
        },
        usePan=true;

        panHdl.on('tap',onTap);
        panHdl.on('press',onPress);
        Hammer.on(canvas, 'wheel mousewheel DOMMouseScroll', onScroll);
        canvas.addEventListener("touchstart", onPinchStart, false);
        canvas.addEventListener("touchmove", onPinch, false);
        canvas.addEventListener("touchend", onPinchEnd, false);
        if (sessionStorage.isMobile=='false'){
            panHdl.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));
            panHdl.on('panstart panmove panend',onPan);
        } else{
            canvas.style.overflow='auto';
            canvas.style.touchAction='auto';
        }
        panHdl.zoom=zoom;
        panHdl.useScroll=useScroll;
        panHdl.usePan=usePan;
        panHdl.zoom(panHdl.scale);
        panHdl.scrollTo=scrollTo;
        panHdl.destroy=destroy;
        return panHdl;
    },
    distance:function(a,b){
        var x=Math.pow((a.clientX-b.clientX),2);
        var y=Math.pow((a.clientY-b.clientY),2);
        return Math.sqrt(x,y);
    },
};
// window.Dragger = Dragger;
// window.Resizer = Resizer;
// window.Pincher = Pincher;

export{Dragger,Resizer,Pincher};
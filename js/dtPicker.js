define(['base'], function(base) {
    var animEle = function(ele, anim, time) {
        var clName = ele.className;
        ele.className += ' ' + anim;
        setTimeout(function() {
            ele.className = clName;
        }, time);
    };
    var _dtDlgStr =
        "<mask name='mask' id='$id$' out='opacity'>" +
        "<dialog id='_dtPicker' state='hour' clean='$clean$'>" +
        "<div class='_dtIndicator'>" +
        "<a class='_indiH' name='indiH'>20</a>" +
        "<span>:</span>" +
        "<a class='_indiM' name='indiM'>20</a>" +
        "</div>" +
        "<div class='_dtPlate'>" +
        "<div class='_dtClock'>" +
        "<div class='_hHand'></div>" +
        "<div class='_mHand'></div>" +
        "<div class='_numContainer'></div>" +
        "</div>" +
        "</div>" +
        "<li class='_dtBtns'>" +
        "<button class='_dtNeg' type='neg' name='neg'>取消</button>" +
        "<button class='_dtPos' type='pos' name='pos'>确认</button>" +
        "</li>" +
        "</dialog>  " +
        "</mask>";
    var timePicker = function(init) {
        this.id = base.randId(4);
        this.clean = init.clean;
        // 初始值
        var _init = init.value;
        var now = new Date();
        this.slctT = (_init) ? _init.split(':') : [now.getHours(), now.getMinutes()];
        document.body.appendChild(base.compose(this, _dtDlgStr));
        this.outer = base.id(this.id);
        this.outer.style.display = 'none';
        this.state = 'hour';
        this.hhand = base.find('._hHand');
        this.mhand = base.find('._mHand');
        this.indiH = base.find('._indiH');
        this.indiM = base.find('._indiM');

        var self = this;
        base.ontap(function(ev) {
            self.evHandler.call(self, ev);
        }, self.outer);
        this.hourInit();
        this.setTime();
    };
    timePicker.prototype.show = function() {
        base.log.in(this.outer);
    };
    timePicker.prototype.out = function() {
        base.log.pop();
    }
    timePicker.prototype.evHandler = function(ev) {
        var target = ev.target;
        var name = target.getAttribute('name');
        var picker = base.find('dialog', this.outer);
        var self = this;
        if (!name) return;
        switch (name) {
            case 'pos':
                this.slctT[0] = parseInt(this.slctT[0], 10);
                this.slctT[1] = parseInt(this.slctT[1], 10);
                if (this.slctT[0] < 10) this.slctT[0] = '0' + this.slctT[0];
                if (this.slctT[1] < 10) this.slctT[1] = '0' + this.slctT[1];
                this.result = this.slctT[0] + ':' + this.slctT[1];
                this.out();
                break;
            case 'neg':
            case 'mask':
                this.out();
                break;
            case 'indiH':
                animEle(this.indiH, '_popAnim', 200);
                picker.setAttribute('state', 'hour');
                setTimeout(function() {
                    self.hourInit();
                    self.setTime();
                }, 600);
                break;
            case 'indiM':
                animEle(this.indiM, '_popAnim', 200);
                picker.setAttribute('state', 'minute');
                setTimeout(function() {
                    self.minuteInit();
                    self.setTime();
                }, 600);
                break;
            case 'time':
                if (this.state == 'hour') {
                    this.slctT[0] = parseInt(target.innerHTML, 10);
                } else {
                    target.setAttribute('selected', 'selected');
                    this.slctT[1] = parseInt(target.innerHTML, 10);
                }
                this.setTime();
                break;
        }

    };
    timePicker.prototype.setTime = function() {
        var hour = this.slctT[0];
        var min = this.slctT[1];
        this.indiH.innerHTML = (hour < 10) ? ('0' + hour) : hour;
        this.indiM.innerHTML = (min < 10) ? ('0' + min) : min;

        if (hour < 13 && hour != 0) {
            this.hhand.style.transform = 'rotate(' + hour * 30 + 'deg)';
            this.hhand.style.height = '104px';
        } else {
            this.hhand.style.transform = 'rotate(' + ((hour - 12) * 30 + 10) + 'deg)';
            this.hhand.style.height = '64px';
        }
        this.mhand.style.transform = 'rotate(' + min / 5 * 30 + 'deg)';

        var a = this.outer.getElementsByTagName('a'),
            s = this.state,
            v,
            i;
        for (i = a.length - 1; i >= 0; i--) {
            a[i].removeAttribute('selected');
            v = parseInt(a[i].innerHTML, 10);
            if ((s == 'hour' && v == hour) || (s == 'minute' && v == min)) {
                a[i].setAttribute('selected', 'selected');
            }
        }
    };
    timePicker.prototype.hourInit = function() {
        var numCon = base.find('._numContainer');
        this.state = 'hour';
        if (typeof(this.hourPlate) == 'undefined') {
            var newCon = document.createElement('div');
            newCon.className = '_numContainer';
            var r = 115.2;
            var x, y, i, j;
            for (i = 1; i <= 12; i++) {
                var hour = document.createElement('a');
                hour.setAttribute('name', 'time');
                hour.innerHTML = i;
                if (i == 0) {
                    x = 0;
                    y = 1;
                } else {
                    x = Math.sin(Math.PI / 6 * i);
                    y = Math.cos(Math.PI / 6 * i);
                }
                newCon.appendChild(hour);
                hour.style.left = x * r + r * 1.25 + 'px';
                hour.style.top = r * 1.25 - y * r + 'px';
            }
            r = r * 0.65;
            for (j = 13; j <= 24; j++) {
                var hour = document.createElement('a');
                hour.setAttribute('name', 'time');
                hour.innerHTML = j;
                if (j == 24) { hour.innerHTML = '00' };
                m = j - 12;
                m = m + 0.35;
                x = Math.sin(Math.PI / 6 * m);
                y = Math.cos(Math.PI / 6 * m);
                newCon.appendChild(hour);
                hour.style.left = x * r + r * 1.9237 + 'px';
                hour.style.top = r * 1.9237 - y * r + 'px';
                this.hourPlate = newCon;
            }
        }
        numCon.parentNode.replaceChild(this.hourPlate, numCon);
    };
    timePicker.prototype.minuteInit = function() {
        var numCon = base.find('._numContainer');
        this.state = 'minute';
        if (typeof(this.minPlate) == 'undefined') {
            var newCon = document.createElement('div');
            newCon.className = '_numContainer';

            var r = 115.2;
            var x, y, i, j;
            for (i = 11; i >= 0; i--) {
                var min = document.createElement('a');
                min.setAttribute('name', 'time');
                if (i * 5 < 10) {
                    min.innerHTML = '0' + i * 5;
                } else {
                    min.innerHTML = i * 5;
                }
                x = Math.sin(Math.PI / 6 * i);
                y = Math.cos(Math.PI / 6 * i);
                newCon.appendChild(min);
                min.style.left = x * r + r * 1.25 + 'px';
                min.style.top = r * 1.25 - y * r + 'px';
            }
            r = r * 0.875;
            for (i = 59; i >= 0; i--) {
                var min = document.createElement('a');
                min.setAttribute('name', 'time');
                if (i % 5 !== 0) {
                    min.innerHTML = i;
                    min.className = '_indiDot';
                    x = Math.sin(Math.PI / 30 * i);
                    y = Math.cos(Math.PI / 30 * i);
                    newCon.appendChild(min);
                    min.style.left = x * r + r * 1.429 + 'px';
                    min.style.top = r * 1.429 - y * r + 'px';
                }
            }
            this.minPlate = newCon;
        }
        numCon.parentNode.replaceChild(this.minPlate, numCon);
    }
    return timePicker;
});

/*
全局变量dtPicker
配置范围 dtPicker.config={'maxDate':maxDate,'minDate':minDate};
回调(可重写) dtPicker.destroy=function(dlg,value){};
*/
define(function(){
	var dtPicker={
		'config':{'maxDate':null,'minDate':null},
		dtInitTimePicker:function(ele){
			var dlgId=dtPicker.appendTimeDlg(ele);
			var dlg=document.getElementById(dlgId);
			ele.onclick=function(ev){
				ele.blur();
				ev.preventDefault();
				dtPicker.onShow(dlg);
			};
			ele.style='cursor:pointer';
		},
		dtInitDatePicker:function(ele){
			var dlgId=dtPicker.appendDateDlg(ele);
			var dlg=document.getElementById(dlgId);
			ele.onclick=function(ev){
				ele.blur();
				ev.preventDefault();
				dtPicker.onShow(dlg);
			};
			ele.style='cursor:pointer';
		},
		appendDateDlg:function(ele){
			var dtCalendar,dtPickerDlg,ctrlDr,dtContainer,calendar,posBtn,negBtn,addYBtn,minYBtn,addMBtn,minMBtn,nowArr,slctArr;
			var resId='dtp_'+Math.floor(Math.random()*10000);
			var _dtDlgStr=
			"<div class='_dtContainer' id='"+resId+"' out='opacity'>"+
				"<div class='_dtPicker'>"+
					"<div class='_dtIndicator'>"+
						"<div class='_indiYear'>2015</div>"+
						"<div>"+
							"<span class='_indiMonth'>06</span><span>月</span>"+
						"</div>"+
						"<div class='_indiCtrl'>"+
							"<a class='_addYear'>&gt;</a>"+
							"<a class='_minYear'>&lt;</a>"+
							"<a class='_addMonth'>&gt;</a>"+
							"<a class='_minMonth'>&lt;</a>"+
						"</div>"+
					"</div>"+
					"<div class='_dtTitle'>"+
						"<span>日</span>"+
						"<span>一</span>"+
						"<span>二</span>"+
						"<span>三</span>"+
						"<span>四</span>"+
						"<span>五</span>"+
						"<span>六</span>"+
					"</div>"+
					"<div class='_dtPlate'></div>"+
					"<div class='_dtBtns'>"+
						"<span class='_dtNeg'>取消</span>"+
						"<span class='_dtPos'>确认</span>"+
					"</div>"+
				"</div>"+
			"</div>";
			var dtDlg=document.createElement("div");
			document.body.appendChild(dtDlg);
			dtDlg.outerHTML=_dtDlgStr;

			dtContainer=document.getElementById(resId);
			dtPickerDlg=dtContainer.getElementsByClassName('_dtPicker')[0];
			posBtn=dtContainer.getElementsByClassName('_dtPos')[0];
			negBtn=dtContainer.getElementsByClassName('_dtNeg')[0];
			addYBtn=dtContainer.getElementsByClassName('_addYear')[0];
			minYBtn=dtContainer.getElementsByClassName('_minYear')[0];
			addMBtn=dtContainer.getElementsByClassName('_addMonth')[0];
			minMBtn=dtContainer.getElementsByClassName('_minMonth')[0];
			dtCalendar=dtContainer.getElementsByClassName('_dtPlate')[0];

			// dtPicker.animEle(dtPickerDlg,'_downAnim',200);
			dtPickerDlg.onclick=prevent;
			dtContainer.onclick=negFn;
			posBtn.onclick=posFn;
			negBtn.onclick=negFn;
			addYBtn.onclick=addYear;
			minYBtn.onclick=minYear;
			addMBtn.onclick=addMonth;
			minMBtn.onclick=minMonth;
			
			maxDate=dtPicker.config.maxDate||null;
			minDate=dtPicker.config.minDate||null;
			if (maxDate) {maxDate=new Date(maxDate);}
			if (minDate) {minDate=new Date(minDate);}

			nowArr=[];
			slctArr=[];
			var nowDt=new Date();
			nowArr[0]=nowDt.getFullYear();
			nowArr[1]=nowDt.getMonth();
			nowArr[2]=nowDt.getDate();
			if (ele.value) {
				var inputDt=new Date(ele.value);
				slctArr[0]=inputDt.getFullYear();
				slctArr[1]=inputDt.getMonth();
				slctArr[2]=inputDt.getDate();
			}else{
				slctArr[0]=nowArr[0];
				slctArr[1]=nowArr[1];
				slctArr[2]=nowArr[2];
			}
			layDate(slctArr);
			return resId;

			function addYear(){
				slctArr[0]++;
				ctrlDr="isAdd";
				layDate(slctArr);
			}

			function minYear(){
				slctArr[0]--;
				ctrlDr="isMin";
				layDate(slctArr);
			}

			function addMonth(){
				slctArr[1]++;
				if (slctArr[1]>11) {
					slctArr[1]=0;
					slctArr[0]++;
				}
				ctrlDr="isAdd";
				layDate(slctArr);
			}

			function minMonth(){
				slctArr[1]--;
				if (slctArr[1]<0) {
					slctArr[1]=11;
					slctArr[0]--;
				}
				ctrlDr="isMin";
				layDate(slctArr);
			}

			function prevent(ev){
				ev.preventDefault();
				ev.stopPropagation();
			}

			function posFn(){
				var result=slctArr[0]+'-'+(slctArr[1]+1)+'-'+slctArr[2];
				ele.value=result;
				var dlg=dtContainer;
				dtPicker.destroy(dlg,result);
			}

			function negFn(){
				var dlg=dtContainer;
				dtPicker.destroy(dlg,null);
			}

			function selectDay(){
				slctArr[2]=parseInt(this.innerHTML,10);
				var dateArr=dtCalendar.getElementsByTagName('a');
				for (var i = dateArr.length - 1; i >= 0; i--) {
					dateArr[i].removeAttribute('select');
				}
				this.setAttribute('select','select');
			}

			function checkDate(layDtArr){
				var layDt=new Date(layDtArr[0]+'-'+(layDtArr[1]+1)+'-'+layDtArr[2]);
				// 最小天数
				if (minDate&&layDt<minDate) {
					layDtArr[0]=minDate.getFullYear();
					layDtArr[1]=minDate.getMonth();
					layDtArr[2]=minDate.getDate();
					minYBtn.style.display='none';
					minMBtn.style.display='none';
					if (ctrlDr=='isMin') {
						dtPicker.animEle(dtPickerDlg,'_denyAnim',200);
					}
				}else if(minDate&&layDtArr[0]==minDate.getFullYear()&&layDtArr[1]>=(minDate.getMonth()-1)) {
					minYBtn.style.display='none';
					minMBtn.style.display='block';
				}else{
					minYBtn.style.display='block';
					minMBtn.style.display='block';
				}

				// 最大日期判断
				if (maxDate&&layDt>maxDate) {
					layDtArr[0]=maxDate.getFullYear();
					layDtArr[1]=maxDate.getMonth();
					layDtArr[2]=maxDate.getDate();
					addYBtn.style.display='none';
					addMBtn.style.display='none';
					if (ctrlDr=='isAdd') {
						dtPicker.animEle(dtPickerDlg,'_denyAnim',200);
					}
				}else if(maxDate&&layDtArr[0]==maxDate.getFullYear()&&layDtArr[1]<=maxDate.getMonth()) {
					addYBtn.style.display='none';
					addMBtn.style.display='block';
				}else{
					addYBtn.style.display='block';
					addMBtn.style.display='block';
				}
				ctrlDr='static';
			}

			function layDate(layDtArr){
				checkDate(layDtArr);
				//加日期
				var dateDlgCon=document.getElementById(resId);
				var str;
				dtCalendar=dtContainer.getElementsByClassName('_dtPlate')[0];
				dtCalendar.innerHTML='';
				var a1,a2,a3;
				for (var i = 1; i < 32; i++) {
					// 设置范围
					if (i<10) {a3='0'+i;}else{a3=i;}
					if ((layDtArr[1]+1)<10) {a2='0'+(layDtArr[1]+1);}else{a2=layDtArr[1]+1;}
					str=layDtArr[0]+'-'+a2+'-'+a3;
					var parsDate=parseISO8601(str);
					// 判断有效
					if (parsDate.getDate()==i) {
						var _aTags=document.createElement('a');
						if ((minDate&&parsDate<minDate)||(maxDate&&parsDate>maxDate)) {
							_aTags.setAttribute('disabled','disabled');
						}else{
							_aTags.onclick=selectDay;
						}
						// 设置今天
						if (layDtArr[0]==nowArr[0]&&layDtArr[1]==nowArr[1]&&nowArr[2]==i) {
							_aTags.setAttribute('today','today');
						}
						// 设置选择
						if (layDtArr[0]==slctArr[0]&&layDtArr[1]==slctArr[1]&&i==slctArr[2]) {
							_aTags.setAttribute('select','select');
						}
						_aTags.innerHTML=i;
						_aTags.setAttribute('alt',i);
						dtCalendar.appendChild(_aTags);
						// 设置第一天
						if (i==1) {
							_aTags.style.marginLeft=parsDate.getDay()*14.28+'%';
						}
						// 通用样式
						// _aTags.style.animationDelay=i/50+'s';
					}
				}
				dateDlgCon.getElementsByClassName('_indiYear')[0].innerHTML=slctArr[0];
				dateDlgCon.getElementsByClassName('_indiMonth')[0].innerHTML=slctArr[1]+1;
			}

			function parseISO8601(dateStringInRange) {
			    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,date = new Date(NaN),month,parts = isoExp.exec(dateStringInRange);
			    if(parts) {
				      month = +parts[2];
				      date.setFullYear(parts[1], month - 1, parts[3]);
				      if(month != date.getMonth() + 1) {
				        	date.setTime(NaN);
				      }
			    }
			    return date;
		  	}
		},
		appendTimeDlg:function(ele){
			var slctT,picker,hhand,mhand,state,indiH,indiM,dtContainer;
			var resId='dtp_'+Math.floor(Math.random()*10000);
			// 初始化
			var _dtDlgStr=
			"<div class='_dtContainer' id='"+resId+"' out='opacity'>"+
				"<div class='_dtPicker' state='hour'>"+
					"<div class='_dtIndicator'>"+
						"<a class='_indiH'>20</a>"+
						"<span>:</span>"+
						"<a class='_indiM'>20</a>"+
					"</div>"+
					"<div class='_dtPlate'>"+
						"<div class='_dtClock'>"+
							"<div class='_hHand'></div>"+
							"<div class='_mHand'></div>"+
							"<div class='_numContainer'></div>"+
						"</div>"+
					"</div>"+
					"<div class='_dtBtns'>"+
						"<span class='_dtNeg'>取消</span>"+
						"<span class='_dtPos'>确认</span>"+
					"</div>"+
				"</div>	"+
			"</div>";
			var dtDlg=document.createElement("div");
			document.body.appendChild(dtDlg);
			dtDlg.outerHTML=_dtDlgStr;
			dtContainer=document.getElementById(resId);
			numCon=dtContainer.getElementsByClassName('_numContainer')[0];
			picker=dtContainer.getElementsByClassName('_dtPicker')[0];
			hhand=dtContainer.getElementsByClassName('_hHand')[0];
			mhand=dtContainer.getElementsByClassName('_mHand')[0];
			indiH=dtContainer.getElementsByClassName('_indiH')[0];
			indiM=dtContainer.getElementsByClassName('_indiM')[0];

			// 加监听
			dtContainer.getElementsByClassName('_dtPos')[0].onclick=posFn;
			dtContainer.getElementsByClassName('_dtNeg')[0].onclick=negFn;
			dtContainer.onclick=negFn;
			picker.onclick=prevent;

			indiH.onclick=function(){
				setTime();
				setSelect();
				// dtPicker.animEle(indiH,'_popAnim',200);
				picker.setAttribute('state','hour');
				setTimeout(function(){
						hourInit();
				},600);
			};
			indiM.onclick=function(){
				setTime();
				setSelect();
				// dtPicker.animEle(indiM,'_popAnim',200);
				picker.setAttribute('state','minute');
				setTimeout(function(){
					minuteInit();
				},600);
			};
			// 表盘
			var _init=ele.value;
			if (_init&&_init.split(':').length>1) {
				slctT=[_init.split(':')[0],_init.split(':')[1]];
			}else{
				var now=new Date();
				slctT=[now.getHours(),now.getMinutes()];
			}
			setTime();
			setSelect();
			hourInit();
			return resId;

			function hourInit(){
				var numCon=dtContainer.getElementsByClassName('_numContainer')[0];
				state='hour';
				var newCon=document.createElement('div');
				newCon.className='_numContainer';
				var r=115.2;
				var x,y,i,j;
				for (i=1; i <=12; i++) {
					var hour=document.createElement('a');
					hour.onclick=changeT;
					hour.innerHTML=i;
					if (i==0) {
						x=0;
						y=1;
					}else{
						x=Math.sin(Math.PI/6*i);
						y=Math.cos(Math.PI/6*i);
					}
					newCon.appendChild(hour);
					hour.style.left=x*r+r*1.25+'px';
					hour.style.top=r*1.25-y*r+'px';
				}
				r=r*0.65;
				for (j=13; j <=24; j++) {
					var hour=document.createElement('a');
					hour.onclick=changeT;
					hour.innerHTML=j;
					if (j==24) {hour.innerHTML='00'};
					m=j-12;
					m=m+0.35;
					x=Math.sin(Math.PI/6*m);
					y=Math.cos(Math.PI/6*m);
					newCon.appendChild(hour);
					hour.style.left=x*r+r*1.9237+'px';
					hour.style.top=r*1.9237-y*r+'px';
				}
				numCon.parentNode.replaceChild(newCon,numCon);
				setSelect();
			}

			function minuteInit(){
				var numCon=dtContainer.getElementsByClassName('_numContainer')[0];
				state='minute';
				var newCon=document.createElement('div');
				newCon.className='_numContainer';

				var r=115.2;
				var x,y,i,j;
				for (i=11; i>=0; i--) {
					var min=document.createElement('a');
					min.onclick=changeT;
					if (i*5<10){
						min.innerHTML='0'+i*5;
					}else{
						min.innerHTML=i*5;
					}
					x=Math.sin(Math.PI/6*i);
					y=Math.cos(Math.PI/6*i);
					newCon.appendChild(min);
					min.style.left=x*r+r*1.25+'px';
					min.style.top=r*1.25-y*r+'px';
				}
				r=r*0.875;
				for (i=59; i>=0; i--) {
					var min=document.createElement('a');
					min.onclick=changeT;
					if (i%5!==0){
						min.innerHTML=i;
						min.className='_indiDot';
						x=Math.sin(Math.PI/30*i);
						y=Math.cos(Math.PI/30*i);
						newCon.appendChild(min);
						min.style.left=x*r+r*1.429+'px';
						min.style.top=r*1.429-y*r+'px';
					}
				}
				numCon.parentNode.replaceChild(newCon,numCon);
							setSelect();
			}

			function changeT(){
				if (state=='hour') {
					slctT[0]=parseInt(this.innerHTML,10);
					setTime();
					setSelect();
					setTimeout(function(){
						minuteInit();
						setSelect();
						// dtPicker.animEle(indiM,'_popAnim',200);
						picker.setAttribute('state','minute');
					},600);
				}else{
					this.setAttribute('selected','selected');
					slctT[1]=parseInt(this.innerHTML,10);
					setTime();
					setSelect();
				}
			}

			function setTime(){
				var hour=parseInt(slctT[0],10);
				var min=parseInt(slctT[1],10);
				indiH.innerHTML=hour;
				indiM.innerHTML=min;
				if (hour<10) indiH.innerHTML='0'+hour;
				if (min<10) indiM.innerHTML='0'+min;

				if (hour<13&&hour!=0) {
					hhand.style.transform='rotate('+hour*30+'deg)';
					hhand.style.height='104px';
				}else{
					hhand.style.transform='rotate('+((hour-12)*30+10)+'deg)';
					hhand.style.height='64px';
				}
				mhand.style.transform='rotate('+min/5*30+'deg)';
			}

			function setSelect(){
				var numCon=dtContainer.getElementsByClassName('_numContainer')[0];
				var as=numCon.getElementsByTagName('a');
				var indiHvar=parseInt(indiH.innerHTML,10);
				var indiMvar=parseInt(indiM.innerHTML,10);
				for (var i = as.length - 1; i >= 0; i--) {
					as[i].removeAttribute('selected');
					var value=parseInt(as[i].innerHTML,10);
					if (state=='hour') {
						if (value==indiHvar) {
							as[i].setAttribute('selected','selected');
						}
					}else{
						if (value==indiMvar) {
							as[i].setAttribute('selected','selected');
						}			
					}
				}
			}

			function prevent(ev){
				ev.preventDefault();
				ev.stopPropagation();
			}

			function posFn(){
				slctT[0]=parseInt(slctT[0],10);
				slctT[1]=parseInt(slctT[1],10);
				if (slctT[0]<10) slctT[0]='0'+slctT[0];
				if (slctT[1]<10) slctT[1]='0'+slctT[1];
				var result=slctT[0]+':'+slctT[1];
				ele.value=result;
				var dlg=document.getElementById(resId);
				dtPicker.destroy(dlg,result);
			}

			function negFn(){
				var dlg=document.getElementById(resId);
				dtPicker.destroy(dlg,null);
			}
		},
		destroy:function(dlg,value){
			if (dlg) {
				dlg.parentNode.removeChild(dlg);
			}
		},
		animEle:function(ele,anim,time){
			var clName=ele.className;
			ele.className+=' '+anim;
			setTimeout(function(){
				ele.className=clName;
			},time);
		},
		onShow:function(dlg){},
	};
	return dtPicker;
});
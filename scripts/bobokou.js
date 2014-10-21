if(!localStorage||!JSON||!window.XMLHttpRequest)
	while(1)alert('快换个靠谱的浏览器吧，不然我就闪个不停');


$=function(win,doc,$){
$=function(i){return doc.getElementById(i)};
$.S=function(i){return doc.querySelectorAll(i)};
$.t=function(p,i){!i&&(i=p)&&(p=doc);return p.getElementsByTagName(i)};
$.c=function(p,c){!c&&(c=p)&&(p=doc);for(var n=' ',e=p.getElementsByTagName('*'),r=[],i=0,j;j=e[i];i++)(n+j.className+n).indexOf(n+c+n)==-1||r.push(j);return r};
$.css=function(p,i){p.style.cssText+=(';'+i)};
$.x=function(i,p,f,e,x){
	//(typeof p=='function')&&(e=f)&&(f=p)&&(p=0);
	if(typeof p=='function'){
		e=f;
		f=p;
		p=0;
	}
	(x=new XMLHttpRequest()).open(p?'POST':'GET',i,1);
	x.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	if(f||e)x.onreadystatechange=function(){
		if(x.readyState==4)
			((x.status>199&&x.status<301)||x.status==304)?f(x.responseText):e(x.status);
	};
	x.send(p||'');
	return x //.abort()
};
$.j=function(i,f,s,t){s=$.D.m('script'),t='cb'+new Date().valueOf();s.src=i.replace(/\{cb\}/,t);if(f)win[t]=f;$.D.a(s)};
$.swf=function(i){return doc[i]||$(i)};
$.cookie=function(i,v,s){if(typeof v!='undefined'){s=s||31536000;var d=new Date();d.setTime(d.getTime()+s*1000);doc.cookie=i+'='+escape(v)+';expires='+d.toGMTString()}else{var a=doc.cookie.match(new RegExp('(^| )'+i+'=([^;]*)(;|$)'));return a==null?null:unescape(a[2])}};
$.D={
	m:function(i){return doc.createElement(i)},
	d:function(o){return o.parentNode.removeChild(o)},
	a:function(p,i){!i&&(i=p)&&(p=doc.body);return p.appendChild(i)},
	b:function(p,i){p.insertBefore(i,p.childNodes[0])}
};
$.b=$.t('html')[0].className=self.ActiveXObject?'IE':self.chrome?'Cr':self.mozPaintCount>~[]?'FF':self.opera?'Op':self.chrome&&!!self.WebKitPoint?'Sa':'';

	//if(window.screen.colorDepth==32) return;
return $
}(window,document);

var
fm={
	stepTime:0,
	audio:new Audio(),
	h1:$.t('h1')[0],
	p:$.t('p')[0],
	img:$.t('img')[0],
	plan:$('plan'),
	w662938:$('w662938'),
	IMG_XHR:0,
	btn:{
		pause:$('pause'),
		next:$('next'),
		w4587:$('w4587'),
		del:$('del')
	},
	o:'',
	play:function(i){
		_popstate_run=true;
		location.hash='#!'+i.id;
		_popstate_run=false;

		document.title=fm.h1.innerHTML=i.title;

		if(i.album=='')
			fm.p.innerHTML=i.singer;
		else
			fm.p.innerHTML='「'+i.album.replace(/(^\s*)|(\s*$)/g,'')+'」'+i.singer.replace(/(^\s*)|(\s*$)/g,'');


		fm.audio.src=i.url.replace(/v4/,'v4');
		fm.audio.play();


		fm.btn.pause.className='pause';

		fm.step();

		if(i.w4587==1)fm.btn.w4587.className='a';

		setTimeout(function(){
			fm.w662938.className='';
		},2000);


		if(window.webkitNotifications){
			var popup=window.webkitNotifications.createNotification('http://ww4.sinaimg.cn/large/a15b4afejw1eahgnsurm9g2028028mwz.gif',i.title,fm.p.innerHTML,[{title:"下一首",iconUrl:"/img/Next-notification.png"},{title:"不再播放",iconUrl:"/img/Trash-notification.png"}]);
			popup.onshow=function(){
				setTimeout(function(){popup.cancel()},7000);
			}
			popup.onclick=function(){
				window.focus();
				this.cancel();
			}
			popup.replaceId='fm_tip';
			//console.log(popup);
			popup.show();
		}

		/*根据歌曲名称从虾米获取信息 设置封面*/
		if(fm.IMG_XHR)
			fm.IMG_XHR.abort();

		fm.IMG_XHR=$.x('http://moe.re/Fm/GetCover?id='+encodeURIComponent(i.id),
			function(i){

				if(i!='0' && i!=''){
					/*i=JSON.parse(i);
					if(i.songs){
						fm.o=i.songs[0].logo;
						$('bg').src=*/
					$('icon').href=fm.img.src=i;
				}else{
					$('icon').href=fm.img.src='/Public/320.png';
				}
			},function(){
				$('icon').href=fm.img.src='/Public/320.png';
			}
		);
		//$('icon').href=fm.img.src='/Public/320.png';
	},pause:function(){
		if(fm.audio.paused){
			fm.audio.play();
			fm.btn.pause.className='pause';
		}else{
			fm.audio.pause();
			fm.btn.pause.className='play';
		}
	},next:function(i){
		fm.h1.innerHTML='歌曲载入中...';
		fm.p.innerHTML='loading...';
		fm.w662938.className='hide';
		fm.img.className='';
		fm.btn.w4587.className='';
		$('w41948').className='';

		clearTimeout(fm.stepTime);
		$.css(fm.plan,'width:0%;');


		$.x(((i+'').match(/[0-9]{1,}/)?'/Fm/PlayId?id='+i+'&_r=':'/Fm?_r=')+Math.random(),
			function(i){
				i=JSON.parse(i);
				fm.play(i)
			},function(i){
				console.log(i);
			}
		);



		if(window.webkitNotifications)
			window.webkitNotifications.requestPermission();
	},w4587:function(){
		if(fm.btn.w4587.className!='a'){
			$.x('/Home/addMusic/id/'+location.hash.substring(2),function(i){
				if(i=='0')
					alert('尚未登陆无法保存收藏信息OAQ');
				else if(i=='-1')
					alert('当前歌单已满，请打开歌单设置切换默认歌单');
				else
					fm.btn.w4587.className='a';
			});
		}else{
			$.x('/Fm/delMusic/id/'+location.hash.substring(2),function(i){
				if(i=='0')
					alert('尚未登陆无法取消收藏信息OAQ');
				else
					fm.btn.w4587.className='';
			});
		}
	},del:function(){
		$.x('/Fm/addBan/id/'+location.hash.substring(2),function(i){
			if(i=='0')
				alert('尚未登陆无法删除曲目OAQ');
			else{
				if(fm.btn.w4587.className=='a')
					if(!confirm('这首歌是您喜欢过的曲子，真的要删除吗? OAQ'))
						return;
					else
						fm.w4587();

				$('w41948').className='hide';
				fm.audio.pause();
				setTimeout(fm.next,1000);
			}
		});
	},step:function(){
		fm.plan.style.width=fm.audio.currentTime/fm.audio.duration*100+'%';
		fm.stepTime=setTimeout(fm.step,100);
	},user:{
		info:function(){
			$.x('/Home/ajaxUser?_r='+Math.random(),function(i){
				//console.log(1);
				i=JSON.parse(i);
				//console.log(i);
				if(i.uid==0){//未登录
					$('user').innerHTML='';
				}else{
					$('user').innerHTML='<a href="/Music/user/id/'+i.uid+'" class="user_link" target="_blank"><img src="/Home/showFace/id/'+i.uid+'">'+i.name+'</a><a href="/Home/logout" class="close" title="退出">×</a>';
				}
			});
		},login:function(){

		}
	},share:function(){

	}
};
fm.img.onerror=function(){
	$('icon').href=this.src=fm.o;
}
/*


/Home/showFace/id/头像ID

localStorage.getItem("b");

/Fm/PlayId?id=2
*/

fm.btn.pause.onclick=fm.pause;
fm.btn.next.onclick=fm.next;
fm.btn.w4587.onclick=fm.w4587;
fm.btn.del.onclick=fm.del;


fm.img.onload=function(){
	this.className='show';
};

fm.audio.addEventListener('ended',fm.next,false);


var _popstate_run=true;
window.onpopstate=function(){
	if(!_popstate_run&&location.hash.substring(1,2)=='!'){
		fm.next(location.hash.substring(2));
	}
	_popstate_run=false;
};

if(location.hash.substring(1,7)=='!song/')
	location.hash='#!'+location.hash.substring(7);
else if(location.hash.substring(1,2)=='!')
	fm.next(location.hash.substring(2));
else
	fm.next();


setTimeout(function(){
	fm.user.info()
},2000);







var bg=function(){
	if(window.XMLHttpRequest&&window.FileReader){
		var
		_html=$.t('html')[0],
		img=$.D.m('img'),
		bgImage=localStorage.getItem('bgImage');

		img.id='bg';





		if(bgImage)
			setTimeout(function(){img.src=bgImage;},100);
		else{
			if(!$.cookie('setiBg')){
				bgImage='http://ww1.sinaimg.cn/large/a15b4afejw1eae0bh7vtnj21400p0tf5.jpg';
				localStorage.setItem('bgImage',bgImage);
				img.src=bgImage;
				$.cookie('setiBg',1);
			}
		}

		$.D.a($('bg_b'),img);

		var exitBtn=$.D.m('button');
		exitBtn.id='exitBtn';
		exitBtn.innerHTML='关闭背景';
		exitBtn.title='拖拽图像到窗口即可设置背景';

		exitBtn.onclick=function(){
			localStorage.removeItem('bgImage');
			$.t('body')[0].className=exitBtn.className=img.className='';

			setTimeout(function(){img.src=''},1000);
			window.onresize=null;
		}
		$.D.a(exitBtn);

		_html.ondragenter=function(e){_html.className='drop';};
		_html.ondragleave=function(e){_html.className='';};
		_html.ondragover=function(e){e.preventDefault();_html.className='';};
		_html.ondrop=function(e){
			e.preventDefault();
			console.log(e.dataTransfer.files);
			handleFile(e.dataTransfer.files);
		};
		var handleFile=function(files){
			if(files.length==0)return;
			var file=files[0];

			if(file.type.indexOf('image')!=0){
				alert('这不是一个图像或音频！');
				return;
			}
			if(!file.size>2000000){
				alert('请上传小于2MB大小的图像！');
				return;
			}

			var reader=new FileReader();
			reader.onload=(function(aImg){return function(e){
				aImg.src=e.target.result;
				localStorage.setItem('bgImage',e.target.result);
			};})(img);
			reader.readAsDataURL(file);
		}

		img.onload=function(){
			$.css(img,'width:auto;height:auto;margin:0');
			if(_html.offsetWidth/_html.offsetHeight>img.offsetWidth/img.offsetHeight){//高多出去一块
				$.css(img,'width:100%;margin-top:'+Math.round((_html.offsetHeight-(img.offsetHeight/(img.offsetWidth/_html.offsetWidth)))/2)+'px;');
			}else{
				$.css(img,'height:100%;margin-left:'+Math.round((_html.offsetWidth-(img.offsetWidth/(img.offsetHeight/_html.offsetHeight)))/2)+'px;');
			}
			exitBtn.className=img.className='show';
			$.t('body')[0].className='black';
			window.onresize=img.onload;
		};
	}
}();

console.log(' ╮(￣▽￣)╭ 只是一个二次元音乐电台 @卜卜口 于 2013年秋');
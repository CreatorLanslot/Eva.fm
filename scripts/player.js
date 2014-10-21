$(document).ready(function() {

	// 全局变量
	var eva = $('audio')[0],
		sourcelist = $('#eva source');
	var volumeBar = $('.volumeBar'),
		volumePro = $('.volumePro'),
		timeBar = $('.timePro'),
		slider = $('.volumeBar .slider');
	var	currentSrcIndex = 0,
		currentSrc = "";

	// 音量控制
	HTMLAudioElement.prototype.changeVolumeTo = function (volume) {
		this.volume = volume;
		volumePro.css('width', volume*100 + "%");
		// slider.css('left', volume*100 - 6 + "px");
	}
	volumeBar.mousedown(function(event) {
		var posX = event.clientX,
			targetLeft = $(this).offset().left,
			volume = (posX - targetLeft)/100;
		volume > 1 && (volume = 1);
		volume < 0 && (volume = 0);
		eva.changeVolumeTo(volume);
	});

	// 播放 暂停 下一首
	var playPause = $('#play-pause');
	playPause.addClass('pause');
	playPause.click(function() {
		if (eva.paused) {
			eva.play();
			playPause.removeClass('play').addClass('pause');
		} else {
			eva.pause();
			playPause.removeClass('pause').addClass('play');
		}
	});
	$('.next').click(function() {
		var music = $('#eva source').length;
		++ currentSrcIndex > music - 1 && (currentSrcIndex = 0);
		currentSrc = $('#eva source').eq(currentSrcIndex).prop('src');
		// console.log(currentSrc)
		eva.src = currentSrc;
		eva.play();
	});

	// audio元素事件绑定
	$(eva).bind('loadedmetadata', function(event) {
		var title = sourcelist.eq(currentSrcIndex).attr('title');
		$('#eva .title').text(title);
		// console.log($('.cd').style.background)
	});
	$(eva).bind('timeupdate', function() {
		var duration = this.duration;
		var curTime = this.currentTime;
		var percentage = curTime/duration * 100;
		$('.timePro').css('width', percentage + '%');
	});
	$(eva).bind('ended', function() {
		$('.next').triggerHandler('click');
	});

	$(eva).trigger('loadedmetadata');

	// 拖拽图像设置背景
	$('.cd').bind('drop', function(event) {
		event.preventDefault();
		var dropImg = event.dataTransfer.files;
		handleFile(dropImg);
	});
	var handleFile = function (file) {
		if(files.length == 0)return;
			var file = files[0];

		if(file.type.indexOf('image')!=0){
			alert('这不是一个图像或音频！');
			return;
		}
		if(!file.size>2000000){
			alert('请上传小于2MB大小的图像！');
			return;
		}

		var reader = new FileReader();
		reader.onload = (function (aImg) {
			return function (event) {
				aImg.src = event.target.result;
				localStorage.setItem('bgImage', event.target.result);
			};
		})(img);
		reader.readAsDataURL(file);
	}
});
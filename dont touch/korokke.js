'use strict';
//数字割りゲーム var1.0

//ブラウザ判定
var base_href = $('base').attr('href');
var userAgent = window.navigator.userAgent.toLowerCase(); //データ取得
if (userAgent.indexOf('msie') != -1 ||
	userAgent.indexOf('trident') != -1) {
	window.location.href = base_href + "IE互換用/数字割りゲーム.IE.html"
	document.getElementById("use")
		.innerHTML = '使っているブラウザ：<i class="fab fa-internet-explorer faa-wrench animated-hover"></i>Internet Explorer<br>動作を保証しません IE互換のhtmlを開いてください';
} else if (userAgent.indexOf('edge') != -1 || userAgent.indexOf('edg') != -1) {
	document.getElementById("use")
		.innerHTML = '使っているブラウザ：<i class="fab fa-edge faa-wrench animated-hover"></i>Edge<br>動作確認しているブラウザです';
} else if (userAgent.indexOf('opr') != -1) {
	document.getElementById("use")
		.innerHTML = '使っているブラウザ：<i class="fab fa-opera faa-wrench animated-hover"></i>Opera<br>動作確認はしていませんが 使用上動くはずのブラウザです';
} else if (userAgent.indexOf('chrome') != -1) {
	document.getElementById("use")
		.innerHTML = '使っているブラウザ：<i class="fab fa-chrome faa-wrench animated-hover"></i>Chrome or Vivaldi<br>動作確認しているブラウザです';
} else if (userAgent.indexOf('safari') != -1) {
	document.getElementById("use")
		.innerHTML = '使っているブラウザ：<i class="fab fa-safari faa-wrench animated-hover"></i>Safari<br>動作確認はしていませんが 使用上動くはずのブラウザです';
} else if (userAgent.indexOf('firefox') != -1) {
	document.getElementById("use")
		.innerHTML = '使っているブラウザ：<i class="fab fa-firefox-browser faa-wrench animated-hover"></i>FireFox<br>動作確認しているブラウザです'
} else {
	document.getElementById("use")
		.innerHTML = '使っているブラウザ：<i class="fab fa-js-square faa-wrench animated-hover"></i>動作未確認のブラウザ<br>動作は保証されません';
}

registerInstallAppEvent(document.getElementById("InstallBtn"));
function registerInstallAppEvent(elem){
  window.addEventListener('beforeinstallprompt', function(event){
	console.log("beforeinstallprompt: ", event);
	event.preventDefault();
	elem.promptEvent = event;
	elem.style.display = "block";
	return false;
  });
  function installApp() {
	if(elem.promptEvent){
	  elem.promptEvent.prompt();
	  elem.promptEvent.userChoice.then(function(choice){
		elem.style.display = "none";
		elem.promptEvent = null;
	  });
	}
  }
  elem.addEventListener("click", installApp);
}/*インストール用のボタン*/

$('.table b')
	.on('click', function() {
		$(this)
			.next()
			.next()
			.toggleClass('hidden');
	})

jQuery(function() {
	var appear = false;
	var pagetop = $('#page_top');
	$(window)
		.scroll(function() {
			if ($(this)
				.scrollTop() > 150) { //100pxスクロールしたら
				if (appear == false) {
					appear = true;
					pagetop.stop()
						.animate({
							'bottom': '10px' //下から10pxの位置に
						}, 300); //0.3秒かけて現れる
				}
			} else if (appear) {
				appear = false;
				pagetop.stop()
					.animate({
						'bottom': '-70px' //下から-50pxの位置に
					}, 300); //0.3秒かけて隠れる
			}
		});
	pagetop.click(function() {
		$('body, html')
			.animate({
				scrollTop: 0
			}, 250); //0.25秒かけてトップへ戻る
		return false;
	});
});

if (location.protocol != "file:") {
	Notification.requestPermission()
};


zisseki() //実績関連
window.onload = function() {
	document.body.oncontextmenu = function() {
		return false;
	} //右クリック制限(開発者モードによるコード変換の妨害用)
	document.getElementById("timer_sec")
		.textContent = 20 * 10; //時間設定
	var time = timer_sec.textContent //上記と同様
	document.getElementById("area1")
		.style.opacity = '0';
	document.getElementById("debugmodes1")
		.style.visibility = 'hidden' //デバックモード時に表示する文字
	document.getElementById("p1")
		.style.display = "block"; //スタートボタン設定
	debugmodetext.style.display = "none";
	document.getElementById("debugmodes3")
		.style.display = "block"
	document.getElementById("reset")
		.style.display = "none"; //リセット設定
	document.getElementById("debugmode")
		.textContent = "nomalmode";
	document.getElementById("list")
		.style.visibility = 'hidden'
	document.getElementById("started")
		.textContent = 0;
	document.getElementById("clearmode")
		.textContent = "notclear"; //クリア判定
	document.getElementById("cleartime1")
		.textContent = "+0.00"; //追加時間設定
	cleartime1.style.opacity = 0;
	cleartime2.style.opacity = 0;
	document.getElementById("humans_number")
		.textContent = 4; //残機設定
	document.getElementById("humans_max")
		.textContent = 4;
	color(); //残基による文字色適用
	if (localStorage.zisseki1 == 1) {
		zisseki1.textContent = "クリア"
	} else {
		zisseki1.textContent = "未達成"
	}
	if (localStorage.zisseki2 == 1) {
		zisseki2.textContent = "クリア"
	} else {
		zisseki2.textContent = "未達成"
	}
	if (localStorage.zisseki3 == 1) {
		zisseki3.textContent = "クリア"
	} else {
		zisseki3.textContent = "未達成"
	}
	if (localStorage.test <= 99) {
		document.getElementById("test")
			.textContent = `BESTLEVEL: ${localStorage.test}`
	} else {
		document.getElementById("test")
			.textContent = `BESTLEVEL:+99`
	}
	document.getElementById("zanki")
		.textContent = 0;
	const spinner = document.getElementById('loading');
	spinner.classList.add('loaded');
	document.title = '数字割りゲーム varβ1.2'
	if (localStorage.HERD == 1 && localStorage.Play == 1) {
		herd.checked = true
	} else {
		localStorage.HERD = 0;
		localStorage.Play == 1
	}

	//ボリューム設定（ミュートあり）
	var hoge = document.getElementById("volume");
	// 選択した際のイベント取得
	hoge.addEventListener('input', () => {
		var value = document.getElementById("volume")
			.value
		c(value)
		localStorage.Volume = value;
	});
};

function c(value) {
	if (value == 0) {
		bgm1.muted = true;
		bgm2.muted = true;
		bgm3.muted = true;
		bgm4.muted = true;
		document.getElementById("volumetext")
			.textContent = "ミュート";
		volumepng.className = 'fas fa-volume-mute';
	} else {
		bgm1.muted = false;
		bgm2.muted = false;
		bgm3.muted = false;
		bgm4.muted = false;
		bgm1.volume = Math.ceil(value) / 100;
		bgm2.volume = Math.ceil(value) / 100;
		bgm3.volume = Math.ceil(value) / 100;
		bgm4.volume = Math.ceil(value) / 100;
		document.getElementById("volumetext")
			.textContent = `${value}%`;
		if (value < 50) {
			volumepng.className = 'fas fa-volume-down';
		} else {
			volumepng.className = 'fas fa-volume-up';
		}
	}
}

//小ネタ関係
function mouseover() {
	document.getElementById("area1")
		.style.opacity = '1';
};

function mouseout() {
	document.getElementById("area1")
		.style.opacity = '0';
};

//debugの記録を残すtestのリセットボタンの動作
function s() {
	localStorage.test = 0;
	document.getElementById("test")
		.textContent = `BESTLEVEL: ${localStorage.test}`;
}
//テスト中の実績機能
function f() {
	localStorage.setItem("zisseki1", "0")
	localStorage.setItem("zisseki2", "0")
	localStorage.setItem("zisseki3", "0")
	zisseki1.textContent = "未達成"
	zisseki2.textContent = "未達成"
	zisseki3.textContent = "未達成"
}

//「bestlevel」、テスト中の動作
if (typeof localStorage.test === 'undefined') {
	localStorage.setItem("test", 1)
}
//実績、テスト中の動作
if (typeof localStorage.zisseki1 === 'undefined') {
	localStorage.setItem("zisseki1", 0)
}
if (typeof localStorage.zisseki2 === 'undefined') {
	localStorage.setItem("zisseki2", 0)
}
if (typeof localStorage.zisseki3 === 'undefined') {
	localStorage.setItem("zisseki3", 0)
}
if (typeof localStorage.HERD === 'undefined') {
	localStorage.setItem("HERD", 0)
}
if (typeof localStorage.Play === 'undefined') {
	localStorage.setItem("Play", 0)
} else if (localStorage.Play == 0) {
	herd.disabled = true;
} else {
	herd.disabled = false;
}
if (typeof localStorage.Volume === 'undefined') {
	localStorage.setItem("Volume", 50)
}

//音声適用+再生設定
const btn = document.querySelector("#p1");
const bgm1 = new Audio("dont touch/buzzer.mp3");
const bgm2 = new Audio("dont touch/Answer.mp3");
const bgm3 = new Audio("dont touch/start.mp3");
const bgm4 = new Audio("BGM.mp3"); // bgm
bgm1.volume = 1;
bgm2.volume = 1;
bgm3.volume = 1;
bgm4.volume = 1;
//再生終了後の処理（すべての音声に関して）
btn.addEventListener("click", () => {
	bgm3.play();
	bgm4.play();
});
bgm1.addEventListener("ended", () => {
	bgm1.pause();
	bgm1.currentTime = 0;
});
bgm2.addEventListener("ended", () => {
	bgm2.pause();
	bgm2.currentTime = 0;
});
bgm3.addEventListener("ended", () => {
	bgm3.pause();
	bgm3.currentTime = 0;
});
//BGM今使っていないため動いていません↓
bgm4.addEventListener("ended", () => {
	bgm4.pause();
	bgm4.currentTime = 0;
	bgm4.play();
});
try {
	document.getElementById("volume")
		.value = localStorage.Volume;
	c(localStorage.Volume)
} catch (e) {
	localStorage.Volume = document.getElementById("volume")
		.value
	c(localStorage.Volume)
	document.getElementById("volumetext")
		.textContent = "50%";
	volumepng.className = 'fas fa-volume-up';
}

//デバックモードによる時間変更・残基変更
function debug() {
	document.getElementById("timer_sec")
		.textContent = +example1.value * 100
	document.getElementById("humans_number")
		.textContent = +example2.value
}

//リセットボタン機構
function p2() {
	scrollTo(0, 0);
	korokke.textContent = "??";
	document.getElementById("time")
		.textContent = "0.20.0";
	number_number.textContent = "??";
	humans_number.textContent = 4;
	humans_max.textContent = 4;
	location.reload();
};

//keyboard入力時に色変更
$('#buttonid1,#buttonid2,#buttonid3,#buttonid4,#buttonid5,#p1,#reset')
	.on('click'
		, function() {
			if (started.textContent == 1) {
				g()
				this.style.backgroundColor = "#999";
			}
		}
	)

//変更した色をもとに戻す

function g() {
	buttonid1.style.backgroundColor = "#333";
	buttonid2.style.backgroundColor = "#333";
	buttonid3.style.backgroundColor = "#333";
	buttonid4.style.backgroundColor = "#333";
	buttonid5.style.backgroundColor = "#333";
	p1.style.backgroundColor = "#333";
	reset.style.backgroundColor = "#333";
}


//キー入力判定
window.addEventListener("keydown", (e) => {
	if (started.textContent == 1) {
		if (e.code === 'KeyW') {
			e.preventDefault();
			g();
			buttonid1.style.backgroundColor = "#999";
			buttonid1.classList.add("active")
			a(2);
		};
		if (e.code === 'KeyE') {
			e.preventDefault();
			g();
			buttonid2.style.backgroundColor = "#999";
			buttonid2.classList.add("active")
			a(3);
		};
		if (e.code === 'KeyA') {
			e.preventDefault();
			g();
			buttonid3.style.backgroundColor = "#999";
			buttonid3.classList.add("active")
			a(5);
		};
		if (e.code === 'KeyS') {
			e.preventDefault();
			g();
			buttonid4.style.backgroundColor = "#999";
			buttonid4.classList.add("active")
			a(7);
		};
		if (e.code === 'KeyD') {
			e.preventDefault();
			g();
			buttonid5.style.backgroundColor = "#999";
			buttonid5.classList.add("active")
			a(11);
		};
	}
	if (event.ctrlKey && e.code == 'KeyR' || e.keyCode == 116) {
		e.preventDefault();
		event.returnValue = false;
		p2()
	};

	if (e.KeyCode == 112 || e.KeyCode == 113 || e.KeyCode == 114 || e.KeyCode == 115 || e.KeyCode == 117 || e.KeyCode == 118 || e.KeyCode == 119 || e.KeyCode == 120 || e.KeyCode == 121 || e.keyCode == 123) {
		e.preventDefault();
		event.returnValue = false;
	};
	if (e.code === 'KeyM') {
		e.preventDefault();
		if (bgm1.muted == false) {
			bgm1.muted = true;
			bgm2.muted = true;
			bgm3.muted = true;
			bgm4.muted = true;
			document.getElementById("volumetext")
				.textContent = "ミュート";
			document.getElementById("volume")
				.value = 0;
			volumepng.className = 'fas fa-volume-mute';
		} else {
			bgm1.muted = false;
			bgm2.muted = false;
			bgm3.muted = false;
			bgm4.muted = false;
			document.getElementById("volumetext")
				.textContent = "50%";
			document.getElementById("volume")
				.value = 50;
			volumepng.className = 'fas fa-volume-up';
		}
		localStorage.Volume = document.getElementById("volume")
			.value;
	};
	if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
		event.preventDefault();
		event.returnValue = false;
		bgm1.muted = false;
		bgm2.muted = false;
		bgm3.muted = false;
		bgm4.muted = false;
		document.getElementById("volume")
			.value++;
		if (document.getElementById("volume")
			.value > 100) {
			document.getElementById("volume")
				.value = 100;
			volumepng.className = 'fas fa-volume-up';
		} else if (document.getElementById("volume").value > 50) {
			volumepng.className = 'fas fa-volume-up';
		} else {
			volumepng.className = 'fas fa-volume-down';
		}
		document.getElementById("volumetext")
			.textContent = `${volume.value}%`;
		bgm1.volume = Math.ceil(volume.value) / 100;
		bgm2.volume = Math.ceil(volume.value) / 100;
		bgm3.volume = Math.ceil(volume.value) / 100;
		bgm4.volume = Math.ceil(volume.value) / 100;
		event.preventDefault();
	};
	if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
		event.preventDefault();
		event.returnValue = false;
		bgm1.muted = false;
		bgm2.muted = false;
		bgm3.muted = false;
		bgm4.muted = false;
		document.getElementById("volume")
			.value--;
		if (volume.value < 1) {;
			bgm1.muted = true;
			bgm2.muted = true;
			bgm3.muted = true;
			bgm4.muted = true;
			document.getElementById("volumetext")
				.textContent = "ミュート";
			document.getElementById("volume")
				.value = 0
			volumepng.className = 'fas fa-volume-mute';
		} else {
			document.getElementById("volumetext")
				.textContent = `${volume.value}%`;
			bgm1.volume = Math.ceil(volume.value) / 100;
			bgm2.volume = Math.ceil(volume.value) / 100;
			bgm3.volume = Math.ceil(volume.value) / 100;
			bgm4.volume = Math.ceil(volume.value) / 100;
			if (document.getElementById("volume").value > 50) {
				volumepng.className = 'fas fa-volume-up';
			} else {
				volumepng.className = 'fas fa-volume-down';
			}
		}
		localStorage.Volume = document.getElementById("volume")
			.value;
		event.preventDefault();
	};
	//以下デバックモードON,OFF表示設定
	if (event.ctrlKey && event.altKey && e.code == 'KeyB') {
		if (debugmode.textContent == "nomalmode") {
			var pw1;
			var pw2;
			pw1 = prompt("1つ目のパスワードを入力して下さい。", "");
			if (pw1 != null) {
				pw2 = prompt("入力完了\n2つ目のパスワードを入力して下さい。", "");
			}
			document.body.oncontextmenu = function() {
				return true;
			}
		} else {
			var pw1 = String.fromCharCode(75, 111, 114, 111, 107, 107, 101, 51, 52, 55);
			var pw2 = String.fromCharCode(107, 97, 50, 51, 49, 54, 54);
			document.body.oncontextmenu = function() {
				return false;
			}
		}
		if (pw1 == String.fromCharCode(75, 111, 114, 111, 107, 107, 101, 51, 52, 55) && pw2 == String.fromCharCode(107, 97, 50, 51, 49, 54, 54)) {
			e.preventDefault();
			if (debugmode.textContent == "nomalmode") {
				document.getElementById("debugmode")
					.textContent = "debugmode"
			} else {
				document.getElementById("debugmode")
					.textContent = "nomalmode"
			} //デバックモードの文字表示

			if (document.getElementById("debugmodes1")
				.style.visibility == 'visible') {
				document.getElementById("debugmodes1")
					.style.visibility = 'hidden';
			} else {
				document.getElementById("debugmodes1")
					.style.visibility = 'visible';
			}; //上記と同様
			const debugmodetext = document.getElementById("debugmodetext");
			if (debugmodetext.style.display == "block") {
				// noneで非表示
				debugmodetext.style.display = "none";
			} else {
				// blockで表示
				debugmodetext.style.display = "block";
			};
		} else {
			if (pw1 !== null && pw2 !== null) {
				alert("1 or 2 password is incorrect")
			} else {
				alert("1 or 2 password is not null")
			}
		};
	};
	if (e.code === 'Space') {
		event.preventDefault();
		event.returnValue = false;
		scrollBy(0, -window.innerHeight);
		window.scrollTo({
			top: 0
			, behavior: 'smooth'
		});
		if (started.textContent == 0) {
			bgm3.play();
			bgm4.play();
			start(timer_sec.textContent)
		} //スペースキーで開始する設定(event.preventDefaultでスペースによるページスクロールを止めている。)
		else {
			p2();
		};
	}; //上記と同様
	return false
}); //Spacekeyの入力されたときの動作

window.addEventListener("keyup", (e) => {
	if (e.code === 'KeyW' || e.code === 'KeyE' || e.code === 'KeyA' || e.code === 'KeyS' || e.code === 'KeyD') {
		buttonid1.classList.remove("active");
		buttonid2.classList.remove("active");
		buttonid3.classList.remove("active");
		buttonid4.classList.remove("active");
		buttonid5.classList.remove("active");
	}
})

function zisseki() {
	if (localStorage.zisseki1 == 1) {
		zisseki1.textContent = "クリア"
	} else {
		zisseki1.textContent = "未達成"
	}
	if (localStorage.zisseki2 == 1) {
		zisseki2.textContent = "クリア"
	} else {
		zisseki2.textContent = "未達成"
	}
	if (localStorage.zisseki3 == 1) {
		zisseki3.textContent = "クリア"
	} else {
		zisseki3.textContent = "未達成"
	}
}
zisseki() //実績関連

//開始ボタン設定
function start(time) {
	scrollTo(0, 10);
	zisseki()
	if (herd.checked) {
		humans_number.style.color = 'red';
		document.getElementById("timer_sec")
			.textContent = 10 * 10; //時間設定
		var time = timer_sec.textContent //上記と同様
		document.getElementById("humans_number")
			.textContent = 1; //残機設定
		document.getElementById("humans_max")
			.textContent = 2
		localStorage.HERD = 1;
		herd.disabled = true;
	} else {
		localStorage.HERD = 0;
		herd.disabled = true;
		document.getElementById("humans_max")
			.textContent = humans_number.textContent;
	}
	color()
	if (localStorage.zisseki1 == 0) {
		localStorage.zisseki1 = 1;
		zisseki();
		if (Notification.permission === 'granted') {
			navigator.serviceWorker.ready.then(registration => {
				registration.active.postMessage('初めてのプレイ');
			});
		}
	}
	started.textContent = 1;
	const p1 = document.getElementById("p1");
	if (p1.style.display == "block") {
		// noneで非表示
		p1.style.display = "none";
	} else {
		// blockで表示
		p1.style.display = "block";
	};
	const reset = document.getElementById("reset");
	if (reset.style.display == "none") {
		// noneで非表示
		reset.style.display = "block";
	} else {
		// blockで表示
		reset.style.display = "none";
	};
	timmer(time);
	document.getElementById("korokke")
		.textContent = kihonn(1);
	scrollTo(0, 0);
};

//数字決め機構
function kihonn(number) {
	var note = [];
	var two = 0;
	var three = 0;
	var five = 0;
	var seven = 0;
	var eleven = 0;
	const elements = [2, 3, 5, 7, 11]; //element変数=掛け合わせる元
	var Suuzi = 1;
	document.getElementById("number_number")
		.textContent = number;
	//elements変数同士で掛け合わせている
	if (number >= 35) {
		number = 35
	}
	number = Math.floor(number / 2) + 1
	for (var i = 0; i < number; i++) {
		var rand = Math.floor(Math.random() * 5);
		Suuzi = Suuzi * elements[rand];
		note[i] = rand
	};
	//答えの確認用
	for (var z = 0; z < note.length; z++) {
		if (note[z] == 0) {
			two++
		} else if (note[z] == 1) {
			three++
		} else if (note[z] == 2) {
			five++
		} else if (note[z] == 3) {
			seven++
		} else if (note[z] == 4) {
			eleven++
		};
	} //乗の一時的な代役(例 2^3 == 2の3乗)
	var selected = `(2^${two})*(3^${three})*(5^${five})*(7^${seven})*(11^${eleven})`
	document.getElementById("lists")
		.textContent = `${Suuzi} = ${selected}`;
	document.getElementById("list")
		.textContent = `${Suuzi}  = ${selected}`;
	return Suuzi;
};

//時間設定
function timmer(time) {
	var time = Number(document.getElementById("timer_sec")
		.textContent)
	var timer_obj = document.getElementById("time");
	if (localStorage.HERD == 1) {
		var timeup = 40
	} else {
		var timeup = 80
	}
	var timer = setInterval(function() {
		//var time = document.getElementById("timer_sec").textContent
		timer_obj.innerHTML = Math.floor(time / 600); //時間を切り捨て（Math.round→Math.floorと書き換えました。）
		timer_obj.innerHTML += ".";
		if ((time % 600) < 100) {
			timer_obj.innerHTML += 0
		}
		timer_obj.innerHTML += Math.floor((time % 600) / 10);
		timer_obj.innerHTML += ".";
		timer_obj.innerHTML += time % 10;
		if (time < 0) {
			if (humans_number.textContent > 1) {
				humans_number.textContent--;
				color();
				document.getElementById("zanki")
					.textContent = 3;
				time = 100;
			} else {
				console.log("test")
				var level = number_number.textContent
				future2();
				clearInterval(timer);
			};
		}
		time--;
		document.getElementById("timer_sec")
			.textContent = time;
			$("#remainingtime2").removeClass("god");
			$("#remainingtime2").removeClass("red");
			$("#remainingtime2").removeClass("yellow");
			$("#remainingtime2").removeClass("lime");
			$("#remainingtime2").removeClass("aqua");
			$("#remainingtime2").removeClass("blue");
			$("#remainingtime2").removeClass("white");
			$("#remainingtime2").removeClass("colorful");
			if(time > 2400){
				if (localStorage.zisseki2 == 0) {
					localStorage.zisseki2 = 1;
					zisseki();
					if (Notification.permission === 'granted') {
						navigator.serviceWorker.ready.then(registration => {
							registration.active.postMessage('時間の亡者');
						});
					}
				}
				korokke.className = 'colorful';
				timer_obj.className = 'colorful';
				remainingtime1.className = 'colorful';
				$("#remainingtime2").addClass("colorful");

			}else if (time > 1200 && time <= 2400) {
				if (localStorage.zisseki2 == 0) {
					localStorage.zisseki2 = 1;
					zisseki();
					if (Notification.permission === 'granted') {
						navigator.serviceWorker.ready.then(registration => {
							registration.active.postMessage('時間の亡者');
						});
					}
				}
				timer_obj.className = 'god';
				korokke.className = 'god';
				remainingtime1.className = 'god';
				$("#remainingtime2").addClass("god");
			} else if (time > 159 && time <= 1200) {
					timer_obj.className = 'white';
					korokke.className = 'white';
					remainingtime1.className = 'white';
					$("#remainingtime2").addClass("white");
				} else if (time <= 159 && time > 129) {
						korokke.className = 'blue';
						timer_obj.className = 'blue';
						remainingtime1.className = 'blue';
						$("#remainingtime2").addClass("blue");
					} else if (time <= 129 && time > 99) {
							korokke.className = 'aqua';
							timer_obj.className = 'aqua';
							remainingtime1.className = 'aqua';
							$("#remainingtime2").addClass("aqua");
						} else if (time <= 99 && time > 69) {
								korokke.className = 'lime';
								timer_obj.className = 'lime';
								remainingtime1.className = 'lime';
								$("#remainingtime2").addClass("lime");
							} else if (time <= 69 && time > 39) {
									korokke.className = 'yellow';
									timer_obj.className = 'yellow';
									remainingtime1.className = 'yellow';
									$("#remainingtime2").addClass("yellow");
								} else if (time <= 39) {
										korokke.className = 'red';
										timer_obj.className = 'red';
										remainingtime1.className = 'red';
										$("#remainingtime2").addClass("red");
		}; //時間ごとに文字の色を変える設定
		if (debugmode.textContent == "debugmode") {
			var level = number_number.textContent
			var s = level * 10 + Math.floor(timer_sec.textContent * 0.004) + humans_number.textContent * 10;
			var levels = Lank(s, 0)
			document.getElementById("mozi")
				.textContent = `Lank: ${levels}`;
		}
		return time;
	}, 100);
	setInterval(function() {
		if (clearmode.textContent == "clear") {
			time = time + Math.floor(number_number.textContent * timeup / 10 * Math.pow(10, 2)) / Math.pow(10, 2); //追加時間計算部分+追加時間適用のもの
			document.getElementById("timer_sec")
				.textContent = time;
			document.getElementById("clearmode")
				.textContent = "notclear";
			cleartime1.style.opacity = 1;
			cleartime2.style.opacity = 1;
			cleartime1.textContent = "+" + Math.floor(number_number.textContent * timeup / 100 * Math.pow(10, 2)) / Math.pow(10
				, 2); //描画用の設定
			if (typeof toumei !== 'undefined') {
				clearInterval(toumei)
			}
			setTimeout(function() {
					cleartime1.style.opacity = 0;
					cleartime2.style.opacity = 0;
			}, 1000)
			//タイマー時間追加機能{level(関数number_number)*1.2を小数点第2位で切り捨てした数字を追加}
		}
	}, 20);
};

//Suuziを割る&buttonの設定
function a(mozi) {
	if (started.textContent == 1) {
		var zanki = document.getElementById("zanki")
			.textContent
		var number = document.getElementById("number_number")
			.textContent;
		//難易度取得
		if (korokke.textContent != 1) {
			var Suuzi = korokke.textContent / mozi;
		} else {
			var Suuzi = korokke.textContent;
		}
		//korokke引数を取得（kazu変数に代入）
		document.getElementById("Suuzicopy")
			.textContent = korokke.textContent;
		//kazu変数をmozi変数で割る
		document.getElementById("korokke")
			.textContent = Suuzi;
		//korokke引数をSuuziに置き換える
		if (localStorage.HERD == 1) {
			if (number >= 20) {
				var zanki1 = 12
				var zanki2 = 2
			} else {
				var zanki1 = 8
				var zanki2 = 2
			}
		} else {
			if (number >= 20) {
				var zanki1 = 7
				var zanki2 = Number(document.getElementById("humans_max")
					.textContent)
			} else {
				var zanki1 = 4
				var zanki2 = Number(document.getElementById("humans_max")
					.textContent)
			}
		}
		var z = number * 1000 + Math.floor(timer_sec.textContent * 0.04) + humans_number.textContent * 1000
		if (z <= 999999) {
			document.getElementById("Score")
				.innerHTML = `Score:<span>${z}</span>`;
			$("#Score span").css("fontSize", "21px");
		} else {
			document.getElementById("Score")
				.innerHTML = "Score:<span>+999999</span>";
			$("#Score span").css({
				"fontSize": "24px"
				, "color": "red"
			});
		}
		if (Suuzi == 1) {
			number++;
			color()
			bgm2.play();
			//音の設定2(参照先answer.mp3(bgm2))
			document.getElementById("clearmode")
				.textContent = "clear";
			if (number == 10 && humans_number.textContent >= 4 && localStorage.zisseki3 == 0) {
				localStorage.zisseki3 = 1;
				zisseki();
				if (Notification.permission === 'granted') {
					navigator.serviceWorker.ready.then(registration => {
						registration.active.postMessage('初心者脱却');
					});
				}
			}
			if (number % 15 == 0) {
				humans_max.textContent = Number(humans_max.textContent) + 1;
				humans_number.textContent = Number(humans_number.textContent) + 1;
			}
			if (zanki > 1) {
				zanki--
				human.textContent = `残り:${zanki}turn`;
			} else {
				if (zanki == 1) {
					zanki = 0;
					humans_number.textContent++;
					color();

					if (humans_number.textContent < zanki2) {
						zanki = zanki1;
						human.textContent = `残り:${zanki}turn`;
					} else {
						human.textContent = "";
					}
				} else {
					if (humans_number.textContent < zanki2) {
						zanki = zanki1--;
						human.textContent = `残り:${zanki}turn`;
					}
				}
			}
			//難易度(number)を増やす(上げている)
			document.getElementById("korokke")
				.textContent = kihonn(number);
		} else {
			if (!Number.isInteger(Suuzi)) {
				if (humans_number.textContent >= zanki2) {
					var zanki = zanki1;
					human.textContent = `残り:${zanki}turn`;
					future1();
				} else {
					human.textContent = `残り:${zanki}turn`;
					future1();
				}
				human.textContent = `残り:${zanki}turn`;
			};
		};
	};
	document.getElementById("zanki")
		.textContent = zanki;
};

//押し間違えによるgemeover
function future1() {
	var number = number_number.textContent;
	bgm1.play();
	document.getElementById("listed")
		.textContent = lists.textContent;
	var levelCount = "0";
	var level = number_number.textContent;
	var s = level * 10 + Math.floor(timer_sec.textContent * 0.0004) + humans_number.textContent * 10;
	levelCount = Lank(s, levelCount);
	if (humans_number.textContent > 1) {
		if (confirm(`GAMEOVER\n答えを間違えました。\n残り回数の数は${humans_number.textContent}です。\n残り回数を消耗して一つ前に戻しますか？、またははじめから再挑戦しますか？\n戻る=OK 再挑戦する=キャンセル`)) {
			humans_number.textContent--;
			color()
			korokke.textContent = Suuzicopy.textContent;
		} else {
			if (number > Number(localStorage.test)) {
				alert(`記録は LEVEL: ${number_number.textContent}\n最高記録更新！！ ${localStorage.test} → ${number}\nLank: ${levelCount}\nこの問題の答えは  ${listed.textContent}でした。`)
				localStorage.test = number;
				if (localStorage.test <= 99) {
					document.getElementById("test")
						.textContent = `BESTLEVEL: ${localStorage.test}`
				} else {
					document.getElementById("test")
						.textContent = `BESTLEVEL:+99`
				}
			} else {
				alert(`記録は LEVEL: ${number_number.textContent}\nLank: ${levelCount}\nこの問題の答えは  ${listed.textContent}でした。`)
			}
			p2();
		}
	} else {
		if (number > Number(localStorage.test)) {
			alert(`GAMEOVER\n答えを間違えました。\n記録は LEVEL:${number_number.textContent} \n最高記録更新！！ ${localStorage.test} → ${number}\n Lank:${levelCount}\nこの問題の答えは  ${listed.textContent}です\nもう残機がありません、はじめから再挑戦しますか?`);
			p2();
			localStorage.test = number;
			if (localStorage.test <= 99) {
				document.getElementById("test")
					.textContent = `BESTLEVEL: ${localStorage.test}`
			} else {
				document.getElementById("test")
					.textContent = `BESTLEVEL:+99`
			}
		} else {
			alert(`GAMEOVER\n答えを間違えました。\n記録は LEVEL:${number_number.textContent} Lank:${levelCount}\nこの問題の答えは  ${listed.textContent}です\nもう残機がありません、はじめから再挑戦しますか?`);
			p2();
		};
	}
};

//時間切れによるgemeover
function future2() {
	var number = number_number.textContent
	document.getElementById("listed")
		.textContent = lists.textContent
	bgm1.play();
	//音の設定1（参照先buzzer.mp3(bgm1)
	var levelCount = "0";
	var level = number_number.textContent;
	var s = level * 10 + Math.floor(timer_sec.textContent * 0.0004) + humans_number.textContent * 10;
	levelCount = Lank(s, levelCount);
	if (number > Number(localStorage.test)) {
		alert(`GAMEOVER 時間切れです\n記録は LEVEL: ${number_number.textContent} Lank: ${levelCount}\n最高記録更新！！ ${localStorage.test} → ${number}\nこの問題の答えは  ${listed.textContent}です\n初めから再挑戦しますか`);
		localStorage.test = number;
		if (localStorage.test <= 99) {
			document.getElementById("test")
				.textContent = `BESTLEVEL: ${localStorage.test}`
		} else {
			document.getElementById("test")
				.textContent = `BESTLEVEL:+99`;
		}
	} else {
		alert(`GAMEOVER 時間切れ\n記録 LEVEL: ${number_number.textContent} Lank: ${levelCount}\nこの問題の答え  ${listed.textContent}\n再挑戦しますか`);
	};
	p2();
};

//ランク計算用
function Lank(s, levelCount) {
	if (s < 0) {
		levelCount = "ERROR";
	} else if (s >= 0 && s <= 150) {
		levelCount = "E";
	} else if (s > 150 && s <= 200) {
		levelCount = "D";
	} else if (s > 200 && s <= 250) {
		levelCount = "C";
	} else if (s > 250 && s <= 275) {
		levelCount = "B";
	} else if (s > 275 && s <= 300) {
		levelCount = "A";
	} else if (s > 300 && s <= 350) {
		levelCount = "S";
	} else if (s > 350 && s <= 450) {
		levelCount = "S+";
		localStorage.Play = 1;
	} else if (s > 450) {
		levelCount = "Master   you are Master to This Game!!";
		localStorage.Play = 1;
	};
	return levelCount;
};

function color() {
	humans_max.style.color = 'rgb(95, 207, 128)';
	humans_maxs.style.color = 'rgb(95, 207, 128)';
	if (humans_number.textContent >= Number(humans_max.textContent)) {
		humans_number.style.color = 'rgb(95, 207, 128)';
	} else if (humans_number.textContent <= Number(humans_max.textContent) - 1 && humans_number.textContent >= 2) {
		humans_number.style.color = 'hsl(51, 94%, 52%)';
	} else if (humans_number.textContent <= 1) {
		humans_number.style.color = 'red';
	}
}

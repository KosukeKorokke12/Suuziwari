'use strict';
var time = 30 * 100;
document.getElementById("timer_sec").innerHTML = time;
document.getElementById("p1").style.display = "block";
document.getElementById("reset")
	.style.display = "none"; //リセット設定
const bgm1 = document.querySelector("#bgm1");
const bgm2 = document.querySelector("#bgm2");

function start(time) {
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
	kihonn(1);
}

function p2() {
	location.reload();
};　 //リセットボタン機構
function future() {
	bgm1.play();
	setTimeout(function() {
		bgm1.pause();
	}, 2000);
	//音の設定1（参照先buzzer.mp3(bgm1)）
	alert("GAMEOVER");
	alert("再挑戦しますか");
	location.reload();
};　 //game over機構

function kihonn(number) {
	var note = [];
	const elements = [2, 3, 5, 7, 11]; //element変数=掛け合わせる元
	var Suuzi = 1;
	document.getElementById("number_number")
		.textContent = number;
	//elements変数同士で掛け合わせている
	if (number >= 20) {
		number = 20
	}
	for (var i = 0; i < number; i++) {
		var rand = Math.floor(Math.random() * 5);
		Suuzi = Suuzi * elements[rand];
		note[i] = rand
	};
	//elements変数同士で掛け合わせている
	document.getElementById("korokke").textContent = Suuzi;
	document.getElementById("number_number").textContent = number;
};

function timmer(time) {
	var timer_obj = document.getElementById("time");
	var timer = setInterval(function() {
		timer_obj.innerHTML = "残り時間:";
		timer_obj.innerHTML += Math.floor(time / 100);
		timer_obj.innerHTML += ".";
		timer_obj.innerHTML += time % 99;
		if (time < 0) {
			future();
			clearInterval(timer);
		}
		time--;
	}, 10);
};

Number.isInteger = Number.isInteger || function( value ) {
    const IS_INTEGER =
        typeof value === "number" &&
        isFinite( value ) &&
        Math.floor( value ) === value
    ;

    return IS_INTEGER;
};

function a(mozi) {
	var number = document.getElementById("number_number").textContent
		//難易度取得
	var kazu = korokke.textContent;
	//korokke引数を取得（kazu変数に代入）
	var Suuzi = kazu / mozi;
	//kazu変数をmozi変数で割る
	var kazu = Suuzi;
	document.getElementById("korokke").textContent = Suuzi;
	//korokke引数をSuuziに置き換える
	if (Suuzi == 1) {
		bgm2.play();
		window.setTimeout(function() {
			bgm2.pause();
		}, 2000);
		//音の設定2(参照先answer.mp3(bgm2))
		console.log("クリア")
		number++
		kihonn(number)
		console.log(number)
		var timer_sec = timer_sec + number * 110
		document.getElementById("timer_sec").innerHTML = timer_sec;
		console.log(timer_sec + "timer_sec")
	}
	//難易度上昇機構
	　　
	else {
		if (!Number.isInteger(Suuzi)) {
			future()
		};
	};
};
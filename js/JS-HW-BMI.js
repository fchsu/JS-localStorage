// 全域變數設定
var addBtn = document.querySelector("#btnId");
var resetBtn = document.querySelector("#resultbox");
var BMIlist = document.querySelector("#BMIlistId");
var BMIenterH = document.querySelector("#heightId");
var BMIenterW = document.querySelector("#weightId");
var BMIarray = JSON.parse(localStorage.getItem("BMIrecord")) || [];


// 動作與監聽
BMIupdated();
addBtn.addEventListener("click", BMIcount, false);
resetBtn.addEventListener("click", BMIreset, false);
BMIenterH.addEventListener("keydown", BMIenter, false);
BMIenterW.addEventListener("keydown", BMIenter, false);
BMIlist.addEventListener("click", removeList, false);


// 函式設定
function BMIupdated(e){
	var BMIstr = "";
	var Len = BMIarray.length;
	for(var i = 0; i < Len; i++){
		BMIstr += "<li><div class='" + BMIarray[i].list顏色分類 + "'></div><span class='BMItype'>" + BMIarray[i].分類 + "</span><span class='title'>BMI</span><span class='value'>" + BMIarray[i].BMI指數 + "</span><span class='title'>Height</span><span class='value'>" + BMIarray[i].身高 + "cm</span><span class='title'>Weight</span><span class='value'>" + BMIarray[i].體重 + "kg</span><span class='time'>" + BMIarray[i].日期 + "</span><a href='#' data-num='" + i + "'>刪除</a></li>"
	}
	BMIlist.innerHTML = BMIstr;
}

function BMIresult(e){
	addBtn.classList.add("btnhidden");
	// addBtn.setAttribute("class", "btnhidden");
	var BMIstr = "";
	var Len = BMIarray.length - 1;
	BMIstr = "<div class='result " + BMIarray[Len].邊框顏色分類 + " " + BMIarray[Len].文字顏色分類 + "'><span class='BMIvalue'>" + BMIarray[Len].BMI指數 + "</span><span class='subtitled'>BMI</span><a href='#'' id='ResetId' class='" + BMIarray[Len].背景顏色分類 + "'></a></div><p id='BMItype' class='" + BMIarray[Len].文字顏色分類 + "'>" + BMIarray[Len].分類 + "</p>"
	document.querySelector("#resultbox").innerHTML = BMIstr;
}

function BMIreset(e){
	e.preventDefault();
	if(e.target.nodeName !== 'A'){
		return;
	}
	BMIenterH.value = "";
	BMIenterW.value = "";
	addBtn.classList.remove("btnhidden");
	document.querySelector("#resultbox").innerHTML = "";
}

function BMIcount(e){
	var heightValue = parseInt(BMIenterH.value);
	var weightValue = parseInt(BMIenterW.value);
	if(isNaN(heightValue)){
		alert("身高欄位請輸入數字");
	}
	if(isNaN(weightValue)){
		alert("體重欄位請輸入數字");
	}
	if(isNaN(heightValue) || isNaN(weightValue)){
		return;
	}
	var BMI = weightValue / ((heightValue/100)**2);
	var BMItype = "";
	var BMIborder = "";
	var BMIcolor = "";
	var BMIbackground = "";
	var BMIlistcolor = "";
	var date = new Date();
	BMI = BMI.toFixed(2);
	if(BMI < 18.5){
		BMItype = "過輕";
		BMIborder = "blueborder";
		BMIcolor = "bluecolor";
		BMIbackground = "bluebackground";
		BMIlistcolor = "blue"
	}else	if(BMI >= 18.5 && BMI < 24){
		BMItype = "理想";
		BMIborder = "greenborder";
		BMIcolor = "greencolor";
		BMIbackground = "greenbackground";
		BMIlistcolor = "green"
	}else if(BMI >= 24 && BMI < 27){
		BMItype = "過重";
		BMIborder = "orangeborder1";
		BMIcolor = "orangecolor1";
		BMIbackground = "orangebackground1";
		BMIlistcolor = "orange1"
	}else if(BMI > 27){
		BMItype = "肥胖";
		BMIborder = "orangeborder2";
		BMIcolor = "orangecolor2";
		BMIbackground = "orangebackground2";
		BMIlistcolor = "orange2"
	}
	var BMIobject = {
		邊框顏色分類: BMIborder,
		文字顏色分類: BMIcolor,
		背景顏色分類: BMIbackground,
		list顏色分類: BMIlistcolor,
		分類: BMItype,
		BMI指數: BMI,
		身高: heightValue,
		體重: weightValue,
		日期: date.toLocaleDateString("zh-TW")
	}
	BMIarray.push(BMIobject);
	localStorage.setItem("BMIrecord", JSON.stringify(BMIarray));
	BMIresult();  
	BMIupdated();
}

function BMIenter(e){
	if(e.keyCode === 13){
		BMIcount();
	}
}

function removeList(e){
	e.preventDefault();
	if(e.target.nodeName !== "A"){
		return;
	}
	var Num = e.target.dataset.num;
	BMIarray.splice(Num, 1);
	localStorage.setItem("BMIrecord", JSON.stringify(BMIarray));
	BMIupdated();
}
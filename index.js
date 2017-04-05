function Helper(){};

Helper.prototype.createDateValue = function(strServDate){
var myCreateDate = strServDate ? new Date(strServDate) : new Date();
return (new Date(myCreateDate.getFullYear(), myCreateDate.getMonth(), myCreateDate.getDate())).valueOf();
};

Helper.prototype.getMonthName = function(language, monthNumber){
var mounthObject = {
	 ru: {
	 1: 'Января',
	 2: 'Февраля',
	 3: 'Марта',
	 4: 'Апреля',
	 5: 'Мая',
	 6: 'Июня',
	 7: 'Июля',
	 8: 'Августа',
	 9: 'Сентября',
	 10: 'Октября',
	 11: 'Ноября',
	 12: 'Декабря'
	 },

	 uk: {
	 1: "Січня",
	 2: "Лютого",
	 3: "Березня",
	 4: "Квітня",
	 5: "Травня",
	 6: "Червня",
	 7: "Липня",
	 8: "Серпня",
	 9: "Вересня",
	 10: "Жовтня",
	 11: "Листопада",
	 12: "Грудня"
	 }
	};
	return mounthObject[language][monthNumber];
};
Helper.prototype.result = function(language, strServDate){
	var oldDate = this.createDateValue(strServDate);
	var nowDate = this.createDateValue();
	var resultDate;

	if (oldDate < nowDate) {
		var ifDate = new Date(oldDate);
		var monthNumber = ifDate.getMonth() + 1;
		var name = this.getMonthName(language, monthNumber);
		resultDate = ifDate.getDate() + ' ' + name + ' ' + ifDate.getFullYear();
	} else {
		resultDate = (new Date()).getHours() + ':' + (new Date()).getMinutes();
	}
	return resultDate;
}

Helper.prototype.XHR = function(method, url, data, headers, callback){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			callback(request.responseText);
		}
	};
	request.open(method, url);
	request.send(data || null);
};
function App(){
	this.init();
};

App.prototype = Object.create(Helper.prototype);

App.prototype.init = function() {
	new Iframe(document.querySelector('.val-iframe-streams'));
	new Slider(document.querySelector('.val-list-slider'));
	new Category(document.querySelector('.val-full-width-category'));
};

window.addEventListener('DOMContentLoaded', function(){
	new App();
})

function Category(el){
	this.el = el;
	this.id = 1;
	this.status = true;
	//this.handler();
	window.addEventListener('scroll', this.handler.bind(this));
};

Category.prototype = Object.create(App.prototype);

Category.prototype.handler = function(){
	if ((document.body.clientHeight - document.body.scrollTop) < 1500 && this.status){
		this.status = false;
		this.XHR('GET', '/site/GetCategory?id=' + this.id, null, null, this.createCategory.bind(this)); // вызываем XHR c этими параметрами
	}
};

Category.prototype.createCategory = function(newObj){
	var myObj = JSON.parse(newObj);
	var language = myObj.language;
	var objCategory = JSON.parse(myObj.category)[0];
	var objNews = JSON.parse(myObj.news);

	var str = '<div class="val-category-block">' +
			 '<h2 class="val-title-uppercase-with-line">' + objCategory['name_' + language] + '</h2>' +
			 '<div class="val-news-list-category">';

	for (var i = 0; i < objNews.length; i++) {
		if (i == 0) {
			str += this.newsImg(objNews[i], language);
		} else {
			str += this.newsText(objNews[i], language);
		}
	}

	str += '</div>' +
			'</div>';

	this.el.insertAdjacentHTML('beforeEnd', str);
	this.id = (this.id == 6) ? (this.id + 2) : ++this.id;
	this.status = true;
};

Category.prototype.newsImg = function(item, lang){

	var newsImg = '<a href="/site/news/' + item.id + '" class="val-news-item-category val-category-image">' +
 					'<div class="val-item-outer-category-image">' +
 					'<img src="/uploads/news/thumb/' + item.image + '" alt="' + item['title_' + lang] + '">' +
 					'</div>' +
 					'<div class="val-line-vews-data">' +
 					'<span class="val-content-news-data">' + this.result(lang, item.date) + '</span>' + // передавать язык
					'<span class="val-news-view">' + item.views + '</span>' +
 					'</div>' +
 					'<h2 class="val-title-news-category">' + item['title_' + lang] + '</h2>' +
 					'</a>';
 	return newsImg;
};

Category.prototype.newsText = function(item, lang){

	var newsText = '<a href="/site/news/' + item.id + '" class="val-news-item-category val-category-image">' +
 					'<div class="val-line-vews-data">' +
 					'<span class="val-content-news-data">' + this.result(lang, item.date) + '</span>' +
 					'<span class="val-news-view">' + item.views + '</span>' +
 					'</div>' +
 					'<h2 class="val-title-news-category">' + item['title_' + lang] + '</h2>' +
 					'<p class="val-description-news-category">' + item['description_' + lang].substring(0, 251) + '</p>' +
 					'</a>';
 	return newsText;
};

function Iframe(el){
	if(!el) return;
	this.el = el;
	this.getArray();
};

Iframe.prototype = Object.create(App.prototype);

Iframe.prototype.getArray = function(){
	var myAttr = this.el.getAttribute('data-src');
	var myArrLinks = myAttr.split(', ');
	var allIframes = '';
	for (var i = 0, l = myArrLinks.length; i < l; i++) {
		allIframes += this.template(myArrLinks[i]);
		};
		this.el.insertAdjacentHTML('beforeEnd', allIframes);
};

Iframe.prototype.template = function(link){
	var str = '<div class="val-outer-frame">'+
				'<span class="val-ico-online"><i>Online</i></span>'+
				'<iframe width="100%"" height="270px" src="' + link + '"></iframe>'+
			'</div>';
	return str;
};
function Slider(el){
	if(!el) return;
	this.el = el;
	this.controls = document.querySelector('.val-display-controls');
	this.getControls();
	this.sliderWindowWidth = el.firstElementChild.clientWidth;
	this.controls.addEventListener('click', this.animation.bind(this));
};

Slider.prototype = Object.create(App.prototype);


Slider.prototype.getControls = function() {
	var mySliderChildrens = this.el.children;
	var allSpans = '';
	for (var i = 0, l = mySliderChildrens.length; i < l; i++) {
		allSpans += i == 0 ? '<span class="-active-slide" data-controls="' + i + '"></span>' : '<span data-controls="' + i + '"></span>';
	};
	this.controls.insertAdjacentHTML('beforeEnd', allSpans);
};

Slider.prototype.animation = function(e){
	var target = e.target;
		if (target.tagName == 'SPAN'){
			var targetDataValue = parseInt(target.getAttribute('data-controls'));
			var active = document.querySelector('.-active-slide');
			active.classList.remove('-active-slide');
			target.classList.add('-active-slide');
			this.el.style.cssText += 'transform: translateX(' + (0 - (this.sliderWindowWidth)*targetDataValue) + 'px);transition: all 1s ease-in-out';
			return;
		}
};
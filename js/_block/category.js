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
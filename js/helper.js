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

Helper.prototype.XHR = function(method, url, data, headers, callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			callback(request.responseText);
		}
	};
	request.open(method, url);
	request.send(data || null);
};
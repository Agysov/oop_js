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
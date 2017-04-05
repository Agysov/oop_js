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
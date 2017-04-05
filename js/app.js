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

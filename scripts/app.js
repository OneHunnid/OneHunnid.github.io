(function(){ 	// protect the lemmings!

	var Views = {};

	Views.home = function home() {
		Home.init();
	};

	Views.learnMore = function learnMore() {
		LearnMore.init();
	};

	Routes.register('home', Views.home );
	Routes.register('learnmore', Views.learnMore );

	Routes.init('home');
	
})();
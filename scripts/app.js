(function(){

	var Views = {};

	Views.home = function home() {
		Home.init();
	};

	Views.learnMore = function learnMore() {
		LearnMore.init();
	};

	Views.search = function search( hash ) {
		Search.init( hash );
	};

	Routes.register('home', Views.home );
	Routes.register('learnMore', Views.learnMore );
	Routes.register('search/:hash', Views.search );

	Routes.init('home');
	
})();
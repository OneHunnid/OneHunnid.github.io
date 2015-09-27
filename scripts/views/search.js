var Search = (function() {

	var searchData = {
		title: 'Search'
	},
	template = $('#searchTemplate').html(),
	compiled = _.template( template );
	
	// KICKSTART VIEW
	function initsearch() {
	
	// load main-content
		$('#main-content').html(compiled(searchData));
	}

	return {
		init: initsearch
	};

})();
var Search = (function() {

	var searchData = {
		title: 'Search'
	},
	template = $('#searchTemplate').html(),
	compiled = _.template( template );

	// Kickstart view
	function initsearch() {

		// Load main content
		$('#main-content').html(compiled( searchData ));
	}

	return {
		init: initsearch
	};

})();
var LearnMore = (function() {

	var learnMoreData = {
		title: 'Freedom of Speech',
		desc: 'We believe in the power of transparency. Our goal is to empower users across the globe through our anonymous tool and encourage self expression.',
	},
	template = $('#learnMoreTemplate').html(),
	compiled = _.template( template );

	function initLearnMore() {
		$('#main-content').html(compiled(learnMoreData));
	}
	return {
		init: initLearnMore
	};

})();
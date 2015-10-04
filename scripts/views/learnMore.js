var LearnMore = (function() {

	var learnMoreData = {
		title: 'Freedom of Speech',
		desc: 'We believe in the power of transparency. Our goal is to empower users across the globe through our anonymous tool and encourage self expression.',
	},
	template = $('#learnMoreTemplate').html(),
	compiled = _.template( template );
	
	// KICKSTART VIEW
	function initLearnMore() {
	
	// load main-content
		$('#main-content').html(compiled(learnMoreData));
		initSearchSubmission();
	}

	function initSearchSubmission() {

		var search = $('#search-notes');
		search.parsley();

		search.on('submit', function(e) {
			e.preventDefault();

			var searchVal = search.find('.search__input').val();

			search.parsley().validate();

			if ( search.parsley().isValid() ) {
				// onVal( myFirebaseRef, searchVal, 100 );
				Routes.setRoute('search/'+searchVal);

				// Reset form field after	
				$("#searchSubmit").val("");
			}
			
			// If invalid...
			else {
				
			}

		});

	}
	return {
		init: initLearnMore
	};

})();
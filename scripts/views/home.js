var Home = (function() {

	var homeData = {
		title: 'Anonymously send notes that delete in 24 hours.',
		desc: 'All notes are publicly available to read by searching for them with their hashtag. Enjoy anonymous conversations with friends, out in the open.',
		list: [
			{
				icon: 'assets/icon_person.png',
				label: 'All Notes Are Anonymous'
			},
			{
				icon: 'assets/icon_shield.png',
				label: 'SSL Encrypted Connection'
			},
			{
				icon: 'assets/icon_opensource.png',
				label: 'Open Sourced Code'
			}
		]
	},
	template = $('#homeTemplate').html(),
	compiled = _.template( template );

	// DOM Handlers

	function initFormSubmission() {

		var form = $('#write-note');
		form.parsley();

		$('#formSubmit').on('click', function(e) { 
	        e.preventDefault();

	        form.parsley().validate();

	        if ( form.parsley().isValid() ) {
	            console.log('Note is Valid')      
	        }
	        else {
	        	$('#write-note').find('textarea, input').css('border', '1px solid #E44343') // display error message & highlight fields in red
	        }

	    });

	}

	function initSearchSubmission() {

		var search = $('#search-notes');
		search.parsley();

		$('#searchSubmit').on('click', function(e) {
			e.preventDefault();

			search.parsley().validate();

			if ( search.parsley().isValid() ) {
				console.log('Search is Valid');
			}
			else {
				$('#search-notes').find('.search__form, input:focus').css('border', '1px solid #E44343')
			}

		});

	}

	// KICKSTART VIEW
	function initHome() {

		// load main content
		$('#main-content').html(compiled( homeData ));

		// bind events
		initFormSubmission();
		initSearchSubmission();

		// load firebase..

	}
	return {
		init: initHome
	};

})();


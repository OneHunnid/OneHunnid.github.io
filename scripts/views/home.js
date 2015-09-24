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
	            console.log('hello')      
	        }
	        else {
	        	$('#write-note').find('textarea, input').css('border', '1px solid #E44343') // display error message & highlight fields in red
	        }

	    });

	}

	// KICKSTART VIEW
	function initHome() {

		// load main content
		$('#main-content').html(compiled( homeData ));

		// bind events
		initFormSubmission();

		// load firebase..

	}
	return {
		init: initHome
	};

})();


var Home = (function() {

	var homeData = {
		title: 'Hello, Wrold Anonymously send notes that delete in 24 hours.',
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

	        console.log( $('#formTextareaMessage').parsley().isValid() );

	        console.log( form.parsley() )

	        if ( form.parsley().isValid() ) {
	            console.log('hello')      
	        }

	        console.log('hello2')
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


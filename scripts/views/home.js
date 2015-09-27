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

	// Init Firebase
	$.getScript('https://cdn.firebase.com/js/client/2.2.9/firebase.js', function() {

		// Connect Firebase
		var myFirebaseRef = new Firebase("https://radiant-torch-2861.firebaseio.com/");

		var form = $('#write-note');
		
		form.parsley();

		// Submit Note Form
		$('#formSubmit').on('click', function(e) { 
	        e.preventDefault();

	        form.parsley().validate();

	        var formObj = {
	        	 message: $('#formTextareaMessage').val(),
	        	 hashtag: $('#formInputHashtag').val(),
	        	 timestamp: Firebase.ServerValue.TIMESTAMP
	        };

	        // If note is valid, submit to database and reset fields
	        if ( form.parsley().isValid() ) {
	            
	            // Submit note to database
	            myFirebaseRef.child('notes').push({"message": formObj.message , "hashtag": formObj.hashtag});

				// Reset form fields after	
				$("#formTextareaMessage").val("");
				$("#formInputHashtag").val("");

	        }
	        // If invalid, display errors
	        else {
	        	// $('#write-note').find('textarea, input').css('border', '1px solid #E44343') // display error message & highlight fields in red
	        }

	    });

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


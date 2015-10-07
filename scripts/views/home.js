var Home = (function() {

	var myFirebaseRef = new Firebase("https://radiant-torch-2861.firebaseio.com/");

	var homeData = {
		title: 'Anonymously send notes that delete in 24 hours.',
		desc: 'All notes are publicly available to read by searching for them with their hashtag. Enjoy anonymous conversations with friends, out in the open.',
		list: [
			{
				icon: 'assets/icon_person.png',
				label: 'All Notes are Anonymous'
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
	template = $('#homepageTemplate').html(),
	compiled = _.template(template);

	// Partials
	var infoPartial = $('#partial-main-info').html(),
		infoPartialCompiled = _.template( infoPartial );

	// DOM Handlers
	function initFormSubmission() {
		
		var form = $('#write-note');
		form.parsley();

		// Submit Note Form
		form.on('submit', function(e) {
			e.preventDefault();
			
			form.parsley().validate();

			var date = new Date();
			date.setSeconds(0);

			var formObj = {
				message: $('#formTextareaMessage').val(),
				hashtag: $('#formInputHashtag').val(),
				timestamp: date.getTime() - 24 * 60 * 60 * 1000
			};

			if ( form.parsley().isValid() ) {

				// Submit notes to database
	            myFirebaseRef.child('allHashes').child( formObj.hashtag ).set( 1 );
	            myFirebaseRef.child('hashtags/' + formObj.hashtag).push({"message": formObj.message , "hashtag": formObj.hashtag, "timestamp": formObj.timestamp});

				// Reset form fields after	
				$("#formTextareaMessage").val("");
				$("#formInputHashtag").val("");

				Routes.setRoute('search/'+formObj.hashtag);

	        }
	        // If invalid...
	        else {
	        	
	        }

		});

	}


	function initSearchSubmission() {

		var search = $('#search-notes');
		search.parsley();

		search.on('submit', function(e) {
			e.preventDefault();

			var searchVal = search.find('.search__input').val();

			search.parsley().validate();

			if ( search.parsley().isValid() ) {
				Routes.setRoute('/search/'+searchVal);

				// Reset form field after	
				$("#searchSubmit").val("");
				return;
			}
			
			// If invalid...
			else {
				
			}

		});

	}


	// KICKSTART VIEW
	function initHome() {

		// load main content
		$('#main-content').html(compiled( homeData ));
		
		$('.js-home-left-col').html( infoPartialCompiled(  homeData ));

		// Bind events
		initFormSubmission();
		initSearchSubmission();
	}
	return {
		init: initHome
	};

})();

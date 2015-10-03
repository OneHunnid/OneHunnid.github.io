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
		infoPartialCompiled = _.template( infoPartial ),
		hashPartial = $('#partial-hash-search').html(),
		hashPartialCompiled = _.template( hashPartial );

	// DOM Handlers
	function initFormSubmission() {
		
		var form = $('#write-note');
		form.parsley();

		// Submit Note Form
		form.on('submit', function(e) {
			e.preventDefault();
			
			form.parsley().validate();

			var formObj = {
				message: $('#formTextareaMessage').val(),
				hashtag: $('#formInputHashtag').val(),
				timestamp: Firebase.ServerValue.TIMESTAMP
			};

			if ( form.parsley().isValid() ) {

				// Submit notes to database
	            myFirebaseRef.child('allNotes').push({"message": formObj.message , "hashtag": formObj.hashtag, "timestamp": formObj.timestamp});
	            myFirebaseRef.child('hashtags/' + formObj.hashtag).push({"message": formObj.message , "hashtag": formObj.hashtag, "timestamp": formObj.timestamp});

				// Reset form fields after	
				$("#formTextareaMessage").val("");
				$("#formInputHashtag").val("");

				onVal( myFirebaseRef, formObj.hashtag, 100 );

	        }
	        // If invalid...
	        else {
	        	
	        }

		});

	}

	function onVal( myFirebaseRef, searchVal, limVal ) {
		myFirebaseRef.off();
		myFirebaseRef.child('hashtags/'+searchVal).on('value', function( snapshot ) {
			var vals = snapshot.val();

			var dataAsArray = 
				Object.keys(vals)										// turns the keys of the snapshot into an array
				.sort(function(a,b){									// sorts the keys 
					return ( vals[a].timestamp <= vals[b].timestamp ) ? 1 : -1;
				})
				.reduce(function(arr, currentItem){						// now have array of keys sorted by timestamp
					arr.push( vals[ currentItem ] );
					return arr;											// populate another array for each object item
				}, []);

			$('.js-home-left-col').html( hashPartialCompiled({
				hash: searchVal,
				val: dataAsArray,
				detectMedia: MediaDetector.detectMedia
			}) );
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
				onVal( myFirebaseRef, searchVal, 100 );

				// Reset form field after	
				$("#searchSubmit").val("");
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

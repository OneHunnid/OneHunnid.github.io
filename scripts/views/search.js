var Search = (function() {


	var myFirebaseRef = new Firebase("https://radiant-torch-2861.firebaseio.com/");
	var searchData = {
		title: 'Search'
	},
	template = $('#homepageTemplate').html(),
	compiled = _.template( template ),
	hash;

	// Partials
	var hashPartial = $('#partial-hash-search').html(),
		hashPartialCompiled = _.template( hashPartial ),
		notFoundPartial = $('#partial-no-notes-found').html(),
		notFoundCompiled = _.template( notFoundPartial );

	// Kickstart view
	function initsearch( the_hash ) {

		hash = the_hash;

		// Load main content
		$('#main-content').html(compiled( searchData ));

		onVal( myFirebaseRef, hash, 100 );

		// Bind events
		initFormSubmission();
		initSearchSubmission();
		initPlayPauseFeed();
	}

	function onVal( myFirebaseRef, searchVal, limVal ) {
		myFirebaseRef.off();
		myFirebaseRef.child('hashtags/'+searchVal).on('value', function( snapshot ) {
			var vals = snapshot.val();

			if ( vals === null ) {

				console.log("hello");

				$('.js-home-left-col').html( notFoundCompiled({
					hash: searchVal
				}) );

				return;
			}

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

	function initPlayPauseFeed() {
		$('body').off('click', '.js-pause').on('click', '.js-pause', function( e ) {
			e.preventDefault();

			var isPlaying = parseInt( $( this ).attr('data-isplaying'), 10 );

			if ( isPlaying  === 1 ) {
				myFirebaseRef.child('hashtags/'+hash).off();
				$( this )
					.text('Play Feed')
					.attr('data-isplaying', 0);
				alert('feed is off')
			}
			else {
				onVal( myFirebaseRef, hash, 100 );
				$( this )
					.text('Pause Feed')
					.attr('data-isplaying', 1);
				alert('feed is on');
			}
			
		});
	}

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

	return {
		init: initsearch
	};

})();
var MediaDetector = (function(){

	var supported = [ 'youtube', 'soundcloud', 'imgur', 'giphy' ];


	function detectMedia( msg ) {
		var matches = msg.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);

		if ( matches === null ) {
			return {
				isMediaFound: false
			};
		}

		// if we are here, media HAS been found
		var url = matches[ 0 ].replace(/\"/g, '');
		var media = "generic", payloadTypeFunction;

		for( var i = 0; i < supported.length; ++i ) {
			var currentMediaToCheck = supported[ i ];
			var hasFound = url.indexOf( currentMediaToCheck ) !== -1;
			if ( hasFound ) {
				media = currentMediaToCheck;
				break;
			}
		}

		switch ( media ) {
			case "generic":
				payloadTypeFunction = _isGenericURL;
				break;
			case "youtube":
				payloadTypeFunction = _isYoutube;
				break;
			case "soundcloud":
				payloadTypeFunction = _isSoundcloud;
				break;
			case "imgur":
				payloadTypeFunction= _isImgur;
				break;
			case "giphy":
				payloadTypeFunction = _isGiphy;
				break;
		}


		return {
			isMediaFound: true,
			payload: payloadTypeFunction( msg, url )
		}
	};

	function _getArgs( url ) {
		var urlBits = url.split('?');
		if ( urlBits.length <= 1 ) {
			// no args, return empty
			return {};
		}

		var args = urlBits.pop();
		var argBits = args.split('&');
		if ( argBits.length === 0 ) {
			return {};
		}

		return argBits.reduce(function( argsObj, arg ){
			var curr = arg.split('=');

			argsObj[ curr[ 0 ] ] = curr[ 1 ];

			return argsObj;
		}, {});
	}

	function _isGenericURL( msg, url ) {
		return '<a href="'+url+'" target="_blank">'+url+'</a>';
	}

	function _isYoutube( msg, url ) {

		var args = _getArgs( url );

		var msgBits = msg.split( url );
		var genericMessageTemplate = '<%- msgBit %>';
		var genericMessageCompiled = _.template( genericMessageTemplate );

		var newMessage = 
			genericMessageCompiled({msgBit: msgBits[0]}) 
			+ '<a href="'+url+'" target="_blank">'+url+'</a>' 
			+ genericMessageCompiled({msgBit: msgBits[1]});

		if ( typeof args.v !== "undefined" ) {
			url = 'https://www.youtube.com/embed/' + args.v;
		}

		var youtubeTemplate = '<iframe width="560" height="315" src="<%= url %>" frameborder="0" allowfullscreen></iframe>';
		var youtubeCompiled = _.template( youtubeTemplate );

		var youtubePayload = youtubeCompiled({ url: url });

		return newMessage + "<p></p>" + youtubePayload;
	}

	function _isSoundcloud( msg, url ) {

		var msgBits = msg.split( url );
		var genericMessageTemplate = '<%- msgBit %>';
		var genericMessageCompiled = _.template( genericMessageTemplate );

		var newMessage = 
			genericMessageCompiled({msgBit: msgBits[0]}) 
			+ '<a href="'+url+'" target="_blank">'+url+'</a>' 
			+ genericMessageCompiled({msgBit: msgBits[1]});


		var soundcloudTemplate = '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=<%= url %>&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';
		var soundcloudCompiled = _.template( soundcloudTemplate );

		var soundcloudPayload = soundcloudCompiled({ url: url });

		return newMessage + "<p></p>" + soundcloudPayload;
	}

	function _isImgur( msg, url ) {

		var msgBits = msg.split( url );
		var genericMessageTemplate = '<%- msgBit %>';
		var genericMessageCompiled = _.template( genericMessageTemplate );

		var newMessage = 
			genericMessageCompiled({msgBit: msgBits[0]}) 
			+ '<a href="'+url+'" target="_blank">'+url+'</a>' 
			+ genericMessageCompiled({msgBit: msgBits[1]});

		var urlBits = url.split('/');
		var id = urlBits.pop();
		// alert( id );


		var imgurTemplate = '<blockquote class="imgur-embed-pub" lang="en" data-id="<%= id %>"></blockquote><script async src="http://s.imgur.com/min/embed.js" charset="utf-8"></script>';
		var imgurCompiled = _.template( imgurTemplate );

		var imgurPayload = imgurCompiled({ id: id });

		return newMessage + "<p></p>" + imgurPayload;
	}

	function _isGiphy( msg, url ) {
		var msgBits = msg.split( url );
		var genericMessageTemplate = '<%- msgBit %>';
		var genericMessageCompiled = _.template( genericMessageTemplate );

		var newMessage = 
			genericMessageCompiled({msgBit: msgBits[0]}) 
			+ '<a href="'+url+'" target="_blank">'+url+'</a>' 
			+ genericMessageCompiled({msgBit: msgBits[1]});

		var urlBits = url.split('/');
		var id = urlBits.pop();
		var idBits = id.split('-');
		id = idBits.pop();


		var imgurTemplate = '<img style="width: 100%;" src="http://i.giphy.com/<%= id %>.gif">';
		var imgurCompiled = _.template( imgurTemplate );

		var imgurPayload = imgurCompiled({ id: id });

		return newMessage + "<p></p>" + imgurPayload;
	}

	return {
		detectMedia: detectMedia
	}
})();
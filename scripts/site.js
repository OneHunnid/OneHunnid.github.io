// Connect Firebase
// Pop-Up form when Send Note button is clicked


// Form Message Input Validation
var messageValidation = {
	
	isEmpty:
	isGreaterThanNChars:
	isNotAlphaNumeric:

	return true;

};

// Form Hashtag Input Validation
var hashtagValidation = {
	
	isEmpty:
	isGreaterThanNChars:
	isNotAlphaNumeric:
	hasHashtagInFront:
	hasSpaces:

	return true;

};

$('#formSubmit').click(function(messageValidation, hashtagValidation) {
	if ( messageValidation === true && hashtagValidation === true ) {
		return true;
	}

	return false;

});

/******** HEADER SEARCH FIELD

Note: Hashtags are case sensitive 

- User searches hashtag in search field 
- Pass search query to database
- Return results on Search Page

- If no hashtags are valid, return "No Notes Available" message

Validation Rules

- field not empty
- no pasting text
- not longer than ___ characters
- no spaces allowed
- no invalid characters (only numbers and letter)
- automatically add # when user focuses on search field
- convert to plain text (no code/links allowed)

*/



/******** FORM

- Validate when Submit button is clicked

If Invalid

- shake submit button
- display error messages below input fields in red

If Valid

- Submit Timestamp, Message and Hashtag to Firebase
- Display success message

*/



/******** FORM MESSAGE

Validation rules

- textarea field not empty
- no pasting text
- shorter than 140 characters
- no invalid characters (only accept ! , ? ' and numbers)
- Doesn't start with ! , ? '
- convert to plain text (no code allowed - allows links)

If invalid

- Return error message below textarea field in red

/*



/******** FORM HASHTAG

Validation rules

- field not empty
- no pasting text
- not longer than ___ characters
- no spaces allowed
- no invalid characters (only numbers and letters)
- automatically add # when user focuses on hashtag field
- convert to plain text (no code/links allowed)

If invalid

- Return error message below input field in red

*/
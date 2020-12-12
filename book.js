var genreInput = document.querySelector('#genre-input');
var searchButton = document.querySelector('#search-button');
var randomQuote = document.querySelector('#random-quote');
var authorQuote = document.querySelector('#quote-authors');
var tagsQuote = document.querySelector('#quote-tags');
var randomQuoteContent = document.querySelector('#random-quote-content');
var randomQuoteAuthor = document.querySelector('#random-quote-author');
var outputDiv = document.querySelector('#tagged-quotes');

var serverURL = 'https://api.quotable.io/quotes';
var x = 1;

function getTranslationURL(input) {
	return serverURL + '?' + 'tags=' + input;
}

function errorHandler(error) {
	console.log('error occured', error);
	alert('something wrong with server! try again after some time');
}

function randomQuoteHandler() {
	fetch('https://api.quotable.io/random')
		.then(response => response.json())
		.then(data => {
			console.log(`${data.content} —${data.author}`);
			document.getElementById('quote-block').style.display = 'block';
			randomQuoteContent.innerHTML = data.content;
			randomQuoteAuthor.innerHTML = `~ ${data.author}`;
		})
		.catch(errorHandler);
}

randomQuote.addEventListener('click', randomQuoteHandler);

function searchHandler() {
	//genreInput.style.textTransform = 'lowercase';
	var inputText = genreInput.value; // taking input
	outputDiv.innerText = '';
	inputText = inputText.toLowerCase();

	// calling server for processing
	fetch(getTranslationURL(inputText))
		.then(response => response.json())
		.then(json => {
			console.log(json);
			if (json.count == 0) {
				alert('No Quotes found for this Tag');
			} else {
				json.results.map(quote => {
					var translatedText = quote.content + '<br/>' + `~ ${quote.author}`;
					outputDiv.innerHTML =
						outputDiv.innerHTML +
						'\n\n' +
						translatedText +
						'<br/><br/><hr style="background-color: darkgray; height: 2px;border: none; max-width:100%"/><br/><br/>';
				});
			}

			// output
		})
		.catch(errorHandler);
}

searchButton.addEventListener('click', searchHandler);

function authorHandler() {
	randomQuoteContent.innerText = '';
	randomQuoteAuthor.innerHTML = '';
	// calling server for processing
	fetch('https://api.quotable.io/authors')
		.then(response => response.json())
		.then(json => {
			console.log(json);
			if (json.count == 0) {
				alert('No Authors Found');
			} else {
				json.results.map(quote => {
					document.getElementById('quote-block').style.display = 'block';
					randomQuoteContent.innerHTML = randomQuoteContent.innerHTML + quote.name + '<br/>';
				});
			}

			// output
		})
		.catch(errorHandler);
}

authorQuote.addEventListener('click', authorHandler);

function tagHandler() {
	var x = 1;
	randomQuoteContent.innerText = '';
	randomQuoteAuthor.innerHTML = '';
	// calling server for processing
	fetch('https://api.quotable.io/tags')
		.then(response => response.json())
		.then(json => {
			console.log(json);

			json.map(quote => {
				document.getElementById('quote-block').style.display = 'block';
				randomQuoteContent.innerHTML =
					randomQuoteContent.innerHTML + quote.name + ` --quotes available ${quote.quoteCount}` + '<br />';
			});

			// output
		})
		.catch(errorHandler);
}

tagsQuote.addEventListener('click', tagHandler);

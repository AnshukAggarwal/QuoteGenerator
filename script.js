(function(){
    //function to get quotes from API
    // function to manipulate HTML

    //get all dom elements
    let loader = document.getElementById('loader');
    let quoteContainer = document.getElementById('quote-container');
    let text = document.getElementById('quote');
    let author = document.getElementById('author');
    let button = document.getElementById('new-quote');

    function loading(){
        loader.hidden = false;
        quoteContainer.hidden= true;
    }

    function doneLoading(){
        if(!loader.hidden){
            quoteContainer.hidden=false
            loader.hidden= true
        }
    }

    async function getQuotes(){
        loading();
        //proxy for cors error
        const proxy ='https://cors-anywhere.herokuapp.com/'
        const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        try {
            const response = await fetch (proxy + url);
            const data = await response.json();
            console.log(data);
            const { quoteText, quoteAuthor} = data;
            text.innerText= quoteText;
			quoteAuthor===""? author.innerText="Unknown" :author.innerText=quoteAuthor;
            
            doneLoading();
        } catch (error) {
            //if there is any error while loading the quote, call the getQuotes function agian.
            getQuotes();
            console.log(error);
        }
    }

    getQuotes();

    //Event Listener
    button.addEventListener('click',getQuotes)
})();
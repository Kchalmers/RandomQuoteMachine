function QuoteGenerator() {
    this.initialize = function () {
        $(".getQuote").click(this.getQuote);
        $(".tweet-quote").click(this.tweet);
    };
    this.getQuote = function() {
        $(".quote").empty();
        $(".author").empty();
        $.ajax({
            url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
            success: function (response) {
                $(".quote").append(response[0].content);
                $(".author").append(`- ${response[0].title}`);
            },
            error: function (response) {
                console.log(response);
            },
            cache: false
        })
    };
    this.tweet = function () {
        let message = $(".quote").text();
        if(message.length + $(".author").text().length + " #freecodecamp".length > 140){
            message = message.split('').slice(0, (136 - (" #freecodecamp".length + $(".author").text().length))).join('');
            message += "... ";
        }
        window.open('https://twitter.com/intent/tweet?hashtags= freecodecamp&text='   + encodeURIComponent(message) + encodeURIComponent($(".author").text()));
    }
}

$(document).ready(function () {
    const quote = new QuoteGenerator();
    quote.getQuote();
    quote.initialize();
});
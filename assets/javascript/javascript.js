// Topics array for buttons
var topics = ['vortex', 'spiral', 'illusion', 'spin', 'trippy', 'art', '3D', 'shiny', 'glow', 'neon', 'uv'];

var newTopic = '';
var x = '';

function populate() {
    // Clear out buttonArea
    $('#buttonArea').empty();

    // Loop through topics and create a button for each one
    for (var i = 0; i < topics.length; i++) {
        $('#buttonArea').append(
            "<button class='btn btn-default default-color-dark z-depth-2 topics animated zoomIn' data-topic='" +
            topics[i] +
            "'>" +
            topics[i] +
            '</button>'
        );
    }
}

// When the search button is clicked...
$('#submit').on('click', function(event) {
    // Prevent the default action of clicking the button
    event.preventDefault();

    // Place the user input into a variable
    newTopic = $('input#search').val();

    // Add the new topic to the topics array
    topics.push(newTopic);

    // Create a button for the new topic
    $('#buttonArea').append(
        "<button class='btn btn-default topics' data-topic='" + newTopic + "'>" + newTopic + '</button>'
    );

    populate();
    gifSearch();
});

function gifSearch() {
    // When a topic button is clicked
    $('.topics').on('click', function(event) {
        // Place the data attribute 'topic' into a variable
        x = $(this).data('topic');

        // Use the 'x' variable to search for the given topic
        var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=jRn11mdWHfSEWcMV1Jil6nXlneEsBTJP&q=' + x + '&limit=10&offset=0&rating=pg-13&lang=en&bundle=clips_grid_picker'
        // var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + x + '&api_key=jRn11mdWHfSEWcMV1Jil6nXlneEsBTJP&limit=10';

        // Make an AJAX request to the queryURLs
        $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
            // Clear out anything that is in the gifarea
            $('#gifarea').empty();

            // For every item returned in the search...
            for (var i = 0; i < response.data.length; i++) {
                // Create variables with elements to contain the incoming response
                var gifDiv = $('<div>');
                var p = $('<p>').text('Rating: ' + response.data[i].rating);

                // set resultgif to an <img> tag
                var resultgif = $('<img class="img-fluid img-thumbnail animated fadeIn">');

                // give the <img> tag a 'src' attribute which is equal to the url
                resultgif.attr('src', response.data[i].images.fixed_height.url);

                // Append the resultgif and rating to the gifDiv
                gifDiv.append(resultgif);
                gifDiv.append(p);

                // Append the gifDiv to the gifArea
                $('#gifarea').append(gifDiv);
            }
        });
    });
}

populate();
gifSearch();

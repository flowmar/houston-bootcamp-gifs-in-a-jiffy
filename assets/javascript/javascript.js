var topics = ["vortex", "spiral", "illusion", "spin", "tripy", "art", "3D" ]
  $('button').on("click", function(){
      var x = $(this).data("animal");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ x + "&api_key=dc6zaTOxFJmzC&limit=10";
      $.ajax({url:queryURL,method:"GET"})
      .done(function(response){
      for(var i=0; i < response.data.length; i++){
        var gifDiv = $('<div>');
        var p = $('<p>').text("Rating: " + response.data[i].rating);
        // set resultgif to an <img> tag
        var resultgif = $('<img>');
        // give the animalImage <img> tag a 'src' attribute which is equal to the url for the fixed_height version of the image
        resultgif.attr('src',response.data[i].images.fixed_height.url);
        gifDiv.append(p);
        gifDiv.append(resultgif);
        $('#gifarea').append(gifDiv);
      }
      })
    })
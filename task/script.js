$('#timezoneBtn').click(function() {
    let latitude = $('#latitude').val();
    let longitude = $('#longitude').val();

    $.ajax({
        url: "php/getTimezoneInfo.php",
        type: 'GET',
        dataType: 'json',
        data: {
            latitude: latitude,
            longitude: longitude
        },
        
        success: function(response) {
            // Extract specific data points from the response
            let time = response.data.time;
            let countryName = response.data.countryName;
            let sunrise = response.data.sunrise;
            let sunset = response.data.sunset;

            // Display the extracted data in HTML tags
            $('#results').html('<p>Time: ' + time + '</p>' +
                '<p>Country Name: ' + countryName + '</p>' +
                '<p>Sunrise: ' + sunrise + '</p>' +
                '<p>Sunset: ' + sunset + '</p>');
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    }); 
});


$('#earthquakeBtn').click(function() {
    let north = $('#north').val();
    let south = $('#south').val();
    let east = $('#east').val();
    let west = $('#west').val();

    $.ajax({
        url: "php/getEarthquakeInfo.php",
        type: 'GET',
        dataType: 'json',
        data: {
            north: north,
            south: south,
            east: east,
            west: west
        },


        success: function(response) {
            let earthquakes = response.data.earthquakes;

            let html = '<ul>';

            earthquakes.forEach(function(earthquake) {
                let dateTime = earthquake.datetime;
                let magnitude = earthquake.magnitude;
                
                html += '<li>' +
                    '<p>Date and Time: ' + dateTime + '</p>' +
                    '<p>Magnitude: ' + magnitude + '</p>' +
                    '</li>';
            });

            html += '</ul>';

            $('#results').html(html);
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    }); 

});

$('#neighbourBtn').click(function() {
    let country = $('#country').val();

    $.ajax({
        url: "php/getNeighbourInfo.php",
        type: 'GET',
        dataType: 'json',
        data: {
            country: country
        },

        success: function(response) {
            let neighbours = response.data.geonames;
            
            let html = "<ul>";
            
            for (let i = 0; i < neighbours.length; i++) {
                let neighbour = neighbours[i];
                let toponymName = neighbour.toponymName;
                let countryName = neighbour.countryName;

                html += "<li>" + 
                            "<p>Country: " + countryName + "</p>" + 
                            "<p>Toponym: " + toponymName + "</p>" +
                        "</li>";
            }
            html += "</ul>";
            
            $('#results').html(html);
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    }); 
});
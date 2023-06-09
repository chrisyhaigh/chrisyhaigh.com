$('#timezoneBtn').click(function() {
    //variables created based on html ID's for both//
    let latitude = $('#latitude').val();
    let longitude = $('#longitude').val();

    $.ajax({
        url: "getTimezoneInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            latitude: latitude,
            longitude: longitude
        },
        
        success: function(response) {
            $('#results').text(JSON.stringify(response));
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
        url: "getEarthquakeInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: north,
            south: south,
            east: east,
            west: west
        },

        success: function(response) {
            $('#results').text(JSON.stringify(response));
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    }); 

});

$('#neighbourBtn').click(function() {
    let country = $('#country').val();

    $.ajax({
        url: "getNeighbourInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: country
        },

        success: function(response) {
            $('#results').text(JSON.stringify(response));
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    }); 

});

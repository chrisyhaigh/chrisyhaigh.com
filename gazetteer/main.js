// Determine latitude/longitude for boundary for map
const southWest = L.latLng(-90, -180);
const northEast = L.latLng(90, 180);
const bounds = L.latLngBounds(southWest, northEast);

// Creates MAP linked to map ID//
const map = L.map('map', {
    maxBounds: bounds,
    maxBoundsViscosity: 5.0
}).setView([55.953251, -3.188267], 13);


// Determine Zoom in/out level & tileProviders. Streets & Satelite//
const streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    minZoom: 2,
}).addTo(map);

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20,
    minZoom: 2,
}).addTo(map);

map.zoomControl.remove();

// Modal Buttons
const zoomInButton = L.easyButton('fa-plus', function(btn, map){
  map.zoomIn();
}).addTo(map);

const zoomOutButton = L.easyButton('fa-minus', function(btn, map){
  map.zoomOut();
}).addTo(map);

const locationButton = L.easyButton("fa-solid fa-location-arrow", function(){
  centerMapCurrentLocation(map);
}).addTo(map);

const countryButton = L.easyButton("fa-globe", function (btn, map) {
  $("#countrymodal").modal("show");
}).addTo(map);

const weatherButton = L.easyButton("<i class='fas fa-cloud-sun'></i>", function(btn, map){
  $("#weathermodal").modal("show");
}).addTo(map);

const currencyButton = L.easyButton("<i class='fas fa-pound-sign'></i>", function(btn, map){
  $("#currencymodal").modal("show");
}).addTo(map);

const wikiButton = L.easyButton("fa-solid fa-info", function(btn, map){
  $("#wikimodal").modal("show");
}).addTo(map);

const newsButton = L.easyButton("fa-regular fa-newspaper", function(btn, map){
  $("#newsmodal").modal("show");
}).addTo(map);



window.addEventListener('load', function(){
document.getElementById('preloader').style.display = 'none';
});


// Weather from Openweather API
function getWeatherFromCoordinates(lat, lng) {

  $.ajax({
    url: 'weather.php',
    type: 'GET',
    dataType: 'json',
    data: {
      lat: lat,
      lng: lng
    },

    success: function(response) {

      const currentWeather = response.data.current;
      const currentDescription = currentWeather.weather[0].description;
      const iconCode = currentWeather.weather[0].icon;
      const temperature = Math.round(currentWeather.temp);
      const forecast = response.data.daily;

      //Icons from Font Awesome
      const weatherIcons = {
        '01d': 'fas fa-sun', // Clear sky - day
        '01n': 'fas fa-moon', // Clear sky - night
        '02d': 'fas fa-cloud-sun', // Few clouds - day
        '02n': 'fas fa-cloud-moon', // Few clouds - night
        '03d': 'fas fa-cloud', // Scattered clouds - day
        '03n': 'fas fa-cloud', // Scattered clouds - night
        '04d': 'fas fa-cloud', // Broken clouds - day
        '04n': 'fas fa-cloud', // Broken clouds - night
        '09d': 'fas fa-cloud-showers-heavy', // Shower rain - day
        '09n': 'fas fa-cloud-showers-heavy', // Shower rain - night
        '10d': 'fas fa-cloud-rain', // Rain - day
        '10n': 'fas fa-cloud-rain', // Rain - night
        '11d': 'fas fa-bolt', // Thunderstorm - day
        '11n': 'fas fa-bolt', // Thunderstorm - night
        '13d': 'fas fa-snowflake', // Snow - day
        '13n': 'fas fa-snowflake', // Snow - night
        '50d': 'fas fa-smog', // Mist - day
        '50n': 'fas fa-smog' // Mist - night
      };
      
      // Display current weather in Weather modal

      const weatherIconClass = weatherIcons[iconCode] || 'fas fa-question'; // Default icon if not found
      const currentWeatherHTML = `<p><i class="${weatherIconClass}"></i> ${currentDescription}, ${temperature} ℃</p>`;

      $('#current-weather').html(currentWeatherHTML);

      // Fetch forecast and build the forecast content string
      let forecastContent = ``;

      forecast.slice(1).forEach((dailyForecast) => {
        const date = new Date(dailyForecast.dt * 1000).toString('ddd MMM dS');
      
        const maxTemp = Math.round(dailyForecast.temp.max);
        const minTemp = Math.round(dailyForecast.temp.min);
        const forecastIconCode = dailyForecast.weather[0].icon;
        const forecastIconClass = weatherIcons[forecastIconCode] || 'fas fa-question'; // Default icon if not found
        const description = dailyForecast.weather[0].description;

        forecastContent += `
          <tr>
            <td>${date}</td>
            <td><i class="${forecastIconClass}"></i></td>
            <td>${description}</td>
            <td>${maxTemp} \u2103</td>
            <td>${minTemp} \u2103</td>
          <tr>`
      });


      $('#weather-table-body').html(forecastContent);

    },

    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error fetching weather data:', jqXHR, textStatus, errorThrown);
    },
  });
}

// Lat/Lng from OpenCage Geocoding API
function getCountryInfoFromCoordinates(lat, lng) {

  $.ajax({
    url: 'getCoordinates.php',
    type: 'GET',
    dataType: 'json',
    data: {
      lat: lat,
      lng: lng
    },

    success: function(response){
      let isoCode = response.iso_a2;

      $('#countryselect').val(isoCode).trigger('change');
      getCountryBorder(isoCode);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error fetching Country Information:', jqXHR, textStatus, errorThrown);
  },
  })
}

// From obtaining coordinates from OpenCage will determine the Users location
function centerMapCurrentLocation(map) {
  if ("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(
      function (position){
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        map.setView([lat, lng], 5);

        getCountryInfoFromCoordinates(lat, lng);
      },
      
      function (error){
        console.log("Error getting current location" + error.message);
      }
    );
  } else {
    console.log("Geolocation not available on this device.");
  }
}

centerMapCurrentLocation(map);

// Populates Select dropdown Menu with list of Countries
$.ajax({
      url: 'countrySelect.php',
      type: 'GET',
      dataType: 'json',

      success: function(response) {
          let options = '';
          
          for (let i = 0; i < response.length; i++) {
              let isoCode = response[i].iso_a2;
              let countryName = response[i].name;
              options += `<option value="${isoCode}" data-country-name="${countryName}">${countryName}</option>`;
          }
          $('#countryselect').html(options);
          console.log(response);
      },

      error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
      },
});

//Country Border geometry and coordinates

let currentBorderLayer = null;

function getCountryBorder(countryCode){

  $.ajax({
      url: "getCountryBorder.php",
      type: "GET",
      dataType: "JSON",
      data: {
          country: countryCode
      },
      

      success: function(response) {

          if (response.length > 0) {
              let coordinates = response[0].geometry;
              let border = L.geoJSON(coordinates, {
                style: function(feature) {
                  return {
                    color: "goldenrod",
                    fillOpacity: 0.5
                  };
                }
              });
              border.addTo(map);
              map.fitBounds(border.getBounds(), { maxZoom: 5 });

              if (currentBorderLayer !== null) {
                map.removeLayer(currentBorderLayer)
              }
              
              currentBorderLayer = border;

              map.fitBounds(border.getBounds());
          }

      },

      error: function(jqXHR, textStatus, errorThrown){
          console.log(jqXHR, textStatus, errorThrown)
      },
  })
};

$('#countryselect').change(function(){
  let countryCode = $(this).val();
  getCountryBorder(countryCode);
});
    
// Country Info Modal
// Extracted Currency Code from API to use as argument for getting the currency converter to function
function getCountryInfo(countryCode) {

  $.ajax({
    url: "countryInfo.php",
    type: "GET",
    dataType: 'json',
    data: {
      country: countryCode,
    },
    success: function(response) {
      console.log('Response', response);

      const country = response.data[0];
      const formattedPopulation = numeral(country.population).format("0,0");


      console.log('Selected Country:', countryCode);
      console.log('Country from Json', country);

      $('#country-name').text(country.name.common);
      $('#country-capital').text(country.capital[0]);
      $('#country-flag-img').attr("src", country.flags.png);
      $('#country-continent').text(country.continents[0]);
      $('#country-population').text(formattedPopulation);
      $('#country-code').text(country.cca2);
  
      const lat = response.data[0].latlng[0];
      const lng = response.data[0].latlng[1];

      getWeatherFromCoordinates(lat, lng);
      fetchNewsData(countryCode);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
}

$('#countryselect').change(function(){
  let selectedCountry = $(this).val();
  getCountryInfo(selectedCountry);
  getCurrencyInfo(selectedCountry);
});

// Sets default value on page load
$(document).ready(function() {
  $('#fromamount').val(1);

  $('#currencymodal').on('hidden.bs.modal', function() {
    $('#toamount').html('');
  });

  $('#exchangerate').on('change', function() {
  const selectedCurrencyCode = $(this).val();
  getCurrencyInfo(selectedCurrencyCode);
  });
});

// Currency Converter Modal
function getCurrencyInfo(selectedCurrencyCode) {

  $.ajax({
    url: 'currency.php',
    type: 'GET',
    dataType: 'json',

    success: function(response){

      const currencies = response.data.rates;
      const exchangeRate = currencies[selectedCurrencyCode];
      const selectDropdown = $('#exchangerate');
      
      for (const currencyCode in currencies) {
        const option = `<option value="${currencyCode}">${currencyCode}</option>`;
        selectDropdown.append(option);
      }
      
      const amount = parseFloat($('#fromamount').val());
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      const formattedConvertedAmount = numeral(convertedAmount).format("0,0.00");
      
      $('#toamount').val(formattedConvertedAmount);
    },

    error: function(jqXHR, textStatus, errorThrown){
      console.log('Error fetching currency code:', jqXHR, textStatus, errorThrown);
    },

  });
}

// Wikpedia Summary Modal
function countryWikiInfo(countryName){

    $.ajax({
      url: "wikiInfo.php",
      type: "GET",
      datatype: 'json',
      data: {
        country: countryName
      },

      success: function(response) {

        let summary = response.summary;
        let fullArticleUrl = response.fullArticleUrl;

        const wikiContent = `<p>${summary}</p>
                             <p><a href="${fullArticleUrl}">Read more....</a></p>`;
      

        $('#country-summary').html(wikiContent);

      },

      error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
      }
  });
};

$('#countryselect').change(function(){
    let selectCountryName = $(this).find(':selected').data('country-name');
    countryWikiInfo(selectCountryName);
});


// News modal 

function fetchNewsData(countryCode) {

  $.ajax({
    url: 'getNewsData.php',
    type: 'GET',
    dataType: 'json',
    data: {
      countryCode: countryCode
    },

    success: function(response){
      const newsData = response.data.results;
      const newsContainer = document.getElementById('newscontainer');

      newsContainer.innerHTML = '';

      for (let i = 0; i < newsData.length; i++) {
        const news = newsData[i];
        const title = news.title;
        const link = news.link;
        const imageUrl = news.image_url;
        const sourceId = news.source_id;

        const newsItemDiv = document.createElement("div");
        newsItemDiv.classList.add("mb-3");

        newsItemDiv.innerHTML = `
                <table class="table table-borderless">
                  <tr>
                    <td rowspan="2" width="50%">
                      <img class="img-fluid rounded fw-bold news-image" src="${imageUrl}">
                    </td>
                    <td>
                      <b>${title}</b><br><br>
                      <a href="${link}" class="fs-6 text-black fw-light" target="_blank">${sourceId}</a>
                    </td>
                  </tr>
                </table>
                <hr>`;

        // Append the news item div to the container
        newsContainer.appendChild(newsItemDiv);
      }

      const newsImages = document.querySelectorAll('.news-image');
      newsImages.forEach(image => {
        image.style.width = '190px';
        image.style.height = '150px'; 
      });
    },

    error: function(jqXHR, textStatus, errorThrown){
      console.log('Error fetching News Data:', jqXHR, textStatus, errorThrown);
    },
  });
};


$('#countryselect').change(function(){
  let selectedCountryName = $(this).find(':selected').data('country-name');
  clearMarkers();
  getOpenCageCoordinates(selectedCountryName);
});

// MarkerClusters
const earthquakeMarkerCluster = L.markerClusterGroup({
  polygonOptions: {
    fillColor: '#fff',
    color: '#000',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
  }}).addTo(map);

const cityMarkerCluster = L.markerClusterGroup({
  polygonOptions: {
    fillColor: '#fff',
    color: '#000',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
  }}).addTo(map);

const wikiMarkerCluster = L.markerClusterGroup({
  polygonOptions: {
    fillColor: '#fff',
    color: '#000',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
  }}).addTo(map);

function clearMarkers() {
  map.removeLayer(earthquakeMarkerCluster);
  map.removeLayer(cityMarkerCluster);
  map.removeLayer(wikiMarkerCluster);
  earthquakeMarkerCluster.clearLayers();
  cityMarkerCluster.clearLayers();
  wikiMarkerCluster.clearLayers();
};

// Get coordinates for the lat/lng bounds for each country

function getOpenCageCoordinates(countryName) {

  $.ajax({
    url: 'getOpenCage.php',
    type: 'GET',
    dataType: 'json',
    data: {
      country: countryName,
    },

    success: function(response) {
      const bounds = response.results[0].bounds;
      
      const north = bounds.northeast.lat;
      const south = bounds.southwest.lat;
      const east = bounds.northeast.lng;
      const west = bounds.southwest.lng;

      const lat = response.results[0].geometry.lat;
      const lng = response.results[0].geometry.lng;

      fetchWikiMarkers(lat, lng);
      fetchEarthquakeMarkers(north, south, east, west);
      fetchCityMarkers(north, south, east, west);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error fetching coordinates:', jqXHR, textStatus, errorThrown);
    },
  });
}

// Earthquake Markers

const earthquakeIcon = L.ExtraMarkers.icon({
  prefix: 'fa',
  icon: 'fa-house-crack',
  markerColor: 'black',
  shape: 'circle'
});


function fetchEarthquakeMarkers(north, south, east, west) {

  $.ajax({
    url: 'getEarthquakes.php',
    type: 'GET',
    dataType: 'json',
    data: {
      north: north,
      south: south,
      east: east,
      west: west,
    },
    success: function(response) {
      

      response.data.forEach(function(earthquake) {
        const formattedDateTime = new Date (earthquake.datetime).toString("d MMMM yyyy, HH:mm");

        const marker = L.marker([earthquake.lat, earthquake.lng], { icon: earthquakeIcon });
        marker.bindTooltip(`Magnitude: ${earthquake.magnitude}<br>${formattedDateTime}`, {direction: 'top', sticky: true});
        
        earthquakeMarkerCluster.addLayer(marker);
      });
      map.addLayer(earthquakeMarkerCluster);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error fetching earthquake data:', jqXHR, textStatus, errorThrown);
    },
  });
}

// Cities Geonames Markers

const cityIcon = L.ExtraMarkers.icon({
  prefix: 'fa',
  icon: 'fa-city',
  markerColor: 'blue',
  shape: 'circle'
});

function fetchCityMarkers(north, south, east, west) {

  $.ajax({
    url: 'getCities.php',
    type: 'GET',
    dataType: 'json',
    data: {
      north: north,
      south: south,
      east: east,
      west: west,
    },

    success: function(response) {

      console.log('City function response:', response);

      const geonames = response.data.geonames;

      geonames.forEach(function(geoname) {
        const marker = L.marker([geoname.lat, geoname.lng], { icon: cityIcon });

        const formattedPopulation = numeral(geoname.population).format("0,0");

        const popUpContent = `<b>${geoname.toponymName}<span> {${formattedPopulation}}</b><br>`

        marker.bindTooltip(popUpContent, {direction: 'top', sticky: true});
        cityMarkerCluster.addLayer(marker);
      });
      map.addLayer(cityMarkerCluster);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error fetching Cities:', jqXHR, textStatus, errorThrown);
    },
  });
}


// Nearby Wikpedia Markers 

const wikiIcon = L.ExtraMarkers.icon({
  prefix: 'fa',
  icon: 'fa-info',
  iconColor: 'black',
  markerColor: 'white',
  shape: 'circle'
});

function fetchWikiMarkers(lat, lng) {
  $.ajax({
    url: 'wikiMarkers.php',
    type: 'GET',
    dataType: 'json',
    data: {
      lat: lat,
      lng: lng,
    },

    success: function(response) {
      const geonames = response.data.geonames;

      geonames.forEach(function(geoname) {
        const marker = L.marker([geoname.lat, geoname.lng], { icon: wikiIcon });

        const popUpContent = `
          <b>${geoname.title}</b><br>
          <p>${geoname.summary}</p><br>
          <p><a href="${geoname.wikipediaUrl}" target="_blank">Wikipedia Link</a><p>`;

        marker.bindPopup(popUpContent, {direction: 'top', sticky: true});
        wikiMarkerCluster.addLayer(marker);
      });

      map.addLayer(wikiMarkerCluster);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error fetching Wiki Markers:', jqXHR, textStatus, errorThrown);
    },
  });
}

// Layer control
const baseMaps = {
  "Streets": streets,
  "Satellite": satellite
};

const overlayMaps = {
  "Wiki": wikiMarkerCluster,
  "EQ": earthquakeMarkerCluster,
  "Cities": cityMarkerCluster
};

const layerControl = L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

map.getBounds(wikiMarkerCluster.getBounds());
map.getBounds(earthquakeMarkerCluster.getBounds());
map.getBounds(cityMarkerCluster.getBounds());

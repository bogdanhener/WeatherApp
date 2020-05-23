$(document).ready(function(){

    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            displayCity();
        }
    });

    $('#submitCity').click(function(){
     displayCity();
    });
});

function displayCity(){
    let city = $('#city').val();
     
      if(city != ""){
             $.ajax({
                 url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=19badfd866d42c91f3be8356564fbb15`,
                 type: 'GET',
                 dataType: 'jsonp',
                 success: function(data){
                    let widget = getCity(data);
                     $('#displayCity').html(widget);
                     $('#city').val('');
                  }
             });
         } else {
         $('#error').html('Field cannot be empty ')
        }
}


function getCity(data){
    
    return `
            <h3 id='name'>Current Weather for ${data.name}, ${data.sys.country}</h3>
            <p id="description">Description:<img id='image' src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"> ${data.weather[0].description}</p>
            <p id="temp">Temperature: ${data.main.temp} °C</p>
            <p id="feelsLike">Feels like: ${data.main.feels_like} °C</p>
            <p id="presure">Pressure: ${data.main.pressure} hPa</p>
            <p id="humidity">Humidity: ${data.main.humidity}%</p>
            `
}
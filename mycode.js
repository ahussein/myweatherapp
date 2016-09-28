var service_api_url = "http://api.openweathermap.org/data/2.5/find?"
var key = "41059037f6074e07457c46f023205648"
$(document).on("click", "#refresh", function(event){
    event.preventDefault 
   // get current location
   navigator.geolocation.getCurrentPosition(function(position){
//      alert("lat:" + position.coords.latitude+ " long: " + position.coords.longitude); 
       PopulateList(position.coords.latitude, position.coords.longitude)
   });
});


function PopulateList(lat, lon){
    var call_string = service_api_url+"appid="+ key+"&lat=" + lat + "&lon=" + lon + "&cnt=20&units=mertic";
    console.log(call_string)
    $.getJSON(call_string, function(data){
       console.log(data)
       stations = data.list
       // empty the list
       $('#list').empty()
       $.each(stations, function(index, station){
//           var li = "<li><a id=to_details href='details.html?id=" + station.id + "'" +  ">" + station.name  + "<span id=" + index +" class='ui-li-count'>"+ station.main.temp +"</span></a></li>"
           var li = "<li><a id=to_details href='#'>" + station.name  + "<span id=" + index +" class='ui-li-count'>"+ station.main.temp +"</span></a></li>"
           console.log(li)
//           li = "<li>" + station.name + "</li>"
          $('#list').append(li) 
       });
    });
    $("#list").listview("refresh");
}


$(document).on("pagebeforeshow", "#home", function(){
    $(document).on("click", "#to_details", function(event){
        event.preventDefault;
        // store selected station
        currentStation = stations[event.target.children[0].id];
        
        // change page
        $.mobile.changePage("#details")
    });
});

$(document).on("pagebeforeshow", "#home", function(){
    $(document).on("click", "#details", function(event){
        event.preventDefault;
        
        $("#stationIcon").attr("src", "http://openweathermap.org/img/w/" + currentStation.weather[0].icon + ".png")
        $("#stationName").text(currentStation.name);
        $("#stationDescripiton").text(currentStation.weather[0].description);
        $("#stationTemp").text("Temperature: "+ currentStation.main.temp);
        $("#stationHumidity").text("Humidity: " + currentStation.main.humidity + "%");
        $("#stationPressure").text("Pressure: " + currentStation.main.pressure);
        
    });
});
var $map_out = $("#map_out");  // The container for the map
var map;  //  The Actual map it's self
var $directions_out = $("#directions_out")/*.get(0)*/;
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = null;
var mapStyles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
var user_position;
var default_position = new google.maps.LatLng(49.281947, -123.121167);
var $loader = $("#loader");
var userMarker;
var places;


console.log("Lets get started!  Where's the craft at??")
console.log("Getting user location.");
getLocation() // This allows me to load the map only once the users location hase been given.

/**
 * Request user location, when received, called setPosition to actually set it
 */
function getLocation() {
    var geo_options = {
        enableHighAccuracy: true, 
        maximumAge        : 30000, 
        timeout           : 27000
    };
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position){init(position)}, // If location is recieve then use it
                                                 function(){init(default_position)}, // This means it failed, use default
                                                 geo_options); 
	} else { 
	   console.log("Geolocation is not supported by this browser.  Use default."); // this means it's not supported
	}
}

var init = function initiate(position) {
    try{
        if (position && position.coords) {
            console.log("setPosition:");
            console.log("\tUsers Lat: " + position.coords.latitude );
            console.log("\tUsers Long: " + position.coords.longitude );
            user_position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        }
        
        // if user_position didn't get set, use default_position
        if (!user_position) {
            user_position = default_position;
        }
        console.log("Positions set, current state is:");
        console.log("\tUser Location: " + user_position);
        console.log("\tDefault User Location: " + default_position);
        
        showHideLoader();
        //wait two seconds for showHideLoader to complete
        // this seems wrong that i delay one but not the other.
        // Feels like I should be passing in a delay for both.  Then it's
        // obvious to the reader when reading those two calls...er more obvs...
        setTimeout(function(){ showHideMap(); }, 2000);
        
        // Retrieve the places around the user
        setTimeout(function() { getPlaces(); }, 2000);
        
    } catch (e) {
      console.log("Initializing map failed: " + e);
    }

}

// Retrieve all Places around user

function getPlaces() {
    console.log("Getting Places")
    // Search params
    var request = {
        location: user_position,
        radius: 1000,
        //types: ['beer', 'pub', 'craft']
        types: ['restaurant']
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    console.log("\tStarting search fr Places...");
    service.nearbySearch(request, callback);
    console.log("\tSearch completed.");
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        places = results;
        console.log("\t" + results.length + " results were returned.");
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    } else {
        console.log("Places search failed: " + status);
    }
    console.log("Callback complete.  All Places markers created");
}

function createMarker(place) {
    //console.log("Creating marker for " + place.name);
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        icon: 'http://www.google.com/mapfiles/kml/paddle/grn-circle.png',
        map: map,
        position: place.geometry.location
    });
    //console.log("Adding 'click' eventListener on marker.");
    google.maps.event.addListener(marker, 'click', function() {
        var content = "<html><body>\
                        <div><h3>" + place.name + "</h3></div>\
                        <div>\
                        <button onclick=\"getDirections('" + place.place_id + "')\">Directions</button>\
                        </div>\
                        <body></html>"
        infowindow.setContent(content);
        infowindow.open(map, this);
    });
}


/**
 * Create and fade in the map
 */
function showHideMap(){
	//$map_out.hide();
    mapOptions = {
            zoom: 14,
            center: user_position,
            styles: mapStyles
        };
    map = new google.maps.Map($map_out[0], mapOptions);
    
	console.log("Showing Map.");
	//$map_out.fadeIn(1000, function(){ $map_out.show() });
    setTimeout(function(){ loadUserMarker() }, 3000);
    
}

function loadUserMarker() {
    userMarker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        draggable: false,
        position: user_position,
        icon: 'http://www.google.com/mapfiles/kml/paddle/blu-diamond.png',
        map: map,
        title: "YOU ARE HERE"
        });
}


/**
 * Load directions for the selected point
 */
function getDirections(place_id){
	console.log("Getting directions.");
	//e.preventDefault();
	
    var place = getPlaceByID(place_id);
    
    if (place == null) {
        alert("Directions are totally broken.  You should probably reload the page");
        return;
    }
    
    if(directionsRenderer != null){
        directionsRenderer.setMap(null);
        directionsRenderer.setPanel(null);
    };

    // set start point "user_position"
    
    // set desitination, this.location? since it's being run on a point click?	
	
	directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.setMap(map);
	directionsRenderer.setPanel($directions_out.get(0));
	var request = {
		origin: user_position,
		destination: place.geometry.location,
		travelMode: google.maps.TravelMode.WALKING
	};
	directionsService.route(request, function(result, status){
		if(status == google.maps.DirectionsStatus.OK){
			directionsRenderer.setDirections(result);	
		}else {
			alert('Directions Service was not successful for the following reason: ' + status);
		}	
	}); // end directionsService.route function	
	console.log("Directions retrieved.");
    
    // XXX This is bad new bears.  Def shouldn't be doing this manually
    // This will break any kind of reflow I do with media queries.
    $map_out.addClass('show_directions');
    $directions_out.addClass('show_directions');
}// end click event handler


function getPlaceByID(place_id) {
    for (var i = 0; i < places.length; ++i) {
        if (places[i].place_id == place_id) {
            return places[i]
        }
    }
    return nulls;
}


// Show or hide loading div based on it's current display state.
function showHideLoader() {
	console.log("$loader display state: " + $loader.css("display"));
	if ($loader.css("display") != "none") {
        console.log("Hiding loader.");
        $loader.fadeOut(1000, function(){
            $loader.hide()
        })
	} else {
		console.log("Showing loader.")
		$loader.fadeIn(500, function(){ $loader.show()});
	}
}

/**
 * LOAD SPINNER START
 */
// These are the options used for the load spinner.
var opts = {
  lines: 12, // The number of lines to draw
  length: 15, // The length of each line
  width: 6, // The line thickness
  radius: 20, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#fff', // #rgb or #rrggbb or array of colors
  speed: 2.2, // Rounds per second
  trail: 10, // Afterglow percentage
  shadow: true, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};
var target = document.getElementById('loader');
try{
    var spinner = new Spinner(opts).spin(target);
} catch(e){
    console.log("Loading spinner failed: ERROR: " + e);
}
/**
 * LOAD SPINNER END
 */
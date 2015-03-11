var $map_out = $("#map_out");  // The container for the map
var map;  //  The Actual map it's self
var mapStyles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
var user_position;
var default_position = new google.maps.LatLng(49.281947, -123.121167);
var $loader = $("#loader");
var $spinner = $("#load_spinner");

var opts = {
  lines: 20, // The number of lines to draw
  length: 15, // The length of each line
  width: 6, // The line thickness
  radius: 40, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#fff', // #rgb or #rrggbb or array of colors
  speed: 2.2, // Rounds per second
  trail: 10, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};
var target = document.getElementById('load_spinner');
var spinner = new Spinner(opts).spin(target);

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
        if (position && position.coords && position.coords.coords) {
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
        
        mapOptions = {
            zoom: 15,
            center: user_position,
            styles: mapStyles
        }
        showHideLoader();
        //wait two seconds for showHideLoader to complete
        // this seems wrong that i delay one but not the other.
        // Feels like I should be passing in a delay for both.  Then it's
        // obvious to the reader when reading those two calls...er more obvs...
        setTimeout(function(){ showHideMap() }, 2000);
    } catch (e) {
      console.log("Initializing map failed: " + e);
    }

}


/**
 * Create and fade in the map
 */
function showHideMap(){
	$map_out.hide();
	map = new google.maps.Map($map_out[0], mapOptions);
	console.log("Showing Map.")
	$map_out.fadeIn(1000, function(){ $map_out.show()});
}

// Show or hide loading div based on it's current display state.
function showHideLoader() {
	console.log("$loader display state: " + $loader.css("display"));
	if ($loader.css("display") != "none") {
	  console.log("Hiding loader.");
	  $spinner.fadeOut(1000, function(){
		$spinner.hide();
		$loader.fadeOut(1000, function(){
		  $loader.hide()
		  })
		});
	} else {
		console.log("Showing loader.")
		$loader.fadeIn(500, function(){ $loader.show()});
	}
}
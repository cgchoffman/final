Project Outline
===============
###Beer Finder
A quick way to locate the closest craft brew pub to your current location.
####Features
___ 
- Find all Craft beer locations within walking distance
  - 20 blocks (this can be negotiated)
  - Should start within X number of blocks and allowe user to expand search and
  trigging the mapping event to recur
- Map route to location

####Feature OverView & References
A high level description of the tools to use in this project.
- Use [Google Places API][1] to search for locations
- Use [Google direction API][2] to route to the location
- For UI design use [bootstrap][3] and/or [Google material design][4] 
- Week 7 is the Google API week.  Lots of sample code there.

#### Fine Grain Outline
Describe in more detail, the workflow and usage of the application and how/when
the tools above will be used there.
- Screenloads and asks for users location                                   **DONE**
- when location is given, load map                                          **DONE**
  - If user doesn't allow geolocation, tell user to select start location   *will use search bar for this*
- place user marker https://developers.google.com/maps/documentation/javascript/reference#Marker    **DONE**
- place beer location markers one at a time (unless it's super slow, then just
as fast as you can)

####User Marker Options **DONE**
- animation: DROP **DONE**
- draggable: true (but only if I can get it to update directions when dropped) **DONE BUT NOT USED**
- \*position:
- map:
- title: "YOU ARE HERE" **Used Icons for this**
- zIndex: (higher than all the others)

####Places Marker
- [Search Sample][plc-srch]
- [Sample where places marker is set][mark-place]
- [Marker Icons][google-marker-ref]
```Javascript
// Placing Place marker on the map, sample
 var request = {
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
  };

  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  service.getDetails(request, function(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
  });
```


####Map listeners
  AKA   google.maps.event.addListener(THING, event, WhatyouWannaDo?);
  https://developers.google.com/maps/documentation/javascript/examples/marker-animations
```javascript
 google.maps.event.addListener(marker, 'click', toggleBounce);

function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
```
- onResize
 - reload beer locations and display any that should be on the map
- onclick (of location)
 -  map route from person

###TO-DOs

- Creat map with user location as centre                        **ADDED**
- add marker where user is or default location.                 **ADDED**
- directions                                                    **ADDED**
 - change marker onclick event to add html content that         **ADDED**
  displays info about place and adds a *Directions* button.
  - Remove directions button when directions are shown for
    that location
- Re-skin the entire thing and fix flow                         **DONE**
- Allow dismiss directions
 - must bring back markers
- re-do marker search if centre of map changes
- Allow user to select a location as their location
 - maybe a onfail function in the getLocation function that alerts user to choose locations
 - once location is chosen THEN places search occurs
- use Google search input to allow user to enter address.
- Retrieve more information about location to populate InfoWindow

###ISSUES

####Location

- user_position isn't saving                                    **FIXED**
- Figure out why location isn't being loaded in google maps     **FIXED**
- trigger map load after location request dismissed positively. **FIXED**
 - marker isn't loading, probably too soon after map load       **FIXED**
  - need to make it load after the map finishes loading          **FIXED**
- Chrome doesn't ask for location (force location request?)
 - force request by checking if pref set
 - ask user to choose location
 - Save location as html5 savestuff feature so on Chrome when it reloads it will use that.
- Doesn't load users location everytime if it doesn't ask for it every time 
 - Add error logging when the request for position fails
 - Doesn't load user location properly on mobile
 
####Directions

- loads off screen
- should hide all markers
 - should save those markers to be able to bring them back

---

####Nice to haves
- Give option for user to choose location at any time
- use watchPoisition instead of getPosition and update user position as it gets more accurate
- show beer stores too
- Load information about locations (html templates for all known locations)

[1]:https://developers.google.com/places/documentation/
[2]:https://developers.google.com/maps/documentation/directions/
[3]:http://getbootstrap.com/customize/
[4]:http://www.google.com/design/spec/material-design/introduction.html#
[plc-srch]:https://developers.google.com/maps/documentation/javascript/examples/place-search
[mark-place]:https://developers.google.com/maps/documentation/javascript/examples/place-details
[google-marker-ref][https://sites.google.com/site/gmapsdevelopment/]
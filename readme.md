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
- Screenloads and asks for users location
- when location is given, load map
  - If user doesn't allow geolocation, tell user to select start location
- place user marker https://developers.google.com/maps/documentation/javascript/reference#Marker    
- place beer location markers one at a time (unless it's super slow, then jsut
as fast as you can)

####User Marker Options
- animation: DROP
- draggable: true (but only if I can get it to update directions when dropped)
- \*position:
- map:
- title: "YOU ARE HERE"
- zIndex: (higher than all the others)


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

###ISSUES
- Figure out why location isn't being loaded in google maps     **FIXED**
- trigger map load after location request dismissed positively. **FIXED**
- add marker where user is or default location.                 **ADDED**
 - marker isn't loading, probably too soon after map load       **FIXED**
 - need to make it load after the map finishes loading          **FIXED**
- user_position isn't saving
- Chrome doesn't askd for location (force location request?)
 - force request by checking if pref set
 - ask user to choose location
 - Save location as html5 savestuff feature so on Chrome when it reloads it will use that.
- Doesn't load users location everytime if it doesn't ask for it every time
 - Add error logging when the request for position fails
 - Doesn't load user location properly on mobile

####Nice to haves
- Give option for user to choose location at any time
- show beer stores too
- Load information about locations (html templates for all known locations)

[1]:https://developers.google.com/places/documentation/
[2]:https://developers.google.com/maps/documentation/directions/
[3]:http://getbootstrap.com/customize/
[4]:http://www.google.com/design/spec/material-design/introduction.html#
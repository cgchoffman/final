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


####Map listeners
- onResize
 - reload beer locations and display any that should be on the map
- onclick (of location)
 -  map route from person

###ISSUES
- Figure out why location isn't being loaded in google maps
- trigger map load after location request dismissed positively.
- add marker where user is or default location.
-  

####Nice to haves
- Give option for user to choose location at any time
- show beer stores too
- Load information about locations (html templates for all known locations)

[1]:https://developers.google.com/places/documentation/
[2]:https://developers.google.com/maps/documentation/directions/
[3]:http://getbootstrap.com/customize/
[4]:http://www.google.com/design/spec/material-design/introduction.html#
google.maps.visualRefresh = true;

var MapsLib = MapsLib || {};
var MapsLib = {
	fusionTableId:      "1pyjp2Rh--hl2U7dGtee2wux8wTSvcfjoM3xjOHom",
	googleApiKey:       "AIzaSyDEPOBqIHuibz0xfFhbVD1mjvMXzMJEh-4",
	
	locationColumn:     "Latitude",
	
	map_centroid:       new google.maps.LatLng(59.329323, 18.068581), //center of the map
  	locationScope:      "stockholm",      //geographical area appended to all address searches
  	recordName:         "Listing",       //for showing number of results
  	recordNamePlural:   "Listings",		//the name that is shown on map

  	searchRadius:       805,            //in meters ~ 1/2 mile
  	defaultZoom:        11,             //zoom level when map is loaded (bigger is more zoomed in)
  	addrMarkerImage:    'images/blue-pushpin.png',
  	currentPinpoint:    null,

  	initialize: function() {
    $( "#result_count" ).html("");

    geocoder = new google.maps.Geocoder();
    var myOptions = {
      zoom: MapsLib.defaultZoom,
      center: MapsLib.map_centroid,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map($("#map_canvas")[0],myOptions);

    // maintains map centerpoint for responsive design
    google.maps.event.addDomListener(map, 'idle', function() {
        MapsLib.calculateCenter();
    });

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(MapsLib.map_centroid);
    });

    MapsLib.searchrecords = null;

    
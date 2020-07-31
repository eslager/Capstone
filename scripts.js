var map = L.map('map',{zoomControl:false}).setView([47.207404, -121.507328], 11);
var zoomHome = L.Control.zoomHome();
  zoomHome.addTo(map);

// water surface, light blue
var waterPoly= L.layerGroup()

$.getJSON("WatersEdge.geojson",function (waterEdge) {
  L.geoJson (waterEdge, {
    style: function(feature){
      return {
        color: '#3399ff',
        fillOpacity: 0.5,
        weight: 1,
      }
    },
    onEachFeature: function (feature, layer){
      waterPoly.addLayer(layer)
    },
  }).addTo(map);
});

//Thalweg, dark blue
var thalwegAll = L.layerGroup().addTo(map)
$.getJSON("All_Thalweg.geojson",function (allThalweg) {
  L.geoJson (allThalweg, {
    style: function(feature){
      return {
        color: '#001a33',
        weight: 3,
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
        thalwegAll.addLayer(layer)
    },
  })//.addTo(map);
});

//wet channel xs, dark blue
var wetChannel = L.layerGroup().addTo(map)
$.getJSON("WetChanXS.geojson",function (wetChan) {
  L.geoJson (wetChan, {
    style: function(feature){
      return {
        color: '#003366',
        weight: 1,
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
      wetChannel.addLayer(layer)
    },
  })//.addTo(map);
});

//bankfull Surveys, dark blue
var bankfull = L.layerGroup().addTo(map)

$.getJSON("BFXS.geojson",function (bfxs) {
  L.geoJson (bfxs, {
    style: function(feature){
      return {
        color: '#003366',
        weight: 1,
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
      bankfull.addLayer(layer)
    },
  })//.addTo(map);
});

//Large Channel Habitat, styled by shades of blue
var largeHab = 
$.getJSON("LargeChanHab1718.geojson",function (largeChan) {
  L.geoJson (largeChan, {
    style: function(feature){
      var color,
        type = feature.properties.UnitTyp;
      if ( type === "RI" ) color = '#668cff';
      else if ( type === 'CA' ) color = '#1a53ff';
      else if ( type === 'GL' ) color = '#002080';
      else if ( type === 'RU' ) color = '#0033cc';
      else color === '#FFFFFF';
      return {weight: 2, color: color, fillOpacity: 1 };

      },

      onEachFeature: function( feature, layer ){
        layer.bindPopup( feature.properties.UnitTyp + " type channel" )
      }
  })//.addTo(map);
});

//SideChannel habitat, Style by habitat type gren to red
var sideHab = $.getJSON("SideChanHab1718.geojson",function (sideChan) {
  L.geoJson (sideChan, {
    style: function(feature){
      var color,
        type = feature.properties.ChannelTyp;
      if ( type === "D" ) color = '#990000';
      else if ( type === 'I' ) color = '#e68a00';
      else if ( type === 'F' ) color = '#00802b';
      else color === '#FFFFFF';
      return {weight: 2, color: color, fillOpacity: 1 };

      },

      onEachFeature: function( feature, layer ){
        layer.bindPopup( feature.properties.ChannelTyp + " type channel" )
      }
  })//.addTo(map);
});

//BF survey points, Dark green
var bankfullMark = {
  radius: 3,
  fillColor: "#006600",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

var bfPoints = $.getJSON("BFSurveyPts.geojson",function (bankXS) {
  L.geoJson (bankXS, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, bankfullMark )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Canopy cover: " + feature.properties.CanopyClos + "</p>" + "<p>Bankfull width: " + feature.properties.BankfullWi + "</p>" + "<p>Wetted width: " + feature.properties.WettedWidt + "</p>")
      }
    })//.addTo(map);
});

//Regular Jams, Use conditional styling to refelct size of the jam, default dark brown

//Regular Jams, Use conditional styling to refelct size of the jam, default dark brown


var regJams = $.getJSON("Jams1718.geojson",function (jams) {
  L.geoJson (jams, {
    pointToLayer: function (feature, latlng) {
      var radius;
        var size = feature.properties.JamSize;
      if ( size === "Small" ) {radius = 4}
      else if ( size === 'Medium' ) {radius = 6}
      else if ( size === 'Large' ) {radius = 8}
      else {radius = 2};

      var defaultMark = {
        radius: radius,
        fillColor: "#604020",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      };

      return L.circleMarker(latlng, defaultMark)
  },

      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Jam size: " + feature.properties.JamSize + "</p>" +
                           "<p>Jam type: " + feature.properties.JamType + "</p>")
        },
      }).addTo(map);
      // layerControl.addOverlay(regJams, "Jams")
    });

// var regJams = $.getJSON("Jams1718.geojson",function (jams) {
//   L.geoJson (jams, {
//     pointToLayer: function (feature, latlng) {
//       var radius;
//         var size = feature.properties.JamSize;
//           if ( size === "Small" ) {radius = 5}
//           else if ( size === 'Medium' ) {radius = 10}
//           else if ( size === 'Large' ) {radius = 15}
//           else {radius = 1};
//
//       var defaultMark = {
//         radius: radius,
//         fillColor: "#604020",
//         color: "#000",
//         weight: 1,
//         opacity: 1,
//         fillOpacity: 0.8,
//       };
//       return L.circleMarker(latlng, defaultMark)
//     },
//     onEachFeature: function( feature, layer ){
//           layer.bindPopup( "<p>This is a " + feature.properties.JamSize + " sized jam</p>" + "<p>It is a " + feature.properties.JamType + " type of jam</p>")
//         },
//
//       }).addTo(map);
//     });

//Marked Wood, medium brown
var wood = {
  radius: 5,
  fillColor: "#996633",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

var markWood = $.getJSON("MarkedWood1718.geojson",function (mWood) {
  L.geoJson (mWood, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, wood )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Wood size: " + feature.properties.WoodSize + "</p>")
      }
    })//.addTo(map);
});

//Engineered Log Jams, black, style by size eventually
var eljMark = {
  radius: 5,
  fillColor: "#000000",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

var engJams= $.getJSON("ELJs.geojson",function (eljam) {
  L.geoJson (eljam, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, eljMark )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>This is a " + feature.properties.JamSize + " sized jam</p>")
      }
    })//.addTo(map);
});

//ILWD, light brown
var ilwdMark= {
  radius: 3,
  fillColor: "#d9b38c",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

var ilwdLayer = $.getJSON("ILWD1718.geojson",function (ilwd) {
  L.geoJson (ilwd, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, ilwdMark )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Wood size: " + feature.properties.WoodSize + " </p>")
      }
    })//.addTo(map);
});
//Pebble Counts, dark gray
var pebbleMark= {
  radius: 3,
  fillColor: "#4d4d4d",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};
var pebbleCount = $.getJSON("PebbleCount1718.geojson",function (pebcnt) {
  L.geoJson (pebcnt, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, pebbleMark )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Counts for D80: " + feature.properties.D80 + " </p>")
      }
    })//.addTo(map);
});

//Pools, shades of blue
var poolPoly = $.getJSON("Pools1718.geojson",function (pools1718) {
  L.geoJson (pools1718, {
    style: function(feature){
      var fillColor,
        depth = feature.properties.PoolMaxDep;
      if ( depth => '6' ) fillColor = '#7d8bb8';
      else if ( depth => '12' ) fillColor = '#5265a1';
      else if ( depth =>'20' ) fillColor = '#273f8a';
      else fillColor === '#FFFFFF';
      return {weight: 2, fillColor: fillColor, fillOpacity: 1 };

      },

      onEachFeature: function( feature, layer ){
        layer.bindPopup( "<p>Max depth is: " + feature.properties.PoolMaxDep + " </p>")
      }
  })//.addTo(map);
});




//Basemaps
var layer = L.esri.basemapLayer('Topographic').addTo(map);
var layerLabels;

function setBasemap (basemap) {
  if (layer) {
    map.removeLayer(layer);
  }

  layer = L.esri.basemapLayer(basemap);

  map.addLayer(layer);

  if (layerLabels) {
    map.removeLayer(layerLabels);
  }

  if (
    basemap === 'ShadedRelief' ||
    basemap === 'Oceans' ||
    basemap === 'Gray' ||
    basemap === 'DarkGray' ||
    basemap === 'Terrain'
  ) {
    layerLabels = L.esri.basemapLayer(basemap + 'Labels');
    map.addLayer(layerLabels);
  } else if (basemap.includes('Imagery')) {
    layerLabels = L.esri.basemapLayer('ImageryLabels');
    map.addLayer(layerLabels);
  }
}

document
  .querySelector('#basemaps')
  .addEventListener('change', function (e) {
    var basemap = e.target.value;
    setBasemap(basemap);
  });

//Geocoder
var osmGeocoder = new L.Control.OSMGeocoder();
map.addControl(osmGeocoder);


//Layer controls from https://github.com/davicustodio/Leaflet.StyledLayerControl
var overlays = [
					 {
						groupName : "Field Surveys",
						expanded  : true,
						layers    : {
							"Pebble counts" : pebbleCount,
              "ELJs" : engJams,
              "ILWD" : ilwdLayer,
              "Marked wood" : markWood,
              "Jams" : regJams,
              "Large channel habitat" : largeHab,
              "Side channel habitat" : sideHab,
              "Wet channel cross sections" : wetChannel,
              "Bankfull survey cross sections" : bankfull,
              "Bankfull points data": bfPoints,
              "Pools" : poolPoly,
						}
					 },
           {
            groupName : "LiDAR Derived Data",
            expanded  : true,
            layers    : {
              "Water Surface" : waterPoly,
              "River Thalweg" : thalwegAll,
            }
           },
         ];

      pebbleCount.StyledLayerControl = {
     	removable : true,
     	visible : false,

     	}
      engJams.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      ilwdLayer.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      markWood.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      regJams.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      largeHab.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      sideHab.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      wetChannel.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      bankfull.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      bfPoints.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      poolPoly.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      waterPoly.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      thalwegAll.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
var options = {
  container_width 	: "300px",
  container_maxHeight : "350px",
  group_maxHeight     : "80px",
  exclusive       	: false
};

var Legend =  new L.Control.Legend({
        position: 'bottomleft',
        collapsed: true,
        controlButton: {
            title: "Legend"
        }
});

map.addControl(Legend);

$(".legend-container").append( $("#legend") );
$(".legend-toggle").append( "<i class='legend-toggle-icon fa fa-info-circle fa-2x' style='color: #000'></i>" );


var control = L.Control.styledLayerControl(null, overlays, options);
map.addControl(control);

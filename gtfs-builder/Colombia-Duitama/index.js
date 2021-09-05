const { osmToGeojson, OSMOverpassDownloader } = require('osm-public-transport-export')
const geojsonToGtfs = require('geojson-to-gtfs');
const path = require("path")

// left=-73.104656 bottom=5.755485 right=-72.9504 top=5.877577
osmToGeojson({
    outputDir: __dirname,
    mapProperties: (tags) => ({
        ...tags,
        stroke: '#164154',
        "stroke-width": 5,
    }),
    stopNameSeparator: ' y ',
    stopNameFallback: 'innominada',
    osmDataGetter: new OSMOverpassDownloader({
        south: 5.755485,
        west: -73.104656,
        north: 5.877577,
        east: -72.9504,
    })
}).then(() => {
    return geojsonToGtfs(
        path.join(__dirname, 'routes.geojson'),
        path.join(__dirname, 'stops.json'),
        path.join(__dirname, 'gtfs.zip')
    );
}).catch(error => console.error(error))

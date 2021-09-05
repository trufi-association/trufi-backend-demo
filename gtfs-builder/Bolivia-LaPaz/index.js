const { osmToGeojson, OSMOverpassDownloader } = require('osm-public-transport-export')
const geojsonToGtfs = require('geojson-to-gtfs');
const path = require("path")

// left=-68.339605 bottom=-16.674309 right=-68.037243 top=-16.416209
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
        south: -16.674309,
        west: -68.339605,
        north: -16.416209,
        east: -68.037243,
    })
}).then(() => {
    return geojsonToGtfs(
        path.join(__dirname, 'routes.geojson'),
        path.join(__dirname, 'stops.json'),
        path.join(__dirname, 'gtfs.zip')
    );
}).catch(error => console.error(error))

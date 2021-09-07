const { osmToGeojson, OSMOverpassDownloader } = require('osm-public-transport-export')
const geojsonToGtfs = require('geojson-to-gtfs');
const path = require("path")

//left=-72.451965 bottom=5.285093 right=-72.329208 top=5.37982

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
        south: 5.285093,
        west: -72.451965,
        north: 5.37982,
        east: -72.329208,
    })
}).then(() => {
    return geojsonToGtfs(
        path.join(__dirname, 'routes.geojson'),
        path.join(__dirname, 'stops.json'),
        path.join(__dirname, 'gtfs.zip')
    );
}).catch(error => console.error(error))

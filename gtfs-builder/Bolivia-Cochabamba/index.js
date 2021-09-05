const { osmToGeojson, OSMOverpassDownloader } = require('osm-public-transport-export')
const geojsonToGtfs = require('geojson-to-gtfs');
const fs = require("fs")
const path = require("path")

// bottom=-17.709721 left=-66.440262 top=-17.261759 right=-65.577835
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
        south: -17.709721,
        west: -66.440262,
        north: -17.261759,
        east: -65.577835,
    })
}).then(() => {
    return geojsonToGtfs(
        path.join(__dirname, 'routes.geojson'),
        path.join(__dirname, 'stops.json'),
        path.join(__dirname, 'gtfs.zip')
    );
}).then(() => fs.writeFileSync(
    path.join(__dirname, '/../../graphs/Bolivia-Cochabamba/cochabamba.gtfs.zip'),
    fs.readFileSync(path.join(__dirname, 'gtfs.zip')
    )
)).catch(error => console.error(error))

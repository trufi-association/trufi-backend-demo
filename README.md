# Trufi-Backend DEMO
## Create your city folder
- Create your city folder inside `./graphs` with next format `Country-City`
## Find bbox
- Go to https://boundingbox.klokantech.com/ 
- Bound the area
- Change bbox type to `dublinCore`
- Save the `bbox` somewhere

## Extract pbf
- Go to https://download.geofabrik.de/
- Download an `osm.pbf` file from your city
- if not exist yet your city, you can download the `osm.pbf` from your country
  - Download from `osmosis` https://github.com/openstreetmap/osmosis/tags
  - Add to your `PATH` the `/bin` folder
  - Run the command ```osmosis --read-pbf file="./country-latest.osm.pbf"  --bounding-box left=bbox_left bottom=bbox_bottom right=bbox_bottom top=bbox_bottom --write-pbf file="./city-latest.osm.pbf" ```
- Copy the `osm.pbf` file into your city folder

## Generate GTFS file
- Clone(copy-paste) some city from `gtfs-builder/Country-City`
- Replace the bounds with your city `bbox` in the line 5 and 16-19 inside `gtfs-builder/Country-City/index.js` (top=north, bottom=south ...)
- Add a new run script into line 6 inside the file `gtfs-builder/package.json` with the next format `node ./Country-City/index.js`
- Run your script `npm run Country-City` inside the `gtfs-builder` folder
- Copy the `gtfs.zip` file into your city folder

## Run OTP
- Build the Docker image `docker build -t trufi-demo .`
- Run the demo `docker run  -v {{abosolute path of Country-City}}:/app/graphs -p 8080:8080 -p 8081:8081 trufi-demo`
- Open in your browser http://localhost:8080/
- `optional` if you want you can add your city into `docker-compose.yml` following the examples

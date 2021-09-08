const request = require('request');

const geoCode = (address, callback) => {
    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3ViaGFtLTA1NTgiLCJhIjoiY2tzd3VpZ3BhMDZjbTJ1cDJzODhoNjFyZiJ9.9t0EX3d14oioYQiHRknqbw&limit=1`;
  
    request({ url: geoCodeUrl, json: true}, (error, response) => {
      if(error) {
        callback('Unable to connect', undefined);
      } else if(response.body.features.length === 0) {
        callback('Error in the Location', undefined); 
      } else {
        callback(undefined, {
          latitude: response.body.features[0].center[1],
          longitude: response.body.features[0].center[0],
          location: response.body.features[0].place_name
        })
      }
    })
  };

  module.exports = geoCode;
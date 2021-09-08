const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=224ce0c27e2f2c9b0b0931e27fbe9fd8&query=${latitude},${longitude}&units=f`;
 
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to Connect', undefined);
    } else if(response.body.error)  {
        callback('Unable to connect to the location', undefined);
    } else {
        callback(undefined,response.body.current);
    }
  });
};

module.exports = forecast;

const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const geoCode = require('./utils/geoCode');
const foreCast = require('./utils/forecast');

//define paths for express configs
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup the handlebars view engine and location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to save
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "subham",
    book: "Treasure Trove",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "subham",
    book: "Wings of Fire",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Subham",
    book: "As You Like It",
  });
});

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No Address Found'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location} ={}) => {
        if(error) {
            return res.send({
                error
            })
          }
        foreCast(latitude, longitude, (error, foreCastData) => {
            if(error) {
                return res.send({
                    error
                })
              }
            res.send({
                forecast: foreCastData,
                location,
                address: req.query.address
            })
        })
    })
});

// app.get('/help/data', (req, res) => {
//     res.send('Data for article help found');
// });

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help Page NOT Found",
    title: "Namrata Gupta",
    book: "My Love",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page NOT Found",
    title: "Namrata",
    book: "My Life",
  });
});

app.listen(3001, () => {
  console.log("Server is up on port on 3001 port");
});

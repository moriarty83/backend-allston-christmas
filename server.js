//Dependencies 
require("dotenv").config();
const NodeGeocoder = require ('node-geocoder');

const{ PORT = 3000, MONGODB_URL} = process.env;

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

//Database

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected from Mongo"))
.on("error", (error) => console.log(error))


//Models/Schema
const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    city: String,
    state: String,
    zip: String,
	image_url: String,
	latitude: Number,
	longitude: Number,
	trashDay: Date, 
    city: String,
    state: String,
    reserved: {type: Boolean, default:  false}
})

const Item = mongoose.model("Item", ItemSchema);

//Geocoder
const geocoderOptions = {
    provider: 'google',
    apiKey: process.env.APIKEY,
    formatter: null,
}

const geocoder = NodeGeocoder(geocoderOptions)

//Midleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//////////////////////////////
//ROUTES
//////////////////////////////
//Test Route
app.get("/", (req, res) => {
    res.send("Welcome to the Allston-Christmas App");
});

//Index Route
app.get("/api/items", async (req, res) => {
    try {
        res.json(await Item.find({}));
    } catch (error) {
        res.status(400).json({error})
    };

});

//Create route
app.post("/api/items", async (req, res) => {
    try {
        geoCode = await geocoder.geocode([req.body.address, req.body.city, req.body.state, req.body.zip].join(' '));
        req.body.latitude = geoCode[0].latitude;
        req.body.longitude = geoCode[0].longitude;
        res.json(await Item.create(req.body));
    } catch (error) {
        res.status(400).json({error})
    }
});

//Update route
app.put("/api/items/:id", async (req, res) => {
    try {
        geoCode = await geocoder.geocode(req.body.address);
        req.body.latitude = geoCode[0].latitude;
        req.body.longitude = geoCode[0].longitude;
        res.json(await Item.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch (error){
        res.status(400).json({error})
    }
});

//Delete route
app.delete("/api/items/:id", async (req, res) => {
    try{
        res.json(await Item.findByIdAndRemove(req.params.id))
    } catch (error) {
        res.status(400).json({error})
    }
});

app.get("/api/items/current", async (req, res) => {

    const today = new Date();
    try {
        res.json(await Item.find({trashDay: { $gte: today }}));
    } catch (error) {
        res.status(400).json({error})
    };

});


//Show route 

app.get("/api/items/:id", async(req, res) =>{
    
     try {
         res.json(await Item.findById(req.params.id))
     } catch (error) {res.status(400).json(error)};
    
});

//geo location test

app.get("/geoloc", async(req, res)=>{
    try{
        geoCode = await geocoder.geocode("206 South St, Boston, MA")
        res.json(geoCode[0].latitude);
    }
    catch (error) {res.status(400).json(error)}
});






//Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

# Allston Christmas Backend

Allston Christmas makes finding Curbside Gems easier. By providing a platform where people can post what nice an useful items they are leaving on the curb people can more easily find curbside gems and prevent those second hand beauties from winding up in a landfill.

Deployed on Herokuy, this site serves backend database information via RESTful API.

## URL

https://allston-christmas.herokuapp.com/

## Technologies

- JavaScript
- Express
- Mongoose
- Mongo.DB
- Google Geolocator API
- Heroku

## Preparations

- Install NPM at the project folder. `npm install`
- Link and Route component need react-router-dom.

## Function

- REST API serves database entries to Allston Christmas front end.
- Full CRUD

## Routes

| Route               | HTTP Method | DB Action |
| ------------------- | ----------- | --------- |
| /api/items          | GET         | INDEX     |
| /api/items          | POST        | CREATE    |
| /api/items/:id      | GET         | SHOW      |
| /api/items/:id      | PUT         | UPDATE    |
| /api/items/:id      | DELETE      | DELETE    |
| /api/profile/:email | GET         | INDEX\*   |

\*This route is used for showing items filtered by user.

[Routing Table](https://www.notion.so/674fc8746baf4482956b4dad6d13e26c)

## Schema

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
    reserved: {type: Boolean, default:  false},
    reservedBy: String,
    user_email: String

## Contributors

- Andy Zheng
- C. Marshall Moriarty
- Dmitri Jecov

## Reference

- [W3Schools](https://www.w3schools.com/)
- [stackoverflow](https://stackoverflow.com/)
- [Google Maps Documentation](https://developers.google.com/maps/documentation)

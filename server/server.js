const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;
const createRouter = require("./helpers/create_router");

// Create server and set it to use cors and body-parser
const app = express();
app.use(cors());
app.use(parser.json());

// Set up database connection and routers
MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(client => {
    const db = client.db("step_sequencer");
    const sequencesCollection = db.collection("sequences");
    const sequencesRouter = createRouter(sequencesCollection);
    app.use("/api/sequences", sequencesRouter);
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('client/build'));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', ''));
      })
  
      const port_number = process.env.PORT || 3001;
      app.listen(port_number);
    }
  })
  .catch(console.error);

// Set up listener for requests from Client
app.listen(3001, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
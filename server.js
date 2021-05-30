// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// if no data set date now
app.get("/api/", (req,res)=>{
  const date = new Date();
  const utcDateString = date.toDateString();
  const utcDateHours = date.toISOString().substr(11, 8);
  const unixDate = date.getTime()/1000;
  const utcDate = utcDateString+", "+utcDateHours;
  res.json({"unix":unixDate, "utc":utcDate});
})


// show the date
app.get("/api/:date", (req, res)=>{
  //init
  const dateValue = req.params.date;
  let utcDate;
  let unixDate;
  //check if data is unix
  const checkDateFormat = /\d{13}/;

  if(dateValue.match(checkDateFormat)){
    unixDate = dateValue;
    utcDate = parseInt(dateValue,10);
    utcDate = new Date(utcDate);
    const utcDateString = utcDate.toDateString();
    const utcDateHours = utcDate.toISOString().substr(11, 8);
    utcDate = utcDateString+", "+utcDateHours;

    res.json({"unix":unixDate, "utc": utcDate});
      
  }else{

  //check if data is valid date
    const test = Date.parse(dateValue)
    if(isNaN(test)){
      res.json({"error":"Invalid Date"})
    }else{
      
  //function if date is normal
      const dateValueFormat = new Date(dateValue);
      utcDate = dateValueFormat.toDateString()+", "+dateValueFormat.toISOString().substr(11, 8);
      unixDate = new Date(dateValue).getTime()/1000;

      res.json({"unix":unixDate, "utc": utcDate});
    }     
  } 
})



// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

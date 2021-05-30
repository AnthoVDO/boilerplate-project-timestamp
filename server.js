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

app.get("/api/:date", (req, res)=>{
  const dateValue = req.params.date;
  console.log(dateValue);
  let utcDate;
  let unixDate;
  if(dateValue!==null){
    const checkDateFormat = /\d{13}/;
    if(dateValue.match(checkDateFormat)){
      //const ans = dateValue.match(checkDateFormat);
      
      unixDate = dateValue;
      utcDate = parseInt(dateValue,10);
      utcDate = new Date(utcDate);
      const utcDateString = utcDate.toDateString();
      const utcDateHours = utcDate.toISOString().substr(11, 8);
      utcDate = utcDateString+", "+utcDateHours;
      
     
    }else{
      const dateValueFormat = new Date(dateValue);
      utcDate = dateValueFormat.toDateString()+", "+dateValueFormat.toISOString().substr(11, 8);
      unixDate = new Date(dateValue).getTime()/1000;
    }

  }else{
    const date = new Date();
  }
  

  res.json({"unix":unixDate, "utc": utcDate});
})



// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

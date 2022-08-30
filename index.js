var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

// endpoint for timestamp microservice

app.get("/api", (req, res) => {
	res.json({
		unix: new Date().getTime(),
		utc: new Date(),
	});
});

app.get("/api/:date", (req, res) => {
	let resJson = {};

	const dateParam = isNaN(Number(req.params.date))
		? req.params.date
		: parseInt(req.params.date);

	const date = new Date(dateParam);

	isNaN(date)
		? (resJson.error = "Invalid Date")
		: (resJson = {
				unix: date.getTime(),
				utc: date.toUTCString(),
				// much easier to produce same result as
				// const utcDate = `${dayList[date.getDay()]}, ${date.getDate()} ${monthList[date.getMonth()]} ${date.getFullYear()} 00:00:00 GMT`;
		  });

	console.log(req.params.date, resJson);
	return res.json(resJson);
});

// listen for requests :)
const port = process.env.PORT || 8000;
var listener = app.listen(port, function () {
	console.log(`Your app is listening on port ${listener.address().port}`);
});

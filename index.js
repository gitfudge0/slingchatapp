let express = require('express'),
    app = express(),
    http = require('http'),
    bodyParser = require('body-parser');

const PORT = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(require('./controllers/app'))

app.listen(PORT, () => {
    console.log("Running on 3000")
})

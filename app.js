const express = require('express')
const app = express()
var path = require('path');

app.use(express.static('./'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
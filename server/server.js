const express = require('express')
const bodyParser = require('body-parser');
const calculateRouter = require('./calculate')
const cors = require('cors')
const app = express()
app.use(cors());
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(bodyParser.json());
app.use('/api',cors(corsOptions), calculateRouter);


const PORT = 4848
app.listen(PORT, ()=> console.log(`Server started on the port 4848: http://localhost:${PORT}`))

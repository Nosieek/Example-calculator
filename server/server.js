const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const calculateRouter = require('./calculate')

app.use(bodyParser.json());
app.use('/api', calculateRouter);

const PORT = 4848
app.listen(PORT, ()=> console.log(`Server started on the port 4848: http://localhost:${PORT}`))

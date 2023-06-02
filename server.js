const express = require('express')
const app = express();
const api = require('./api')


app.use(express.json());




const port = 8779;

app.use(api)



app.listen(port,()=>{
    console.log(`The server is live on localhost${port}`)
})
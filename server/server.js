const express    = require('express')
const morgan     = require("morgan")
const app        = express()
const helmet = require('helmet')
const bodyParser = require('body-parser')
const graphHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')

const port =  4000
const schema = require('./schema/schema')

mongoose.connect('mongodb+srv://chg007:Chiragmittal9798@cluster007-kfmkq.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open',()=>{
    console.log('connected to database')
})

app.use(cors())


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "x-auth");
    res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE,PATCH');
    next();
});



app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use('/graphql',graphHTTP({
    schema,
    graphiql:true
}))

app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});


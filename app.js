
const express       = require('express');
const cors          = require('cors');
const bodyParser    = require('body-parser');
const path          = require('path');
const mongoose      = require('mongoose');
const CONFIG        = require('./config');

const appPort          = CONFIG.PORT;

const appOne           = express();

appOne.use(cors());
appOne.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
appOne.use(bodyParser.urlencoded({ extended: false, limit : '50mb' }));
appOne.use(bodyParser.json({limit: '50mb'}));
appOne.use(express.json());

appOne.use('/app/profile', require('./routers/appUserRoutes'));
appOne.use('/app/post', require('./routers/appPostRoutes'));
appOne.use('/app/comment', require('./routers/appCommentRoute'));

mongoose.connect(CONFIG.MONGO, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected at Mongo Atlas"))
.catch(err => console.log(err));

appOne.use(express.static('uiClient/dist'));
appOne.get("*", (req, res) => 
{
    res.sendFile(path.resolve(__dirname,  "uiClient" ,"dist", "index.html"));
});

// Start appOne 
appOne.listen(appPort, () => console.log(`Beckend server is listening on PORT ${appPort}`))

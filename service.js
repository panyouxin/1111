var DB = require("nedb");
var profolioDB = new DB({filename: 'profolio.db', autoload: true});

Server.get('/service', (req, res) => {
    profolioDB.find({}).then(result=>{
        res.json(result)
    }
    ))
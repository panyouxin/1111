var express = require("express");
var Server = express();
var { MongoClient } = require("mongodb");

Server.use(express.static(__dirname + "/prsnal_web"));

// 連接本地 MongoDB 伺服器
var url = "mongodb://127.0.0.1:27017";
var client = new MongoClient(url);
var worksCollection;

async function connectDB() {
  try {
    await client.connect();
    var db = client.db("portfolio");
    worksCollection = db.collection("works");
    console.log("MongoDB 資料庫連線成功");
  } catch (err) {
    console.error("MongoDB 連線失敗：", err.message);
  }
}
connectDB();

// 取得所有作品資料
Server.get("/service", async (req, res) => {
  try {
    var result = await worksCollection.find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

Server.listen(3000, () => {
  console.log("伺服器已啟動：http://localhost:3000");
});

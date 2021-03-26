const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
require("./db/conn");
const Table = require("./db/Models/table");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const data = await Table.find();
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/", async (req, res) => {
  const entry = new Table(req.body);
  entry
    .save()
    .then(() => {
      res.status(200).send();
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.patch("/", async (req, res) => {
  const entry = req.body;
  Table.updateOne(
    { key: entry.key },
    {
      $set: {
        person1: entry.person1,
        person2: entry.person2,
        relation: entry.relation,
      },
    }
  )
    .then(res.status(200).send())
    .catch(res.status(400).send());
});

app.post("/check", async (req, res) => {
  try {
    const arr = req.body;
    const data = await Table.find();
    // const len=data.length;
    // var map = new Map();
    // var isvisited = new Map();
    // for(let i=0; i<len; i+=1){
    //   if(!map.get(data[i].person1)){
    //     map.set(data[i].person1, []);
    //   }
    //   var a=map.get(data[i].person1)
    //   a.push(data[i].person2)
    //   map.set(data[i].person1, a)
    //   isvisited.set(data[i].person1, false);
    //   isvisited.set(data[i].person2, false);
    // }
    // const p1len=map.get(arr.person1).length;
    // const ans=[];
    // console.log(ans);
    // const bfs = (map, person1, person2, ans, isvisted) => {
    //   console.log(person1)
    //   if(person2===person1){
    //     ans.push(person2);
    //     return;
    //   }
    //   console.log(person1)
    //   ans.push(person1);
    //   isvisted.set(person1, true)
    //   var len = map.get(person1).length;
    //   for (let i = 0; i < len; i += 1) {
    //     if(!isvisted.get(map.get(person1)[i])){
    //       bfs(map=map, person1=person1, person2=person2, ans=ans, isvisted=isvisted);
    //       if(ans.pop()===person2){
    //         ans.push(person2);
    //         return;
    //       }
    //     }
    //   }
    //   ans.pop();
    // };
    // bfs(map=map, person1=arr.person1, person2=arr.person2, ans=ans,isvisited=isvisited)
    function find(list, person1, person2) {
      let current = list.find((v) => v.person1 === person1);

      if (current.person2 === person2) return current;
      return [current].concat(find(list, current.person2, person2));
    }
    const ans = find(data, arr.person1, arr.person2);
    let value=`${ans[0].person1}`;
    const len=ans.length;
    for(let i=0;i<len; i+=1){
      value = value + ">" + `${ans[i].person2}`
    }
    res.status(200).send(value);
  } catch {
    (e) => {
      res.send(e);
    };
  }
});

app.listen(port, () => {
  console.log(`connection in setup at port no. ${port}`);
});

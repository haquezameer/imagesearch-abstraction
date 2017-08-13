const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const request = require('request');
const _ = require('lodash');

app.use(bodyparser.json());

const API_KEY = 'AIzaSyAVDGeIlL86WO-j81tHy4FAg9S_gAxyhxw';
const CX = '012062960649310339881:vqjamu0txmy';
app.get('/api/imagesearch/:searchterm',(req,res) => {
//  res.send('Hello started');
  const searchterm = req.params.searchterm;
  const query = req.query.offset;
  //&fields=items(snippet,link,image/contextLink,image/thumbnailLink)
  var reqobj = {};
  if(!query){
    reqobj.url=`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&fields=items(snippet,link,image/contextLink,image/thumbnailLink)&cx=${CX}&searchType=image&q=${searchterm}`;
  }
  else{
    reqobj.url=`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&fields=items(snippet,link,image/contextLink,image/thumbnailLink)&cx=${CX}&searchType=image&q=${searchterm}&start=${query}`;
  }
  reqobj.json = true;
  request(reqobj,(err,response,body) => {
    if(!err){
      var items = body.items;
      var resparr = [];
       _.map(items,(item) => {
              resparr.push({url : item.link, snippet:item.snippet,
                            thumbnail:item.image.thumbnailLink,context:item.image.contextLink});
       });
      res.send(resparr);
    }
    else {
      res.send(err);
    }
  });
});


app.listen('3000',() => {
  console.log("Server started");
});

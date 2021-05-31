//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/WikiDB',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:true
})

const articleSchema={
  title:String,
  content:String
}

const Article=mongoose.model('Article',articleSchema);


app.route('/articles').get((req,res)=>
{
  Article.find((err,foundArticles)=>
    {
      // console.log(foundArticles);
      // console.log(foundArticles);
      if (!err)
      {
      res.send(foundArticles)
        
      }
      else
      {
        res.send(err)
      }

    })
}

).post((req,res)=>
{
  // console.log(req.body.title);
  // console.log(req.body.content);
  console.log();
  console.log();

  const newArticle=new Article({
    title:req.body.title,
    content: req.body.content
  })
  newArticle.save(err=>
    {
      if (!err)
      {
        res.send("successfully added new Articles");
        
      }
      else
      {
        console.log(err);
      }
    }).delete((req,res)=>
    {

      Article.deleteMany(err=>
        {
          if (!err)
          {
            res.send("successfully deleted all articles")
            
          }
          else
          {
            // console.log(err);
  
            res.send(err)
          }
        })
    })
  })


// app.get('/articles',(req,res)=>
// {
//   Article.find((err,foundArticles)=>
//     {
//       // console.log(foundArticles);
//       // console.log(foundArticles);
//       if (!err)
//       {
//       res.send(foundArticles)
        
//       }
//       else
//       {
//         res.send(err)
//       }

//     })
// })


// app.post('/articles',(req,res)=>
// {
//   // console.log(req.body.title);
//   // console.log(req.body.content);
//   console.log();
//   console.log();

//   const newArticle=new Article({
//     title:req.body.title,
//     content: req.body.content
//   })
//   newArticle.save(err=>
//     {
//       if (!err)
//       {
//         res.send("successfully added new Articles");
        
//       }
//       else
//       {
//         console.log(err);
//       }
//     })


    // app.delete("/articles",(req,res)=>
    // {

    //   Article.deleteMany(err=>
    //     {
    //       if (!err)
    //       {
    //         res.send("successfully deleted all articles")
            
    //       }
    //       else
    //       {
    //         // console.log(err);
  
    //         res.send(err)
    //       }
    //     })
    // })


// })



app.route('/articles/:articletitle').get((req,res)=>
{
 
  Article.findOne({title: req.params.articletitle}, (err,foundArticle)=>
  {
    if (foundArticle)
     {
       res.send(foundArticle)
      
    }
    else
    {
      res.send("nothing found")
    }
  })
}).put((req,res)=>
{
  Article.update({title:req.params.articletitle},
    {title:req.body.title,content:req.body.content},
    {overwrite:true},
    function (err)
  {
    if (!err)
    {
      res.send('successfully updated a articles')
      
    }
  })
}).patch((req,res)=>
{
  Article.update(
    {title:req.params.articletitle},
    {$set:req.body},
    function(err)
    {
      if(!err)
      {
        res.send("Successfully updated Articles");

      }
      else
      {
        res.send(err)
      }
    }


  )
}).delete((req,res)=>
{
  Article.deleteOne({title:req.params.articletitle},
    function (err)
    {
      if (!err) {
        res.send("Successfully deleted all articles")
      }
      else
      {
        res.send(err);
      }
      
    })
})
   

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
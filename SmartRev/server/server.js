require("dotenv").config();

const express = require("express");
const db = require('./db');

const morgan = require("morgan");

const app = express();

app.use(express.json());


//Get all flashcards
app.get("/api/v1/flashcards", async (req,res) =>{


    try{
        const results = await db.query("select * from flashcard");
        console.log(results);
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:{
            flashcard: results.rows,
        }, 
    });
    } catch(err){
        console.log(err);
    }
    
    
});

//Get a flashcard
app.get("/api/v1/flashcards/:id", async(req,res) =>{
   console.log(req.params.id);

   try {
       const results = await db.query(
           "select * from flashcard where flashcardid = $1",[req.params.id]
           );
       res.status(200).json({
        status: "success",
        data:{
            flashcard: results.rows[0],
        }, 
   });
   } catch (err) {
       console.log(err);
   }

   

     


});

//Create a flashcard
app.post("/api/v1/flashcards",async (req,res) =>{
   console.log(req.body);

   try {
        const results = await db.query(
        "INSERT INTO flashcard (topic, content) values ($1, $2) returning *", [req.body.topic, req.body.content]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data:{
                flashcard: results.rows[0],
            }, 
        });
   } catch (error) {
        console.log(err); 
   }
   

});

//Update a flashcard
app.put("/api/v1/flashcards/:id",async(req,res) =>{
    
    try {
        const results = await db.query(
            "UPDATE flashcard SET topic = $1, content = $2 where flashcardid = $3 returning *", 
            [req.body.topic, req.body.content, req.params.id]
            );

            res.status(201).json({
                status: "success",
                data:{
                    flashcard: results.rows[0],
                }, 
            });
    } catch (err) {
        console.log(err); 
    }    
    
 });

 //Delete a flashcard
 app.delete("/api/v1/flashcards/:id", async(req,res) =>{

    try {
        const results = await db.query(
            "DELETE FROM flashcard where flashcardid = $1", 
            [req.params.id]
            );

            res.status(204).json({
                status: "success",
            });
            
    } catch (err) {
        console.log(err); 
    }
   
 });

 //--------------------------------------------------------------------

 //Get all forum
app.get("/api/v1/forum", async (req,res) =>{


    try{
        const results = await db.query("select * from forum");
        console.log(results);
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:{
            forum: results.rows,
        }, 
    });
    } catch(err){
        console.log(err);
    }
    
    
});

//Get a forum
app.get("/api/v1/forum/:id", async(req,res) =>{
   console.log(req.params.id);

   try {
       const results = await db.query(
           "select * from forum where forumid = $1",[req.params.id]
           );
       res.status(200).json({
        status: "success",
        data:{
            flashcard: results.rows[0],
        }, 
   });
   } catch (err) {
       console.log(err);
   }
});

//Create a forum
app.post("/api/v1/forum",async (req,res) =>{
   console.log(req.body);

   try {
        const results = await db.query(
        "INSERT INTO forum (topic, content) values ($1, $2) returning *", [req.body.topic, req.body.content]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data:{
                forum: results.rows[0],
            }, 
        });
   } catch (error) {
        console.log(err); 
   }
   

});

//Update a forum
app.put("/api/v1/forum/:id",async(req,res) =>{
    
    try {
        const results = await db.query(
            "UPDATE forum SET comment = $1, where forumid = $2 returning *", 
            [req.body.comment,req.params.id]
            );

            res.status(201).json({
                status: "success",
                data:{
                    forum: results.rows[0],
                }, 
            });
    } catch (err) {
        console.log(err); 
    }    
    
 });

 //Delete a forum
 app.delete("/api/v1/forum/:id", async(req,res) =>{

    try {
        const results = await db.query(
            "DELETE FROM forum where forumid = $1", 
            [req.params.id]
            );

            res.status(204).json({
                status: "success",
            });
            
    } catch (err) {
        console.log(err); 
    }
   
 });

 //--------------------------------------------------------------------

 //Get all video
app.get("/api/v1/video", async (req,res) =>{


    try{
        const results = await db.query("select * from video");
        console.log(results);
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data:{
            video: results.rows,
        }, 
    });
    } catch(err){
        console.log(err);
    }
    
    
});

//Create a video
app.post("/api/v1/video",async (req,res) =>{
    console.log(req.body);
 
    try {
         const results = await db.query(
         "INSERT INTO video (title, link) values ($1, $2) returning *", [req.body.title, req.body.link]
         );
         console.log(results);
         res.status(201).json({
             status: "success",
             data:{
                 video: results.rows[0],
             }, 
         });
    } catch (error) {
         console.log(err); 
    }
    
 
 });


 //--------------------------------------------------------------------

 //Create a profile
app.post("/api/v1/profile",async (req,res) =>{
    console.log(req.body);
 
    try {
         const results = await db.query(
         "INSERT INTO profile (name, email, password, phonenumber, school) values ($1, $2, $3, $4, $5) returning *", [req.body.name, req.body.email, req.body.password, req.body.phoneNumber, req.body.school]
         );
         console.log(results);
         res.status(201).json({
             status: "success",
             data:{
                 profile: results.rows[0],
             }, 
         });
    } catch (error) {
         console.log(err); 
    }
    
 
 });

 //Get a profile (guna ni nak retrieve authorization)
app.get("/api/v1/profile/:email", async(req,res) =>{
    console.log(req.params.email);
 
    try {
        const results = await db.query(
            "select * from profile where email = $1",[req.params.email]
            );
        res.status(200).json({
         status: "success",
         data:{
             profile: results.rows[0],
         }, 
    });
    } catch (err) {
        console.log(err);
    }
 });

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});


require("dotenv").config();

const express = require("express");
const db = require('./db');

const morgan = require("morgan");

const app = express();

app.use(express.json());

////////////////////////////////////////////Flashcard\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//Get all flashcards (not used)
// app.get("/api/v1/flashcards", async (req,res) =>{


//     try{
//         const results = await db.query("select * from flashcard ORDER BY flashcardid");
//         console.log(results);
//         res.status(200).json({
//         status: "success",
//         results: results.rows.length,
//         data:{
//             flashcard: results.rows,
//         }, 
//     });
//     } catch(err){
//         console.log(err);
//     }


// });

//Get all flashcards with subject and userid
app.get("/api/v1/flashcards/:userid/:subject", async (req, res) => {
    console.log("Get all flashcards with subject and userid");

    try {
        console.log(req.params.userid, req.params.subject);
        const results = await db.query("select * from flashcard WHERE userid = $1 AND subject = $2 ORDER BY flashcardid", [req.params.userid, req.params.subject]);
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                flashcard: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }


});

//Get a flashcard
app.get("/api/v1/flashcards/:id", async (req, res) => {
    console.log("get a flashcard");
    console.log(req.params.id);

    try {
        const results = await db.query(
            "select * from flashcard where flashcardid = $1", [req.params.id]
        );
        res.status(200).json({
            status: "success",
            data: {
                flashcard: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }






});

//Create a flashcard
app.post("/api/v1/flashcards", async (req, res) => {
    console.log("create a flashcard");
    console.log(req.body);

    try {
        const results = await db.query(
            "INSERT INTO flashcard (userid, subject, content) values ($1, $2, $3) returning *", [req.body.userid, req.body.selectedSubject, req.body.content]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                flashcard: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }


});

//Update a flashcard
// app.put("/api/v1/flashcards/:id",async(req,res) =>{

//     try {
//         const results = await db.query(
//             "UPDATE flashcard SET topic = $1, content = $2 where flashcardid = $3 returning *", 
//             [req.body.topic, req.body.content, req.params.id]
//             );

//             res.status(201).json({
//                 status: "success",
//                 data:{
//                     flashcard: results.rows[0],
//                 }, 
//             });
//     } catch (err) {
//         console.log(err); 
//     }    

//  });

//Delete a flashcard
app.delete("/api/v1/flashcards/:id", async (req, res) => {
    console.log("delete flashcard");

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

///////////////////////////////////////////////////Forum\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a Forum
app.post("/api/v1/forum/create", async (req, res) => {
    console.log("create forum");

    try {
        const results = await db.query("INSERT INTO forum (title, details, author, date, class, nameclass, subject) values ($1,$2,$3,$4,$5,$6,$7)", [req.body.title, req.body.details, req.body.author, req.body.todayDate, req.body.code, req.body.nameclass, req.body.subject])
        console.log(results);

    } catch (err) {
        console.log(err);
    }

});

// Get all forum
app.get("/api/v1/forum/display", async (req, res) => {
    console.log("get all forum");
    try {
        const results = await db.query("SELECT * FROM forum");
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                forum: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get certain forum
app.get("/api/v1/forum/display/:info", async (req, res) => {
    console.log("get certain forum");

    console.log(req.params.info)

    try {
        const results = await db.query("SELECT * FROM forum WHERE class = $1", [req.params.info]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                forum: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a forum
app.get("/api/v1/forum/description/:id", async (req, res) => {
    console.log(req.params.id);
    console.log("get a forum");

    try {
        const results = await db.query("SELECT * FROM forum where forumid = $1", [req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                forum: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Update a forum
app.put("/api/v1/forum/update/:id", async (req, res) => {
    console.log("update forum");
    console.log(req.params.id);
    console.log(req.body.replies)

    try {
        const results = await db.query("UPDATE test SET reply = $1 WHERE forumid = $2",
            [req.body.replies, req.body.id]);
        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                forum: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err);
    }

});

// Create a reply
app.post("/api/v1/forum/reply", async (req, res) => {
    console.log("create reply");

    try {
        const results = await db.query("INSERT INTO replyforum (userid, forumid, name, reply, date, time) values ($1,$2,$3,$4,$5,$6)", [req.body.userid, req.body.forumid, req.body.author, req.body.reply, req.body.date, req.body.time])
        console.log(results);

    } catch (err) {
        console.log(err);
    }

});

// Get certain reply
app.get("/api/v1/forum/reply/:id", async (req, res) => {
    console.log("get certain reply");
    console.log(req.params.id);

    try {
        const results = await db.query("SELECT * FROM replyforum where forumid = $1", [req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                reply: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

//  //Get all forum
// app.get("/api/v1/forum", async (req,res) =>{


//     try{
//         const results = await db.query("select * from forum");
//         console.log(results);
//         res.status(200).json({
//         status: "success",
//         results: results.rows.length,
//         data:{
//             forum: results.rows,
//         }, 
//     });
//     } catch(err){
//         console.log(err);
//     }


// });

// //Get a forum
// app.get("/api/v1/forum/:id", async(req,res) =>{
//    console.log(req.params.id);

//    try {
//        const results = await db.query(
//            "select * from forum where forumid = $1",[req.params.id]
//            );
//        res.status(200).json({
//         status: "success",
//         data:{
//             flashcard: results.rows[0],
//         }, 
//    });
//    } catch (err) {
//        console.log(err);
//    }
// });

// //Create a forum
// app.post("/api/v1/forum",async (req,res) =>{
//    console.log(req.body);

//    try {
//         const results = await db.query(
//         "INSERT INTO forum (topic, content) values ($1, $2) returning *", [req.body.topic, req.body.content]
//         );
//         console.log(results);
//         res.status(201).json({
//             status: "success",
//             data:{
//                 forum: results.rows[0],
//             }, 
//         });
//    } catch (error) {
//         console.log(err); 
//    }


// });

// //Update a forum
// app.put("/api/v1/forum/:id",async(req,res) =>{

//     try {
//         const results = await db.query(
//             "UPDATE forum SET comment = $1, where forumid = $2 returning *", 
//             [req.body.comment,req.params.id]
//             );

//             res.status(201).json({
//                 status: "success",
//                 data:{
//                     forum: results.rows[0],
//                 }, 
//             });
//     } catch (err) {
//         console.log(err); 
//     }    

//  });

//  //Delete a forum
//  app.delete("/api/v1/forum/:id", async(req,res) =>{

//     try {
//         const results = await db.query(
//             "DELETE FROM forum where forumid = $1", 
//             [req.params.id]
//             );

//             res.status(204).json({
//                 status: "success",
//             });

//     } catch (err) {
//         console.log(err); 
//     }

//  });

//--------------------------------------------------------------------

//Get all video
// app.get("/api/v1/video", async (req,res) =>{


//     try{
//         const results = await db.query("select * from video");
//         console.log(results);
//         res.status(200).json({
//         status: "success",
//         results: results.rows.length,
//         data:{
//             video: results.rows,
//         }, 
//     });
//     } catch(err){
//         console.log(err);
//     }


// });

// //Create a video
// app.post("/api/v1/video",async (req,res) =>{
//     console.log(req.body);

//     try {
//          const results = await db.query(
//          "INSERT INTO video (title, link) values ($1, $2) returning *", [req.body.title, req.body.link]
//          );
//          console.log(results);
//          res.status(201).json({
//              status: "success",
//              data:{
//                  video: results.rows[0],
//              }, 
//          });
//     } catch (error) {
//          console.log(err); 
//     }


//  });


//////////////////////////////////////////////Profile\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//Create a profile
app.post("/api/v1/profile", async (req, res) => {
    console.log("create a profile");
    console.log(req.body);

    try {
        const results = await db.query(
            "INSERT INTO users (fullname, email, password, phonenumber, school, usertype) values ($1, $2, $3, $4, $5, $6) returning *", [req.body.name, req.body.email, req.body.password, req.body.phoneNumber, req.body.school, req.body.usertype]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });
    } catch (error) {
        console.log(err);
    }


});

//Get a profile (guna ni nak retrieve authorization)
app.get("/api/v1/profile/:email", async (req, res) => {
    console.log("get a profile");
    console.log(req.params.email);

    try {
        const results = await db.query(
            "select * from users where email = $1", [req.params.email]
        );
        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});



////////////////////////////////Class\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a class
app.post("/api/v1/class", async (req, res) => {
    console.log("create class");
    try {
        const results = await db.query("INSERT INTO class (userid, name, code, subject) values ($1,$2,$3,$4) returning *", [req.body.userid, req.body.name, req.body.code, req.body.selectedSubject]);
        console.log(results);

    } catch (err) {
        console.log(err);
    }

});

// Get a class by code
app.get("/api/v1/class/:code", async (req, res) => {
    console.log("get class by code");
    console.log(req.params.code);

    try {
        const results = await db.query("SELECT * FROM class WHERE code = $1", [req.params.code]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                class: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a class by id
app.get("/api/v1/class/id/:id", async (req, res) => {
    console.log("get class by id");

    try {
        const results = await db.query("SELECT * FROM class WHERE userid = $1", [req.params.id]);
        // console.log(results.rows);
        console.log("server");
        res.status(200).json({
            status: "success",
            data: {
                class: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Update math code at user profile
app.put("/api/v1/profile/mathematics/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body)

    try {
        const results = await db.query("UPDATE users SET math = $1 WHERE userid = $2 returning *",
            [req.body.code, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err);
    }

});

// Update physics code at user profile
app.put("/api/v1/profile/physics/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body)

    try {
        const results = await db.query("UPDATE users SET physics = $1 WHERE userid = $2 returning *",
            [req.body.code, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err);
    }

});

// Update chemistry code at user profile
app.put("/api/v1/profile/chemistry/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body)

    try {
        const results = await db.query("UPDATE users SET chemistry = $1 WHERE userid = $2 returning *",
            [req.body.code, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err);
    }

});

// Update biology code at user profile
app.put("/api/v1/profile/biology/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body)

    try {
        const results = await db.query("UPDATE users SET biology = $1 WHERE userid = $2 returning *",
            [req.body.code, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err);
    }

});

//////////////////////////////////////Video\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Get all video
app.get("/api/v1/video", async (req, res) => {
    console.log("get all video");
    try {
        const results = await db.query("SELECT * FROM video")
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                video: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get certain video
app.get("/api/v1/video/:info", async (req, res) => {
    console.log("get certain video");
    console.log(req.params.info)

    try {
        const results = await db.query("SELECT * FROM video WHERE class=$1", [req.params.info])
        // console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                video: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Create a video
app.post("/api/v1/create/video", async (req, res) => {
    console.log("create a video");
    console.log(req.body);
    // subject="physics"

    try {
        const results = await db.query("INSERT INTO video (title, link, subject, class, nameclass) values ($1,$2,$3,$4,$5) returning *", [req.body.title, req.body.link, req.body.subject, req.body.code, req.body.nameclass])
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                video: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err)
    }

});

// Delete a video
app.delete("/api/v1/video/:id", async (req, res) => {

    try {
        const results = db.query("DELETE FROM video where videoid = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err)
    }

});

//////////////////////////////////////Quiz\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a quiz
app.post("/api/v1/quiz/create", async (req, res) => {
    console.log("create a quiz");
    console.log(req.body);

    try {
        const results = await db.query("INSERT INTO quiz (userid, title, class, subject, nameclass) values ($1, $2, $3, $4, $5) RETURNING *",
            [req.body.id, req.body.title, req.body.code, req.body.subject, req.body.nameclass]);

        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                quiz: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err)
    }

});


// Get certain quiz
app.get("/api/v1/quiz/display/:id", async (req, res) => {
    console.log("get certain quiz");
    console.log(req.params.id)
    try {
        const results = await db.query("SELECT * FROM quiz WHERE userid = $1", [req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

//Get certain quiz with class code
app.get("/api/v1/quiz/class/:code", async (req, res) => {
    console.log("get certain quiz with class code");
    try {
        const results = await db.query("SELECT * FROM quiz WHERE class = $1", [req.params.code]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a quiz with quizid
app.get("/api/v1/quiz/edit/:qid", async (req, res) => {
    console.log("get a quiz with quizid");
    console.log(req.params.qid)
    try {
        const results = await db.query("SELECT * FROM quiz WHERE quizid = $1", [req.params.qid]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a quiz with quizid and subject
app.get("/api/v1/quiz/display/:id/:sub", async (req, res) => {
    console.log("get quiz with quizid and subject");
    try {
        const results = await db.query("SELECT * FROM quiz WHERE userid = $1 AND subject = $2", [req.params.id, req.params.sub]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

//Update quiz
app.put("/api/v1/quiz/update", async (req, res) => {
    console.log("update quiz");
    try {
        const results = await db.query("UPDATE quiz SET title=$1, class=$2, subject=$3, nameclass=$4 WHERE quizid=$5",
            [req.body.title, req.body.code, req.body.subject, req.body.nameclass, req.body.qid]);
        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err);
    }

});

// Delete a quiz
app.delete("/api/v1/quiz/delete/:id", async (req, res) => {
    console.log("delete quiz");
    try {
        const results = db.query("DELETE FROM quiz WHERE quizid = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }

});

// Create a question
app.post("/api/v1/quiz/create/question", async (req, res) => {
    console.log("create question");
    console.log(req.body);
    // const quizid = 5;

    try {
        const results = await db.query("INSERT INTO question (quizid, quest, option1, option2, option3, option4, answer) values ($1, $2, $3, $4, $5, $6, $7)",
            [req.body.quizid, req.body.quest, req.body.option1, req.body.option2, req.body.option3, req.body.option4, req.body.answer]);

        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                question: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err)
    }

});

// Get quiz question with quiz id
app.get("/api/v1/quiz/question/:qid", async (req, res) => {
    console.log("get quiz question with quiz id");
    console.log(req.params.qid)
    try {
        const results = await db.query("SELECT * FROM question WHERE quizid = $1", [req.params.qid]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                question: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

//Update question
app.put("/api/v1/quiz/question/update", async (req, res) => {
    console.log("update question");
    try {
        const results = await db.query("UPDATE question SET quest=$1, option1=$2, option2=$3, option3=$4, option4=$5, answer=$6 WHERE quizid=$7",
            [req.body.quest.quest, req.body.quest.option1, req.body.quest.option2, req.body.quest.option3, req.body.quest.option4, req.body.quest.answer, req.body.id]);
        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err);
    }

});

// Delete question by quizid
app.delete("/api/v1/quiz/delete/quest/:id", async (req, res) => {
    console.log("delete question by quizid");
    try {
        const results = db.query("DELETE FROM question WHERE quizid = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }

});

/////////////////////////////////////////////Note\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a note
app.post("/note/create", async (req, res) => {

    // const name = "file"
    try {
        const results = await db.query("INSERT INTO note (userid, note, filename) values ($1, $2, $3)", [req.body.id, req.body.link, req.body.name])
        // console.log(req.body.url);

    } catch (err) {
        console.log(err);
    }

});

// Create a note by saving
app.post("/note/create/save", async (req, res) => {

    try {
        const results = await db.query("INSERT INTO note (userid, note, filename) values ($1, $2, $3)", [req.body.id, req.body.link, req.body.filename])
        console.log(req.body.url);

    } catch (err) {
        console.log(err);
    }

});

// Create a note for class by teacher
app.post("/note/class/teacher/create", async (req, res) => {

    //const name = "file"
    try {
        const results = await db.query("INSERT INTO note (userid, note, filename, class, subject, nameclass) values ($1, $2, $3, $4, $5, $6)",
            [req.body.id, req.body.link, req.body.name, req.body.code, req.body.subject, req.body.classname])

    } catch (err) {
        console.log(err);
    }

});

// Create a note for class by student
app.post("/note/class/student/create", async (req, res) => {

    // const name = "file"
    try {
        const results = await db.query("INSERT INTO note (userid, note, filename, class, subject) values ($1, $2, $3, $4, $5)",
            [req.body.id, req.body.link, req.body.name, req.body.code, req.body.subject])

    } catch (err) {
        console.log(err);
    }

});

// Get all note
app.get("/note/display", async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM note");
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                note: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a note by noteid
app.get("/note/display/save/:id", async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM note WHERE noteid=$1 ", [req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                note: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get certain note
app.get("/note/display/:id", async (req, res) => {
    console.log(req.params.id)

    try {
        const results = await db.query("SELECT * FROM note WHERE userid=$1 AND class IS NULL ", [req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                note: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get certain note with code
app.get("/note/class/display/:code", async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM note WHERE class=$1", [req.params.code]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                note: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Delete a note
app.delete("/note/:id", async (req, res) => {

    try {
        const results = db.query("DELETE FROM note WHERE noteid = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }

});

// Update note
app.put("/note/update", async (req, res) => {

    try {
        const results = await db.query("UPDATE note SET counter = $1 WHERE noteid = $2",
            [req.body.counter, req.body.notId]);
        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                note: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err);
    }

});

// // Get mathematics video
// app.get("/api/v1/video/display/mathematics", async(req, res) => {

//     const subject = "mathematics"
//     try {
//         const results = await db.query("SELECT * FROM video where subject = $1", [subject]);
//         console.log(results);
//         res.status(200).json({
//             status: "success",
//             data: {
//                 video: results.rows,
//             },
//         });
//     } catch (err) {
//         console.log(err);
//     }

// });

// // Get physics video
// app.get("/api/v1/video/display/physics", async(req, res) => {

//     const subject = "physics"
//     try {
//         const results = await db.query("SELECT * FROM video where subject = $1", [subject]);
//         console.log(results);
//         res.status(200).json({
//             status: "success",
//             data: {
//                 video: results.rows,
//             },
//         });
//     } catch (err) {
//         console.log(err);
//     }

// });

// // Get chemistry video
// app.get("/api/v1/video/display/chemistry", async(req, res) => {

//     const subject = "chemistry"
//     try {
//         const results = await db.query("SELECT * FROM video where subject = $1", [subject]);
//         console.log(results);
//         res.status(200).json({
//             status: "success",
//             data: {
//                 video: results.rows,
//             },
//         });
//     } catch (err) {
//         console.log(err);
//     }

// });

// // Get biology video
// app.get("/api/v1/video/display/biology", async(req, res) => {

//     const subject = "biology"
//     try {
//         const results = await db.query("SELECT * FROM video where subject = $1", [subject]);
//         console.log(results);
//         res.status(200).json({
//             status: "success",
//             data: {
//                 video: results.rows,
//             },
//         });
//     } catch (err) {
//         console.log(err);
//     }

// });

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});

const express=require('express')
const app=express()

app.get("/api", (req, res) =>{

        res.json({"users":["Hello user1", "Hello user2", "Hello user3"]})
})

app.listen(5000, ()=> {console.log("Server started on port 5000")})
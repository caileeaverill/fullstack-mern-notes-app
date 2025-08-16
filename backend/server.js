import express from "express"

const app = express()

app.listen(5001, () => {
    console.log("Server start on http://localhost:5001")
})

// get notes
app.get("/api/notes", (req, res) => {
    res.status(200).send("Received get request")
})

// create notes
app.post("/api/notes", (req, res) => {
    res.status(201).json({
        message: "Post received successfully"
    })
})

// update notes
app.put("/api/notes/:id", (req, res) => {
    res.status(201).json({
        message: "Post updated successfully"
    })
})

// delete notes
app.delete("/api/notes/:id", (req, res) => {
    res.status(201).json({
        message: "Post deleted successfully"
    })
})

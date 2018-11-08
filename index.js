const express = require ('express')
const monk = require ('monk')
const db = monk('mongodb://admin:password1@ds029640.mlab.com:29640/meme-generator')
const memesCollection = db.get('memes')
const bodyParser = require('body-parser')
const app = express()
const port = 3080

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested_With, Content-Type, Accept, Authorization')
    next()
})


app.get('/meme-generator', async (req, res) => {
    try {
        console.log(req.headers)
        const MemeArr = await memesCollection.find({})
        res.send(MemeArr)
    }catch (error) {
        console.log(error)
        res.send(error)
    }
})
 
   

app.post('/meme-generator', async (req, res) => {
    try {
        await memesCollection.insert(req.body)
    
    }catch (error) {
        console.log(error)
        res.send(error)
    }
})


app.post('/meme-generator/update', async (req, res) => {
    console.log('the body on update', req.body)
    try {
        await memesCollection.update({"_id": req.body._id}, req.body)
        res.send("success")
    }catch (error) {
        console.log(error)
        res.send(error)
        
    }
})


app.post('/meme-generator/delete', async (req, res) => {
    console.log(req.body)
    try {
        await memesCollection.remove({"_id": req.body._id}) 
        res.send("success")
    }catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.listen(port, () => console.log('Example app listening on port 3080!'))


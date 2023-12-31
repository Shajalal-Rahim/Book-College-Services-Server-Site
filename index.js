const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



// Book-College-Services
// LXajuv8KAWTRuJoe



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6wmoia0.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const collegeCollection = client.db("Book-College-ServicesDB").collection("college");
        const admissionCollection = client.db("Book-College-ServicesDB").collection("admission");



        app.get('/college', async (req, res) => {
            const result = await collegeCollection.find().toArray()
            res.send(result)
        })


        app.post('/admission', async (req, res) => {
            const admission = req.body;
            console.log(admission)
            const result = await admissionCollection.insertOne(admission);
            res.send(result)
        })

        app.get("/mycollege/:email", async (req, res) => {
            console.log(req.params.email);
            const cursor =admissionCollection.find({ Email: req.params.email})
            const result = await cursor.toArray();
            res.send(result)
          });


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('Summer is start')
})

app.listen(port, () => {
    console.log(`Summer is sitting on port ${port}`);
})
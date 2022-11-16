const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express();

//midleware...
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.snnxp9j.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const appoinmentSlotCollection = client.db('doctors').collection('appoinmentSlot');

        app.get('/appoinmentSlot', async (req, res) => {
            const query = {};
            const options = await appoinmentSlotCollection.find(query).toArray();
            res.send(options);
        })
    }
    finally {

    }
}
run().catch(console.log)



app.get('/', async (req, res) => {
    res.send('doctors-portal server is running...')
})

app.listen(port, () => console.log(`Doctors portal running on ${port}`));
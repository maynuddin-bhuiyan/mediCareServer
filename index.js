// Basic Working,

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient } = require('mongodb');


const port = process.env.PORT || 7000;


//Middleware Work,

app.use(cors());
app.use(express.json());



// Functionally Working,


// Calling User and password with .env,

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2npz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// creating a client in MongoClient,

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });





console.log(uri);


// Work on Async Function used in data,
async function runerw() {


    // try Mothed,

    try {
        await client.connect();
        const database = client.db('medicare');
        const propertiesCollection = database.collection('properties');
        
     



        // Lode an array in henkagonzalez used data,
        app.get('/properties', async (req, res) => {

            const cursor = propertiesCollection.find({});

            const page = req.query.page;
            const size = parseInt(req.query.size);
            const count = await cursor.count();

            let products;
            if(page){
                products = await cursor.skip(page*size).limit(size).toArray()
            }
            else{
                products = await cursor.toArray();
            }
            

            
            res.send({
                count,
                products               
            });


        });
           

       


        
      















    }
    finally {
        //  await client.close();
    }
}




runerw().catch(console.dir);





app.get('/', (req, res) => {
    res.send('meadcare.com')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

// =========================================================================================

/* 
 * ⁡⁢CONNECTING DATABASE (MONGODB)
*/

const mongoose = require('mongoose'), Admin = mongoose.mongo.Admin;
const logger = require('../Logger/dev-logger');
const config = require('./switchDBConfig');

const Company_Auth = require('../Models/CompaniesManagement/companyAuthModel');

//mongoose.Promise = global.Promise;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://backenddev:2uFQagRDSLQcJnLK@cluster0.xb6gwzq.mongodb.net/CRM";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     var company = "test"
//     eval(`const conn_${company} = client.db(${company})`)
//     console.log("Connected to database: "+ company)
//   const db1 = client.db("myDB1");
//   console.log("Connected to database: myDB1");
//   // Perform actions on the collection object  const db2 = client.db("myDB2");
//   console.log("Connected to database: myDB2");
//   // Perform actions on the collection object  // No need to close the connection, as it remains open});
// });

async function performMongoOperation(dbName, collectionName, type, query) {
  const client = await MongoClient.connect('mongodb+srv://backenddev:2uFQagRDSLQcJnLK@cluster0.xb6gwzq.mongodb.net', { useUnifiedTopology: true });
  const db = client.db(dbName);
  //console.log(await db.admin().listDatabases());
  const collection = db.collection(collectionName);

  console.log('connected to db as desired...');

//   if (type === 'insert') {
//     await collection.insertOne(query);
//     console.log('Inserted document into collection');
//   } else if (type === 'find') {
//     const results = await collection.find(query).toArray();
//     console.log('Found documents in collection:');
//     console.log(results);
//   } else if (type === 'update') {
//     await collection.updateOne(query.filter, { $set: query.update });
//     console.log('Updated document in collection');
//   } else if (type === 'delete') {
//     await collection.deleteOne(query);
//     console.log('Deleted document from collection');
//   } else {
//     console.log('Invalid operation type');
//   }

//   client.close();
}






function createConnection(name) {
    return mongoose.createConnection(config[name]);
}

const connectDB = async () => {
    try {      
        //console.log(config[config.default])  
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect('mongodb+srv://backenddev:2uFQagRDSLQcJnLK@cluster0.xb6gwzq.mongodb.net/'+'CRM');
        console.log(`MongoDB connection established: ${conn.connection.host}`);
        logger.info(`MongoDB connection established: ${conn.connection.host}`);
        // new Admin(mongoose.connection.db).listDatabases((err,result) => {
        //     console.log(result.databases);
        // })
        // const ttt = await mongoose.mongo.Admin.connection.db.listDatabases().toArray()
        // console.log(ttt)
    } catch (error) {
        logger.error('Error connecting to database', error);
        process.exit(1);
    }
}

module.exports = {connectDB, performMongoOperation};

// =========================================================================================
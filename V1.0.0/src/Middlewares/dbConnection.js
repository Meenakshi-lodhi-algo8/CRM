
const mongoose = require('mongoose'), Admin = mongoose.mongo.Admin;
const logger = require('../Logger/dev-logger');

const Company_Auth = require('../Models/CompaniesManagement/companyAuthModel');


const connectCompanyDB = async (req, res, next) => {

    if(!req.body.email) res.status(400).json({ message: 'Please login to continue.'}) 
    else{
        const company = await Company_Auth.findOne({company_email: req.body.email});
        console.log(company);
        if(company){
            var dbName = company.company_name.replace(' ','_');
            console.log(dbName);
            //mongoose.connection.close();
            mongoose.set('strictQuery', true);
            const conn = await mongoose.connect('mongodb+srv://backenddev:2uFQagRDSLQcJnLK@cluster0.xb6gwzq.mongodb.net/'+dbName);
            console.log(`MongoDB connection established: ${conn.connection.host}`);
            logger.info(`MongoDB connection established: ${conn.connection.host}`);
            next();
        }
    }
    
}


module.exports = { connectCompanyDB }
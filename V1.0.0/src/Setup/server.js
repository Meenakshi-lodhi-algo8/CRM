
// =======================================================================================

/*
    * This is the main entry point for the server
*/

// ---------------------------------------------------------------------------------------
const express = require('express');
const dotenv = require('dotenv').config();
const port = 8080;                                  // process.env.PORT
const logger = require('../Logger/dev-logger');
// ---------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------
const {connectDB, performMongoOperation} = require('./configDB.js');
//performMongoOperation('CRM', 'testing', "", {});
connectDB();
// ----------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ---------------------------------------------------------------------------------------

// -------------------* CORS HANDLER *----------------------------------------------------
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// ---------------------------------------------------------------------------------------

app.use('/listings', require('../Routes/listingRoutes/listing_CRUD_Routes'));

app.use('/storage', require('../Routes/listingRoutes/imageStorage'));
app.use('/fpstorage', require('../Routes/listingRoutes/floorPlansStorage'));
app.use('/docstorage', require('../Routes/listingRoutes/documentsStorage'));
app.use('/superadmin', require('../Routes/SuperAdminRoutes/sAdminRoutes'));
app.use('/primaryagents', require('../Routes/AgentsRoutes/primaryAgentsRoutes'));

app.use('/secondaryagents', require('../Routes/AgentsRoutes/secondaryAgentsRoutes'));

app.use('/company', require('../Routes/CompanyRoutes/company_auth'));

app.use('/watermark', require('../Routes/CompanyRoutes/company_watermark_storage'));

app.use('/users', require('../Routes/UserRoutes/user'));

app.use('/settings', require('../Routes/SettingsRoutes/refSequenceRoutes'));

app.use('/location', require('../Routes/LocationRoutes/locationRoutes'));

// -----------------# Error Handler #-----------------------------------------------------
app.use(require('../Middlewares/errorHandler'));
// ---------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------
app.listen(port, () => {
    logger.info(`server started on port: ${port} `);
    console.log(`server started on port: ${port}`);
});
// ---------------------------------------------------------------------------------------

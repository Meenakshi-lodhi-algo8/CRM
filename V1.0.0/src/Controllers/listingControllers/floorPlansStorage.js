const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');

const { uploadFileToBlob, storeImageInAzure } = require('../../HelperFunctions/Azure-Storage/azure_storage');

const storeFloorPlans = asyncHandler(async(req,res) => {
    
    var listing_floorPlans = []
    if(req.files.length > 0){
        for(var image of req.files){
            var filePath = `./public/floorPlans/${image.filename}`
            //console.log(filePath)
            await storeImageInAzure(filePath, process.env.sas_url, image.filename, 'crmfloorplans')
            console.log('image uploaded...');
            
            listing_floorPlans.push(`https://pixlprithvi.blob.core.windows.net/crmfloorplans/${image.filename}`)
        }
        console.log(listing_floorPlans);
        res.status(200).json({ message: 'Files saved successfully..', result: listing_floorPlans });
    }
    else{
        res.status(400).json({ message: 'No files uploaded' });
        return;
    }
});


module.exports = { storeFloorPlans }

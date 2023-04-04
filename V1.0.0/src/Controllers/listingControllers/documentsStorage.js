const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');

const { uploadFileToBlob, storeImageInAzure } = require('../../HelperFunctions/Azure-Storage/azure_storage');

const storeDocuments = asyncHandler(async(req,res) => {
    
    var listing_documents = []
    if(req.files.length > 0){
        for(var doc of req.files){
            var filePath = `./public/documents/${doc.filename}`
            //console.log(process.env.sas_url)
            await storeImageInAzure(filePath, process.env.sas_url, doc.filename, 'crmdocuments')
            console.log('doc uploaded...');
 
            listing_documents.push(`https://pixlprithvi.blob.core.windows.net/crmdocuments/${doc.filename}`)
        }

        console.log(listing_documents);
        res.status(200).json({ message: 'Files saved successfully..', result: listing_documents });
    }
    else{
        res.status(400).json({ message: 'No files uploaded' });
        return;
    }
});


module.exports = { storeDocuments }

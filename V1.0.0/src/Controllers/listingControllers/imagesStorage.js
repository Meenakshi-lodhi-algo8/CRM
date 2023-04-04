const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');

const { uploadFileToBlob, storeImageInAzure } = require('../../HelperFunctions/Azure-Storage/azure_storage');

const storeImages = asyncHandler(async(req,res) => {
    
    var listing_images = []
    if(req.files.length > 0){
        for(var image of req.files){
            var filePath = `./public/images/${image.filename}`
            //console.log(process.env.sas_url);
            await storeImageInAzure(filePath, process.env.sas_url, image.filename, 'crmimages')
            console.log('image uploaded...');
          
            listing_images.push(`https://pixlprithvi.blob.core.windows.net/crmimages/${image.filename}`)
        }
        console.log(listing_images);
        res.status(200).json({ message: 'Files saved successfully..', result: listing_images });
    }
    else{
        res.status(400).json({ message: 'No files uploaded' });
        return;
    }
});

async function storeWatermarkImage(req,res){
    console.log(req.file);
    if(req.file){
        var filePath = `./public/images/watermark/${req.file.filename}`
        await storeImageInAzure(filePath, process.env.sas_url, req.file.filename, 'companywatermarks');
        console.log('Watermark uploaded successfully.');
        return res.status(200).json({
            message: 'Watermark uploaded successfully',
            link: `https://pixlprithvi.blob.core.windows.net/companywatermarks/${req.file.filename}`
        })
    }else{
        return res.status(400).json({
            message: 'File not found.'
        })
    }
}


module.exports = { storeImages, storeWatermarkImage }

const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');
const Listings = require('../../Models/Listings/listingModel');

const { convertExcelToJson } = require('../../HelperFunctions/convert_excel_to_json');
const { checkRequiredFields } = require('../../HelperFunctions/check_required_fields');

const importListings = asyncHandler(async (req,res) => {

    const data = await convertExcelToJson('./public/uploads/' + req.file.filename);
    const arr = data['All Listings'];

    const flag = await checkRequiredFields(arr);
    if(flag.includes(false)){
        res.status(400).json({
            message: 'Please fill in the required fields'
        });
    }else{
        arr.forEach((d) => {
            d.amenities = JSON.parse(d?.amenities);
            d.images = JSON.parse(d?.images);
            d.floor_plans = JSON.parse(d?.floor_plans);
            d.documents = JSON.parse(d?.documents);
            d.videos = JSON.parse(d?.videos);
            d.publishing = JSON.parse(d?.publishing);
        });

        const listings = await Listings.find();
        if(listings.length == 0){
            const insertListings = await Listings.insertMany(arr, (err,data) => {
                if(err){
                    res.status(400).json({
                        message: 'Mongo:Error in inserting listings',
                        err: err
                    });
                }else{
                    res.status(201).json({
                        message: 'Listings inserted successfully',
                        result: data
                    });
                }
            });
        }else{    
            const result = []    
            for(var a of arr){
                if(await Listings.findOne({title: a.title}) === null){
                    const createListings = await Listings.create(a);
                    result.push(createListings);
                }
            }
            if(result.length === 0){
                res.status(400).json({
                    message: 'Imported Data already exists!!'
                });
            }else{
                res.status(201).json({
                    message: 'Listings inserted successfully except the duplicate ones (listing with same title not inserted)',
                    result: result
                });   
            }
        }
    }
});
// importListings();
module.exports = { importListings }

/*
d.category !== '' || d.category !== null || d.category !== undefined || d.category &&
d.listing_type !== '' || d.listing_type !== null || d.listing_type !== undefined &&
d.property_type !== '' || d.property_type !== null || d.property_type !== undefined &&
d.primary_agent !== '' || d.primary_agent !== null || d.primary_agent !== undefined &&
d.built_up_area !== '' || d.built_up_area !== null || d.built_up_area !== undefined &&
d.bedrooms !== '' || d.bedrooms !== null || d.bedrooms !== undefined &&
d.bathrooms !== '' || d.bathrooms !== null || d.bathrooms !== undefined &&
d.developer !== '' || d.developer !== null || d.developer !== undefined &&
d.unit_no !== '' || d.unit_no !== null || d.unit_no !== undefined &&
d.title !== '' || d.title !== null || d.title !== undefined &&
d.description !== '' || d.description !== null || d.description !== undefined &&
d.total_price !== '' || d.total_price !== null || d.total_price !== undefined &&
d.checks !== '' || d.checks !== null || d.checks !== undefined
*/
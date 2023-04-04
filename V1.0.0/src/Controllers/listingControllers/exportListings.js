const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');

const excelJS = require('exceljs');

const Listings = require('../../Models/Listings/listingModel');


const exportAll = asyncHandler(async(req,res) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("All Listings");
    const path = './files';

    worksheet.columns = [
        { header: "S_no", key: "s_no", width:10 },
        { header: "Category", key: "category", width:10 },
        { header: "Listing_Type", key: "listing_type", width:10 },
        { header: "Property_Type", key: "property_type", width:10 },
        { header: "Primary_Agent", key: "primary_agent", width:10 },
        { header: "Secondary_Agent", key: "secondary_agent", width:10 },
        { header: "Built_Up_Area", key: "built_up_area", width:10 },
        { header: "Total_Size", key: "total_size", width:10 },
        { header: "Bedrooms", key: "bedrooms", width:10 },
        { header: "Bathrooms", key: "bathrooms", width:10 },
        { header: "Parking", key: "parking", width:10 },
        { header: "Furnishing_Type", key: "furnishing_type", width:10 },
        { header: "Developer", key: "developer", width:10 },
        { header: "Build_Year", key: "build_year", width:10 },
        { header: "Floor_Number", key: "floor_number", width:10 },
        { header: "Completion_Status", key: "completion_status", width:10 },
        { header: "Occupancy", key: "occupancy", width:10 },
        { header: "View", key: "view", width:10 },
        { header: "Title_Deed", key: "title_deed", width:10 },
        { header: "Location", key: "location", width:10 },
        { header: "Street_name", key: "street_name", width:10 },
        { header: "Street_No", key: "street_no", width:10 },
        { header: "Unit_No", key: "unit_no", width:10 },
        { header: "Maps", key: "maps", width:10 },
        { header: "Trakheesi_Permit", key: "trakheesi_permit", width:10 },
        { header: "Permit_Expiry", key: "permit_expiry", width:10 },
        { header: "Managed", key: "managed", width:10 },
        { header: "Exclusive", key: "exclusive", width:10 },
        { header: "Title", key: "title", width:10 },
        { header: "Description", key: "description", width:10 },
        { header: "Total_Price", key: "total_price", width:10 },
        { header: "Price_Per_Sq_Ft", key: "price_per_sq_ft", width:10 },
        { header: "Price_On_Application", key: "price_on_application", width:10 },
        { header: "Checks", key: "checks", width:10 },
        { header: "Commision", key: "commission", width:10 },
        { header: "Deposit", key: "deposit", width:10 },
        { header: "Amenities", key: "amenities", width:10 },
        { header: "Images", key: "images", width:10 },
        { header: "Floor_Plans", key: "floor_plans", width:10 },
        { header: "Documents", key: "documents", width:10 },
        { header: "Videos", key: "videos", width:10 },
        { header: "Publishing", key: "publishing", width:10 },
        { header: "CreatedAt", key:"createdAt", width: 15},
        { header: "UpdatedAt", key:"updatedAt", width: 15},
    ];

    const listings = await Listings.find();
    
    let counter = 1;
    listings.forEach((listing) => {
        listing.s_no = counter;
        worksheet.addRow(listing);
        counter++
    });

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });
    
    try{
        const data = await workbook.xlsx.writeFile(`${path}/listings.xlsx`);
        res.json({
            message:'File downloaded',
            path:`${path}/listings.xlsx`
        });
    }catch(err){
        res.status(400).json({
            message: 'File failed to download',
            err: err
        });
    }
});


module.exports = { exportAll }
const { create } = require('xmlbuilder2');


const DubizzleSchema = (OBJECT) => {
  const obj = {
    dubizzlepropertyfeed:{
      property: {
        status: 'vacant/deleted',
        type: OBJECT.category,
        subtype: OBJECT.property_type,
        commercialtype: OBJECT.property_type,
        zonedfor: OBJECT.listing_type,
        refno: OBJECT.reference_no,
        title: OBJECT.title,
        description: OBJECT.description,
        privateamenities: OBJECT.amenities,
        commercialamenities:'we have amenities only...ask client',
        size: OBJECT.total_size,
        sizeunits: 'sq. ft',
        price: OBJECT.total_price,
        rentpriceterm: '',
        totalclosingfee: 'N/A',
        annualcommunity: 'N/A',
        agencyfee: 'N/A',
        rentispaid: 'N/A',
        furnished: 'Yes / No, we have furnishing type ',
        bedrooms: OBJECT.bedrooms,
        bathrooms: OBJECT.bathrooms,
        developer: OBJECT.developer,
        readyby: OBJECT.build_year,
        lastupdated: OBJECT.updatedAt,
        contactemail: 'I guess agent email address',
        contactnumber: 'I guess agent number',
        locationtext: OBJECT.location,
        permit_number: OBJECT.trakheesi_permit,
        building: 'Building name',
        city: '2- for Dubai etc, code no. ',
        photos: OBJECT.images,
        view360: OBJECT.view360,
        video_url: OBJECT.youtube_link,
        geopoint: OBJECT.maps,
        freehold:'N/A'
      }
    }
  }
  
  return obj
  
}


module.exports = { DubizzleSchema }
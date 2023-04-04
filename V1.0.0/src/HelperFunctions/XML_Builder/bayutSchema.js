const { create } = require('xmlbuilder2');

function BayutSchema(OBJECT){

    const obj = {
        Properties:{
            property:{
                // for CDATA: $ is used
                Property_Ref_No: { '$': OBJECT.reference_no },
                Permit_Number: { '$': OBJECT.trakheesi_permit },
                Last_Updated: { '$': OBJECT.updatedAt },
                Property_purpose: { '$': OBJECT.category },
                Property_Type: { '$': OBJECT.property_type},
                City: { '$': 'city' },
                Locality: { '$': 'locality' },
                Sub_Locality: { '$': 'sub_locality' },
                Tower_Name: { '$': 'tower_name' },
                Price: { '$': OBJECT.price },
                Property_Title: { '$': OBJECT.title },
                Property_Description: { '$': OBJECT.description },
                Property_Size_Unit: { '$': OBJECT.total_size },
                Bedrooms: { '$': OBJECT.bedrooms },
                Bathroom: {'$': OBJECT.bathrooms },
                Listing_Agent: { '$': OBJECT.primary_agent },
                Listing_Agent_Email: { '$': 'listing_agent_email' },
                Listing_Agent_Phone: { '$': 'listing_agent_phone' },
                Off_plan: { '$': 'off_plan' },
                Features: {
                    Feature: OBJECT.amenities
                },
                // { 
                //     'Feature': { '$': 'wifi' },
                //     'Feature':{ '$': 'gorunf'}
                // },
                Images: {
                    Image: { '$': OBJECT.images },
                },
                Property_Size: { '$': OBJECT.total_size }
            }
        }
    };

    return obj;
}

module.exports = { BayutSchema }

// for(let i = 0 ; i< temp.length; i++){
//     obj.Properties.property.Features.Feature = { '$': temp[i] };
// }
// console.log(obj.Properties.property.Features)



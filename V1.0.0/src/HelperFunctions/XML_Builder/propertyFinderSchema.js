const { create } = require('xmlbuilder2');
const Listings = require('../../Models/Listings/listingModel');

function PropertyFinderSchema(OBJECT){
    const obj = {
        list : {
            '@': {
                'xmlns:c' : 'http://base.google.com/cns/1.0',
                'xmlns:g' : 'http://base.google.com/ns/1.0',
                'last_update': OBJECT.updatedAt,
                'listings_count': Listings.find().count(),
            },
            property: {
                '@': { 'last_update': OBJECT.updatedAt },
                reference_number: OBJECT.reference_no,
                permit_number: OBJECT.trakheesi_permit,
                offering_type: ' ', // Should be short codes like : Residential Rent means RR Commercial Sale: CS etc
                property_type: '', //Apartment / Bungalow
                price_on_application: OBJECT.price_on_application,
                city: '',// we have no city
                community: '', // no community
                sub_community: '', // no sub-community
                property_name: OBJECT.title,
                title: { '$': OBJECT.title },
                description: { '$': OBJECT.description },
                plot_size: OBJECT.built_up_area,
                size: OBJECT.total_size,
                bedroom: OBJECT.bedrooms,
                bathroom: OBJECT.bathrooms,
                agent: {
                    id: '',
                    name: 'agent name',
                    email: 'agent@email.com',
                    phone: '555-555-5555',
                    photo: '',
                    licence_no: '232323a3',
                    info: 'Agent'
                },
                completion_status: OBJECT.completion_status,
                parking: OBJECT.parking,
                private_amenities: OBJECT.amenities,
                geopoints: OBJECT.maps,
                price: OBJECT.price,
                photo: []
            }
        }
    };
    
    for(var image of OBJECT.images){
        obj.list.property.photo.push({
            url: { 
                '@' : { 'last_updated': 'updatedDate' },
                '#' : image
            }
        })
    }
    return obj;
}

module.exports = { PropertyFinderSchema }

//for(links of photo.url.#)
// Fix photo


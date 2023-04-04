

// ----------------* QUERY BUILDER FOR ADVANCE SEARCH *------------------------

const queryBuilder = async(
    statuses,
    agents,
    community,
    sub_community,
    listing_type,
    property_type,
    mandate_type,
    created_from,
    created_to,
    updated_from,
    updated_to,
    price_from,
    price_to,
    min_bedrooms,
    min_bathrooms,
    amenities,
    tags,
    other 
) => {

    var query = {};

    if(statuses?.length > 0) query.statuses = { $in: statuses };

    if(agents > 0) query.primary_agent = { $in: agents};

    if(community) query.community = community; 

    if(sub_community) query.sub_community = sub_community;

    if(listing_type?.length > 0) query.listing_type = { $in: listing_type };

    if(property_type > 0) query.property_type = { $in: property_type };

    if(mandate_type) query.mandate_type = mandate_type;

    if(created_from) {
        query.createdAt = { $gte: created_from };
        if(created_to) query.createdAt = {$gte: created_from, $lte: created_to};
    }
    if(created_to) {
        query.createdAt = {$lte: created_to};
        if(created_from) query.createdAt = { $gte: created_from, $lte: created_to }
    }
    
    if(updated_from) {
        query.updatedAt = { $gt: updated_from };
        if(updated_to) query.updatedAt = { $gte: updated_from, $lte: updated_to }
    }
    if(updated_to){
        query_updatedAt = { $lte: updated_to };
        if(updated_from) query.updatedAt = { $gte: updated_from, $lte: updated_to };
    }

    if(price_from){
        query.total_price = { $gte: price_from };
        if(price_to) query.total_price = { $gte: price_from, $lte: price_to };
    }
    if(price_to){
        query.total_price = { $lt: price_to };
        if(price_from) query.total_price = { $gte: price_from, $lte: price_to }
    }

    if(min_bedrooms) query.bedrooms = { $gte: min_bedrooms };

    if(min_bathrooms) query.bathrooms = {$gte: min_bathrooms };

    if(amenities?.length > 0) query.amenities = { $all: amenities };
    
    return query;
}

 // ---------------------------------------------------------------------------

module.exports = { queryBuilder } 
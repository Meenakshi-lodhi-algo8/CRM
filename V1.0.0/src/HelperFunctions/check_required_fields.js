

const checkRequiredFields = async (arr) => {
    var check = []
    for(var list of arr){
        if(
            !('category' in list) ||
            !('listing_type' in list) ||
            !('property_type' in list) ||
            !('primary_agent' in list) ||
            !('built_up_area' in list) ||
            !('bedrooms' in list) ||
            !('bathrooms' in list) ||
            !('developer' in list) ||
            !('unit_no' in list) ||
            !('title' in list) ||
            !('description' in list) ||
            !('total_price' in list) ||
            !('checks' in list)
        ){
            check.push(false);
        }else{
            check.push(true);
        }
    }
    return check
}

module.exports = { checkRequiredFields }
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

const convertExcelToJson = async (filepath) => {

    try {
        const data = await excelToJson({
            sourceFile: filepath,
            header: {
                rows: 1
            },
            columnToKey: {
                A:'s_no',
                B: 'category',
                C: 'listing_type',
                D: 'property_type',
                E: 'primary_agent',
                F: 'secondary_agent',
                G: 'built_up_area',
                H: 'total_size',
                I: 'bedrooms',
                J: 'bathrooms',
                K: 'parking',
                L: 'furnishing_type',
                M: 'developer',
                N: 'build_year',
                O: 'floor_number',
                P: 'completion_status',
                Q: 'occupancy',
                R: 'view',
                S: 'title_deed',
                T: 'location',
                U: 'street_name',
                V: 'street_no',
                W: 'unit_no',
                X: 'maps',
                Y: 'trakheesi_permit',
                Z: 'permit_expiry',
                AA: 'managed',
                AB: 'exclusive',
                AC: 'title',
                AD: 'description',
                AE: 'total_price',
                AF: 'price_per_sq_ft',
                AG: 'price_on_application',
                AH: 'checks',
                AI: 'commision',
                AJ: 'deposit',
                AK: 'amenities',
                AL: 'images',
                AM: 'floor_plans',
                AN: 'documents',
                AO: 'videos',
                AP: 'publishing',
                AQ: 'createdAt',
                AR: 'updatedAt'
            }
        });
        return data;
    } catch (error) {
        return error
    }
}

module.exports = { convertExcelToJson };
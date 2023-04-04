const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');
const mongoose = require('mongoose');
const { create } = require('xmlbuilder2');
const Listings = require('../../Models/Listings/listingModel');

const { PropertyFinderSchema } = require('../../HelperFunctions/XML_Builder/propertyFinderSchema');
const { BayutSchema } = require('../../HelperFunctions/XML_Builder/bayutSchema');
const { DubizzleSchema } = require('../../HelperFunctions/XML_Builder/dubizzleSchema');

const convert_toXML = asyncHandler(async(req,res) => {
    const id = req.params.id;
    const listing = await Listings.findById(id);
    var result = {};
    if(listing){
        
        for(var portal of listing.publishing){
            
            if(portal === 'propertyfinder'){
                const propertyFinderObj = PropertyFinderSchema(listing);
                const create_xml = create().ele(propertyFinderObj);
                const xml = create_xml.end({ prettyPrint: true });
                result.propertyFinder = xml;
            }

            if(portal === 'bayut'){
                const bayutObj = BayutSchema(listing);
                const create_xml = create().ele(bayutObj);
                const xml = create_xml.end({ prettyPrint: true });
                result.bayut = xml;
            }

            if(portal === 'dubizzle'){
                const dubizzleObj = DubizzleSchema(listing);
                const create_xml = create().ele(dubizzleObj);
                const xml = create_xml.end({ prettyPrint: true });
                result.dubizzle = xml;
            }
        }
        res.status(200).json({ message: 'OK', result: result}); 
    
    }else{
        res.status(400).json({
            message: 'Couldn\'t find listing'
        })
    }
});

const bulk_convert2xml = asyncHandler(async(req,res) => {
    const arrIDs = req.body.ids;
    
    var result = [];
    for(var id of arrIDs) {
        const listing = await Listings.findById(id);
        if(listing){
            var data = {}
            for(var portal of listing.publishing){
                if(portal === 'propertyfinder'){
                    const propertyFinderObj = PropertyFinderSchema(listing);
                    const create_xml = create().ele(propertyFinderObj);
                    const xml = create_xml.end({ prettyPrint: true });
                    data.propertyFinder = xml;
                }
    
                if(portal === 'bayut'){
                    const bayutObj = BayutSchema(listing);
                    const create_xml = create().ele(bayutObj);
                    const xml = create_xml.end({ prettyPrint: true });
                    data.bayut = xml;
                }

                if(portal === 'dubizzle'){
                    const dubizzleObj = DubizzleSchema(listing);
                    const create_xml = create().ele(dubizzleObj);
                    const xml = create_xml.end({ prettyPrint: true });
                    data.dubizzle = xml;
                }
            }
            result.push(data);
        };
    }
    res.status(200).json({ message: 'OK', result: result });
});


module.exports = { convert_toXML, bulk_convert2xml }
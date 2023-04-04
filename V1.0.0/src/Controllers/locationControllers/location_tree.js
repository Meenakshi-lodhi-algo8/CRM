const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');

const request = require('request');
const fs = require('fs');

const excelToJson = require('convert-excel-to-json');
const Communities_Desc = require('../../Models/Listings/communitesDescModel');

const fetchLocationTree = asyncHandler(async(req,res) => {
    request.get(process.env.location_url)
    .on('error', (err) => {
        console.log(err);
    })
    .pipe(fs.createWriteStream('./public/locationData/data.xls'))
    .on('close', () => {
        const result = excelToJson({
            sourceFile: './public/locationData/data.xls',
            header: { rows: 1 }
        });
        var data = [];
        for(var location of result['Location tree']){
            //data.push({City: location?.A, Community: location?.C, SubCommunity: location?.E, Property: location?.G})
            var str = `${location?.G},${location?.E},${location?.C},${location?.A}`
            data.push(str);
        }
        const filter = data.map((e) => {
            return e.replace("undefined,", "");
        })
        res.status(200).json({
            message: 'Fetched location tree successfully',
            result: filter
        })
        
    });
});


async function fetchCommunities(req,res){
    request.get(process.env.location_url)
    .on('error', (err) => {
        console.log(err);
    })
    .pipe(fs.createWriteStream('./public/locationData/data.xls'))
    .on('close', () => {
        const result = excelToJson({
            sourceFile: './public/locationData/data.xls',
            header: { rows: 1 }
        });
        var data = [];
        //console.log(result['Location tree']);

        for(var location of result['Location tree']){
            data.push(location?.C);
        }

        var uniqueArr = [...new Set(data)]
        return res.status(200).json({
            message: 'Communites fetched successfully.',
            result: uniqueArr
        });
    });
}

async function addDescToCommunities(req,res){
    const { community, description } = req.body;

    const inDB = await Communities_Desc.findOne({community: community});
    console.log(inDB);
    if(inDB){
        const updateDesc = await Communities_Desc.findOneAndUpdate({ community: community }, { description: description });
        return res.status(200).json({
            message: 'Description updated successfully.',
            result: updateDesc
        });
    }else{
        const createDesc = await Communities_Desc.create(req.body);

        return res.status(201).json({
            message: 'Description created successfully.',
            result: createDesc
        })
    }
}

async function fetchCommunitiesDesc(req,res){
    const list = await Communities_Desc.find();
    return res.status(200).json({
        message: 'Communities and their descriptions fetched successfully.',
        result: list
    })
}


module.exports = { fetchLocationTree, fetchCommunities, addDescToCommunities, fetchCommunitiesDesc }
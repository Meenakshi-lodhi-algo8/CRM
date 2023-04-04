const Excel = require('exceljs');
const request = require('request');
const fs = require('fs');
var xls = require('excel');
const excelToJson = require('convert-excel-to-json');
// url of the remote Excel file
const url = 'https://pf-ae-documents.s3.ap-southeast-1.amazonaws.com/location/download/ae/pf-location-download.xls';

// download the file
request.get(url)
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
            data.push({City: location?.A, Community: location?.C, SubCommunity: location?.E, Property: location?.G})
        }
        console.log(data);
    });


    console.log("test")
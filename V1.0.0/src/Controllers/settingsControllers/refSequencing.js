const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');

const ReferenceSequence = require('../../Models/CompaniesManagement/referenceSequenceModel');
const randomize = require('randomatic');
const CompanyProfiles = require('../../Models/CompaniesManagement/companiesProfileModel');
const Company_Auth = require('../../Models/CompaniesManagement/companyAuthModel');

// isme id(param) me company id aaegi, usse find krenge reference sequencing h uss company ki ya nhi...
const refSequencing = asyncHandler(async(req,res) => {

    const { reference_code } = req.body;
    const id = req.params.companyid;

    const company = await Company_Auth.findById(id);
    if(company){
        const sequence = await ReferenceSequence.findOne({company: id});
        if(sequence){
            const updateSequence = await ReferenceSequence.findOneAndUpdate({company:id}, {reference_code: reference_code});
    
            return res.status(200).json({
                message: `Reference code for company: ${company.company_name} updated successfully.`,
                result: updateSequence
            })
        }else{
            const createSequence = await ReferenceSequence.create({
                reference_code: reference_code,
                company: id
            });

            return res.status(201).json({
                message: `Reference code for company: ${company.company_name} saved successfully`,
                result: createSequence
            });
        }
    }else{
        return res.status(400).json({
            message: "Please give correct company id in params."
        })
    }

    // res.status(200).json({
    //     message: 'Reference Sequencing added successfully.',
    //     result: createSequence,
    //     example_sale: `${createSequence.sale_ref}-${randomize('0', 6)}`,
    //     example_rent: `${createSequence.rent_ref}-${randomize('0',6)}`
    // });
});


const fetchSequence = asyncHandler(async(req,res) => {
    // later, change this id to companyID for finding sequence of that particular company... 
    const id = req.params.id;
    const reference = await ReferenceSequence.findById(id);

    res.status(200).json({
        message: 'Sequencing fetched successfully.',
        result: reference
    });
});


module.exports = {
    refSequencing,
    fetchSequence
}
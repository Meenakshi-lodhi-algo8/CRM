const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');
const mongoose = require('mongoose');

const Listings = require('../../Models/Listings/listingModel');
const Listing_Drafts = require('../../Models/Listings/draftListingsModel');

// --------------x HELPER FUNCTION FOR ADVANCE SEARCH x-----------------------------
const { queryBuilder } = require('../../HelperFunctions/queryBuilder_for_AdvanceSearchListing');
const { storeImageInAzure } = require('../../HelperFunctions/Azure-Storage/azure_storage');

// ===================* CRUD on Listings *==========================================

// -------------------* ADD NEW LISTINGS *------------------------------------------
const sasUrl = 'https://pixlprithvi.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-05-01T14:06:17Z&st=2023-01-31T06:06:17Z&spr=https,http&sig=fG6X3i67dfMtoqiM3FtJMp%2B2h6wa64dUfLPWVHsqQPY%3D'

const addNewListing = asyncHandler(async(req,res) => {
    const id = req.params.userid;
    console.log(req.body);
    if(req.body.title){
        const listing = await Listings.findOne({user: id, title: req.body.title});
        if(listing){
            res.status(400).json({message: 'Listing already exists'});
        }else{
            req.body.user = id;
            const newListing = await Listings.create(req.body);
            logger.info('Listing created');
            res.status(201).json({
                message: 'Listing created successfully',
                result: newListing
            });
        }
    }else{
        logger.error('Title missing in req.body');
        res.status(400).json({
            message:'Please enter title'
        });
    }
});

// ---------------------------------------------------------------------------------
// -------------------------* EDIT LISTINGS *---------------------------------------

const updateListing = asyncHandler(async(req,res) => {
    const listing = await Listings.findOne({id: req.params.id, user: req.params.userid});
    if(!listing){
        logger.error('Listing not found');
        res.status(400).json({
            message: `Listing with id: ${req.params.id} NOT found`
        });
    }else{
        const updateListing = await Listings.findByIdAndUpdate(req.params.id, req.body);
        logger.info('Listing updated successfully');
        res.status(200).json({
            message: 'Listing updated successfully',
            result: updateListing
        });
    }
});

// ---------------------------------------------------------------------------------
// -------------------------* BULK EDIT LISTINGS *--------------------------------------

const bulkEditListings = asyncHandler(async(req,res) => {
    const ids = req.body.ids;
    var temp = [];
    var updatedListings = [];
    var missings = [];
    for(var id of ids){
        const listing = await Listings.findOneAndUpdate({id: id, user: req.params.userid}, req.body);
        (listing === null) ? missings.push(id) :  updatedListings.push(listing)
    }
    res.status(200).json({
        message: `${updatedListings.length} documents updated. ${missings.length} documents not found / not updated.`,
        result: updatedListings
    });
});

// ---------------------------------------------------------------------------------
// -------------------------* FETCH LISTINGS *--------------------------------------

const duplicateListing = asyncHandler(async(req,res) => {
    const listing = await Listings.findOne({id: req.params.id, user: req.params.userid});
    if(listing){
        Listings.findById(req.params.id).exec((err,data) => {
            var duplicateDoc = data;
            duplicateDoc._id = mongoose.Types.ObjectId();
            duplicateDoc.isNew = true;
            duplicateDoc.save((err, doc) => {
                if(!err){
                    logger.info('Listing cloning done');
                    res.status(200).json({message: 'Listing cloning done', result: doc});
                }else{
                    logger.error('Error in cloning listing');
                    console.log(err);
                }
            });
        });
    }else{
        res.status(400).json({message: 'Listing not found!!'});
    }
});

// ---------------------------------------------------------------------------------
// -------------------------* FETCH LISTINGS BY FILTERS *---------------------------

const filteredListings = asyncHandler(async (req,res) => {
    const {
        category, 
        listing_type,
    } = req.body;
    var query = {};
    if(category) query.category = category;
    if(listing_type) query.listing_type = listing_type
    const fetchListings = await Listings.find(query);
    res.status(200).json({
        message: 'Listing fetched according to the filters', 
        result: fetchListings
    });
});

// ---------------------------------------------------------------------------------
// -------------------------* FETCH LISTINGS *--------------------------------------

const fetchListings = asyncHandler(async(req,res) => {
    console.log(req.params.userid);
    const listings = await Listings.find();
    logger.info('Fetched listings');
    res.status(200).json({
        message:'All listings fetched',
        result: listings
    });
});

// ---------------------------------------------------------------------------------
// -------------------* DELETE LISTING *--------------------------------------------

const deleteListing = asyncHandler(async(req,res) => {
    const listing = await Listings.findOne({id: req.params.id, user: req.params.userid});
    if(listing){
        await listing.remove(req.params.id);
        logger.info(`Listing deleted successfully: ${req.params.id}`);
        res.status(200).json({
            message: `Listing deleted successfully: ${req.params.id}`
        });
    }else{
        logger.error('Listing not found');
        res.status(400).json({
            message: `Listing with id: ${req.params.id} not found`
        })
    }
});

// ---------------------------------------------------------------------------------
// -------------------* SAVE AS DRAFTS *--------------------------------------------

const saveAsDrafts = asyncHandler(async(req,res) => {
    if(!req.body.title || req.body.title === ''){
        res.status(400).json({ message: 'Please enter unique title to save it as draft'})
    }else{
        const listing  = await Listing_Drafts.findOne({title: req.body.title});
        if(!listing){
            const createListing = await Listing_Drafts.create(req.body);
            res.status(201).json({
                message: 'Listing saved as draft',
                result: createListing
            })
        }else{
            res.status(400).json({
                message: 'Listing already exists!!'
            })
        }
    }
});

// ---------------------------------------------------------------------------------
// -------------------* SAVE AS DRAFTS *--------------------------------------------

const fetchDrafts = asyncHandler(async (req,res) => {
    const drafts = await Listing_Drafts.find();
    res.status(200).json({
        message: 'Fetched all drafts',
        result: drafts
    });
});

// ---------------------------------------------------------------------------------
// -------------------* EDIT DRAFTS *-----------------------------------------------

const editDraft = asyncHandler(async(req,res) => {
    const listing = await Listing_Drafts.findById(req.params.id);
    if(!listing){
        logger.error('Listing not found');
        res.status(400).json({
            message: `Listing with id: ${req.params.id} NOT found`
        });
    }else{
        const updateListing = await Listing_Drafts.findByIdAndUpdate(req.params.id, req.body);
        logger.info('Listing updated successfully');
        res.status(200).json({
            message: 'Listing updated successfully',
            result: updateListing
        });
    }
});

// ---------------------------------------------------------------------------------
// -------------------* EDIT DRAFTS *-----------------------------------------------

const deleteDraft = asyncHandler(async(req,res) => {
    const listing = await Listing_Drafts.findById(req.params.id);
    if(listing){
        await listing.remove(req.params.id);
        logger.info(`Listing deleted successfully: ${req.params.id}`);
        res.status(200).json({
            message: `Listing deleted successfully: ${req.params.id}`
        });
    }else{
        logger.error('Listing not found');
        res.status(400).json({
            message: `Listing with id: ${req.params.id} not found`
        })
    }
});

// --------------------------------------------------------------------------------------------
// -------------------* ADVANCED SEARCH ON LISTINGS *------------------------------------------

const advanceSearch = asyncHandler(async(req,res) => {
    const {
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
    } = req.body

    const query = await queryBuilder(
        statuses, agents, community, sub_community,
        listing_type, property_type, mandate_type,
        created_from, created_to, updated_from,
        updated_to, price_from, price_to, min_bedrooms,
        min_bathrooms, amenities, tags, other
    );
    
    res.status(200).json({
        message: 'Success',
        result: await Listings.find(query)
    });
});

// ---------------------------------------------------------------------------------
// -------------------* SEARCH ON LISTINGS *----------------------------------------

const searchBar = asyncHandler(async (req,res) => {
    const search = req.body.search;

    const query = { $text: { $search: `${search}` } }
    const findInListings = await Listings.find(query, { score:{$meta:"textScore"}})
    
    var arr = [];
    for(let j = 0; j< findInListings.length; j++){
        arr.push(findInListings[j]);
    }
    res.status(200).json({message: 'OK', result: arr});
});

// ---------------------------------------------------------------------------------

module.exports = {
    addNewListing,
    duplicateListing,
    updateListing,
    bulkEditListings,
    fetchListings,
    filteredListings,
    deleteListing,
    advanceSearch,
    searchBar,
    saveAsDrafts,
    fetchDrafts,
    editDraft,
    deleteDraft
}
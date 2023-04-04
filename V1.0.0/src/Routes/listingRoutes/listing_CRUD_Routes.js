const express = require('express');
const router = express.Router();

const { protect_User } = require('../../Middlewares/protection');

const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
});
const uploads = multer({ storage: storage });

const {
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
} = require('../../Controllers/listingControllers/listing_CRUD.js');

const {
    exportAll
} = require('../../Controllers/listingControllers/exportListings');

const {
    importListings
} = require('../../Controllers/listingControllers/importListings');

const { convert_toXML, bulk_convert2xml } = require('../../Controllers/listingControllers/listing2XML');
router.get('/convert2xml/:id', convert_toXML);
router.post('/bulkpublish', bulk_convert2xml);

router.post('/:userid/addnewlisting', addNewListing);
router.post('/:userid/duplicatelisting/:id', duplicateListing);
router.post('/applyfilter', filteredListings);
router.put('/:userid/editlisting/:id' ,updateListing);
router.put('/:userid/bulkeditlistings', bulkEditListings);
router.get('/:userid/fetchalllistings', fetchListings);
router.delete('/:userid/deletelisting/:id', deleteListing);

router.post('/advancesearch', advanceSearch);

router.post('/searchbar', searchBar);

router.post('/saveasdraft', saveAsDrafts);

router.get('/fetchdrafts', fetchDrafts);

router.put('/editdraft/:id', editDraft);

router.delete('/deletedraft/:id', deleteDraft);

router.post('/importdata', uploads.single("uploadfile"), importListings);

router.get('/downloadall', exportAll);


module.exports = router;
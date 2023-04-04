/*     
       --------------------------------------------------------------
       mongo collection for saving all listings
       --------------------------------------------------------------
*/

const crypto = require('crypto');
const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Auth' 
    },
    approved: { type: Boolean },
    reference_no: {
        type: String,
        default: crypto.randomBytes(5).toString('hex'),
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Sale/Rent']
    },
    listing_type: {
        type: String,
        required: [true, 'Commericial/Residential']
    },
    property_type: {
        type: String,
        required: true
    },
    primary_agent: {
        type: String,
        required: true
    },
    secondary_agent: {
        type: String
    },
    built_up_area: {
        type: Number,
        required:[true, 'in SQ. FT.']
    },
    total_size:{
        type: Number
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    parking: {
        type: Number
    },
    furnishing_type: {
        type: String
    },
    developer: {
        type: String
        //required: true
    },
    build_year:{
        type: Number
    },
    floor_number: {
        type: String
    },
    completion_status: {
        type: String,
        required: true
    },
    occupancy:{
        type: String
    },
    view:{
        type: String
    },
    title_deed: {
        type: String
    },
    location: {
        type: String
    },
    street_name: {
        type: String
    },
    street_no:{
        type: String
    },
    unit_no: {
        type: String,
        required: true
    },
    maps: {
        type: String
    },
    trakheesi_permit: {
        type: String
    },
    permit_expiry: {
        type: String
    },
    managed: {
        type: String
    },
    exclusive: {
        type: String
    },
    title: {
        type: String,
        required: true,
        maxLength: 80,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 250
    },
    total_price: {
        type: Number,
        required: true
    },
    price_per_sq_ft:{
        type: Number
    },
    price_on_application: {
        type: String
    },
    checks: {
        type: Number,
        required: true
    },
    commission:{
        type: Number
    },
    deposit:{
        type: Number
    },
    amenities:[],
    images:{
        type: [],
        required: true
    },
    addWatermark: {
        type: Boolean
    },
    floor_plans:[],
    documents:[],
    view360: { type: String },
    youtube_link: { type: String },
    publishing:[]
},
{
    timestamps: true
});

//listingSchema.index({ title: 'text'})
listingSchema.index({ '$**' : 'text' });
module.exports = mongoose.model('Listings', listingSchema);

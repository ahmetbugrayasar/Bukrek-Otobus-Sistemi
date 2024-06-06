const mongoose = require('mongoose');

const universiteSchema = new mongoose.Schema({
    universiteId: { type: Number, required: true },
    isim: { type: String, required: true },
    alias: { type: [String], required: true },
    lokasyon: { type: [String], required: true }
});

const Universite = mongoose.model('Universiteler', personelSchema);
module.exports = Universite;
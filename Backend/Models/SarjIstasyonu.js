const mongoose = require('mongoose');

const sarjIstasyonuSchema = new mongoose.Schema({
    istasyonNo: { type: Number, required: true }
});

const sarjIstasyonu = mongoose.model('SarjIstasyonlari', sarjIstasyonuSchema);
module.exports = sarjIstasyonu;
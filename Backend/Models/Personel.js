const mongoose = require('mongoose');

const personelSchema = new mongoose.Schema({
    personelId: { type: Number, required: true },
    dogumTarih: { type: Date, required: true },
    kayitTarih: { type: Date, required: true },
    sigortaTuru: { type: String, required: true },
    ehliyetTuru: { type: String, required: true }
});

const Personel = mongoose.model('Personeller', personelSchema);
module.exports = Personel;
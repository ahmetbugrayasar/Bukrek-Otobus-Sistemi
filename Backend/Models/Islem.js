const mongoose = require('mongoose');

const islemSchema = new Schema({
    islemId: { type: Number, required: true },
    otobusId: { type: Number, required: true },
    islemTarih: { type: Date, required: true },
    tutar: { type: Number, required: true }
});

const Islem = mongoose.model('Islemler', islemSchema);
module.exports = Islem;
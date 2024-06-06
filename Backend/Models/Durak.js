const mongoose = require('mongoose');

const durakSchema = new Schema({
    durakNo: { type: Number, required: true },
    durakDurumu: { type: String, required: true }
});

const Durak = mongoose.model('Duraklar', durakSchema);
module.exports = Durak;
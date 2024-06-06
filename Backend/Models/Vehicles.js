const mongoose = require('mongoose');
const OtobusSchema = new mongoose.Schema(
    {
        OtobusPlakaNo: {
            type: String,
            required: true,
        },
        OtobusRuhsatNo: {
            type: String,
            required: true,
        },
        OtobusKapasite: {
            type: String,
            required: true,
        },
        OtobusDurum: {
            type: String,
            required: true,
        },
        OtobusSarj:{
            type: String,
            required: true,
        },
        OtobusBaslangicNoktasi: {
            type: String,
            required: false,
        },
        createdAt: { type: Date},
        updatedAt: { type: Date},
    });

const Otobusler = mongoose.model("Vehicles", OtobusSchema)
module.exports = Otobusler;

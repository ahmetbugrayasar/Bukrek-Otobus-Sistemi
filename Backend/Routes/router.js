const express = require('express');
const router = express.Router();
const otobusler = require('../Models/Vehicles');

//Inserting(Creating) Data:
router.post("/insertotobus", async (req, res) => {
    
    const { OtobusPlakaNo, OtobusRuhsatNo, OtobusKapasite, OtobusDurum, OtobusSarj, OtobusBaslangicNoktasi,createdAt } = req.body;
    try {
        const pre = await otobusler.findOne({ OtobusPlakaNo: OtobusPlakaNo })
        console.log(pre);

        if (pre) {
            res.status(422).json("Sistemde böyle bir otobüs mevcut!")
        }
        else {
            const addOtobus = new otobusler({ OtobusPlakaNo, OtobusRuhsatNo, OtobusKapasite, OtobusDurum,
                                              OtobusSarj, OtobusBaslangicNoktasi, createdAt})
            await addOtobus.save();
            res.status(201).json(addOtobus)
            console.log(addOtobus)
        }
    }
    catch (err) {
        console.log(err)
    }
})

//Getting(Reading) Data:
router.get('/otobusler', async (req, res) => {

    try {
        const getOtobus = await otobusler.find({})
        console.log(getOtobus);
        res.status(201).json(getOtobus);
    }
    catch (err) {
        console.log(err);
    }
})

//Getting(Reading) individual Data:
router.get('/otobusler/:id', async (req, res) => {

    try {
        const getOtobus = await otobusler.findById(req.params.id);
        console.log(getOtobus);
        res.status(201).json(getOtobus);
    }
    catch (err) {
        console.log(err);
    }
})

//Editing(Updating) Data:
router.put('/updateotobus/:id', async (req, res) => {
    const { OtobusPlakaNo, OtobusRuhsatNo, OtobusKapasite, OtobusDurum, OtobusSarj, OtobusBaslangicNoktasi } = req.body;
    otobusSchema.pre('save', function (next) {
        this.updatedAt = Date.now();
        next();
      });
    try {
        const updateOtobus = await otobusler.findByIdAndUpdate(req.params.id,
            { OtobusPlakaNo, OtobusRuhsatNo, OtobusKapasite, OtobusDurum, OtobusSarj, OtobusBaslangicNoktasi }, { new: true });
        console.log("Güncelleme Başarılı");
        res.status(201).json(updateOtobus);

    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/deleteotobus/:id', async (req, res) => {

    try {
        const deleteOtobus = await otobusler.findByIdAndDelete(req.params.id);
        console.log("Otobus Silindi");
        res.status(201).json(deleteOtobus);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;
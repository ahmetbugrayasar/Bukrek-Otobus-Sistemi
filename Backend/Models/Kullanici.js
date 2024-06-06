const mongoose = require('mongoose');

const kullaniciTipiSchema = new mongoose.Schema({
    tipId: { type: Number, required: true },
    tipIsim: { type: String, required: true },
    tipYetkiler: {type: Array, required: true}
});

const KullaniciTipi = mongoose.model('KullaniciTipi', kullaniciTipiSchema);


const kullaniciSchema = new mongoose.Schema({
    kullaniciId: { type: Number, required: true },
    uuid: { type: String, required: true },
    isim: { type: String, required: true },
    uyariSayisi: { type: Number, required: true },
    kullaniciTipi: { type: Schema.Types.ObjectId, ref: 'KullaniciTipi', required: true },
    bakiye: { type: Number, required: true }
});

const Kullanici = mongoose.model('Kullanici', kullaniciSchema);
module.exports = KullaniciTipi;
module.exports = Kullanici;


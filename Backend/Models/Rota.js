const mongoose = require('mongoose');
const rotaSchema = new Schema({
    rotaId: { type: Number, required: true },
    nodes: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Durak' }],
      required: true,
      min: 2, 
      max: 99, 
    },
    rotaTarih: { type: Date, required: true },
    rotaUzunluk: { type: Number, required: true }
  });

const Rota = mongoose.model('Rotalar', rotaSchema);
module.exports = Rota;
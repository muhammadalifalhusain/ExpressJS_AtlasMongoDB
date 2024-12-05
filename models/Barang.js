// models/Barang.js
const mongoose = require('mongoose');

const BarangSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    harga: {
        type: Number,
        required: true,
    },
    stok: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Barang', BarangSchema);
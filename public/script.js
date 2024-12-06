// script.js

const formBarang = document.getElementById('formBarang');
const barangTable = document.getElementById('barangTable').getElementsByTagName('tbody')[0];

let updateId = null; // Variable untuk menyimpan ID barang yang sedang diupdate

// Fungsi untuk mengambil semua barang
const fetchBarang = async() => {
    const response = await fetch('/barang');
    const data = await response.json();
    renderBarang(data);
};

// Fungsi untuk merender barang ke tabel
const renderBarang = (barang) => {
    barangTable.innerHTML = ''; // Clear existing table rows
    barang.forEach(item => {
        const row = barangTable.insertRow();
        row.innerHTML = `
            <td>${item.nama}</td>
            <td>${item.harga}</td>
            <td>${item.stok}</td>
            <td>
                <button onclick="fillUpdateForm('${item._id}', '${item.nama}', '${item.harga}', '${item.stok}')">Update</button>
                <button onclick="deleteBarang('${item._id}')">Delete</button>
            </td>
        `;
    });
};

// Fungsi untuk mengisi form dengan data barang yang akan diupdate
const fillUpdateForm = (id, nama, harga, stok) => {
    document.getElementById('nama').value = nama;
    document.getElementById('harga').value = harga;
    document.getElementById('stok').value = stok;
    updateId = id; // Set updateId dengan ID barang yang dipilih
};

// Fungsi untuk menambah atau mengupdate barang
formBarang.addEventListener('submit', async(event) => {
    event.preventDefault();

    const nama = document.getElementById('nama').value;
    const harga = document.getElementById('harga').value;
    const stok = document.getElementById('stok').value;

    if (updateId) {
        // Update barang jika updateId tidak null
        await fetch(`/barang/${updateId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nama, harga, stok })
        });
        updateId = null; // Reset updateId setelah update selesai
    } else {
        // Tambah barang baru jika updateId null
        await fetch('/barang', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nama, harga, stok })
        });
    }

    fetchBarang(); // Reload barang setelah data diperbarui atau ditambahkan
    formBarang.reset(); // Clear form
});

// Fungsi untuk menghapus barang
const deleteBarang = async(id) => {
    if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
        await fetch(`/barang/${id}`, { method: 'DELETE' });
        fetchBarang(); // Reload barang setelah dihapus
    }
};

// Load barang saat halaman pertama kali dibuka
fetchBarang();
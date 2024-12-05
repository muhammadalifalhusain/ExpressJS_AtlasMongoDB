// script.js

const formBarang = document.getElementById('formBarang');
const barangTable = document.getElementById('barangTable').getElementsByTagName('tbody')[0];

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
                <button onclick="updateBarang('${item._id}')">Update</button>
                <button onclick="deleteBarang('${item._id}')">Delete</button>
            </td>
        `;
    });
};

// Fungsi untuk menambah barang
formBarang.addEventListener('submit', async(event) => {
    event.preventDefault();

    const nama = document.getElementById('nama').value;
    const harga = document.getElementById('harga').value;
    const stok = document.getElementById('stok').value;

    const response = await fetch('/barang', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nama, harga, stok })
    });

    const newBarang = await response.json();
    fetchBarang(); // Reload barang setelah data ditambahkan

    // Clear form
    formBarang.reset();
});

// Fungsi untuk mengupdate barang
const updateBarang = async(id) => {
    const nama = prompt("Nama Barang:");
    const harga = prompt("Harga Barang:");
    const stok = prompt("Stok Barang:");

    if (nama && harga && stok) {
        await fetch(`/barang/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nama, harga, stok })
        });

        fetchBarang(); // Reload barang setelah update
    }
};

// Fungsi untuk menghapus barang
const deleteBarang = async(id) => {
    if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
        await fetch(`/barang/${id}`, { method: 'DELETE' });
        fetchBarang(); // Reload barang setelah dihapus
    }
};

// Load barang saat halaman pertama kali dibuka
fetchBarang();
// Daftar produk (urutan sesuai HTML)
const produkList = [
  { id: 1, nama: "HERMES birkin 30 Blue Pale", harga: 400000000 },
  { id: 2, nama: "HERMES Kelly Retourne Bi-Tone", harga: 1000000000 },
  { id: 3, nama: "HERMES Evelyn TPM Plum", harga: 90000000 },
  { id: 4, nama: "HERMES Kelly Mini", harga: 300000000 },
  { id: 5, nama: "HERMES Birkin x Pop Art", harga: 500000000 },
  { id: 6, nama: "HERMES Birkin Graffiti Edition", harga: 1450000000 },
  { id: 7, nama: "HERMES Kelly Pochette", harga: 170000000 },
  { id: 8, nama: "HERMES Herbag Zip", harga: 85000000 },
  { id: 9, nama: "HERMES Kelly", harga: 280000000 },
  { id: 10, nama: "HERMES Birkin Crocodile", harga: 1880000000 },
  {
    id: 11,
    nama: "HERMES Birkin Faubourg (Limitid Edition)",
    harga: 4880000000,
  },
  {
    id: 12,
    nama: "HERMES Birkin 30 Himalaya (Limitid Edition)",
    harga: 6000000000,
  },
];

let keranjang = [];

// Tambah produk ke keranjang
function tambahKeKeranjang(index) {
  keranjang.push(produkList[index]);
  updateKeranjang();
}

// Hapus produk dari keranjang
function hapusDariKeranjang(i) {
  keranjang.splice(i, 1);
  updateKeranjang();
}

// Tampilkan isi keranjang
function updateKeranjang() {
  const keranjangList = document.getElementById("keranjang-list");
  const jumlahKeranjang = document.getElementById("jumlah-keranjang");
  const totalHarga = document.getElementById("total-harga");

  keranjangList.innerHTML = "";
  let total = 0;

  keranjang.forEach((item, i) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("keranjang-item");
    itemEl.innerHTML = `
      <p>${item.nama} - Rp ${item.harga.toLocaleString("id-ID")}</p>
      <button onclick="hapusDariKeranjang(${i})" style="background:#dc3545; color:white; border:none; padding:4px 8px; cursor:pointer;">Hapus</button>
    `;
    keranjangList.appendChild(itemEl);
    total += item.harga;
  });

  totalHarga.textContent = total.toLocaleString("id-ID");
  jumlahKeranjang.textContent = ` (${keranjang.length})`;
}

// Kirim ke WhatsApp ketika tombol "Beli" diklik
function beliLangsung(index) {
  const produk = produkList[index];
  const nomorWa = "6282130447089"; // Ganti dengan nomor aslimu jika perlu
  const pesan = `Halo, saya tertarik membeli produk:\n\n${
    produk.nama
  }\nHarga: Rp ${produk.harga.toLocaleString(
    "id-ID"
  )}\n\nApakah masih tersedia?`;
  const url = `https://wa.me/${nomorWa}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
}

// Tunggu DOM siap
document.addEventListener("DOMContentLoaded", () => {
  const beliBtns = document.querySelectorAll(".beli-btn");
  const tambahBtns = document.querySelectorAll(".tambah-keranjang-btn");

  // Tombol "Tambah ke Keranjang"
  tambahBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      tambahKeKeranjang(index);
      alert(`"${produkList[index].nama}" telah ditambahkan ke keranjang.`);
    });
  });

  // Tombol "Beli"
  beliBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      beliLangsung(index);
    });
  });
});

// Tombol Checkout
const checkoutBtn = document.getElementById("checkout-btn");
checkoutBtn.addEventListener("click", () => {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  let pesan = "Halo, saya ingin checkout produk berikut:\n\n";
  let total = 0;

  keranjang.forEach((item, i) => {
    pesan += `${i + 1}. ${item.nama} - Rp ${item.harga.toLocaleString(
      "id-ID"
    )}\n`;
    total += item.harga;
  });

  pesan += `\nTotal: Rp ${total.toLocaleString(
    "id-ID"
  )}\n\nApakah semua tersedia?`;
  const nomorWa = "6282130447089"; // Ganti jika perlu
  const url = `https://wa.me/${nomorWa}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
});

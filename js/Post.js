// Ambil data email dari localStorage
const localUser = JSON.parse(localStorage.getItem('user'));
const localEmail = localUser ? localUser.email : '';


let datarek = [];
let htmlrek = '';
const rekresult = document.getElementById('rekresult'); // Pastikan elemen ini terdefinisi

function tambahrekening() {
  const namaBank = document.getElementById('namaBank').value;
  const norek = document.getElementById('norek').value;
  const namarek = document.getElementById('namarek').value;

  // Tambahkan data ke dalam array
  datarek.push({
    'namaBank': namaBank,
    'norek': norek,
    'namarek': namarek
  });

  // Reset htmlrek
  htmlrek = '';

  // Loop melalui datarek dan buat ulang HTML
  datarek.forEach(function(item) {
    htmlrek += `
      <div class="card border border-1 rounded-4 bg-blue-100" style="padding:20px;width:45%;margin-bottom:10px;">
        <h3>${item.namaBank}</h3>
        <b>${item.norek}</b>
        <span>A/n ${item.namarek}</span>
      </div>`;
  });

  // Tampilkan hasil ke DOM
  rekresult.innerHTML = htmlrek;
}

let datagallery = [];
let htmlgallery = '';
 function tambahgallery(){
   const urlgallery = document.getElementById('urlgallery').value
   if(datagallery.length <= 5){
     datagallery.push({
       'urlgallery': urlgallery
      });
      htmlgallery+=`<p>${urlgallery}</p>`;
      
      document.getElementById('galleryresult').innerHTML = htmlgallery;
     }else{
       alert('data tidak boleh lebih dari 6');
     }
   }

function submitForm(){
  const localEmail = 'ilhamalkhuder9@gmail.com';
  const fotopria = document.getElementById('fotopria').value;
  const namamantenpanggilpria = document.getElementById('namamantenpanggilpria').value;
  const namamantenpria = document.getElementById('namamantenpria').value;
  const namaAyahPria = document.getElementById('namaayahpria').value;
  const namaIbuPria = document.getElementById('namaibupria').value;
  const fotoWanita = document.getElementById('fotowanita').value;
  const namaPanggilanWanita = document.getElementById('namamantenpanggilwanita').value;
  const namaWanita = document.getElementById('namamantenwanita').value;
  const namaAyahWanita = document.getElementById('namaayahwanita').value;
  const namaIbuWanita = document.getElementById('namaibuwanita').value;
  const tanggalAcara = document.getElementById('tanggal').value;
  const lokasiAcara = document.getElementById('lokasi').value;
  const akadAcara = document.getElementById('akad').value;
  const resepsiAcara = document.getElementById('resepsi').value;
  const urlgmaps = document.getElementById('urlgmaps').value;
document.getElementById('spinner').classList.remove('hidden')

// URL database Firebase
const dbUrl = 'https://posdata-16c78-default-rtdb.firebaseio.com/userdatabaru.json';

// Variabel data awal
let manten2 = namamantenpanggilpria +'dan'+namaPanggilanWanita;

async function checkDataAndPost() {
  try {
    // Lakukan GET untuk mengecek data yang ada di database
    const response = await fetch(dbUrl);
    const data = await response.json();

    // Cek apakah data sudah ada
    if (data && Object.keys(data).includes(manten2)) {
      let counter = 1;

      // Tambahkan angka unik hingga tidak ada lagi data yang sama
      while (Object.keys(data).includes(manten2 + counter)) {
        counter++;
      }

      // Update variabel manten2 dengan angka unik
      manten2 = manten2 + counter;
    }

    // Setelah data dianggap unik, lakukan POST
    const postUrl = `https://posdata-16c78-default-rtdb.firebaseio.com/userdatabaru/${manten2}.json`;
    const postData = { 
      localEmail,
      manten2,
      namamantenpanggilpria,
      namamantenpria,
      namaAyahPria,
      namaIbuPria,
      fotopria,
      namaPanggilanWanita,
      namaWanita,
      namaAyahWanita,
      namaIbuWanita,
      fotoWanita,
      tanggalAcara,
      lokasiAcara,
      akadAcara,
      resepsiAcara,
      urlgmaps,
      datagallery,
      datarek
      };

    const postResponse = await fetch(postUrl, {
      method: 'PUT', // Menggunakan PUT untuk menyimpan data unik
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (postResponse.ok) {
      document.getElementById('spinner').classList.add('hidden');
      document.write(`<div class="input-container flex items-center border-2 border-gray-300 rounded full px-4 py-2">
        <i class="fas fa-question text-gray-500"></i>
         <div class="ml-4">
           <label class="block text-gray-400">Url undangan</label>
           <input type="text" class="outline-none text-gray-400" placeholder="Url Undangan Anda" value="https://undangan-digital-haw.vercel.app/?undangan=${manten2}&untuk=teman" id="urlundangan">
           </div><button class="bg-blue-400 text-white py-2 px-4 " onclick="visit()">Visit url</button>
           <button class="bg-green-400 text-white py-2 px-4 rounded-full">Kembali</button>`)
      console.log('Data berhasil disimpan:', manten2);
    } else {
      console.error('Gagal menyimpan data');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
}

// Panggil fungsi untuk memulai pengecekan dan post data
checkDataAndPost();
}

function visit(){
  const urlundangan = document.getElementById('urlundangan').value;
  location.href=urlundangan
}

window.onpopstate = function(event) {
  // Mengarahkan ke index.html saat tombol kembali ditekan
  window.location.href = 'index.html';
};

// Menambahkan history state saat halaman dimuat
window.onload = function() {
  history.pushState(null, document.title, location.href);
};
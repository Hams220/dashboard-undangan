// Ambil data email dari localStorage
const localUser = JSON.parse(localStorage.getItem('user'));
const localEmail = localUser ? localUser.email : '';
if(!localEmail){
  location.href = 'login.html';
}
console.log(localEmail)

fetch('https://posdata-16c78-default-rtdb.firebaseio.com/userdata.json')
  .then(response => response.json())
  .then(data => {
    // Lakukan iterasi melalui data yang diterima
    Object.keys(data).forEach(key => {
      let user = data[key];  // Ambil user berdasarkan key
      
      // Cek apakah email user sesuai dengan email yang ada di localStorage
      if (user.email === localEmail) {
        document.getElementById('nama_user').innerHTML = user.username;
        document.getElementById('nama_user1').innerHTML = user.username;
        document.getElementById('email_user').innerHTML = user.email;
        statuspaket.innerHTML = user.statuspaket;

        //paket trial user
const targetDate = new Date(user.berlakuhingga); // Tanggal target hitung mundur
const updateInterval = 1000; // Interval update dalam milidetik

function updateCountdown() {
  const now = new Date();
  const timeDiff = targetDate - now;

  if (timeDiff <= 0) {
    document.getElementById('months').textContent = '0 m';
    document.getElementById('days').textContent = '0 d';
    document.getElementById('time').textContent = '00h : 00m : 00s';
    return;
  }

  const totalSeconds = Math.floor(timeDiff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);
  
  const months = Math.floor(totalDays / 30); // Approximation
  const days = totalDays % 30; // Sisa hari setelah dibagi bulan

  document.getElementById('months').textContent = `${months} m`;
  document.getElementById('days').textContent = `${days} d`;
  document.getElementById('time').textContent = `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;
}

setInterval(updateCountdown, updateInterval);
updateCountdown();

      }
    });
  })
  .catch(error => {
    // Redirect ke halaman login jika ada error
    location.href = 'login.html';
    console.error('Error:', error);
  });

  //tanggal hari ini
  function formatDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const today = new Date();
    const dayName = days[today.getDay()];
    const day = today.getDate();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();

    return `Today is ${dayName}, ${day} ${monthName} ${year}`;
  }

  document.getElementById('dateDisplay').textContent = formatDate();

  

    const url = 'https://posdata-16c78-default-rtdb.firebaseio.com/userdatabaru.json';

    // Ambil data dari API Firebase
    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            let resulthtml = '';
    
            // Iterasi melalui setiap sub-objek
            for (const key in data) {
                const userData = data[key];
                // Periksa jika email cocok dengan targetEmail
                if (userData.localEmail === localEmail) {
                    resulthtml += `<div class="task-card p-3 mb-3" style="display:flex;justify-content:space-between;">
                    <div>
                    <div class="d-flex justify-content-between align-items-center mb-2" id="${userData.namamantenpanggilpria}dan${userData.namaPanggilanWanita}" onclick="openundangan(this.id)">
                        <h3 class="h6 mb-0">${userData.namamantenpanggilpria} & ${userData.namaPanggilanWanita} (pernikahan)</h3>
                        <span class="badge bg-warning"></span>
                    </div>
                    <p class="text-muted mb-0">berlaku hingga : 05-06-2024</p>
                    </div>
                    <div>
                    <button class="btn btn-primary" onclick="location.href='https://undangan-digital-haw.vercel.app/?undangan=${userData.manten2}&untuk=teman'"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-danger text-white" onclick="hapusData('${key}')"><i class="bi bi-trash3"></i></button>
                    <button class="btn btn-warning text-white"><i class="bi bi-pencil-square"></i></button>
                    </div>
                </div>`;
                }
            }
    
            dataundangananda.innerHTML = resulthtml;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


function hapusData(idd) {
  console.log(idd)
  const url = `https://posdata-16c78-default-rtdb.firebaseio.com/userdatabaru/${idd}.json`;

  Swal.fire({
    title: 'Konfirmasi Hapus',
    text: 'Apakah Anda yakin ingin menghapus data ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
        } else {
          Swal.fire('Gagal!', 'Gagal menghapus data: ' + response.statusText, 'error');
        }
      })
      .catch(error => {
        Swal.fire('Error!', 'Terjadi kesalahan: ' + error, 'error');
      });
    }
  });
}

// Panggil fungsi untuk menghapus data
hapusData();

    

            function openundangan(id){
              document.write(id)
            }

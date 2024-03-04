


# Tata Cara menjalankan aplikasi

Untuk menjalankan aplikasi, program frontend dan backend harus dijalankan bersamaan dengan perintah berikut.  
1. Buka command prompt
2. Jalankan skrip berikut
```  
cd 1-frontend
npm install
npm run dev
```  
1. Buka command prompt kedua
2. Jalankan skrip berikut
```
cd 2-backend
npm install
npm run dev
```

## Pemakaian Aplikasi
1. Frontend 
Frontend merupakan halaman website yang berfungsi melayani proses input form yang terdiri dari data nama, email, dan nomor telepon. 
   
Teknologi:
 - VanillaJS
 - TailwindCSS
  
Petunjuk Penggunaan:
 - Pastikan program frontend dan backend sudah berjalan
 - Buka Browser dengan url http://localhost:8080

Skema Pengujian:
 1. Pengujian Desain Responsif
    Frontend didesain responsif untuk 3 jenis device, yaitu smartphone, tablet, dan desktop  
    Pada tablet dan desktop, Frontend didesain dalam bentuk 2 sisi, yaitu sisi kiri yang berisi teks keterangan dan sisi kanan yang berisi form.
    Step:
    1. Buka Browser Dev Tools dengan "Ctrl + Shift + C", lalu tekan "Ctrl + Shift + M"
    2. Ubah lebar layar dari ukuran desktop hingga smartphone untuk melihat tampilan tiap device

 2. Pengujian Validasi 
    Frontend melakukan validasi diawal sebelum data disubmit. Validasi yang gagal ditampilkan dengan warna berbeda untuk mempermudah user dalam memperbaiki data form.
    Step:
    1. Isi data form
    2. Tekan tombol Submit

    Adapun fitur validasi input dengan aturan sebagai berikut.
    1. Input nama,email dan nomor telepon tidak boleh kosong
    2. Input email harus mengikuti format email
    3. Input nomor telepon hanya boleh diisi oleh angka
    4. Input nama dan email tidak boleh melebihi 30 karakter
    5. Input nomor telepon tidak boleh melebihi 15 karakter

  3. Pengujian submit
    Setelah melalui proses validasi data akan di submit ke Backend.  
    User akan diberi notifikasi jika proses submit berhasil. 
    
    Step:
    1. Isi data form
    2. Tekan tombol Submit
    3. Klik tautan ***Check Data Here*** dibawah tombol submit 


2. Backend 
Backend berfungsi sebagai api server untuk menyimpan dan membaca data form dari Frontend.  
Backend dibuat dengan menggunakan NodeJS dengan framework expressJS. 
Data form disimpan dalam bentuk penyimpanan file.
Adapun api yang dibuat memiliki spesifikasi sebagai berikut.
 - [GET] http://localhost:5000/api/forms
    Fungsi : untuk membaca seluruh data form yang disimpan Backend
 - [GET] http://localhost:5000/api/forms?id=2
    Fungsi : untuk mencari data form berdasarkan id
 - [POST] http://localhost:5000/api/forms
    Header : { Content-Type: 'application/x-www-form-urlencoded' }
    Body   : { name: string, email: string, phone_area: string, phone_number: string }
    Fungsi : untuk menyimpan data form ke dalam Backend
  
Teknologi:
 - NodeJS
 - ExpressJS

Petunjuk Penggunaan:
 - Pastikan program frontend dan backend sudah berjalan
 - Akses api server dengan url http://localhost:5000 dengan curl atau Postman atau browser

Skema Pengujian:
  1. Buka command prompt
  2. Test dengan curl 
  ```
  # tambah 2 data baru
  curl -X POST http://localhost:5000/api/forms -d "name=User1&email=user1@gmail.com&phone_area=+62&phone_number=8123123123" -H "Content-Type: application/x-www-form-urlencoded"
  curl -X POST http://localhost:5000/api/forms -d "name=User2&email=user2@gmail.com&phone_area=+62&phone_number=8123123123" -H "Content-Type: application/x-www-form-urlencoded"

  # baca semua data
  curl -X GET http://localhost:5000/api/forms

  # cari data dengan id=1
  curl -X GET http://localhost:5000/api/forms?id=1
  ```


3. Automated Testing 
Testing dilakukan melalui skrip Selenium untuk melakukan pengujian Frontend secara otomatis.  
Untuk itu perlu dipastikan bahwa frontend  

Pengujian pada Backend dapat dilakukan melalui Frontend untuk melakukan penyimpanan dan pembacaan data form. 

Teknologi:
 - Python 3.9
 - Selenium
 - Driver Chrome
  
Petunjuk Penggunaan:
 - Install python ^3.9
 - Install pip3
 - Jalankan skrip dengan perintah berikut
 ```
  cd 3-automated-testing

  pip3 install -r requirement.txt
  pip3 install virtualenv
  virtualenv -p python3 .venv 
  source .venv/bin/activate

  python -m unittest discover

  deactivate
 ```


Skema Pengujian:
  1. Skema pengujian tertera di dalam program main.py mengikuti skema pengujian validasi Frontend 

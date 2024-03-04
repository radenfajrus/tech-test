
# Automated Testing
Tugas:
Buatlah skrip otomatis menggunakan Selenium atau Puppeteer untuk mengotomatisasi pengujian frontend yang telah Anda bangun pada Hari 1. Skrip harus  dapat memasukkan data ke dalam formulir, mengirim formulir, dan memverifikasi bahwa data telah disimpan dengan benar pada server backend yang telah Anda bangun pada Hari 2.

Kriteria Penilaian:
 - Kemampuan untuk mengotomatisasi interaksi dengan halaman web menggunakan Selenium atau Puppeteer.
 - Skrip dapat berjalan tanpa kegagalan dan memberikan hasil pengujian yang benar.


## Preparation
1. Install python 3.9
2. Install pip 
pip -r requirement.txt
3. Create Virtual Env

python -m venv .venv
source .venv/Scripts/activate

python main.py


4. Test all case
python -m unittest discover

5. Test per file
python -m unittest testcases.test_form.VerifyDisplayValidation

# Pengembangan Backend
Tugas:
Bangun sebuah server sederhana menggunakan Node.js atau framework Express.
Buatlah endpoint API yang dapat menerima data formulir dari frontend pada Hari 1
dan menyimpannya ke dalam sebuah penyimpanan data sederhana, misalnya dalam
bentuk array di dalam server. Pastikan bahwa server dapat mengembalikan data yang
telah disimpan ketika diminta oleh frontend.

Kriteria Penilaian:
- Penggunaan Node.js atau Express untuk mengembangkan server.
- Desain endpoint API yang baik.
- Kemampuan server untuk menerima, menyimpan, dan mengembalikan data

## Preparation
1. Install npm & node
2. Install npm library 
npm install --save express body-parser cors compression dotenv express-validator
npm install --save-dev ts-node typescript '@types/node'
npm install --save-dev nodemon
3. Create tsconfig.json
```
{
  "compilerOptions": {
    "esModuleInterop": true,
  }
}
```


## How to start
1. Run as dev 
npm run dev

// Open browser localhost:8000

2. Build prod 
npm run build
node index.js

// Open browser localhost:8000





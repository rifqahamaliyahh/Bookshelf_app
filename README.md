# Bookshelf_app
Submision Dicoding pada kelas  Belajar Membuat Front-End Web untuk Pemula dengan keriteria :  

* Bookshelf Apps harus mampu menambahkan data buku baru. Data buku yang disimpan merupakan objek JavaScript dengan struktur berikut:
```bash
{
  id: string | number,
  title: string,
  author: string,
  year: number,
  isComplete: boolean,
}
```

* Bookshelf Apps harus memiliki 2 Rak buku. Yakni, “Belum selesai dibaca” dan “Selesai dibaca”.
* Rak buku "Belum selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai false.
* Rak buku "Selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai true.
* Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dipindahkan di antara keduanya.
* Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dihapus.
* Data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat bertahan walaupun halaman web ditutup. Anda harus menyimpan data buku pada localStorage.

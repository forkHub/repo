# Widget Kalendar:

Sebuah library untuk membuat widget kalender yang flexible bisa di kustom.

Terdiri dari 3 fungsi utama:

**daftarTanggal(bulan: number, tahun: number):Date[]**
Menghasilkan daftar tanggal dari hari senin awal bulan hingga hari minggu akhir bulan. Hasilnya seperti yang ada dikalendar.

**table(bulan: number, tahun: number, renderNamaHari: boolean): HTMLElement**
Menghasilkan sebuah element html berupa table tanggal

**widget(bulan: number, tahun: number): HTMLElement**
Menghasilkan sebuah element html berupa sebuah widget yang bisa dipasang pada halaman web.
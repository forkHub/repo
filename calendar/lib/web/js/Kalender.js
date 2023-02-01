export function daftarTanggal(bulan, tahun) {
    let date = new Date(Date.now());
    let tanggalAr = [];
    date.setFullYear(tahun, bulan, 1);
    date.setHours(0, 0, 0, 0);
    tanggalAr.push(date);
    console.log(date);
    while (true) {
        date = tanggalAr[0];
        if (date.getDate() != 1) {
            let date2;
            date2 = new Date(date);
            date2.setDate(date2.getDate() - 1);
            console.log(date2);
            tanggalAr.unshift(date2);
        }
        else {
            break;
        }
    }
    while (true) {
        date = tanggalAr[tanggalAr.length - 1];
        let date2 = new Date(date);
        date2.setDate(date2.getDate() + 1);
        if (date2.getMonth() != date.getMonth()) {
            break;
        }
        else {
            tanggalAr.push(date2);
        }
    }
    for (let i = 0; i < 10; i++) {
        tambahAkhir(tanggalAr);
        tambahAwal(tanggalAr);
    }
    function tambahAwal(dateAr) {
        let date;
        date = dateAr[0];
        if (0 == date.getDay()) {
            return;
        }
        else {
            let date2 = new Date(date);
            date2.setDate(date2.getDate() - 1);
            dateAr.unshift(date2);
        }
    }
    function tambahAkhir(dateAr) {
        let date;
        date = dateAr[dateAr.length - 1];
        if (6 == date.getDay()) {
            return;
        }
        else {
            let date2 = new Date(date);
            date2.setDate(date2.getDate() + 1);
            dateAr.push(date2);
        }
    }
    return tanggalAr;
}
export function table(bulan, tahun, renderNamaHari) {
    let hasil = document.createElement('div');
    let row;
    let namaHari = ['ahad', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    let dateAr = daftarTanggal(bulan, tahun);
    hasil.classList.add('table-bulan');
    //render daftar hari
    if (renderNamaHari) {
        row = document.createElement('div');
        row.classList.add('minggu');
        row.classList.add('judul');
        hasil.appendChild(row);
        for (let i = 0; i < 7; i++) {
            let cell = document.createElement('div');
            cell.classList.add('tanggal');
            row.appendChild(cell);
            cell.innerText = namaHari[i];
        }
    }
    for (let i = 0; i < dateAr.length; i++) {
        //buat baris minggu
        if ((i % 7) == 0) {
            row = document.createElement('div');
            row.classList.add('minggu');
            hasil.appendChild(row);
        }
        //buat cell tempat tanggal
        let cell = document.createElement('div');
        cell.classList.add('tanggal');
        row.appendChild(cell);
        let tgl = dateAr[i].getDate();
        let bln = dateAr[i].getMonth();
        cell.innerText = tgl + '';
        if (bln < bulan) {
            cell.classList.add('sebelum');
        }
        else if (bln > bulan) {
            cell.classList.add('sesudah');
        }
        cell.classList.add('tgl-' + tgl);
        cell.setAttribute('data-tgl', tgl + '');
        cell.setAttribute('data-bln', bln + '');
        let date = new Date();
        if (date.getDate() == tgl) {
            if (date.getMonth() == bln) {
                if (date.getFullYear() == tahun) {
                    cell.classList.add('hari-ini');
                }
            }
        }
    }
    return hasil;
}
export function widget(bulan, tahun) {
    let tableEl = table(bulan, tahun, true);
    let widget;
    let namaBulan = ['Januari', 'Pebruari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    widget = document.createElement('div');
    widget.classList.add('widget');
    let judul = document.createElement('h2');
    judul.innerText = namaBulan[bulan] + ' - ' + tahun;
    widget.appendChild(judul);
    widget.appendChild(tableEl);
    return widget;
}

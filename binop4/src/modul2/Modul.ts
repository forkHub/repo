namespace md {
    export function buatViewItem(nama: string, indukId: number) {
        let modulObj: IModul = {
            id: ha.comp.Util.id(),
            dipilih: false,
            diedit: false,
            indukId: indukId,
            nama: nama,
            type: 'modul',
        }

        modulObj.view = new View(modulObj);

        md.daftar.push(modulObj);
        return modulObj;
    }

    export async function init(): Promise<void> {
        //buat modul awal
        let modulObj: IModul;

        modulObj = buatViewItem('mulai', 0);
        modulObj.dipilih = true;
        modulObj.view.attach(md.halModul.halaman);
        modulObj.view.elHtml.classList.add('dipilih');

        console.log(Date.now());
        await ha.comp.Util.delay(10);
        console.log(Date.now());

        modulObj = buatViewItem('loop', 0);
        modulObj.view.attach(md.halModul.halaman);

        //tampilkan halaman modul
        md.halModul.attach(document.body);
    }
}

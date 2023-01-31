class App {
    renderAnggota(anggota, cont, indek) {
        console.log('render anggota');
        console.log(anggota);
        let view = new AnggotaView();
        view.nama.innerHTML = anggota.nama;
        view.img.src = '/gbr/thumb.png';
        view.foto.style.backgroundImage = 'url(' + view.img.src + ')';
        view.foto.style.backgroundRepeat = 'no-repeat';
        view.foto.style.backgroundSize = 'cover';
        view.anggota = anggota;
        // view.profileUtama.setAttribute('id', anggota.id + '');
        view.attach(cont);
        let hubung = new Hubung();
        hubung.attach(view.hubungCont);
        this.renderHubung(hubung, indek);
        this.anggotaKlik(view);
    }
    renderHubung(view, hubung) {
        console.log('render hubung, idx ' + hubung);
        view.kanan.classList.remove('border-kanan', 'border-kiri', 'border-atas', 'border-bawah');
        view.kiri.classList.remove('border-kanan', 'border-kiri', 'border-atas', 'border-bawah');
        if (hubung == -1) {
        }
        else if (hubung == 0) {
            view.kanan.classList.add('border-kiri');
            view.kiri.classList.add('border-kanan');
        }
        else if (hubung == 1) {
            view.kiri.classList.add('border-kanan');
            view.kanan.classList.add('border-atas');
            view.kanan.classList.add('border-kiri');
        }
        else if (hubung == 2) {
            view.kiri.classList.add('border-kanan');
            view.kiri.classList.add('border-atas');
            view.kanan.classList.add('border-atas');
            view.kanan.classList.add('border-kiri');
        }
        else if (hubung == 3) {
            view.kiri.classList.add('border-atas');
            view.kiri.classList.add('border-kanan');
            view.kanan.classList.add('border-kiri');
        }
    }
    async anggotaKlik(view) {
        console.group('anggota klik');
        console.log(view.anggota);
        if (!view.anggota.populated) {
            console.debug('anggota belum di populate');
            view.anggota.populated = true;
            if (view.anggota.pas && view.anggota.pas != '') {
                console.debug('pasangan loaded');
                // view.anggota.pasangan_id = pas.id;
                // view.anggota.pas = pas;
                view.imgPasangan.src = '/gbr/thumb.png';
                view.imgPasangan.src = '/gbr/thumb.png'; //override buat hilangin foto
                // view.profilePasangan.setAttribute('id', pas.id + '');
                view.fotoPasangan.style.backgroundImage = 'url(' + view.imgPasangan.src + ')';
                view.fotoPasangan.style.backgroundRepeat = 'no-repeat';
                view.fotoPasangan.style.backgroundSize = 'cover';
            }
            else {
                view.pasangan.style.display = 'none';
                console.debug('pasangan tidak ketemu');
            }
            //load anak
            console.group('load anak');
            // await this.loadAnak(view.anggota);
            console.groupEnd();
        }
        else {
            console.log('anggota sudah diload');
        }
        if (view.anggota.pas) {
            console.debug('render pasangan');
            view.namaPasangan.innerHTML = view.anggota.pas;
            // view.pasangan.classList.toggle('display-none');
        }
        if (view.pasangan.classList.contains('display-none')) {
            view.pasangan.classList.remove('disp-table-cell');
            view.utama.classList.remove('text-align-right');
            view.utama.classList.add('text-align-center');
        }
        else {
            view.pasangan.classList.add('disp-table-cell');
            view.utama.classList.remove('text-align-center');
            view.utama.classList.add('text-align-right');
        }
        console.log('render anak');
        view.bawah.innerHTML = '';
        for (let i = 0; i < view.anggota.anak.length; i++) {
            let anak = view.anggota.anak[i];
            let hubung = 0;
            if (i == 0) {
                hubung = 1;
            }
            else if (i == view.anggota.anak.length - 1) {
                hubung = 3;
            }
            else {
                hubung = 2;
            }
            if (view.anggota.anak.length == 1) {
                hubung = 0;
            }
            this.renderAnggota(anak, view.bawah, hubung);
        }
        // view.bawah.classList.toggle('display-none');
        // view.bawah.classList.toggle('display-table');
        console.groupEnd();
    }
}
class AnggotaView extends ha.comp.BaseComponent {
    _anggota;
    get anggota() {
        return this._anggota;
    }
    set anggota(value) {
        this._anggota = value;
    }
    constructor() {
        super();
        this._elHtml = document.body.querySelector('template').content.querySelector('div.cont').cloneNode(true);
    }
    // get profileUtama(): HTMLButtonElement {
    // 	return this.getEl('div.atas div.utama button.profile') as HTMLButtonElement;
    // }
    get profilePasangan() {
        return this.getEl('div.atas div.pasangan button.profile');
    }
    get bawah() {
        return this.getEl('div.bawah');
    }
    get nama() {
        return this.getEl('div.utama div.nama');
    }
    get img() {
        return this.getEl('div.utama img.foto');
    }
    get foto() {
        return this.getEl('div.utama div.foto');
    }
    get fotoPasangan() {
        return this.getEl('div.pasangan div.foto');
    }
    get utama() {
        return this.getEl('div.utama');
    }
    get pasangan() {
        return this.getEl('div.pasangan');
    }
    get imgPasangan() {
        return this.getEl('div.pasangan img.foto');
    }
    get namaPasangan() {
        return this.getEl('div.pasangan div.nama');
    }
    get hubungCont() {
        return this.getEl('div.hubung-cont');
    }
}
class Hubung extends ha.comp.BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='hubung'>
				<div class='kiri'></div>
				<div class='kanan'></div>
			</div>
		`;
        this.build();
    }
    get hubungDiv() {
        return this.getEl('div.hubung');
    }
    get kanan() {
        return this.getEl('div.hubung div.kanan');
    }
    get kiri() {
        return this.getEl('div.hubung div.kiri');
    }
}
var app = new App();
window.onload = () => {
    let w = window;
    w.app = app;
    app.renderAnggota(data, document.body.querySelector('div.silsilah-cont'), -1);
    window.document.body.onclick = () => {
        console.log('window on click');
    };
};

class FragVariable {
    static load() {
        let modul = Modul.getAktif();
        this.cont.innerHTML = '';
        modul.variable.forEach((id) => {
            let variable = Variable.getId(id);
            this.buatView(variable);
        });
    }
    static tombolTambahKlik() {
        let judul = window.prompt('nama variable');
        let variable = Variable.buat(judul);
        let view = this.buatView(variable);
        this.cont.appendChild(view);
        let modulId = Kontek.modulId;
        let modul = Modul.getId(modulId);
        modul.variable.push(variable.id);
        Data.simpan();
    }
    static itemKlik(el) {
        console.log(el);
        if (this.dipilih) {
            this.dipilih.classList.remove('dipilih');
        }
        this.dipilih = el;
        this.dipilih.classList.add('dipilih');
    }
    static buatView(item) {
        let view;
        view = ha.comp.Util.getTemplate('div.item');
        view.setAttribute('id', item.id + '');
        view.setAttribute('type', VARIABLE);
        ha.comp.Util.getEl('span.nama', view).innerHTML = item.judul;
        view.onclick = () => {
            FragVariable.itemKlik(view);
        };
        return view;
    }
}
FragVariable.cont = ha.comp.Util.getEl('div.variable div.daftar');

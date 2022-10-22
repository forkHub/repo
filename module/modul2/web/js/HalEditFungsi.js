class HalEditFungsi {
    async tampil() {
        if (!this.el) {
            this.el = ha.comp.Util.createEl(await ha.comp.File.load('./data/hal-edit-fungsi.html'));
        }
        document.body.appendChild(this.el);
        //render param
        Fungsi.getDipilih().param.forEach((id) => {
            id; //TODO:
        });
        //render variable
        Fungsi.getDipilih().variable.forEach((id) => {
            id; //TODO:
        });
        //render statement
        Fungsi.getDipilih().stmt.forEach((id) => {
            id; //TODO:
        });
    }
}

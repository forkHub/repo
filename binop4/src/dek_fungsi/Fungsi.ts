namespace fung.dek {
    export namespace updateNama {
        class View extends ha.comp.BaseComponent {
            constructor() {
                super();
                this._template = `
                    <div class='update-nama-view back'>
                        <form class='margin-auto back-putih padding'>
                            <label>Nama:</label><br/>
                            <input type='text' class='nama'>
                            <div>
                                <button type='submit'>Ok</button>
                                <button type='button' class='batal'>Batal</button>
                            </div>
                        </form>
                    </div>
                `;

                this.build();
                this.form.onsubmit = () => {
                    try {
                        //TODO: validasi
                        let fungObj: IFungDek = window.fung.dek.diedit();

                        fungObj.nama = this.nama.value;
                        fungObj.view.update();

                        this.detach();
                    }
                    catch (e) {
                        console.error(e);
                    }
                    return false;
                }

                this.batal.onclick = (e: MouseEvent) => {
                    e.stopPropagation();
                    this.detach();
                }
            }

            get nama(): HTMLInputElement {
                return this.getEl('input.nama') as HTMLInputElement;
            }

            get form(): HTMLFormElement {
                return this.getEl('form') as HTMLFormElement;
            }

            get batal(): HTMLButtonElement {
                return this.getEl('button.batal') as HTMLButtonElement;
            }
        }

        const view = new View();

        export function exec(): void {
            let fungDekObj: IFungDek = window.fung.dek.diedit();
            view.nama.value = fungDekObj.nama;
            view.attach(document.body);
        }
    }

    export namespace updateParam {
        //view

        //exec
    }
}
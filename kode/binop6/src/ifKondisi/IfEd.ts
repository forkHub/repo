class IfEd extends ha.comp.BaseComponent {
    private ifObj: IIf;
    private expCont: HTMLElement;

    constructor(ifObj: IIf) {
        super();
        this._template = `
            <div class='if-cond disp-table'>
                <div class='disp-cell'>

                    <div class='disp-table padding'>
                        <div class='disp-cell padding-kanan user-select-none'>For </div>

                        <div class='for-next var-isi-cont disp-cell padding-kanan'></div>

                        <div class='disp-cell padding-kanan user-select-none'> To </div>

                        <div class='for-next exp-cont disp-cell'></div>
                    </div>

                    <div class='disp-table'>
                        <div class='disp-cell padding padding-kiri padding kanan jeda-kiri1'></div>
                        <div class='disp-cell'>
                            <div class='for-next daftar-var disp-table'></div>
                        </div>
                    </div>

                    <div class='disp-table'>
                        <div class='disp-cell padding padding-kiri padding kanan jeda-kiri2'></div>
                        <div class='disp-cell'>
                            <div class='for-next stmt-cont disp-table'></div>
                        </div>
                    </div>

                    <div class='disp-table padding user-select-none'>Next</div>
                </div>
            </div>        
        `;
        this.build();
        this.ifObj = ifObj;

        this.expCont = this.getEl('div.exp-cont');
        if (ifObj.expId > 0) {

        }

        this.ifObj;
        this.expCont;
    }


}
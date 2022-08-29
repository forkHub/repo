namespace ha.contact {
    class WrapUp extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._elHtml = this.getTemplate("ha-wrapup");
        }

        init(): void {

        }

        get action(): HTMLDivElement {
            return this.getEl('ha-contact-action') as HTMLDivElement;
        }

        get outcome(): HTMLDivElement {
            return this.getEl('ha-contact-outcome') as HTMLDivElement;
        }

        get note(): HTMLDivElement {
            return this.getEl('ha-contact-note') as HTMLDivElement;
        }
    }

    export var wrapUp: WrapUp = new WrapUp();
}
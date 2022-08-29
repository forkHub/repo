namespace ha.contact {
    class Offline extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._elHtml = this.getTemplate("ha-offline");
        }

        init(): void {

        }

        render(): void {

        }
    }

    export var offline: Offline = new Offline();
}
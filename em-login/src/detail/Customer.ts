namespace ha.contact {
    class Customer extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._elHtml = this.getTemplate("ha-customer");
        }

        init(): void {

        }

        render(): void {

        }
    }

    export var customer: Customer = new Customer();
}
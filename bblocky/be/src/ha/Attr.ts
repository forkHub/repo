namespace ha.be {
    export class Dict {
        private list: Attr[] = [];
        private _id: string = '';
        public set id(value: string) {
            this._id = value;
        }
        public get id(): string {
            return this._id;
        }

        static Create() {
            let d = new Dict();
            d.id = Id.id();
            return d;
        }

        static Id(d: Dict) {
            return d.id;
        }

        static AddAttr(d: Dict, key: string, value: any): void {
            d.addAttr(new Attr(key, value));
        }

        static GetKeyList(d: Dict): string[] {
            return d.getKeyList();
        }

        static GetValueList(d: Dict): string[] {
            return d.getValueList();
        }


        static GetValue(d: Dict, key: string): any {
            return d.getValueByKey(key);
        }

        addAttr(attr: Attr): void {
            this.list.push(attr);
        }

        getAttrByKey(key: string): Attr {
            let attr: Attr;

            this.list.forEach((item) => {
                if (item.key == key) {
                    attr = item;
                }
            })

            return attr;
        }

        getValueByKey(key: string): any {
            let attr: Attr = this.getAttrByKey(key);
            return attr.value;
        }

        getKeyList(): string[] {
            let hasil: string[] = [];

            this.list.forEach((item) => {
                hasil.push(item.key);
            })

            return hasil;
        }

        getValueList(): string[] {
            let hasil: string[] = [];

            this.list.forEach((item) => {
                hasil.push(item.value);
            })

            return hasil;
        }

    }

    export class Attr {
        private _key: string = '';
        private _value: any;

        public get key(): string {
            return this._key;
        }
        public get value(): any {
            return this._value;
        }
        public set value(value: any) {
            this._value = value;
        }

        constructor(key: string, value: any) {
            this._key = key;
            this._value = value;
        }

    }
}
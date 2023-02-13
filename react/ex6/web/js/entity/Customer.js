class Customer {
    static def() {
        return {
            name: '',
            cuid: '',
            email: '',
            phone: '',
            ref: ''
        };
    }
    static reset(c) {
        c.name = '';
        c.cuid = '';
        c.email = '';
        c.phone = '';
        c.ref = '';
    }
}

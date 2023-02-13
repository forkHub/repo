class Customer {
    static def(): ICustomerProfile {
        return {
            name: '',
            cuid: '',
            email: '',
            phone: '',
            ref: ''
        }
    }

    static reset(c: ICustomerProfile) {
        c.name = '';
        c.cuid = '';
        c.email = '';
        c.phone = '';
        c.ref = ''
    }
}
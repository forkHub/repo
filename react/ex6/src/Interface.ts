interface ICustomerProfile {
    name: string,
    phone: string,
    ref: string,
    email: string,
    cuid: string
}

interface IData {
    login: ILoginResp;
    customer: ICustomerProfile;
}

interface CustomerSearchResp {
    items: CustomerSearchItem[];
}

interface CustomerSearchItem {
    reference: string,
    uid: string,
}

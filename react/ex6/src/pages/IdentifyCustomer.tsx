function IdentifyCustomer() {
    if (globalHook.activePage.getter != PAGE_IDENTIFY_CUSTOMER) return <></>

    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');

    return <form
        onSubmit={(e) => {
            return formSubmit(e);
        }}>

        <h4>Identify Customer:</h4>

        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address:</label>
            <input
                type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }} />
        </div>

        <div className="form-group">
            <label htmlFor="input-phone-number">Phone Number:</label>
            <input
                type="text" className="form-control" id="input-phone-number" placeholder="enter phone number"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); }} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>

    </form >

    function formSubmit(e: any): boolean {
        e.stopPropagation();
        e.preventDefault();

        try {
            CustomerService.getCustomer(phone, email).then((x: XMLHttpRequest) => {
                if (x.status == 200) {
                    let obj: CustomerSearchResp = JSON.parse(x.responseText);

                    if (obj.items.length == 0) {
                        ha.comp.dialog.tampil('Customer not found');
                    }
                    else {

                        //store data
                        Data.customer.email = email;
                        Data.customer.phone = phone;
                        Data.customer.cuid = obj.items[0].uid;
                        Data.customer.ref = obj.items[0].reference;

                        //pindah halaman
                        globalHook.activePage.setter(PAGE_CUSTOMER_PROFILE);
                    }
                }
                else if (x.status == 401) {
                    ha.comp.dialog.tampil('Unautorized');
                }
                else {
                    ha.comp.Util.error(new Error(x.responseText));
                }
            }).catch((e) => {
                console.error(e);
                ha.comp.Util.error(e);
            });
        }
        catch (e) {
            console.error(e);
            ha.comp.Util.error(e);
        }

        return false;
    }
}
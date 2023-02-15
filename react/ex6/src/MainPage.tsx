function MainPage() {
    const [menuAktif, setMenuAktif] = React.useState(false);

    if (!tempSession.token || tempSession.token.length == 0) return <></>

    return <>
        <div className="disp-flex">
            <button className="btn btn-primary" onClick={() => { setMenuAktif(!menuAktif); }}>
                |||
            </button>

            <h5 className="flex-grow-1 text-align-right">Hello Supervisor</h5>
        </div>
        <hr />

        <PageCont />
        <SideMenu />
    </>

    function CustomerMenu() {
        if (Data.customer.email == '') return <></>

        return <>
            <h4 className="text-align-center">
                {Data.customer.email}
            </h4>

            <ul className="list-group">
                <li className="list-group-item">
                    <button className="btn btn-primary" onClick={ProfileKlik}>Profile</button>
                </li>

                <li className="list-group-item">
                    <button className="btn btn-primary" onClick={contactHistoryKlik}>Contact History</button>
                </li>

                <li className="list-group-item">
                    <button className="btn btn-primary" onClick={secureMessageKlik}>Secure Message</button>
                </li>

                <li className="list-group-item">
                    <button className="btn btn-primary" onClick={wrappupKlik}>Wrap Up</button>
                </li>

            </ul>

        </>

        function wrappupKlik() {
            Customer.reset(Data.customer);
            setMenuAktif(false);
            globalHook.activePage.setter("");
        }

        function contactHistoryKlik() {
            setMenuAktif(false);
            globalHook.activePage.setter(PAGE_CUSTOMER_CONTACT_HISTORY);
        }

        function secureMessageKlik() {
            setMenuAktif(false);
            globalHook.activePage.setter(PAGE_CUSTOMER_SECURE_MESSAGING_MESSAGE);
        }

        function ProfileKlik() {
            setMenuAktif(false);
            globalHook.activePage.setter(PAGE_CUSTOMER_PROFILE);
        }

    }

    function SideMenu() {
        if (menuAktif == false) return <></>

        return <>
            <div className="side-menu back">
                <div className="side-menu box">

                    <div className="text-align-right">
                        <button className="btn btn-primary" onClick={() => { setMenuAktif(false) }}>X</button>
                    </div>

                    <ul className="list-group">
                        <li className="list-group-item">
                            <button className="btn btn-primary" onClick={logoutClick}>Logout</button>
                        </li>
                        <li className="list-group-item">
                            <button className="btn btn-primary" onClick={IdentifyCustomerKlik}>Idenfity Customer</button>
                        </li>
                        <li className="list-group-item">
                            <button className="btn btn-primary" onClick={dashboardKlik}>Dashboard</button>
                        </li>
                    </ul>

                    <hr />
                    <CustomerMenu />
                </div>
            </div>
        </>

        function dashboardKlik() {
            setMenuAktif(false);
            globalHook.activePage.setter(PAGE_DASHBOARD);
        }

        function logoutClick() {
            setMenuAktif(false);
            tempSession.token = '';
            simpanSession();
            globalHook.activePage.setter('');
        }

        function IdentifyCustomerKlik() {
            setMenuAktif(false);
            globalHook.activePage.setter(PAGE_IDENTIFY_CUSTOMER);
        }
    }

    function PageCont() {
        return <>
            <IdentifyCustomer />
            <CustomerProfile />
            <DashBoard />
            <SecureMessage />
            <ContactHistory />
        </>
        // let activePage: string = globalHook.activePage.getter;
        // if (PAGE_IDENTIFY_CUSTOMER == activePage) {
        //     return <IdentifyCustomer />
        // }
        // else {
        //     console.warn('active page is not defined');
        //     return <></>
        // }
    }
}
function MainPage() {
    const [menuAktif, setMenuAktif] = React.useState(false);
    if (!tempSession.token || tempSession.token.length == 0)
        return React.createElement(React.Fragment, null);
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: "disp-flex" },
            React.createElement("button", { className: "btn btn-primary", onClick: () => { setMenuAktif(!menuAktif); } }, "|||"),
            React.createElement("h5", { className: "flex-grow-1 text-align-right" }, "Hello Supervisor")),
        React.createElement("hr", null),
        React.createElement(PageCont, null),
        React.createElement(SideMenu, null));
    function CustomerMenu() {
        if (Data.customer.email == '')
            return React.createElement(React.Fragment, null);
        return React.createElement(React.Fragment, null,
            React.createElement("h4", { className: "text-align-center" }, Data.customer.email),
            React.createElement("ul", { className: "list-group" },
                React.createElement("li", { className: "list-group-item" },
                    React.createElement("button", { className: "btn btn-primary", onClick: ProfileKlik }, "Profile")),
                React.createElement("li", { className: "list-group-item" },
                    React.createElement("button", { className: "btn btn-primary", onClick: contactHistoryKlik }, "Contact History")),
                React.createElement("li", { className: "list-group-item" },
                    React.createElement("button", { className: "btn btn-primary", onClick: secureMessageKlik }, "Secure Message")),
                React.createElement("li", { className: "list-group-item" },
                    React.createElement("button", { className: "btn btn-primary", onClick: wrappupKlik }, "Wrap Up"))));
        function wrappupKlik() {
            Customer.reset(Data.customer);
            setMenuAktif(false);
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
        if (menuAktif == false)
            return React.createElement(React.Fragment, null);
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "side-menu back" },
                React.createElement("div", { className: "side-menu box" },
                    React.createElement("div", { className: "text-align-right" },
                        React.createElement("button", { className: "btn btn-primary", onClick: () => { setMenuAktif(false); } }, "X")),
                    React.createElement("ul", { className: "list-group" },
                        React.createElement("li", { className: "list-group-item" },
                            React.createElement("button", { className: "btn btn-primary", onClick: logoutClick }, "Logout")),
                        React.createElement("li", { className: "list-group-item" },
                            React.createElement("button", { className: "btn btn-primary", onClick: IdentifyCustomerKlik }, "Idenfity Customer")),
                        React.createElement("li", { className: "list-group-item" },
                            React.createElement("button", { className: "btn btn-primary", onClick: dashboardKlik }, "Dashboard"))),
                    React.createElement("hr", null),
                    React.createElement(CustomerMenu, null))));
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
        return React.createElement(React.Fragment, null,
            React.createElement(IdentifyCustomer, null),
            React.createElement(CustomerProfile, null),
            React.createElement(DashBoard, null),
            React.createElement(SecureMessage, null),
            React.createElement(ContactHistory, null));
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

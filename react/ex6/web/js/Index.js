const PAGE_IDENTIFY_CUSTOMER = 'identify-customer';
const PAGE_CUSTOMER_PROFILE = 'customer-profile';
const PAGE_CUSTOMER_CONTACT_HISTORY = 'customer-contact-history';
const PAGE_CUSTOMER_SECURE_MESSAGING_MESSAGE = 'customer-secure-messaging-message';
const PAGE_DASHBOARD = 'dashboard';
function Home() {
    setHook(globalHook.value, React.useState('initial value'));
    setHook(globalHook.activePage, React.useState('page1'));
    setHook(globalHook.dirty, React.useState(Date.now()));
    return React.createElement(React.Fragment, null,
        React.createElement(LoginPage, null),
        React.createElement(MainPage, null));
}
loadSession();
ReactDOM.render(React.createElement(Home, null), document.getElementById('react-root'));

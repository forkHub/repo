const PAGE_IDENTIFY_CUSTOMER: string = 'identify-customer';
const PAGE_CUSTOMER_PROFILE: string = 'customer-profile';
const PAGE_CUSTOMER_CONTACT_HISTORY: string = 'customer-contact-history';
const PAGE_CUSTOMER_SECURE_MESSAGING_MESSAGE: string = 'customer-secure-messaging-message';
const PAGE_DASHBOARD: string = 'dashboard';

function Home() {
    setHook(globalHook.value, React.useState('initial value'));
    setHook(globalHook.activePage, React.useState('page1'));
    setHook(globalHook.dirty, React.useState(Date.now()));

    return <>
        <LoginPage />
        <MainPage />
    </>;
}

loadSession();
ReactDOM.render(<Home />, document.getElementById('react-root'));

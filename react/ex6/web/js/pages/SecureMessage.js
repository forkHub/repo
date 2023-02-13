function SecureMessage() {
    if (globalHook.activePage.getter != PAGE_CUSTOMER_SECURE_MESSAGING_MESSAGE)
        return React.createElement(React.Fragment, null);
    return React.createElement(React.Fragment, null,
        React.createElement("h4", null, "Secure Mesaging Service:"));
}

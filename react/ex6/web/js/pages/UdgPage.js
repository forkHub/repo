function ContactHistory() {
    if (globalHook.activePage.getter != PAGE_CUSTOMER_CONTACT_HISTORY)
        return React.createElement(React.Fragment, null);
    return React.createElement(React.Fragment, null,
        React.createElement("h4", null, "Contact History:"));
}

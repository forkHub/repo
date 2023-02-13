function CustomerProfile() {
    if (globalHook.activePage.getter != PAGE_CUSTOMER_PROFILE)
        return React.createElement(React.Fragment, null);
    return React.createElement(React.Fragment, null,
        React.createElement("h4", null, "Customer Profile:"));
}

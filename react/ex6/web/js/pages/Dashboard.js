function DashBoard() {
    if (globalHook.activePage.getter != PAGE_DASHBOARD)
        return React.createElement(React.Fragment, null);
    return React.createElement(React.Fragment, null,
        React.createElement("h4", null, "DashBoard:"));
}

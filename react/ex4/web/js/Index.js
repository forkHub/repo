//store state globally here
const globalHook = {
    value: {
        getter: null,
        setter: null
    },
    activePage: {
        getter: '',
        setter: null
    }
};
//wrapper hook
function setHook(obj, ar) {
    obj.getter = ar[0];
    obj.setter = ar[1];
}
function Header() {
    return React.createElement(React.Fragment, null,
        React.createElement("h3", null,
            "Shareable value is : ",
            globalHook.value.getter));
}
function MainPage() {
    setHook(globalHook.value, React.useState('initial value'));
    setHook(globalHook.activePage, React.useState('page1'));
    return React.createElement(React.Fragment, null,
        React.createElement("h1", null, "Test Global Value "),
        React.createElement(Header, null),
        React.createElement(Menu, null),
        React.createElement(PageCont, null));
}
function Menu() {
    return (React.createElement(React.Fragment, null,
        React.createElement("hr", null),
        React.createElement("div", null,
            React.createElement("button", { onClick: () => {
                    globalHook.activePage.setter('page1');
                }, disabled: globalHook.activePage.getter == 'page1' }, "home "),
            React.createElement("button", { onClick: () => {
                    globalHook.activePage.setter('page2');
                }, disabled: globalHook.activePage.getter == 'page2' }, "page 2"),
            React.createElement("button", { onClick: () => {
                    globalHook.activePage.setter('page3');
                }, disabled: globalHook.activePage.getter == 'page3' }, "page 3")),
        React.createElement(ValueUpdater, null),
        React.createElement("hr", null)));
}
function PageCont() {
    if (globalHook.activePage.getter == 'page2') {
        return React.createElement(Page2, null);
    }
    else if (globalHook.activePage.getter == 'page3') {
        return React.createElement(Page3, null);
    }
    else {
        return React.createElement(HomePage, null);
    }
}
function ValueUpdater() {
    return (React.createElement("form", null,
        React.createElement("label", null, "You can update shareable value here:"),
        React.createElement("br", null),
        React.createElement("input", { type: "text", onChange: (e) => {
                // console.log((e.target as HTMLInputElement).value);
                let value = e.target.value;
                globalHook.value.setter(value);
                // console.log(e);
            }, value: globalHook.value.getter })));
}
function HomePage() {
    return React.createElement("div", null,
        React.createElement("p", null, "this is home page"),
        React.createElement(ValueUpdater, null));
}
function Page2() {
    return React.createElement("div", null,
        React.createElement("p", null, "this is page 2"),
        React.createElement(ValueUpdater, null));
}
function Page3() {
    return React.createElement("div", null,
        React.createElement("p", null, "this is page 3"),
        React.createElement(ValueUpdater, null));
}
ReactDOM.render(React.createElement(React.Fragment, null,
    React.createElement(MainPage, null)), document.getElementById('react-root'));

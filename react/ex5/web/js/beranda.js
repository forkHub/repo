const hook = {
    hal: false,
    setHal: (_b) => { }
};
function setter(ar) {
    hook.hal = ar[0];
    hook.setHal = ar[1];
}
function Beranda() {
    console.log('beranda');
    setter(React.useState(true));
    let ok = React.createElement("div", null, "status lagi true");
    if (!hook.hal) {
        ok = React.createElement(React.Fragment, null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { onClick: () => {
                hook.setHal(!hook.hal);
                console.log('click ' + hook.hal);
            } },
            "status hal ",
            hook.hal + ''),
        ok));
}

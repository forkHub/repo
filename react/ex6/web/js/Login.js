function LoginPage() {
    const [userName, setUserName] = React.useState('apiclient');
    const [password, setPassword] = React.useState('apiclient');
    if ((tempSession.token && tempSession.token.length > 0)) {
        return React.createElement(React.Fragment, null);
    }
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: "text-align-center" },
            React.createElement("h4", null, "EO - On The Go"),
            React.createElement("form", { onSubmit: (e) => { return handleSubmit(e); }, className: "display-inline-block" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", null, "username:"),
                    React.createElement("input", { type: "text", className: "form-control", "aria-describedby": "emailHelp", placeholder: "Enter email", value: userName, onChange: (e) => { setUserName(e.target.value); } })),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", null, "password:"),
                    React.createElement("br", null),
                    React.createElement("input", { type: "password", className: "form-control", value: password, onChange: (e) => { setPassword(e.target.value); } })),
                React.createElement("div", null,
                    React.createElement("button", { className: "btn btn-primary", type: "submit" }, "LOGIN")))));
    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        try {
            LoginService.login(userName, password).then((x) => {
                if (200 == x.status) {
                    let obj = JSON.parse(x.responseText);
                    tempSession.token = obj.access_token;
                    simpanSession();
                    console.log(obj);
                    globalHook.dirty.setter(Date.now());
                }
                else {
                    ha.comp.dialog.tampil(x.status + '');
                }
            }).catch((e) => {
                console.log(e);
                ha.comp.Util.error(e);
            });
            return false;
        }
        catch (e) {
            ha.comp.Util.error(e);
            console.log(e);
        }
        return false;
    }
}

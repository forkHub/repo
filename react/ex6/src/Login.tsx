
function LoginPage() {
    const [userName, setUserName] = React.useState('apiclient');
    const [password, setPassword] = React.useState('apiclient');

    if ((tempSession.token && tempSession.token.length > 0)) { return <></> }

    return <>
        <div className="text-align-center">
            <h4>EO - On The Go</h4>
            <form onSubmit={(e) => { return handleSubmit(e); }} className="display-inline-block">

                <div className="form-group">
                    <label>username:</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value); }} />
                </div>

                <div className="form-group">
                    <label>password:</label><br />
                    <input type="password" className="form-control" value={password}
                        onChange={(e) => { setPassword(e.target.value); }} />
                </div>

                <div>
                    <button className="btn btn-primary" type="submit">LOGIN</button>
                </div>
            </form>
        </div>
    </>

    function handleSubmit(e: any): boolean {
        e.preventDefault();
        e.stopPropagation();

        try {
            LoginService.login(userName, password).then((x: XMLHttpRequest) => {
                if (200 == x.status) {
                    let obj: ILoginResp = JSON.parse(x.responseText);
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
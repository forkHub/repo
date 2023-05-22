import { Param } from "../Param";
import { util, Util } from "../Util";
import { auth } from "./Auth";

export class HalLogin {
    render(): string {
        return `
<!DOCTYPE html>
<html lang="id">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href='/css/bootstrap.min.css' rel='stylesheet' />
    <link href='/css/umum.css' rel='stylesheet' />

    <script src="/lib/md5.min.js"></script>
</head>

<body>
    <div class='container'>
        <div class='form-login'>
            <h2>Form login</h2>
            <form class='form-login' action="${auth.routerKons.login}" method="post" ${Param.HA_URL}="/">

                <div class="form-group">
                    <label for="user_name">user name:</label>
                    <input type="text" class="form-control user_id" name="user_name" id="user_name" required/>
                </div>

                <div class="form-group">
                    <label for="password">password:</label>
                    <input type="password" class="form-control password" name="password" id="password" required/>
                </div>

                <div class='row'>
                    <div class='col-12 col-sm-4'>
                        <button type="submit" class="btn btn-primary submit btn-block margin-bottom-8">login</button>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-12 col-sm-6'>
                        <a href="/sm/auth/lupa">Lupa Password</a>
                    </div>
                    <div class='col-12 col-sm-6'>
                        <a href="/sm/auth/daftar">Daftar</a>                    
                    </div>
                </div>


            </form> 
        </div>
    </div>

    <script type="module" src="/js/js${Util.revisi}/comp/Umum.js?r=${util.randId}"></script>

</body>

</html>
		`.trimStart().trimEnd();
    }
}
class CustomerService {

    private static url: string = 'http://localhost:8299/customer-service-v2/default/search';

    static async getCustomer(_phone: string, _email: string): Promise<XMLHttpRequest> {
        console.log(CustomerService.name + ': get customer');

        let x: XMLHttpRequest = new XMLHttpRequest();
        x.open('post', CustomerService.url, true);

        x.setRequestHeader('Authorization', `OIDC_id_token ${tempSession.token}`);
        x.setRequestHeader('Content-type', `application/json`);

        let data: any = {
            query: {
                emailAddress: _email
            }
        }

        return await ha.comp.Util.AjaxSend(x, JSON.stringify(data));
    }
}
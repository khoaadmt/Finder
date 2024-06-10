import BaseService from "../BaseService";

const URL = "http://localhost:5000/api/auth";
const configHeaders = "";
class AuthService extends BaseService {
    constructor() {
        super(URL, configHeaders);
    }
    login(data: any) {
        return this.post("login", data);
    }
    register(data: any) {
        return this.post("register", data);
    }
    refreshToken() {
        return this.post("refresh", "");
    }
}
export default AuthService;

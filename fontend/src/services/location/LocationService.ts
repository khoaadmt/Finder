import BaseService from "../BaseService";

const URL = "http://localhost:5000/api/locations";
const configHeaders = "";
class LocationService extends BaseService {
    constructor() {
        super(URL, configHeaders);
    }
    getLocationById(id: string) {
        return this.get(`${id}`, id);
    }
    getLocationKeyLabels() {
        return this.get("key-label");
    }
    getLocationByCity(params: any) {
        return this.get("/city", params);
    }
    countLocationsByCity(params: any) {
        return this.get("/count-by-city", params);
    }
}
export default LocationService;

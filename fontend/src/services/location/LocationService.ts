import { useSelector } from "react-redux";
import { RootState } from "../../interface";
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
    getAllLocation() {
        return this.get("/");
    }
    countLocationsByCity(params: any) {
        return this.get("/count-by-city", params);
    }
    deleteLocation(locationId: string, token?: string) {
        return this.delete(`${locationId}`, {}, token);
    }
    createLocation(location: any, token?: string) {
        console.log("token in service: ");
        return this.post("/", location, {}, token);
    }
    updateLocation(locationId: string, data: any, token?: string) {
        return this.put(`${locationId}`, data, {}, token);
    }
}
export default LocationService;

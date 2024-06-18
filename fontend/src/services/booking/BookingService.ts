import BaseService from "../BaseService";

const URL = "http://localhost:5000/api/booking";
const configHeaders = "";
class BookingService extends BaseService {
    constructor() {
        super(URL, configHeaders);
    }

    createBooking(data: any) {
        return this.post(``, data);
    }

    getBookedCourts(data: any) {
        return this.get("booked-courts", data);
    }
}
export default BookingService;

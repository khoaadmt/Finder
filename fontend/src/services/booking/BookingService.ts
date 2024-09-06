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

    getBookingsByUserName(username: string) {
        return this.get(`by-username/${username}`);
    }

    getTransactionInDay(day: string) {
        return this.get(`/${day}/day/transactions`);
    }

    getTransactionInMonth(month: number) {
        return this.get(`/${month}/month/transactions`);
    }

    getAllTransaction() {
        return this.get(`/transactions`);
    }

    getTotalSales(month: number, city: string) {
        if (city !== null) {
            return this.get(`${month}/total-sales?city=${city}`);
        }
        return this.get(`${month}/total-sales`, { city });
    }
}
export default BookingService;

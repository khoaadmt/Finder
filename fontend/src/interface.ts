export interface Location {
    city: string;
    Name: string;
    contact_phone: string;
    img: string;
    address: string;
    latitude: number;
    longitude: number;
}

export interface Facility {
    city: string;
    Name: string;
    contact_phone: string;
    img: string;
    address: string;
    price_min: number;
    price_max: number;
    numberOfCourts: number;
    openHours: {
        start: Date;
        end: Date;
    };
    openDays: {
        start: string;
        end: string;
    };
    latitude: number;
    longitude: number;
    distance: { text: string; value: number };
}

export interface ResponseLocation {
    location: Location;
    distance: {
        text: string;
        value: number;
    };
}

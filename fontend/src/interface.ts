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
export interface AuthState {
    login: {
        currentUser: {
            displayName: string;
            avaUrl: string;
            access_token: string;
            refresh_token: string;
        } | null;
        isFetching: boolean;
        error: boolean;
    };
    register: {
        isFetching: false;
        error: false;
    };
    mgs: string;
}
export interface RootState {
    auth: AuthState;
}
export interface Token {
    access_token: string;
    refresh_token: string;
}

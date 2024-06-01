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
interface userInfor {
    type: string;
    displayName: string;
    username: string;
    avaUrl: string;
}
export interface Pots {
    _id: string;
    title: string;

    description: string;

    memberCount: number;

    startTime: number;

    gender: number;

    phones: string[];

    images: string[];

    levelMemberMin: number;

    levelMemberMax: number;

    priceMin: number;

    priceMax: number;

    agreement: boolean;

    user: userInfor;

    location: Facility;
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
            username: string;
            displayName: string;
            avaUrl: string;
            accessToken: string;
            refreshToken: string;
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
    accessToken: string;
    refreshToken: string;
}
export interface optional {
    label: string;
    value: string;
}
export interface FilterOptions {
    sortBy: any;
    distance: number;
    level: string;
    date: string;
    time: string;
    price: number;
    memberCount: string;
    gender: number;
    agreement: boolean;
}

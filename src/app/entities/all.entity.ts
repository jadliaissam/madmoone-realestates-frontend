
export interface IProjectEquipement {
    name?: string;
    icon?: string;
}

export interface IProjectUnit {
    mainPhoto?: string;
    name ?: string;
    priceMin?: number;
    balcony?: number;
    rooms?: number;
    floor ?: number;
    salons?: number;
    restRooms ?: number;
    area?: number;
    parking?: number;
    direction?: string;
    _v?: number;
}

export interface IProject {
    name?: string;
    description?: string;
    address?: string;
    promoterName?: string;
    companyName?: string;
    city?: string;
    phone?: string;
    email?: string;
    webSite?: string;
    icon?: string;
    photos?: string[];
    video?: string;
    longitude?: number;
    latitude?: number;
    projectEquipements?: IProjectEquipement[];
    projectUnits?: IProjectUnit[];
    _v?: number;
}


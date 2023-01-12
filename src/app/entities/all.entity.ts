
export interface IProjectEquipement {
    name?: string;
    icon?: string;
    description?: string;
}

export interface IProjectUnit {
    mainPhoto?: string;
    name ?: string;
    priceMin?: number;
    balcony?: number;
    rooms?: IRoom[];
    // floor ?: number;
    salons?: number;
    restRooms ?: number;
    area?: number;
    parking?: string;
    // direction?: string;
    _id: string;
    description?: string;
    photos ?: string[];
    video?: string;
    type?:string;

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
    whatsapp?: string;
    icon?: string;
    photos?: string[];
    video?: string;
    longitude?: number;
    latitude?: number;
    state: string;
    type: string;
    category: string;
    offer: string;
    projectEquipements?: IProjectEquipement[];
    projectUnits?: IProjectUnit[];
    _id?: string;
}



export interface IRealEstate {
    name: string;
    description: string;
    photos : string[];
    video: string;
    area: number;
    floor : number;
    salons : number;
    restRooms : number;
    parking: string;
    balcony: number;
    direction: string;
    price : number;
    rooms: IRoom[];
    _id: string;
    projectUnit : string;
}



export interface IRoom {
    name: string;
    area: number;
    direction: string;
    mainPhoto: string;
    equipements: IRoomEquipement[];
}

export interface IRoomEquipement {
    name?: string;
    area?: number;
    icon?: string;
    description?: string;
}
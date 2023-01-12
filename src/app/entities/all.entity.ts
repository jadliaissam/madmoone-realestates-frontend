
export interface IProjectEquipement {
    name_ar?: string;
    name_fr?: string;
    name_en?: string;
    icon?: string;
    description_ar?: string;
    description_fr?: string;
    description_en?: string;
}

export interface IProjectUnit {
    mainPhoto?: string;
    name_ar ?: string;
    name_fr ?: string;
    name_en ?: string;
    priceMin?: number;
    balcony?: number;
    rooms?: IRoom[];
    rooms_count ? :number;
    // floor ?: number;
    salons?: number;
    restRooms ?: number;
    area?: number;
    parking_ar?: string;
    parking_fr?: string;
    parking_en?: string;
    // direction?: string;
    _id: string;
    description_ar?: string;
    description_fr?: string;
    description_en?: string;
    photos ?: string[];
    video?: string;
    type?:string;

}

export interface IProject {
    name_ar?: string;
    name_fr?: string;
    name_en?: string;
    description_ar?: string;
    description_fr?: string;
    description_en?: string;
    address_ar?: string;
    address_fr?: string;
    address_en?: string;
    promoterName_ar?: string;
    promoterName_fr?: string;
    promoterName_en?: string;
    companyName_ar?: string;
    companyName_fr?: string;
    companyName_en?: string;
    city_ar?: string;
    city_fr?: string;
    city_en?: string;
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
    name_ar: string;
    name_fr: string;
    name_en: string;
    area: number;
    direction: string;
    mainPhoto: string;
    equipements: IRoomEquipement[];
}

export interface IRoomEquipement {
    name_ar?: string;
    name_fr?: string;
    name_en?: string;
    area?: number;
    icon?: string;
    description_ar?: string;
    description_fr?: string;
    description_en?: string;
}


export class TextDirectionController {
    public textDirection: string = 'ltr';

    constructor() {
        this.checkDirection();
    }

    checkDirection() {
        const lang = localStorage.getItem('lang') || 'fr';
        if (lang === 'ar') this.textDirection = 'rtl';
        else this.textDirection = 'ltr';
    }
}
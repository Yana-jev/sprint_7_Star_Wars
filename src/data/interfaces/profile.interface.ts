export interface Profile{
   name: string,
   model: string,
   MGLT: string,
   cargo_capacity: string,
   consumables: string,
   cost_in_credits: string,
   created: string,
   crew: string,
   edited: string,
   hyperdrive_rating: string,
   length: string,
   manufacturer: string,
   max_atmosphering_speed: string,
   passengers: string,
   films: string[],
   pilots: string[],
   starship_class:string,
   url: string,
   image?: string;
   
   
}

export interface Pilot{
   id: string,
   name: string,
   image?: string
   url: string
}

export interface Film {
   title: string;
   episode_id: number;
   opening_crawl: string;
   director: string;
   producer: string;
   release_date: string;
   species: string[];
   starships: string[];
   vehicles: string[];
   characters: string[];
   planets: string[];
   url: string;
   created: string;
   edited: string;
   image?: string;
}


export interface Planets {
   name: string;
   diameter: string;
   rotation_period: string;
   orbital_period: string;
   gravity: string;
   population: string; 
   climate: string;
   terrain: string;
   surface_water: string; 
   residents: string[];
   films: string[];
   url: string;
   created: string; 
   edited: string;
   image?: string;
}

export interface Species {
   name: string;
   classification: string;
   designation: string;
   average_lifespan: string; 
   eye_colors: string;
   hair_colors: string; 
   skin_colors: string;
   language: string; 
   homeworld: string;
   people: string[]; 
   films: string[];
   url: string; 
   created: String;
   edited: string
   image?: string;

}
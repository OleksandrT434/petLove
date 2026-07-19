export interface Pet {
    _id: string;
    species: string;
    category: string;
    price?: number;
    title: string;
    name: string;
    birthday: string;
    comment: string;
    sex: string;
    location: string;
    imgURL: string;
    createdAt: string;
    user: string;
    popularity: number;
    updatedAt: string;
}

export interface PetResponse {
    page: number,
    perPage: number,
    totalPages: number,
    results: Pet[] 
}

export type GetPetsParams = {
  keyword?: string;
  category?: string;
  species?: string;
  locationId?: string;
  sex?: string;
  byDate?: boolean;
  byPrice?: boolean;
  byPopularity?: boolean;
  page?: number;
  limit?: number;
};
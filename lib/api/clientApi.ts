import { publicApi, privateApi } from "./api";
import { NewsResponse } from "@/types/card";
import{ Friend } from "@/types/friends";
import { type PetResponse } from "@/types/pets";
import {type GetPetsParams } from "@/types/pets"
import { City } from "@/types/pets";
import {
  type SignUpData,
  type SignInData,
  type AuthResponse,
  type CurrentUser} 
from "@/types/auth"

export const NewsApi = {
    getNews: async (keyword: string, page = 1, limit = 6) => {
        try {
            const response = await publicApi.get<NewsResponse>("/news", {
                params: { keyword, page, limit },
            });
            return response.data;
        }
        catch (error) {
            console.error("Error fetching news cards:", error);
            throw error;
        }
    }
}

export const FriendsApi = {
    async getFriends()  {
        const response = await publicApi.get<Friend[]>("/friends");
        return response.data;
    }
    } 


export const PetsApi = {
  async getPets(params: GetPetsParams = {}) {
    const response = await publicApi.get<PetResponse>(
      "/notices",
      {
        params,
      }
    );
    return response.data;
  },

 async getCategories() {
  try {
    const response = await publicApi.get("/notices/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
},

  async getSpecies() {
    const response = await publicApi.get<string[]>("/notices/species");
    return response.data;
  },

  async getSex() {
    const response = await publicApi.get<string[]>("/notices/sex");
    return response.data;
  },
  async searchCities(keyword: string) {
    const response = await publicApi.get<City[]>("/cities", {
      params: { keyword }
    });
    return response.data;
  }
};


////////////////////////////AUTH////////////////////////////////////

export const AuthApi = {
  async signUp(data: SignUpData) {
    const responce = await publicApi.post<AuthResponse>(
      "/users/signup",
      data
    );
    return responce.data
  },
  async signIn(data: SignInData){
    const responce = await publicApi.post<AuthResponse>(
      "/users/signin",
      data
    );
    return responce.data
  },
  async getCurrent() {
    const response = await privateApi.get<CurrentUser>(
      "/users/current"
    );

    return response.data;
  },

  async getCurrentFull() {
    const response = await privateApi.get(
      "/users/current/full"
    );

    return response.data;
  },

  async signOut() {
    const response = await privateApi.post(
      "/users/signout"
    );

    return response.data;
  },
}


import nextServer from "./api";
import { NewsResponse } from "@/types/card";
import{ Friend } from "@/types/friends";
import { type PetResponse } from "@/types/pets";
import {type GetPetsParams } from "@/types/pets"

export const NewsApi = {
    getNews: async (keyword: string, page = 1, limit = 6) => {
        try {
            const response = await nextServer.get<NewsResponse>("/news", {
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
        const response = await nextServer.get<Friend[]>("/friends");
        return response.data;
    }
    } 


export const PetsApi = {
  async getPets(params: GetPetsParams = {}) {
    const response = await nextServer.get<PetResponse>(
      "/notices",
      {
        params,
      }
    );

    return response.data;
  },
};
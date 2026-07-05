import nextServer from "./api";
import { NewsResponse } from "@/types/card";
import{ Friend } from "@/types/friends";

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
import nextServer from "./api";
import { NewsResponse } from "@/types/card";

export const NewsApi = {
    getNews: async (keyword: string) => {
        try {
            const response = await nextServer.get<NewsResponse>("/news", {
                params: { keyword },
            });
            return response.data;
        }
        catch (error) {
            console.error("Error fetching news cards:", error);
            throw error;
        }
    }
}
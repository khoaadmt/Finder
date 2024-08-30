import { FilterOptions } from "../../interface";
import BaseService from "../BaseService";

const URL = "http://localhost:5000/api/posts";
const configHeaders = "";
class PostService extends BaseService {
    constructor() {
        super(URL, configHeaders);
    }

    getPostByFilter(
        filterOptions: FilterOptions | null,
        pageNumber: number,
        location: string | null,
        token: string | undefined
    ) {
        return this.get(
            "/filter",
            {
                params: {
                    filter: filterOptions,
                    page: pageNumber,
                    city: location,
                },
            },
            token
        );
    }

    getPostById(id: string) {
        return this.get(`${id}`, id);
    }

    getPostByUserName(username: string) {
        return this.get(`by-username/${username}`);
    }

    getPostByStatus(status: string) {
        return this.get(`/status/${status}`);
    }
    updateStatus(postId: string, status: string) {
        return this.put(`/${postId}/status`, { status });
    }

    createPost(values: any, accessToken: string | undefined) {
        return this.post("", values, "", accessToken);
    }

    deletePosst(postId: string, accessToken: string | undefined) {
        return this.delete(`/${postId}`, accessToken);
    }
}
export default PostService;

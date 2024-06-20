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
    createPost(values: any, accessToken: string | undefined) {
        return this.post("", values, "", accessToken);
    }
}
export default PostService;

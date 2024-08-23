import { useEffect } from "react";
import { PostCard } from "./PostCard";

export const CheckedPostPage = () => {
    const postDetail = {
        images: [
            "https://sonsanepoxy.vn/wp-content/uploads/2023/07/lap-dat-he-thong-den-chieu-san-cau-long.jpg",
            "https://sonsanepoxy.vn/wp-content/uploads/2023/07/lap-dat-he-thong-den-chieu-san-cau-long.jpg",
        ],
        title: "Hôm nay đội mình cần tuyển giao lưu",
        location: {
            address: "158 phú diễn, Từ Liêm",
            latitude: "",
            longitude: "",
        },
        memberCount: 3,
        levelMemberMin: 3,
        levelMemberMax: 4,
        priceMin: 50000,
        priceMax: 1000000,
        description: "Hôm nay đội mình cần tuyển giao lưu",
        user: {
            displayName: "Khoa dz",
            avaUrl: "",
            contactPhone: "0123456",
            facebookId: "0131515",
        },
        agreement: "",
        phones: [],
    };

    useEffect(() => {}, []);
    return (
        <div className="max-w-[884px] sm:px-3 mx-auto mb-5 sm:mt-5">
            <div>
                <PostCard postDetail={postDetail} status={"checked"} />
            </div>
            <PostCard postDetail={postDetail} status={"checked"} />
        </div>
    );
};

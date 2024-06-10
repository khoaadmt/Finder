import { Search_Page_header } from "./header/SearchPageHeader";
import { useSearchParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Search_page_index = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = searchParams.get("location");
    const type = searchParams.get("type");

    return (
        <>
            <Search_Page_header defaultSelectedKeys={"2"} />
            <Outlet />
        </>
    );
};

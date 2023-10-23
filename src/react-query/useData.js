import {useQuery} from "react-query";

const fetchData = async () => {
    const response = await fetch("http://localhost:3000/list");
    const data = await response.json();
    return data;
}

export const useData = () =>{
    return useQuery({
        queryKey: ["data"],
        queryFn: fetchData,
        refetchOnWindowFocus: false
    })
}
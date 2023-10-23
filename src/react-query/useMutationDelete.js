import {useMutation, useQueryClient} from "react-query";

const deleteData = async (id) =>{
    const response = await fetch(`http://localhost:3000/list/${id}`,{
        method: "Delete",
    })
    const data = await response.json()
    return data
}
export const useMutationDelete = (id) =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["deleteData", {id}],
        mutationFn: deleteData,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ["data"]
            })
        }
    })
}
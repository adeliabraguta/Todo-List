import {useMutation, useQueryClient} from "react-query";

const putData = async ({id, text, completed}) =>{
    const response = await fetch(`http://localhost:3000/list/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, text, completed})
    })
    const data = await response.json()
    return data
}
export const useMutationPut = (id) =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["putData", {id}],
        mutationFn: putData,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ["data"]
            })
        }
    })
}
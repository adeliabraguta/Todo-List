import {useMutation, useQueryClient} from "react-query";

const postData = async (newText) =>{
    const response = await fetch(`http://localhost:3000/list`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText.text, completed: false})
    })
    const data = await response.json()
    return data
}
export const useMutationPost = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["postData"],
        mutationFn: postData,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ["data"]
            })
        }
    })
}
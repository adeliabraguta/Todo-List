import {useMutationPost} from "../react-query/useMutationPost.js";
import {useState} from "react";
import ItemComponent from "./ItemComponent.jsx";
import {useData} from "../react-query/useData.js";
import Loading from "./Loading.jsx";

export default function TodoComponent() {
    const {data} = useData()
    const {mutate: postData, isLoading} = useMutationPost()
    const [text, setText] = useState("")

    const handleSendData = () => {
        if(text.length > 0 ){
        postData({text: text})
        setText('')
        }
    }
    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendData();
        }
    }
    return (
        <>
            <div className={"input-component"}>
                <input className={"input"} type={"text"} value={text} placeholder={"Add a todo"} onChange={e => setText(e.target.value)} onKeyDown={handleInputKeyDown}/>
                <button className={"btn"} onClick={handleSendData}>Add a todo</button>
            </div>
            <div className={"fetching"}>
                {isLoading &&
                    <Loading/>}
            </div>
            <div className={"list"}>
                {data?.map(list => (
                    <ItemComponent key={list.id} id={list.id} text={list.text} completed={list.completed}
                                   enabled={false}/>
                ))}
            </div>
        </>
    )
}
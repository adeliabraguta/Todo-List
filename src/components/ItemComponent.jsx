import {useMutationPut} from "../react-query/useMutationPut.js";
import {useState} from "react";
import {useMutationDelete} from "../react-query/useMutationDelete.js";
import Loading from "./Loading.jsx";

export default function ItemComponent({id, text, completed}){
    const {mutate: putData, isLoading} = useMutationPut(id)
    const {mutate: deleteData} = useMutationDelete(id)
    const [isChecked, setISChecked] = useState(completed)
    const [edit, setEdit] = useState(false)
    const [message, setMessage] =useState(text)

    const handleCheck = () => {
        setISChecked(!isChecked)
        putData({id, text, completed: !isChecked})
    }
    const handleEdit = () => {
        if(edit){
        putData({id, text: message, completed})
        setEdit(false)
        } else{
        setEdit(true)
        }
    }
    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            handleEdit();
        }
    }
    const handleDelete = () =>{
        deleteData(id)
    }
    if(isLoading){
        return (
            <div className={"loading"}>
                <Loading/>
            </div>
        )
    }
    return(
        <div className={"item"}>
            <input className={"checkbox"} type={"checkbox"} checked={isChecked} onChange={handleCheck}/>
            {edit ?
            <input className={"input"} type={"text"} value={message} onChange={e => setMessage(e.target.value)}  onKeyDown={handleInputKeyDown}/>
            : <h2>{text}</h2>}
            <span style={{cursor:"pointer", fontSize: "18px"}} onClick={handleEdit}>{edit ? "✔️" : "✒️"}</span>
            <span style={{cursor:"pointer", fontSize: "18px"}} onClick={handleDelete}>🗑️</span>
        </div>
    )
}
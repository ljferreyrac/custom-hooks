import { useEffect, useReducer } from "react";
import { toDoReducer } from "../08-useReducer/toDoReducer"
const init = () => {
    return JSON.parse( localStorage.getItem('toDoList') ) || [];
}

export const useToDo = () => {
    const [toDoList, dispatch] = useReducer( toDoReducer , [], init)
    
    useEffect(() => {
      localStorage.setItem('toDoList', JSON.stringify(toDoList));
    }, [toDoList])
    
    const onToggleToDo = (id) => {
        dispatch({
            type: 'Toggle ToDo',
            payload: id
        })
    }
    

    const onNewToDo = (toDo) => {
        const action = {
            type: 'Add ToDo',
            payload: toDo
        }

        dispatch( action );
    }

    const onDeleteToDo = (id) => {
        dispatch({
            type: 'Remove ToDo',
            payload: id
        })
    }

    return {
        toDoList,
        toDosCount: toDoList.length,
        pendingToDosCount: toDoList.filter(toDo => !toDo.done).length,
        onNewToDo,
        onDeleteToDo,
        onToggleToDo
    }
}

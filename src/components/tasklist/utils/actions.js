export const selectContainer = (source,destination,containers) => {
    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;
    // let sourceIndex = parseInt(sourceDroppableId.slice((sourceDroppableId.length - 1),sourceDroppableId.length));
    // let destinationIndex = parseInt(destinationDroppableId.slice((destinationDroppableId.length - 1),destinationDroppableId.length));

    return {
        source: {
            tasks: containers[sourceDroppableId].tasks
        },
        destination: {
            tasks: containers[destinationDroppableId].tasks
        }
    }
}


export const getKeyOrIndex = (index = undefined,key = undefined,) => {

    if(index){
        
        let container
        let indexToBe = parseInt(index)
        if(indexToBe === 1){
            container = 'to_do';
        } else if(indexToBe === 2){
            container = 'in_progress';
        } else {
            container = 'completed';
        }

        return container
    } else {
        let container
        if(key === 'to_do'){
            container = 1;
        } else if(key === 'in_progress'){
            container = 2;
        } else {
            container = 3;
        }

        return container
    }
}

export const reorder = (options) => {
    console.log('Reorder')
    const {
        source,
        destination,
        sourceTask,
        destinationTask,
        dispatch
    } = options

    dispatch({
        type: source.droppableId,
        tasks: [...sourceTask]
    })
    dispatch({
        type: destination.droppableId,
        tasks: [...destinationTask]
    })

   
}

export const getNewPriority = (destinationTask) => {
    let newPriority = {};
    destinationTask.map((task,index) => {
        newPriority[task.id] = destinationTask.length - index; 
        //return true;
    })

    return newPriority;
}

export const reducer = (state, action) => {
    return {
        ...state, 
        [action.type]:{
            ...state[action.type],
            tasks: [...action.tasks]
        }
    }
}
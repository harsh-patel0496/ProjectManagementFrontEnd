const initialState = {
    project: {}
}

const ProjectReducer = (state = initialState,actions) =>{
    switch(actions.type){
        case "SET_PROJECT":
            return {...state,project: actions.payload}
        default: 
            return state
    }
}

export default ProjectReducer
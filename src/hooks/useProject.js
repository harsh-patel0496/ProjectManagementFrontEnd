import store from '../redux/index'

function useProject(props) {
    
    const setProjectToRedux = (project = {}) => {
        store.dispatch({
            type:"SET_PROJECT",
            payload: project
        });
    }

    const projectFromRudux = store.getState().project.project
    return [projectFromRudux,setProjectToRedux]
}

export default useProject
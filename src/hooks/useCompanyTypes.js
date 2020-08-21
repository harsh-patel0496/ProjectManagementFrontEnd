import store from '../redux/index'

function useCompanyTypes(props) {
    
    const setCompanyTypesToRedux = (companyTypes = []) => {
        store.dispatch({
            type:"SET_COMPANY_TYPES",
            payload: companyTypes
        });
    }

    const companyTypesFromRudux = store.getState().company.companyTypes
    return [companyTypesFromRudux,setCompanyTypesToRedux]
}

export default useCompanyTypes
const initialState = {
    companyTypes: []
}

const CompanyTypesReducer = (state = initialState,actions) =>{
    switch(actions.type){
        case "SET_COMPANY_TYPES":
            return {...state,companyTypes: actions.payload}
        default: 
            return state
    }
}

export default CompanyTypesReducer
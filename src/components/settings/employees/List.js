import React,{useState,useEffect,useReducer} from 'react'
import MaterialTable,{ 
    MTableToolbar,
    //MTableHeader 
} from 'material-table'
import DialogComponent from '../../../utils/styledComponent/DialogComponent'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import { apiCall } from '../../../utils/apiCall'
import useNotification from '../../../hooks/useNotification';

export const EmployeeContext = React.createContext();
function List(props) {

    //const [clients,setClients] = useState([])
    const [isOpenAddEmployeeDialog,setOpenAddEmployeeDialog] = useState(false)
    const initialState = {
        isRefresh: false,
        edit: false,
        employee: {},
        tableRef: null
    }
    const tableRef = React.createRef();
    const reducer = (state,actions) => {
        switch(actions.type){
            case 'SET_REFRESH':
                return {...state,isRefresh:actions.isRefresh}
            case 'TOGGLE_EDIT':
                return {...state,edit: !state.edit}
            case 'SET_EMPLOYEE':
                return {...state,employee: actions.employee}
            case 'SET_TABLE_REF':
                return {...state,tableRef: actions.tableRef}
            default:
             return state
        }
    }

    const [state,dispatch] = useReducer(reducer,initialState)
    const [setNotification] = useNotification();
    useEffect(() => {

        // const options = {
        //     method: 'get',
        //     url: '/clients'
        // };
        
        // apiCall(options).then( response => {
        //     setClients(response.data.clients);
        // }).catch( error => {
        //     console.log(error)
        // })

    },[])

    const EmployeeContextOptions = {
        label: props.label,
        role: props.role,
        state,
        dispatch,
        setOpenAddEmployeeDialog
    }
    return (
        <div>
            <MaterialTable
            
                tableRef={tableRef}
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Qualification', field: 'qualification' },
                    { title: 'Specilization', field: 'specilization' },
                    { title: 'Contact Number', field: 'contact_no' },
                    { title: 'Address', field: 'address' }
                    
                    
                ]}
                data={ query => new Promise((resolve,reject) => {
                    const options = {
                        method: 'get',
                        url: `/employees?role=${props.role}&per_page=${query.pageSize}&page=${query.page + 1}`
                    };
                    
                    apiCall(options).then( response => {
                        const employees = response.data.employees
                        //setClients(response.data.clients)
                        resolve({
                            data: employees.data,
                            page: employees.current_page - 1,
                            totalCount: employees.total
                        })
                    }).catch( error => {
                        console.log(error)
                    })
                })}
                editable={{
                    
                    onRowDelete: oldData => {
                        return new Promise((resolve,reject) => {
                            const options = {
                                method: 'delete',
                                url: `/employees/${oldData.id}`
                            }
                            apiCall(options).then((response) => {
                                let notificationOptions = {};
                                if(response.data && response.data.employee === 1){
                                    notificationOptions = {
                                        open: true,
                                        message: 'Employee has been deleted!',
                                        type: 'success'
                                    }
                                    
                                } else {
                                    notificationOptions = {
                                        open: true,
                                        message: response.data && response.data.message,
                                        type: 'info'
                                    }
                                }
                                setNotification(notificationOptions);
                                resolve()
                            }).catch((error) => {
                                resolve()
                            })
                        })
                    }
                }}
                components={{
                    Toolbar: props => (
                      <div>
                        <MTableToolbar {...props} />
                      </div>
                    )
                  }}
                title="Clients"
                style={{margin:'3%',padding: '1%'}}
                //isLoading={isLoading}
                // options={{
                //     selection: true
                // }}
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Edit Costomer',
                      onClick: (employee, rowData) => { 
                          dispatch({ type:"TOGGLE_EDIT" })
                          dispatch({ type: "SET_EMPLOYEE",employee:rowData }) 
                          dispatch({ type: "SET_TABLE_REF",tableRef: tableRef.current})
                        }
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) => {
                            dispatch({ type: "SET_TABLE_REF",tableRef: tableRef.current})
                            setOpenAddEmployeeDialog(true)
                        }
                      },
                      {
                        icon: 'refresh',
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                      }
                ]}
                
            />
            {isOpenAddEmployeeDialog && <DialogComponent 
                    isOpen= {isOpenAddEmployeeDialog} 
                    setOpen={setOpenAddEmployeeDialog}
                    title={`Add ${props.label}`}
                    footerActions={false}
                >
                    <EmployeeContext.Provider value={{...EmployeeContextOptions,tableRef}}>
                        <AddEmployee />
                    </EmployeeContext.Provider>
                </DialogComponent>
            }

            {state.edit && <DialogComponent 
                    isOpen= {state.edit} 
                    setOpen={() => dispatch({ type:"TOGGLE_EDIT" })}
                    title={`Edit ${props.label}`}
                    footerActions={false}
                >
                    <EmployeeContext.Provider value={EmployeeContextOptions}>
                        <EditEmployee />
                    </EmployeeContext.Provider>
                </DialogComponent>}
        </div>
    )
}

export default List

import React,{useState,useEffect,useReducer} from 'react'
import MaterialTable,{ MTableToolbar,MTableHeader } from 'material-table'
import DialogComponent from '../../../utils/styledComponent/DialogComponent'
import AddClient from './AddClient'
import EditClient from './EditClient'
import { apiCall } from '../../../utils/apiCall'
import useNotification from '../../../hooks/useNotification';
export const ClientContext = React.createContext();
function List(props) {

    //const [clients,setClients] = useState([])
    const [isOpenAddClientDialog,setOpenClientDialog] = useState(false)
    const initialState = {
        isRefresh: false,
        edit: false,
        client: {},
        tableRef: null
    }
    const tableRef = React.createRef();
    const reducer = (state,actions) => {
        switch(actions.type){
            case 'SET_REFRESH':
                return {...state,isRefresh:actions.isRefresh}
            case 'TOGGLE_EDIT':
                return {...state,edit: !state.edit}
            case 'SET_CLIENT':
                return {...state,client: actions.client}
            case 'SET_TABLE_REF':
                return {...state,tableRef: actions.tableRef}
            default:
             return state
        }
    }

    const [state,dispatch] = useReducer(reducer,initialState)

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
    const [setNotification] = useNotification();

    const ClientContextOptions = {
        role: props.role,
        state,
        dispatch,
        setOpenClientDialog
    }
    return (
        <div>
            <MaterialTable
                tableRef={tableRef}
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Contact Person', field: 'contact_person' },
                    { title: 'Contact Number', field: 'contact_no' },
                    { title: 'Address', field: 'address' }
                    
                    
                ]}
                data={ query => new Promise((resolve,reject) => {
                    const options = {
                        method: 'get',
                        url: `/clients?per_page=${query.pageSize}&page=${query.page + 1}`
                    };
                    
                    apiCall(options).then( response => {
                        const clients = response.data.clients
                        //setClients(response.data.clients)
                        resolve({
                            data: clients.data,
                            page: clients.current_page - 1,
                            totalCount: clients.total
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
                                url: `/clients/${oldData.id}`
                            }
                            apiCall(options).then((response) => {
                                const notificationOptions = {
                                    open: true,
                                    message: 'Employee has been deleted!',
                                    type: 'success'
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
                      onClick: (client, rowData) => { 
                          dispatch({ type:"TOGGLE_EDIT" })
                          dispatch({ type: "SET_CLIENT",client:rowData }) 
                          dispatch({ type: "SET_TABLE_REF",tableRef: tableRef.current})
                        }
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) => {
                            dispatch({ type: "SET_TABLE_REF",tableRef: tableRef.current})
                            setOpenClientDialog(true)
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
            {isOpenAddClientDialog && <DialogComponent 
                    isOpen= {isOpenAddClientDialog} 
                    setOpen={setOpenClientDialog}
                    title="Add Client"
                    footerActions={false}
                >
                    <ClientContext.Provider value={{...ClientContextOptions,tableRef}}>
                        <AddClient />
                    </ClientContext.Provider>
                </DialogComponent>
            }

            {state.edit && <DialogComponent 
                    isOpen= {state.edit} 
                    setOpen={() => dispatch({ type:"TOGGLE_EDIT" })}
                    title="Edit Client"
                    footerActions={false}
                >
                    <ClientContext.Provider value={ClientContextOptions}>
                        <EditClient />
                    </ClientContext.Provider>
                </DialogComponent>}
        </div>
    )
}

export default List

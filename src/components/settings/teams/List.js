import React,{useState,useEffect,useReducer} from 'react'
import MaterialTable,{ MTableToolbar,MTableHeader } from 'material-table'
import DialogComponent from '../../../utils/styledComponent/DialogComponent'
import AddTeam from './AddTeam'
import EditTeam from './EditTeam'
import TeamMembers from './TeamMembers'
import { apiCall } from '../../../utils/apiCall'
import useNotification from '../../../hooks/useNotification';
import Editable from './Editable'

export const TeamContext = React.createContext();


function List(props) {

    //const [clients,setClients] = useState([])
    const [isOpenAddTeamDialog,setOpenAddTeamDialog] = useState(false)
    const initialState = {
        isRefresh: false,
        edit: false,
        team: {},
        tableRef: null
    }
    const tableRef = React.createRef();
    const reducer = (state,actions) => {
        switch(actions.type){
            case 'SET_REFRESH':
                return {...state,isRefresh:actions.isRefresh}
            case 'TOGGLE_EDIT':
                return {...state,edit: !state.edit}
            case 'SET_TEAM':
                return {...state,team: actions.team}
            case 'SET_TABLE_REF':
                return {...state,tableRef: actions.tableRef}
            default:
             return state
        }
    }

    const [state,dispatch] = useReducer(reducer,initialState)

    const [setNotification] = useNotification();
    const [developers,setDevelopers] = useState([]);
    const [managers,setManagers] = useState([]);

    useEffect(() => {
        const options = {
            url: '/teams/getListOfEmployee',
            method: 'get'
        }
        apiCall(options).then(response => {
            if(response.data.employees && response.data.employees.managers){
                setManagers(response.data.employees.managers)
            }
            if(response.data.employees && response.data.employees.developers){
                setDevelopers(response.data.employees.developers)
            }
        }).catch( error => {
            console.log(error)
        })
    },[])
    const TeamContextOptions = {
        label: props.label,
        role: props.role,
        state,
        dispatch,
        setOpenAddTeamDialog
    }
    return (
        <div>
            <MaterialTable
            
                tableRef={tableRef}
                columns={[
                    { title: 'Name', field: 'name' ,
                        editable: 'never' ,
                        editComponent: props => (
                            <Editable {...props} type={1}/>
                        )
                    },
                    { 
                        title: 'Managers', 
                        field: 'managers' , 
                        editable: 'never' ,
                        editComponent: props => (
                            <Editable {...props} data={managers} type={2}/>
                        ),
                        render : rowData => {
                            //console.log('rowData',rowData)
                            return <TeamMembers 
                                data={{team: rowData.id,managers: rowData.managers}} 
                                tableRef={tableRef}
                            />
                        }
                    },
                    { 
                        title: 'Developers', 
                        field: 'developers' ,
                        editable: 'never' ,
                        editComponent: props => (
                            <Editable {...props} data={developers !== undefined ? developers : []} type={3}/>
                        ),
                        render : rowData => <TeamMembers 
                            data={{team: rowData.id,developers: rowData.developers}} 
                            tableRef={tableRef}
                        />
                    }
                ]}
                data={ query => new Promise((resolve,reject) => {
                    const options = {
                        method: 'get',
                        url: `/teams?&per_page=${query.pageSize}&page=${query.page + 1}`
                    };
                    
                    apiCall(options).then( response => {
                        const teams = response.data.teams
                        resolve({
                            data: teams.data,
                            page: teams.current_page - 1,
                            totalCount: teams.total
                        })
                    }).catch( error => {
                        console.log(error)
                    })
                })}
                editable={{
                    // onRowUpdate: (newData, oldData) =>{
                        
                    //     return new Promise((resolve, reject) => {
                    //         console.log('newData',newData)
                    //         resolve()
                    //     })
                    // },
                    onRowDelete: oldData => {
                        return new Promise((resolve,reject) => {
                            const options = {
                                method: 'delete',
                                url: `/teams/${oldData.id}`
                            }
                            apiCall(options).then((response) => {
                                const notificationOptions = {
                                    open: true,
                                    message: 'Team has been deleted!',
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
                title="Teams"
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
                            dispatch({ type: "SET_TEAM",team:rowData }) 
                            dispatch({ type: "SET_TABLE_REF",tableRef: tableRef.current})
                        }
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) => {
                            dispatch({ type: "SET_TABLE_REF",tableRef: tableRef.current})
                            setOpenAddTeamDialog(true)
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
            {isOpenAddTeamDialog && <DialogComponent 
                    isOpen= {isOpenAddTeamDialog} 
                    setOpen={setOpenAddTeamDialog}
                    title={`Add ${props.label}`}
                    footerActions={false}
                >
                    <TeamContext.Provider value={{...TeamContextOptions,tableRef}}>
                        <AddTeam />
                    </TeamContext.Provider>
                </DialogComponent>
            }

            {state.edit && <DialogComponent 
                    isOpen= {state.edit} 
                    setOpen={() => dispatch({ type:"TOGGLE_EDIT" })}
                    title={`Edit ${props.label}`}
                    footerActions={false}
                >
                    <TeamContext.Provider value={TeamContextOptions}>
                        <EditTeam />
                    </TeamContext.Provider>
                </DialogComponent>}
        </div>
    )
}

export default List

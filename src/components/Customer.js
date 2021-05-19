import React from "react";
import { forwardRef } from 'react';
import { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import AddTraining from './AddTraining';

function Customer() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.log(err))
  }

  const content = [
    {title: 'Add training', field: '', 
    render: rowData => <AddTraining link={rowData.links[0].href} addTraining={addTraining}/>},
    {title: 'Firstname', field: 'firstname'},
    {title: 'Lastname', field: 'lastname'},
    {title: 'Streetaddress', field: 'streetaddress'},
    {title: 'Postcode', field: 'postcode'},
    {title: 'City', field: 'city'},
    {title: 'Email', field: 'email'},
    {title: 'phone', field: 'phone'}
  ]

  const deleteCustomer = (customer) => {
      fetch(customer.links[0].href, { method: 'DELETE' })
      .then(response => {
        if(response.ok) {
          getCustomer();
        }
        else {
          alert('Something went wrong in deletion');
        }
      })
      .catch(err => console.error(err))
  }

  const editCustomer = (customer) => {
     fetch(customer.links[0].href,    
      { 
      method: 'PUT', 
      body: JSON.stringify(customer),
     headers: { 'Content-type' :  'application/json' }
    })
    .then(_ => getCustomer())
     .catch(err => console.error(err))
   }

  const addCustomer = (newCustomer) => {
     fetch("https://customerrest.herokuapp.com/api/customers",    
     {
     method: 'POST',
      body: JSON.stringify(newCustomer),
      headers: { 'Content-type' :  'application/json' }
   })
    .then(_ => getCustomer())
      .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
      fetch("https://customerrest.herokuapp.com/api/trainings",    
       {
       method: 'POST',
       body: JSON.stringify(newTraining),
       headers: { 'Content-type' :  'application/json' }
    })
    .then(_ => getCustomer())
       .catch(err => console.error(err))
     }
     
     

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  }
 

  return (
    <div style={{ maxWidth: '100%' , marginTop: "10vh"}}>
        
        <MaterialTable
        title="Customerlist"
        editable={{
          onRowAdd: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                addCustomer(newData);
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                editCustomer(newData);
                resolve();
              }, 1000)
              
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteCustomer(oldData);
                resolve()
              }, 1000)
            }),
        }}
        data = {customers}
        columns = {content}
        icons={tableIcons}

        
        />
        
      </div>
  );
}

export default Customer;
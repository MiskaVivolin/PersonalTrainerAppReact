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
import Moment from 'react-moment';


function Trainings() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
      getTraining();
    }, []);
  
    const getTraining = () => {
      fetch("https://customerrest.herokuapp.com/gettrainings")
        .then((response) => response.json())
        .then((data) => setTrainings(data))
        .catch((err) => console.log(err))
    }
  
    const content = [
      {
        title: 'Date', field: 'date',
        render: erkki =>
          <Moment format="DD.MM.YYYY HH.mm A">{erkki.date}</Moment>,
        type: "datetime"
      },
      {title: 'Duration', field: 'duration'},
      {title: 'Activity', field: 'activity'},
      {title: 'Firstname', field: 'customer.firstname'},
      {title: 'Lastname', field: 'customer.lastname'},
      {title: 'id', field: 'id'}
    ]

  const deleteTraining = (trainingID) => {
    fetch("https://customerrest.herokuapp.com/api/trainings/" + trainingID.id, 
     {
      method: 'DELETE' })
      .then(response => {
        if(response.ok) {
          getTraining();
        }
        else {
          alert('Something went wrong in deletion');
        }
      })
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
          <MaterialTable style={{title: "Traininglist"}}
          title="Traininglist"
          editable={{
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteTraining(oldData);
                resolve()
              }, 1000)
            }),
        }}
          data = {trainings}
          columns = {content}
          icons={tableIcons}
          />
        </div>
    );
  }
  
  export default Trainings;
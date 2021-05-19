import React from 'react';
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { useState, useEffect } from "react";

function AppCalendar() {

  useEffect(() => {
    fetchData();
  }, []);

  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);
    
  const fetchData = () => {
    fetch(`https://customerrest.herokuapp.com/gettrainings`)
      .then(response => response.json())
      .then(data => {
      return setEvents(data.map(event => ({
        start: new Date(event.date),
        end: new Date(moment(event.date).add(event.duration, "minutes")),
        title: event.activity
      }))
      );
    }); 
  }
    console.log("events", events);
    return (
      <div>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: "92vh", marginTop: "8vh"}}
        />
      </div>
    );
  };

export default AppCalendar;
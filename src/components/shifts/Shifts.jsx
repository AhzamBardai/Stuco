import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentPlugin from '@fullcalendar/moment'
import listPlugin from '@fullcalendar/list';
import './shift.css'
import moment from 'moment'

// import the third-party stylesheets directly from your JS
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Paper } from '@mui/material'
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'

export default function Shifts() {

  let eventGuid = 0
  let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

  function createEventId() {
    return String(eventGuid++)
  }
  const INITIAL_EVENTS = [

    {
      id: createEventId(),
      title: 'Friday Shift',
      start: todayStr + 'T12:00:00',
      end: todayStr + 'T14:00:00',
      extendedProps: {
        status: 'done'
      }
    },
    {
      id: '3',
      title: 'test',
      start: moment().day(5).hour(19).minute(0).second(0)._d.toISOString(),
      end: moment().day(5).hour(21).minute(0).second(0)._d.toISOString()
    }
  ]

  const [shifts, setShifts] = useState(INITIAL_EVENTS)
  const [modal, setModal] = useState(false)
  const [edit, setEdit] = useState()
  const { user, url } = useState()  

  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  function handleEventClick  (clickInfo) {
    console.log(clickInfo.event.start.toISOString())
    console.log(clickInfo.event.end.toISOString())

  }

  function handleEvents(events)  {
    console.log('hello')
    setShifts(events)
  }

  function renderEventContent(eventInfo) {
    return (
      <span>
        <b>{eventInfo.timeText}</b> - {eventInfo.event.title}
      </span>
    )
  }

  const newShift = () => {
    if(user && user.isAdmin){
      axios.post(url + 'shifts/new', )

    }
    else{
      window.alert('not authorized')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%', fontSize: '14px'}} >
      <Paper sx={{width: '100%', m: '20px 60px', padding: '2em'}} elevation={6} >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin, momentPlugin, listPlugin]}
          themeSystem= 'bootstrap'
          customButtons={{
              newButton: {
                text: "New Shift",
                click: () => window.alert("nice"),
              },
          }}
          headerToolbar={{
            right: 'newButton today prev,next',
            center: 'title',
            left: 'dayGridMonth,timeGridWeek listWeek'
          }}
          initialView='timeGridWeek'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={false}
          weekends={true}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          eventAdd={function(hell){console.log(hell)}}
          height='70vh'
          slotDuration='01:00'
        />
      </Paper>
    </div>
  )
}


  



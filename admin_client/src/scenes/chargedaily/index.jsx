// import { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import {formatDate} from "@fullcalendar/core"
// import listPlugin from "@fullcalendar/list";
// import {
//   Box,
  // List,
  // ListItem,
  // ListItemText,
  // Typography,
//   useTheme,
// } from "@mui/material";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";


import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect } from 'react';
import { useState } from 'react';
import {fetchGet} from "../../communication/handlefetch"

const Calendar = ({ isDashboard = false }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Data, setData] = useState([]);

  const columns = [
    { 
      field: "id",
      headerName: "일자", 
      headerAlign: "center",
      align: "center",
      flex: 1 
    },
    { 
      field: "amount", 
      headerName: "충전량",
      headerAlign: "center",
      align: "center",
      flex: 1, 
    },
    {
      field: "count",
      headerName: "충전횟수",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "pay",
      headerName: "매출액",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  useEffect(() => {
    fetchGet("/charge_daily_list")
    .then((data) => {        
      setData(data)
    });
  }, []);


  return (

    
    <Box m="20px">
      {
        isDashboard?
        null
        :
        <Header title="일자별 충전량 조회" subtitle="일자별 총 충전량 및 매출액을 조회합니다" />
      }
      <Box
        m={isDashboard ? "20px 0 0 0": "40px 0 0 0"}
        height={isDashboard ? "17vh": "75vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid

          rows = {Data}
          columns={columns}
          components={{ Toolbar: isDashboard? null:GridToolbar }} 
          hideFooter={isDashboard}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'desc' }],
            },
          }}
        />
      </Box>
    </Box>
  );















  
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  // const [currentEvents, setCurrentEvents] = useState([]);

//   const handleDateClick = (selected) => {
//     const title = prompt("Please enter a new title for your event");
//     const calendarApi = selected.view.calendar;
//     calendarApi.unselect();

//     if (title) {
//       calendarApi.addEvent({
//         id: `${selected.dateStr}-${title}`,
//         title,
//         start: selected.startStr,
//         end: selected.endStr,
//         allDay: selected.allDay,
//       });
//     }
//   };

//   const handleEventClick = (selected) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event '${selected.event.title}'`
//       )
//     ) {
//       selected.event.remove();
//     }
//   };

//   return (
//     <Box m="20px">
//       <Header title="일자별 충전량 조회" subtitle="일자별 총 충전량을 조회합니다" />

//       <Box display="flex" justifyContent="space-between">
//         {/* CALENDAR SIDEBAR */}
//         <Box
//           flex="1 1 20%"
//           backgroundColor={colors.primary[400]}
//           p="15px"
//           borderRadius="4px"
//         >
//           <Typography variant="h5">Events</Typography>
//           <List>
//             {currentEvents.map((event) => (
//               <ListItem
//                 key={event.id}
//                 sx={{
//                   backgroundColor: colors.greenAccent[500],
//                   margin: "10px 0",
//                   borderRadius: "2px",
//                 }}
//               >
//                 <ListItemText
//                   primary={event.title}
//                   secondary={
//                     <Typography>
//                       {formatDate(event.start, {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </Typography>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* CALENDAR */}
//         <Box flex="1 1 100%" ml="15px">
//           <FullCalendar
//             height="75vh"
//             plugins={[
//               dayGridPlugin,
//               timeGridPlugin,
//               interactionPlugin,
//               listPlugin,
//             ]}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//             }}
//             initialView="dayGridMonth"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             select={handleDateClick}
//             eventClick={handleEventClick}
//             eventsSet={(events) => setCurrentEvents(events)}
//             initialEvents={[
//               {
//                 id: "12315",
//                 title: "All-day event",
//                 date: "2022-09-14",
//               },
//               {
//                 id: "5123",
//                 title: "Timed event",
//                 date: "2022-09-28",
//               },
//             ]}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
};

export default Calendar;

import React, { useState } from "react";
import { Calendar, Input, Button } from "antd";
import axios from "axios";
import moment from "moment";
import api from "../../../../config/axios";

function ViewSchedule() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedule, setSchedule] = useState({});

  const fetchSchedule = async () => {
    try {
      const response = await api.get("/scheduling/scheduleMatrix", {
        params: {
          startDate,
          endDate,
        },
      });
      setSchedule(response.data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const dateCellRender = (value) => {
    const dateStr = value.format("dddd, DD-MM-YYYY");
    const daySchedule = schedule[dateStr];

    if (!daySchedule || daySchedule.staff.length === 0) {
      return "No Shifts";
    }

    return (
      <div>
        {Object.keys(daySchedule).map((key) => {
          if (key === "staff") {
            return (
              <div key={key}>
                <ul>
                  {daySchedule.staff.map((staffMember) => (
                    <li key={staffMember.staffID}>
                      {staffMember.startTime} - {staffMember.endTime} ({staffMember.shiftType}, {staffMember.workArea}, {staffMember.username})
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="ViewSchedule">
      <div className="input-container">
        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
        <Button onClick={fetchSchedule} type="primary">
          Fetch Schedule
        </Button>
      </div>
      <Calendar onPanelChange={onPanelChange} dateCellRender={dateCellRender} />
    </div>
  );
}

export default ViewSchedule;

// ScheduleStaff.jsx
import { Button } from "antd";
import React from "react";

const ScheduleStaff = ({ staff }) => {
  return (
    <div>
      <Button type="primary">Thêm</Button>

      <h3>Schedule for {staff.username}</h3>
      {staff.shift.map((shift) => (
        <div key={shift.shiftID}>
          <p>Shift ID: {shift.shiftID}</p>
          <p>Start Time: {shift.startTime}</p>
          <p>End Time: {shift.endTime}</p>
          <p>Shift Type: {shift.shiftType}</p>
          <p>Work Area: {shift.workArea}</p>
        </div>
      ))}
    </div>
  );
};

export default ScheduleStaff;

// ScheduleStaff.jsx
import { Button, Card } from "antd";
import React from "react";

const ScheduleStaff = ({ staff, handleAdd }) => {
  return (
    <Card title={`Schedule for ${staff.username}`} style={{ width: 300 }}>
      {staff.shift.map((shift) => (
        <div key={shift.shiftID} style={{ marginTop: 16 }}>
          <p>Shift ID: {shift.shiftID}</p>
          <p>Start Time: {shift.startTime}</p>
          <p>End Time: {shift.endTime}</p>
          <p>Shift Type: {shift.shiftType}</p>
          <p>Work Area: {shift.workArea}</p>
        </div>
      ))}
    </Card>
  );
};

export default ScheduleStaff;

import { Button, Calendar, DatePicker, Form } from "antd";
import React, { useEffect, useState } from "react";
import "./ViewSchedule.scss";
import api from "../../../../config/axios";

function ViewSchedule() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [visible, setVisible] = useState(0);
  const [scheduleData, setScheduleData] = useState({});

  const fetchSchedule = async (start, end) => {
    try {
      const response = await api.get("/scheduling/scheduleMatrix", {
        params: { startDate: start, endDate: end },
      });
      console.log(response.data);
      setScheduleData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = endDate.format("YYYY-MM-DD");
      fetchSchedule(formattedStartDate, formattedEndDate);
    }
  }, [visible]);

  useEffect(() => {
    document.title = "Xem lịch nhân viên";
  }, []);

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleSearchDate = () => {
    setVisible(1);
  };

  const dateCellRender = (value) => {
    const dateString = value.format("dddd, DD-MM-YYYY");
    const dayData = scheduleData[dateString];
    if (dayData && dayData?.Morning.length > 0 && dayData?.Afternoon.length > 0 && dayData?.Evening.length > 0) {
      console.log(dayData?.Morning);
    }
    return (
      <div className="date-cell">
        {dayData && (
          <>
            {dayData?.Morning.length > 0 && <h4>Morning</h4>}
            <ul>
              {dayData?.Morning.map((shift) => (
                <>
                  <li key={shift.shiftID}>
                    {shift.startTime} - {shift.endTime}
                  </li>
                  <li>
                    {shift.staff.length > 0 ? (
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Staff :
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        Dont have any staff
                      </span>
                    )}
                    {shift.staff.map((staff) => staff.username).join(", ")}
                  </li>
                </>
              ))}
            </ul>
            <ul>
              {dayData?.Afternoon.map((shift) => (
                <>
                  <li key={shift.shiftID}>
                    {shift.startTime} - {shift.endTime}
                  </li>
                  <li>
                    {shift.staff.length > 0 ? (
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Staff :
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        Dont have any staff
                      </span>
                    )}
                    {shift.staff.map((staff) => staff.username).join(", ")}
                  </li>
                </>
              ))}
            </ul>
            <ul>
              {dayData?.Evening.map((shift) => (
                <>
                  <li key={shift.shiftID}>
                    {shift.startTime} - {shift.endTime}
                  </li>
                  <li>
                    {shift.staff.length > 0 ? (
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Staff :
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        Dont have any staff
                      </span>
                    )}
                    {shift.staff.map((staff) => staff.username).join(", ")}
                  </li>
                </>
              ))}
            </ul>
            {dayData?.Afternoon.length > 0 && <h4>Afternoon</h4>}
            <ul>
              {dayData?.Afternoon.map((shift) => (
                <li key={shift.shiftID}>
                  {shift.startTime} - {shift.endTime}: {shift.staff.map((staff) => staff.username).join(", ")}
                </li>
              ))}
            </ul>
            {dayData?.Evening.length > 0 && <h4>Evening</h4>}
            <ul>
              {dayData?.Evening.map((shift) => (
                <li key={shift.shiftID}>
                  {shift.startTime} - {shift.endTime}: {shift.staff.map((staff) => staff.username).join(", ")}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="ViewSchedule">
      <Form>
        <Form.Item>
          <div className="ViewSchedule__startDate">
            <DatePicker placeholder="Ngày bắt đầu" onChange={handleStartDate} />
          </div>
        </Form.Item>
        <Form.Item>
          <div className="ViewSchedule__endDate">
            <DatePicker placeholder="Ngày kết thúc" onChange={handleEndDate} />
          </div>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSearchDate}>Tìm kiếm</Button>
        </Form.Item>
      </Form>
      <div className="ViewSchedule__schedule">
        <Calendar dateCellRender={dateCellRender} />
      </div>
    </div>
  );
}

export default ViewSchedule;

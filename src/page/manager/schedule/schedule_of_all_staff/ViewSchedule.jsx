import { Button, Calendar, DatePicker, Form } from "antd";
import React, { useEffect, useState } from "react";
import "./ViewSchedule.scss";
import api from "../../../../config/axios";

const { RangePicker } = DatePicker;

function ViewSchedule() {
  const [dateRange, setDateRange] = useState([]);
  const [scheduleData, setScheduleData] = useState({});

  const fetchSchedule = async (start, end) => {
    try {
      const response = await api.get("/api/scheduling/scheduleMatrix", {
        params: { startDate: start, endDate: end },
      });
      console.log(response.data);
      setScheduleData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = endDate.format("YYYY-MM-DD");
      fetchSchedule(formattedStartDate, formattedEndDate);
    }
  }, [dateRange]);

  useEffect(() => {
    document.title = "Xem lịch nhân viên";
  }, []);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const dateCellRender = (value) => {
    const dateString = value.format("dddd, DD-MM-YYYY");
    const dayData = scheduleData[dateString];

    return (
      <div className="date-cell">
        {dayData && (
          <>
            {dayData.Morning && dayData.Morning.length > 0 && (
              <>
                <h4>Morning</h4>
                <ul>
                  {dayData.Morning.map((shift) => (
                    <React.Fragment key={shift.shiftID}>
                      <li>
                        {shift.startTime} - {shift.endTime}
                      </li>
                      <li>
                        {shift.staff && shift.staff.length > 0 ? (
                          <>
                            <span style={{ fontWeight: "bold" }}>Staff: </span>
                            {shift.staff
                              .map((staff) => staff.username)
                              .join(", ")}
                          </>
                        ) : (
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            Don't have any staff
                          </span>
                        )}
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </>
            )}

            {dayData.Afternoon && dayData.Afternoon.length > 0 && (
              <>
                <h4>Afternoon</h4>
                <ul>
                  {dayData.Afternoon.map((shift) => (
                    <React.Fragment key={shift.shiftID}>
                      <li>
                        {shift.startTime} - {shift.endTime}
                      </li>
                      <li>
                        {shift.staff && shift.staff.length > 0 ? (
                          <>
                            <span style={{ fontWeight: "bold" }}>Staff: </span>
                            {shift.staff
                              .map((staff) => staff.username)
                              .join(", ")}
                          </>
                        ) : (
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            Don't have any staff
                          </span>
                        )}
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </>
            )}

            {dayData.Evening && dayData.Evening.length > 0 && (
              <>
                <h4>Evening</h4>
                <ul>
                  {dayData.Evening.map((shift) => (
                    <React.Fragment key={shift.shiftID}>
                      <li>
                        {shift.startTime} - {shift.endTime}
                      </li>
                      <li>
                        {shift.staff && shift.staff.length > 0 ? (
                          <>
                            <span style={{ fontWeight: "bold" }}>Staff: </span>
                            {shift.staff
                              .map((staff) => staff.username)
                              .join(", ")}
                          </>
                        ) : (
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            Don't have any staff
                          </span>
                        )}
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="ViewSchedule">
      <Form>
        <Form.Item>
          <RangePicker
            onChange={handleDateRangeChange}
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
          />
        </Form.Item>
      </Form>
      <div className="ViewSchedule__schedule">
        <Calendar dateCellRender={dateCellRender} />
      </div>
    </div>
  );
}

export default ViewSchedule;

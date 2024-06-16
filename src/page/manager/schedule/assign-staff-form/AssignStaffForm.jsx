import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Badge, Calendar, Card, Col, Radio, Row } from "antd";
import moment from "moment";
import axios from "axios";
import api from "../../../../config/axios";
const sampleData = {
  staffID: 49,
  phoneNumber: "0854321098",
  salary: 17500000,
  startDate: "2024-06-16",
  accountName: "Emily Davis",
  role: "ROLE_STAFF",
  status: 1,
  email: "emilydavis@gmail.com",
  username: "emilydavis",
  shift: [],
};
function AssignStaffForm() {
  const location = useLocation();
  const [data, setData] = useState([sampleData]);
  const [date, setDate] = useState(null);
  const [shiftType, setShiftType] = useState("Morning");
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [shiftsData, setShiftsData] = useState({});

  useEffect(() => {
    console.log("Location state:", location.state);
    if (location.state && location.state.data) {
      console.log("Data received:", location.state.data);
      setData([location.state.data]); // Ensure data is wrapped in an array
    }
  }, []);

  useEffect(() => {
    fetchShiftsForMonth(currentMonth);
  }, [currentMonth]);

  const onSelect = (value) => {
    const selectedDate = value.format("dddd, DD-MM-YYYY");
    setDate(selectedDate);
    filterShifts(selectedDate, shiftType);
  };

  const onShiftTypeChange = (e) => {
    const selectedShiftType = e.target.value;
    setShiftType(selectedShiftType);
    if (date) {
      filterShifts(date, selectedShiftType);
    }
  };

  const onPanelChange = (value) => {
    setCurrentMonth(value);
  };

  const fetchShiftsForMonth = (month) => {
    const startOfMonth = month.startOf("month").format("YYYY-MM-DD");
    const endOfMonth = month.endOf("month").format("YYYY-MM-DD");

    // Make an API call to fetch shifts for the month
    const response = api
      .get(
        `scheduling/scheduleMatrix?startDate=${startOfMonth}&endDate=${endOfMonth}`
      )
      .then((response) => {
        // Assuming the response has the structure needed
        // Update sampleData or set data directly based on the response
        setShiftsData(response.data);
        // Update the state or handle the response data as needed
      })
      .catch((error) => {
        console.error("Error fetching shifts:", error);
      });
  };

  const filterShifts = (selectedDate, selectedShiftType) => {
    if (
      shiftsData[selectedDate] &&
      shiftsData[selectedDate][selectedShiftType]
    ) {
      const allShifts = shiftsData[selectedDate][selectedShiftType];
      const filtered = allShifts.filter((shift) =>
        shift.staff.some(
          (staffMember) => staffMember.staffID === data[0].staffID
        )
      );
      setFilteredShifts(filtered);
    } else {
      setFilteredShifts([]);
    }
  };

  const dateCellRender = (value) => {
    const formattedDate = value.format("dddd, DD-MM-YYYY");
    const shiftsForDate = shiftsData[formattedDate];
    const staffID = data[0]["staffID"] || 0;
    if (shiftsForDate) {
      const morningShifts = shiftsForDate["Morning"] || [];
      const afternoonShifts = shiftsForDate["Afternoon"] || [];
      const eveningShifts = shiftsForDate["Evening"] || [];

      // Function to render badges for shifts of a specific shift type
      const renderShiftBadges = (shifts) => {
        return shifts.map((shift, index) => (
          <Badge
            key={index}
            status={getColorByShiftType(shift.shiftType)} // Assuming getColorByShiftType is defined elsewhere
            text={shift.shiftType}
          />
        ));
      };

      // Function to check if staffID is assigned to any shift
      const isStaffAssigned = (shifts) => {
        return shifts.some((shift) => {
          if (shift.staff && shift.staff.length > 0) {
            return shift.staff.some((staff) => staff.staffID === staffID);
          }
          return false;
        });
      };

      return (
        <div>
          {morningShifts.length > 0 &&
            isStaffAssigned(morningShifts) &&
            renderShiftBadges(morningShifts)}
          {afternoonShifts.length > 0 &&
            isStaffAssigned(afternoonShifts) &&
            renderShiftBadges(afternoonShifts)}
          {eveningShifts.length > 0 &&
            isStaffAssigned(eveningShifts) &&
            renderShiftBadges(eveningShifts)}
        </div>
      );
    }

    return null;
  };

  const getColorByShiftType = (shiftType) => {
    switch (shiftType) {
      case "Morning":
        return "success"; // Green
      case "Afternoon":
        return "processing"; // Orange
      case "Evening":
        return "error"; // Blue
      default:
        return "default"; // Default color
    }
  };

  return (
    <>
      <div>
        {data.length > 0 ? (
          <Card title="Staff Information">
            {data.map((item, index) => (
              <Card key={index} style={{ marginBottom: 16 }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <p>
                      <strong>Staff ID:</strong> {item.staffID}
                    </p>
                  </Col>
                  <Col span={8}>
                    <p>
                      <strong>Phone Number:</strong> {item.phoneNumber}
                    </p>
                  </Col>
                  <Col span={8}>
                    <p>
                      <strong>Salary:</strong> {item.salary}
                    </p>
                  </Col>
                  <Col span={8}>
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {new Date(item.startDate).toLocaleString()}
                    </p>
                  </Col>
                  <Col span={8}>
                    <p>
                      <strong>Account Name:</strong> {item.accountName}
                    </p>
                  </Col>
                  <Col span={8}>
                    <p>
                      <strong>Role:</strong> {item.role}
                    </p>
                  </Col>
                  <Col span={8}>
                    <p>
                      <strong>Status:</strong> {item.status}
                    </p>
                  </Col>
                  <Col span={8}>
                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>
                  </Col>
                  <Col span={8}>
                    <p>
                      <strong>Username:</strong> {item.username}
                    </p>
                  </Col>
                </Row>
              </Card>
            ))}
          </Card>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div style={{ marginBottom: 16 }}>
        <Radio.Group onChange={onShiftTypeChange} value={shiftType}>
          <Radio.Button value="Morning">Morning</Radio.Button>
          <Radio.Button value="Afternoon">Afternoon</Radio.Button>
          <Radio.Button value="Evening">Evening</Radio.Button>
        </Radio.Group>
      </div>
      <Calendar
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={dateCellRender}
      />
      <div>
        <h4>Filtered Shifts:</h4>
        {filteredShifts.length > 0 ? (
          filteredShifts.map((shift, index) => (
            <div key={index}>
              <p>Shift ID: {shift.shiftID}</p>
              <p>Date: {date}</p>
              <p>Shift Type: {shift.shiftType}</p>
              <p>Start Time: {shift.startTime}</p>
              <p>End Time: {shift.endTime}</p>
              <p>Status: {shift.status}</p>
              <p>Work Area: {shift.workArea}</p>
            </div>
          ))
        ) : (
          <p>No shifts available for the selected date and shift type</p>
        )}
      </div>
    </>
  );
}

export default AssignStaffForm;

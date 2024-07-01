import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Badge, Button, Calendar, Card, Col, Radio, Row } from "antd";
import moment from "moment";
import "./style.css";
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
    console.log(selectedDate);
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
        `api/scheduling/scheduleMatrix?startDate=${startOfMonth}&endDate=${endOfMonth}`
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
    if (shiftsData[selectedDate]) {
      var filteredShift = [];
      Object.keys(shiftsData[selectedDate]).forEach((shiftType) => {
        const allShifts = shiftsData[selectedDate][shiftType];
        const filtered = allShifts.filter((shift) =>
          shift.staff.some(
            (staffMember) => staffMember.staffID === data[0].staffID
          )
        );
        if (filtered.length > 0) {
          filteredShift.push(filtered);
        }
      });

      setFilteredShifts(filteredShift.flat());
      console.log(filteredShift.flat());
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
        <div className="shiftIcon">
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

  const handleUpdate = (shiftID) => {
    // Implement update logic here
    console.log(`Update shift with ID: ${shiftID}`);
  };

  const handleDelete = (shiftID) => {
    // Implement delete logic here
    console.log(`Delete shift with ID: ${shiftID}`);
    // Example: Remove shift from filteredShifts array
  };

  const handleAddToSchedule = async () => {
    const dateParts = date.split(", "); // Split into ["Thursday", "20-06-2024"]

    // Parse the date parts
    const dateString = dateParts[1]; // "20-06-2024"
    // Parse the date parts
    const parts = dateString.split("-");
    const day = parts[0]; // "24"
    const month = parts[1]; // "06"
    const year = parts[2]; // "2024"

    try {
      // @ts-ignore
      const queryString = new URLSearchParams({
        staffId: data[0].staffID,
        date: `${year}-${month}-${day}`,
        shiftType: shiftType,
      }).toString();

      const response = await api.post(
        `api/scheduling/assignStaffToDay?${queryString}`
      );

      console.log("Staff assigned successfully", response);
      fetchShiftsForMonth(currentMonth);
    } catch (error) {
      console.error("Failed to assign staff", error);
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

      <Calendar
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={dateCellRender}
      />
      <section className="staffForm">
        <div className="filtered">
          {filteredShifts.length > 0 ? (
            filteredShifts.map((shift, index) => (
              <Card
                key={index}
                style={{ marginBottom: "16px", padding: "16px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "5%",
                    paddingBottom: "10%",
                  }}
                >
                  <Button onClick={() => handleUpdate(shift.shiftID)}>
                    Update
                  </Button>
                  <Button danger onClick={() => handleDelete(shift.shiftID)}>
                    Delete
                  </Button>
                </div>
                <p>Shift ID: {shift.shiftID}</p>
                <p>Date: {date}</p>
                <p>Shift Type: {shift.shiftType}</p>
                <p>Start Time: {shift.startTime}</p>
                <p>End Time: {shift.endTime}</p>
                <p>Status: {shift.status}</p>
                <p>Work Area: {shift.workArea}</p>
              </Card>
            ))
          ) : (
            <p>No shifts available for the selected date and shift type</p>
          )}
        </div>
        <div className="formElement">
          <div style={{ marginBottom: 16 }}>
            <Radio.Group onChange={onShiftTypeChange} value={shiftType}>
              <Radio.Button value="Morning">Morning</Radio.Button>
              <Radio.Button value="Afternoon">Afternoon</Radio.Button>
              <Radio.Button value="Evening">Evening</Radio.Button>
            </Radio.Group>
          </div>
          <Button type="primary" onClick={handleAddToSchedule}>
            {" "}
            Add
          </Button>
        </div>
      </section>
    </>
  );
}

export default AssignStaffForm;

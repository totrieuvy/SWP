import React, { useState, useEffect } from "react";
import {
  Table,
  Popover,
  Button,
  Calendar,
  DatePicker,
  Badge,
  Checkbox,
  Tag,
} from "antd";
import { useLocation } from "react-router-dom";
import "./style.css";
import api from "../../../../config/axios";

const { RangePicker } = DatePicker;

function AssignMany() {
  const location = useLocation();
  const [data, setData] = useState(location.state?.data || []);
  const [selectedRange, setSelectedRange] = useState([]);
  const [shiftSelections, setShiftSelections] = useState({});
  const [shiftData, setShiftData] = useState({});

  const shiftTypes = ["Morning", "Afternoon", "Evening"];

  useEffect(() => {
    console.log("Shift Selections:", shiftSelections);
  }, [shiftSelections]);

  const handleCheckboxChange = (staffID, shiftType, checked) => {
    setShiftSelections((prevSelections) => {
      const currentSelections = prevSelections[staffID] || [];
      const newSelections = checked
        ? [...currentSelections, shiftType]
        : currentSelections.filter((type) => type !== shiftType);
      return { ...prevSelections, [staffID]: newSelections };
    });
  };

  const renderPopoverContent = (staffID) => (
    <div>
      {shiftTypes.map((type) => (
        <div key={type}>
          <Checkbox
            checked={(shiftSelections[staffID] || []).includes(type)}
            onChange={(e) =>
              handleCheckboxChange(staffID, type, e.target.checked)
            }
          >
            {type}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  const selectAllShifts = (shiftType) => {
    const allSelected = data.every((employee) =>
      (shiftSelections[employee.staffID] || []).includes(shiftType)
    );

    const newSelections = {};
    data.forEach((employee) => {
      const currentSelections = shiftSelections[employee.staffID] || [];
      newSelections[employee.staffID] = allSelected
        ? currentSelections.filter((type) => type !== shiftType)
        : [...currentSelections, shiftType].filter(
            (type, index, arr) => arr.indexOf(type) === index
          );
    });

    setShiftSelections((prevSelections) => ({
      ...prevSelections,
      ...newSelections,
    }));
  };

  const columns = [
    {
      title: "Staff ID",
      dataIndex: "staffID",
      key: "staffID",
    },
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === 1 ? "green" : "red"}>
          {text === 1 ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
  ];

  const getShiftDataForDate = (date) => {
    let shifts = [];
    data.forEach((employee) => {
      employee.shift.forEach((shift) => {
        const shiftDate = new Date(shift.startTime).toDateString();
        const calendarDate = new Date(date).toDateString();
        if (shiftDate === calendarDate) {
          shifts.push({
            staffID: employee.staffID,
            shiftType: shift.shiftType,
            workArea: shift.workArea,
          });
        }
      });
    });
    return shifts;
  };

  const getBadgeColor = (shiftType) => {
    switch (shiftType) {
      case "Morning":
        return "red";
      case "Afternoon":
        return "orange";
      case "Evening":
        return "blue";
      default:
        return "default";
    }
  };

  const dateCellRender = (date) => {
    const shifts = getShiftDataForDate(date);
    return (
      <ul className="events">
        {shifts.map((shift, index) => (
          <li key={index}>
            <Badge
              color={getBadgeColor(shift.shiftType)}
              text={`${shift.staffID} - ${shift.shiftType} (${shift.workArea})`}
            />
          </li>
        ))}
      </ul>
    );
  };

  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
  };

  const handleSubmit = () => {
    const transformedData = {
      staffShiftPatterns: {},
    };

    data.forEach((employee) => {
      shiftTypes.forEach((type) => {
        if ((shiftSelections[employee.staffID] || []).includes(type)) {
          if (!transformedData.staffShiftPatterns[type]) {
            transformedData.staffShiftPatterns[type] = [];
          }
          transformedData.staffShiftPatterns[type].push(employee.staffID);
        }
      });
    });

    console.log(submitScheduleData(transformedData));
  };

  const submitScheduleData = async (data) => {
    try {
      const formattedStartDate = selectedRange[0]?.format("YYYY-MM-DD");
      const formattedEndDate = selectedRange[1]?.format("YYYY-MM-DD");

      const response = await api.post(
        `api/scheduling/assignStaffByShiftTypePattern?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        data
      );
      setData(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="AssignManyContainer">
      <section className="inputter">
        <RangePicker onChange={handleRangeChange} format="YYYY-MM-DD" />
        <div className="shift-buttons">
          {shiftTypes.map((type) => (
            <Button
              className="toggleButton"
              key={type}
              onClick={() => selectAllShifts(type)}
            >
              All {type}
            </Button>
          ))}
        </div>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Table
          className="tableMany"
          columns={columns}
          dataSource={data}
          rowKey="staffID"
          expandable={{
            expandedRowRender: (record) => (
              <div>
                {shiftTypes.map((type) => (
                  <Checkbox
                    key={type}
                    checked={(shiftSelections[record.staffID] || []).includes(
                      type
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(
                        record.staffID,
                        type,
                        e.target.checked
                      )
                    }
                  >
                    {type}
                  </Checkbox>
                ))}
              </div>
            ),
          }}
        />
      </section>
      <Calendar className="calendarMany" dateCellRender={dateCellRender} />
    </div>
  );
}

export default AssignMany;

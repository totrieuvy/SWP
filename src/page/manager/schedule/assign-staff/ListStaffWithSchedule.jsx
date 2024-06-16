import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import ScheduleStaff from "./ScheduleStaff";
import api from "../../../../config/axios";
import DateSelectorForm from "./DateSelectorForm";
function ListStaffWithSchedule() {
  const [data, setData] = useState([]);
  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("api/staff-accounts");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const combinedData = data.map((staff) => {
    const shifts = [];

    Object.keys(scheduleData).forEach((date) => {
      const daySchedule = scheduleData[date];

      Object.keys(daySchedule).forEach((shiftType) => {
        const shiftDetails = daySchedule[shiftType];

        shiftDetails.forEach((shift) => {
          if (shift.staff.some((s) => s.staffID === staff.staffID)) {
            shifts.push({
              ...shift,
              date: date, // Include the date for reference
              shiftType: shiftType, // Include the shift type for reference
            });
          }
        });
      });
    });

    return { ...staff, shift: shifts };
  });

  const columns = [
    {
      title: "Staff ID",
      dataIndex: "staffID",
      key: "staffID",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Schedule",
      key: "schedule",
      render: (_, record) =>
        record.shift && record.shift.length > 0 ? (
          <ScheduleStaff staff={record} />
        ) : (
          <Button type="primary">Thêm</Button>
        ),
    },
  ];

  return (
    <>
      <DateSelectorForm setScheduleData={setScheduleData} />
      <Table columns={columns} dataSource={combinedData} rowKey="staffID" />
    </>
  );
}

export default ListStaffWithSchedule;

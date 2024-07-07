import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import ScheduleStaff from "./ScheduleStaff";
import api from "../../../../config/axios";
import DateSelectorForm from "./DateSelectorForm";
import { useNavigate } from "react-router-dom";
function ListStaffWithSchedule() {
  const [data, setData] = useState([]);
  const [scheduleData, setScheduleData] = useState({});

  React.useEffect(() => {
    document.title = "Lịch làm việc";
  }, []);

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
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Tên tài khoản",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Lịch",
      key: "schedule",
      render: (_, record) =>
        record.shift && record.shift.length > 0 ? (
          <>
            <Button onClick={() => handleAdd(record)} type="primary">
              Thêm
            </Button>
            <ScheduleStaff handleAdd={() => handleAdd(record)} staff={record} />
          </>
        ) : (
          <Button onClick={() => handleAdd(record)} type="primary">
            Thêm
          </Button>
        ),
    },
  ];

  const navigate = useNavigate();
  const handleAdd = (record) => {
    const serializableRecord = {
      staffID: record.staffID,
      phoneNumber: record.phoneNumber,
      salary: record.salary,
      startDate: record.startDate,
      accountName: record.accountName,
      role: record.role,
      status: record.status,
      email: record.email,
      username: record.username,
      shift: record.shift
        ? record.shift.map((shift) => ({
            date: shift.date,
            shiftType: shift.shiftType,
            startTime: shift.startTime,
            endTime: shift.endTime,
          }))
        : [],
    };
    console.log(serializableRecord);
    navigate("/manager/staff/assign-to", {
      state: {
        data: serializableRecord,
      },
    });
  };

  const handleAssignMany = () => {
    navigate("/manager/staff/assign-to-many", {
      state: {
        data: data,
      },
    });
  };
  return (
    <>
      <DateSelectorForm assignMany={handleAssignMany} setScheduleData={setScheduleData} />
      <Table columns={columns} dataSource={combinedData} rowKey="staffID" />
    </>
  );
}

export default ListStaffWithSchedule;

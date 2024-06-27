import React, { useState } from "react";
import { DatePicker, Button, Form } from "antd";
import moment from "moment";
import api from "../../../../config/axios";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

function DateSelectorForm({ setScheduleData, assignMany }) {
  const [dates, setDates] = useState({ startDate: null, endDate: null });

  const onDateChange = (dates) => {
    if (dates) {
      setDates({
        startDate: dates[0].format("YYYY-MM-DD"),
        endDate: dates[1].format("YYYY-MM-DD"),
      });
    } else {
      setDates({ startDate: null, endDate: null });
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await api.get("api/scheduling/scheduleMatrix", {
        params: {
          startDate: dates.startDate,
          endDate: dates.endDate,
        },
      });
      console.log(response.data);
      setScheduleData(response.data);
      // Process response data as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Form layout="inline">
        <Form.Item>
          <RangePicker format="YYYY-MM-DD" onChange={onDateChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleFetchData}>
            Tìm kiếm
          </Button>
          <Button onClick={assignMany}>Sắp xếp</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DateSelectorForm;

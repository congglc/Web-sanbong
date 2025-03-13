import React, { useState, memo, useEffect } from "react";
import "./style.scss";
import { FaPhone } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ROUTERS } from "utils/router";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { MdOutlineDisabledByDefault } from "react-icons/md"; // Import icon

const Payment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [price, setPrice] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Mock database for fields (replace with actual database fetch)
  useEffect(() => {
    const fetchFields = async () => {
      const mockFields = [
        { id: 1, name: "Sân 1" },
        { id: 2, name: "Sân 2" },
        { id: 3, name: "Sân 3" },
      ];
      setFields(mockFields);
      setSelectedField(mockFields[0].id);
    };

    fetchFields();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFieldChange = (event) => {
    setSelectedField(parseInt(event.target.value));
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  useEffect(() => {
    let basePrice = 300000;
    if (selectedTime) {
      if (selectedTime === "17h-18h30" || selectedTime === "18h30-20h") {
        basePrice = 500000;
      }
    }

    if (selectedDate) {
      const dayOfWeek = selectedDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        basePrice += 100000;
      }
    }
    setPrice(basePrice);
  }, [selectedTime, selectedDate]);

  const timeSlots = [
    "8h-9h30",
    "9h30-11h",
    "14h-15h30",
    "15h30-17h",
    "17h-18h30",
    "18h30-20h",
    "20h-21h30",
    "21h30-23h",
  ];

  const handleCheckboxChange = (event) => {
    setConfirmed(event.target.checked);
  };
  

  const handleExitClick = () => {
    navigate(-1); // Quay lại trang trước
  };

  return (
    <div className="field-booking-form-container">
      <div className="field-booking-form">
        <button className="exit-button" onClick={handleExitClick}>
          <MdOutlineDisabledByDefault />
        </button>
        <h2>Đơn Đặt Sân</h2>

        <div className="form-group">
          <label htmlFor="teamName">Tên đội</label>
          <input type="text" id="teamName" placeholder="name" />
        </div>

        <div className="form-group">
          <label htmlFor="teamLeaderName">Tên đội trưởng</label>
          <input type="text" id="teamLeaderName" placeholder="name" />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Liên Hệ</label>
          <div className="contact-input">
            <FaPhone className="phone-icon" />
            <input type="tel" id="contact" placeholder="123-456-7890" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="date">Chọn ngày</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày"
          />
        </div>

        <div className="form-group">
          <label htmlFor="field">Chọn sân</label>
          <select
            id="field"
            value={selectedField || ""}
            onChange={handleFieldChange}
          >
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="time">Chọn khung giờ</label>
          <select
            id="time"
            value={selectedTime || ""}
            onChange={(e) => handleTimeChange(e.target.value)}
          >
            <option value="">Chọn khung giờ</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Thành tiền</label>
          <input
            type="text"
            id="price"
            value={`${price.toLocaleString()} đ`}
            readOnly
          />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="confirm"
              checked={confirmed}
              onChange={handleCheckboxChange}
            />
            Xác nhận đúng thông tin
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Thông tin khác</label>
          <textarea id="notes" placeholder="Add notes"></textarea>
        </div>

        <div className="form-actions">
          <Link to={ROUTERS.USER.HOME}>
            <button className="cancel-button">Quay lại</button>
          </Link>
          <Link to={ROUTERS.USER.HOME}>
            <button button className="book-button" disabled={!confirmed}>
              Đặt sân
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Payment);
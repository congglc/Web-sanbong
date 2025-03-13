"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import AdminSidebar from "../components/Sidebar"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa"

const Button = ({ children, variant = "primary", type = "button", onClick, disabled = false }) => {
  return (
    <button
      type={type}
      className={`admin-button ${variant} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const FieldStatus = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [fields, setFields] = useState([])
  const [editingSlot, setEditingSlot] = useState(null)

  // Mô phỏng dữ liệu sân bóng và khung giờ
  useEffect(() => {
    // Trong thực tế, dữ liệu này sẽ được lấy từ API
    const mockFields = [
      {
        id: 1,
        name: "Sân số 1",
        type: "5v5",
        timeSlots: [
          { id: 1, time: "8h-9h30", status: "available", price: 300000 },
          { id: 2, time: "9h30-11h", status: "booked", price: 300000, bookedBy: "Đội FC Hà Nội" },
          { id: 3, time: "14h-15h30", status: "available", price: 300000 },
          { id: 4, time: "15h30-17h", status: "booked", price: 300000, bookedBy: "Đội FC Thăng Long" },
          { id: 5, time: "17h-18h30", status: "available", price: 500000 },
          { id: 6, time: "18h30-20h", status: "booked", price: 500000, bookedBy: "Đội FC Hà Đông" },
          { id: 7, time: "20h-21h30", status: "available", price: 300000 },
        ],
      },
      {
        id: 2,
        name: "Sân số 2",
        type: "7v7",
        timeSlots: [
          { id: 8, time: "8h-9h30", status: "available", price: 400000 },
          { id: 9, time: "9h30-11h", status: "available", price: 400000 },
          { id: 10, time: "14h-15h30", status: "booked", price: 400000, bookedBy: "Đội FC Cầu Giấy" },
          { id: 11, time: "15h30-17h", status: "available", price: 400000 },
          { id: 12, time: "17h-18h30", status: "booked", price: 600000, bookedBy: "Đội FC Thanh Xuân" },
          { id: 13, time: "18h30-20h", status: "booked", price: 600000, bookedBy: "Đội FC Đống Đa" },
          { id: 14, time: "20h-21h30", status: "available", price: 400000 },
        ],
      },
      {
        id: 3,
        name: "Sân số 3",
        type: "5v5",
        timeSlots: [
          { id: 15, time: "8h-9h30", status: "maintenance", price: 300000, note: "Bảo trì sân" },
          { id: 16, time: "9h30-11h", status: "maintenance", price: 300000, note: "Bảo trì sân" },
          { id: 17, time: "14h-15h30", status: "available", price: 300000 },
          { id: 18, time: "15h30-17h", status: "available", price: 300000 },
          { id: 19, time: "17h-18h30", status: "available", price: 500000 },
          { id: 20, time: "18h30-20h", status: "available", price: 500000 },
          { id: 21, time: "20h-21h30", status: "available", price: 300000 },
        ],
      },
    ]

    setFields(mockFields)
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date)
    // Trong thực tế, sẽ gọi API để lấy dữ liệu sân bóng theo ngày
  }

  const handleEditSlot = (fieldId, slotId) => {
    const field = fields.find((f) => f.id === fieldId)
    const slot = field.timeSlots.find((s) => s.id === slotId)
    setEditingSlot({ ...slot, fieldId })
  }

  const handleUpdateSlot = () => {
    if (!editingSlot) return

    setFields(
      fields.map((field) => {
        if (field.id === editingSlot.fieldId) {
          return {
            ...field,
            timeSlots: field.timeSlots.map((slot) => (slot.id === editingSlot.id ? { ...slot, ...editingSlot } : slot)),
          }
        }
        return field
      }),
    )

    setEditingSlot(null)
  }

  const handleCancelEdit = () => {
    setEditingSlot(null)
  }

  const handleChangeSlotStatus = (fieldId, slotId, newStatus) => {
    setFields(
      fields.map((field) => {
        if (field.id === fieldId) {
          return {
            ...field,
            timeSlots: field.timeSlots.map((slot) => (slot.id === slotId ? { ...slot, status: newStatus } : slot)),
          }
        }
        return field
      }),
    )
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "available":
        return "status-available"
      case "booked":
        return "status-booked"
      case "maintenance":
        return "status-maintenance"
      default:
        return ""
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Quản lý trạng thái sân bóng</h1>
          <div className="date-picker-container">
            <label>Chọn ngày: </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="date-picker"
            />
          </div>
        </div>

        <div className="field-status-container">
          {fields.map((field) => (
            <div key={field.id} className="field-card">
              <div className="field-header">
                <h2>{field.name}</h2>
                <span className="field-type">Loại: {field.type}</span>
              </div>

              <div className="time-slots">
                <table className="time-slot-table">
                  <thead>
                    <tr>
                      <th>Khung giờ</th>
                      <th>Trạng thái</th>
                      <th>Giá</th>
                      <th>Thông tin</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {field.timeSlots.map((slot) => (
                      <tr key={slot.id}>
                        <td>{slot.time}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(slot.status)}`}>
                            {slot.status === "available" && "Còn trống"}
                            {slot.status === "booked" && "Đã đặt"}
                            {slot.status === "maintenance" && "Bảo trì"}
                          </span>
                        </td>
                        <td>{formatPrice(slot.price)}</td>
                        <td>
                          {slot.status === "booked" && slot.bookedBy}
                          {slot.status === "maintenance" && slot.note}
                        </td>
                        <td className="action-buttons">
                          <button className="edit-button" onClick={() => handleEditSlot(field.id, slot.id)}>
                            <FaEdit />
                          </button>
                          {slot.status !== "available" && (
                            <button
                              className="available-button"
                              onClick={() => handleChangeSlotStatus(field.id, slot.id, "available")}
                              title="Đánh dấu là còn trống"
                            >
                              <FaCheck />
                            </button>
                          )}
                          {slot.status !== "maintenance" && (
                            <button
                              className="maintenance-button"
                              onClick={() => handleChangeSlotStatus(field.id, slot.id, "maintenance")}
                              title="Đánh dấu là bảo trì"
                            >
                              <FaTimes />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {editingSlot && (
          <div className="edit-slot-modal">
            <div className="modal-content">
              <h3>Chỉnh sửa khung giờ</h3>

              <div className="form-group">
                <label>Khung giờ</label>
                <input type="text" value={editingSlot.time} readOnly />
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
                <select
                  value={editingSlot.status}
                  onChange={(e) => setEditingSlot({ ...editingSlot, status: e.target.value })}
                >
                  <option value="available">Còn trống</option>
                  <option value="booked">Đã đặt</option>
                  <option value="maintenance">Bảo trì</option>
                </select>
              </div>

              <div className="form-group">
                <label>Giá</label>
                <input
                  type="number"
                  value={editingSlot.price}
                  onChange={(e) => setEditingSlot({ ...editingSlot, price: Number.parseInt(e.target.value) })}
                />
              </div>

              {editingSlot.status === "booked" && (
                <div className="form-group">
                  <label>Đội đặt sân</label>
                  <input
                    type="text"
                    value={editingSlot.bookedBy || ""}
                    onChange={(e) => setEditingSlot({ ...editingSlot, bookedBy: e.target.value })}
                  />
                </div>
              )}

              {editingSlot.status === "maintenance" && (
                <div className="form-group">
                  <label>Ghi chú</label>
                  <input
                    type="text"
                    value={editingSlot.note || ""}
                    onChange={(e) => setEditingSlot({ ...editingSlot, note: e.target.value })}
                  />
                </div>
              )}

              <div className="modal-actions">
                <Button variant="secondary" onClick={handleCancelEdit}>
                  Hủy
                </Button>
                <Button variant="primary" onClick={handleUpdateSlot}>
                  Cập nhật
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(FieldStatus)


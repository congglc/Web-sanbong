"use client"

import { memo, useState } from "react"
import "./Sidebar.scss"
import { Link, useLocation } from "react-router-dom"
import { ROUTERS } from "utils/router"
// Thêm import cho icon thống kê
import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaFutbol,
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
  FaChartLine,
} from "react-icons/fa"

const AdminSidebar = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  // Thêm mục thống kê vào menu
  const menuItems = [
    {
      name: "Dashboard",
      path: ROUTERS.ADMIN.DASHBOARD,
      icon: <FaHome />,
    },
    {
      name: "Thêm sân bóng",
      path: ROUTERS.ADMIN.ADD_FIELD,
      icon: <FaFutbol />,
    },
    {
      name: "Trạng thái sân",
      path: ROUTERS.ADMIN.FIELD_STATUS,
      icon: <FaCalendarAlt />,
    },
    {
      name: "Đơn đăng ký CLB",
      path: ROUTERS.ADMIN.CLUB_APPLICATIONS,
      icon: <FaUsers />,
    },
    {
      name: "Đơn đặt sân",
      path: ROUTERS.ADMIN.ORDER,
      icon: <FaClipboardList />,
    },
    
  ]

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const handleLogout = () => {
    // Xử lý đăng xuất
    localStorage.removeItem("isAdmin")
    window.location.href = ROUTERS.ADMIN.LOGIN
  }

  return (
    <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">LC</div>
        <h2 className="sidebar-title">Sân bóng LC</h2>
        <button className="collapse-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={location.pathname === item.path ? "active" : ""}>
              <Link to={item.path}>
                <span className="icon">{item.icon}</span>
                <span className="text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <span className="icon">
            <FaSignOutAlt />
          </span>
          <span className="text">Đăng xuất</span>
        </button>
      </div>
    </div>
  )
}

export default memo(AdminSidebar)


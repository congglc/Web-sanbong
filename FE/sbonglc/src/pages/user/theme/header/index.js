import { memo, useState, useEffect, useRef } from "react";
import "./style.scss";
import { ROUTERS } from "utils/router";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../assets/user/chung/logo.png";

const Header = () => {
  const location = useLocation();
  const [menu] = useState([
    { name: "Trang Chủ", path: ROUTERS.USER.HOME },
    { name: "Đặt Sân", path: ROUTERS.USER.ORDER },
    { name: "Câu Lạc Bộ", path: ROUTERS.USER.CLUB },
    { name: "Liên Hệ", path: ROUTERS.USER.CONTACT },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Mở menu">
        ☰
      </button>
      <header className={`header ${isOpen ? 'open' : ''}`} ref={headerRef}>
        <div className="container">
          <div className="row">
            <div className="header_logo">
              <img src={logo} alt="logo" />
            </div>
            <nav className="header_menu">
              <ul>
                {menu?.map((menuItem, menuKey) => {
                  return (
                    <li
                      key={menuKey}
                      className={location.pathname === menuItem.path ? "active" : ""} // So sánh chính xác đường dẫn
                    >
                      <Link to={menuItem?.path}>{menuItem?.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="header_login">
              <ul>
                <li>
                  <Link to={ROUTERS.USER.SIGNIN}>Đăng nhập</Link>
                </li>
                <li>
                  <Link to={ROUTERS.USER.SIGNUP}>Đăng kí</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default memo(Header);
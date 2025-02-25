import { memo, useState } from "react";
import "./style.scss"
import { Router } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { Link } from "react-router-dom";

 
const  Header = () => {
    const [menu, setMenus] = useState([
        {
            name: "Trang Chủ",
            path: ROUTERS.USER.HOME,
        },
        {
            name: "Đặt Sân",
            path: ROUTERS.USER.ORDER,
        },
        {
            name: "Câu Lạc Bộ",
            path: ROUTERS.USER.CLUB,
        },
        {
            name: "Liên Hệ",
            path: ROUTERS.USER.CONTACT,
        },
    ])
    return  (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-xl-2">
                        <div className="header_logo">
                            <h1>LC</h1>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <nav className="header_menu">
                            <ul>
                                {menu?.map((menu, menuKey) =>(
                                    <li key= {menuKey} className= {menuKey == 0 ? "active" : ""}>
                                        <Link to={menu?.path}>{menu?.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="col-xl-4">
                        <div className="header_login">
                            <ul>
                                <li>Đăng nhập</li>
                                <li>Đăng kí</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default memo(Header);
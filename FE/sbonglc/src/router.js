import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/homepages"
import MasterLayout from "./pages/user/theme/masterLayout";
import Order from "./pages/user/order";
import Club from "./pages/user/club";
import Contact from "./pages/user/contact"
const renderUserRouter = () => {
    const UserRouters= [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage/>
        },
        {
            path: ROUTERS.USER.ORDER,
            component: <Order/>
        },
        {
            path: ROUTERS.USER.CLUB,
            component: <Club/>
        },
        {
            path: ROUTERS.USER.CONTACT,
            component: <Contact/>
        },

    ]
    return (
        <MasterLayout>
            <Routes>
                {
                    UserRouters.map((item, key)=>(
                        <Route key={key} path={item.path} element={item.component}/>
                    ))
                }
            </Routes>
        </MasterLayout>
    )
}

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;
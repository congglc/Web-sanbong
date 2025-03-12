import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/homepages"
import MasterLayout from "./pages/user/theme/masterLayout";
import Order from "./pages/user/order";
import Club from "./pages/user/club";
import Contact from "./pages/user/contact"
import Signup from "pages/user/form/signup";
import Signin from "pages/user/form/signin";
import Payment from "pages/user/form/payment";
import Profile from "pages/user/form/profile";
import Info from "pages/user/form/information";
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
        {
            path: ROUTERS.USER.SIGNUP,
            component: <Signup/>
        },
        {
            path: ROUTERS.USER.SIGNIN,
            component: <Signin/>
        },
        {
            path: ROUTERS.USER.PAYMENT,
            component: <Payment/>
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <Profile/>
        },
        {
            path: ROUTERS.USER.INFO,
            component: <Info/>
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
import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/homepages"
import MasterLayout from "./pages/user/homepages/theme/masterLayout";
import ProFile from "./pages/user/profile";
const renderUserRouter = () => {
    const UserRouters= [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage/>
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <ProFile/>
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
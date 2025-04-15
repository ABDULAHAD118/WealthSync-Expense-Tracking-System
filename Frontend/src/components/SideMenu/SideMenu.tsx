import { useContext } from 'react';
import { DashboardLayoutProps, SideMenuDataType } from '../../Types';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';

const SideMenu = (props: DashboardLayoutProps) => {
    const { activeMenu } = props;
    const { user, clearUser } = useContext<any>(UserContext);
    const navigate = useNavigate();
    const handleClick = (route: string) => {
        if (route === 'logout') {
            handleLogout();
            return;
        }
        navigate(route);
    };
    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    };
    return (
        <div className="sticky top-[61px] z-20 h-[calc(100vh-61px)] w-64 border-r border-gray-200/50 bg-white p-5">
            <div className="mt-3 mb-3 flex flex-col items-center justify-center gap-3">
                {user?.profileImageUrl && (
                    <img
                        src={user?.profileImageUrl}
                        alt="Profile Image"
                        className="h-20 w-20 rounded-full bg-slate-400"
                    />
                )}
                <h5 className="leading-6 font-medium text-gray-950">
                    {user?.fullName}
                </h5>
            </div>
            {SIDE_MENU_DATA.map((item: SideMenuDataType, index) => {
                return (
                    <button
                        key={`menu_${index}`}
                        className={`item-center flex w-full gap-4 text-[15px] ${activeMenu == item.name && 'bg-primary text-white'} mb-3 rounded-lg px-6 py-3`}
                        onClick={() => handleClick(item.path)}
                    >
                        {item.icon && typeof item.icon === 'function' && (
                            <item.icon className="text-xl" />
                        )}
                        {item.name}
                    </button>
                );
            })}
        </div>
    );
};

export default SideMenu;

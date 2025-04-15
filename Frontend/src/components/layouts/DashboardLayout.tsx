import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Navbar from '../Navbar/Navbar';
import { DashboardLayoutProps } from '../../Types';
import SideMenu from '../SideMenu/SideMenu';

const DashboardLayout = (props: DashboardLayoutProps) => {
    const { activeMenu, children } = props;
    const { user } = useContext<any>(UserContext);
    return (
        <div className="">
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="max-[1000px]:hidden">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className="mx-5 grow">{children}</div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;

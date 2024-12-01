import React, { useContext, useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import axios from 'axios';
import { AuthContext } from '../../context/authContext';


const DropDownMenu = () => {
    const { logout } = useContext(AuthContext)
    const [openMenu, setOpenMenu] = useState(false)
    const handleMouseIn = () => {
        setOpenMenu(true)
    }
    const handleMouseLeave = (e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
            setOpenMenu(false);
        }
    };


    const handleLogout = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/users/log-out", {
                withCredentials: true,
            })
        
            logout();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='relative' onMouseEnter={handleMouseIn} onMouseLeave={handleMouseLeave}   >
            <div className="flex items-center gap-1 cursor-pointer border-2 border-gray-300 rounded-lg p-2 px-3 shadow-sm hover:shadow-md transition duration-300"  >
                <button className="font-medium text-gray-700" >Menu</button>
                <FaAngleDown className="text-gray-500" />
            </div>
            {openMenu && <div className="w-[220px] h-[220px] absolute top-15 right-0 z-50 bg-white rounded-lg shadow-lg py-6">
                <button className="w-full text-left text-sm font-medium text-gray-700 hover:text-white hover:bg-amber-500 px-4 py-2 transition duration-300"  >Orders</button>

                <button className="w-full text-left text-sm font-medium text-gray-700 hover:text-white hover:bg-amber-500 px-4 py-2 transition duration-300" onClick={handleLogout}  >Logout</button>

            </div>}

        </div>
    )
}

export default DropDownMenu
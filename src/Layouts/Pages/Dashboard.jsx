import { useContext } from "react";



import { Link } from "react-router-dom";
import { FaBook, FaImage, FaProductHunt } from "react-icons/fa";
import { AuthContext } from "../Pages/../../Router/AuthProvider";


const Dashboard = () => {
    const { user } = useContext(AuthContext);
    
  
    return (
        <div>
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col p-10">
                    <label htmlFor="my-drawer-2" className="drawer-button lg:hidden absolute right-0 top-0">open side bar</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}

                        <div className="p-4">
                            <div className="text-center">
                                <img className="w-20 h-20 rounded-full mx-auto mb-2" src={user.photoURL} alt="Profile" />
                                
                                        <h4 className="text-lg font-bold pb-2">
                                            {user.displayName}  
                                        </h4>
                                        <p className="text-gray-600 ">{user.email}</p>
                            </div>
                        </div>
                        <hr className='border-2 border-purple-600 mb-5' />

                        <li> <Link to="/dashboard/createtask"><FaBook></FaBook>Create Task</Link> </li>
                            <li className="my-3"> <Link to="/dashboard/alltask"><FaProductHunt></FaProductHunt>All Task</Link> </li>
                            <li> <Link to="/dashboard/myProfile"><FaImage></FaImage> My Profile</Link> </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
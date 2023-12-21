import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Router/AuthProvider";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";


const AllTask = () => {
    const { user } = useContext(AuthContext);
    const [allTask, setAllTask] = useState('')
    console.log(allTask)
    
useEffect(() => {
        const url = `http://localhost:5000/usertasks?email=${user?.email}` ;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllTask(data)
            })
    }, []);

    const handleDeleteItem = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/usertasks/${id}`,{
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                   if(data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                      const remaining = allTask.filter((item) => item._id !== id);
                      setAllTask(remaining)
                   }
                })
        
           
            }
          });
           };



    return (
        <div>
            <h1 className="text-center my-12 uppercase font-bold text-3xl lg:5xl">All Task {allTask?.length}</h1>
            <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                Serial No
              </th>
              <th>Title</th>
              <th>Deadlines</th>
              <th>Priority</th>
              <th>Creator's email</th>
              <th>Creator's Name</th>
              <th>Details</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* row  */}
           {
           allTask.length && allTask.map((item, index) => (
                <tr key={item._id}>
                <th>
                 {index + 1}
                </th>
                <td>
                  {item.title}
                </td>
                <td>
                  {item.date}
               
                </td>
                <td>
                    {item.priority}
                </td>
                <td>
                    {item.email}
                </td>
                <td>
                    {item.name}
                  
                </td>
               <td>


               </td>
               
                <td>
                <NavLink to={`update/${item._id}`}><button className="btn  btn-warning"><GiNotebook className="w-8 h-8 "/></button> </NavLink>
                </td>
                <td>
                <button onClick={() => handleDeleteItem(item?._id)} className="btn btn-outline btn-success"><MdDelete className="w-8 h-8 "/></button>
                </td>
                <td>
                    {item.price}
                </td>
              </tr>
            ))
           }
         
          </tbody>
         
        </table>
      </div>

        </div>
    );
};

export default AllTask;
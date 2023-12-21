import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../Components/hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Router/AuthProvider";


const CreateTask = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
     

          const bookItem = {
            address: data.address,
            date: data.date,
    
            email: data.email,
       
            name: data.name,
            phnno: data.phnno,
            price: data.price,
            receivername: data.receivername,
            receiverphnno: data.receivername,
            type: data.type,
         
          }
        
          axiosPublic.post('/books', bookItem)
         .then(res => {
            if(res.data.insertedId){
              reset();
                Swal.fire({
                           position: "top-end",
                           icon: "success",
                           title: "Your pacel is booked",
                           showConfirmButton: false,
                          timer: 1500
                       });
            }
         })
       
      };
    return (
        <div className="mb-20">
            <h1 className="text-center my-12 text-xl uppercase lg:font-bold md:font-semibold md:text-3xl lg:5xl">Create A task</h1>
            <div data-aos="zoom-in-up" data-aos-duration="2500" className='mt-12 bg-lime-200 shadow-lg rounded-lg p-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">
               User email
              </span>
            </label>
            <input type="email" defaultValue={user?.email} readOnly placeholder="User email"{...register("email", { required: true})}
            className="input input-bordered input-warning w-full" />
          </div>
         <div className="flex w-full gap-4 my-6">
         <div className="flex-1">
         <label className="label">
              <span className="label-text">
               User Name
              </span>
            </label>
            <input type="text" defaultValue={user?.displayName} readOnly placeholder="User Name"{...register("name", { required: true})}
            className="input input-bordered input-warning w-full" />
         </div>
          <div className="form-control w-full flex-1">
            <label className="label">
              <span className="label-text">
               Title
              </span>
            </label>
            <input type="text" placeholder="Title of the Task"{...register("title", { required: true})}
            className="input input-bordered input-warning w-full" />
          </div>
         </div>
         
         <div className="flex-1">
         <label className="label">
              <span className="label-text">
               Deadline
              </span>
            </label>
            <input type="date" {...register("date", { required: true})}
            className="input input-bordered input-warning w-full" />
         </div>
         <div className="flex-1">
        <label className="label">
            <span className="label-text">
            Priority
            </span>
        </label>
        <select {...register("priority", { required: true })} className="select select-bordered select-warning w-full">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
        </div>
        
       
         <button className="btn bg-gray-200 btn-outline border-orange-500 border-0 border-b-4 mt-4">Book Now</button>
        </form>
      </div>
        </div>
    );
};

export default CreateTask;
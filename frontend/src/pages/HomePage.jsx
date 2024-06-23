// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";
import axios from "axios";
import { MdLogout } from "react-icons/md";
import {useAuthStore} from '../zustand/authSlice'
import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import {getTransactionByCategory } from "../api";

// ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
	const { authUser } = useAuthStore();

	
	const { data: categoryData } = useQuery({
		queryKey: ["categoryStatistics"],
		queryFn: getTransactionByCategory,
	});
	//console.log("cat",categoryData)
	

	const {logout} = useAuthStore();
	const navigate = useNavigate();
	

	const handleLogout = async() => {
		//console.log("Logging out...");
		try {
			await axios.get("/api/users/logout");
			logout();
			navigate('/login');
			//setAuthUser(null);
		} catch (error) {
			console.log(error);
		}
	};

	const loading = false;

	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center'>
					<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
						Taskwisely, track wisely
					</p>
					<img
						src={authUser?.user.profilePic}
						className='w-11 h-11 rounded-full border cursor-pointer'
						alt='Avatar'
					/>
					{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>
					
					


					<TransactionForm />
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;
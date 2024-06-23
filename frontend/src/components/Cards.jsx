import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../api";
const Cards = () => {
	const {  data,isLoading } = useQuery(
		{
			queryKey: ["transactions"],
			queryFn: fetchTransactions,
		}
	);
//	console.log("testing",data);

	
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{
					isLoading ? <p>Loading...</p> : data?.data.transactions.map((transaction,index) => (
						<Card key={index} transaction={transaction} />
					))
				}
			</div>
		</div>
	);
};
export default Cards;
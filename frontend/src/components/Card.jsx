import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
//import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const categoryColorMap = {
  work: "from-green-700 to-green-400",
  personal: "from-pink-800 to-pink-600",
  shared: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

const Card = ({ transaction }) => {
  let { category, title, location, date, description, user } =
    transaction;
  const cardClass = categoryColorMap[category];
  // Capitalize the first letter of the description
  description = description[0]?.toUpperCase() + description.slice(1);
  category = category[0]?.toUpperCase() + category.slice(1);
 
 // console.log("cardType", category);
  const handleDelete = async () => {
    try {
      const resp = await axios.delete(
        `/api/transactions/delete/${transaction._id}`
      );
    //  console.log(resp);
    
      window.location.reload();
      toast.success("Transaction Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting transaction");
    }
  };

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <div className="flex items-center gap-2">
            <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: {description}
        </p>
        
        <p className="text-white flex items-center gap-1">
          <MdCategory />
          Category: {category}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {location}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">
            {date.substring(0, 10)}
          </p>
          <img
            src={user.profilePic}
            className="h-8 w-8 border rounded-full"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};
export default Card;

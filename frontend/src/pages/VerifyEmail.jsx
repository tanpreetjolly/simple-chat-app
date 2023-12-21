import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Make sure to import useParams if you're using React Router
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const { id, token } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/${id}/verify/${token}`
        );

        toast.success(response.data.message);
        // console.log("Verification successful:", response.data);
      } catch (error) {
        // Handle errors
        toast.error(error.response.data.message);
        // console.error("Verification failed:", error);
      }
    };

    fetchData();
  }, [id, token]); // The empty dependency array ensures that this effect runs once when the component mounts

  return <div>Email Verified</div>;
};

export default VerifyEmail;

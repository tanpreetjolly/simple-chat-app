import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // Make sure to import useParams if you're using React Router
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/user/${id}/verify/${token}`
        );

        toast.success(response.data.message);
        // console.log("Verification successful:", response.data);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);
  return (
    <>
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <div>
          Verification successful
          <Link to={"/"}>Homepage</Link>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;

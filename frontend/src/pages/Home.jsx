import { useEffect } from "react";
import Hero from "../components/Hero";
import { useAuth } from "../context/authContext";


const Home = () => {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  return (
    <div className="outline outline-red-500">
      <Hero />
      {isAuthenticated && <h1>Authenticated</h1>}
    </div>
  );
};

export default Home;

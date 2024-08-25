import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to /signin when the component mounts
    navigate("/Signin");
  }, [navigate]);

  return null; // Or a loading spinner, or any other content
}

export default Home;

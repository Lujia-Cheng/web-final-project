import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Redirecting to the homepage in 5 seconds...</p>
    </div>
  );
}

export default NotFound;

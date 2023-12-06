import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          navigate(-1); // Navigate to the previous page
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Oops! We haven't implement this page, yet...</p>
      <p>Don't worry, we'll take you back to the previous page in {countdown} seconds...</p>
    </div>
  );
}

export default NotFound;

import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  /**
   * Automatically navigate back to the previous page after 5 seconds
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          navigate("/");
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Oops! How you get here? Drop an <a href={process.env.REACT_APP_GITHUB_URL}>issue</a> on github</p>
      <p>Don't worry, we'll take you back to home page in {countdown} seconds...</p>
    </div>
  );
}

export default NotFound;

import React from 'react';
import SearchBar from "../components/SearchBar";

function Home() {
  const getAllProducts = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_API}/products`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Failed to fetch products from server');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  return (
    <div>
      <h1>Home Page</h1>
      {/* todo get all items & display random */}
    </div>
  );
}

export default Home;

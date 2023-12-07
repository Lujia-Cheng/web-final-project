import React, {useState, useEffect} from 'react';

function CartComponent() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // Function to fetch cart from the server
    const fetchCartFromServer = async (userId) => {
      try {
        const response = await fetch(`${process.env.BACKEND_API}/cart?buyer_id=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setCart(data);
          localStorage.setItem('cart', JSON.stringify(data)); // Update local storage
        } else {
          console.error('Failed to fetch cart from server');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Attempt to fetch cart from local storage
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      } else {
        fetchCartFromServer(userId); // Fetch from server if not found in local storage
      }
    } else {
      console.log('User ID not found');
      // Handle the scenario where the user ID is not available
    }
  }, []);

  if (!cart) {
    return <div>Loading cart...</div>;
  }

  return (
    <div>
      {/* todo render items in cart with Product.js */}
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  );
}

export default CartComponent;

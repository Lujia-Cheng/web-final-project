import {useEffect, useState} from 'react';

function useProducts(shouldShuffle = false, count = null) {
  const [products, setProducts] = useState([]);

  const shuffleArray = array => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }


  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/products`);
        if (response.ok) {
          let data = await response.json();
          if (shouldShuffle) {
            data = shuffleArray(data);
          }
          setProducts(count ? data.slice(0, count) : data);
        } else {
          console.error('Failed to fetch products from server');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAllProducts().then(() => console.log('Products fetched'));
  }, [shouldShuffle, count]);

  return products;
}

export default useProducts;

// Core
import { useState, useEffect } from 'react';

export const Spinner = () => {

  const [ isLoading, setLoading ] = useState(true);

  useEffect( () => {
    if (isLoading) {
      setLoading(false);
    }
  }, []);

  return isLoading ? <div>Loading ...</div> : '';    
}

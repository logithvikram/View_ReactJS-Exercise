import { useState, useEffect } from 'react';
import userService from '../services/userService';

const useUserDetailViewModel = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    userService.getUserById(userId)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [userId]);

  return { user, loading, error };
};

export default useUserDetailViewModel;

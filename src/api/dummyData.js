import axios from 'axios';

export const fetchUserStats = async () => {
  try {
    const res = await axios.get('https://dummyjson.com/users');
    return res.data.users;
  } catch (err) {
    console.error('Error fetching users', err);
    return [];
  }
};

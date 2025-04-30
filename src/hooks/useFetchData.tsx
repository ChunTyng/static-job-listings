import { useState, useEffect } from 'react';
import axios from 'axios';

// type
import { fetchDataProps } from '../types/fetchDataProps';
import { statusProps } from '../types/statusProps';

const useFetchData = () => {
  const [data, setData] = useState<fetchDataProps[]>([]);
  const [status, setStatus] = useState<statusProps>({
    loading: true,
    error: null,
  });

  // local
  // const API_URL = 'http://localhost:3500/';
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const stored = sessionStorage.getItem('job-listings');
  //       if (stored) {
  //         setData(JSON.parse(stored));
  //       } else {
  //         const ids = Array.from({ length: 10 }, (_, i) => i);
  //         const responses = await Promise.all(
  //           ids.map((id) => axios.get(`${API_URL}${id}`)),
  //         );
  //         const combinedData = responses.map((res) => res.data);
  //         sessionStorage.setItem('job-listings', JSON.stringify(combinedData));
  //         setData(JSON.parse(sessionStorage.getItem('job-listings') || '[]'));
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setStatus((prev) => ({ ...prev, error: 'something went wrong' }));
  //       throw error;
  //     } finally {
  //       setStatus((prev) => ({ ...prev, loading: false }));
  //     }
  //   };
  //   fetchData();
  // }, []);
  // return { data, status };

  // deploy
  const API_URL = 'https://static-job-listings-json-server.onrender.com/data/';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stored = sessionStorage.getItem('job-listings');
        if (stored) {
          setData(JSON.parse(stored));
        } else {
          const response = await axios.get(API_URL);
          const updatedData = response.data.map((item: fetchDataProps) => {
            if (item.logo && !item.logo.startsWith('http')) {
              item.logo = `${API_URL}${item.logo.replace('./', '')}`;
            }
            return item;
          });
          setData(updatedData);
          sessionStorage.setItem('job-listings', JSON.stringify(updatedData));
        }
      } catch (error) {
        console.log(error);
        setStatus((prev) => ({ ...prev, error: 'Something went wrong' }));
      } finally {
        setStatus((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, []);
  return { data, status };
};
export default useFetchData;

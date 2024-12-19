import { useState, useEffect } from "react";
import {Alert} from 'react-native';

const useAppwrite = (fn) =>{
    const [data, setData] = useState([]);
  const [isLoading, setILoading] = useState(false);

  const fetchData= async () =>{
      setILoading(true);
      try {
          const response = await fn();
          setData(response)
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }
    
    useEffect(()=>{
        fetchData()
    }, []);

    const refetch = () => fetchData();

    return{ data, isLoading, refetch }

}

export default useAppwrite;
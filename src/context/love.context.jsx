import { createContext,useContext,useState } from "react";
import axios from "axios";
const LoveContext = createContext();

export const useLove = () => {
    return useContext(LoveContext);
    };

 const LoveProvider = ({ children }) => {
    const [loveData, setLoveData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchLoveData = async (id) => {
        try {
            const response = await axios.get(`https://valentine-backend-l9x8.onrender.com/get-love/${id}`);
            setLoveData(response.data.data);
            console.log(response.data)
        } catch (err) {
            setError("Failed to fetch data or invalid response format");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoveContext.Provider value={{ loveData, loading, fetchLoveData,error }}>
            {children}
        </LoveContext.Provider>
    );
}


export default LoveProvider;
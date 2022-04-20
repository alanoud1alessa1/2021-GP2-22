import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://filmey.movie/api/v1/"
    : "http://localhost:3001/api/v1/";

    // const baseURL ="http://localhost:3001/api/v1/";
   
  
export default axios.create({
  baseURL,
});

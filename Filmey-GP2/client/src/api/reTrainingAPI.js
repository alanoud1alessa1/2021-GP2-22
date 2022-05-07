import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://filmey.movie/reTraining"
    : "http://localhost:8081";

// const baseURL = "http://localhost:8081";
   
  
export default axios.create({
  baseURL,
});

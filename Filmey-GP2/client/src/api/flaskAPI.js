import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://filmey.movie/flask"
    : "http://localhost:8080";

// const baseURL = "http://localhost:8080";
   
  
export default axios.create({
  baseURL,
});

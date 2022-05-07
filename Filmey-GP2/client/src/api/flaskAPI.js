import axios from "axios";

// const baseURL =
//   process.env.NODE_ENV === "production"
//     ? "http://filmey.movie/flask"
//     : "http://localhost:5000";

const baseURL = "http://localhost:5000";
   
  
export default axios.create({
  baseURL,
});

import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, lname, phnum) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      lname,
      phnum
      
    });
  }

  checkemail(email) {
    return axios.get(API_URL + "checkprofile", {
      params: {
        emailid: email
      }
    }).then((response) => {    
      return response;
    });
  }
}

export default new AuthService();

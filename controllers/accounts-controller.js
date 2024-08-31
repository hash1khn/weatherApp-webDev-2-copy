import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("user-view", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Signup to the Service",
    };
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const existingUser = await userStore.getUserByEmail(request.body.email);
    if (existingUser) {
      response.render("signup-view", {
        title: "Signup to the Service",
        errorMessage: "Email already in use. Please choose another one.",
      });
    } else {
      await userStore.addUser(request.body);
      console.log(`Registering ${request.body.email}`);
      response.redirect("/login");
    }
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user && user.password === request.body.password) {
      response.cookie("station", user.email);
      console.log(`Logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.render("login-view", {
        title: "Login to the Service",
        errorMessage: "Invalid email or password. Please try again.",
      });
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },
};

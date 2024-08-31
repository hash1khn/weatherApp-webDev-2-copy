export const homeController = {
    index(request, response) {
      const viewData = {
        title: "WeatherTop",
      };
      console.log("home page rendering");
      response.render("home-view", viewData);
    },
  };
  
import React from "react";

const News = () => {
  var url =
    "https://api.currentsapi.services/v1/latest-news?" +
    "language=us&" +
    "apiKey=2tnxk3CLFkDb8sOgvYZSXGEF3O3YBbZ6GOGjOdRmBD9ECr9A";
  var req = new Request(url);
  fetch(req).then(function (response) {
    console.log(response.json());
  });

  return <></>;
};
export default News;

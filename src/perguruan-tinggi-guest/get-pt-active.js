import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 10,
  // A string specifying the total duration of the test run.
  duration: "30s",
};

// import env
const env = JSON.parse(open("./../../.env"));

export default function () {
  // Step 1: Run API
  http.get(`${env.BASE_URL}:${env.PORT}/perguruan-tinggi-guest/get-pt-active`);

  sleep(1);
}

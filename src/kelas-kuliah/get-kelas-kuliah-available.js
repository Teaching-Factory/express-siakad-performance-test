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
  // Step 1: Process Login
  const loginPayload = JSON.stringify({
    username: "2313201000062",
    password: "23122001",
  });

  const loginHeaders = { "Content-Type": "application/json" };

  const loginRes = http.post(`${env.BASE_URL}:${env.PORT}/auth/do-login`, loginPayload, { headers: loginHeaders });

  const authToken = loginRes.json("token");

  // Step 2: Run API
  const apiHeaders = {
    Authorization: `${authToken}`,
  };

  http.get(`${env.BASE_URL}:${env.PORT}/kelas-kuliah/get-kelas-kuliah-available`, { headers: apiHeaders });

  sleep(1);
}

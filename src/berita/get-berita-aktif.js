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

// declare token
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiIyMzEzMjAxMDAwMDYyIiwiZGF0YV9yb2xlcyI6WyJtYWhhc2lzd2EiXSwiaWF0IjoxNzIxOTEzMDAxLCJleHAiOjE3MjE5NTYyMDF9.QBRV4_6eCz_ftZWq9oOUX5ecc6AkNmbzCJoa7iIA5uM";

export default function () {
  // Step 1: Run API
  const apiHeaders = {
    Authorization: `${authToken}`,
  };

  http.get(`${env.BASE_URL}:${env.PORT}/kelas-kuliah/get-kelas-kuliah-available`, { headers: apiHeaders });
  sleep(1);
}

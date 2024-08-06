import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 300 },
    { duration: "1m", target: 300 },
    { duration: "2m", target: 0 },
  ],

  // stages: [
  //   { duration: "1m", target: 50 },
  //   { duration: "2m", target: 100 },
  //   { duration: "1m", target: 150 },
  //   { duration: "2m", target: 200 },
  //   { duration: "1m", target: 0 },
  // ],
};

// import env
const env = JSON.parse(open("./../../.env"));

// declare token
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiIyMzEzMjAxMDAwMDYyIiwiZGF0YV9yb2xlcyI6WyJtYWhhc2lzd2EiXSwiaWF0IjoxNzIyNDgxNzUyLCJleHAiOjE3MjI1MjQ5NTJ9.f1JFcD-MxJBiZUejoM5saz6BNK_919GBWKnSYtO6SaQ";

export default function () {
  const apiHeaders = {
    Authorization: `${authToken}`,
  };

  const res = http.get(`${env.BASE_URL}:${env.PORT}/kelas-kuliah/get-kelas-kuliah-available`, { headers: apiHeaders });
  check(res, {
    "status was 200": (r) => r.status === 200,
  });
  sleep(1);
}

import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "3m", target: 300 },
    { duration: "3m", target: 300 },
    { duration: "3m", target: 0 },
  ],
};

// import env
const env = JSON.parse(open("./../../.env"));

// declare token
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiIyMzEzMjAxMDAwMDYyIiwiZGF0YV9yb2xlcyI6WyJtYWhhc2lzd2EiXSwiaWF0IjoxNzIxOTc5MTMwLCJleHAiOjE3MjIwMjIzMzB9.G64hwTcMEagSKrw7AsWm7p00X4xFsFYEKPWNrRjQ9kc";
const semesterId = "20232";

export default function () {
  const apiHeaders = {
    Authorization: `${authToken}`,
  };

  http.get(`${env.BASE_URL}:${env.PORT}/rekap-krs-mahasiswa/${semesterId}/get-krs-mahasiswa`, { headers: apiHeaders });
  sleep(1);
}

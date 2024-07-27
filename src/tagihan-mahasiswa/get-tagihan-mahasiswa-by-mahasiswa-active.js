import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 300 },
    { duration: "1m", target: 300 },
    { duration: "2m", target: 0 },
  ],
};

// import env
const env = JSON.parse(open("./../../.env"));

// declare token
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiIyMzEzMjAxMDAwMDYyIiwiZGF0YV9yb2xlcyI6WyJtYWhhc2lzd2EiXSwiaWF0IjoxNzIyMDUzMTAwLCJleHAiOjE3MjIwOTYzMDB9._Tr_UEO0rFexkpAVtJB3h2Onf3fFW_VJ9y5eukeipMM";

export default function () {
  const apiHeaders = {
    Authorization: `${authToken}`,
  };

  const res = http.get(`${env.BASE_URL}:${env.PORT}/tagihan-mahasiswa/get-tagihan-by-mahasiswa-active`, { headers: apiHeaders });
  check(res, {
    "status was 200": (r) => r.status === 200,
  });
  sleep(1);
}

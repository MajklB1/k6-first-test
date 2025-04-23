import http from 'k6/http';
import { sleep, check } from 'k6';

// init
export let options = {
    vus: 1, // number of virtual users
    duration: '10s', // duration of the test
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
};

// test
export default function () {
    let res = http.get('https://test.k6.io'); // make a GET request
    console.log(res.status); // log the response status
    sleep(1); // sleep for 1 second
    check(res, {
        'is status 200': (r) => r.status === 200, // check if the response status is 200
        'is response time < 200ms': (r) => r.timings.duration < 200, // check if the response time is less than 200ms
    });
    sleep(5); // sleep for 5 seconds
};
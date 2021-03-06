import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "../actions";


const [start, end] = actions.setNowSearch()
const initialState = {
    searchValue: {
        startDate: start,
        endDate: end,
        ticker: "CL",
        contractExpire: "131"
    },
    status: "INITIAL",
    searchResult: {"ticker":"123123",
        "data":[/*{"date":"2000-09-01T13:00:00Z","high":33.45000076,"low":32.75,"open":33.04999924,"close":33.38000107,"adjclose":33.38000107,"volume":45869.0},{"date":"2000-09-05T13:00:00Z","high":33.99000168,"low":33.41999817,"open":33.95000076,"close":33.79999924,"adjclose":33.79999924,"volume":55722.0},
            {"date":"2000-09-06T13:00:00Z","high":34.95000076,"low":33.83000183,"open":33.99000168,"close":34.95000076,"adjclose":34.95000076,"volume":74692.0},{"date":"2000-09-07T13:00:00Z","high":35.5,"low":34.45000076,"open":34.5,"close":35.33000183,"adjclose":35.33000183,"volume":74105.0},
            {"date":"2000-09-08T13:00:00Z","high":34.77999878,"low":33.40000153,"open":34.54999924,"close":33.70000076,"adjclose":33.70000076,"volume":88415.0},{"date":"2000-09-11T13:00:00Z","high":35.84999847,"low":33.75,"open":33.79999924,"close":35.09999847,"adjclose":35.09999847,"volume":101518.0},{"date":"2000-09-12T13:00:00Z","high":35.5,"low":34.09999847,"open":35.45000076,"close":34.20000076,"adjclose":34.20000076,"volume":91911.0},{"date":"2000-09-13T13:00:00Z","high":34.74000168,"low":33.5,"open":34.0,"close":33.79999924,"adjclose":33.79999924,"volume":94630.0},{"date":"2000-09-14T13:00:00Z","high":34.5,"low":33.11999893,"open":33.77999878,"close":34.09999847,"adjclose":34.09999847,"volume":98068.0},{"date":"2000-09-15T13:00:00Z","high":36.09999847,"low":34.45000076,"open":34.5,"close":35.84999847,"adjclose":35.84999847,"volume":85839.0},{"date":"2000-09-18T13:00:00Z","high":37.15000153,"low":36.15000153,"open":36.20000076,"close":36.88000107,"adjclose":36.88000107,"volume":59663.0},{"date":"2000-09-19T13:00:00Z","high":37.0,"low":36.15000153,"open":36.54999924,"close":36.5,"adjclose":36.5,"volume":62731.0},{"date":"2000-09-20T13:00:00Z","high":37.79999924,"low":36.5,"open":37.5,"close":37.5,"adjclose":37.5,"volume":119080.0},{"date":"2000-09-21T13:00:00Z","high":35.5,"low":33.34999847,"open":34.65000153,"close":33.95000076,"adjclose":33.95000076,"volume":110851.0},{"date":"2000-09-22T13:00:00Z","high":34.40000153,"low":32.5,"open":34.0,"close":32.65000153,"adjclose":32.65000153,"volume":85083.0},{"date":"2000-09-25T13:00:00Z","high":32.09999847,"low":31.04999924,"open":31.39999962,"close":31.56999969,"adjclose":31.56999969,"volume":104683.0},{"date":"2000-09-26T13:00:00Z","high":32.04999924,"low":31.39999962,"open":32.0,"close":31.5,"adjclose":31.5,"volume":67727.0},{"date":"2000-09-27T13:00:00Z","high":32.25,"low":31.39999962,"open":31.95000076,"close":31.5,"adjclose":31.5,"volume":86160.0},{"date":"2000-09-28T13:00:00Z","high":32.41999817,"low":30.25,"open":31.10000038,"close":30.29999924,"adjclose":30.29999924,"volume":77513.0},{"date":"2000-09-29T13:00:00Z","high":30.95000076,"low":30.14999962,"open":30.70000076,"close":30.86000061,"adjclose":30.86000061,"volume":57628.0},{"date":"2000-10-02T13:00:00Z","high":32.34999847,"low":31.35000038,"open":31.45000076,"close":32.15000153,"adjclose":32.15000153,"volume":59618.0},{"date":"2000-10-03T13:00:00Z","high":32.31999969,"low":31.69000053,"open":32.0,"close":32.06999969,"adjclose":32.06999969,"volume":48238.0},
            {"date":"2000-10-04T13:00:00Z","high":31.89999962,"low":31.29999924,"open":31.60000038,"close":31.5,"adjclose":31.5,"volume":58088.0}*/],
        "contractExpir":"131"
    },
    predictResult: [/*{"date":"2000-09-01T13:00:00Z","high":33.45000076,"low":32.75,"open":33.04999924,"close":33.38000107,"adjclose":33.38000107,"volume":45869.0,"predict": 52.508194},
{"date":"2000-09-05T13:00:00Z","high":33.99000168,"low":33.41999817,"open":33.95000076,"close":33.79999924,"adjclose":33.79999924,"volume":55722.0,"predict": 52.508194},
{"date":"2000-09-06T13:00:00Z","high":34.95000076,"low":33.83000183,"open":33.99000168,"close":34.95000076,"adjclose":34.95000076,"volume":74692.0,"predict": 52.508194}*/],
    globalMin: null,
    globalMax: null,
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
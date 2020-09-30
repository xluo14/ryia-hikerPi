import axios from "axios";
import {searchUrl} from "../Constant";
import dayjs from "dayjs";
// 设置搜索值
export const setSearchValue = (store, searchValue) => {
    store.setState({searchValue})
}
export const getDataBySearch = async (store, searchValue, request = axios) => {
    const status = "LOADING";
    store.setState({ status });
    try {
        const response = await request.get(
            `${searchUrl}previous_price?&ticker=${searchValue.ticker}&contract_expir=${searchValue.contractExpire}&time_start=${searchValue.startDate}&time_end=${searchValue.endDate}`
        );
        const searchResult = response.data;
        const isResultEmpty = searchResult.length === 0;
        const status = isResultEmpty ? "EMPTY" : "SUCCESS";
        store.setState({ searchResult, status });
    } catch (error) {
        const isError404 = error.response && error.response.status === 404;
        const status = isError404 ? "NOT_FOUND" : "ERROR";
        store.setState({ status });
    }
};

export function setNowSearch() {
    const endDate = dayjs();
    const FormattedEndDate = endDate.format('YYYY-MM-DD').toString();
    const startDate = dayjs(endDate).subtract(90,'day');
    const FormattedStartDate = startDate.format('YYYY-MM-DD').toString();
    return [FormattedStartDate, FormattedEndDate];
}

function setViewDate(endDate, days) {
    const endView = dayjs(endDate,'YYYY-MM-DD').add(days, 'day');
    const FormattedDate = endView.format('YYYY-MM-DD').toString();
    console.log(FormattedDate)
    return FormattedDate;
};

export const getDataByCompare = async (store, searchValue, request = axios) => {
    const Status = "LOADING";
    store.setState({Status});
    try {
        const endView = setViewDate(searchValue.endDate, 30);
        const response1 = await request.get(
            `${searchUrl}previous_price?&ticker=${searchValue.ticker}&contract_expir=${searchValue.contractExpire}&time_start=${searchValue.endDate}&time_end=${endView}`
        );
        const response2 = await request.get(
            `${searchUrl}future_predict?ticker=${searchValue.ticker}&toDateTime=${searchValue.endDate}`
        );
        const Result = response1.data;
        const predict = response2.output;
        console.log(Result);
        const predictResult = [];
        for (let i = 0; i < predict.length; i++) {
            if (Result[i]) {
                predictResult.push({
                    date: setViewDate(searchValue.endDate, i),
                    high: Result[i].high,
                    low: Result[i].low,
                    open: Result[i].open,
                    close: Result[i].close,
                    adjclose: Result[i].adjclose,
                    volume: Result[i].volume,
                    predict: predict[i]
                });
            }
            else {
                predictResult.push({
                    date: setViewDate(searchValue.endDate, i),
                    predict: predict[i]
                });
            }
        }
        console.log(predictResult);
        const isResultEmpty = predictResult.length === 0;
        const status = isResultEmpty ? "EMPTY" : "SUCCESS";
        store.setState({predictResult, status});
    } catch (error) {
        const isError404 = error.response && error.response.status === 404;
        const status = isError404 ? "NOT_FOUND" : "ERROR";
        store.setState({status});
    }
};

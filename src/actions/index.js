import axios from "axios";
import {searchUrl} from "../Constant"

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

function setViewDate (endDate, days) {
    const endView = Date.parse(endDate);
    endView.setDate(endDate.getDate() + days);
    var dd = endView.getDate();
    var mm = endView.getMonth() + 1;
    var y = endView.getFullYear();
    var FormattedDate = y + '-'+ mm + '-' + dd;
    return FormattedDate;
};

export const getDataByCompare = async (store, searchValue, request = axios) => {
    const predictStatus = "LOADING";
    store.setState({ predictStatus });
    try {
        const endView = setViewDate(searchValue.endDate,30);
        const response = await request.get(
            `${searchUrl}previous_price?&ticker=${searchValue.ticker}&contract_expir=${searchValue.contractExpire}&time_start=${searchValue.endDate}&time_end=${endView}`
        );
        const predictResult = response.data;
        const isResultEmpty = predictResult.length === 0;
        const status = isResultEmpty ? "EMPTY" : "SUCCESS";
        store.setState({ predictResult, status });
    } catch (error) {
        const isError404 = error.response && error.response.status === 404;
        const predictStatus = isError404 ? "NOT_FOUND" : "ERROR";
        store.setState({ predictStatus });
    }
    try {
        const response = await request.get(
            `${searchUrl}future_predict?ticker=${searchValue.ticker}&toDateTime=${searchValue.endDate}`
        );
        const predictResult = response.data;
        const isResultEmpty = predictResult.length === 0;
        const predictStatus = isResultEmpty ? "EMPTY" : "SUCCESS";
        const obj = [];
        for (let i = 0; i < predictResult.output.length; i++) {
            obj.push({index: setViewDate(searchValue.endDate, i),
                predict: predictResult.output[i]});
        }
        console.log(obj)
        store.setState({ predictResult, predictStatus });
    } catch (error) {
        const isError404 = error.response && error.response.status === 404;
        const predictStatus = isError404 ? "NOT_FOUND" : "ERROR";
        store.setState({ predictStatus });
    }

};
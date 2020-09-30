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
    var FormattedDate = endView.format('YYYY-MM-DD').toString();
    return FormattedDate;
};

export const getDataByCompare = async (store, searchValue, request = axios) => {
    const Status = "LOADING";
    store.setState({Status});
    try {
        var endView = setViewDate(searchValue.endDate, 30);
        var result = null;
        if (dayjs(endView).isBefore(dayjs())) {
            const response1 = await request.get(
                `${searchUrl}previous_price?&ticker=${searchValue.ticker}&contract_expir=${searchValue.contractExpire}&time_start=${searchValue.endDate}&time_end=${endView}`
            );
            result = response1.data;
            console.log(result);
        } else if (!dayjs(endView).isEqual(dayjs())) {
            const response1 = await request.get(
                `${searchUrl}previous_price?&ticker=${searchValue.ticker}&contract_expir=${searchValue.contractExpire}&time_start=${searchValue.endDate}&time_end=${dayjs().format('YYYY-MM-DD')}`
            );
            result = response1.data;
            console.log(result);
        }
        const response2 = await request.get(
            `${searchUrl}future_predict?ticker=${searchValue.ticker}&toDateTime=${searchValue.endDate}`
        );
        console.log(response2.data);
        const predict = response2.data.output;
        console.log(predict);
        const predictResult = [];
        for (let i = 0; i < predict.length; i++) {
            if (result && result[i]) {
                predictResult.push({
                    date: result[i].date,
                    high: result[i].high,
                    low: result[i].low,
                    open: result[i].open,
                    close: result[i].close,
                    adjclose: result[i].adjclose,
                    volume: result[i].volume,
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

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

        store.setState({ searchResult, status});
    } catch (error) {
        const isError404 = error.response && error.response.status === 404;
        const status = isError404 ? "NOT_FOUND" : "ERROR";
        store.setState({ status });
    }
};
export const getGlobalMinMax = async (store, searchResult, predictResult) => {
    let globalMin = null;
    let globalMax = null;
    for (let i = 0; i < searchResult.data.length; i++) {
        if (globalMin == null || globalMin > searchResult.data[i].adjclose) {
            globalMin = searchResult.data[i].adjclose;
        }
        if (globalMax == null || globalMax < searchResult.data[i].adjclose) {
            globalMax = searchResult.data[i].adjclose;
        }
    }
    for (let i = 0; i < predictResult.length; i++) {
        if (predictResult[i].adjclose) {
            if (predictResult[i].predict) {
                const min = Math.min(predictResult[i].adjclose, predictResult[i].predict);
                const max = Math.max(predictResult[i].adjclose, predictResult[i].predict);
                if (globalMin == null || globalMin > min) {
                    globalMin = min;
                }
                if (globalMax == null || globalMax < max) {
                    globalMax = max;
                }
            } else {
                if (globalMin == null || globalMin > predictResult[i].adjclose) {
                    globalMin = predictResult[i].adjclose;
                }
                if (globalMax == null || globalMax < predictResult[i].adjclose) {
                    globalMax = predictResult[i].adjclose;
                }
            }
        } else {
            if (globalMin == null || globalMin > predictResult[i].predict) {
                globalMin = predictResult[i].predict;
            }
            if (globalMax == null || globalMax < predictResult[i].predict) {
                globalMax = predictResult[i].predict;
            }
        }
    }
    store.setState({globalMin, globalMax});
}
export function setNowSearch() {
    const endDate = dayjs('2020-08-02', 'YYYY-MM-DD');
    const FormattedEndDate = endDate.format('YYYY-MM-DD').toString();
    const startDate = dayjs(endDate).subtract(90,'day');
    const FormattedStartDate = startDate.format('YYYY-MM-DD').toString();
    return [FormattedStartDate, FormattedEndDate];
}

function setViewDate(endDate, days) {
    const endView = dayjs(endDate,'YYYY-MM-DD').add(days, 'day');
    const FormattedDate = endView.format('YYYY-MM-DD').toString();
    return FormattedDate;
};

export const getDataByCompare = async (store, searchValue, request = axios) => {
    const Status = "LOADING";
    store.setState({Status});
    try {
        var endView = setViewDate(searchValue.endDate, 30);
        var result = null;
        if (dayjs(endView, 'YYYY-MM-DD').isBefore(dayjs('2020-09-01','YYYY-MM-DD'))) {
            const response1 = await request.get(
                `${searchUrl}previous_price?&ticker=${searchValue.ticker}&contract_expir=${searchValue.contractExpire}&time_start=${searchValue.endDate}&time_end=${endView}`
            );
            result = response1.data.data;
        } else {
            endView = dayjs('2020-09-01','YYYY-MM-DD').format('YYYY-MM-DD').toString()
            const response1 = await request.get(
                `${searchUrl}previous_price?&ticker=${searchValue.ticker}&contract_expir=${searchValue.contractExpire}&time_start=${searchValue.endDate}&time_end=${endView}`
            );
            result = response1.data.data;
        };
        const response2 = await request.get(
            `${searchUrl}future_predict?ticker=${searchValue.ticker}&toDateTime=${searchValue.endDate}`
        );
        const predict = response2.data.output;
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
        const isResultEmpty = predictResult.length === 0;
        const status = isResultEmpty ? "EMPTY" : "SUCCESS";
        store.setState({predictResult, status});
    } catch (error) {
        const isError404 = error.response && error.response.status === 404;
        const status = isError404 ? "NOT_FOUND" : "ERROR";
        store.setState({status});
    }
};

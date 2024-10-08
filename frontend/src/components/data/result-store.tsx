import {create} from "zustand/index";
import {immer} from "zustand/middleware/immer";

type ResultStoreState = {
    responseTicker: string | undefined
    setResponseTicker: (value: string) => void

    priceChartData: [] | undefined
    setPriceChartData: (value: []) => void

    equityChartData: [] | undefined
    setEquityChartData: (value: []) => void

    performanceData: object | undefined
    setPerformanceData: (value: object) => void

    tradesData: [] | undefined
    setTradesData: (value: []) => void
}

export const useResultStore = create<ResultStoreState>()(
    immer((set, get) => ({
        responseTicker: undefined,

        setResponseTicker: (value) =>
            set((state) => {
                state.responseTicker = value
            }),

        priceChartData: undefined,

        setPriceChartData: (value) =>
            set((state) => {
                state.priceChartData = value
            }),

        equityChartData: undefined,

        setEquityChartData: (value) =>
            set((state) => {
                state.equityChartData = value
            }),

        performanceData: undefined,

        setPerformanceData: (value) =>
            set((state) => {
                state.performanceData = value
            }),

        tradesData: undefined,

        setTradesData: (value) =>
            set((state) => {
                state.tradesData = value
            }),
    }))
);
import {create} from "zustand/index";
import {immer} from "zustand/middleware/immer";

type AppStoreState = {
    isBacktestLoading: boolean;
    setBacktestLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppStoreState>()(
    immer((set, get) => ({
        isBacktestLoading: false,

        setBacktestLoading: (loading) =>
            set((state) => {
                state.isBacktestLoading = loading;
            }),
    }))
);
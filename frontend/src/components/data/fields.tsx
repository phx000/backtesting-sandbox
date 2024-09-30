import {z} from "zod"

export const fields = {
    price: {
        name: "Price",
        type: "simple",
    },
    volume: {
        name: "Volume",
        type: "simple",
    },
    sma: {
        name: "SMA",
        type: "indicator",
        params: {
            window: {
                name: "Window",
                type: "int",
                default: 14
            }
        }
    },
    ema: {
        name: "EMA",
        type: "indicator",
        paramsForm: z.object({
            window
        })

        // params: {
        //     window: {
        //         name: "Window",
        //         type: "int",
        //         default: 14,
        //         min: 2,
        //         max: 1000
        //     }
        // }
    }
}
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import SCHEMA from "@/components/data/schema.tsx"

export const configFormSchema =
    z.object({
        ticker: z
            .string()
            .min(SCHEMA.backtest.ticker.min_len, {
                message: `Ticker must be at least ${SCHEMA.backtest.ticker.min_len} character(s)`
            })
            .max(SCHEMA.backtest.ticker.max_len, {
                message: `Ticker must not be longer than ${SCHEMA.backtest.ticker.max_len} character(s)`
            }),
        period: z.string({
            "required_error": "Select an option"
        }),
        initialCapital: z
            .coerce
            .number()
            .min(SCHEMA.account.initial_capital.min, {
                message: `The minimum is ${SCHEMA.account.initial_capital.min} USD`
            })
            .max(SCHEMA.account.initial_capital.max, {
                message: `The maximum is ${SCHEMA.account.initial_capital.max} USD`
            })
    })

export type ConfigFormValues = z.infer<typeof configFormSchema>

export function useConfigForm() {
    return (
        useForm<ConfigFormValues>({
            resolver: zodResolver(configFormSchema),
            defaultValues: {
                initialCapital: SCHEMA.account.initial_capital.default
            },
            mode: "onChange"
        })
    )
}
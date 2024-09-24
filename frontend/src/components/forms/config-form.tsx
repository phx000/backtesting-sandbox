import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export const configFormSchema = z.object({
    ticker: z
        .string()
        .min(1, {
            message: "Ticker must be at least 1 character"
        })
        .max(6, {
            message: "Ticker must not be longer than 6 characters"
        }),
    period: z.string({
        "required_error": "Select an option"
    }),
    initialCapital: z
        .coerce
        .number()
        .min(100, {
            message: "The minimum is 100 USD"
        })
        .max(10_000_000, {
            message: "The maximum is 10000000 USD"
        })
})

export type ConfigFormValues = z.infer<typeof configFormSchema>

export function useConfigForm() {
    return (
        useForm<ConfigFormValues>({
            resolver: zodResolver(configFormSchema),
            defaultValues: {
                initialCapital: 10_000
            },
            mode: "onChange"
        })
    )
}
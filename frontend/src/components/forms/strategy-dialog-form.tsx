import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export const strategyDialogFormSchema = z.object({
    type: z
        .enum(["buy", "sell"]),
    shares: z
        .coerce
        .number()
        .min(0.1, {
            message: "Number of shares must be at least 0.1"
        })
        .max(1_000_000, {
            message: "Number of shares must be less than 1000000"
        })
})

export type StrategyDialogFormValues = z.infer<typeof strategyDialogFormSchema>

export function useStrategyDialogForm() {
    return (
        useForm<StrategyDialogFormValues>({
            resolver: zodResolver(strategyDialogFormSchema),
            mode: "onChange"
        })
    )
}
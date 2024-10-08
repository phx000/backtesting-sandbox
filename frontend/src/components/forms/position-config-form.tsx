import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import SCHEMA from "@/components/data/schema.tsx";

export const positionConfigFormSchema = z.object({
    type: z
        .enum(["buy", "sell"]),
    shares: z
        .coerce
        .number({
            invalid_type_error:"Required"
        })
        .min(SCHEMA.strategy.units.min, {
            message: `Number of shares must be at least ${SCHEMA.strategy.units.min}`
        })
        .max(SCHEMA.strategy.units.max, {
            message: `Number of shares must be at most ${SCHEMA.strategy.units.max}`
        }),
    takeProfit: z
        .coerce
        .number({
            invalid_type_error:"Required"
        })
        .min(SCHEMA.strategy.take_profit.size.min, {
            message: `Take profit must be at least ${SCHEMA.strategy.take_profit.size.min}`
        })
        .max(SCHEMA.strategy.take_profit.size.max, {
            message: `Take profit must be at at most ${SCHEMA.strategy.take_profit.size.max}`
        }),
    stopLoss: z
        .coerce
        .number({
            invalid_type_error:"Required"
        })
        .min(SCHEMA.strategy.stop_loss.size.min, {
            message: `Stop loss must be at least ${SCHEMA.strategy.stop_loss.size.min}`
        })
        .max(SCHEMA.strategy.stop_loss.size.max, {
            message: `Stop loss must be at at most ${SCHEMA.strategy.stop_loss.size.max}`
        })
})

export type PositionConfigFormValues = z.infer<typeof positionConfigFormSchema>

export function usePositionConfigForm() {
    return (
        useForm<PositionConfigFormValues>({
            resolver: zodResolver(positionConfigFormSchema),
            mode: "onChange"
        })
    )
}
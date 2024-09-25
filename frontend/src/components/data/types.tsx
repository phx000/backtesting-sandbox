import {operators} from "@/components/data/operators.tsx";
import {fields} from "@/components/data/fields.tsx";

export type FieldType = {
    id: string
    type:  keyof fields | "number" | undefined
    value: string | number | undefined
}

export type ConditionType = {
    id: string
    strategyId: string
    index: number
    operator: keyof operators | undefined
    field1Id: string | undefined
    field2Id: string | undefined
}

export type StrategyType = {
    id: string
    index: number
    type: "buy" | "sell" | undefined,
    shares: number | undefined
}
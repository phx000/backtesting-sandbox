import SCHEMA from "@/components/data/schema.tsx";

export type FieldType = {
    id: string
    type: keyof SCHEMA.field.type.choices | undefined
    value: number | string | object | undefined
}

export type ConditionType = {
    id: string
    strategyId: string
    index: number
    operator: keyof SCHEMA.condition.operator.choices | undefined
    field1Id: string | undefined
    field2Id: string | undefined
    errorCount: number
    showErrors: boolean
}

export type StrategyType = {
    id: string
    index: number
    type: typeof SCHEMA.strategy.type.choices[number] | undefined
    shares: number | undefined
    enableTakeProfit: boolean
    takeProfit: number | undefined
    enableStopLoss: boolean
    stopLoss: number | undefined
    errorCount: number
    showErrors: boolean
}
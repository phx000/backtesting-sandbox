import {create} from "zustand"
import {immer} from "zustand/middleware/immer"
import {StrategyType, ConditionType, FieldType} from '@/components/data/types.tsx'

type StoreState = {
    strategies: Record<string, StrategyType>;
    conditions: Record<string, ConditionType>;
    fields: Record<string, FieldType>;

    addStrategy: (strategy: StrategyType) => void;
    updateStrategy: (id: string, updates: Partial<StrategyType>) => void;
    deleteStrategy: (id: string) => void;

    addCondition: (condition: ConditionType) => void;
    updateCondition: (id: string, updates: Partial<ConditionType>) => void;
    deleteCondition: (id: string) => void;

    addField: (field: FieldType) => void;
    updateField: (id: string, updates: Partial<FieldType>) => void;
    deleteField: (id: string) => void;
}

export const useStore = create<StoreState>()(
    immer((set, get) => ({
        strategies: {},
        conditions: {},
        fields: {},

        addStrategy: (strategy: StrategyType) =>
            set((state) => {
                state.strategies[strategy.id] = strategy;
            }),

        updateStrategy: (id, updates) =>
            set((state) => {
                Object.assign(state.strategies[id], updates);
            }),

        deleteStrategy: (id) =>
            set((state) => {
                delete state.strategies[id];
            }),

        addCondition: (condition) =>
            set((state) => {
                state.conditions[condition.id] = condition;
            }),

        updateCondition: (id, updates) =>
            set((state) => {
                Object.assign(state.conditions[id], updates);
            }),

        deleteCondition: (id) =>
            set((state) => {
                delete state.conditions[id];
            }),

        addField: (field) =>
            set((state) => {
                state.fields[field.id] = field;
            }),

        updateField: (id, updates) =>
            set((state) => {
                Object.assign(state.fields[id], updates);
            }),

        deleteField: (id) =>
            set((state) => {
                delete state.fields[id];
            }),
    }))
);
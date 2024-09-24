import {ConditionType, StrategyType} from "@/components/data/types.tsx";

export function getHighestIndex(objects: StrategyType[] | ConditionType[]) {
    if (objects.length === 0) {
        return 1;
    }

    return Math.max(...objects.map(object => object.index))+1
}
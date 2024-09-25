import {Card, CardContent} from "@/components/ui/card.tsx";
import Condition from "@/components/condition.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ConditionType, FieldType, StrategyType} from "@/components/data/types.tsx";
import {useStore} from "@/components/data/store.tsx";
import {nanoid} from "nanoid";
import {getHighestIndex} from "@/components/data/utils.tsx";

export type ConditionsProps = {
    strategy: StrategyType,
}

function Conditions({strategy}:ConditionsProps) {
    const conditions = Object.values(
        useStore((state) => state.conditions))
        .filter(condition => condition.strategyId === strategy.id)
    const addCondition = useStore((state) => state.addCondition)
    const addField = useStore((state) => state.addField)

    function getEmptyField(): FieldType {
        return (
            {
                id: nanoid(),
                type: undefined,
                value: undefined
            }
        )
    }

    function getEmptyCondition(): ConditionType {
        const field1 = getEmptyField()
        const field2 = getEmptyField()
        addField(field1)
        addField(field2)

        return (
            {
                id: nanoid(),
                strategyId: strategy.id,
                index: getHighestIndex(conditions),
                operator: undefined,
                field1Id: field1.id,
                field2Id: field2.id
            }
        )
    }

    return (
        <Card className="w-full h-max">
            <CardContent className="flex flex-col p-4 space-y-2">
                <span>Conditions</span>
                {
                    conditions.map((condition) =>
                        <Condition key={condition.id} condition={condition}/>
                    )
                }
                <Button type={"button"} variant={"secondary"} className={"w-full h-12"}
                        onClick={() => addCondition(getEmptyCondition())}
                        disabled={conditions.length >= 5}>Create a condition</Button>
            </CardContent>
        </Card>
    );
}

export default Conditions;
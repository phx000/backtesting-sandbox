import {Card, CardContent} from "@/components/ui/card.tsx";
import Condition from "@/components/condition.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ConditionType, FieldType, StrategyType} from "@/components/data/types.tsx";
import {useConfigStore} from "@/components/data/config-store.tsx";
import {nanoid} from "nanoid";
import {getHighestIndex} from "@/components/data/utils.tsx";
import SCHEMA from "@/components/data/schema.tsx";

export type ConditionsProps = {
    strategy: StrategyType
    conditions: ConditionType[]
}

function Conditions({strategy, conditions}: ConditionsProps) {
    const addCondition = useConfigStore((state) => state.addCondition)
    const addField = useConfigStore((state) => state.addField)

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
                field2Id: field2.id,
                errorCount: 0,
                showErrors:false
            }
        )
    }

    return (
        <Card className="w-full h-max">
            <CardContent className="flex flex-col p-4 space-y-2">
                <div className="flex items-center space-x-2">
                    <span>Conditions</span>
                    {strategy.showErrors && conditions.length === 0 &&
                        <small className={"text-red-500"}>at least 1 condition required</small>}
                </div>
                {
                    conditions.map((condition) =>
                        <Condition key={condition.id} condition={condition}/>
                    )
                }
                <Button type={"button"} variant={"secondary"} className={"w-full h-12"}
                        onClick={() => addCondition(getEmptyCondition())}
                        disabled={conditions.length >= SCHEMA.strategy.conditions.max_len}>Create a condition</Button>
            </CardContent>
        </Card>
    );
}

export default Conditions;
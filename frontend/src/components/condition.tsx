import {Button} from "@/components/ui/button.tsx";
import {ConditionType} from "@/components/ui/condition-context.tsx"
import {useConfigStore} from "@/components/data/config-store.tsx";
import {ChevronDown} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {operators} from "@/components/data/operators.tsx";
import {fields} from "@/components/data/fields.tsx";
import Operator from "@/components/operator.tsx";
import Field from "@/components/field.tsx";
import {useEffect} from "react";
import {FieldType} from "@/components/data/types.tsx";

export type ConditionProps = {
    condition: ConditionType
}

function Condition({condition}: ConditionProps) {
    const updateCondition = useConfigStore(state => state.updateCondition)
    const deleteCondition = useConfigStore((state) => state.deleteCondition)
    const field1 = useConfigStore((state) => state.fields[condition.field1Id])
    const field2 = useConfigStore((state) => state.fields[condition.field2Id])

    useEffect(() => {
        const errorCount = countConditionErrors()
        updateCondition(condition.id, {errorCount: errorCount})
    }, [condition, field1, field2]);

    function countConditionErrors() {
        let errorCount = 0
        if (condition.operator === undefined) {
            errorCount += 1
        }
        const filteredFields = [field1, field2]
        for (const field of filteredFields) {
            if (field.type === undefined) {
                errorCount += 1
            }
        }
        return errorCount
    }

    return (
        <div className="flex items-center space-x-2">
            <div className={"flex items-center w-full"}>
                <span className={"w-8 flex-shrink-0"}>#{condition.index}</span>
                <div className="w-full min-h-12 p-2 space-x-2 inline-flex items-end justify-center whitespace-nowrap
                rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1
                focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input
                bg-background shadow-sm">
                    <Operator condition={condition}/>
                    <Field field={field1} fieldName={"field1"} oppositeField={field2} condition={condition}/>
                    <Field field={field2} fieldName={"field2"} oppositeField={field1} condition={condition}/>
                </div>
            </div>
            <Button type={"button"} variant={"secondary"} className={"h-12"}
                    onClick={() => deleteCondition(condition.id)}>Delete</Button>
        </div>
    );
}

export default Condition;
import {Button} from "@/components/ui/button.tsx";
import {ConditionType} from "@/components/ui/condition-context.tsx"
import {useStore} from "@/components/data/store.tsx";
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

export type ConditionProps = {
    condition: ConditionType
}

function Condition({condition}: ConditionProps) {
    const deleteCondition = useStore((state) => state.deleteCondition)
    const field1 = useStore((state) => state.fields[condition.field1Id])
    const field2 = useStore((state) => state.fields[condition.field2Id])

    return (
        <div className="flex items-center space-x-2">
            <div className={"flex items-center w-full"}>
                <span className={"w-8 flex-shrink-0"}>#{condition.index}</span>
                <div className="w-full h-12 p-2 space-x-2 inline-flex items-center justify-center whitespace-nowrap
                rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1
                focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input
                bg-background shadow-sm">
                    <Operator condition={condition}/>
                    <Field field={field1} fieldName={"field1"} oppositeField={field2}/>
                    <Field field={field2} fieldName={"field2"} oppositeField={field1}/>
                </div>
            </div>
            <Button type={"button"} variant={"secondary"} className={"h-12"}
                    onClick={() => deleteCondition(condition.id)}>Delete</Button>
        </div>
    );
}

export default Condition;
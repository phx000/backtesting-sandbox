import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {operators} from "@/components/data/operators.tsx";
import {ChevronDown} from "lucide-react";
import {ConditionType} from "@/components/data/types.tsx";
import {ConditionProps} from "@/components/condition.tsx";
import {useStore} from "@/components/data/store.tsx";

export type OperatorProps = {
    condition: ConditionType
}

function Operator({condition}: OperatorProps) {
    const updateCondition = useStore(state => state.updateCondition)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={"w-full"}>
                <Button type={"button"} variant={"outline"} className="flex justify-between">
                    {
                        condition.operator === undefined ?
                            <span className={"opacity-50"}>operator</span>
                            :
                            <span>{operators[condition.operator].name}</span>
                    }
                    <ChevronDown className={"w-4"}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    Object.entries(operators).map(([key, object]) =>
                        <DropdownMenuItem
                            key={key}
                            onSelect={() => updateCondition(condition.id, {operator: key})}>
                            {object.name}
                        </DropdownMenuItem>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Operator;
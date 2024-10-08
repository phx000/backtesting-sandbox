import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown} from "lucide-react";
import {ConditionType} from "@/components/data/types.tsx";
import {useConfigStore} from "@/components/data/config-store.tsx";
import SCHEMA from "@/components/data/schema.tsx";

export type OperatorProps = {
    condition: ConditionType
}

function Operator({condition}: OperatorProps) {
    const updateCondition = useConfigStore(state => state.updateCondition)

    return (
        <div className={"w-full"}>
            {(condition.showErrors&&condition.operator===undefined) && <small className={"text-red-500"}>Required</small>}
            <DropdownMenu>
                <DropdownMenuTrigger asChild className={"w-full"}>
                    <Button type={"button"} variant={"outline"} className="flex justify-between">
                        {
                            condition.operator === undefined ?
                                <span className={"opacity-50"}>operator</span>
                                :
                                <span>{SCHEMA.condition.operator.choices[condition.operator].name}</span>
                        }
                        <ChevronDown className={"w-4"}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {
                        Object.entries(SCHEMA.condition.operator.choices).map(([key, object]) =>
                            <DropdownMenuItem
                                key={key}
                                onSelect={() => updateCondition(condition.id, {operator: key})}>
                                {object.name}
                            </DropdownMenuItem>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default Operator;
import {Button} from "@/components/ui/button.tsx";
import {ConditionType} from "@/components/ui/condition-context.tsx"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {useStore} from "@/components/data/store.tsx";
import {ChevronDown} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {operators} from "@/components/data/operators.tsx";
import {fields} from "@/components/data/fields.tsx";

export type ConditionProps = {
    condition: ConditionType
}

function Condition({condition}: ConditionProps) {
    const updateCondition = useStore(state => state.updateCondition)
    const deleteCondition = useStore((state) => state.deleteCondition)

    const field1 = useStore((state) => state.fields[condition.field1Id])
    const field2 = useStore((state) => state.fields[condition.field2Id])
    const updateField = useStore(state => state.updateField)

    return (
        <div className="flex items-center space-x-2">
            <div className={"flex items-center w-full"}>
                <span className={"w-8 flex-shrink-0"}>#{condition.index}</span>
                <div
                    className="w-full h-12 p-2 space-x-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm">
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
                    {
                        [
                            {
                                name: "field1",
                                field: field1,
                                oppositeField: field2
                            },
                            {
                                name: "field2",
                                field: field2,
                                oppositeField: field1
                            }
                        ].map((iteration, index) =>
                            <DropdownMenu key={index}>
                                <DropdownMenuTrigger asChild className={"w-full"}>
                                    <Button type={"button"} variant={"outline"} className="flex justify-between">
                                        {
                                            iteration.field.type === undefined ?
                                                <span className={"opacity-50"}>{iteration.name}</span>
                                                :
                                                <span>{fields[iteration.field.type].name}</span>
                                        }
                                        <ChevronDown className={"w-4"}/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Dynamic data</DropdownMenuLabel>
                                    {
                                        Object.entries(fields)
                                            .filter(([_, field]) => field.type === "simple")
                                            .map(([key, object]) =>
                                                <DropdownMenuItem
                                                    key={key}
                                                    onSelect={() => updateField(iteration.field.id, {type: key})}
                                                    disabled={iteration.oppositeField.type===key}>
                                                    {object.name}
                                                </DropdownMenuItem>
                                            )
                                    }
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuLabel>Indicators</DropdownMenuLabel>
                                    {
                                        Object.entries(fields)
                                            .filter(([_, field]) => field.type === "indicator")
                                            .map(([key, object]) =>
                                                <DropdownMenuItem
                                                    key={key}
                                                    onSelect={() => updateField(iteration.field.id, {type: key})}>
                                                    {object.name}
                                                </DropdownMenuItem>
                                            )
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                    }
                </div>
            </div>
            <Button type={"button"} variant={"secondary"} className={"h-12"}
                    onClick={() => deleteCondition(condition.id)}>Delete</Button>
        </div>
    );
}

export default Condition;
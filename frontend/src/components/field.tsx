import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {fields} from "@/components/data/fields.tsx";
import {ChevronDown} from "lucide-react";
import {FieldType} from "@/components/data/types.tsx";
import {useStore} from "@/components/data/store.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {useState} from "react";

export type FieldProps = {
    field: FieldType
    fieldName: string
    oppositeField: FieldType
}

function Field({field, fieldName, oppositeField}: FieldProps) {
    const [displayNumberError, setDisplayNumberError] = useState(false)
    const updateField = useStore(state => state.updateField)

    function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        if (value < 0 || value > 100_000_000) {
            setDisplayNumberError(true)
        } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
            setDisplayNumberError(false)
            updateField(field.id, {type: "number", value: event.target.value})
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={"w-full"}>
                <Button type={"button"} variant={"outline"} className="flex justify-between">
                    {
                        field.type === undefined ? (
                            <span className={"opacity-50"}>{fieldName}</span>
                        ) : field.type === "number" ? (
                            <div className={"flex items-center space-x-2"}>
                                <span>{field.value}</span>
                                <small>(num)</small>
                            </div>
                        ) : (
                            <span>{fields[field.type].name}</span>
                        )
                    }
                    <ChevronDown className={"w-4"}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger disabled={oppositeField.type === "number"}
                                            className={oppositeField.type === "number" ? "opacity-50" : ""}>Number</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className={"w-36"}>
                            <Input
                                type={"number"}
                                placeholder={"0.00"}
                                className={"w-full"}
                                onChange={handleNumberChange}
                                onBlur={() => setDisplayNumberError(false)}
                            />
                            {
                                displayNumberError &&
                                <small className={"text-red-500"}>Number must be between 0 and 100000000</small>
                            }
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Dynamic data</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {
                                Object.entries(fields)
                                    .filter(([_, field]) => field.type === "simple")
                                    .map(([key, object]) =>
                                        <DropdownMenuItem
                                            key={key}
                                            onSelect={() => updateField(field.id, {type: key})}
                                            disabled={oppositeField.type === key}>
                                            {object.name}
                                        </DropdownMenuItem>
                                    )
                            }
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>

                    <DropdownMenuSubTrigger>Indicators</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {
                                Object.entries(fields)
                                    .filter(([_, field]) => field.type === "indicator")
                                    .map(([indicatorSlug, indicatorObject]) =>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>{indicatorObject.name}</DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    {
                                                        Object.entries(fields[indicatorSlug].params)
                                                            .map(([paramSlug, paramObject]) =>
                                                                    <DropdownMenuItem>
                                                                        {paramSlug}
                                                                    </DropdownMenuItem>
                                                                // <span
                                                                //         key={paramSlug}>
                                                                // {/*onSelect={() => updateField(field.id, {type: key})}*/}
                                                                //         {paramObject.name}</span>
                                                            )
                                                    }
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    )
                            }
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    )
        ;
}

export default Field;
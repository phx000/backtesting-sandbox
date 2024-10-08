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
import {ChevronDown} from "lucide-react";
import {ConditionType, FieldType} from "@/components/data/types.tsx";
import {useConfigStore} from "@/components/data/config-store.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import SCHEMA from "@/components/data/schema.tsx";
import IndicatorParams from "@/components/indicator-params.tsx";

export type FieldProps = {
    field: FieldType
    fieldName: string
    oppositeField: FieldType
    condition: ConditionType
}

function Field({field, fieldName, oppositeField, condition}: FieldProps) {
    const [displayNumberError, setDisplayNumberError] = useState(false)
    const updateField = useConfigStore(state => state.updateField)

    function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        if (value < SCHEMA.field.type.choices.constant.min || value > SCHEMA.field.type.choices.constant.max) {
            setDisplayNumberError(true)
        } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
            setDisplayNumberError(false)
            updateField(field.id, {type: "constant", value: event.target.value})
        }
    }

    function renderFieldButton() {

        if (field.type === "constant") {
            return (
                <div className={"flex items-center space-x-2"}>
                    <span>{field.value}</span>
                    <small>(num)</small>
                </div>
            )
        }
        if (field.type === "data") {
            return <span>{SCHEMA.field.type.choices.data.choices[field.value].name}</span>
        }
        if (field.type === "indicator") {
            return (
                <div className={"flex items-center space-x-2"}>
                    <span>{SCHEMA.indicator.type.choices[field.value.type].name}</span>
                    {
                        Object.values(field.value.params)
                            .map((value, index) =>
                                <small key={index}>{value}</small>
                            )
                    }
                </div>
            )
        }
        if (field.type === undefined) {
            return <span className={"opacity-50"}>{fieldName}</span>
        }
    }

    return (
        <div className={"w-full"}>
            {(condition.showErrors && field.type === undefined) && <small className={"text-red-500"}>Required</small>}
            <DropdownMenu>
                <DropdownMenuTrigger asChild className={"w-full"}>
                    <Button type={"button"} variant={"outline"} className="flex justify-between">
                        {renderFieldButton()}
                        <ChevronDown className={"w-4"}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger disabled={oppositeField.type === "constant"}
                                                className={oppositeField.type === "constant" ? "opacity-50" : ""}>Number</DropdownMenuSubTrigger>
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
                                    Object.entries(SCHEMA.field.type.choices.data.choices)
                                        .map(([choiceSlug, choiceObject]) =>
                                            <DropdownMenuItem
                                                key={choiceSlug}
                                                onSelect={() => updateField(field.id, {
                                                    type: "data",
                                                    value: choiceSlug
                                                })}
                                                disabled={oppositeField.type === "data" && oppositeField.value === choiceSlug}>
                                                {choiceObject.name}
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
                                    Object.entries(SCHEMA.indicator.type.choices)
                                        .map(([indicatorSlug, indicatorObject]) =>
                                            <DropdownMenuSub key={indicatorSlug}>
                                                <DropdownMenuSubTrigger>{indicatorObject.name}</DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <IndicatorParams indicatorSlug={indicatorSlug}
                                                                         indicator={indicatorObject} field={field}/>
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
        </div>
    )
        ;
}

export default Field;
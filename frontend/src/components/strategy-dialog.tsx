import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import Condition from "@/components/condition.tsx";
import {useStrategyDialogForm} from "@/components/forms/strategy-dialog-form.tsx";
import {ConditionType, FieldType, StrategyType} from "@/components/data/types.tsx";
import {nanoid} from "nanoid";
import {getHighestIndex} from "@/components/data/utils.tsx";
import {useStore} from "@/components/data/store.tsx";

export type StrategyDialogWrapperProps = {
    strategy: StrategyType,
    children: React.ReactNode
}

function StrategyDialog({strategy, children}: StrategyDialogWrapperProps) {
    const form = useStrategyDialogForm()

    const conditions = Object.values(
        useStore((state) => state.conditions)
    ).filter(condition => condition.strategyId === strategy.id)
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

    function onSubmit() {
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className={"flex flex-col aspect-square"}>
                <DialogHeader>
                    <DialogTitle>Edit strategy #{strategy.index}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col justify-between h-full">
                    <div className={"flex space-x-4"}>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
                                <FormField
                                    control={form.control}
                                    name={"type"}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Operation type</FormLabel>
                                            <FormControl>
                                                <Tabs>
                                                    <TabsList className={"w-full space-x-2"}
                                                              defaultValue={strategy.type}>
                                                        <TabsTrigger value={"buy"} className={"w-full"}
                                                                     onClick={() => field.onChange("buy")}>Buy</TabsTrigger>
                                                        <TabsTrigger value={"sell"} className={"w-full"}
                                                                     onClick={() => field.onChange("sell")}>Sell</TabsTrigger>
                                                    </TabsList>
                                                </Tabs>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"shares"}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Number of shares</FormLabel>
                                            <FormControl>
                                                <Input type={"number"} {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
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
                                        disabled={conditions.length >= 5}>
                                    Create a condition
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                    <Button className={"h-12"}>Done</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default StrategyDialog;
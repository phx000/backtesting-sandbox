import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useStrategyDialogForm} from "@/components/forms/strategy-dialog-form.tsx";
import {StrategyType} from "@/components/data/types.tsx";

export type PositionConfigProps = {
    strategy: StrategyType
}

function PositionConfig({strategy}:PositionConfigProps) {
    const form = useStrategyDialogForm()

    function onSubmit() {
    }

    return (
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
    );
}

export default PositionConfig;
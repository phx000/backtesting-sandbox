import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Input} from "@/components/ui/input.tsx";
import {usePositionConfigForm} from "@/components/forms/position-config-form.tsx";
import {StrategyType} from "@/components/data/types.tsx";
import {useConfigStore} from "@/components/data/config-store.tsx";
import {useFormContext} from "react-hook-form";
import {useEffect} from "react";
import {Checkbox} from "./ui/checkbox";

export type PositionConfigProps = {
    strategy: StrategyType
}

function PositionConfig({strategy}: PositionConfigProps) {
    const form = usePositionConfigForm()
    const updateStrategy = useConfigStore((state) => state.updateStrategy)

    useEffect(() => {
        form.setValue("type", strategy.type)
        form.setValue("shares", strategy.shares)
        form.setValue("takeProfit", strategy.takeProfit)
        form.setValue("stopLoss", strategy.stopLoss)

        if (strategy.showErrors) {
            form.trigger("type")
            form.trigger("shares")
            if (strategy.enableTakeProfit) {
                form.trigger("takeProfit")
            }
            if (strategy.enableStopLoss) {
                form.trigger("stopLoss")
            }
        } else {
            if (strategy.shares !== undefined) {
                form.trigger("shares")
            }
            if (strategy.enableTakeProfit && strategy.takeProfit !== undefined) {
                form.trigger("takeProfit")
            }
            if (strategy.enableStopLoss && strategy.stopLoss !== undefined) {
                form.trigger("stopLoss")
            }
        }
    }, [strategy]);

    function handlePositionTypeChange(e, field) {
        console.log(e.target.value)
        updateStrategy(strategy.id, {type: e.target.value})
    }

    return (
        <Form {...form}>
            <form className={"w-1/3 space-y-4"}>
                <FormField
                    control={form.control}
                    name={"type"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Operation type</FormLabel>
                            <FormControl>
                                <Tabs defaultValue={strategy.type}>
                                    <TabsList className={"w-full space-x-2"}>
                                        <TabsTrigger
                                            value={"buy"}
                                            className={"w-full"}
                                            onClick={() => {
                                                updateStrategy(strategy.id, {type: "buy"})
                                            }
                                            }
                                        >
                                            Buy
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value={"sell"}
                                            className={"w-full"}
                                            onClick={() => updateStrategy(strategy.id, {type: "sell"})}
                                        >
                                            Sell
                                        </TabsTrigger>
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
                                <Input
                                    type={"number"}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateStrategy(strategy.id, {shares: e.target.value})
                                    }}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"takeProfit"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={"flex items-center space-x-2"}>
                                <Checkbox
                                    checked={strategy.enableTakeProfit}
                                    onCheckedChange={(e) => updateStrategy(strategy.id, {enableTakeProfit: e})}
                                />
                                <span className={strategy.enableTakeProfit ? "" : "opacity-50 text-black"}>Take profit in %</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type={"number"}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateStrategy(strategy.id, {takeProfit: e.target.value})
                                    }}
                                    disabled={!strategy.enableTakeProfit}
                                />
                            </FormControl>
                            {strategy.enableTakeProfit && <FormMessage/>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"stopLoss"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={"flex items-center space-x-2"}>
                                <Checkbox
                                    checked={strategy.enableStopLoss}
                                    onCheckedChange={(e) => updateStrategy(strategy.id, {enableStopLoss: e})}
                                />
                                <span
                                    className={strategy.enableStopLoss ? "" : "opacity-50 text-black"}>Stop loss in %</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type={"number"}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateStrategy(strategy.id, {stopLoss: e.target.value})
                                    }}
                                    disabled={!strategy.enableStopLoss}
                                />
                            </FormControl>
                            {strategy.enableStopLoss && <FormMessage/>}
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

export default PositionConfig;
import CardPanel from "@/components/sections/card-panel.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import StrategyMini from "@/components/strategy-mini.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {useEffect, useState} from "react";
import {useConfigForm} from "@/components/forms/config-form.tsx";
import {useStore} from "@/components/data/store.tsx";
import {StrategyType} from "@/components/data/types.tsx";
import {nanoid} from "nanoid";
import {getHighestIndex} from "@/components/data/utils.tsx";

function ConfigPanel() {
    const [tradingAccountAccordionErrors, setTradingAccountAccordionErrors] = useState(false)
    const form = useConfigForm()

    const strategies = Object.values(useStore((state) => state.strategies))
    const addStrategy = useStore((state) => state.addStrategy)

    useEffect(() => {
        setTradingAccountAccordionErrors(!!form.formState.errors.initialCapital);
    }, [form.formState.errors.initialCapital])

    function getEmptyStrategy(): StrategyType {
        return (
            {
                id: nanoid(),
                index: getHighestIndex(strategies),
                type: undefined,
                shares: undefined,
            }
        )
    }

    function onSubmit() {
    }

    return (
        <Form {...form}>
            <div className={"flex flex-col w-96 h-full"}>
                <ScrollArea className={"overflow-y-auto"}>
                    <div className="space-y-4">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardPanel headerText={"Configuration"}>
                                <FormField
                                    control={form.control}
                                    name={"ticker"}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Ticker</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder={"AAPL"} {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={"period"} render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={"Select a period"}/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={"hourly"}>Hourly</SelectItem>
                                                    <SelectItem value={"daily"}>Daily</SelectItem>
                                                    <SelectItem value={"weekly"}>Weekly</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                                <FormItem>
                                    <FormLabel>Time interval</FormLabel>
                                    <FormControl>
                                        <Select disabled>
                                            <SelectTrigger id={"timeInterval"}>
                                                <SelectValue placeholder={"Maximum available"}/>
                                            </SelectTrigger>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                                <Accordion type="single" collapsible className="w-full p-0.5">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className={"px-0 py-2"}>
                                            <span className={tradingAccountAccordionErrors ? "text-red-500" : ""}>
                                                Trading account
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent className={"mt-2 space-y-4"} style={{padding: "1px"}}>
                                            <FormField
                                                control={form.control}
                                                name={"initialCapital"}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Initial capital (USD)</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field}/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardPanel>
                        </form>
                        <CardPanel headerText={"Strategies"}>
                            <div className="space-y-2">
                                {strategies.map((strategy) =>
                                    <StrategyMini key={strategy.id} strategy={strategy}/>
                                )}
                                <Button type={"button"} variant={"secondary"} className={"w-full h-12"}
                                        onClick={() => addStrategy(getEmptyStrategy())}
                                        disabled={strategies.length >= 5}>
                                    Create a strategy
                                </Button>
                            </div>
                        </CardPanel>
                    </div>
                </ScrollArea>
                <Button type={"submit"} className={"flex-shrink-0 w-full h-12 mt-4"}>Run backtest</Button>
            </div>
        </Form>
    );
}

export default ConfigPanel;
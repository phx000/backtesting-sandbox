import CardPanel from "@/components/card-panel.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {useEffect, useState} from "react";
import {useConfigForm} from "@/components/forms/config-form.tsx";
import SCHEMA from "@/components/data/schema.tsx";
import {capitalize} from "@/utils.tsx";
import {useConfigStore} from "@/components/data/config-store.tsx";
import axios from "axios"
import {useToast} from "@/hooks/use-toast.ts";
import {useAppStore} from "@/components/data/app-store.tsx";

axios.defaults.baseURL = "http://localhost:8000"


function Config() {
    const {toast} = useToast()
    const [tradingAccountAccordionErrors, setTradingAccountAccordionErrors] = useState(false)
    const form = useConfigForm()
    const strategies = useConfigStore((state) => state.strategies)
    const conditions = useConfigStore((state) => state.conditions)
    const fields = useConfigStore((state) => state.fields)

    const setBacktestLoading = useAppStore((state) => state.setBacktestLoading)


    useEffect(() => {
        setTradingAccountAccordionErrors(!!form.formState.errors.initialCapital);
    }, [form.formState.errors.initialCapital])

    function onSubmit(data) {
        if (Object.values(strategies).some((strategy) => strategy.errorCount > 0)) {
            return
        }

        setBacktestLoading(true)

        axios.post("/api/backtests/",
            {
                ticker: data.ticker,
                period: data.period,
                strategies: Object.values(strategies)
                    .map(strategy => ({
                        type: strategy.type,
                        units: strategy.shares,
                        conditions: Object.values(conditions)
                            .filter(condition => condition.strategyId === strategy.id)
                            .map(condition => ({
                                operator: condition.operator,
                                fields: [fields[condition.field1Id], fields[condition.field2Id]]
                                    .map(field => ({
                                        type: field.type,
                                        value: field.value
                                    }))
                            }))
                    }))
            }
        )
            .then((response) => {
                console.log("success")
                setBacktestLoading(false)
            })
            .catch((error) => {
                setBacktestLoading(false)
                console.log(error)
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `There was a problem with your request. HTTP code: ${error.code} error content: ${JSON.stringify(error.response.data)}`,
                })
            })
    }

    return (
        <Form {...form}>
            <form id={"configForm"} onSubmit={form.handleSubmit(onSubmit)}>
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
                                        {
                                            Object.entries(SCHEMA.backtest.period.choices)
                                                .map(([choiceSlug, choiceObject]) =>
                                                    <SelectItem key={choiceSlug}
                                                                value={choiceSlug}>{choiceObject.name}</SelectItem>
                                                )
                                        }
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
        </Form>
    );
}

export default Config;
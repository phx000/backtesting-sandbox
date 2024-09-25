import CardPanel from "@/components/card-panel.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {useEffect, useState} from "react";
import {useConfigForm} from "@/components/forms/config-form.tsx";


function Config() {
    const [tradingAccountAccordionErrors, setTradingAccountAccordionErrors] = useState(false)
    const form = useConfigForm()

    useEffect(() => {
        setTradingAccountAccordionErrors(!!form.formState.errors.initialCapital);
    }, [form.formState.errors.initialCapital])

    function onSubmit() {
    }

    return (
        <Form {...form}>
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
        </Form>
    );
}

export default Config;
import {z} from "zod";
import SCHEMA from "@/components/data/schema.tsx";
import {configFormSchema, ConfigFormValues} from "@/components/forms/config-form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useConfigStore} from "@/components/data/config-store.tsx";

type IndicatorParamsProps = {
    indicatorSlug: string
    indicator: object
    field: object
}

function generateForm(indicator) {
    let zodObject = {}
    for (const [paramSlug, paramObject] of Object.entries(indicator.params)) {
        if (paramObject.type === "int") {
            zodObject[paramSlug] = z
                .coerce
                .number()
                .min(paramObject.min, {
                    message: `The minimum is ${paramObject.min}`
                })
                .max(paramObject.max, {
                    message: `The maximum is ${paramObject.max}`
                })
        }
    }
    const formSchema = z.object(zodObject)
    type FormValues = z.infer<typeof formSchema>
    return (
        useForm<FormValues>({
            resolver: zodResolver(formSchema),
            defaultValues: Object.fromEntries(
                Object.entries(indicator.params).map(([key, {default: defaultValue}]) => [key, defaultValue])),
            mode: "onChange"
        })
    )
}

function IndicatorParams({indicatorSlug, indicator, field}: IndicatorParamsProps) {
    const form = generateForm(indicator)
    const updateField = useConfigStore((state) => state.updateField)

    function onSubmit(data) {
        updateField(field.id, {
            type: "indicator",
            value: {
                type: indicatorSlug,
                params: data
            }
        })
    }

    return (
        <div className="p-1">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-2"}>
                    {
                        Object.entries(indicator.params)
                            .map(([paramSlug, paramObject]) =>
                                <FormField
                                    key={paramSlug}
                                    control={form.control}
                                    name={paramSlug}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{paramObject.name}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={paramObject.type === "str" ? "text" : (paramObject.type === "int" || paramObject.type === "float") ? "number" : undefined} {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            )
                    }
                    <Button type={"submit"} className={"w-full"}>Add</Button>
                </form>
            </Form>
        </div>
    );
}

export default IndicatorParams;
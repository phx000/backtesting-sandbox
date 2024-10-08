import {Separator} from "@/components/ui/separator.tsx";
import NavBar from "@/components/nav-bar.tsx";
import PriceChart from "@/components/sections/price-chart.tsx";
import EquityChart from "@/components/sections/equity-chart.tsx";
import Trades from "@/components/sections/trades.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import Config from "@/components/sections/config.tsx";
import Strategies from "@/components/sections/strategies.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useConfigStore} from "@/components/data/config-store.tsx";
import {useAppStore} from "@/components/data/app-store.tsx";

import {Loader2} from "lucide-react"
import {Toaster} from "@/components/ui/toaster.tsx";
import Performance from "@/components/performance.tsx";


export default function Backtest() {
    const strategies = useConfigStore((state) => state.strategies)
    const updateStrategy = useConfigStore((state) => state.updateStrategy)
    const conditions = useConfigStore((state) => state.conditions)
    const updateCondition = useConfigStore((state) => state.updateCondition)
    const isBacktestingLoading = useAppStore((state) => state.isBacktestLoading)


    function showBacktestErrors() {
        Object.values(conditions).forEach((condition) => {
            updateCondition(condition.id, {showErrors: true})
        })
        Object.values(strategies).forEach((strategy) => {
            updateStrategy(strategy.id, {showErrors: true})
        })
    }

    return (
        <>
            <div className="flex w-screen h-screen">
                <NavBar/>
                <Separator orientation={"vertical"}/>
                <div className="flex w-full h-full p-4 space-x-4 overflow-hidden">
                    <div className={"flex flex-col w-96 h-full"}>
                        <ScrollArea className={"overflow-y-auto"}>
                            <div className="space-y-4">
                                <Config/>
                                <Strategies/>
                            </div>
                        </ScrollArea>
                        <Button type={"submit"}
                                form={"configForm"}
                                className={"flex-shrink-0 w-full h-12 mt-4"}
                                onClick={showBacktestErrors}
                                disabled={Object.values(strategies).length === 0 || isBacktestingLoading}
                        >
                            {
                                isBacktestingLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            }
                            Run backtest
                        </Button>
                    </div>
                    <div className="flex flex-col flex-1 w-full h-full space-y-4">
                        <PriceChart/>
                        <div className="flex h-full space-x-4 overflow-hidden">
                            <div className="flex flex-col w-1/3 h-full space-y-4">
                                <EquityChart/>
                                <Performance/>
                            </div>
                            <div className="flex flex-col w-2/3 h-full">
                                <Trades/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster/>
        </>
    )
}
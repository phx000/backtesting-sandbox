import {Separator} from "@/components/ui/separator.tsx";
import NavBar from "@/components/nav-bar.tsx";
import PriceChart from "@/components/sections/price-chart.tsx";
import EquityChart from "@/components/sections/equity-chart.tsx";
import CardPanel from "@/components/card-panel.tsx";
import Trades from "@/components/sections/trades.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import Config from "@/components/sections/config.tsx";
import Strategies from "@/components/sections/strategies.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function Backtest() {
    return (
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
                    <Button type={"submit"} className={"flex-shrink-0 w-full h-12 mt-4"}>Run backtest</Button>
                </div>
                <div className="flex flex-col flex-1 w-full h-full space-y-4">
                    <PriceChart/>
                    <div className="flex h-full space-x-4 overflow-hidden">
                        <div className="flex flex-col w-1/3 space-y-4">
                            <EquityChart/>
                            <CardPanel headerText={"Performance"}>
                                <p>Stats go here</p>
                            </CardPanel>
                        </div>
                        <div className="flex flex-col w-2/3 h-full">
                            <Trades/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
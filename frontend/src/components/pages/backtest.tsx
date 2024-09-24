import {Separator} from "@/components/ui/separator.tsx";
import NavBar from "@/components/nav-bar.tsx";
import ConfigPanel from "@/components/sections/config-panel.tsx";
import PriceChart from "@/components/sections/price-chart.tsx";
import EquityChart from "@/components/sections/equity-chart.tsx";
import CardPanel from "@/components/sections/card-panel.tsx";
import Trades from "@/components/sections/trades.tsx";

export default function Backtest() {
    return (
        <div className="flex w-screen h-screen">
            <div className="flex-shrink-0 w-48">
                <div className="flex justify-center items-center h-16 p-2 ">
                    <h3>btest.dev</h3>
                </div>
                <Separator/>
                <NavBar/>
            </div>
            <Separator orientation={"vertical"}/>
            <div className="flex w-full h-full p-4 space-x-4 overflow-hidden">
                <ConfigPanel/>
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
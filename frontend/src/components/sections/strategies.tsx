import {Button} from "@/components/ui/button.tsx";
import CardPanel from "@/components/card-panel.tsx";
import {useConfigStore} from "@/components/data/config-store.tsx";
import {StrategyType} from "@/components/data/types.tsx";
import {nanoid} from "nanoid";
import {getHighestIndex} from "@/components/data/utils.tsx";
import Strategy from "@/components/strategy.tsx";
import SCHEMA from "@/components/data/schema.tsx";

function Strategies() {
    const strategies = Object.values(useConfigStore((state) => state.strategies))
    const addStrategy = useConfigStore((state) => state.addStrategy)

    function getEmptyStrategy(): StrategyType {
        return (
            {
                id: nanoid(),
                index: getHighestIndex(strategies),
                type: undefined,
                shares: undefined,
                enableTakeProfit: false,
                takeProfit: undefined,
                enableStopLoss: false,
                stopLoss: undefined,
                errorCount: 0,
                showErrors: false
            }
        )
    }

    return (
        <CardPanel headerText={"Strategies"}>
            <div className="space-y-2">
                {
                    strategies.map((strategy) =>
                    <Strategy key={strategy.id} strategy={strategy}/>)
                }
                <Button type={"button"} variant={"secondary"} className={"w-full h-12"}
                        onClick={() => addStrategy(getEmptyStrategy())}
                        disabled={strategies.length >= SCHEMA.backtest.strategies.max_len}>
                    Create a strategy
                </Button>
            </div>
        </CardPanel>
    );
}

export default Strategies;
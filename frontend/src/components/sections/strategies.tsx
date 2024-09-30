import {Button} from "@/components/ui/button.tsx";
import CardPanel from "@/components/card-panel.tsx";
import {useStore} from "@/components/data/store.tsx";
import {StrategyType} from "@/components/data/types.tsx";
import {nanoid} from "nanoid";
import {getHighestIndex} from "@/components/data/utils.tsx";
import Strategy from "@/components/strategy.tsx";

function Strategies() {
    const strategies = Object.values(useStore((state) => state.strategies))
    const addStrategy = useStore((state) => state.addStrategy)

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

    return (
        <CardPanel headerText={"Strategies"}>
            <div className="space-y-2">
                {strategies.map((strategy) =>
                    <Strategy key={strategy.id} strategy={strategy}/>
                )}
                <Button type={"button"} variant={"secondary"} className={"w-full h-12"}
                        onClick={() => addStrategy(getEmptyStrategy())}
                        disabled={strategies.length >= 5}>
                    Create a strategy
                </Button>
            </div>
        </CardPanel>
    );
}

export default Strategies;
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {useStore} from "@/components/data/store.tsx";
import StrategyDialog from "./strategy-dialog.tsx";
import {StrategyType} from "@/components/data/types.tsx";

function renderStrategyButton(strategy: StrategyType) {
    if (strategy.type === undefined) {
        return (
            <Button type={"button"} variant={"outline"} className="flex w-full h-12">
                click to edit
            </Button>
        )
    } else if (strategy.type === "buy") {
        return (
            <Button type={"button"} variant={"outline"}
                    className="flex w-full h-12 justify-start items-center p-2 space-x-4">
                <Badge variant="outline" className="h-full border-green-500 bg-green-50 text-green-500">
                    Buy
                </Badge>
                <span>{strategy.conditions.length} conditions</span>
            </Button>
        )
    } else {
        return (
            <Button type={"button"} variant={"outline"}
                    className="flex w-full h-12 justify-start items-center p-2 space-x-4">
                <Badge variant="outline" className="h-full border-red-500 bg-red-50 text-red-500">
                    Sell
                </Badge>
                <span>{strategy.conditions.length} conditions</span>
            </Button>
        )
    }
}

export type StrategyMiniProps = {
    strategy: StrategyType
}

const StrategyMini = ({strategy}: StrategyMiniProps) => {
    const deleteStrategy = useStore((state) => state.deleteStrategy)

    return (
        <div className="flex items-center space-x-2">
            <div className={"flex items-center w-full"}>
                <span className={"w-8 flex-shrink-0"}>#{strategy.index}</span>
                <StrategyDialog strategy={strategy}>
                    {renderStrategyButton(strategy)}
                </StrategyDialog>
            </div>
            <Button type={"button"} variant={"secondary"} className={"h-12"}
                    onClick={() => deleteStrategy(strategy.id)}>Delete</Button>
        </div>
    )
}

export default StrategyMini;
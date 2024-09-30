import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ConditionType, StrategyType} from "@/components/data/types.tsx";
import PositionConfig from "@/components/position-config.tsx";
import Conditions from "@/components/conditions.tsx";
import {useStore} from "@/components/data/store.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {useState} from "react";

export type StrategyDialogWrapperProps = {
    strategy: StrategyType
}

function Strategy({strategy}: StrategyDialogWrapperProps) {
    const deleteStrategy = useStore((state) => state.deleteStrategy)
    const conditions = Object.values(
        useStore((state) => state.conditions))
        .filter(condition => condition.strategyId === strategy.id)
    const deleteCondition = useStore((state) => state.deleteCondition)
    const fields = useStore((state) => state.fields)

    function deleteEmptyConditions() {
        for (const condition of conditions) {
            if (condition.operator === undefined &&
                fields[condition.field1Id].type === undefined &&
                fields[condition.field2Id].type === undefined) {
                deleteCondition(condition.id)
            }
        }
    }

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
                    <span>{conditions.length} conditions</span>
                </Button>
            )
        } else {
            return (
                <Button type={"button"} variant={"outline"}
                        className="flex w-full h-12 justify-start items-center p-2 space-x-4">
                    <Badge variant="outline" className="h-full border-red-500 bg-red-50 text-red-500">
                        Sell
                    </Badge>
                    <span>{conditions.length} conditions</span>
                </Button>
            )
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <div className={"flex items-center w-full"}>
                <span className={"w-8 flex-shrink-0"}>#{strategy.index}</span>
                <Dialog>
                    <DialogTrigger asChild>
                        {renderStrategyButton(strategy)}
                    </DialogTrigger>
                    <DialogContent className={"flex flex-col h-2/3"}>
                        <DialogHeader>
                            <DialogTitle>Edit strategy #{strategy.index}</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col justify-between h-full">
                            <div className={"flex space-x-4"}>
                                <PositionConfig strategy={strategy}/>
                                <Conditions strategy={strategy} conditions={conditions}/>
                            </div>
                            <DialogClose asChild>
                                <Button
                                    className={"h-12"} onClick={deleteEmptyConditions}>Done</Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Button type={"button"} variant={"secondary"} className={"h-12"}
                    onClick={() => deleteStrategy(strategy.id)}>Delete</Button>
        </div>
    );
}

export default Strategy;
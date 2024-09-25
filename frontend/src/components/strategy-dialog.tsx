import {
    Dialog,
    DialogContent,
    DialogHeader, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {StrategyType} from "@/components/data/types.tsx";
import PositionConfig from "@/components/position-config.tsx";
import Conditions from "@/conditions.tsx";

export type StrategyDialogWrapperProps = {
    strategy: StrategyType,
    children: React.ReactNode
}

function StrategyDialog({strategy, children}: StrategyDialogWrapperProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className={"flex flex-col h-2/3"}>
                <DialogHeader>
                    <DialogTitle>Edit strategy #{strategy.index}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col justify-between h-full">
                    <div className={"flex space-x-4"}>
                        <PositionConfig strategy={strategy}/>
                        <Conditions strategy={strategy}/>
                    </div>
                    <Button className={"h-12"}>Done</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default StrategyDialog;
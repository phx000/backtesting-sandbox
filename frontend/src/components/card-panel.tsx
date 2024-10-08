import {Card, CardContent} from "@/components/ui/card.tsx";
import { ScrollArea } from "./ui/scroll-area.tsx";

export type CardPanelProps = {
    headerText: string,
    children: React.ReactNode
    className?: string
}

function CardPanel({headerText, children, className}: CardPanelProps) {
    return (
        <Card className={className}>
            <CardContent className={"h-full p-2"}>
                <ScrollArea className={"flex flex-col h-full p-2"}>
                    <div className="flex flex-col space-y-4" style={{padding:"1px"}}>
                        <h4>{headerText}</h4>
                        {children}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

export default CardPanel;
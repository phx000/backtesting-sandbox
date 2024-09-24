import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import CardPanel from "@/components/sections/card-panel.tsx";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Card, CardContent} from "../ui/card.tsx";

function Trades() {
    function generateStrategies(num) {
        const strategies = [];
        const closeReasons = ['Take Profit', 'Stop Loss', 'Manual Exit', 'Expiration'];

        for (let i = 1; i <= num; i++) {
            const openDate = new Date();
            openDate.setDate(openDate.getDate() - Math.floor(Math.random() * 365)); // Random past date within the last year

            const closeDate = new Date(openDate);
            closeDate.setDate(openDate.getDate() + Math.floor(Math.random() * 90)); // Close date within 90 days after open date

            const strategy = {
                'strategyNumber': `Strategy ${i}`,
                'openDate': openDate.toLocaleDateString(),
                'closeDate': closeDate.toLocaleDateString(),
                'closeReason': closeReasons[Math.floor(Math.random() * closeReasons.length)],
                'shares': Math.floor(Math.random() * 1000 -500) + 1, // Random number of shares between 1 and 1000
                'PL': parseFloat((Math.random() * 2000 - 1000).toFixed(2)),
            };

            strategies.push(strategy);
        }
        return strategies;
    }

// Example usage:
    const trades = generateStrategies(20);

    return (
        <CardPanel headerText={"Trades"} className={"h-full"}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Strategy #</TableHead>
                        <TableHead>Open date</TableHead>
                        <TableHead>Close date</TableHead>
                        <TableHead>Close reason</TableHead>
                        <TableHead>Shares</TableHead>
                        <TableHead className={"text-right"}>P&L</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        trades.map((trade, index) =>
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{trade.strategyNumber}</TableCell>
                                <TableCell>{trade.openDate}</TableCell>
                                <TableCell>{trade.closeDate}</TableCell>
                                <TableCell>{trade.closeReason}</TableCell>
                                <TableCell className={trade.shares<0?"text-red-500":"text-green-500"}>
                                    {trade.shares}
                                </TableCell>
                                <TableCell className={"text-right font-medium "+(trade.PL>0?"text-green-500":"text-red-500")}>
                                    {trade.PL}
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </CardPanel>
    )
}

export default Trades;
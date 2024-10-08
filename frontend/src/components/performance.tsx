import CardPanel from "@/components/card-panel.tsx";
import {useResultStore} from "@/components/data/result-store.tsx";

export default function Performance() {
    const performanceData=useResultStore(state => state.performanceData)

    return <CardPanel headerText={"Performance"} className={"h-full"}>
        {/*<div className="bg-red-500 w-full h-full"></div>*/}

        <div className={"h-full"}>
            {
                performanceData === undefined ? (
                    <div></div>
                ) : (
                    <span>performance results</span>
                )
            }
        </div>
    </CardPanel>;
}
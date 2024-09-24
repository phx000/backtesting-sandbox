import {FlaskConical, House, UsersRound} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

function NavBar() {
    const navBarData = [
        {
            label: "Home",
            icon: House,
            isActive: false
        },
        {
            label: "Backtest",
            icon: FlaskConical,
            isActive: true
        },
        {
            label: "Social",
            icon: UsersRound,
            isActive: false
        }
    ]

    return (
        <div className="flex flex-col p-4 space-y-2">
            {navBarData.map(item => (
                <Button key={item.label} variant={item.isActive ? "secondary" : "ghost"}
                        className={"justify-start w-full h-10 p-3"}>
                    <span>{item.label}</span>
                </Button>
            ))}
        </div>
    );
}

export default NavBar;
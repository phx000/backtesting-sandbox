import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

function NavBar() {
    const navBarData = [
        {
            label: "Home",
            isActive: false
        },
        {
            label: "Backtest",
            isActive: true
        },
        {
            label: "Social",
            isActive: false
        }
    ]

    return (
        <div className="flex-shrink-0 w-48 h-full p-4">
            <div className="flex items-center p-4">
                <h3>btest.dev</h3>
            </div>
            <div className="flex flex-col space-y-2">
                {
                    navBarData.map(item => (
                        <Button key={item.label} variant={item.isActive ? "secondary" : "ghost"}
                                className={"justify-start w-full h-10 p-4"}>
                            <span>{item.label}</span>
                        </Button>
                    ))
                }
            </div>
        </div>

    );
}

export default NavBar;
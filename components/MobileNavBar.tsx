import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideBar from "./SideBar";

const MobileNavBar = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<Button
					className="md:hidden"
					variant='ghost'
					size='icon'
				>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side='left' className="p-0">
				<SideBar />
			</SheetContent>
		</Sheet>
	);
}
 
export default MobileNavBar;
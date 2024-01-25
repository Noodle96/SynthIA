'use client';
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";

const MobileNavBar = () => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if(!isMounted) return null;
	
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
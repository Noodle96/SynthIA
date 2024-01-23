import { UserButton } from "@clerk/nextjs";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
	return ( 
		<div className="flex items-center p-4 ">
			<MobileNavBar />
			<div className="flex w-full justify-end" >
				<UserButton afterSignOutUrl="/"/>
			</div>
		</div>
	);
}
 
export default NavBar;
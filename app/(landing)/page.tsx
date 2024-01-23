import { Button } from "@/components/ui/button";
import Link from "next/link";

// sfc
const LandingPage = () => {
	return ( 
		<div>
			<h1>Landing Page(unprotected)</h1>
			<div>
				<Link href='sign-in'>
					<Button>Login</Button>
				</Link>
				<Link href='sign-up'>
					<Button>Registrarse</Button>
				</Link>
			</div>
		</div>
	);	
}
 
export default LandingPage;
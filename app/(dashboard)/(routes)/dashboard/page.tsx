import { UserButton } from "@clerk/nextjs";

const DashBoardPage = () => {
	return (
		<div>
			<h1>Dashboard Page(protected)</h1>
			<UserButton afterSignOutUrl="/"/>
		</div>
	);
}
export default DashBoardPage;
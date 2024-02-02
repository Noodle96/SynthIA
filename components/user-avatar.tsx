import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = () => {
	const {user} = useUser();
	console.log('=====Componente:UserAvatar======');
	console.log('user');
	console.log(user);
	console.log(user?.firstName?.charAt(0));
	console.log(user?.lastName?.charAt(0));
	console.log('====================================');
	return (
		<Avatar className="h-8 w-8">
			<AvatarImage src={user?.imageUrl}/>
			//En caso no se renderize la imagen
			<AvatarFallback>
				{user?.firstName?.charAt(0)}
				{user?.lastName?.charAt(0)}
			</AvatarFallback>
		</Avatar>
	);
}
 

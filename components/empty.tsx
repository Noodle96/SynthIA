import Image from "next/image";

interface EmptyProps {
	label: string;
}

export const Empty = ({label}: EmptyProps) => {
	return (
		<div className='w-full flex flex-col items-center p-20 justify-center'>
			<div className=" relative w-72 h-72">
				<Image
					alt="Empty"
					src="/empty.png"
					fill
				/>
			</div>
			<p className=" text-muted-foreground text-sm text-center">{label}</p>
		</div>
	);
}
 

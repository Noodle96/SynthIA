import Image from "next/image";

export const Loader = () => {
	return (
		<div className=" h-full flex flex-col gap-y-4 items-center justify-center">
			<div className="w-20 h-20 relative animate-spin">
				<Image
					alt="Loader"
					src="/logo.png"
					fill						
				/>
			</div>
			<p className=" text-sm text-muted-foreground">SynthIA esta pensando...</p>
		</div>
	);
}
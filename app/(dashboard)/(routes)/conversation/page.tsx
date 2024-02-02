'use client';
import * as z from 'zod';
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Heading } from "@/components/Heading";
import {formSchema} from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { OpenAIAvatar } from '@/components/openai-avatar';




const ConversationPage = () => {
	const router = useRouter();
	//esto funcionaba pero me daba errores con el tipo de dato
	// const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

	const [messages, setMessages] = useState<any[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: ""
		},
	});
	const isLoading = form.formState.isSubmitting;
	const onSubmit = async  (values: z.infer<typeof formSchema>) => {
		// debugger;
		// Hasta este punto ya deberia de tener el contenido de mi consulta
		//Ejemplo:
		// content: 'Cual es el valor de Pi?'
		console.log("desde onsubmit");
		console.log(values)
		console.log(values.prompt);

		try{
			// modification with local messages
			// create a post request to new API that we just created
			const userMessage: ChatCompletionMessageParam = {
				role: "user",
				content: values.prompt
			}
			const newMessages = [...messages, userMessage];
			console.log('==========userMessage==========================');
			console.log(userMessage); // Aqui esta la consulta del usuario
			console.log('====================================');
			console.log('================newmessages====================');
			console.log(newMessages);
			console.log('====================================');
			const response =  await axios.post('/api/conversation', {
				messages: newMessages,
			});
			console.log('==============response.data======================');
			console.log(response.data);
			console.log('====================================');
			console.log('==================typeof==================');
			console.log(typeof response.data);
			
			
			setMessages((current) => [...current, userMessage, response.data]);
			form.reset();
		}catch(error:any){
			console.log('====================================');
			console.log('error desde catch');
			console.log('====================================');
			//open pro modal
			console.log(error);
		}finally{
			router.refresh();
		}
	}
	return (
		<div>
			<Heading
				title="Conversation"
				description="Nuestro modelo de conversación mas avanzado"
				icon={MessageSquare}
				iconColor="text-violet-500"
				bgColor="bg-violet-500/10"
			/>
			<div className=" px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							// onSubmit={(e)=>{console.log("onsubmitinggg")}}
							className=' rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 '
						>
							<FormField
								name='prompt'
								render = {({field}) => (
									<FormItem className=' col-span-12 lg:col-span-10'>
										<FormControl className='p-0 m-0'>
											<Input
												className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
												disabled={isLoading}
												placeholder='How I calculate the radious of a circle?'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className=' col-span-12 lg:col-span-2 w-ful'
								disabled={isLoading}
							>
								Enviar
							</Button>
						</form>
					</Form>
				</div>
				<div className=' space-y-4 mt-4'>
					{isLoading &&
						(
							<div className=' rounded-lg p-8 bg-muted w-full flex justify-center items-center'>
								<Loader />
							</div>
						)
					}

					{/* Renderizado de mensajes vacios */}
					{messages.length===0 && !isLoading &&
						(
						<Empty label='Ninguna conversacion iniciada' />
						)
					}

					{/* Renderizado de las consultas */}
					<div className=' flex flex-col-reverse gap-y-4'>
						{messages.map((item) => (
							<div
								key={item.content}
								className={cn(" p-8 w-full flex items-start  gap-x-8 rounded-lg", item.role=== 'user'? " bg-white border border-black/10":"bg-muted")}
							>
								{/* Renderizando el userAvatar or OpenAiAvatar */}
								{item.role === 'user' ? <UserAvatar /> : <OpenAIAvatar />}
								<p className=' text-sm'>
									{item.content}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
 
export default ConversationPage;
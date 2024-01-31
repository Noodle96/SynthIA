import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req:Request) {
	try {
		const {userId } = auth();
		console.log('==========userID==========================');
		console.log(userId);
		console.log('====================================');		
		
		const body = await req.json();
		console.log('================body====================');
		console.log(body);
		console.log('====================================');		
		

		const {messages} = body;
		console.log('============messages========================');
		console.log(messages);
		console.log(messages[0].role);
		console.log(messages[0].content);

		console.log('====================================');		
		
		if(!userId){
			return new NextResponse("Unauthorized",{status: 401});
		}
		if(!openai.apiKey){
			return new NextResponse("OpenAI API key not configured",{status: 500});
		}
		if(!messages){
			return new NextResponse("Messages are required",{status: 400});
		}
		const chatCompletion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
 			messages
		});
		console.log('=============chatCompletation=======================');
		console.log(chatCompletion);
		console.log('====================================');
		console.log('====================================');
		console.log("Desde POST");
		console.log(chatCompletion.choices[0].message);
		console.log('====================================');
		return NextResponse.json(chatCompletion.choices[0].message);
		// console.log(chatCompletion.choices[0].message);

	} catch (error) {
		console.log("[CONVERSATION ERROR]",error);
		return new NextResponse("Internal Error",{status: 500});
	}
}
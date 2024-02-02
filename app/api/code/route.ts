import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: any = {
	role:'system',
	// content: '',
	content: 'Eres un generador de codigo, debes de responder solo en fragmentos de codigo markdown. Usa comentarios de codigo para explicaciones.',
	// content: 'You are a code generator. You must answer only in markdown code snnipets. Use code comments for explanations.'
}

export async function POST(req:Request) {
	try {
		const {userId } = auth();
		console.log('========Desde POST : app/api/conversation/route.ts==================');
		
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
 			messages: [instructionMessage, ...messages],
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
		console.log("[CODE_ERROR]",error);
		return new NextResponse("Internal Error",{status: 500});
	}
}
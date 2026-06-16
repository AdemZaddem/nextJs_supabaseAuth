import { createClient } from "@/lib/supabase/server";
import { NextRequest,NextResponse } from "next/server";

export const GET = async(request:NextRequest)=>{
    const {searchParams,origin} = new URL(request.url)
    console.log(searchParams,origin);
    
    const code = searchParams.get("code")
    console.log(`code: ${code}`);
    

    if(code){
        const supabase = await createClient()
        await supabase.auth.exchangeCodeForSession(code)
    }


    return NextResponse.redirect(`${origin}/dashboard`)
}
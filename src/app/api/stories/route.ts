import { getStories } from "@/actions/action"
import {NextRequest,NextResponse} from "next/server"
export const GET = async (req:NextRequest)=>{
    try {
      const data =  await getStories();;
      return NextResponse.json(data,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Something wrong happened"},{status:500})
    }

}
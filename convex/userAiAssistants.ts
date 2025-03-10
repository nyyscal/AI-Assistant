import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const InsertSelectedAssistants = mutation({
  args:{
    records: v.any(),
    uid: v.id("users")
  },
  handler: async(ctx,args) =>{
    const insertedIds = await Promise.all(
      args.records.map(async(record:any) =>
      await ctx.db.insert("userAiAssistant",{
        ...record,
        aiModelId: "Google: Gemini 2.0 Flash",
        uid:args.uid
      }))
    );
    return insertedIds;
  }
})

export const getAllUserAssistants = query({
  args:{
    uid: v.id("users")
  },
  handler:async(ctx,args)=>{
    const result = ctx.db.query("userAiAssistant").filter(q=>q.eq(q.field("uid"),args.uid)).collect()
    return result
  }
})

export const updateUserAiAssistant = mutation({
  args:{
    id:v.id("userAiAssistant"),
    userInstruction:v.string(),
    aiModelId:v.string()
  },
  handler: async(ctx,args)=>{
    const result = await ctx.db.patch(args.id,{
      aiModelId: args.aiModelId,
      userInstruction: args.userInstruction
    })
    return result
  }
})

export const deleteAssistant = mutation({
  args:{
    id:v.id("userAiAssistant"),
  },
  handler: async(ctx,args) =>{
    await ctx.db.delete(args.id);
  }
})
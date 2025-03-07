import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args:{
    name:v.string(),
    email: v.string(),
    picture:v.string(),
  },
  handler: async(ctx,args) =>{
    //Check if user already exists then only add user
    const user = await ctx.db
    .query("users")
    .filter(q=>q.eq(q.field("email"),args.email))
    .collect();

    if(user?.length ==0){
      //Add record now
      const data = {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits:5000
      }
      const result = await ctx.db.insert("users",data);
      return data
    }

    return user[0]
  }
})
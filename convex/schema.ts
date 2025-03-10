import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users:defineTable({
    name:v.string(),
    email:v.string(),
    picture:v.string(),
    credits:v.number(),
    orderId:v.optional(v.string()),
  }),
  userAiAssistant:defineTable({
    id:v.number(),
    uid:v.id("users"),
    name:v.string(),
    title:v.string(),
    image:v.string(),
    instruction:v.string(),
    userInstruction:v.string(),
    sampleQuestions: v.any(),
    aiModelId:v.optional(v.string()),
  }),
})
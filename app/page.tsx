"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-10">
      <header className="w-full text-center py-8">
        <h1 className="text-5xl font-bold">Welcome to Clove AI Assistant!</h1>
        <p className="text-gray-400 mt-4 text-lg">Experience the power of AI-driven conversations</p>
      </header>
      <main className="flex flex-col md:flex-row items-center justify-center w-full mt-12 space-y-6 md:space-y-0">
        <div className="w-full md:w-auto flex justify-center">
          <div>
            
          <Button variant="secondary" className="text-white font-sans px-8 py-6 rounded-lg shadow-lg transition-all cursor-pointer" onClick={() => router.push("/sign-in")}> 
            Get Started
          </Button>
          </div>
          <div>
          <Button className="text-black font-sans bg-white px-8 py-6 rounded-lg shadow-lg transition-all cursor-pointer ml-4 md:ml-6">
            Learn More
          </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

import { NextResponse } from "next/server";

export async function GET() {
  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
  
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/disasters`);
    if (!res.ok) {
      throw new Error("Failed to reach emergency backend service");
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal network mismatch", status: "degraded" },
      { status: 502 }
    );
  }
}

export async function POST(req: Request) {
  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
  
  try {
    const payload = await req.json();
    const res = await fetch(`${BACKEND_URL}/api/v1/disasters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      throw new Error("Failed to store incident inside core database");
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Operation rejected", status: "degraded" },
      { status: 502 }
    );
  }
}

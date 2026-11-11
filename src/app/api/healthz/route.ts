import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "alashraf-techub",
    status: "healthy",
  });
}

import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

function createAppUrl(request: NextRequest, path: string) {
  const baseUrl = env.siteUrl || request.nextUrl.origin;
  return NextResponse.redirect(new URL(path, baseUrl));
}

export async function GET(request: NextRequest) {
  return createAppUrl(request, "/billing");
}

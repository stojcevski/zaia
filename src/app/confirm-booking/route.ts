import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Token parameter is required' },
      { status: 400 }
    );
  }

  const externalUrl = `https://zaia-living.com/confirm-booking?token=${encodeURIComponent(token)}`;
  return NextResponse.redirect(externalUrl);
}

import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaClient from "@/app/libs/db";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const body = await req.json();
  const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body;
  const listing = await prismaClient.listing.create({
    data: { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue: location.value, price: parseInt(price, 10), userId: currentUser.id }
  })

  return NextResponse.json(listing);
}
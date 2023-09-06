import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaClient from "@/app/libs/db";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') throw new Error("Invalid ID");

  const listing = await prismaClient.listing.deleteMany({
    where: { id: listingId, userId: currentUser.id },
  });

  return NextResponse.json(listing);
}
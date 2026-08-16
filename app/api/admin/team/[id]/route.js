import { NextResponse } from "next/server";
import { updateUser, deleteUser } from "@/lib/admin/user-service";

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const result = await updateUser(params.id, body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ user: result.user });
  } catch {
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const result = await deleteUser(params.id);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
  }
}

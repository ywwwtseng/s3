import { db } from '../../db';
import { images } from '@/schema';
import { lt, and, isNotNull } from 'drizzle-orm';

export const runtime = 'edge';

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get('image') as File;
  const expires_at = formData.get('expires_at') as string;

  if (!image) {
    return new Response('No image', { status: 400 });
  }

  await db
    .delete(images)
    .where(
      and(isNotNull(images.expires_at), lt(images.expires_at, new Date()))
    );

  const [{ id }] = await db
    .insert(images)
    .values({
      mime: image.type,
      data: Buffer.from(await image.arrayBuffer()).toString('base64'),
      expires_at: expires_at ? new Date(expires_at) : null,
    })
    .returning();

  return Response.json({
    url: `https://s3-blush.vercel.app/images/${id}`,
  });
}

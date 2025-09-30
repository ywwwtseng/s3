import { db } from '../../../db';
import { eq } from 'drizzle-orm';
import { images } from '@/schema';

interface Params {
  id: string;
}

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;

  if (!id) {
    return new Response('No id', { status: 400 });
  }

  const result = await db
    .select()
    .from(images)
    .where(eq(images.id, parseInt(id)));

  const image = result[0];

  if (!image) {
    return new Response('No image', { status: 400 });
  }

  const base64 = Buffer.from(image.data, 'base64');
  const mime = image.mime;
  const file = new File([base64], `${id}.${mime}`, { type: mime });

  return new Response(file, { status: 200 });
}

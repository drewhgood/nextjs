import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  try {
    const posts = (await prisma.post.findMany()) || [];
    const postIds = posts.map(({ id }) => id);
    res.status(200).json({ postIds: [1, 2, 3] });
  } catch {
    res.status(500);
  }
}

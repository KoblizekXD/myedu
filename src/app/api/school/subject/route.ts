import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { config } from "../../auth/[...nextauth]/route";
import { z } from "zod";

const CreateSubjectBody = z.object({
  name: z.string(), // Subject name
  description: z.string(), // Optional
  students: z.array(z.string()), // Emails of students
})

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, config);
  
  if (session) {
    if (CreateSubjectBody.safeParse(req.body).success) {
      await prisma.subject.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          teacher: {
            connect: {
              userId: session.user.id
            }
          },
          class: {
            connect: {
              id: session.user.teacher.classId
            }
          }
        }
      })
    } else {
      res.status(400).json({ error: 'Invalid body' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
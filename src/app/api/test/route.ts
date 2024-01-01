import { PrismaClient } from "@prisma/client";
// Write a route for GET /api/test

const prisma = new PrismaClient();

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    prisma.student.create({
        data: {
          name: "jan",
          email: "jan@spst.eu",
          password: "koblih",
          birthday: "",
          classes: {},
          subjects: {},
          grades: {},
          school: {}
        }
      })
    return Response.json({status: "succeed"})
}
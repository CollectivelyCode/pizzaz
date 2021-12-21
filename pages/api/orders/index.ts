import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function Handler(req: NextApiRequest, res: NextApiResponse){
    const Prisma: PrismaClient = new PrismaClient()
    switch (req.method){
        case "GET":
            const orders = await Prisma.order.findMany()
            res.status(200).send(orders)
            break
        default:
            res.status(405).send({"error": "method not allowed"})
    }
    Prisma.$disconnect()
    res.end()
}

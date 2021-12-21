import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function Handler(req: NextApiRequest, res: NextApiResponse){
    const {id} = req.query
    const Prisma: PrismaClient = new PrismaClient()
    switch (req.method){
        case "GET":
            const orderItems = await Prisma.orderItem.findMany({
                where: {
                    orderId: Array.isArray(id) ? Number(id[0]) : Number(id)
                }
            })
            res.status(200).send([orderItems])
            break
        default:
            res.status(405).send({"error": "method not allowed"})
    }
    Prisma.$disconnect()
    res.end()
}

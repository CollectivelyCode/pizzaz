import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";
import ModifyOrder from "../../../../schema/ModifyOrder";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query
    const Prisma: PrismaClient = new PrismaClient()
    const Order = await Prisma.order.findUnique({
        where: {
            // Check if ID query param is array, then cast first index to number if so. Otherwise, cast param to number
            id: Array.isArray(id) ? Number(id[0]) : Number(id)
        }
    })
    if (!Order) {
        res.status(404).end()
    }
    switch (req.method) {
        case "GET":
            res.status(200).send(Order)
            break
        case "PATCH":
            const {error, value} = ModifyOrder.validate(req.body)
            if(error){
                res.status(400).send({"error": error})
                break
            }
            const updatedOrder = await Prisma.order.update({
                where: {
                    id: Array.isArray(id) ? Number(id[0]) : Number(id)
                },
                data: {
                    ...req.body
                }
            })
            res.status(200).send(updatedOrder)
            break
        default:
            // Method not implemented / not allowed
            res.status(405)
            break
    }
    Prisma.$disconnect()
    res.end()
}

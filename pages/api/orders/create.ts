import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";
import CreateOrder from "../../../schema/CreateOrder";
interface OrderInputItem {
    itemId: number,
    size: string,
    notes: string
}
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query
    const Prisma: PrismaClient = new PrismaClient()
    switch (req.method) {
        case "POST":
            const {error, value} = CreateOrder.validate(req.body)
            if (error) {
                res.status(400).send(error)
                break
            }
            const order = await Prisma.order.create({
                data: {
                    timePlaced: new Date(),
                    nameForOrder: req.body.nameForOrder,
                    readyForKitchen: false,
                    readyForPickup: false
                }
            })
            req.body.items.map(async (item: OrderInputItem) => {
                const itemExists = !!(await Prisma.item.findUnique({
                    where: {
                        id: item.itemId
                    }
                }))
                if(!itemExists){
                    res.status(400).send({"error": "item does not exists"})
                    return
                }
                else {
                    await Prisma.orderItem.create({
                        data: {
                            orderId: order.id,
                            ...item
                        }
                    })
                }
            })
            const readyOrder = await Prisma.order.update({
                where: {
                    id: order.id
                },
                data: {
                    readyForKitchen: true
                }
            })
            res.status(201).send(readyOrder)
            break
        default:
            // Method not implemented / not allowed
            res.status(405)
            break
    }
    Prisma.$disconnect()
    res.end()
}

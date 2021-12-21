import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query
    const Prisma: PrismaClient = new PrismaClient()
    switch (req.method) {
        case "POST":
            const Order = await Prisma.order.findUnique({
                where: {
                    // Check if ID query param is array, then cast first index to number if so. Otherwise, cast param to number
                    id: Array.isArray(id) ? Number(id[0]) : Number(id)
                }
            })
            // If order exists and is not resolved, mark as resolved
            if (Order && !Order.timeResolved) {
                await Prisma.order.update({
                    where: {
                        // Check if ID query param is array, then cast first index to number if so. Otherwise, cast param to number
                        id: Array.isArray(id) ? Number(id[0]) : Number(id)
                    },
                    data: {
                        // Set time resolved to current time. Note: may run into issues because of server vs database time
                        timeResolved: new Date().toISOString()
                    }
                })
                res.status(200).json(Order)
            }
            else {
                // If order exists and has resolved timestamp
                if (Order && Order.timeResolved){
                    res.status(400).json({"error": "Order already resolved"})
                }
                else {
                    res.status(404)
                }
            }
            break

        default:
            // Method not implemented / not allowed
            res.status(405)
            break
    }
    Prisma.$disconnect()
    res.end()
}

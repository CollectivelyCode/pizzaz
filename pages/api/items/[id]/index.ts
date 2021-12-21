import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query
    const Prisma: PrismaClient = new PrismaClient()
    const item = await Prisma.item.findUnique({
        where: {
            // If ID is array, string to number of first in array. If not, req param string to number
            id: Array.isArray(id) ? Number(id[0]) : Number(id)
        }
    })
    if (!item) {
        res.status(404).send({"error": "Item not found"})
        return
    }
    switch (req.method) {
        case "GET":
            res.status(200).send(item)
            break
        case "PATCH":
            const updatedItem = await Prisma.item.update({
                where: {
                    // If ID is array, string to number of first in array. If not, req param string to number
                    id: Array.isArray(id) ? Number(id[0]) : Number(id)
                },
                data: {
                    ...req.body
                }
            })
            res.status(200).send(updatedItem)
            break
        case "DELETE":
            await Prisma.item.delete({
                where: {
                    // If ID is array, string to number of first in array. If not, req param string to number
                    id: Array.isArray(id) ? Number(id[0]) : Number(id)
                }
            })
            res.status(200).send("Item deleted")
            break

        default:
            res.status(405).send({"error": "method not allowed"})
    }
}

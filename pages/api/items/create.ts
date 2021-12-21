import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";
import Item from "../../../schema/Item";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query
    const Prisma: PrismaClient = new PrismaClient()

    switch (req.method) {
        case "POST":
            const {error, value} = Item.validate(req.body)
            if (error) {
                res.status(400).send({"error": error})
                break
            }
            const item = await Prisma.item.create({
                data: {
                    name: req.body.name,
                    description: req.body.description ? req.body.description : undefined,
                    sizes: req.body.sizes
                }
            })
            res.status(201).send(item)
            break
        default:
            res.status(405).send({"error": "method not allowed"})
    }
}

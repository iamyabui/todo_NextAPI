import type { NextApiHandler } from "next";
import prisma from "../../lib/prisma";

const Handler: NextApiHandler = async(req, res) => {
    try {
        await prisma.task.update({
            data: {...req.body, title: req.body.title, detail: req.body.detail, priority: req.body.priority},
            where: {id: req.body.id},
        });
        return res.json({
            ok: true,
        });
    } catch (err) {
        res.json({ ok: false, err });
    }
};

export default Handler;
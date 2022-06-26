import type { NextApiHandler } from "next";
import prisma from "../../lib/prisma";

const Handler: NextApiHandler = async(req, res) => {
    try {
        await prisma.task.create({
            data: req.body,
        });
        return res.json({
            ok: true,
        });
    } catch (err) {
        res.json({ ok: false, err });
    }
};

export default Handler;
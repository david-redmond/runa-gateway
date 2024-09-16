import { Router, Request, Response } from 'express';
import axios from "axios";
import logger from "../logger";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        if (!!req.user) {
            const { _id } = req.user;

            const user = await axios.get(`${process.env.USER_SERVICE}/${_id}`);

            logger.debug(`/api/user/, GET: Found User ${_id}`);
            return res.status(200).send(user.data);
        } else {
            logger.info(`/api/user/, GET: Not Found ${req.user._id}`);
            return res.status(404).send("Not Found");
        }
    } catch (error) {
        logger.error({
            msg: `/api/user/, GET: Internal Error ${req.user._id}`,
            error,
        });
        return res.status(500).send("Internal Error");
    }
});
router.get("/other/:id", async (req: Request, res: Response) => {
    try {
        if (!!req.user) {

            const user = await axios.get(`${process.env.USER_SERVICE}/${req.params.id}`);
            const data = {
                firstname: user.data.firstname,
                surname: user.data.surname,
                attributes: {
                    picture: user.data.attributes.picture
                }
            }
            logger.debug(`/api/user/other/:id, GET: Found Other User`);
            return res.status(200).send(data);
        } else {
            logger.info(`/api/user/other/:id, GET: Not Other Found ${req.user._id}`);
            return res.status(404).send("Not Found");
        }
    } catch (error) {
        logger.error({
            msg: `/api/user/other/:id, GET: Internal Error ${req.user._id}`,
            error,
        });
        return res.status(500).send("Internal Error");
    }
});

export default router;

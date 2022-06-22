import express from "express";
import AuthController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/", async (req, res) => {
    const controller = new AuthController();

    const {userName, pwd} = req.body;
    if (!userName || !pwd) return res.status(400).json({'message': 'Username and password are required.'});

    const auth = await controller.handleLogin(req.body);

    if (auth) {
        res.cookie('jwt', auth?.refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({accessToken: auth?.accessToken});
    } else {
        res.sendStatus(401);
    }
});

export default authRouter;
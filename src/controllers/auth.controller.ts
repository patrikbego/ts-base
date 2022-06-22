import {Body, Post, Route, Tags} from "tsoa";
import {getUserByEmail} from "../repositories/user.repository";
import {createAuth, IAuthPayload} from "../repositories/auth.repository";
import {Auth} from "../models/auth";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";

require('dotenv').config();

@Route("auth")
@Tags("Auth")
export default class AuthController {

    @Post("/")
    public async handleLogin(@Body() @Body() body: IAuthPayload): Promise<Auth | null> {
        return handleLogin(body);
    }
}

export const handleLogin  = async (payload: IAuthPayload) :Promise<Auth | null> => {

    const foundUser = await getUserByEmail(payload.email)
    if (!foundUser) return null;
    const match = await compare(payload.pwd, foundUser.pwd);
    if (!match) {
        return null;
    } else {
        // create JWTs
        const accessToken = sign(
            {"email": foundUser.email},
            <string>process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );
        const refreshToken = sign(
            {"email": foundUser.email},
            <string>process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        const authPayload = new Auth();
        authPayload.accessToken = accessToken;
        authPayload.refreshToken = refreshToken;
        authPayload.email = foundUser.email;
        authPayload.userId = foundUser.id;
        // Saving refreshToken with current user
        return createAuth(authPayload);
    }
}

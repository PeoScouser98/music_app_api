import path from "path";
import fs from "fs";
const jwtConfig = {
	secretKey: fs.readFileSync(path.resolve(__dirname, "../keys/private.pem")),
	certification: fs.readFileSync(path.resolve(__dirname, "../keys/public.crt")),
	algorithm: "RS256",
	tokenLife: 15 * 1000,
	refreshTokenLife: 15 * 1000,
};
export default jwtConfig;

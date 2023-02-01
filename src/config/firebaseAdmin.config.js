import admin from "firebase-admin";
import serviceAccount from "./serviceAcount.json";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

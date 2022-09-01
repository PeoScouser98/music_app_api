import fs from "fs";
import "dotenv/config";
import { google } from "googleapis";
import { Stream } from "stream";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// get auth client
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
	version: "v3",
	auth: oauth2Client,
});

const setFilePublic = async (fileId) => {
	try {
		await drive.permissions.create({
			fileId,
			requestBody: {
				role: "reader",
				type: "anyone",
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const uploadFile = async (fileObject) => {
	try {
		const bufferStream = new Stream.PassThrough();
		bufferStream.end(fileObject.buffer);
		const createdFile = await drive.files.create({
			requestBody: {
				name: fileObject.originalname,
			},
			media: {
				mimeType: fileObject.mimeType,
				body: bufferStream,
			},
		});
		const getFileUrl = await setFilePublic(createdFile.data.id);
		return getFileUrl;
	} catch (error) {
		console.log(error);
	}
};
export default uploadFile;

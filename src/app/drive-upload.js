import "dotenv/config";
import { google } from "googleapis";
import { Stream } from "stream";

/* :::::::::::::::::::: DRIVE UPLOAD :::::::::::::::::::: */
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
		return drive.files.get({
			fileId,
			fields: "webViewLink,webContentLink",
		});
	} catch (error) {
		console.log(error);
	}
};
// folderId: 1lPcnj0jxiOXnKzGb4Ueku12L9i1L46FL
export const uploadFile = async (file, dir) => {
	try {
		/* tạo nơi lưu trữ file tạm thời (buffer) -> file sẽ được upload qua stream */
		const bufferStream = new Stream.PassThrough();
		bufferStream.end(file.buffer);
		const createdFile = await drive.files.create({
			requestBody: {
				name: file.originalname,
				parents: [process.env.MUSIC_DIR],
			},
			media: {
				body: bufferStream,
				/* file được upload lấy từ buffer đã được lưu trữ tạm thời trước đó */
			},
			fields: "id",
		});
		await setFilePublic(createdFile.data.id);
		return createdFile;
	} catch (error) {
		console.log(error);
	}
};

export const deleteFile = async (req, res) => {
	try {
		const removedFile = await drive.files.delete(req.body.fileId);
		res.status(204).json(removedFile);
	} catch (error) {
		res.status(400).json({
			message: "Không xóa được file",
		});
	}
};

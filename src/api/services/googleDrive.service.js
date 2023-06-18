import 'dotenv/config';
import { google } from 'googleapis';
import { Stream } from 'stream';

/* :::::::::::::::::::: DRIVE UPLOAD :::::::::::::::::::: */
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

// get auth client
const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
oauth2Client.getAccessToken();

const drive = google.drive({
	version: 'v3',
	auth: oauth2Client,
});

const setFilePublic = async (fileId) => {
	try {
		await drive.permissions.create({
			fileId,
			requestBody: {
				role: 'reader',
				type: 'anyone',
			},
		});
		return drive.files.get({
			fileId,
			fields: 'webViewLink,webContentLink',
		});
	} catch (error) {
		console.log(error);
	}
};
// folderId: 1lPcnj0jxiOXnKzGb4Ueku12L9i1L46FL
export const uploadFile = async (file, dir = process.env.MUSIC_DIR) => {
	try {
		/* tạo nơi lưu trữ file tạm thời (buffer) -> file sẽ được upload qua stream */
		const bufferStream = new Stream.PassThrough();
		bufferStream.end(file.buffer);
		const createdFile = await drive.files.create({
			requestBody: {
				name: file.originalname,
				parents: [dir],
			},
			media: {
				body: bufferStream,
				/* file được upload lấy từ buffer đã được lưu trữ tạm thời trước đó */
			},
			fields: 'id',
		});
		await setFilePublic(createdFile.data.id);
		return createdFile;
	} catch (error) {
		console.log(error.message);
	}
};

export const deleteFile = async (req, res) => {
	try {
		const removedFile = await drive.files.delete(req.body.fileId);
		res.status(204).json(removedFile);
	} catch (error) {
		console.log(error.message);
	}
};

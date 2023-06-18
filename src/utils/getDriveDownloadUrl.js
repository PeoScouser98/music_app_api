/**
 *
 * @param {string} fileId
 * @returns {string} downloadUrl
 */
export default function getDriveDownloadUrl(fileId) {
	return 'https://drive.google.com/uc?export=download&id=' + fileId;
}

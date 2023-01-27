const { initializeApp, applicationDefault } = require("firebase-admin/app");

const app = initializeApp({
	credential: applicationDefault(),
	projectId: "music-app-cdef5",
});

export default app;

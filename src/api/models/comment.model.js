import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
	{
		track: {
			type: String,
			require: true,
			ref: 'track',
		},
		userId: {
			type: String,
			require: true,
			ref: 'user',
		},
		content: {
			type: String,
			require: true,
		},
		postAt: {
			type: Date,
			default: new Date().toLocaleDateString(),
			require: true,
		},
	},
	{
		timestamps: true,
	}
);
export default mongoose.model('Comment', commentSchema);

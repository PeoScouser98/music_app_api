import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const collectionSchema = mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			autopopulate: { select: '_id username avatar' },
		},
		artists: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Artist',
					autopopulate: true,
				},
			],
			default: [],
		},
		albums: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Album',
					autopopulate: true,
				},
			],
			default: [],
		},
		tracks: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Tracks',
					autopopulate: true,
				},
			],
			default: [],
		},
	},
	{
		timestamps: true,
		strictPopulate: false,
	}
);

collectionSchema.plugin(mongooseAutoPopulate);

export default mongoose.model('Collections', collectionSchema);

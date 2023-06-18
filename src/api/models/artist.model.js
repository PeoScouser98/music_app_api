import mongoose from 'mongoose';
import mongooseSlugGenerator from 'mongoose-slug-generator';
const artistSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		avatar: {
			type: String,
			default: 'default.png',
			require: true,
		},
		wallpaper: {
			type: String,
			default: 'default.png',
			require: true,
		},
		desc: {
			type: String,
		},
	},
	{
		strictPopulate: false,
		toJSON: { virtuals: true },
	}
);

artistSchema.plugin(mongooseSlugGenerator);

export default mongoose.model('Artist', artistSchema);

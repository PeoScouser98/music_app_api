import mongoose from 'mongoose';
import mongooseSlugGenerator from 'mongoose-slug-generator';

const genreSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	slug: { type: String, slug: ['name'], unique: true },
});

mongoose.plugin(mongooseSlugGenerator);

export default mongoose.model('Genre', genreSchema);

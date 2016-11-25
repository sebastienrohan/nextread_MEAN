var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	title: {type: String, required: true },
	author: String,
	rating: Number,
	cover: String,
	description: String
});

mongoose.model('Book', bookSchema);
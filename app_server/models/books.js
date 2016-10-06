var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	title: {type: String, required: true },
	author: String,
	summary: String,
	cover: Buffer
});

mongoose.model('Book', bookSchema);
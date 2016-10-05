module.exports.list = function(req, res) {
	res.render('books', {
		title: 'Nextread',
		pageHeader: {
			title: 'Nextread',
			strapline: 'Your books-to-read list'
		},
		books: [
			{
				title: 'Dune',
				author: 'Frank Herbert',
				summary: 'Set in the far future amidst a sprawling feudal interstellar empire where planetary dynasties are controlled by noble houses that owe an allegiance to the imperial House Corrino, Dune tells the story of young Paul Atreides (the heir apparent to Duke Leto Atreides and heir of House Atreides) as he and his family accept control of the desert planet Arrakis, the only source of the \'spice\' melange, the most important and valuable substance in the cosmos. The story explores the complex, multi-layered interactions of politics, religion, ecology, technology, and human emotion as the forces of the empire confront each other for control of Arrakis.',
				cover: '/images/dune.jpg'
			},
			{
				title: 'Foundation',
				author: 'Isaac Asimov',
				summary: 'For twelve thousand years the Galactic Empire has ruled supreme. Now it is dying. But only Hari Seldon, creator of the revolutionary science of psychohistory, can see into the future -- to a dark age of ignorance, barbarism, and warfare that will last thirty thousand years. To preserve knowledge and save mankind, Seldon gathers the best minds in the Empire -- both scientists and scholars -- and brings them to a bleak planet at the edge of the Galaxy to serve as a beacon of hope for a future generations. He calls his sanctuary the Foundation.',
				cover: '/images/foundation.jpg'
			}]
	});
};
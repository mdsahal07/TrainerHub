import Client from '../models/Client.js';

export const getClientById = async (req, res) => {
	const clientID = req.params.id;
	console.log("ClientId : ", clientID);
	try {
		const client = await Client.findById(clientID);
		console.log("Client : ", client);
		if (!client) res.satuts(404).json({ message: "Client not found" });
		res.json(client);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}


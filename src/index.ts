import express, { Request, Response } from 'express';
import { verifyUser } from './middlewares/auth/jwt';
import { receiveMessages, sendMessage } from './broker/message-broker';

// Initialize the Express app
const app = express();

app.all('/user', verifyUser, async (req: Request, res: Response) => {
	await sendMessage(JSON.stringify(req))
	const result = await receiveMessages();
	res.send(result);
});


app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});

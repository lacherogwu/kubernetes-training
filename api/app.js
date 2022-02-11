import express from 'express';
import Bull from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter.js';
import { ExpressAdapter } from '@bull-board/express';

const app = express();

const queue = new Bull('tasks', { redis: { host: 'redis', port: 6379 } });

const serverAdapter = new ExpressAdapter();

createBullBoard({
	queues: [new BullAdapter(queue)],
	serverAdapter,
});

serverAdapter.setBasePath('/admin/queues');
app.use('/admin/queues', serverAdapter.getRouter());

app.get('/', (req, res, next) => {
	queue.add('purchaseDomain', { domain: 'test.com' });

	res.send('Success!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));

import queue from '../queue.js';
import domains from './domains.js';

const registerProcessors = processors =>
	processors.forEach(({ name, handler }) => {
		queue.process(name, handler);
		console.log(`${name} processor registered`);
	});

const processors = [
	{ name: 'purchaseDomain', handler: domains.purchaseDomainHandler },
	{ name: 'setupCloudflare', handler: domains.setupCloudflareHandler },
	{ name: 'pointNameservers', handler: domains.pointNameserversHandler },
];

export { registerProcessors, processors };

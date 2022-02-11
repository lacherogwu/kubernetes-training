import queue from '../queue.js';
import { purchaseDomain, setupCloudflare, pointNameservers } from '../api.js';

const purchaseDomainHandler = async job => {
	const { data } = job;
	const { domain } = data;

	await purchaseDomain(domain);
	console.log(`Purchase domain successfully! (${domain})`);
	queue.add('setupCloudflare', { domain }, { attempts: 50, backoff: 1000 });
};

const setupCloudflareHandler = async job => {
	const { data } = job;
	const { domain } = data;

	await setupCloudflare(domain);
	console.log(`Setup Cloudflare successfully! (${domain})`);
	queue.add('pointNameservers', { domain, nameservers: ['ns1.google.com', 'ns2.google.com'] }, { attempts: 50, backoff: 1000 });
};

const pointNameserversHandler = async job => {
	const { data } = job;
	const { domain, nameservers } = data;

	await pointNameservers(domain, nameservers);
	throw new Error('Server is down');
	console.log(`Pointed Nameservers successfully! (${domain})`);
	queue.add('setupSendgrid', { domain }, { attempts: 50, backoff: 1000 });
};

export default {
	purchaseDomainHandler,
	setupCloudflareHandler,
	pointNameserversHandler,
};

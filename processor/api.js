import axios from 'axios';

const purchaseDomain = domain => instance.post('/purchaseDomain', { domain });
const setupCloudflare = domain => instance.post('/setupCloudflare', { domain });
const pointNameservers = (domain, nameservers) => instance.post('/pointNameservers', { domain, nameservers });
const setupSendgrid = domain => instance.post('/setupSendgrid', { domain });
const authenticateSendgridDomain = domain => instance.post('/authenticateSendgridDomain', { domain });

const instance = axios.create({
	baseURL: 'https://webhook.site/fdffa8e1-32da-4843-a111-560c49cc99a9',
});

const onFulfilled = response => {
	const { data } = response;
	return data;
};
instance.interceptors.response.use(onFulfilled);

export { purchaseDomain, setupCloudflare, pointNameservers, setupSendgrid, authenticateSendgridDomain };

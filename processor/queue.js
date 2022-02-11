import Bull from 'bull';
const queue = new Bull('tasks', { redis: { host: 'redis', port: 6379 } });

export default queue;

import { registerProcessors, processors } from './processors/index.js';

console.log('Processor is up');
registerProcessors(processors);

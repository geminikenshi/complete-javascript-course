// Importing module
import './shoppingCart.js';
console.log('Importing module');
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const agent = {
  name: {
    first: 'James',
    last: 'Cool',
  },
  information: {
    bloodtype: 'O',
    age: 35,
  },
};

const agentClone = cloneDeep(agent);
agent.information.age -= 10;

console.log(agent);
console.log(agentClone);

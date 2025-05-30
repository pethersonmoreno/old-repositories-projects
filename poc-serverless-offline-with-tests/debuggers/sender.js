import { sender } from '../src/handler';

const event = 'teste';
const context = { invokedFunctionArn: 'kk:teste:kk:df:hu:ss' };
const callback = null;
sender(event, context, callback);

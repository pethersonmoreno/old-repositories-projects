const Koa = require("koa");
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('koa-route');
const validateTask = require('validator-task');

const app = (module.exports = new Koa());

app.use(cors());
app.use(bodyParser());

app.use(router.get('/', async function (ctx) {
  ctx.body = "API Working";
}));

app.use(router.post('/validateTask', async function (ctx) {
  const task = ctx.request.body;
  try {
    await validateTask(task);
    ctx.status = 200;
    ctx.body = "Task OK";
  } catch (error) {
    ctx.status = 400;
    ctx.body = "Invalid Task";
  }
}));

if (!module.parent) {
  const port = 3001;
  app.listen(port);
  console.log("Listening in http://0.0.0.0:" + port);
}

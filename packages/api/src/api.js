const Koa = require("koa");
const app = (module.exports = new Koa());

app.use(async function(ctx) {
  ctx.body = "Hello World";
});

if (!module.parent) {
  const port = 3000;
  app.listen(port);
  console.log("Listening in http://0.0.0.0:" + port);
}

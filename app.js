const Koa = require("koa");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const KoaRouter = require("koa-router");

const PORT = 5000;
const app = new Koa();
const router = new KoaRouter();

app.use(json());
app.use(bodyParser());

var data = [
  { id: 1, name: "Imasha" },
  { id: 2, name: "Kuruppu" },
];

router.get("/", read);
router.post("/add", add);
router.put("/update", update);
router.delete("/delete", deleteData);

async function read(ctx) {
  ctx.body = data;
}

async function add(ctx) {
  var uin = ctx.request.body;
  data.push(uin);
  ctx.body = "data added";
}

async function update(ctx) {
  let uIn = ctx.request.body;
  const index = data.findIndex((e) => e.id === uIn.id);
  let messege;

  if (index === -1) {
    data.push(uIn);
    messege = "data added";
  } else {
    data[index] = uIn;
    messege = "data updated";
  }
  ctx.body = messege;
}

async function deleteData(ctx) {
  let uin = ctx.request.body;
  const index = data.findIndex((e) => {
    e.id === uin.id;
  });
  let messege;

  if (index === -1) {
    messege = "user not found";
  } else {
    delete data[index];
    messege = "user deleted";
  }

  ctx.body = messege;
}

app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, console.log(`Server running on port ${PORT}`));

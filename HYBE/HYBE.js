const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// HYBE所属グループデータ
let items = [
  // Big Hit Entertainment
  {
    id: 1,
    name: "BTS",
    debut: "2013",
    label: "Big Hit Entertainment",
    category: "Boy Group",
    description: "世界的に有名な7人組ボーイズグループ。",
    image: "bts.jpg"
  },
  {
    id: 2,
    name: "TXT",
    debut: "2019",
    label: "Big Hit Entertainment",
    category: "Boy Group",
    description: "5人組ボーイズグループ。BTSの後継者として活動中。",
    image: "txt.jpg"
  },
   // Belift Lab
  {
    id: 3,
    name: "ENHYPEN",
    debut: "2020",
    label: "Belift Lab",
    category: "Boy Group",
    description: "I-LANDから選ばれた7人のボーイズグループ。",
    image: "enhypen.jpg"
  },
  // Ador
  {
    id: 4,
    name: "NewJeans",
    debut: "2022",
    label: "Ador",
    category: "Girl Group",
    description: "Ador傘下のガールズグループ。Y2K美学を特徴としている。",
    image: "newjeans.jpg"
  },
  // Source Music
  {
    id: 5,
    name: "LE SSERAFIM",
    debut: "2022",
    label: "Source Music",
    category: "Girl Group",
    description: "Source Music傘下のガールズグループ。",
    image: "lesserafim.jpg"
  },
  // SEVENTEEN
  {
    id: 6,
    name: "SEVENTEEN",
    debut: "2015",
    label: "HYBE",
    category: "Boy Group",
    description: "13人組ボーイズグループ。自主制作アイドルとして有名。",
    image: "seventeen.jpg"
  }

];

// 一覧表示
app.get("/items", (req, res) => {
  res.render("items", { data: items });
});

// Create（入力画面）
app.get("/items/create", (req, res) => {
  res.render("items_create");
});

// 詳細表示
app.get("/items/:number", (req, res) => {
  const number = req.params.number;
  const detail = items[number];
  res.render("items_detail", { id: number, data: detail });
});

// Create（登録）
app.post("/items", (req, res) => {
  const id = items.length + 1;
  const name = req.body.name;
  const debut = req.body.debut;
  const label = req.body.label;
  const category = req.body.category;
  const description = req.body.description;
  const image = req.body.image;
  
  items.push({
    id: id,
    name: name,
    debut: debut,
    label: label,
    category: category,
    description: description,
    image: image
  });
  res.render("items", { data: items });
});

// Edit
app.get("/items/edit/:number", (req, res) => {
  const number = req.params.number;
  res.render("items_edit", { id: number, data: items[number] });
});

// Update
app.post("/items/update/:number", (req, res) => {
  items[req.params.number].name = req.body.name;
  items[req.params.number].debut = req.body.debut;
  items[req.params.number].label = req.body.label;
  items[req.params.number].category = req.body.category;
  items[req.params.number].description = req.body.description;
  items[req.params.number].image = req.body.image;

  res.redirect("/items");
});

// Delete
app.get("/items/delete/:number", (req, res) => {
  items.splice(req.params.number, 1);
  res.redirect("/items");
});

app.listen(8080, () => {
  console.log("HYBE app listening on port 8080!");
});
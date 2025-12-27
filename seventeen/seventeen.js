const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// SEVENTEENイベントデータ
let items = [
  {
    id: 1,
    title: "SEVENTEEN WORLD TOUR [BE THE SUN]",
    date: "2024-06-15",
    location: "東京ドーム",
    category: "Concert",
    description: "SEVENTEENの日本ツアー東京公演。自主制作アイドルとしての圧倒的なパフォーマンスをお届けします。",
    image: "concert1.jpg"
  },
  {
    id: 2,
    title: "CARAT LAND 2024",
    date: "2024-08-20",
    location: "幕張メッセ",
    category: "Fan Meeting",
    description: "ファンミーティング。CARATs（ファン）との特別な時間を過ごします。",
    image: "fanmeeting.jpg"
  },
  {
    id: 3,
    title: "SEVENTEEN FOLLOW TOUR",
    date: "2024-09-10",
    location: "京セラドーム大阪",
    category: "Concert",
    description: "新アルバム「SEVENTEENTH HEAVEN」を引っ提げた日本ツアー大阪公演。",
    image: "concert2.jpg"
  }
];

// 一覧表示
app.get("/items", (req, res) => {
  res.render("items", { data: items });
});

// 新規作成画面
app.get("/items/create", (req, res) => {
  res.render("items_create");
});

// 詳細表示
app.get("/items/:number", (req, res) => {
  const number = Number(req.params.number);
  const detail = items[number];
  res.render("items_detail", { id: number, data: detail });
});

// 登録処理
app.post("/items", (req, res) => {
  const id = items.length + 1;
  const title = req.body.title;
  const date = req.body.date;
  const location = req.body.location;
  const category = req.body.category;
  const description = req.body.description;
  const image = req.body.image;
  
  items.push({
    id: id,
    title: title,
    date: date,
    location: location,
    category: category,
    description: description,
    image: image
  });
  res.redirect("/items");
});

// 編集画面表示
app.get("/items/edit/:number", (req, res) => {
  const number = Number(req.params.number);
  res.render("items_edit", { id: number, data: items[number] });
});

// 更新処理
app.post("/items/update/:number", (req, res) => {
  const number = Number(req.params.number);
  items[number].title = req.body.title;
  items[number].date = req.body.date;
  items[number].location = req.body.location;
  items[number].category = req.body.category;
  items[number].description = req.body.description;
  items[number].image = req.body.image;

  res.redirect("/items");
});

// 削除処理
app.get("/items/delete/:number", (req, res) => {
  items.splice(Number(req.params.number), 1);
  res.redirect("/items");
});

app.listen(8080, () => {
  console.log("SEVENTEEN app listening on port 8080!");
});
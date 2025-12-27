const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let items = [
  {
    id: 1,
    title: "景福宮 夜間観覧",
    date: "2024-05-01",
    location: "ソウル・鐘路",
    category: "Palace",
    description: "ライトアップされた古宮を夜間公開。伝統と夜景を楽しめる人気スポット。",
    image: "gyeongbokgung_night.jpg"
  },
  {
    id: 2,
    title: "漢江ピクニック",
    date: "2024-06-10",
    location: "ソウル・汝矣島",
    category: "Park",
    description: "漢江沿いでチキンとビールを楽しむソウル市民の定番レジャー。",
    image: "hangang_picnic.jpg"
  },
  {
    id: 3,
    title: "聖水洞カフェ巡り",
    date: "2024-07-05",
    location: "ソウル・聖水",
    category: "Cafe",
    description: "リノベ倉庫カフェや雑貨店が集まるトレンドエリアを散策。",
    image: "seongsu_cafe.jpg"
  },
  {
    id: 4,
    title: "南山タワー夜景",
    date: "2024-05-20",
    location: "ソウル・南山",
    category: "View",
    description: "ケーブルカーで南山へ。ソウルの夜景とカップルの錠前スポットが有名。",
    image: "namsan_tower.jpg"
  },
  {
    id: 5,
    title: "釜山海雲台ビーチ",
    date: "2024-08-12",
    location: "釜山・海雲台",
    category: "Beach",
    description: "韓国屈指のビーチリゾート。夜は屋台ストリートで海鮮も楽しめる。",
    image: "haeundae_beach.jpg"
  },
  {
    id: 6,
    title: "済州島オルレトレッキング",
    date: "2024-09-18",
    location: "済州島",
    category: "Nature",
    description: "海岸線や火山地形を歩くオルレコース。絶景と郷土グルメを満喫。",
    image: "jeju_olle.jpg"
  },
  {
    id: 7,
    title: "全州韓屋村散策",
    date: "2024-05-30",
    location: "全州",
    category: "Traditional",
    description: "韓屋が連なる古い街並みでビビンバやマッコリを楽しむ日帰り旅。",
    image: "jeonju_hanok.jpg"
  },
  {
    id: 8,
    title: "広蔵市場 食べ歩き",
    date: "2024-06-22",
    location: "ソウル・鐘路5街",
    category: "Market",
    description: "麻薬キンパやピンデトッなど屋台グルメ天国。ローカル感を味わえる市場。",
    image: "gwangjang_market.jpg"
  },
  {
    id: 9,
    title: "DMZ ツアー",
    date: "2024-07-25",
    location: "坡州",
    category: "History",
    description: "非武装地帯を巡る平和学習ツアー。臨津閣やトンネル見学が含まれる。",
    image: "dmz_tour.jpg"
  },
  {
    id: 10,
    title: "雪岳山 紅葉ハイキング",
    date: "2024-10-15",
    location: "江原道・雪岳山",
    category: "Mountain",
    description: "秋の紅葉が圧巻の国立公園。ロープウェイと登山で絶景を堪能。",
    image: "seoraksan_fall.jpg"
  }
];

// 一覧
app.get("/items", (req, res) => {
  res.render("items", { data: items });
});

// 新規作成画面
app.get("/items/create", (req, res) => {
  res.render("items_create"); 
});

// 詳細
app.get("/items/:number", (req, res) => {
  const idx = req.params.number;
  const detail = items[idx];
  res.render("items_detail", { id: idx, data: detail });
});

// 登録
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
  res.render("items", { data: items });
});

// 編集フォーム
app.get("/items/edit/:number", (req, res) => {
  const idx = req.params.number;
  res.render("items_edit", { id: idx, data: items[idx] });
});

// 更新
app.post("/items/update/:number", (req, res) => {
  const idx = req.params.number;
  
  items[idx].title = req.body.title;
  items[idx].date = req.body.date;
  items[idx].location = req.body.location;
  items[idx].category = req.body.category;
  items[idx].description = req.body.description;
  items[idx].image = req.body.image;

  res.redirect("/items");
});

// 削除
app.get("/items/delete/:number", (req, res) => {
  items.splice(req.params.number, 1);
  res.redirect("/items");
});

app.listen(8080, () => {
  console.log("Korea spots app listening on port 8080!");
});
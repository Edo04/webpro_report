# 開発者用仕様書(仮)

### 対象システム

- SEVENTEEN イベント一覧システム
- HYBE 事務所・グループ構成一覧システム
- 韓国おすすめスポット紹介システム

### SEVENTEEN イベント一覧システム

#### 概要

本システムは，K-POP アイドルグループ SEVENTEEN のライブやコラボなどのイベント情報をわかりやすく一覧表示し，利用者が必要な情報を確認・共有できるようにするための Web アプリケーションである．

#### データ構造

| 項目        | データ型 | 必須 | 説明                            |
| ----------- | -------- | ---- | ------------------------------- |
| id          | number   | 必須 | イベント識別 ID                 |
| title       | string   | 必須 | イベント名                      |
| date        | string   | 必須 | 開催日（YYYY-MM-DD）            |
| location    | string   | 任意 | 開催場所                        |
| category    | string   | 任意 | Fanmeeting / Concert などの種別 |
| description | string   | 任意 | イベント説明                    |
| image       | string   | 任意 | 画像ファイル名                  |

#### ページ構造

##### 1. 一覧ページ（Item 一覧）

- **URL**：`/items`
- **HTTP メソッド**：GET
- **目的**：登録されているイベント情報（items）の一覧を表示する
- **表示内容例**：
  - イベント名（title）
  - 開催日（date）
  - 開催場所（location）
- **遷移先**：
  - 詳細ページ `/items/:id`
  - 新規作成ページ `/items/new`

---

##### 2. 詳細ページ（Item 詳細）

- **URL**：`/items/:id`
- **HTTP メソッド**：GET
- **目的**：指定されたイベント（item）の情報の詳細を表示する
- **表示内容例**：
  - イベント名
  - 開催日
  - 開催場所
  - 種別（category）
  - 説明文（description）
  - 画像（image）
- **遷移先**：
  - 編集ページ `/items/:id/edit`
  - 削除（POST `/items/:id/delete`）
  - 一覧 `/items`

---

##### 3. 新規作成ページ（Item 登録）

- **URL（表示）**：`/items/new`
- **HTTP メソッド（表示）**：GET
- **URL（登録処理）**：`/items`
- **HTTP メソッド（登録処理）**：POST
- **目的**：新しいイベント情報をフォーム入力して新規作成する
- **フォーム内容**：
  - title
  - date
  - location
  - category
  - description
  - image
- **遷移先**：
  - 登録成功 → `/items`（一覧ページへ）

---

##### 4. 編集ページ（Item 編集）

- **URL（表示）**：`/items/:id/edit`
- **HTTP メソッド（表示）**：GET
- **URL（編集処理）**：`/items/:id/edit`
- **HTTP メソッド（編集処理）**：POST
- **目的**：既に登録されているイベント情報を編集する
- **フォーム内容**：
  - title
  - date
  - location
  - category
  - description
  - image
- **遷移先**：
  - 編集成功 → `/items/:id`（詳細ページへ）

---

##### 5. 削除処理（Item 削除）

- **URL**：`/items/:id/delete`
- **HTTP メソッド**：POST
- **目的**：指定したイベントデータを削除する
- **遷移先**：
  - 削除成功 → `/items`（一覧ページ）

---

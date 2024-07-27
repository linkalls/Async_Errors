カスタムエラーハンドラ追加してみる
```js
app.use((err, req, res, next) => {
  console.log(err.name) //* validationError とか castError が返ってくる
  next(err)
})
```

validationErrorのとき

```js

const handleValidationErr = (err)=>{
  console.log(err)
  return err
}

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    err = handleValidationErr(err); // ValidationErrorの場合、カスタムエラーハンドリングを行う
  }
  next(err); // エラーを次のミドルウェアに渡す
});
```

schema設定時にrequired: 配列　とすればカスタムエラーメッセージが書ける

```js

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '商品名は必須です']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['果物', '野菜', '乳製品']
    }
});
```
これを踏まえて

```js

const handleValidationErr = (err)=>{
  console.log(err)
  return new AppError(`入力内容に誤りがあります...${err.message}`,400)
}

```
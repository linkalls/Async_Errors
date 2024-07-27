asyncの場合はerrorを渡すときにルーティングのasync関数定義時にnextも一緒に引数で受け取ってnext(new AppError())のようにしなければならない

mongooseやコードの使い方がミスってた時はこれじゃきついよね(requiredのものを書かなかったときとか)
**tryCatch**を使う
**例**
```javascript


app.post("/products", async(req,res,next) => {
try {
    const newProduct = new Product(req.body)
    await newProduct.save()
 res.redirect(`/products/${newProduct._id}`)
}catch(e) {
next(e) //* nextがエラー付きで呼ばれる
}
})
```

### これめんどいよね
だから関数を関数として受け取る関数を作る(高階関数)
受け取った関数を呼んで問題が起きたらnextを呼ぶ

さっきのコードを例に

```js
async(req,res,next) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
 res.redirect(`/products/${newProduct._id}`)
next(e) //* nextがエラー付きで呼ばれる
}　

```
これを呼ぶ関数を作る

```js
function wrapAsync(fn) {
  return function(req,res,next){ //* また関数を戻す
    fn(req,res,next).catch((e)=>next(e)) 
    //* asyncだからpromiseを返してるはず
  }
}

```
これを使うと
```js
app.get("/products/:id",wrapAsync(async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
    if (!product) {
      throw new AppError("商品が見つかりません", 404)
    }
    res.render("products/show", { product })
  })
)
```
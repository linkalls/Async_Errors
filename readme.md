asyncの場合はerrorを渡すときにルーティングのasync関数定義時にnextも一緒に引数で受け取ってnext(new AppError())のようにしなければならない

mongooseやコードの使い方がミスってた時はこれじゃきついよね(requiredのものを書かなかったときとか)
tryCatchを使う
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
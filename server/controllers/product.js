const Product = require('../models/product');
const User = require('../models/user');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
};

exports.allList = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subs')
    .sort([['createdAt', 'desc']])
    .exec();
  res.json(products);
};

exports.read = async (req, res) => {
  let product = await Product.findOne({ slug: req.params.slug })
    .populate('category')
    .populate('subs')
    .exec();
  res.json(product);
}

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log('product update error ----> ', err);
    res.status(400).json({
      err: err.message,
    });
  }
}

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send('product deleted failed');
  }
};


// ページネーションがない場合
// exports.list = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate('category')
//       .populate('subs')
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };
// ページネーションがある場合
exports.list = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3; // 3
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
}

// レビュー情報を書き換える
exports.productStar = async (req, res) => {
  // 商品Id取得
  const  product = await Product.findById(req.params.productId).exec();
  // ユーザー情報取得
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // 誰が更新したか
  // 正しくログインしたユーザーが商品にレビューを加えたか確認
  let exisitingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // レビューから離れていないユーザーだったらこの処理を入れる
  if (exisitingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log('ratingAdded', ratingAdded);
    res.json(ratingAdded);
  } else {
    // もしユーザーがすでにレビューから離れていたら更新
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: exisitingRatingObject },
      },
      { $set: { 'ratings.$.star': star } },
      { new : true }
    ).exec();
    console.log('ratingUpdated', ratingUpdated);
    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
  .limit(3)
  .populate('category')
  .populate('subs')
  .populate('postedBy')
  .exec()

  res.json(related);
}

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1]
      }
    })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }

};

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products)
};

exports.searchFilter = async (req, res) => {
  const { query, price } = req.body;

  if (query) {
    console.log('query-->', query);
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    console.log('price-->', price);
    await handlePrice(req, res, price);
  }
};

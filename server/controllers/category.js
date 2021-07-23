const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.list = async (req, res) => {
  res.json(await Category.find({}).exec());
};

exports.read = async (req, res) => {
  res.json(await Category.findOne({ slug: req.params.slug }).exec());
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send('category updated failed');
  }
}

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send('category deleted failed');
  }
};

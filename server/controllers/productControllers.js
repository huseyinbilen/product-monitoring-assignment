const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json({
      status: "success",
      desc: "Product Created",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.body._id);

    product.productName = req.body.productName;
    product.productCategory = req.body.productCategory;
    product.productAmount = req.body.productAmount;
    product.amountUnit = req.body.amountUnit;
    product.company = req.body.company;

    await product.save();

    res.status(200).json({
      status: "success",
      desc: "Product Updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.body._id);

    if (product) {
      res.status(200).json({
        status: "success",
        desc: "Product Delete",
      });
    }
    else {
      res.status(400).json({
        status: "fail",
        desc: "Product Not Found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

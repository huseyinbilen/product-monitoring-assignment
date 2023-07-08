const Company = require("../models/Company");

exports.addCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(200).json({
      status: "success",
      desc: "Company Created",
      company
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.body._id);

    company.companyName = req.body.companyName;
    company.companyLegalNumber = req.body.companyLegalNumber;
    company.incorporationCountry = req.body.incorporationCountry;
    company.website = req.body.website;

    await company.save();

    res.status(200).json({
      status: "success",
      desc: "Company Updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    let company = await Company.findByIdAndDelete(req.body._id);

    if (company) {
      res.status(200).json({
        status: "success",
        desc: "Company Delete",
      });
    }
    else {
      res.status(400).json({
        status: "fail",
        desc: "Company Not Found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    let company = await Company.findById(req.params.id);

    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    let companies = await Company.find();
    res.status(200).json({
      companies,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

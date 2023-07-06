const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyLegalNumber: {
    type: String,
    required: true,
    unique: true,
  },
  incorporationCountry: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;
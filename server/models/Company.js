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

CompanySchema.pre('save', function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;
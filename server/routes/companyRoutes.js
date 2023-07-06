const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companyControllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/add').post(authMiddleware, companyController.addCompany);
router.route('/update').post(authMiddleware, companyController.updateCompany);
router.route('/delete').delete(authMiddleware, companyController.deleteCompany);
router.route('/get-company/:id').get(authMiddleware, companyController.getCompany);
router.route('/get-companies').get(authMiddleware, companyController.getAllCompanies);

module.exports = router;
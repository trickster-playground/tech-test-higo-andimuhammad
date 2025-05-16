const express = require('express');
const router  = express.Router();
const User    = require('../models/User');

/* -------------------------------------------------------------------------- */
/*                                Swagger tags                                */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: End‑point data user / login analytics
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         Number:           { type: integer, example: 1 }
 *         Name_of_Location: { type: string,  example: "The Rustic Tavern" }
 *         Date:             { type: string,  example: "12/7/2023" }
 *         Login_Hour:       { type: string,  example: "16:07" }
 *         Name:             { type: string,  example: "Francesca Spendlove" }
 *         Age:              { type: integer, example: 1978 }
 *         gender:           { type: string,  example: "Female" }
 *         Email:            { type: string,  example: "fspendlove0@eventbrite.com" }
 *         No_Telp:          { type: string,  example: "829‑817‑4593" }
 *         Brand_Device:     { type: string,  example: "Samsung" }
 *         Digital_Interest: { type: string,  example: "Social Media" }
 *         Location_Type:    { type: string,  example: "urban" }
 */

/* -------------------------------------------------------------------------- */
/*                               GET /api/users                               */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get up to 1 000 user records (non‑paginated)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Array of user objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().limit(1000).lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------------------------------------------------------- */
/*                          GET /api/users/paginated                          */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /api/users/paginated:
 *   get:
 *     summary: Get users with pagination
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, example: 1 }
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 1000, example: 100 }
 *         description: Rows per page
 *     responses:
 *       200:
 *         description: Paginated users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:       { type: array,  items: { $ref: '#/components/schemas/User' } }
 *                 total:      { type: integer }
 *                 page:       { type: integer }
 *                 totalPages: { type: integer }
 */
router.get('/users/paginated', async (req, res) => {
  const page  = Math.max(parseInt(req.query.page)  || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 100, 1), 1000);

  try {
    const [data, total] = await Promise.all([
      User.find().skip((page - 1) * limit).limit(limit).lean(),
      User.countDocuments()
    ]);

    res.json({ data, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------------------------------------------------------- */
/*                   GET /api/users/analytics/gender chart                    */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /api/users/analytics/gender:
 *   get:
 *     summary: Get gender distribution
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Array of gender counts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:   { type: string,  example: "Female" }
 *                   count: { type: integer, example: 500000 }
 */
router.get('/users/analytics/gender', async (req, res) => {
  try {
    const result = await User.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } },
      { $sort:  { count: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
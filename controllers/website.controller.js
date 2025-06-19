const {Blog} = require('../models/blogs'); // Adjust path as needed
const {Feedback} = require('../models'); // Adjust path as needed
const {EarlyAccess} = require('../models'); // Adjust path as needed

// /controllers/website.controller.js

// Get list of blogs
exports.findAll = async (req, res) => {
  try {
    const {category} = req.query;
    let where = {};
    if (category) {
      where.category = category;
    }
    // Get all blogs (optionally filtered by category)
    const blogs = await Blog.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    // Get top 4 most viewed blogs (optionally filtered by category)
    const topViewedBlogs = await Blog.findAll({
      where,
      order: [['view_count', 'DESC']],
      limit: 4,
    });

    res.json({
      success: true,
      data: blogs,
      topViewed: topViewedBlogs,
    });
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

// Get blog detail by ID
exports.blogDetail = async (req, res) => {
  try {
    const {slug} = req.params;
    const blog = await Blog.findOne({where: {slug}});
    if (!blog) {
      return res.status(404).json({success: false, message: 'Blog not found'});
    }
    res.json({success: true, data: blog});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

// Save a blog view
exports.saveView = async (req, res) => {
  try {
    const {blogId, userId} = req.body;

    // Increment view_count by 1
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({success: false, message: 'Blog not found'});
    }
    blog.view_count += 1;
    await blog.save();

    // Optionally save the view record if BlogView exists
    // const view = await BlogView.create({ blogId, userId });

    res.json({success: true, data: blog});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

exports.earlyAccess = async (req, res) => {
  try {
    const {email} = req.body;
    // Save email to EarlyAccess table
    await EarlyAccess.create({email});
    res.json({
      success: true,
      message: 'Thank you for signing up for early access!',
    });
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

// Update contactUs to save feedback
exports.contactUs = async (req, res) => {
  try {
    const {name, phone, email, message} = req.body;

    // Save feedback to Feedback table
    await Feedback.create({name, phone, email, message});

    res.json({
      success: true,
      message: 'Your message has been received. We will contact you soon.',
    });
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
};

const express = require('express');
const router = express.Router();
const MenuItem = require('../schemas/menuItemsSchema'); // Import MenuItem schema



// Like a Menu Item
router.post('/like/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params._id);
        if (!menuItem) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        menuItem.likes += 1;  // Increment like count
        await menuItem.save();
        res.json({ success: true, likes: menuItem.likes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Dislike a Menu Item
router.post('/dislike/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        menuItem.dislikes += 1;  // Increment dislike count
        await menuItem.save();
        res.json({ success: true, dislikes: menuItem.dislikes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findbyPk(req.params.id, {
      include: [{model: Product,}]
    });
    if (!categoryData) {
      res.status(404).json({message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update({
      id: req.params.id,
      category_name: req.body.category_name
    }, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedCategory[0]) {
      res.status(404).json({message: 'No category found with this id!'});
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    };
    if (!deletedCategory) {
      res.status(404).json({message: 'No category found with this id!'});
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

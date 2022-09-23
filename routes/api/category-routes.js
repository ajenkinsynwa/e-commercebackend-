//Starter code provided by course 
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categoryData = await Category.findAll({
    include: [
      { model: Product }
    ]
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', async (req, res) => {
  Category.findOne({
    include: [{ model: Product }],
    where: {
      id: req.params.id
    },
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update({
      id: req.params.id,
      category_name: req.body.category_name
    }, {
      where: {
        id: req.params.id
      }
    });

    if (!updateCategory[0]) {
      res.status(404).json({ message: "The category cannot be found" });
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete cateory by id 
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy(
  {
    where:{ id: req.params.id 
  }
}); if(!deletedCategory) {
  res.status(404).json({ message: "The category id cannot be found"});
}
  res.status(200).json(deletedCategory);
}catch {
 res.status(500).json(error);

}
});

module.exports = router;

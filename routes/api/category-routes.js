//Starter code provided by course 
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  const categoryData = await Category.findAll({
    include: [
      { model: Product }
    ]
  });
   res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
try {
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{model: Product}]
  });
    if (!categoryData) {
      res.status(404).json({message: 'No Id found'});
      return;
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {

  try{
  const categoryData = await Category.create({
    category_name: req.body.category_name,
  });
  res.status(200).json(categoryData);
    
} catch(err) {
      
      res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
      id: req.params.id
      
    } 
    });
    res.status(200).json(categoryData);
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

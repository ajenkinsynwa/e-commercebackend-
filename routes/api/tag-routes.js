//Starter code provided by course 
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{
      model: Product,
      through: ProductTag
    }
    ]
  })
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ],
    where: {
      id: req.params.id
    }
  })
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then((tagInput) => res.json(tagInput))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'Tag Not Found' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'Tag Not Found'})
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});


module.exports = router;

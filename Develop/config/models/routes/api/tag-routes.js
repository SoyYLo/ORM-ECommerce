const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../../../../../../UTA-VIRT-FSF-PT-03-2024-U-LOLC-3/13-ORM/02-Challenge/Develop/models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [Product]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(error);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {id: req.params.id},
    include: {Product}
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: "No tage found with tis id."});
      return;
    }
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(error);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(dbTagData => res.json(dbTagData))
  .cacth(err => {
    console.log(error);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: "No tag found with this id."});
      return;
    }
    res.json({ message: "Tag successfully updated." });
  })
  .catch(err => {
    console.log(error);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {id: req.params.id}
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: "No tag found with this id"});
      return;
    }
    res.json({ message: "Tag successfully deleted."});
  })
  .catch(err => {
    console.log(error);
    res.status(500).json(err);
  });
});

module.exports = router;

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// routing the GET request 
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] // all categories included
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    // incase of error
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// routing GET request by id --> also check if the id exists
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  // incase a category with a certain id is not found
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Sorry, a Category with this id was not found!'}); 
        return; 
      }
      res.json(dbCategoryData);
    })
    // incase of error
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// routing the POST request  
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    // incase of error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});


// routing the UPDATE request --> also check if the id exists
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
  })
  // incase no category of a certain id is found
    .then(dbCategoryData => {
        if (!dbCategoryData[0]) {
            res.status(404).json({ message: 'Sorry, a category with this id was not found!'});
            return;
        }
        res.json(dbCategoryData);
  })
  // incase of error
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });

});


// routing the DELETE request by id --> also check if the id exists
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'Sorry, a category with this id was not found!'});
            return;
        }
        res.json(dbCategoryData);
  })
  // incase of error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});


module.exports = router;

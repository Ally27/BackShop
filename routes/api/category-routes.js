const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
try{
  const categoryData = await Category.findAll();
  res.status(200).json(categoryData);
}catch(err) {
  res.status(500).json( err );
}
});

router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Location.findByPk(req.params.id,{
      include:[{model: Product}]
    });
    if(!categoryData){
      res.status(404).json({ message: `No category located with id: ${id}. `});
      return;
    }
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

//creates a category
router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch (err){
    res.status(400).json(err);
  }
});

//updates
router.put('/:id', async (req, res) => {
  try{
    const categoryData = await Category.update(req.body,{
      where:{
        id: req.params.id
      }
    });
    if(!categoryData){
      res.status(404).json({message:`${id} not found`})
      return;
    }
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500)(err)
  }
});

//deletes
router.delete('/:id', async(req, res) => {
  try{
    const categoryData = await Category.destroy({
      where:{
        id: req.params.id
      }
    });
    if (!categoryData){
      res.status(404).json({ message: `No category located with id: ${id}`});
      return;
    }
    res.status(200).json(err);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;

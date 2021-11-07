const express = require('express');

// const methodOverride = require('method-override');
const router = express.Router();
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req,res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric.json')
    let preData = JSON.parse(prehistoric_creatures)
  res.render('prehistoric/index', {preData})

    // let nameFilter = req.query.nameFilter
    // if(nameFilter) {
    //     preData = preData.filter((pre) => {
    //     return pre.name.toLowerCase() === nameFilter.toLowerCase()
    //     })
    // }
    res.render('prehistoric_creatures/index.ejs', {dinoData: preData})
    console.log(preData)
})

// CREATE A NEW GET ROUTE

router.get('/new', (req, res) => {
    res.render('prehistoric/new.ejs')
})

router.get('/edit/:idx', (req, res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric.json')
    let preData = JSON.parse(prehistoric_creatures)

    res.render('prehistoric_creatures/edit.ejs', {preId: req.params.idx, pre: preData[req.params.idx]})
})

router.put('/:idx', (req,res)=> {
    let prehistoric_creatures = fs.readFileSync('./prehistoric.json')
    let preData = JSON.parse(prehistoric_creatures)

    preDATA[req.params.idx].img_url = req.body.img_url
    preDATA[req.params.idx].type = req.body.type

    fs.writeFileSync('./prehistoric.json', JSON.stringify(preData))
    res.redirect('/prehistoric')
})

// CREATE A SHOW ROUTE/SHOW VIEW FOR DISPLAYING INDEXS
router.get('/:idx', (req, res)=> {
    let prehistoric_creatures = fs.readFileSync('./prehistoric.json')
    let preData = JSON.parse(prehistoric_creatures)
    // Get Array Index from Url Parameter. Need to use "req.params" to snatch it from the request
    let preIndex = req.params.idx
    console.log(preData[preIndex])
    res.render('prehistoric_creatures/show.ejs', {myPre: preData[preIndex]})
})

// POST ROUTES
router.post('/', (req,res) => {
    // READ FILE
    let prehistoric_creatures = fs.readFileSync('./prehistoric.json')
    let preData = JSON.parse(prehistoric_creatures)
    // ADD NEW DINO TO dinoData
    preData.push(req.body)
    // Save Updated dinoData
    fs.writeFileSync('./prehistoric.json', JSON.stringify(preData))
    // redict to GET /dinosaurs (index)
    res.redirect('/prehistoric')
    console.log(req.body)
})

router.delete('/:idx', (req,res) =>{
    // READ FILE
    let prehistoric_creatures = fs.readFileSync('./prehistoric.json')
    let preData = JSON.parse(prehistoric_creatures)
    let preIndex = req.params.idx
    preData.splice(req.params.idx, 1)
    fs.writeFileSync('./prehistoric.json', JSON.stringify(preData))
    res.redirect('/prehistoric')
})

module.exports = router;
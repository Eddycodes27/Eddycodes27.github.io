const express = require('express');

// const methodOverride = require('method-override');
const router = express.Router();
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
  

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter((dino) => {
        return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dinosaurs/index.ejs', {dinoData: dinoData})
    console.log(dinoData)
})

// CREATE A NEW GET ROUTE

router.get('/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

router.get('/edit/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    res.render('dinosaurs/edit.ejs', {dinoId: req.params.idx, dino: dinoData[req.params.idx]})
})

router.put('/:idx', (req,res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    dinoDATA[req.params.idx].name = req.body.name
    dinoDATA[req.params.idx].type = req.body.type
})

// CREATE A SHOW ROUTE/SHOW VIEW FOR DISPLAYING INDEXS
router.get('/:idx', (req, res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // Get Array Index from Url Parameter. Need to use "req.params" to snatch it from the request
    let dinoIndex = req.params.idx
    console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// POST ROUTES
router.post('/', (req,res) => {
    // READ FILE
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // ADD NEW DINO TO dinoData
    dinoData.push(req.body)
    // Save Updated dinoData
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redict to GET /dinosaurus (index)
    res.redirect('/dinosaurs')
    console.log(req.body)
})

router.delete('/:idx', (req,res) =>{
    // READ FILE
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.idx
    dinoData.splice(dinoIndex, 1)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

module.exports = router;
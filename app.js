const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const e = require('express');
const Item = require('./models/items');
const mongodb =
  'mongodb+srv://amanChourasia:aman12345@cluster0.wjfb5hu.mongodb.net/?retryWrites=true&w=majority';

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

// app.get('/create-item', (req, res) => {
//   const item = new Item({
//     name: 'LAptop',
//     price: 20000,
//   });
//   item.save().then(result => {
//     res.send(result);
//   });
// });

// app.get('/get-item', (req, res) => {
//   Item.findById('632a023909b7a9dde86c9c66')
//     .then(result => res.send(result))
//     .catch(err => console.log(err));
// });

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('get-items');
});
app.get('/get-items', (req, res) => {
  Item.find()
    .then(result => {
      res.render('index', { items: result });
    })
    .catch(err => console.log(err));
});

app.post('/items', (req, res) => {
  const item = Item(req.body);
  item
    .save()
    .then(() => res.redirect('/get-items'))
    .catch(err => console.log(err));
});

app.get('/items/:id', (req, res) => {
  const id = req.params.id;
  Item.findById(id).then(result => {
    //console.log(`result :  ${result}`);

    res.render('item-detail', { item: result });
  });
});

app.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id).then(result => {
    res.json({ redirect: '/get-items' });
  });
});

app.put('/items/:id', (req, res) => {
  const id = req.params.id;
  Item.findByIdAndUpdate(id, req.body).then(result => {
    res.json({ msg: 'Updated Successfully' });
  });
});

app.get('/add-item', (req, res) => {
  res.render('add-item');
});
app.use((req, res) => {
  res.render('error');
});

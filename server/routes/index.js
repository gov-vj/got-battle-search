var express = require('express');
var router = express.Router();
const Battle = require('../model/battles');

router.get('/list', async function(req, res) {
  // const data = ['list1', 'list2']
  const locations = await Battle.find({}, {location:1, _id:0}).exec()
  res.json(locations.map(({location}) => location));
});

router.get('/count', async function(req, res) {
  // const data = ['list1', 'list2']
  const count = await Battle.countDocuments({}).exec()
  res.json(count);
});

router.get('/search', async function(req, res) {
  const fields = [
    'name',
    'year',
    'battle_number',
    'attacker_king',
    'defender_king',
    'attacker_1',
    'attacker_2',
    'attacker_3',
    'attacker_4',
    'defender_1',
    'defender_2',
    'defender_3',
    'defender_4',
    'attacker_outcome',
    'battle_type',
    'major_death',
    'major_capture',
    'attacker_size',
    'defender_size',
    'attacker_commander',
    'defender_commander',
    'summer',
    'location',
    'region',
    'note',
  ];

  const query = [];

  try {
    for(let key in  req.query) {
      key_lc = key.trim().split(/\ +/).join('_').toLowerCase();
      const subquery = [];
      let isValidSubQuery = false;
      fields.forEach(field => {
        if(key_lc === field || field.split("_").includes(key_lc)) {
          // query[field] = req.query[key].trim();
          subquery.push({
            [field]: req.query[key].trim()
          });

          isValidSubQuery = true;
        }
      });

      if (isValidSubQuery) {
        query.push({
          $or: subquery
        });
      }
    }

    const data = await Battle.find().and(query).exec()
    res.json(data);
  } catch(e) {
    console.log(e);
    res.status(400).json([]);
  }
});

module.exports = router;

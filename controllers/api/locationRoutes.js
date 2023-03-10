const router = require('express').Router();
const { Location } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newLocation = await Location.create({
      ...req.body,
      location_id: req.session.location_id,
    });

    res.status(200).json(newLocation);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.id,
        locationId: req.session.locationId,
      },
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with this :id' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


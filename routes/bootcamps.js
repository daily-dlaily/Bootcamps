const express = require('express');
const { getBootcamps,
        getBootcamp,
        creatBootcamps,
        updateBootcamps,
        deleteBootcamps,
        getBootcampsInRadius
    } = require('../controllers/bootcamps');

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getBootcamps).post(creatBootcamps);

router.route('/:id').get(getBootcamp).put(updateBootcamps).delete(deleteBootcamps);



module.exports= router;
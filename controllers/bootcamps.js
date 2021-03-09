

const ErrorResponse = require ("../utils/errorResponse");
const asyncHandler = require("../middlewares/asynch");
const geocoder = require("../utils/geocoder");
const Bootcamp = require("../modules/Bootcamp");
//@desc        Get all bootcamps
//@route       GET api/v1/bootcamps
//@acess       public 
exports.getBootcamps = asyncHandler(async(req, res, next)=>{
  
        const bootcamp = await Bootcamp.find(req.body)
        res.status(200).json({sucess: true, count: bootcamp.length, data: bootcamp}) ;
    
});

//@desc       Get a single bootcamps
//@route      GET api/v1/bootcamps/:id
//@acess      public 
exports.getBootcamp = asyncHandler( async(req, res, next)=>{
   
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with the id ${req.params.id}`, 404));
        }
        res.status(200).json({sucess: true, data: bootcamp});
   
});


//@desc       Creat new bootcamp
//@route      POST api/v1/bootcamps
//@acess      private 
exports.creatBootcamps =asyncHandler(  async (req, res, next)=>{
  
        const bootcamp = await Bootcamp.create(req.body)
        res.status(200).json({sucess: true, data: bootcamp}) ; 
    
});

//@desc       Update  bootcamp
//@route      PUT api/v1/bootcamps/:id
//@acess      private 
exports.updateBootcamps = asyncHandler( async(req, res, next)=>{

    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{ 
        new : true,
        runValidators : true } );
        if(!bootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with the id ${req.params.id}`, 404));
        }
        res.status(200).json({ sucess: true, data:bootcamp});
    } catch (error) {
        next(error);
    }

});

//@desc        Delete  bootcamp
//@route       DELETE api/v1/bootcamps/:id
//@acess       private
exports.deleteBootcamps =asyncHandler( async(req, res, next)=>{
   
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id );
        if(!bootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with the id ${req.params.id}`, 404));
        }
        res.status(200).json({ sucess: true, data:{}});
   
});

//@desc        Get bootcamps within a redius 
//@route       GET api/v1/bootcamps/radius/:zipcode/:distance
//@acess       private
exports.getBootcampsInRadius =asyncHandler( async(req, res, next)=>{
   const {zipcode, distance } = req.params;

   // Get  lat/lng from the geocoder
   const loc = await geocoder.geocode(zipcode);
   const lat = loc[0].latitude;
   const lng = loc[0].longitude;

   //Cal raduis using radians
   // Div distance by radius of earth 
   // Earth radius = 6,378 km 
   const radius = distance/6378;


   const bootcamps= await Bootcamp.find({
       location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] }}

   });
   res.status(200).json({ sucess: true,
    count:bootcamps.length,
     data:bootcamps
    });
    

});
const path = require('path');

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Questions = require('../models/Questions');
const fileUpload = require('express-fileupload');

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user);
  let wrongArr = 0;
  // user.wrongAnswer.map((item) => {
  //   if (item == '5f8b288fe787027e18b56aa3') {
  //     wrongArr = wrongArr + 1;
  //   }
  // });
  console.log(wrongArr);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Get current logged in ID
// @route     POST /api/v1/auth/me
// @access    Private

exports.getMyID = asyncHandler(async (req, res, next) => {
  const ID = await User.findById(req.user).select('_id name role');
  res.status(200).json({
    success: true,
    data: ID,
  });
});

// @desc      Update current User Answers
// @route     put /api/v1/auth/answers
// @access    Private
exports.answers = asyncHandler(async (req, res, next) => {
  const Answer = req.body;
  let user = await User.findById(req.user)

  if (Answer.successAnswer) {
    if (user.successAnswer.includes(Answer.successAnswer)) {
      console.log('already there!');
    } else {
      console.log('added');
      user = await User.findByIdAndUpdate(req.user, {
        $push: { successAnswer: Answer.successAnswer },
      });
    }
    
  } else if (Answer.wrongAnswer) {
    if (user.wrongAnswer.includes(Answer.wrongAnswer)) {
      console.log('already there!' + Answer.wrongAnswer);
    } else {
       console.log('added' + Answer.wrongAnswer);
      user = await User.findByIdAndUpdate(req.user, {
        $push: { wrongAnswer: Answer.wrongAnswer },
      });
    }

  }
  res.status(200).json({
    success: true,
    data: Answer,
  });
})

exports.getResult = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user);

  let question = await Questions.find(req.body);
  
  let successAnswer = user.successAnswer;
  let wrongAnswer = user.wrongAnswer;

  let Success = 0;
  let Failure = 0;

  question.map(item => {
    if (successAnswer.includes(item._id)) {
      Success = Success + 1
    } else if (wrongAnswer.includes(item._id)) {
      Failure = Failure + 1
    }
  })
  

  let rate = (Success * 100) / question.length


  var litter = ''; 

  if (rate < 60) {
    litter = 'F';
  } else if (rate <= 70) {
    litter = 'D';
  } else if (rate <= 80) {
    litter = 'C'
  } else if (rate <= 90) {
    litter = 'B'
  } else if (rate <= 100) {
    litter = 'A';
  }

 

  res.status(200).json({
    success: true,
    data: { score: litter, success: Success, total: question.length },
  });
})



exports.resetChapter =  asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user);
  let question = await Questions.find(req.body);

  let successAnswer = user.successAnswer;
  let wrongAnswer = user.wrongAnswer;

    question.map(async(item) => {
      if (successAnswer.includes(item._id)) {
          user = await User.findByIdAndUpdate(req.user, {
          $pull: { successAnswer: item._id },
      });
      } else if (wrongAnswer.includes(item._id)) {
            user = await User.findByIdAndUpdate(req.user, {
          $pull: { wrongAnswer: item._id },
      });
      }
    });


  res.status(200).json({
    success: true,
  });
});



// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  // const fieldsToUpdate = {
  //   name: req.body.name,
  //   email: req.body.email,
  // };

  const user = await User.findByIdAndUpdate(req.user, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Upload photo for user
// @route     PUT /api/v1/user/:id/photo
// @access    Private
exports.UserPhotoUpload = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
    );
  }

  // // Make sure user is user owner
  // if (user.user.toString() !== req.user.id && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.params.id} is not authorized to update this user`,
  //       401
  //     )
  //   );
  //   r;
  // }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const file = req.files.file;
  // console.log(req.files);
  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }
  console.log(file);
  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${user._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await User.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

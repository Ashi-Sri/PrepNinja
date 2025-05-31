const Attempt = require("../models/Attempt");
const Exam = require("../models/Exam");
const Question = require("../models/Question");

// @route   POST /api/exams/:id/start
// @desc    Start a new exam attempt
// @access  Private (Student)
exports.startExam = async (req, res) => {
  try {
    // Verify user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({ msg: "Only students can take exams" });
    }

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ msg: "Exam not found" });
    }

    if (!exam.isActive) {
      return res.status(400).json({ msg: "This exam is not currently active" });
    }

    // Check if user has an active attempt
    const activeAttempt = await Attempt.findOne({
      user: req.user.id,
      exam: exam._id,
      status: "in-progress",
    });

    if (activeAttempt) {
      return res.json(activeAttempt);
    }

    // Check if user can retake the exam
    if (!exam.allowRetake) {
      const completedAttempt = await Attempt.findOne({
        user: req.user.id,
        exam: exam._id,
        status: "completed",
      });

      if (completedAttempt) {
        return res
          .status(400)
          .json({ msg: "This exam does not allow retakes" });
      }
    } else {
      // Check retake time constraint
      const lastAttempt = await Attempt.findOne({
        user: req.user.id,
        exam: exam._id,
        status: "completed",
      }).sort({ endTime: -1 });

      if (lastAttempt) {
        const retakeDate = new Date(lastAttempt.endTime);
        retakeDate.setDate(retakeDate.getDate() + exam.retakeAfterDays);

        if (new Date() < retakeDate) {
          return res.status(400).json({
            msg: `You can retake this exam after ${retakeDate.toLocaleDateString()}`,
          });
        }
      }
    }

    // Create a new attempt
    const questions = await Question.find({ examId: exam._id });
    if (questions.length === 0) {
      return res.status(400).json({ msg: "No questions available for this exam" });
    }

    const newAttempt = new Attempt({
      user: req.user.id,
      exam: exam._id,
      startTime: new Date(),
    });

    const attempt = await newAttempt.save();

    res.json(attempt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   POST /api/attempts/:id/submit
// @desc    Submit answers for an attempt
// @access  Private (Student)
exports.submitAnswers = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id);

    if (!attempt) {
      return res.status(404).json({ msg: "Attempt not found" });
    }

    // Verify the attempt belongs to the user
    if (attempt.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    // Check if the attempt is still in progress
    if (attempt.status !== "in-progress") {
      return res
        .status(400)
        .json({ msg: "This attempt has already been submitted" });
    }

    const exam = await Exam.findById(attempt.exam);

     // Update answers from request
     const { answers } = req.body;
     attempt.answers = answers;
     attempt.status = "completed";
     attempt.endTime = new Date();

     // Calculate score
     let totalScore = 0;
     let maxScore = 0;
 
     for (const ans of attempt.answers) {
       const question = await Question.findById(ans.question);
       if (question) {
         maxScore += question.score;
         if (
           ans.selectedOption !== undefined &&
           question.options[ans.selectedOption] &&
           question.options[ans.selectedOption].isCorrect
         ) {
           totalScore += question.score;
         }
       }
     }
 
     // Store score as a percentage
     attempt.score = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
     attempt.isPassed = totalScore >= (exam.passingScore / 100) * maxScore;
 
     await attempt.save();
     res.json(attempt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   GET /api/users/attempts
// @desc    Get all attempts for a user
// @access  Private
exports.getUserAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({ user: req.user.id })
      .populate("exam", "title description duration passingScore")
      .sort({ startTime: -1 });

    res.json(attempts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   GET /api/attempts/:id
// @desc    Get attempt by ID
// @access  Private
exports.getAttempt = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id)
      .populate("exam", "title description duration passingScore")
      .populate("answers.question");

    if (!attempt) {
      return res.status(404).json({ msg: "Attempt not found" });
    }

    // Verify the attempt belongs to the user or user is admin/examiner
    if (
      attempt.user.toString() !== req.user.id &&
      req.user.role !== "admin" &&
      req.user.role !== "examiner"
    ) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    res.json(attempt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   GET /api/attempts/attempts/:examId
// @desc    Get all attempts for a specific exam by the current user
// @access  Private
exports.getAttemptsByExam = async (req, res) => {
  try {
    const examId = req.params.examId;

    const attempts = await Attempt.find({
      user: req.user.id,
      exam: examId,
    }).sort({ startTime: -1 });

    res.json(attempts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// And implement this function in Attempt.controller.js
exports.saveAnswersProgress = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id);
    
    if (!attempt) {
      return res.status(404).json({ msg: 'Attempt not found' });
    }
    
    // Verify the attempt belongs to the user
    if (attempt.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    
    // Update answers only, don't change status
    const { answers } = req.body;
    attempt.answers = answers;
    
    await attempt.save();
    
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

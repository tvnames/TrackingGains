const router = require("express").Router();

const db = require("../models/Workout");

router.get("/workouts", async (req, res) => {
  try {
    const lastWorkout = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ]);
    res.status(200).json(lastWorkout);
  } catch (error) {
    res.status(500);
  }
});

router.get("/workouts/range", async (req, res) => {
  try {
    const lastWorkout = await db.Workout.find({}).limit(5).sort({ _id: -1 });
    const findWorkoutRange = lastWorkout.reverse();
    res.status(200).json(findWorkoutRange);
  } catch (error) {
    res.status(500);
  }
});

router.put("/workouts/:id", async (req, res) => {
  try {
    const newWorkout = await db.Workout.findById(req.params.id, {
      $push: { exercises: req.body },
    });
    res.status(200).json(newWorkout);
  } catch (error) {
    res.status(500);
  }
});

router.post("/workouts", async (req, res) => {
  try {
    const newWorkout = await db.Workout.create(req.body);
    res.status(200).json(newWorkout);
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;

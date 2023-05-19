const sessionHandler = require('../config/sessionHandler');
const getUser = require('../models/signUPModel');
const workSCH = require('../models/WorkoutModel');
const getWorkout = require('../models/exerciseDemoModel');
const workoutSchedule = [];
let sessionUserName = ''

//First check whether a schdule is available for the user. If not create a schedule by reading user goal and bmi
exports.createSchdule = async (req, res) => {

    sessionUserName = sessionHandler.getSessionName();
    console.log('User name is (in WC) : ' + sessionUserName)

    //CRUDs ->Read
    const User = await getUser.findOne({ userName: sessionUserName });
    console.log('User name is (test2) : ' + User.userName)

    const getScheduleID = User.mySchedule;
    

    try {
        console.log('Passing Bravo')
        if (getScheduleID !== 'N/A') {
            //If mySchdule is present, read the property for schduleID and search database for workoutSchedules collection. 
            //Then return the workout schedule as json
            console.log('Passing Bravo-schedule found')
            //CRUDs ->Read
            try {
                const schduleRet = await workSCH.findOne({ userID:User._id});
                console.log(schduleRet)
                res.status(201).json(schduleRet);
            } catch (error) {
                
            }
            

        } else {
            //Creates a workout schedule, stores it in a model, and then assign userID and saves it in the mongoDB.
            //Then it returns the workout schedule as a JSON object. 
            console.log('Passing Bravo- Automating a schedule')
            try {

                //read user goal and bmi
                const userGoal = User.goal;
                console.log("User goal" + userGoal)
                //retirve exercises according to the user goal.
                // Strength -> get the exercises that has Strength as primary goal
                // WeightLoss -> get the exercises that has WeightLoss as primary goal.
                //CRUDs ->Read
                const FitnessArray = await getWorkout.find({ primaryGoal: userGoal });
                let count = 0;

                for (let i = 0; count < 11; i++) {

                    const exercise = FitnessArray[i];
                    const muscle = exercise.muscle;
                    let chestNo = 0;
                    let BicepsNo = 0;
                    let HamstringNo = 0;
                    let TricepNo = 0;
                    let LateralNo = 0;
                    let BackNo = 0;
                    let TrapsNo = 0;
                    let ShouldersNo = 0;
                    let QuadsNo = 0;
                    let CompoundNo = 0;


                    switch (muscle) {
                        case 'Chest':
                            if (chestNo === 0) {

                                if (chestNo === 1) {
                                    break;
                                } else {
                                    workoutSchedule.push(exercise.workoutName);
                                    count++;
                                    chestNo = 1;
                                }
                            }
                            break;
                        case 'Biceps':
                            if (BicepsNo === 0) {


                                if (BicepsNo === 1) {
                                    break;
                                } else {
                                    workoutSchedule.push(exercise.workoutName);
                                    count++;
                                    BicepsNo = 1;
                                }
                            }
                            break;

                        case 'Hamstring':
                            if (HamstringNo === 0) {


                                if (HamstringNo === 1) {
                                    break;
                                } else {
                                    workoutSchedule.push(exercise.workoutName);
                                    count++;
                                    HamstringNo = 1;
                                }
                            }
                            break;

                        case 'Tricep':
                            if (TricepNo === 0) {


                                if (TricepNo === 1) {
                                    break;
                                } else {
                                    workoutSchedule.push(exercise.workoutName);
                                    count++;
                                    TricepNo = 1;
                                }
                            }
                            break;

                        case 'Lateral':
                            if (LateralNo === 0) {


                                if (LateralNo === 1) {
                                    break;
                                } else {
                                    workoutSchedule.push(exercise.workoutName);
                                    count++;
                                    LateralNo = 1;
                                }
                            }
                            break;

                        case 'Back':
                            if (BackNo === 0) {


                                if (BackNo === 1) {
                                    break;
                                } else {
                                    workoutSchedule.push(exercise.workoutName);
                                    count++;
                                    BackNo = 1;
                                }
                            }
                            break;

                        case 'Traps':
                            if (TrapsNo === 0) {

                                if (TrapsNo === 1) {
                                    break;
                                } else {
                                    workoutSchedule.push(exercise.workoutName);
                                    count++;
                                    TrapsNo = 1;

                                }
                            }
                            break;

                        case 'Shoulders':
                            if (ShouldersNo === 0) {


                                if (ShouldersNo === 1) {
                                    break;
                                } else {
                                    workoutSchedule.push(exercise.workoutName);
                                    count++;
                                    ShouldersNo = 1;
                                }
                            }
                            break;

                        case 'Quads':
                            if (QuadsNo === 0) {


                                if (QuadsNo === 1) {
                                    break;
                                } else {
                                    workoutSchedule.push(exercise.workoutName);
                                    count++;
                                    QuadsNo = 1;
                                }
                            }
                            break;

                        case 'Compound':
                            if (CompoundNo === 0) {


                                if (CompoundNo === 1) {
                                    break;
                                } else {
                                    workoutSchedule.push(exercise.workoutName);
                                    count++;
                                    CompoundNo = 1;
                                }
                            }
                            break;
                    }

                }

                //Saving generated schedule to the workoutSchedule collection
                const newSchedule = new workSCH({
                    schdeleID: 'sd' + User.userName,
                    userID: User._id,
                    cardio: 10,
                    workoutsArray: workoutSchedule,
                    workOutRepArray: new Array(workoutSchedule.length).fill(15),
                    workOutSetArray: new Array(workoutSchedule.length).fill(1),

                });

                //Inserting document. CRUDs -> Create
                const schAvailable = await workSCH.findOne({schdeleID:'sd'+User.userName})
                let saveWorkoutSchedule;
                if(schAvailable === null || schAvailable === 'undefined'){

                    saveWorkoutSchedule = await newSchedule.save()

                    //Updating mySchedule ID in userDetails
    
                    const updateMyScheduleID = async () => {
                        
                          // Validating session
                          if (sessionHandler.getSessionName() !== null) {
                            const updateBody = {
                              mySchedule: 'sd' + User.userName,
                            };
                      
                            const updatedUser = await getUser.findOneAndUpdate(
                              { userName: sessionHandler.getSessionName() },
                              updateBody,
                              { new: true }
                            );
                      
                            console.log('Update function runs for myScheduleID' + sessionHandler.getSessionName() + ' ' + updatedUser.mySchedule);
                            
                          } else {
                            console.log("User is not logged in yet. Updating terminated due to validation error!");
                            res.status(401).json({ error: 'Not authorized to access account details. Please login to access your account details!' });
                          }
                       
                      };
                      
                      await updateMyScheduleID();
                      
                      

                }else{
                    saveWorkoutSchedule = schAvailable;
                }
            
              

                //Sending generated schedule as a JSON object
                res.status(201).json(saveWorkoutSchedule);

            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error at workout scheduler' });
            }
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error at workoutSchedulaerController' });
    }
}

exports.updateSchedule = async (req, res) => {
    try {

        console.log('passing alpha')
        
        const scheduleID = 'sd'+req.query.q
        console.log(scheduleID)
        //CRUDs ->Read
        console.log('passing BRAVO : '+ req.body.load)
        const updateBody = {
            workoutsArray:req.body.title,
            workOutSetArray:req.body.load,
            workOutRepArray: req.body.reps,
        }
        //CRUDs - Update
        const updatedSchedule = await workSCH.findOneAndUpdate(
            { schdeleID: scheduleID },
            updateBody,
            { new: true }
        );
        console.log('passing charlie : ' + updatedSchedule)
        
        res.status(200).json(updatedSchedule);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error at export.updatedSchedule' });
    }
}

exports.addScheduleItems = async (req, res) => {
    try {
        console.log('passing alpha')
        const scheduleID = 'sd' + req.query.q
        console.log(scheduleID)

        // CRUDs -> Read
        console.log('passing BRAVO : ' + req.body.load)

        // Retrieve the existing schedule
        const existingSchedule = await workSCH.findOne({ schdeleID: scheduleID });

        // Append the new values to the existing arrays
        const updatedWorkoutsArray = existingSchedule.workoutsArray.concat(req.body.title);
        const updatedWorkOutSetArray = existingSchedule.workOutSetArray.concat(req.body.load);
        const updatedWorkOutRepArray = existingSchedule.workOutRepArray.concat(req.body.reps);

        const updateBody = {
            workoutsArray: updatedWorkoutsArray,
            workOutSetArray: updatedWorkOutSetArray,
            workOutRepArray: updatedWorkOutRepArray,
        }

        // CRUDs - Adding Items
        const updatedSchedule = await workSCH.findOneAndUpdate(
            { schdeleID: scheduleID },
            updateBody,
            { new: true }
        );
        console.log('passing charlie : ' + updatedSchedule)

        res.status(200).json(updatedSchedule);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error at export.updatedSchedule' });
    }
}


exports.deleteSchedule = async (req,res) => {
    try {

        const scheduleID = 'sd'+req.query.q
        //CRUDs ->Read
        

        //CRUDs - Delete
        await workSCH.findOneAndDelete(
            { schdeleID: scheduleID }
        );
        console.log("Workout schedule deleted!")

        const updateBody = {
           mySchedule:"N/A"
        }

        //Update userDetails-> MySchedule to "N/A"
        await getUser.findOneAndUpdate(
            { userName: req.query.q },
            updateBody,
            { new: true }
        );

            res.status(201).json({ message: 'Schedule deleted' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error at delete user' });
    }


}

exports.searchWorkoutAdmin = async(req,res) =>{
    try {
        const query = req.query.q;
        const results = await workSCH.find({ $text: { $search: query } });
        console.log('Workout data retrived from admin search ')

        res.status(201).json(results);
    } catch (error) {
        console.error(error);
    }
}



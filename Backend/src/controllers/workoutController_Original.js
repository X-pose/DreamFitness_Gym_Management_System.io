const sessionHandler = require('../config/sessionHandler');
const getUser = require('../models/signUPModel');
const workSCH = require('../models/WorkoutSchedulerModel_Original');
const getWorkout = require('../models/exerciseJeewaModel');
const workoutSchedule = [] ;
let sessionUserName = ''

//First check whether a schdule is available for the user. If not create a schedule by reading user goal and bmi
exports.createSchdule = async(req,res)=>{

    sessionUserName = sessionHandler.getSessionName();
    console.log('User name is (in WC) : ' + sessionUserName)
    
    //CRUDs ->Read
    const User = await getUser.findOne({ userName: sessionUserName});
    console.log('User name is (test2) : ' + User.userName)
     
    const getScheduleID = User.mySchedule;

    try {
    
        if(User.mySchedule != '11'){
            //If mySchdule is present, read the property for schduleID and search database for workoutSchedules collection. 
            //Then return the workout schedule as json
            
            //CRUDs ->Read
            const schduleRet = await workSCH.findOne({schdeleID : User.mySchedule});
            res.status(201).json(schduleRet);
             
        }else{
            //Creates a workout schedule, stores it in a model, and then assign userID and saves it in the mongoDB.
            //Then it returns the workout schedule as a JSON object. 

            try {
                //read user goal and bmi
                const userGoal = User.goal;
                console.log("User goal" + userGoal)
                //retirve exercises according to the user goal.
                // Strength -> get the exercises that has Strength as primary goal
                // WeightLoss -> get the exercises that has WeightLoss as primary goal.
                //CRUDs ->Read
                const FitnessArray = await getWorkout.find({PrimaryGoal : userGoal});
                let count = 0;
            
                for (let i = 0; i < FitnessArray.length && count < 11; i++) {
                    const exercise = FitnessArray[i];
                    const muscle = exercise.Muscle;
                    let chestNo = 0;
                    let BicepsNo = 0;
                    let HamstringNo = 0;
                    let TricepNo = 0;
                    let LateralNo = 0;
                    let BackNo =0;
                    let TrapsNo =0;
                    let ShouldersNo =0;
                    let QuadsNo = 0;
                    let CompoundNo = 0;


                    switch (muscle) {
                        case 'Chest':
                         if (chestNo === 0) {
                              workoutSchedule.push(exercise.wName);
                              count++;
                              chestNo = 1;
                              if (chestNo === 1) {
                                    break;
                                 }
                           }
                               break;
                        case 'Biceps':
                         if (BicepsNo === 0) {
                              workoutSchedule.push(exercise.wName);
                              count++;
                              BicepsNo = 1;

                              if (BicepsNo === 1) {
                                    break;
                                 }
                           }
                               break;
                        
                        case 'Hamstring':
                         if (HamstringNo === 0) {
                              workoutSchedule.push(exercise.wName);
                              count++;
                              HamstringNo = 1;

                              if (HamstringNo === 1) {
                                    break;
                                 }
                           }
                               break;

                        case 'Tricep':
                         if (TricepNo === 0) {
                              workoutSchedule.push(exercise.wName);
                              count++;
                              TricepNo = 1;

                              if (TricepNo === 1) {
                                    break;
                                 }
                           }
                               break;
                        
                        case 'Lateral':
                         if (LateralNo === 0) {
                              workoutSchedule.push(exercise.wName);
                              count++;
                              LateralNo = 1;

                              if (LateralNo === 1) {
                                    break;
                                 }
                           }
                               break;

                        case 'Back':
                         if (BackNo === 0) {
                              workoutSchedule.push(exercise.wName);
                              count++;
                              BackNo = 1;

                              if (BackNo === 1) {
                                    break;
                                 }
                           }
                               break;

                        case 'Traps':
                         if (TrapsNo === 0) {
                              workoutSchedule.push(exercise.wName);
                              count++;
                              TrapsNo = 1;

                              if (TrapsNo === 1) {
                                    break;
                                 }
                           }
                               break;

                        case 'Shoulders':
                         if (ShouldersNo === 0) {
                              workoutSchedule.push(exercise.wName);
                              count++;
                              ShouldersNo = 1;

                              if (ShouldersNo === 1) {
                                    break;
                                 }
                           }
                               break;

                         case 'Quads':
                         if (QuadsNo === 0) {
                              workoutSchedule.push(exercise.wName);
                              count++;
                              QuadsNo = 1;

                              if (QuadsNo === 1) {
                                    break;
                                 }
                           }
                               break;

                        case 'Compound':
                         if (CompoundNo === 0) {
                              workoutSchedule.push(exercise.wName);
                              count++;
                              CompoundNo = 1;
 
                              if (CompoundNo === 1) {
                                    break;
                                 }
                           }
                               break;
                    }
                
                }
                
                //Saving generated schedule to the workoutSchedule collection
                const newSchedule = new workSCH({
                    schdeleID : 'sd'+ User.userID,
                    userID : User.userID,
                    cardio: 10,
                    workoutsArray : workoutSchedule,
                    workOutRepArray : new Array(workoutSchedule.length).fill(10),
                    workOutSetArray : new Array(workoutSchedule.length).fill(3), 
                
                }); 
            
                //Inserting document. CRUDs -> Create
                const saveWorkoutSchedule = await newSchedule.save()

                //Updating mySchedule ID in userDetails

                const updateMyScheduleID = async(res) =>{

                    //Validating session
                      if(sessionHandler.getSessionName() !== null){
                        try {
                          
                      
                          const updateBody = {
                            mySchedule: 'sd'+User.userID,
                            
                          }
                        
                          const updatedUser = await User.findOneAndUpdate(
                    
                            {userName :sessionHandler.getSessionName()},
                            updateBody,
                            {new:true}
                          
                          );
                    
                          console.log('Update function runs for ' + sessionHandler.getSessionName())
                    
                         res.status(200).json(updateMyScheduleID);
                        } catch (error) {
                         console.error(error);
                         res.status(500).json({ message: 'Internal server error at update user' });
                       }
                    
                      }else{
                        console.log("User is not logged in yet. Updating terminated due to validation error!");
                        res.status(401).json({ error: 'Not authorized to access account details. Please login to access your account details!' });
                      }
                    
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

exports.updateSchedule = async(req,res) =>{
    try {

        sessionUserName = await sessionDetails();
        //CRUDs ->Read
        const User = await getUser.findOne({ userName: sessionUserName});
        
        //CRUDs - Update
        const updatedSchedule = await workSCH.findOneAndUpdate(
            {userID : User.userID},
            {$set:req.body},
            {new:true}
          );
          res.status(200).json(updatedSchedule);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error at export.updatedSchedule' });
    }
}

exports.deleteSchedule = async(res) =>{
    try {
        
        sessionUserName = await sessionDetails();
        //CRUDs ->Read
        const User = await getUser.findOne({ userName: sessionUserName});

        //CRUDs - Delete
       await workSCH.findOneAndDelete(
          {userID:User.userID}
        );
        console.log("Workout schedule deleted!")
        
        
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error at delete user' });
      }


}



const progressmodel = require('../models/progressModel')
const sessionHandler = require('../config/sessionHandler')



exports.getProgressdetails =  async(req,res) =>{

//validating login
if(sessionHandler.getSessionName() !== null){

    const progressess = await progressmodel.find({ username: sessionHandler.getSessionName()}).sort({createdAt: -1})
    res.status(200).json(progressess)

 }else{ console.log("User is not logged in yet. Validation failed!");
        res.status(401).json({ error: 'Not authorized to access account details. Please login to access your account details!' });
        }
    

}


exports.createProgressrecord = async(req,res) =>{

    

    const {selectDate, StartTime, EndTime, Weight, Cal_burn_treadmil, Cal_burn_cycling, Time_squates,
        Time_legpress, Time_breanchpress, Time_shoulderpress, Time_situps, Time_pullups} = req.body

        const userName = sessionHandler.getSessionName();
     //calculate calories burnt
      const cal_squates = Weight * 5.0 * (Time_squates / 60.0)
      const cal_legpress = Weight * 5.5 * (Time_legpress/60.0)
      const cal_breanchpress = Weight * 6.0 * (Time_breanchpress/60.0)
      const cal_shoulderpress = Weight * 5.5 * (Time_shoulderpress/60.0)
      const cal_situps = Weight * 2.8 * (Time_situps/60.0)
      const cal_pullups = Weight * 8.0 * (Time_pullups/60.0)

    //calculate the total calories
     const Total_calories = Number(Cal_burn_treadmil) + Number(Cal_burn_cycling) + Number(cal_squates) + Number(cal_legpress) + Number(cal_breanchpress) +Number(cal_shoulderpress) + Number(cal_situps) + Number(cal_pullups) 

     console.log(Total_calories)

     try {
        const progress = await progressmodel.create({username: userName,selectDate, StartTime, EndTime, Weight, Cal_burn_treadmil, Cal_burn_cycling, Time_squates,
          Time_legpress, Time_breanchpress, Time_shoulderpress, Time_situps, Time_pullups,cal_squates, cal_legpress,cal_breanchpress,cal_shoulderpress,cal_situps,cal_pullups,Total_calories})
        res.status(200).json(progress)
        } catch (error) {
        res.status(400).json({ error: error.message })
        }
    }


exports.deleteProgressRecord = async(req,res) => {

    const progress = await progressmodel.findOneAndDelete({ username: sessionHandler.getSessionName()});

    if(!progress) {
        return res.status(400).json({error: 'No such Progress Record'})
      }
    
      res.status(200).json(progress)

   
 }

exports.updateProgressRecord = async(req,res) => {

    const { selectDate, StartTime, EndTime, Weight, Cal_burn_treadmil, Cal_burn_cycling, Time_squates,
        Time_legpress, Time_breanchpress, Time_shoulderpress, Time_situps, Time_pullups } = req.body;


        try {
            const progress = await progressmodel.findOne({ username: sessionHandler.getSessionName()});
            if (!progress) {
                return res.status(404).json({ error: 'Progress not found' });
              }

               // Update progress object with new data
                  progress.selectDate = selectDate;
                  progress.StartTime = StartTime;
                  progress.EndTime = EndTime;
                  progress.Weight = Weight;
                  progress.Cal_burn_treadmil = Cal_burn_treadmil;
                  progress.Cal_burn_cycling = Cal_burn_cycling;
                  progress.Time_squates = Time_squates;
                  progress.Time_legpress = Time_legpress;
                  progress.Time_breanchpress = Time_breanchpress;
                  progress.Time_shoulderpress = Time_shoulderpress;
                  progress.Time_situps = Time_situps;
                  progress.Time_pullups = Time_pullups;

                  // Recalculate total calories burned
                  const cal_squates = Weight * 5.0 * Time_squates/60
                  const cal_legpress = Weight * 5.5 * Time_legpress/60
                  const cal_breanchpress = Weight * 6.0 * Time_breanchpress/60
                  const cal_shoulderpress = Weight * 5.5 * Time_shoulderpress/60
                  const cal_situps = Weight * 2.8 * Time_situps/60
                  const cal_pullups = Weight * 8.0 * Time_pullups/60
                  const Total_calories = Number(Cal_burn_treadmil) + Number(Cal_burn_cycling) + Number(cal_squates )+ Number(cal_legpress) + Number(cal_breanchpress)+ Number(cal_shoulderpress) + Number(cal_situps )+ Number(cal_pullups);
                  progress.cal_squates = cal_squates;
                  progress.cal_legpress = cal_legpress;
                  progress.cal_breanchpress = cal_breanchpress;
                  progress.cal_shoulderpress = cal_shoulderpress;
                  progress.cal_situps = cal_situps;
                  progress.cal_pullups = cal_pullups;
                  progress.Total_calories = Total_calories;

                // Save progress object to database
                  const updatedProgress = await progress.save();
                  res.status(200).json(updatedProgress);

        }catch (error) {
            res.status(400).json({ error: error.message });
          }
    


}


  









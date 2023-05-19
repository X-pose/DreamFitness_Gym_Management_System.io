import Cookies from 'js-cookie';
import '../../public/css/workoutScheduler.css';
import { useEffect, useState } from "react";
import WorkoutDetailsCustom from '../components/WorkoutsSchedulerDetailscustom';

import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';


const WorkoutSchedulerCustom = () => {
  const [workouts, setWorkouts] = useState('');
  const [UserName] = useState(Cookies.get('sessionName'));
  const [generateReport, setGenerateReport] = useState(false);

  useEffect(() => {
    console.log('Passing alpha');
    const fetchWorkouts = async () => {
      const response = await fetch('/api/myWorkoutSchedule');
      const json = await response.json();
      console.log('Passing Bravo');
      if (response.ok) {
        setWorkouts(json);
        console.log('Passing Charlie');
      }
    };
    console.log('Passing Delta');
    fetchWorkouts();
  }, []);
  const handleGenerateReport = () => {
    setGenerateReport(true);
      }
   

  const generatePDFReport = () => {

    const styles = StyleSheet.create({
      page: {
        padding: 20,
      },
      container: {
        flex: 1,
        marginBottom: 0,
      },
      title1: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: 'red', // Add this line to set the background color to red
        color: 'black', // Optionally, add this line to set the text color to white
        padding: 10, // Optionally, add this line to add padding to the title
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        padding: 10
      },
      table: {
        width: '100%',
        border: '1 solid red',
        marginTop: 10,
      },
      tableRow: {
        flexDirection: 'row',
      },
      tableHeaderCell: {
        width: '40%',
        textAlign: 'center',
        padding: 5,
        border: '3 solid red',
        fontWeight: 'bold',
        fontSize:'15'
      },
      tableCell: {
        width: '40%',
        textAlign: 'center',
        padding: 5,
        border: '2 solid red',
        fontSize1: '12'
      },
      footer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'black',
        height: 100, // Increase this value to increase the height of the footer
        paddingHorizontal: 10, // Adjust the horizontal padding as needed
        flexDirection: 'row', // Align the content in a row
      },
      footerText: {
        color: 'red',
        fontSize: 16, // Adjust the font size as needed
        //alignSelf: 'flex-start', // Align the text to start from where the footer starts
        flex: 1, // Take up available space in the footer
        textAlign:'right',
        fontWeight:'extrabold',
        

      },
      address: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
        fontSize: 14, // Adjust the font size as needed
        marginTop: 10, // Add margin space between footerText and address

      }


    });


    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
          <Text style={styles.title1}> Dream Fitness</Text>
            <Text style={styles.title}> Diet Plan Report</Text> 
             
            

            <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Food Name</Text>
            <Text style={styles.tableHeaderCell}>Potion</Text>
            <Text style={styles.tableHeaderCell}>Description</Text>
          </View>
          {workouts && workouts.map((workouts) => (
            <View key={workouts._id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{workouts.title}</Text>
              <Text style={styles.tableCell}>{workouts.gram}</Text>
              <Text style={styles.tableCell}>{workouts.description}</Text>
            </View>
            
            ))}
            </View>
          <View style={styles.footer}>
           <Text style={styles.footerText}>Dream Fitness</Text>
           <Text style={styles.address}>No. 101/3,New Kandy Rd, Kaduwela,10640</Text>

           </View>
          </View>
        </Page>
      </Document>
);
};
  
  return (
    <div>
      <h1 className='Nameone'>WORKOUT SCHEDULE</h1>
      <div className='cus'>
        <h1 className='cusname2'>{UserName}</h1>
        <p className='wrkutcustompara'>This is your own Workoutschedule. This represents your reps, your weight load, and exercise name. If you do not understand the exercise, you can use the exercise demonstrator function through your profile. This schedule is generated automatically when you first create the account. Further additions are done by an Admin.</p>
      </div>
      <div className='contwrkcusto'>
        <WorkoutDetailsCustom workout={workouts} />
      </div>
      <div className='container'></div>
      

   




    </div>
  );
};

export default WorkoutSchedulerCustom;
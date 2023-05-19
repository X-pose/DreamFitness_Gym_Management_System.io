import { useState, useEffect } from 'react';
import { WorkoutForm } from './WorkoutSchedulerForm';
import '../../public/css/workoutScheduler.css'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';




const WorkoutDetailsCustom = ({ workout }) => {
  const [workouts] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [wName, setWName] = useState([]);
  const [wLoad, setLoad] = useState([]);
  const [wRep, setRep] = useState([]);
  const [generateReport, setGenerateReport] = useState(false);


  useEffect(() => {
    if (workout) {
      setWName(workout.workoutsArray || []);
      setLoad(workout.workOutSetArray || []);
      setRep(workout.workOutRepArray || []);
    }
  }, [workout]);

  console.log('Workout ishere' + workout)
  console.log('wName:', wName);
  console.log('wLoad:', wLoad);
  console.log('wRep:', wRep);

  const handlePrint = async () => {
    //Implement the report generation here
  };

  const handleUpdate = async () => {
    const response = await fetch('/api/updateWorkoutSchedule', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: wName,
        load: wLoad,
        reps: wRep,
      }),
    });
    if (!response.ok) {
      throw new Error('Error updating workout');
    }
    // Refresh the list of workouts after updating the selected workout
    window.location.reload();
  };



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
            <Text style={styles.title}> Workout schedule</Text> 
             
            

            <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Name</Text>
            <Text style={styles.tableHeaderCell}>Reps</Text>
            <Text style={styles.tableHeaderCell}>Load</Text>
          </View>
          {wName && wName.map((name, index) => (
    <View key={index} style={styles.tableRow}>
      <Text style={styles.tableCell}>{name}</Text>
      <Text style={styles.tableCell}>{wRep[index]}</Text>
      <Text style={styles.tableCell}>{wLoad[index]}</Text>
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
      <table>
        <thead></thead>
        <tbody>
          {editMode ? (
            wName.map((name, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setWName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={wLoad[index]}
                    onChange={(e) => setLoad(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={wRep[index]}
                    onChange={(e) => setRep(e.target.value)}
                  />
                </td>

                
              </tr>
               
            ))
          ) : (
            wName.map((name, index) => (
              <tr className="workouts" key={index}>
                <td>{name}</td>
                <td>
                  <strong>Load (Kg):</strong> {wLoad[index]}
                </td>
                <td>
                  <strong>Reps:</strong> {wRep[index]}
                </td>

              </tr>
            ))

          )}
        </tbody>
       


      </table><br />
      {generateReport && (
            <PDFViewer width="100%" height={600}>
            {generatePDFReport()}
            </PDFViewer>)}
      
      {editMode?(
        <div>
          <button onClick={handleUpdate}>Save</button>
           <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
        
      ):(
        <div>
          <button className='delbtn' onClick={handleGenerateReport}>Print</button>
        </div>
      )}
    </div>

  );
}

export default WorkoutDetailsCustom;
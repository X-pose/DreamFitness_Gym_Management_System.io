import { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import  '../../public/css/workout.css'



//components
import ProgressDetail from "../components/ProgressDetail";



const Workoutlog = () =>{

    const [progresses ,setProgresses] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const [generateReport, setGenerateReport] = useState(false);


  //  const filteredProgresses = progresses && progresses.filter((progress) =>
   // progress.Date.includes(searchTerm.toLowerCase())
//  );

const handleGenerateReport = () => {
      setGenerateReport(true);
    };
    useEffect(()  => {
      const  fetchProgress = async () =>{
      
        const response = await fetch('/api/progressdetail')
        const json = await response.json()

        if (response.ok) {
            setProgresses(json)
           
          }

      }
        fetchProgress()
   }, [])

   useEffect(() =>{
    const fetchUserDetails = async() =>{
      console.log('Data retrive initiated phase 2')
      const response = await fetch('/api/accountdetails')
      const json = await response.json()

      if(response.ok){
          setUserDetails(json)
        
      }
    }
    fetchUserDetails()
  })


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
      width: '30%',
      textAlign: 'center',
      padding: 5,
      border: '3 solid red',
      fontWeight: 'bold',
      fontSize:'15'
    },
    tableCell: {
      width: '20%',
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
   


  });


  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
        <Text style={styles.title1}> Dream Fitness</Text>
          <Text style={styles.title}> Progress Report</Text> 
          <Text>Name: {userDetails?.userName}</Text>
          <Text>Age: {userDetails?.age}</Text>
          <Text>Height: {userDetails?.height}m</Text>
          <Text>Fitness Goal: {userDetails?.goal}</Text>

          <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeaderCell}>Date</Text>
          <Text style={styles.tableHeaderCell}>Start Time</Text>
          <Text style={styles.tableHeaderCell}>End Time</Text>
          <Text style={styles.tableHeaderCell}>Weight(Kg)</Text>
          <Text style={styles.tableHeaderCell}>Total Calories</Text>
        </View>
        {filteredProgresses.map((progress) => (
          <View key={progress._id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{progress.selectDate}</Text>
            <Text style={styles.tableCell}>{progress.StartTime}</Text>
            <Text style={styles.tableCell}>{progress.EndTime}</Text>
            <Text style={styles.tableCell}>{progress.Weight}</Text>
            <Text style={styles.tableCell}>{progress.Total_calories.toFixed(2)}</Text>
          </View>
          
          ))}
          </View>
      
        </View>
      </Page>
    </Document>
  );
};









const filteredProgresses = progresses && progresses.filter((progress) =>
progress && progress.selectDate && progress.selectDate.includes(searchTerm.toLowerCase())
);
const handleChange = (event) => {
  setSearchTerm(event.target.value);
};




   




    return(
        <div>
        <h1  className="title" >Workout Log</h1>

        <div className="search">
        <input
          type="date"
          placeholder="Search by date"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      <div className="generate-report">
        <button onClick={handleGenerateReport}>Generate Report</button>
      </div>



        <div className="progresses">
        
        {filteredProgresses.map((progress) => (
        //<p  key= {progress._id}>{progress.Date}</p>
        <ProgressDetail  key={progress._id} progress = {progress} />
        ))}
      </div>


      {generateReport && (
        <PDFViewer width="100%" height={600}>
          {generatePDFReport()}
        </PDFViewer>
      )}

        </div>
        
    )





}

export default  Workoutlog
 
// date fns
 
import '../../public/css/FAQdetail.custom.css'

const Faqdetailcustom = ({ FAQ }) => {
   

  const handleClick = async () => {
    const response = await fetch('/api/FAQ' + FAQ._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      
    }
  }

  return (
    <div className="FAQDetails">
      <div className='det'> 
      <details>
        <summary>{FAQ.title}</summary>
        <p className='ans'><strong><a className='red'>Answer=</a></strong> {FAQ.load}</p>
        <p className='ans'>Category={FAQ.cat}</p>
      </details>
      </div>
    </div>
  )
}

export default Faqdetailcustom

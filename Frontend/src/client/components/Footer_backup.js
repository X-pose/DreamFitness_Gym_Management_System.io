import React from 'react'
import '../../public/css/footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <Link>

        <div className= 'Footer'>
            <div className="column">
                <div>
                    <a className='dmf'>DMF</a><br/>
                    
                        <div className='text'>
                        <dev className='cpy'>
                        Copyright © 2023 Dream Fitness.
                        <div>All Rights Reserved.</div>
                        </dev>
                        </div>
                    
                </div>
            </div>
            <div className='column'>
                <div>
                <div className='text'>
                <div className='con'><br/>CONTACT INFO</div>
                </div>
                <div className='text'>
                <p className='address'>No,101/3</p>
                <p className='address'>New Kandy Rd,</p>
                <p className='address'>Kaduwela,10640<br/><br/></p>
                <p className='address'>dreamfitness@gmail.com</p>
                <p className='address'>011 1231239</p>
                </div>
                <div><i class="fa fa-facebook-official" aria-hidden="true"></i></div>
                </div>
            </div>
            <div className='column'>
                <div>
                <div className='text'>
                <div className='con'><br/>QUICK LINKS</div>
                </div>
                <div className='text'>
                <p className='address'>FEEDBACK</p>
                <p className='address'>FAQ</p>
                <p className='address'>OUR CREW<br/></p>
                <p className='address'>GALLERY<br/><br/></p>
                </div>
                
                </div>
            </div>
            <div className='column'>
            <div className='text'>
                <div className='con'><br/>CLUB HOURS<br/></div>
                </div>
                <div className='text'>
                <p className='address'>Monday-Thursday 5am-9:00pm</p>
                <p className='address'>Friday 5am-7:30pm</p>
                <p className='address'>Saturday-Sunday 7am-6pm</p>
                </div>
            </div>

        </div>
    </Link>
  )
}

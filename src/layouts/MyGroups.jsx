
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';

function MyGroups() {

  return (
    <>
        <div className='user-box'>
      <div className='user-search-box'>
        <LuSearch className='search-icon'/>
        <input placeholder='Search' type="text" />
        <BsThreeDotsVertical className='threeDot-icon'/>
      </div>
      <div className="userList-box">
        <div className='userList-title-box '>
          <h4 className='userList-title'>My Groups</h4>
          <BsThreeDotsVertical className='userList-threeDot'/>
        </div>
        <SingleUser/>
      </div>     
    </div>
    </>
  )
}

export default MyGroups
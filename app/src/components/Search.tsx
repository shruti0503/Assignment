
import { SearchIcon } from 'lucide-react'
const Search = () => {
  return (
    <div className='flex w-full bg-white border-b-2 p-2'>
      <div className='gap-1 px-3 flex w-full p-2 border-2 border-[#d3d3d3]-400 rounded-lg bg-[#f6f6f6]'>
        <SearchIcon />
        <input  className='w-full flex bg-[#f6f6f6] outline-none '/>

      </div>
      
    </div>
  )
}

export default Search

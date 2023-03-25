

const Tag = ({value}:{value: string}) =>{
  
  return (
    value 
     ? <span className={`inline-block bg-gray-200 rounded-full mx-2 px-2 py-0.5 font-semibold text-gray-700 mb-2 text-xs`}>{value}</span>
    : null
  )

}

export default Tag;
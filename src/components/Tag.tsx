

const Tag = ({value, className}:{value: string, className?: string}) =>{
  
  return (
    value 
     ? <span className={`inline-block bg-gray-200 rounded-full px-2 py-0.5 font-semibold text-gray-700 text-xs ${className}`}>{value}</span>
    : null
  )

}

export default Tag;
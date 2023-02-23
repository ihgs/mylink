const base64 = require('base-64');
const utf8 = require('utf8')

export interface LinkData {
  id?: string|null,
  title: string,
  link: string,
  category: string,
  count?: number,
}

const genId = (link: string) => {
  
  return base64.encode(utf8.encode(link));
}

const addLink = (data: LinkData) => {
  const items = listLinks()
  data.id = genId(data.link);
  if(items.find(item=> item.id == data.id)){
    alert('already existing')
    return;
  }
  items.push(data)
  localStorage.setItem("items", JSON.stringify(items))
}

const countUp = (id: string) => {
  const items = listLinks()
  const updateItem = items[items.findIndex(x=>x.id == id)] 
  if(updateItem['count']){
    updateItem['count'] = updateItem['count'] + 1
  }else {
    updateItem['count'] = 1
  }

  localStorage.setItem("items", JSON.stringify(items))
}
const listLinks = (): Array<LinkData> => {
  let saved = localStorage.getItem("items")
  let items: Array<LinkData>;
  if(!saved){
    items = [
     
    ]
  }else {
    items = JSON.parse(saved)
  }
  return items;
}
export {
  addLink,
  listLinks,
  countUp,
}
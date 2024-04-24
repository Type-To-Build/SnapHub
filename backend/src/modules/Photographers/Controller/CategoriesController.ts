import { resources } from "../../../utils";
import Categories from "../Model/Categories";

export const { index,create, edit, editBySlug, update, deleteItem } = resources(Categories)

export const createDemoHotel = async () =>{
    
  await Categories.create({
    name: 'Street Photography',
    image: '/img/wild.png',
  })
  await Categories.create({
    name: 'Travel Photography',
    image: '/img/Travel.png',
  })
  await Categories.create({
    name: 'Events Photography',
    image: '/img/conferences.png',
  })
  await Categories.create({
      name: 'Conferences Photography',
      image: '/img/Events-1.png',
    })
    await Categories.create({
      name: 'Wedding Photography',
      image: '/img/Wedding.png',
    })
    await Categories.create({
      name: 'Fashion Photography',
      image: '/img/Fashion.png',
    })
 
}
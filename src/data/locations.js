const locations = [
  {
    id: 1,
    name: 'Bell Tower',
    lat: 40.4274,
    lng: -86.9132,
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Bell_tower_at_Purdue_University_on_a_fall_day.jpg',
  },
  {
    id: 2,
    name: 'Engineering Fountain',
    lat: 40.4283,
    lng: -86.9130,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Engineering_Fountain_Purdue_University_2016_02.jpg',
  },
  {
    id: 3,
    name: 'Purdue Memorial Union',
    lat: 40.4259,
    lng: -86.9109,
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Purdue_Student_Union.JPG',
  },
  {
    id: 4,
    name: 'Neil Armstrong Hall',
    lat: 40.4311,
    lng: -86.9152,
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Neil_Armstrong_Hall_of_Engineering_Purdue_University_2016_04.jpg',
  },
  {
    id: 5,
    name: 'Ross-Ade Stadium',
    lat: 40.4340,
    lng: -86.9189,
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Ross-Ade_Stadium.jpg',
  },
  {
    id: 6,
    name: 'Hovde Hall',
    lat: 40.4256,
    lng: -86.9138,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Frederick_L_Hovde_Hall_of_Administration_Purdue_University_2016_01.jpg',
  },
  {
    id: 7,
    name: 'Gateway to the Future Arch',
    lat: 40.4321,
    lng: -86.9175,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Gateway_to_the_Future_Arch_Purdue_University_2016_01.jpg',
  },
  {
    id: 8,
    name: 'WALC',
    lat: 40.4278,
    lng: -86.9135,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Purdue_Bell_Tower_night.JPG',
  },
  {
    id: 9,
    name: 'Purdue Pete Statue',
    lat: 40.4252,
    lng: -86.9120,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Purdue_Pete_modern.jpg',
  },
  {
    id: 10,
    name: 'Cary Quadrangle',
    lat: 40.4235,
    lng: -86.9095,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Cary_Quad_Purdue_University_2016_01_Crop.jpg',
  },
]

export function getRandomLocations(count = 5) {
  const shuffled = [...locations].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default locations

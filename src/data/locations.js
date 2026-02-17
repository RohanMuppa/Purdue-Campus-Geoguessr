const locations = [
  {
    id: 1,
    name: 'Bell Tower',
    lat: 40.4273,
    lng: -86.9141,
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Bell_tower_at_Purdue_University_on_a_fall_day.jpg',
  },
  {
    id: 2,
    name: 'Engineering Fountain',
    lat: 40.4286,
    lng: -86.9138,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Engineering_Fountain_Purdue_University_2016_02.jpg',
  },
  {
    id: 3,
    name: 'Neil Armstrong Hall',
    lat: 40.4310,
    lng: -86.9149,
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Neil_Armstrong_Hall_of_Engineering_Purdue_University_2016_04.jpg',
  },
  {
    id: 4,
    name: 'Ross-Ade Stadium',
    lat: 40.4340,
    lng: -86.9177,
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Ross-Ade_Stadium.jpg',
  },
  {
    id: 5,
    name: 'Hovde Hall',
    lat: 40.4282,
    lng: -86.9144,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Frederick_L_Hovde_Hall_of_Administration_Purdue_University_2016_01.jpg',
  },
]

export function getRandomLocations(count = 5) {
  const shuffled = [...locations].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default locations

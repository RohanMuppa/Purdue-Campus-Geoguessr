const locations = [
  {
    id: 1,
    name: 'Bell Tower',
    lat: 40.4273,
    lng: -86.9141,
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Bell_tower_at_Purdue_University_on_a_fall_day.jpg',
    funFact: 'Built in 1995 as a gift from the Class of 1948, the 160-foot Bell Tower plays concerts daily and its 4 bells weigh over 2,400 pounds combined.',
  },
  {
    id: 2,
    name: 'Engineering Fountain',
    lat: 40.4286,
    lng: -86.9138,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Engineering_Fountain_Purdue_University_2016_02.jpg',
    funFact: 'Legend says any engineering student who walks through the fountain before graduating will never get their degree. The sculpture was designed by Robert Youngman in 1939.',
  },
  {
    id: 3,
    name: 'Neil Armstrong Hall',
    lat: 40.4310,
    lng: -86.9149,
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Neil_Armstrong_Hall_of_Engineering_Purdue_University_2016_04.jpg',
    funFact: 'Named after Purdue alum Neil Armstrong, the first person to walk on the Moon. Purdue has produced 27 astronauts — more than any non-military university.',
  },
  {
    id: 4,
    name: 'Ross-Ade Stadium',
    lat: 40.4344,
    lng: -86.9184,
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Ross-Ade_Stadium.jpg',
    funFact: 'Opened in 1924 and seats 57,236 fans. Named after David Ross and George Ade, who donated the land. The Boilermakers\' "Breakfast Club" tradition fills the stadium at 7am on game days.',
  },
  {
    id: 5,
    name: 'Hovde Hall',
    lat: 40.4282,
    lng: -86.9144,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Frederick_L_Hovde_Hall_of_Administration_Purdue_University_2016_01.jpg',
    funFact: 'Named after Frederick Hovde, Purdue\'s 7th president who served for 25 years (1946-1971). During his tenure, enrollment tripled and Purdue became a major research university.',
  },
]

export function getRandomLocations(count = 5) {
  const shuffled = [...locations].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default locations

const wordList = [
    {
      theme: 'Tundra',
      easyWords: ['Snow',  'sleet', 'hail', 'slush', 'winter', 'ski', 'frost', 'Ice', 'Cold', 'Frost', 'Bear', 'Seal', 'Wolf', 'Lynx', 
      'Arctic', 'Fox', 'Hare', 'Sled', 'Polar', 'Tundra', 'Yak', 'Igloo', 'Inuit', 'Drift', 'Blizzard', 'Glacier', 'Frosty', 'Icicle', 
      'Freeze', 'Arctic', 'Powder', 'Avalanche', 'Frigid', 'Sleigh', 'Snowman', 'Hypothermia', 
    'Siberia', 'Hibernation', 'Skiing', 'ice Skating', 'Snowball', 'Snowfall', 'Sleighing', 'Shiver', 'Glacial', 'Snowstorm', 'Snowflake', 'Frostbite', 
    'Permafrost', 'Mittens', 'Snowboard', 'Snowmobile', 'Snowscape', 'Snowplow', 'Aurora', 'Snowshoe', 'Snowbank', 'Iceberg',
        ],
    hardWords: [ 'Frozen Tundra', 'Arctic Blast', 'Icy Wilderness', 'Glacial Peak', 'Snowy Abyss', 'Icicle Forest', 'Tundra Trail', 'Winter Frost', 
    'Icy Mountain', 'Frozen Wasteland', 'Arctic Exploration', 'Snowbound Slopes', 'Snowy Summit', 'Frozen Lake', 'Snowbound Trees', 'Snowy Solitude', 
    'Icy Waters', 'arctic pine', 'aurora borealis'
        ]
    },
    {
      theme: 'City',
      easyWords: ['City', 'Street', 'Urban', 'Town', 'Park', 'Plaza', 'Metro', 'Shop', 'Cafe', 'Club', 'Mall', 'Alley', 'Block', 'Bus', 'Taxi', 
      'Walk', 'Cabs', 'subway', 'Train','Road', 'Sign', 'Food', 'Crowd', 'Neon', 'Bridge','Port', 'Lane', 'bike', 'drive', 'Traffic', 'Landmark', 
      'Skyscraper', 'Shopping', 'Market', 'Restaurant', 'Sidewalk', 'Neighborhood', 'Fountain', 
    'Cuisine', 'Architecture', 'Museum', 'Pedestrian', 'Monument', 'Residence', 'Metropolis', 'Pavement', 'Boulevard', 'Crosswalk', 'District', 
    'Underpass', 'Footbridge', 'Metropolitan', 'Transport', 'Suburb', 'Skateboard', 'Pavilion', 'Billboard', 'Transportation', 'Roundabout', 'Avenue', 'Cathedral', 'Stadium',],
    hardWords:['traffic lights', 'traffic cone', 'taxi driver', 'city skyline', 'manhole cover', 'Skyscraper Heights', 'Street Art', 'Metro Station', 'City Lights', 
    'Pedestrian Bridge', 'Coffee Shop', 'Historic Landmark', 'Central Park', 'Neon Signs', 'Food Truck', 'Public Transportation', 'Art Gallery', 'Rooftop Garden', 
    'Bustling Market', 'Cobblestone Street', 'Skateboard Park', 'Modern Architecture', 'Outdoor Plaza', 'Street Performers', 'Street vendor', 'Pedestrian Crosswalk', 
    'Historic Neighborhood', 'Urban Development', 'City Center', 'City Cycling', 'City Block', 'Urban Design',
        ]
    },
    {
      theme: 'Desert',
      easyWords: ['sand', 'dune', 'arid', 'heat', 'cacti', 'dry', 'dust', 'sun', 'mesa', 'gobi', 'lizard', 'dried', 'warm', 'mirage', 
      'sahara', 'desert', 'cactus', 'dryness', 'Aridity', 'thirst', 'drought', 'barren', 'scortch', 'vulture', 'sandstorm',
       'heatwave', 'wandering', 'tumbleweed', 'desolate', 'expanse', 'sunburnt', 'parched', 'scalding'],
      hardWords: ['Sand Dunes', 'Arid Climate', 'Mirage Effect', 'Oasis Springs', 'Cactus Flower', 'Desert Wildlife', 'Scorching Sun',
       'Tumbleweed Roll', 'Endless Expanse', 'Searing Heat', 'Barren Wasteland', 'Cacti Gardens', 'Dusty Trails', 'Desert Mirage', 'Nomadic Journey',
        'Thirsty Wanderer', 'Gobi Desert', 'Burning Sands', 'Arid Adventure', 'Cactus Shadows', 'Sunburned Skin', 'Desert Oasis', 'Scorched Earth',
         'Arid Landscapes', 'Drought Conditions', 'Rocky Terrain', 'Sahara Nights',
         'Cactus Blooms',
        ]
    },
    {
        theme: 'Jungle',
        easyWords: ['lush', 'canopy', 'humidity', 'tropical', 'foliage', 'biodiversity', 'exotic', 'vibrant', 'moisture', 'waterfall', 
        'flora', 'fauna', 'canopy', 'epiphyte', 'jaguar', 'parrot', 'sloth', 'anaconda', 'toucan', 'monkey', 'orchid', 'bamboo', 'rain', 
        'fern', 'butterfly', 'river', 'emerald', 'moss', 'vine', 'tarantula', 'iguana', 'mist', 'tree frog', 'cascade', 'chirping birds', 'steamy', 'jungle floor'],
        hardWords:['Tropical Rainforest', 'Amazon Jungle', 'Biodiversity Hotspot',
        'Tropical Wildlife', 'Jungle Waterfall', 'Exotic Flora', 'Primate Species', 'Toucan Beak', 'Orchid Blossom', 'Sloth Hanging',
        'Anaconda Coiled', 'Vibrant Feathers', 'Jaguar Roar', 'Rainforest Trek', 'Bamboo Grove', 'Moss-Covered Trees',
        'River Basin', 'Epiphytic Plants', 'Tropical Rain', 'Canopy Exploration', 'Tarantula Nest', 'Iguana Perched', 'Misty Canopy',
        'Endangered Species', 'Lush Undergrowth','Orchid Paradise', 'Ancient Trees', 'Primate Sanctuary', 'Rare Butterflies', 'Jungle Adventure', 
        'Tropical Serenity', 'Canopy Research', 'Colorful Macaw']
    },
    {
        theme: 'Outer Space',
        easyWords: ['cosmos', 'stars', 'galaxy', 'astronaut', 'planet', 'spaceship', 'nebula', 'comet', 'meteor', 'orbit',
        'moon', 'spacesuit', 'rocket', 'black hole', 'constellation', 'alien', 'space station', 'telescope', 'satellite',
        'interstellar', 'gravity', 'milky way', 'supernova', 'astronomy', 'solar system', 'celestial', 'cosmonaut', 'spacewalk',
        'asteroid', 'lunar', 'stellar'],
        hardWords: ['Deep Space', 'space shuttle', 'Interplanetary Travel', 'space exploration', 'Extraterrestrial Life', 'Cosmic Nebula', 'Galactic Journey',
        'Celestial Bodies', 'Stellar Phenomenon', 'Intergalactic Adventure', 'Lunar Rover', 'Alien Encounter', 'Astronomical Observatory',
        'Spacecraft Launch', 'Event Horizon', 'Astrobiology Research', 'Milky Way Galaxy', 'Hubble Space Telescope', 'Spacewalk Mission',
        'Solar Eclipse', 'Orbital Satellite', 'Cosmos Exploration', 'Gravity Waves', 'Red Dwarf Star', 'Comet Tail', 'Space Colonization',
        'Space-Time Continuum', 'Planetary Rings', 'Supernova Explosion', 'Space Probe Mission', 'Black Hole Singularity', 'Space Debris']
    }
];

// {
//     theme: 'Animals',
//     easyWords: ['Cat', 'Dog', 'Bird', 'Fish', 'Lion', 'Tiger', 'Bear', 'Deer', 'Wolf', 'Horse', 'Cow', 'Pig', 'Goat', 'Sheep', 'Rat', 'Mice', 
//     'Frog', 'Duck', 'Swan', 'Crab', 'Snail', 'Ant', 'Bee', 'Wasp', 'Fly', 'Gnat', 'Bat', 'Fox', 'Mole', 'Owl', 'Eel', 'Hawk', 'Puma', 'Seal', 
//     'Moth', 'Lobster', 'Shrimp', 'Sloth', 'Skunk', 'Squid', 'Raven',  'Badger', 'Whale', 'Koala', 'Hyena', 'Elephant', 'Giraffe', 'Kangaroo', 
//     'Alligator', 'Chimpanzee', 'Hippopotamus', 'Flamingo', 'Koalabeast', 'Porcupine',
//      'Crocodile', 'Lemur', 'Panther', 'Hummingbird', 'Butterfly', 'Caterpillar', 'Kangaroop', 'Kookaburra', 'Woodpecker', 'Tortoise', 
//      'Cockatoo', 'Jellyfish', 'Platypus', 'Penguin', 'Gorilla', 'Octopus', 'Chinchilla', 'Salamander', 'Orangutan', 'Antelope', 'Cobra', 
//      'Cheetah', 'Lynx', 'Toucan', 'Rattlesnake', 'Wallaby', 'Peacock', 'Echidna', 'Armadillo', 'Cassowary', 'Cameleon', 'Meerkat', 'Rhinosaur', 
//      'Squirrel', 'Starfish', 'Tarantula', 'Firefly', 'Scorpion', 'Gorilla', 'Porcupine', 'Hedgehog', 'Cameleon', 'Ostrich'
//     ],
//     hardWords: [ 'Elephant Herd', 'Giraffe Tower', 'Lion Pride', 'Tiger Stripes', 'Monkey Band', 'Zebra Herd', 'Cheetah Coalition', 'Gorilla Troop', 
//     'Hyena Clan', 'Wolf Pack', 'Horse Stable', 'Penguin Colony', 'Squirrel Horde', 'Fox Skulk', 'Antelope Herd', 'Kangaroo Mob', 'Crocodile Nest', 
//     'Owl Parliament', 'Fish School', 'Whale Pod', 'Seal Rookery', 'Flamingo Flock', 'Parrot Flock', 'Toucan Group', 'Polar Bear Family', 'Hippopotamus Bloat', 
//     'Cobra Den', 'Jellyfish Smack', 'Raven Conspiracy', 'Chimpanzee Troupe', 'Sloth Slumber', 'Alligator Congregation', 'Butterfly Swarm', 'Lemur Gang', 
//     'Panther Ambush', 'Koala Clan', 'Giraffe Journey', 'Chameleon Horde', 'Meerkat Mob', 'Rhino Crash', 'Cockatoo Band', 'Salamander Horde'
//       ]
//   },
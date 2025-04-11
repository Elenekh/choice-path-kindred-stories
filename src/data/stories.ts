
export type Choice = {
  id: string;
  text: string;
  nextNodeId: string;
  trait: string;
};

export type StoryNode = {
  id: string;
  type: 'story' | 'choice' | 'ending';
  content: string;
  image?: string;
  choices?: Choice[];
  reflection?: string;
};

export type Story = {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  coverImage: string;
  nodes: StoryNode[];
  startNodeId: string;
};

export type EndingImage = {
  id: string;
  src: string;
  trait: string;
  description: string;
};

export const sampleStory: Story = {
  id: 'the-lost-treasure',
  title: 'The Lost Treasure',
  description: 'An adventure about courage, friendship and decision-making.',
  ageRange: '8-12',
  coverImage: '/placeholder.svg',
  startNodeId: 'start',
  nodes: [
    {
      id: 'start',
      type: 'story',
      content: "You're spending the summer at your grandparents' house near the beach. One day, while exploring the shore, you find an old, worn-out map hidden inside a glass bottle. The map seems to lead to a hidden treasure somewhere nearby. As you study the map, you notice it points to the dense forest behind your grandparents' house.",
      image: '/placeholder.svg',
      choices: [
        {
          id: 'choice-1a',
          text: "Show the map to your grandparents first and ask for their advice",
          nextNodeId: 'node-1a',
          trait: 'cautious'
        },
        {
          id: 'choice-1b',
          text: "Keep the map a secret and explore on your own right away",
          nextNodeId: 'node-1b',
          trait: 'adventurous'
        }
      ]
    },
    {
      id: 'node-1a',
      type: 'story',
      content: "Your grandparents seem excited about your discovery! Grandpa tells you the forest has been around for generations and has many secrets. He suggests you invite your new neighbor, Alex, to join you on the adventure. Alex just moved in last week and hasn't made many friends yet.",
      image: '/placeholder.svg',
      choices: [
        {
          id: 'choice-2a',
          text: "Invite Alex to join you on the treasure hunt",
          nextNodeId: 'node-2a',
          trait: 'inclusive'
        },
        {
          id: 'choice-2b',
          text: "Decide to go alone because you don't know Alex well enough yet",
          nextNodeId: 'node-2b',
          trait: 'independent'
        }
      ]
    },
    {
      id: 'node-1b',
      type: 'story',
      content: "You decide to explore on your own! The forest is denser than you expected, with towering trees that block out much of the sunlight. As you follow the map, you hear a rustling sound behind a large bush. Peeking around it, you discover a kid about your age who seems to be looking for something too. It's Alex, who recently moved into the neighborhood.",
      image: '/placeholder.svg',
      choices: [
        {
          id: 'choice-2c',
          text: "Introduce yourself to Alex and show them the treasure map",
          nextNodeId: 'node-2a',
          trait: 'friendly'
        },
        {
          id: 'choice-2d',
          text: "Hide quickly so Alex doesn't see you or your map",
          nextNodeId: 'node-2b',
          trait: 'secretive'
        }
      ]
    },
    {
      id: 'node-2a',
      type: 'story',
      content: "You and Alex get along great! Together, you follow the map deeper into the forest. After walking for a while, you come to a fork in the path that isn't shown on the map. One path goes uphill through some rocks, while the other follows a stream downhill.",
      image: '/placeholder.svg',
      choices: [
        {
          id: 'choice-3a',
          text: "Take the uphill rocky path that looks more challenging",
          nextNodeId: 'node-3a',
          trait: 'determined'
        },
        {
          id: 'choice-3b',
          text: "Follow the stream downhill which seems easier and safer",
          nextNodeId: 'node-3b',
          trait: 'practical'
        }
      ]
    },
    {
      id: 'node-2b',
      type: 'story',
      content: "On your own, you continue following the map through the forest. The sounds of birds and rustling leaves keep you company. After walking for a while, you come to a fork in the path that isn't shown on the map. One path goes uphill through some rocks, while the other follows a stream downhill.",
      image: '/placeholder.svg',
      choices: [
        {
          id: 'choice-3c',
          text: "Take the uphill rocky path that looks more challenging",
          nextNodeId: 'node-3a',
          trait: 'brave'
        },
        {
          id: 'choice-3d',
          text: "Follow the stream downhill which seems easier and safer",
          nextNodeId: 'node-3b',
          trait: 'cautious'
        }
      ]
    },
    {
      id: 'node-3a',
      type: 'story',
      content: "The rocky path is difficult, but you manage to climb up. At the top, you find an old tree with unusual markings that match symbols on your map. Looking closer, you notice a small opening at the base of the tree, just big enough for a child to crawl through.",
      image: '/placeholder.svg',
      choices: [
        {
          id: 'choice-4a',
          text: "Crawl through the opening to see what's inside",
          nextNodeId: 'ending-1',
          trait: 'curious'
        },
        {
          id: 'choice-4b',
          text: "Look for another way or clue before entering the unknown space",
          nextNodeId: 'ending-2',
          trait: 'careful'
        }
      ]
    },
    {
      id: 'node-3b',
      type: 'story',
      content: "Following the stream leads you to a small waterfall with a cave hidden behind it. According to your map, this might be where the treasure is located. The cave entrance is partially visible through the waterfall's curtain.",
      image: '/placeholder.svg',
      choices: [
        {
          id: 'choice-4c',
          text: "Walk through the waterfall to enter the cave directly",
          nextNodeId: 'ending-1',
          trait: 'direct'
        },
        {
          id: 'choice-4d',
          text: "Look for a drier way to enter the cave without getting wet",
          nextNodeId: 'ending-2',
          trait: 'considerate'
        }
      ]
    },
    {
      id: 'ending-1',
      type: 'ending',
      content: "Inside, you discover not gold or jewels, but a collection of beautiful stones, shells, and handmade crafts, along with a journal. The journal belongs to an older kid who created a special place to share with new friends. There's a note inviting whoever finds this 'treasure' to add something of their own and to use this secret spot as a meeting place for adventures. You've not only found a special place but potentially the start of new friendships in a summer you'll never forget.",
      image: '/placeholder.svg',
      reflection: "How do you feel about the treasure being a special friendship place instead of gold or jewels? What would you add to the collection to share with future friends?"
    },
    {
      id: 'ending-2',
      type: 'ending',
      content: "Your careful approach pays off! You discover a different entrance that leads to a small, glittering cavern. Inside isn't traditional treasure, but a breathtaking collection of crystals that glow in different colors when your light touches them. There's a logbook showing that your grandpa discovered this place when he was your age. He left the map hoping someone curious and clever would find this natural wonder. You can't wait to tell him about your adventure and the natural treasure you discovered.",
      image: '/placeholder.svg',
      reflection: "How would you feel discovering that your grandparent created this adventure for you to find? Would you create a similar adventure for someone else in the future?"
    }
  ]
};

export const endingImages: EndingImage[] = [
  {
    id: 'ending-1',
    src: '/placeholder.svg',
    trait: 'social',
    description: 'You create a beautiful friendship bracelet to add to the collection, hoping to meet the other kids who find this special place.'
  },
  {
    id: 'ending-2',
    src: '/placeholder.svg',
    trait: 'creative',
    description: 'You add your own hand-drawn map to the collection, showing a special spot you discovered near the beach.'
  },
  {
    id: 'ending-3',
    src: '/placeholder.svg',
    trait: 'caring',
    description: 'You leave a small first-aid kit and some snacks for future explorers who might need them.'
  },
  {
    id: 'ending-4',
    src: '/placeholder.svg',
    trait: 'adventurous',
    description: 'You add a small compass to the collection, hoping it will guide future adventurers to discover even more hidden wonders.'
  }
];

export const reflectiveQuestions = [
  "Have you ever found something unexpected that made you happy?",
  "Do you prefer exploring with friends or by yourself?",
  "What's the most interesting place you've discovered?",
  "How do you feel when you have to make a difficult choice?",
  "Would you share a special discovery with others or keep it to yourself?"
];

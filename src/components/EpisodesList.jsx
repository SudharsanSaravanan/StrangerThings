import React, { useState } from 'react'

// Hardcoded episode data from IMDb (up to Season 5 Episode 8)
const EPISODES = [
  // Season 1
  { season: 1, number: 1, title: "Chapter One: The Vanishing of Will Byers", description: "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab." },
  { season: 1, number: 2, title: "Chapter Two: The Weirdo on Maple Street", description: "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Meanwhile, Hopper questions an anxious Joyce about an unsettling phone call." },
  { season: 1, number: 3, title: "Chapter Three: Holly, Jolly", description: "An increasingly concerned Nancy looks for Barb and finds out what Jonathan's been up to. Joyce is convinced Will is trying to talk to her." },
  { season: 1, number: 4, title: "Chapter Four: The Body", description: "Refusing to believe Will is dead, Joyce tries to connect with her son. The boys give Eleven a makeover. Jonathan and Nancy form an unlikely alliance." },
  { season: 1, number: 5, title: "Chapter Five: The Flea and the Acrobat", description: "Hopper breaks into the lab to find the truth about Will's death. The boys try to locate the 'gate' that will take them to Will." },
  { season: 1, number: 6, title: "Chapter Six: The Monster", description: "A frantic Jonathan looks for Nancy in the darkness, but Steve's looking for her, too. Hopper and Joyce uncover the truth about the lab's experiments." },
  { season: 1, number: 7, title: "Chapter Seven: The Bathtub", description: "The government comes searching for Eleven. Eleven looks for Will and Barb in the Upside Down." },
  { season: 1, number: 8, title: "Chapter Eight: The Upside Down", description: "Joyce and Hopper are taken in for questioning. Nancy and Jonathan prepare to fight the monster and save Will." },

  // Season 2
  { season: 2, number: 1, title: "Chapter One: MADMAX", description: "As the town preps for Halloween, a high-scoring rival shakes things up at the arcade, and a skeptical Hopper inspects a field of rotting pumpkins." },
  { season: 2, number: 2, title: "Chapter Two: Trick or Treat, Freak", description: "After Will sees something terrible on trick-or-treat night, Mike wonders whether Eleven's still out there. Nancy wrestles with the truth about Barb." },
  { season: 2, number: 3, title: "Chapter Three: The Pollywog", description: "Dustin adopts a strange new pet, and Eleven grows increasingly impatient. A well-meaning Bob urges Will to stand up to his fears." },
  { season: 2, number: 4, title: "Chapter Four: Will the Wise", description: "An ailing Will opens up to Joyce -- with disturbing results. While Hopper digs for the truth, Eleven unearths a surprising discovery." },
  { season: 2, number: 5, title: "Chapter Five: Dig Dug", description: "Nancy and Jonathan swap conspiracy theories with a new ally as Eleven searches for someone from her past. 'Bob the Brain' tackles a difficult problem." },
  { season: 2, number: 6, title: "Chapter Six: The Spy", description: "Will's connection to a shadowy evil grows stronger but no one's quite sure how to stop it. Elsewhere, Dustin and Steve forge an unlikely bond." },
  { season: 2, number: 7, title: "Chapter Seven: The Lost Sister", description: "Psychic visions draw Eleven to a band of violent outcasts and an angry girl with a shadowy past." },
  { season: 2, number: 8, title: "Chapter Eight: The Mind Flayer", description: "An unlikely hero steps forward when a deadly development puts the Hawkins lab on lockdown, trapping Will and several others inside." },
  { season: 2, number: 9, title: "Chapter Nine: The Gate", description: "Eleven makes plans to finish what she started while the survivors turn up the heat on the monstrous force that's holding Will hostage." },

  // Season 3
  { season: 3, number: 1, title: "Chapter One: Suzie, Do You Copy?", description: "Summer brings new jobs and budding romance. But the mood shifts when Dustin's radio picks up a Russian broadcast, and Will senses something is wrong." },
  { season: 3, number: 2, title: "Chapter Two: The Mall Rats", description: "Nancy and Jonathan follow a lead, Steve and Robin sign on to a secret mission, and Max and Eleven go shopping. A rattled Billy has troubling visions." },
  { season: 3, number: 3, title: "Chapter Three: The Case of the Missing Lifeguard", description: "With El and Max looking for Billy, Will declares a day without girls. Steve and Dustin go on a stakeout, and Joyce and Hopper return to Hawkins Lab." },
  { season: 3, number: 4, title: "Chapter Four: The Sauna Test", description: "A code red brings the gang back together to face a frighteningly familiar evil. Karen urges Nancy to keep digging, and Robin finds a useful map." },
  { season: 3, number: 5, title: "Chapter Five: The Flayed", description: "Strange surprises lurk inside an old farmhouse and deep beneath the Starcourt Mall. Meanwhile, the Mind Flayer is gathering strength." },
  { season: 3, number: 6, title: "Chapter Six: E Pluribus Unum", description: "Dr. Alexei reveals what the Russians have been building, and Eleven sees where Billy has been. Dustin and Erica stage a daring rescue." },
  { season: 3, number: 7, title: "Chapter Seven: The Bite", description: "With time running out - and an assassin close behind - Hopper's crew races back to Hawkins, where El and the kids are preparing for war." },
  { season: 3, number: 8, title: "Chapter Eight: The Battle of Starcourt", description: "Terror reigns in the food court when the Mind Flayer comes to collect. But down below, in the dark, the future of the world is at stake." },

  // Season 4
  { season: 4, number: 1, title: "Chapter One: The Hellfire Club", description: "Still reeling from the events last year, the gang tries to move on with their lives. However, a threat is brewing both on Earth and the Upside Down." },
  { season: 4, number: 2, title: "Chapter Two: Vecna's Curse", description: "A plane brings Mike to California -- and a dead body brings Hawkins to a halt. Nancy goes looking for leads. A shaken Eddie tells the gang what he saw." },
  { season: 4, number: 3, title: "Chapter Three: The Monster and the Superhero", description: "Murray and Joyce fly to Alaska, and El faces serious consequences. Robin and Nancy dig up dirt on Hawkins' demons. Dr. Owens delivers sobering news." },
  { season: 4, number: 4, title: "Chapter Four: Dear Billy", description: "Max is in grave danger - and running out of time. A patient at Pennhurst Asylum has visitors. Elsewhere, in Russia, Hopper is hard at work." },
  { season: 4, number: 5, title: "Chapter Five: The Nina Project", description: "Owens takes El to Nevada, where she's forced to confront her past, while the Hawkins kids comb a crumbling house for clues. Vecna claims another victim." },
  { season: 4, number: 6, title: "Chapter Six: The Dive", description: "Behind the Iron Curtain, a risky rescue mission gets underway. The California crew seeks help from a hacker. Steve takes one for the team." },
  { season: 4, number: 7, title: "Chapter Seven: The Massacre at Hawkins Lab", description: "As Hopper braces to battle a monster, Dustin dissects Vecna's motives -- and decodes a message from beyond. El finds strength in a distant memory." },
  { season: 4, number: 8, title: "Chapter Eight: Papa", description: "Nancy has sobering visions, and El passes an important test. Back in Hawkins, the gang gathers supplies and prepares for battle." },
  { season: 4, number: 9, title: "Chapter Nine: The Piggyback", description: "With selfless hearts and a clash of metal, heroes fight from every corner of the battlefield to save Hawkins - and the world itself." },

  // Season 5 (up to Episode 8; note: Season 5 is upcoming as of 2026, descriptions are speculative or from leaks)
  { season: 5, number: 1, title: "Chapter One: The Crawl", description: "November, 1987. The gang evades the military to scour the Upside Down for Vecna--but fails to notice a threat lurking closer to home." },
  { season: 5, number: 2, title: "Chapter Two: The Vanishing of Holly Wheeler", description: "After a vicious attack at the Wheeler home, Mike and Nancy confront the cost of secrecy, while El and Hopper embark on a rescue mission." },
  { season: 5, number: 3, title: "Chapter Three: The Turnbow Trap", description: "Will gains unique insight into Vecna's next move, giving the crew an opportunity to set a trap. Holly explores her new surroundings." },
  { season: 5, number: 4, title: "Chapter Four: Sorcerer", description: "The military tightens its grip on the town. Mike, Lucas, and Robin orchestrate a daring escape. El comes face-to-face with the enemy." },
  { season: 5, number: 5, title: "Chapter Five: Shock Jock", description: "The gang hatches an electrifying plan to reconnect Will to the hive mind. Tensions flare during a search of the Upside Down's Hawkins Lab." },
  { season: 5, number: 6, title: "Chapter Six: Escape from Camazotz", description: "As Holly and Max fight to escape Vecna's mind, El must find a way into Will's. Joyce wrestles with guilt. Jonathan and Nancy face a turning point." },
  { season: 5, number: 7, title: "Chapter Seven: The Bridge", description: "On the anniversary of Will's disappearance, the party reunites to prepare for battle with world-altering implications." },
  { season: 5, number: 8, title: "Chapter Eight: The Rightside Up", description: "Our heroes prepare to fight Vecna as he plans to end the world as we know it. Meanwhile, in Vecna's mind, the kids are racing to escape." },
];

const TMDB_ID = 66732;

const EpisodesList = ({ onEpisodeSelect }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEpisodes = EPISODES.filter(episode => 
    episode.season === selectedSeason &&
    (episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     episode.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEpisodeClick = (episode) => {
    if (onEpisodeSelect) {
      onEpisodeSelect(episode.season, episode.number);
    }
    // Scroll to watch section smoothly
    const watchSection = document.getElementById('watch-section');
    if (watchSection) {
      watchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 lg:p-8">
      {/* Header */}
      <div className="border-l-4 border-red-600 pl-4 mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-white">Episodes</h1>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-gray-900 p-4 rounded-lg border border-gray-700">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-300">Season</label>
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
            className="px-3 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:border-red-500"
          >
            {Array.from({ length: 5 }, (_, i) => i + 1).map(s => (
              <option key={s} value={s}>Season {s}</option>
            ))}
          </select>
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search episode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:border-red-500"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
        </div>
      </div>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEpisodes.map((episode) => (
          <div
            key={`${episode.season}-${episode.number}`}
            className="group bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-red-600 cursor-pointer transition-all duration-300 p-6"
            onClick={() => handleEpisodeClick(episode)}
          >
            {/* Episode Number Badge */}
            <div className="flex justify-between items-start mb-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">{episode.number}</span>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">{episode.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-4">{episode.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredEpisodes.length === 0 && (
        <div className="text-center py-12 text-gray-500">No episodes found.</div>
      )}
    </div>
  );
};

export default EpisodesList;
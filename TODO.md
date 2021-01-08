
# TODO

## General
  * Add game-icons copyright note to the README.
  * Write the README and some design notes.
  * Our various loadAddon* functions should support excludes.
  * Load userspace addons first and prevent core erroring/overriding?
    * We need similar duplicate handling as Types/Commands in Commando.
    * Or, do we? Will custom stuff just override core stuff?
    * But, what about custom stuff having duplicates? Sticky.
  * Set different embed colors based on type?
    * violet for tutorials 
    * red for kill
    * yellow for exploring?  
    * blue for research
    * orange for crafting
    * green for farming/fishing?
  * Move more config into env? colors? starting location? bot title?
  * To reduce DB work, we could probably cache user-related things in memory.
  * Check all queries to make sure indexes are being used.
  * LoidMob and Location should use options.

## Addons
  * Total Reduction Level (TRL)
    * Kill Reduction Level (KRL)
    * Explore Reduction Level (ERL)
    * Research Reduction Level (RRL)
    * Make Reduction Level (MRL)
  * Add /addons directory with README placeholder and .gitignore.
  * "word of the day" can use client.on() inside command constructor?
  * "luck" addon that listens on remainingTimers = 0 and has 1/2/3/4/5+% chance of granting more for the day.
  * "available <things>" to show what's available to folks.
  * "unlocks" to show next unlocks. or as result of timer resolution?
  * explore: We need a location description for Outt's Butte. How/when to display it?
  * kill: mob "secret" names that are sent through DM and reduce timers?
  * kill: We need a mob description for mosquito. How/when to display it?
  * kill: mob rarity can be handled by seeding availableMobs multiple times.
  * 'define' or 'research' command with different levels for all locations, mobs, etc.?
  * status: getReductionLevel needs to support subtype and subsubtype.
  * status: create incrementState and decrementState?

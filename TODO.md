
# TODO

## General
  * Add game-icons copyright note to the README.
  * Write the README and some design notes.
  * Use Luxon for time handling with its DateTime.plus support?
  * Our various registerAddon* functions should support excludes.
  * Load userspace addons first and prevent core erroring/overriding?
  * We need similar duplicate handling as Types/Commands in Commando.
    * Or, do we? Will custom stuff just override core stuff?
    * But, what about custom stuff having duplicates? Sticky.
  * Set different embed colors based on type? grey for messages, red for kill, etc.  

## Addons
  * Mobs JSON and "kill" command.
  * word of the day can use client.on() inside command constructor.
  * Add /addons directory with README placeholder and .gitignore.
  * "status" command to list high-level guild member stats.
  * "timers" command to list a guild member's timers (most recent 5?)
  * mob "secret" names that are sent through DM and reduce timers?
  * We need a location description for Outt's Butte. How/when to display it?
  * We need a mob description for mosquito. How/when to display it?
    * 'define' or 'research' command with different levels for all locations, mobs, etc.?
  * Total Reduction Level (TRL)
    * Kill Reduction Level (KRL)
    * Explore Reduction Level (ERL)
    * Research Reduction Level (RRL)
    * Make Reduction Level (MRL)
  * "available <things>" to show what's available to folks.
  * mob rarity can be handled by seeding availableMobs multiple times.

## Other
  * Angry? Amber? Arctic? Ice?

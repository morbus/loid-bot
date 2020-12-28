
# TODO

## General
  * Add game-icons copyright note to the README.
  * Write the README and some design notes.
  * Create a new argument type called "mob" that checks against loaded JSON?
  * Use Luxon for time handling with its DateTime.plus support?
  * Our various registerAddon* functions should support excludes.
  * How does Commando handle Command aliases? We want the same for our stuff.
    * `if(command.name === lcSearch || (command.aliases && command.aliases.some(ali => ali === lcSearch))) {`
  * Load userspace addons first and prevent core erroring/overriding?
  * We need similar duplicate handling as Types/Commands in Commando.
    * Or, do we? Will custom stuff just override core stuff?
    * But, what about custom stuff having duplicates? Sticky.
  * "availableMobs": { "atKillReductionLevel": { "0": [
  * We need a location description for Outt's Butte. How/when to display it?

## Addons
  * Mobs JSON and "kill" command.
  * word of the day can use client.on() inside command constructor.
  * Add /addons directory with README placeholder and .gitignore.
  * "status" command to list high-level guild member stats.
  * "timers" command to list a guild member's timers (most recent 5?)

## Other
  * Angry? Amber? Arctic? Ice?

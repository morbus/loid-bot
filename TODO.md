
# TODO

## Bugs
  * "loid begin" fails with "TypeError: The "path" argument must be of
    type string. Received null" because Registry defaults to path-based
    parsing and that's not working with our Plugin support. For now, we've
    disabled all Commando's default commands. We can re-evaluate supporting
    dynamic reloading when the bot gets a little more production-y.

## General
  * Add game-icons copyright note to the README.
  * Write the README and some design notes.
  * Make sure smart quotes are being used in strings.
  * Create a new argument type called "mob" that checks against loaded JSON?
  * Use Luxon for time handling with its DateTime.plus support?
  * Our various registerAddon* functions should support excludes.
  * How does Commando handle Command aliases? We want the same for our stuff.
    * `if(command.name === lcSearch || (command.aliases && command.aliases.some(ali => ali === lcSearch))) {`
  * Load userspace addons first and prevent core erroring/overriding?
  * We need similar duplicate handling as Types/Commands in Commando.
    * Or, do we? Will custom stuff just override core stuff?
    * But, what about custom stuff having duplicates? Sticky.
  * If Commando is "dead", and we need to override various things to support
    our concept of Addons, if and when should we decide on just rolling our own?

## Addons
  * Mobs JSON and "kill" command.
  * word of the day can use client.on() inside command constructor.
  * Add /addons directory with README placeholder and .gitignore.
  * "status" command to list high-level guild member stats.
  * "timers" command to list a guild member's timers (most recent 5?)

## Other
  * Angry? Amber? Arctic? Ice?

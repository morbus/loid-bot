
# TODO

## Bugs
  * "::reload begin" fails with "TypeError: The "path" argument must be of
    type string. Received null" because Registry defaults to path-based
    parsing and that's not working with our Plugin support.

## General
  * Add game-icons copyright note to the README.
  * Write the README and some design notes.
  * Create indexes for (*) + type, subtype, subsubtype?
  * Load userspace addons first and prevent core erroring/overriding?

## Addons
  * "begin" user creation and intro.
  * "begin" should suggest kill or status if reentered.  
  * Mobs JSON and "attack" command.
  * word of the day can use client.on() inside command constructor.
  * Add addons directory with README placeholder.

## Other
  * Angry? Amber? Arctic? Ice?

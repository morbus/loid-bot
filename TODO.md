
# TODO

## General
  * Move everything to core/ for future contrib support?
  * Add game-icons copyright note to the README.
  * Write the README and some design notes.
  * Create indexes for (*) + type, subtype, subsubtype?

  * Can we extend Registry to support commands within their own command
    directory (example/example.js)? This would allow us to ship assets
    with specific commands instead of all in ./assets/. Something like:

    ```
        const obj = require('require-all')({
            dirname     :  path.join(__dirname, 'commands'),
            recursive   : true
        });
        console.log("obj is")
        console.log(obj)

        const commands = [];
        for(const group of Object.values(obj)) {
            console.log('group is '); console.log(group)
            for(let maybeCommand of Object.values(group)) {
                console.log('maybeCommand is '); console.log(maybeCommand)

                if (typeof maybeCommand === 'object') {
                    console.log('command is still an object')
                    for (let command of Object.values(maybeCommand)) {
                        commands.push(command)
                    }
                } else {
                    commands.push(maybeCommand)
                }
            }
        }

        console.log(commands)
    ```

## Commands
  * "begin" user creation and intro.
  * "begin" should suggest kill or status if reentered.  
  * Mobs JSON and "attack" command.
  * word of the day can use client.on() inside command constructor.
  * Instead of replyEmbed, should we use embed with "Morbus Iff's LOID" and avatar?

## Other
  * Angry? Amber? Arctic? Ice?

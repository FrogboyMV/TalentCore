# Talent Core

## Introduction

RPG Maker MV has everything you could ever want when it comes to making the RPG of your dreams.  It’s got weapons, armor, items, magic spells, special abilities, character classes, monsters and more.  What else could you possibly ask for?  Come to think of it, there is one thing that is noticeably missing.  All of the things I just listed mostly revolve around combat.  What about all that time your characters spend outside of combat?  Aren’t they good at anything besides killing monsters?

Well, of course they are!  There just isn’t any core component within RPG Maker MV that covers this.  They really should add that.  But until then, there’s Frogboy’s Talent Core!  What’s this, you say?  What are talents?  Simply put, talents are special stats that you can customize for your game to give your players stuff to do when they aren’t slaying beasts.  What kind of stuff?  That’s pretty much up to you.  Chances are, you’re already doing this kind of thing.  Maybe it’s picking locks, gathering information from a local tavern, finding hidden clues to help solve a mystery or balancing on a tightrope across a large canyon.

By default, you have to tie these abilities to actors or classes and if they aren’t in your group, you can’t perform these actions.  That kinda sucks.  If you want these talents to be something that anyone can do by training in such activities, now it becomes a lot of work and requires quite a few variables and custom events.  This can be mitigated a tiny bit by various plugins but what we really need here is a full-blown system that makes all of this stupid simple, as if it were built right into RPG Maker itself.

And that’s precisely what Frogboy’s Talent Core does!  It lets you easily define all of your character’s out-of-battle talents, class proficiency bonuses, lets your characters earn points when they level up, allows them to use those points to improve their characters however they want, gives them a really nice user interface to interact with and allows you, the developer, to easily obtain or manipulate this information in whatever way works for your game.  This system was designed to largely mimic Skills in the d20 system if you are familiar with tabletop games such as Dungeons & Dragons, Pathfinder RPG or Star Wars d20.  If you know what that is then you know what this plugin does but it can be also be customized and used in other ways as well.

As an added bonus, I also present to you: Frogboy’s Talent-based Traits!  I’m not going to explain much about this plugin as it basically the same thing as my Actor, Class and Race based Traits plugin but for Talents.  Take a look at the page for those similar plugins I made and you should have a good understanding of what the Talents version does.  It should come in handy when you want to allow character advancement based on how your characters build their Talents.  You could even build a pseudo-job system out of these two plugins by upgrading characters weapon and armor proficiencies when they advance the Fighter Talent or hand out magic spells if they advance their Black Mage or White Mage Talents.  Your imagination is the limit.


## Features

* Create a system similar to d20 Skills for your RPG Maker game.
* Create an alignment system similar to Virtues in Ultima.
* Add a robust system of actor variables.
* Create a pseudo job/class system where advancing Talents increases character’s Skills and abilities with the help of the FROG_TalentBasedTraits plugin.
* Incorporate Talent scores into formulas.
* Restrict the use of items or equipment to characters who possess a certain level of talent.
* Shape and customize your Talent system to fit your game.


## How to Use

This plugin is a bit more complex than any of my other ones thus far but setting it up and using it should still be just as easy.  There are a lot of options to cover so grab your popcorn.  It’s easy but there’s a lot here.

### Settings

**Talents**

This is the main parameter where you set up all of the talents you are going to use in your game.  Pretty much everything feeds off what you put in here.  For ease of use or just so you can easily see what kinds of things you can implement in your game, I’ve filled in a default list of talents that largely resembles the d20 Skills that inspired this plugin.  You can modify this list or scrap it completely and create your own.  That’s totally up to you.  It’ll give you something work with if you’re still not sure what this whole talent thing is all about.  Each Talent has four properties.

**Name** - This is the name of your talent, of course.  It’s just used to display to your players.

**Description** - This shows up in the Help box on the Talents screen to give your players a little bit of information on what this talent can be used for.  You have two full lines to work with.

**Abbreviation** - This is important.  It’s the id/key for this talent and you’ll use it often to reference this talent in several other places.  Whenever you issue a script call or plugin command, you’ll use this key to indicate which talent your character is performing.  The examples are all four letters like arca for Arcana or lock for Lockpicking but you don’t have to follow this convention.  I just modeled them after RPG Maker standards like atk and def for Attack and Defense but used an extra letter to avoid reusing one that already exists.  Talent Abbreviations can be any length just as long as they don’t have spaces in them.  If you want to use longer names like arcana and lockpicking, go right ahead.  These are case-insensitive so LOCK and lock will reference the same talent so be careful of that.

**Class Proficiencies** - This is a list of classes that are considered proficient with this Talent.  Some classes are just going to be better suited at learning certain skills and that’s where this comes into play.  Thieves are going to have a higher potential for picking locks.  Wizards are going to know more about Arcana than a Priest who also studies up on it.  And a Swashbuckler is going to be able to walk a tightrope with more grace than a Barbarian no matter how much the Barbarian trains.  The bonus a class get is defined later under the Proficiency Bonus parameter that you’ll see in a little bit.

**Class Signatures** - List of classes that are automatically maxed out in this talent.  Some talents are pretty much a given for certain classes.  What kind of a Thief can’t pick locks?  What kind of Wizard doesn’t learn everything they can about arcane magic?  How can you be a Bard that can’t give some sort of performance?  In d20, these are often known as Sink Skills because it’s pretty much required that you spend points in them.  Class Signature Talents gives you an easy way to guarantee that a class has a talent or two that is maxed out by specifying them here.  These don’t subtract from the classes starting points or points per level so make sure that you take this into consideration when assigning how many points per level a class receives.

Later on, you will encounter a setting for Max Type.  By default, this is set to be relative to the actor’s level.  If you change this setting to “Strict Value” then a Class Signature talent will grant one free talent rank per level instead of max ranks.

**Visibility Mode** - By default, all classes can see and add ranks to any talent.  But you may not want this as it can be handy to piggyback some extra data within talents and want to keep it hidden from your players.  Perhaps you need an Alignment value associated with each actor and want to just use a talent to keep this value.  You can do that but, of course, you don’t want your players adding ranks to it or adjusting the value in any way.  The game will handle that.  For each talent, you can select one of the following three visibility modes.
* **Visible to All** - This is the default.  All classes can see this talent add ranks to it unless one of the other parameters changes that functionality.
* **Visible to None** - This talent is hidden from the player.  It will not show up in their Talent Window which means that they cannot add ranks to it either.  You will need to tell the game how to handle and use this talent.
* **Visible to Specific Classes** - This talent is only visible to classes listed in the Class Visibility parameter.  This is typically only used for talents that are specifically geared towards a certain class.  Maybe you have a Martial Arts talent that only your Monk and Ninja classes can utilize.  You can assign those classes here and only they will be able to see and add ranks to it.

**Class Visibility** - If you selected Visible to Specific Classes as the Visibility Mode in the previous parameter, you can specify the classes that have access to this talent here.  As in the example listed above, you would add your Monk and Ninja classes here for your Martial Arts talent so that they would be able to utilize it while the rest of the classes could not.

**Starting Ranks** - Generally speaking, all of your talents will start at zero ranks and the player will decide what they want to increase and what they don’t.  But some talent systems or even just single talents might work differently.  Say you want to store an actors alignment in a talent.  Alignment often works as a scale starting from 0 for completely evil and maybe 100 as super righteous.  In this case, we would want to initialize the Alignment talent at 50 which would be right in the middle or Neutral and then the game could raise or lower this number based on what decisions the actor makes throughout the game.  This parameter gives you an easy way of initializing this value so that you don’t have to do this manually when the game starts.

Take note that Class Signatures override the Starting Ranks.


**Class Config**

Alright, now you've got all of your talents set up.  It's time for the next important part: Class Configuration.  In Dungeons & Dragons and other d20 tabletop games, Talents (known as Skills) are tied to character classes.  Some classes focus most of their training in physical combat; some focus their training in learning or honing their ability to utilize magic; and others specialize in skills/talents.  All classes gain points every level to advance their talents but some gain more than others.  This isn’t to say that you have to set your talent system up this way but the option is there for you.

**Description** - This is just a short description that you enter in so you can see what this entry is at a glance.  It’s not required but it’s useful when you open this section back up and want to find the information you’re looking for.

**Class** - Select the class that you want to grant talent points to.

**Starting Points** - Number of talent points this class starts the game with.  In d20, most of the time, your characters start with three times the number of points that they get when leveling up.  You don’t have to follow this convention.  You can make your own but the option is here if you need it.

**Points Per Level** - Number of talent points gained at each level.  Pretty self-explanatory.  Every time a character levels up, they get this number of points.


**Actor Config**

This is likely a parameter that you can skip.  I wasn’t even going to include it but I ended up doing so simply for completion.  Typically, the actor has no inherent relationship with talents.  Their class, which is pretty much their profession, and potentially their race are usually what shapes their talent potential.  But say you have four specific actors planned out for your game and each one has a different race tied to them, you can forego setting up Races through this or my Race-based Talents plugins and just tie it to the actor since it’s already set in stone.  Maybe you just want to give different actors an extra advantage and/or disadvantage in some areas because it fits your game.  That can be done here.

**Description** - This is just a short description that you enter in so you see what this entry is at a glance.  It’s not required but it’s useful when you open this section back up and want to find the information you’re looking for.

**Point Bonus/Penalty** - Number of talent points this actor gains or loses per level.  Say you have a specific actor whose backstory says that he’s an avid learner who is always trying out new things and learning new skills, maybe you want him to receive an extra +1 Talent Points per level or whatever.  Maybe you have another character who is a real slacker and rarely puts in much effort to learn new things.  He might get -1 Talent Points per level.

**Talent Bonus/Penalty** - Natural bonuses or penalties to specific talents.  In this section, you can list Talents (via abbreviation like before) and grant a bonus or penalty towards them.  Maybe you have an actor whose backstory is that they she grew up in the wilderness, far away from civilization.  Perhaps your players will still have the option to choose whatever class for this character but you want her to have a +2 to the Nature talent.  This is where you’d configure this sort of thing.

**Talent Check Variable** - This is arguably the most useful parameter in this section and potentially the only one you might use.  This allows you to bind an RPG Maker variable to this actor so that anytime they make a Talent Check, the result will automatically be stored here in addition to anywhere else you decide to store it.  This is useful, particularly in situations when you want to get a check from all of the actors in the party and do something with the results.  What’s a Talent Check?  Oh, sorry.  I will cover that in more detail later.



**Race Config**

This section is if you want to incorporate Races into your game.  Races are a staple of many RPGs and racial talent proficiencies is just as much so.  Halflings are known to be sure-footed and get a +2 to Acrobatics and Climb.  Elves have keen senses and a natural affinity for magic which grants them a +2 to Perception and Arcane.  I’m drawing all of my examples from D&D as it was the main source of inspiration for this plugin so as usual, build your world however you’d like.  To use this functionality, you will need to install the FROG_RaceCore plugin and place it above this plugin in the list.

**Race ID** - The ID of the race as defined in the FROG_RaceCore plugin.

**Point Bonus/Penalty** - Number of talent points this race gains or loses per level.  In D&D, Humans typically don’t have any natural strengths or weaknesses so they tend to not get a lot of bonuses or penalties.  They are sort of the benchmark that all of the other races are based off of.  The one thing that Humans typically do excel in is versatility and because of this, they get an extra +1 Talent Point per level.  You could also use this to give a race a penalty to Talent Points per Level if you wanted.

**Talent Bonus/Penalty** - Natural bonuses or penalties to specific talents.  While it often doesn’t make a lot of sense for actors to have natural bonuses or penalties for certain talents, it usually makes perfect sense for races.  Dwarves, Elves, Gnomes, <insert your own custom race here>, they almost always excel over Humans in some talents and aren’t quite as remarkable in others.  This is where you’ll define these adjustments.


**Other Settings**

From here on out, most of the parameters are just single values that you fill in without having to drill down into groups of other parameters.  These parameters aren’t tied together like the ones above were.

**Add to Formulas** - Wait.  Didn’t you say that talents were out-of-battle stats?  I sure did and that is their primary purpose but this is your game, not mine.  I highly suggest making your Talent Abbreviations four or five characters long so that you don’t accidentally overwrite one of the core attributes that the system needs.  If you have no need to use talents in formula boxes, turn this option off.

**Save Talents Object** - Setting this to true allows you to modify the $dataTalents object, which contains most of the information within the plugin parameters, when the player saves the game.  By default, this object is built from the plugin parameters when a new game is started or a saved game is loaded.  This is usually what you’ll want.  If, for some reason, you need need to alter this data in-game and have those changes persist until the end of the game, you’ll need to turn this option on.

**Max Type** - There are two options here that will allow you to customize how your players assign their talents.
* **Relative to Level** - This option sets a cap on how many ranks a player can assign to a single skill based on the actor’s level plus the number entered in for Max Ranks.  If the Max Ranks is 3, an actor cannot assign more than Level+3 ranks into any one skill.
* **Strict Value** - This option sets a cap on how many ranks a player can assign to a single skill based on the number entered in for Max Ranks.  If Max Ranks is 100, an actor can freely add ranks to a single skill until the max is reached.

**Max Ranks** - The maximum number of points that can be spent on a Talent is based on the Max Type setting.  This is the value that is either added to the character level or the absolute maximum that an actor can ever achieve without bonuses, of course.

**Proficiency Bonus** - This is a bonus added to any skill that a class is proficient with as indicated in the Talents parameter.  Here is where you define the bonus value for the classes you listed in Class Proficiencies earlier.  As I said before, Thieves train to pick locks as part of being a Thief.  Wizards study Arcana as part of their class.  So it makes sense that these classes would just naturally have higher possible Talent Scores in certain skills.  How much higher is where this bonus comes into play.  If this value is 3 and you defined a Lockpicking skill and made the Thief class proficient with it, they will start the game with a Talent Score of 3 even before placing any ranks in it.


### Talent Checks

Checks are an integral part of the Talent system.  It’s neat to have your players build up their character’s out-of-combat abilities but it wouldn’t do them much good unless there were ways to make sure that they possessed enough skill to accomplish whatever task stood in front of them.  That’s where talent checks come in.  So how does a Talent Check work?  Well, that’s mostly up to you.  I’ve provided three choices on how to manage this and the choice you make will largely depend on how much RNG (random number generator) you like in your game.  To perform a Talent Check, you can use the following Plugin command.

`TALENT CHECK [list of parameters]`

To avoid making you memorize the exact order of the parameters and have you enter in cryptic plugin commands like TALENT CHECK 1 0 5 4 13 27 etc, I’ve done my best to streamline this with name/value pairs.  Each parameter name is immediately followed by a colon which is immediately followed by the value.  This way, you don’t have to remember the order of all these parameters and as you’ll see in a minute, you won’t have to specify all of them either.  I’ll show you some examples after I explain what all of the parameters do.

**type** - There are three types of Talent Checks: MAX, RND and ROLL.
* **MAX** - Returns the character’s current Talent Score.  You get no randomness with this type so you’ll mostly be dealing with all or nothing scenarios.  The character is either talented enough to perform the task or is not.
* **RND** - Random number between 1 and Max Score.  With this check, you still have the same maximum potential to perform any given task but similar to real life, you don’t always perform at your maximum talent level.  Sometimes you nail it.  Other times, you can totally fumble it, especially if you are under pressure.
* **ROLL** - If you love tabletop then you love rolling dice and here’s the option that emulates it.  You will define which die and how many are rolled.  This allows you to have more fine control over the randomness by giving your characters a Min and Max potential for each check and also by introducing bell curves into the mix so that most of the checks usually fall closer to the middle of their potential while still allowing for larger successes and greater failures.

**aid** - This is the ID of the actor who is performing the talent check.  If no Actor ID is specified, the system will determine who has the best Talent Score for the listed talent and they will be the one who performs the check.

**abbr** - The Talent Abbreviation which indicates which talent is being performed.

**target** - The Target Number that the character making the check needs to reach in order for the check to be successful.  Anything less than the target results in failure.

**mod** - This is an on-the-fly modifier that can be thrown in by the game if the character making a check is in an advantageous position or at a disadvantage.  Say your character is trying to stop a fight from breaking out at a tavern and they have previously made friends with one of the NPCs that’s involved.  You might want to throw them a +2 bonus modifier as their odds of success are better.  But if they they made different decisions earlier and that person instead doesn’t like your character, it will likely be more difficult to for them to stop the fight from breaking out.  In this case, they get a -2 penalty for this check.

**die** - If you use the ROLL type for a Talent Check, this represents which die is rolled.  This doesn’t actually need to be a standard die at all.  It can be any number.  Whatever number you choose, the check will randomize a number between 1 and the value you enter here so if you want to roll a 37 sided die (1-37), you can do that by just entering in 37.

**dcount** - This is the number of dice to roll for the check.  The standard d20 roll is, of course, 1d20.  This would be dcount:1 die:20.  The die and dcount options allow you to set up different probability curves and such.  2d10 will give you results between 2-20 in a nice probability wedge that nudges results near the middle (11 will occur far more often than 2 or 20) while 3d6 gives you a bell curve where results outside of the middle few values are much more rare and become even more so as you add more to the dcount.

**view** - The view mode determines how the results will be be displayed and whether your players have the opportunity to assess the difficulty of the check and decide for themself to attempt it or to pass.  There are three view modes.
* **None** - This will cause the check to happen entirely out of view from the player.  These are often times called passive checks as the player may not ever know that they even made one.  Say your party is walking through a dungeon and are passing by a secret door.  You could make a check with the character who has the best Perception talent (or even with all of the characters individually) and see if they notice that a secret door is near them.  If the character fails the check, they get no feedback and will probably just keep walking by.  If they pass the check, you can toss in a short dialog or maybe some sparkles or something to let the player know that they spotted the secret.
* **Show** - This option will inform the player that they are making a Talent Check and provide a nice new window to facilitate the process.  The window will pop up in the middle of the screen, display the Target Number alongside a gauge labeled Difficulty, and another Talent Check gauge will begin to fill from completely empty to whatever their check result is.  I designed the window like this to instill a couple seconds of anxiety and anticipation as they won’t know if the bar will stop short (fail) or reach/exceed the Target Number (success).  I’m trying to capture the anticipation you get in tabletop games when you roll the dice and are adding up the result to see if you succeeded or not.
* **Ask** - The Ask option works exactly like the Show option except for one very important detail.  Before the check is made, the player gets to see the Talent Check window and the difficulty of the check that is about to be performed and asks the player if they want to attempt the check or decline the attempt.  Say your Barbarian has a really good Jump talent and decides that he’s going to jump from one cliff edge to another because there is a treasure chest on the other side.  When the Ask check is initiated, he doesn’t actually attempt the jump right away.  The player gets to see the the difficulty first and determine whether it’s worth the risk.  If the Difficulty bar is low, their odds are good and they’ll probably go for it.  If the bar is high, they would probably be best off coming back later when the Barbarian’s jump has improved and they’re less likely to take a bunch of falling damage on a likely fail.

**rem** - Key for a check that the player cannot retry without getting the same result.  This property is only valid for the RND and ROLL check types.  Say your Thief tries to pick a difficult lock an is unable open it.  What’s stopping them from just trying over and over again until they get a lucky RNG value to get the lock open?  One way is institute a negative consequence for failure.  Maybe there’s a chance the party gets into a fight each time the Thief fails at their attempt.  It makes sense as the group is waiting a long time as the Thief keeps trying.  Another way is prevent getting different Talent Check results on retries.  If you send a rem value, the result of the first attempt will be stored and any subsequent attempts will yield the same result.  In essence, the first try determines the character’s ability to pick the lock.  If they fail, they cannot pick the lock.  Other actors may try if given the opportunity but only once.  Once a character levels up, they are then able to make another attempt even if they didn’t raise their ranks.  They have advanced and another attempt is warranted.

**var** - This is the ID of the Variable that you want to store the Talent Check Result into after it is made.  The value stored will be in relation to the Target Number so 0 means that the check result matched exactly and that they barely succeeded.  A negative number means the check failed by that amount and a positive number means the check exceeded the target by that amount.  Returning the results in this way allows you to gauge the level of success or failure very easily if you want to create more than two outcomes.  Maybe you want to provide a “great success” option that does more than barely succeeding.  For instance, maybe your character is making a Disable Trap check to disable a trap and they get a phenomenal check result.  Perhaps this trap normally resets itself after being disabled but because of the check exceeding the target by 5 or more, it is no longer a threat ever again.  You could also do the same for minor failures.  Say that Barbarian attempted the jump and failed by just 1.  You could make the player think he’s going to fall into the chasm but have him grab onto the ledge instead turning it into a success.  Or perhaps it’s still a failure but now the character at least gets to make a mandatory Climb check to salvage the initial botched check and turn it back into a success.

### Default Talent Checks

Most of the above Talent Check parameters are also in the RPG Maker plugin parameters under “Default Talent Checks” grouping.  What these do is specify values that are used as default if you don’t pass the value to the plugin when making a check.  When constructing your own Talent system, consistency is a good thing.  You will likely want almost all of your checks to follow the same pattern as it would be confusing to your players if some talent checks rolled 1d20 and other used 3d6 or used the Max or Rnd check types.  Because of this, it makes sense to just define defaults so that you don’t have to specify every time you need a check.  If you almost always use var:5 type:roll dcount:2 die:10 view:ask then you can fill them into the editor’s plugin parameters and just leave them out when calling for a check.  If you decide later that you want your system to work a little differently, you won’t have to search out dozens, if not hundreds, of Plugin Command calls to change them all accordingly.  It also makes it a lot easier to look at a Plugin Command call and know what it’s doing without all of the redundant parameters getting in the way.

There are a few more editor plugin parameters that will let you set up some needed functionality.

**Normalize Target Number** - This is set to false by default but I recommend setting it to true.  Because there are different ways to specify Roll Type (MAX, RND, ROLL) and you may need to switch between them in order to find the type that’s best for your game, normalizing the Target Number makes sense.  What this does is allow you to always specify the desired Target Score in place of a Target Number like you would do with the MAX Roll Type.  If you switch to the RND Roll Type, now the Target Number will divide in half for a 50-50 chance of success.  When rolling dice (ROLL), the Target Number will be normalized to half of the average roll plus the Target Number provided.  What this means is that you can always just specify the Target Score you want the player to have to either pass the check for MAX type or have a 50-50 chance for the RND and ROLL types.  If you change the ROLL Type, Die Type or Die Count at any time, your Target Numbers will auto-adjust without the need to go back and update your Target Numbers.

**Named Checks** - You’ll find that a lot of your checks are repeated many times.  Say your game allows the player to gather information in a tavern and if successful, you gain a clue that will lead you to a secret treasure or some other optional reward.  Let’s also say that the Target Number of this check is always 15.  You can set up a named check called TavernClue with a Target Number of 15 here and when you call for a Talent Check, you can specify TavernClue as the target like this: target:TavernClue.  Maybe detecting a pit trap is always has a Target Number of 12.  You can create a named check for PitTrap, use it as your target and it will be converted to 12.  This is very helpful because when developing, sometimes you need to play around with the numbers and setting up named checks makes it so that you won’t have to manually change all of your checks.

**Named Modifiers** - This is the exact same concept as Named Checks but applied to Modifiers.  Modifiers exist to adjust for situations when a check may be easier or harder than normal as they add or subtract from the Target Number.  Maybe your game makes dungeons dark and visibility is cut way down unless you light a torch or cast a Light spell.  A Talent Check such as Perception will be affected by whether the players have light or not.  You can create a named modifier called Dark, give it a modifier of 5 and pass it to the Talent Check if the players don’t have a source of light.  This would look like mod:Dark and will make the Perception check more difficult as it will raise the Target Number of the check by 5.  If the players do have light then you would refrain from passing this named modifier.  Named modifiers can also be stacked by sending them as a comma-delimited list to the mod parameter.  Maybe visibility in a cave is still hampered by the darkness which comes with a +5 to the Target Number for Perception Checks but a light source will stack on a Light named modifier that grants a -3 to the Target Number.  This would look like mod:Dark,Light or mod:Light,Dark which would add 5 - 3 to the Target Number and only increase the difficulty by 2 instead of 5.

One word of warning.  Named Modifiers have no way of determining when they make sense to a particular Talent Check.  They are just names converted to numbers.  If your player is gathering info from a tavern and you pass the Light named modifier to the Persuasion check, it’ll just convert it to -3 and make the check easier even though it makes no sense.  You have to make sure that you use these in the proper situations.

**Decline Check Value** - Because of way talent check results work, you need to set up a specific number that is returned if the player decides to decline a check when given the opportunity.  The default is set to 9999 as it’s an easy number to remember and it’s unlikely that an actor will ever exceed a check by that high an amount.  You can change this value if you’d like here.

**Talent Bar Increment** - When a Talent Check is shown, this is the amount by which the Check gauge increases with each redraw.  Depending on how large or small your numbers are configured, when you show the Talent Check window and the bar increases up to the check result, it may go too fast or too slow.  This allows you to adjust the increment that the animated gauge uses.  This is essentially the size of one chunk of the bar.

**Talent Bar Wait** - This is the wait time in milliseconds between redraws when the Talent Check bar is rising to its Talent Check score.  The two “Talent Bar” values work hand in hand and may need to be adjusted to give you the growth speed you want in a way that doesn’t look choppy or laggy.  The bar will wait this long until it draws the next chunk.


*Examples Plugin Command calls:*

```
TALENT CHECK var:5 type:max aid:1 abbr:perc target:4 view:none
```
Actor ID 1 will use their Max Score in the Perception (pct) talent and see if it meets a target of 4 or more.  The result will be stored in Variable ID 5.

```
TALENT CHECK var:6 type:rnd aid:2 abbr:jump target:3 view:ask
```
Actor ID 2 will be asked if they want to attempt a Jump (jmp) check.  The result will be stored in Variable ID 5.

```
TALENT CHECK var:7 type:roll aid:3 abbr:arca mod:2 target:13 view:show dcount:1 die:20
```
Actor ID 3 will be shown whether they know some detail of magical lore through an Arcana (arc) check.  A roll of 1d20 will be made, +2 will be added to the character’s Arcana Score and the result will be targeting the difficulty of 13.  The result will be stored in Variable ID 7.

```
TALENT CHECK abbr:lock target:11
```
Your best lockpicker will attempt a check using all of the default values specified in the editor’s plugin parameters. This is likely what most of your Plugin Command calls will look like.

```
TALENT CHECK aid:v[8] abbr:v[9] target:v[10]
```
This is a way that you can more easily run a check through all of the party members by utilizing variables instead of hard-coded values.  You can set variable 8 to the ID of the party leader, variable 9 to the Talent Abbreviation and variable 10 to the Target Number.  Run the check, change variable 8 to the next person in the party and run it again.  Do the same for the last couple party members and you’re done.  While you could still hard-code these values for the four checks, changing the values if you decide to do so becomes more cumbersome.  Just a little nicety I threw in to make your development a little easier.

If you prefer using JavaScript calls instead of Plugin Commands, you can do the following to get the same effects as above.

*Example Script calls:*

```javascript
var x = FROG.Talents.talentCheck({ var: 5, type: max, aid: 1, abbr: ‘perc’, target: 4, view: ‘none’ });
var x = FROG.Talents.talentCheck({ var: 6, type: rnd, aid: 2, abbr: ‘jump’, target: 3, view: ‘ask’ });
var x = FROG.Talents.talentCheck({ abbr: ‘lock’, target: 11 });
var x = FROG.Talents.talentCheck({ var: 7, type: roll, aid: 3, abbr: ‘arca’, mod: 2, target: 13, view: ‘show’, dcount: 1, die: 20 });
```

*Other useful Plugin Commands and Script Calls:*

Open the Talents Menu.
```
TALENT OPEN
```
```javascript
SceneManager.push(Scene_Talents);
```

Get the current Talent Points for an actor.
```
TALENT GETPOINTS [actorId] [variableId]
```
```javascript
FROG.Talents.getTalentPoints(actorId);
```

Set the Talent Points for an actor.
```
TALENT SETPOINTS [actorId] [points]
```
```javascript
FROG.Talents.setTalentPoints(actorId, points);
```

Add Talent Points to an actor’s pool.
```
TALENT ADDPOINTS [actorId] [points]
```
```javascript
FROG.Talents.addTalentPoints(actorId, points);
```

Remove Talent Points from an actor’s pool.
```
TALENT REMPOINTS [actorId] [points]
```
```javascript
FROG.Talents.removeTalentPoints(actorId, points);
```

Get the current Talent Ranks for an actor. [abbr] is the Talent Abbreviation.
```
TALENT GETRANKS [actorId] [abbr] [variableId]
```
```javascript
FROG.Talents.getTalentRanks(actorId, abbr);
```

Set the Talent Ranks for an actor’s talent.
```
TALENT SETRANKS [actorId] [abbr] [ranks]
```
```javascript
FROG.Talents.setTalentRanks(actorId, abbr, ranks);
```

Add Talent Ranks to an actor’s talent.
```
TALENT ADDRANKS [actorId] [abbr] [ranks]
```
```javascript
FROG.Talents.addTalentRanks(actorId, abbr, ranks);
```

Remove Talent Ranks from an actor’s talent.
```
TALENT REMRANKS [actorId] [abbr] [ranks]
```
```javascript
FROG.Talents.removeTalentRanks(actorId, abbr, ranks);
```

Get the current Talent Score for an actor.
```
TALENT GETSCORE [actorId] [abbr] [variableId]
```
```javascript
FROG.Talents.getTalentScore(actorId, abbr);
```

### Enemy Talent Scores and Target Numbers

Enemies can have talents too.  This is useful for formula boxes where skills might call upon said talents.  You may also just want to get an enemy’s Talent Score.  But it can also be useful for something known as opposed checks.  Opposed checks are Talent Checks where the Target Number is derived from the talents of an enemy as opposed to some static task.  A very common one is Stealth vs. Perception.  An enemy is hiding and the actor needs to make a check to see if they spot them.  You can use the ENEMYTN to get a Target Number based on the enemy’s Talent Score and store it into a variable so that it can be used in the actor’s Talent Check.  The check type is important here as it will determine how the Target Number is calculated.

* **MAX** - This just returns the enemy’s Talent Score so that it can be compared to the actor’s Talent Score.  Whichever one is better will win the check.
* **RND** - This will return the enemy’s Talent Score divided by 2 and rounded down.  Because the actor’s Talent Check is a random number between 1 and their Talent Score, the enemy’s score is halved to make it an average.  If an actor and enemy both have the same score, there should be about a 50-50 chance that the actor will succeed.
* **ROLL** - This will also return the average result that the enemy would get if they were making a check based on the dice rolled and the size of the dice.  If a Bat has a Stealth of 5 and the check is 1d20, the Target Number of 15 will be returned.  This is calculated by halving the total maximum roll of the dice and then adding the Talent Score to the result.  If a Bat actually made a Talent Check, the average roll in this case would be 10.5 rounded down plus the bat’s score of 5.

Get a Talent Score from an enemy.
```
TALENT ENEMYSCORE [enemyId] [abbr] [variableId]
```

If a Bat has a talent score of 5, the value of 5 will be stored in variable 12.
```
TALENT ENEMYSCORE eid:1 abbr:stea var:12
```
```javascript
FROG.Talents.getEnemyTalentScore(enemyId, abbr);
```

Get a Target Number from an enemy
```
TALENT ENEMYTN [parameters]
```

Enemy checks can utilize some of the same parameters as Talent Checks: var, type, eid, abbr, die and dcount.  Default values will fill in when not specified.
```
TALENT ENEMYTN eid:1 abbr:stea var:12
```
```javascript
FROG.Talents.enemyTargetNumber({
	eid: 1,
	abbr: ‘stea’,
	var: 12
});
```

### Commands

Congratulations!  You’ve got your Talent system set up now.  All of the parameters that follow are simply for styling and personalization.  While Talents is a good name for my designed purpose, this plugin is pretty customizable and can be used for many different systems.  The name Talents may not suit your needs.  Maybe you want to use this plugin to create personality traits for a dating simulator.  Perhaps you just want to use a different name instead, like say Abilities, Proficiencies, Mastery, Vocations, Jobs, Crafts, Specializations, Expertise etc.  It’s your game.  Brand the system how you want and make it your own.  That’s what you’ll be doing here.

**System Mode** - This is a quick way to choose how your game will use the Talent system from a UI standpoint.  You may want the full experience or your game may work a little different than what I designed for so this gives you some flexibility.
* **Full** - Players acquire points and build their talents.  If you to want to use the system in the same way as I describe throughout this documentation, this is the option you want.  Players get points, they apply those points to whichever talents they want to build within the framework that you specify and they get all of the menu options and windows required to do so.
* **View** - Players can see their talents but not change them.  The Talents main menu option still shows up and the players can go in and see their list of talents, ranks and scores but they don’t get points to build them up like in Full mode.  This is for games that want a similar system to what this plugin provides but they want their game to distribute the points instead.  As an example, I will refer to the game Ultima and its Virtue system.  In Ultima 4 and above, characters have 8 virtues (Honesty, Compassion, Valor, Justice, Sacrifice, Honor, Spirituality and Humility) that they either build or lose throughout the game based on the decision they make.  If they give money to a beggar, their Sacrifice goes up.  If they rob someone’s house, it goes down (or several of them go down, not sure).  If the players live the in the ideal of an Avatar and do all the right things, they get rewarded by being able to beat the game and maybe some other things.  The actions they take adjust the Talent Ranks instead of the point system.
* **Hide** - All Talent menus and windows are hidden from view.  If you want to use this plugin in a way where showing your players the Talent window just doesn’t make sense, you can select this option and hide it from them.  They’ll never know what you’re doing behinds the scenes.

**Main Menu** - This is the name of the command that will display in the main menu.

**Talents Menu** - This is the name of the command that will display in the talents menu.

**Exit** - This is the name of the command that exits the user from the talents menu.

**Finish** - This is the name of the command that commits their changes after applying talent points.


### Text

**Points Text** - This is the text that shows up in the Points box.

**Talents Text** - This is the header text that shows up in the Talents window.

**Ranks Text** - This is the header text that shows up in the Talents window.

**Bonus Text** - This is the header text that shows up in the Talents window.

**Score Text** - This is the header text that shows up in the Talents window.

**Difficulty Text** - This is the text that is displayed on the Difficulty gauge when a Talent Check is performed.

**Talent Check Text** - This is the text that is displayed on the Talent Check gauge when a Talent Check is performed.

**Success Text** - This is the text that is displayed when a Talent Check succeeds.

**Success Color** - This is the color of the Success Text.

**Fail Text** - This is the text that is displayed when a Talent Check fails.

**Fail Color** - This is the color of the Fail Text.


### Style

**Show Ranks** - Show or hide the Ranks column in the Talents window.

**Show Bonus** - Show or hide the Bonus column in the Talents window.

**Show Score** - Show or hide the Score column in the Talents window.

**Show Check Numbers** - Show or hide the Difficulty and Talent Check numbers.

**Gauge Height** - Pixel height of the gauges on the Talents and Talents Check screens.

**Gauge Color Type** - Color code your gauges for proficient/non-proficient or a rolling series of colors.
* **Proficiency** - All of your Talent window gauges will show up in one of two colors.  One color will let your players know that the character is proficient with this talent and is receiving the requisite bonus and the other color represents non-proficient talents.
* **Color List** - This option sets your gauges to a set of colors that you define.  If the end of the color list is reached, any remaining talent gauges will roll back to the beginning of the color list and run through the colors again.

**Proficient Color** - If using the Proficiency option, this is the color of talent gauges that an actor is proficient with.

**Non-proficient Color** - If using the Proficiency option, this is the color of talent gauges that an actor is not proficient with.

**Signature Color** - If using the Proficiency option, this is the color of gauges that an actor has a signature talent.  These talents are automatically maxed out so no points can be spent on them.

**Color List** - If using the Color List option, this is a repeating list of colors that your gauges will use.

**Font Size** - Font size in the Talents window.  Scaling down the font size in this window arguably looks better.


### Note Tags

I’m sure you’re wondering by now if there’s a way to add bonuses to weapons, armor, items and states and the answer is, of course, yes.  For these, I decided that Note Tags seemed to be the way to go.  It just made more sense.  Bonuses to weapons and armor are applied when said equipment is worn by an actor.  Bonuses to Items are applied to all actors as long as the item is in the party’s possession so be careful with these.  State bonuses are applied as long as the State is active on an actor, the primary use of which is to be applied by Skills.  You could have Skill/Magic Spell that makes a character grow webbed feet and grant them a +10 to Swim.  An Invisibility spell could grant a large bonus to a Stealth talent.  There are only a couple tags you need to know.

Bonuses and Penalties to Equipment, Items and States

*Adding bonuses and penalties:*
```
<TalentBonus: [bonus_1] [abbr_1], [bonus_2] [abbr_2], … [bonus_n] [abbr_n]>
```

*Examples (the + is optional):*
Add +3 to Religion: `<TalentBonus: +3 reli>`
Add +2 to Nature & -2 to Arcana: `<TalentBonus: +2 natu, -2 arca>`


### Talent Requirements

Some weapons, armor and items are just not usable without extensive training.  Medicine that can bring a person back from the dead is probably more complicated than just shoving a potion down someone’s throat.  It would likely require years of learning about treatments and medicine to effectively administer.  Items may even require a certain level of talent to use on yourself.  These would typically be items that let an actor learn spells but I’m sure that there could be other use cases.  You may also want to build a system where a Level 1 character just can’t properly wield the legendary Excalibur sword without some kind of martial talent training.  Maybe the way armor proficiency works in your game is for actors to build up an Armor Training talent.  Talent requirements give you a way to restrict the use of certain items and equipment unless that character has enough Talent Ranks or a high enough Talent Score (your choice).

*Talent Requirements (Equip, Get and Give):*
```
<TalentReq: [abbr] [rank/score] [required value]>
<TalentReqGet: [abbr] [rank/score] [required value]>
<TalentReqGive: [abbr] [rank/score] [required value]>
```

*Examples for equipment:*
Equip Wizard’s Cloak requires 7 ranks of Arcana: `<TalentReq: arca rank 7>`
Equip an Intelligent Sword requires a Talent Score of 30 in Persuasion: `<TalentReq: pers score 30>`

*Examples for Item Use*:*
Hi-potion requires a talent score of 5 Medicine to use on yourself or anyone else: `<TalentReqGive: medi score 5>`
Fire Spell requires a talent rank of 3 Arcana to use on yourself and thus, learn Fire: `<TalentReqGet: arca rank 3>`

* Note that when an item with a requirement is used, the plugin will find the actor with the best Pharmacology score that meets the requirement when outside of battle.


## Terms of Use

This plugin can be used in commercial or non-commercial projects.  You also have my permission to write and share plugins that add to or extend the functionality of this plugin.  While not required, if you use this in a commercial game, a free copy of the game would be nice as I put a lot of work into this and would love to see how you used it in your game.

Credit Frogboy in your work.


## Changelog

Version 1.0 - Initial release

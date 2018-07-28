//=============================================================================
// Frogboy RMMV Plugin
// FROG_TalentCore.js
//=============================================================================

var Imported = Imported || {};
Imported.FROG_Talents = true;

var FROG = FROG || {};
FROG.Talents = FROG.Talents || {};
if (!Imported.FROG_Core) console.error("This plugin requires FROG_Core");

/*:
 * @plugindesc FROG_TalentCore v1.3.2 Talent system that closely resembles Skills in Dungeons & Dragons
 * @author Frogboy
 *
 * @help
 * Talent system that closely resembles Skills in Dungeons & Dragons
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV has everything you could ever want when it comes to making the
 * RPG of your dreams.  It’s got weapons, armor, items, magic spells, special
 * abilities, character classes, monsters and more.  What else could you
 * possibly ask for?  Come to think of it, there is one thing that is
 * noticeably missing.  All of the things I just listed mostly revolve around
 * combat.  What about all that time your characters spend outside of combat?
 * Aren’t they good at anything besides killing monsters?
 *
 * Well, of course they are!  There just isn’t any core component within RPG
 * Maker MV that covers this.  They really should add that.  But until then,
 * there’s Frogboy’s Talent Core!  What’s this, you say?  What are talents?
 * Simply put, talents are special stats that you can customize for your game
 * to give your players stuff to do when they aren’t slaying beasts.  What kind
 * of stuff?  That’s pretty much up to you.  Chances are, you’re already doing
 * this kind of thing.  Maybe it’s picking locks, gathering information from a
 * local tavern, finding hidden clues to help solve a mystery or balancing on a
 * tightrope across a large canyon.
 *
 * By default, you have to tie these abilities to actors or classes and if they
 * aren’t in your group, you can’t perform these actions.  That kinda sucks. If
 * you want these talents to be something that anyone can do by training in
 * such activities, now it becomes a lot of work and requires quite a few
 * variables and custom events.  This can be mitigated a tiny bit by various
 * plugins but what we really need here is a full-blown system that makes all
 * of this stupid simple, as if it were built right into RPG Maker itself.
 *
 * And that’s precisely what Frogboy’s Talent Core does!  It lets you easily
 * define all of your character’s out-of-battle talents, class proficiency
 * bonuses, lets your characters earn points when they level up, allows them to
 * use those points to improve their characters however they want, gives them a
 * really nice user interface to interact with and allows you, the developer,
 * to easily obtain or manipulate this information in whatever way works for
 * your game.  This system was designed to largely mimic Skills in the d20
 * system if you are familiar with tabletop games such as Dungeons & Dragons,
 * Pathfinder RPG or Star Wars d20.  If you know what that is then you know
 * what this plugin does but it can be also be customized and used in other
 * ways as well.
 *
 * Features
 *    Create a system similar to d20 Skills for your RPG Maker game.
 *    Create an alignment system similar to Virtues in Ultima.
 *    Add a robust system of actor variables.
 *    Create a pseudo job/class system where advancing Talents increases
 *        character’s Skills and abilities with the help of the
 *        FROG_TalentBasedTraits plugin.
 *    Incorporate Talent scores into formulas.
 *    Restrict the use of items or equipment to characters who possess a
 *        certain level of talent.
 *    Shape and customize your Talent system to fit your game.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * This plugin is a bit more complex than any of my other ones thus far but
 * setting it up and using should still be just as easy.  There are a lot of
 * options to cover so grab your popcorn.  It’s easy but there’s a lot here.
 *
 * Settings
 * --------
 * Talents
 *
 * This is the main parameter where you set up all of the talents you are going
 * to use in your game.  Pretty much everything feeds off what you put in here.
 * For ease of use or just so you can easily see what kinds of things you can
 * implement in your game, I’ve filled in a default list of talents that
 * largely resembles the d20 Skills that inspired this plugin.  You can modify
 * this list or scrap it completely and create your own.  That totally up to
 * you.  It’ll give you something work with if you’re still not sure what this
 * whole talent thing is all about.  Each Talent has four properties.
 *
 * Name - This is the name of your talent, of course.  It’s just used to
 * display to your players.
 *
 * Description - This shows up in the Help box on the Talents screen to give
 * your players a little bit of information on what this talent can be used
 * for.  You have two full lines to work with.
 *
 * Abbreviation - This is important.  It’s the id/key for this talent and
 * you’ll use it often to reference this talent in several other places.
 * Whenever you issue a script call or plugin command, you’ll use this key to
 * indicate which talent your character is performing.  The examples are all
 * four letters like arca for Arcana or lock for Lockpicking but you don’t have
 * to follow this convention.  I just modeled them after RPG Maker standards
 * like atk and def for Attack and Defense but used an extra letter to avoid
 * reusing one that already exists.  Talent Abbreviations can be any
 * length just as long as they don’t have spaces in them.  If you want to use
 * longer names like arcana and lockpicking, go right ahead.  These are case-
 * insensitive so LOCK and lock will reference the same talent so be careful
 * of that.
 *
 * Class Proficiencies - This is a list of classes that are considered
 * proficient with this Talent.  Some classes are just going to be better
 * suited at learning certain skills and that’s where this comes into play.
 * Thieves are going to have a higher potential for picking locks.  Wizards are
 * going to know more about Arcana than a Priest who also studies up on it. And
 * a Swashbuckler is going to be able to walk a tightrope with more grace than
 * a Barbarian no matter how much the Barbarian trains.  The bonus a class get
 * is defined later under the Proficiency Bonus parameter that you’ll see in a
 * little bit.
 *
 * Class Signatures - List of classes that are automatically maxed out in this
 * talent.  Some talents are pretty much a given for certain classes. What kind
 * of a Thief can’t pick locks?  What kind of Wizard doesn’t learn everything
 * they can about arcane magic?  How can you be a Bard that can’t give some
 * sort of performance?  In d20, these are often known as Sink Skills because
 * it’s pretty much required that you spend points in them.  Class Signature
 * Talents gives you an easy way to guarantee that a class has a talent or two
 * that is maxed out by specifying them here.  These don’t subtract from the
 * classes starting points or points per level so make sure that you take this
 * into consideration when assigning how many points per level a class
 * receives.
 *
 * Later on, you will encounter a setting for Max Type.  By default, this is
 * set to be relative to the actor’s level.  If you change this setting to
 * “Strict Value” then a Class Signature talent will grant one free talent rank
 * per level instead of max ranks.
 *
 * Visibility Mode - By default, all classes can see and add ranks to any
 * talent.  But you may not want this as it can be handy to piggyback some
 * extra data within talents and want to keep it hidden from your players.
 * Perhaps you need an Alignment value associated with each actor and want to
 * just use a talent to keep this value.  You can do that but, of course, you
 * don’t want your players adding ranks to it or adjusting the value in any
 * way.  The game will handle that.  For each talent, you can select one of the
 * following three visibility modes.
 *    Visible to All - This is the default.  All classes can see this talent
 *        add ranks to it unless one of the other parameters changes that
 *        functionality.
 *    Visible to None - This talent is hidden from the player.  It will not
 *        show up in their Talent Window which means that they cannot add ranks
 *        to it either.  You will need to tell the game how to handle and use
 *        this talent.
 *    Visible to Specific Classes - This talent is only visible to classes
 *        listed in the Class Visibility parameter.  This is typically only
 *        used for talents that are specifically geared towards a certain
 *        class.  Maybe you have a Martial Arts talent that only your Monk and
 *        Ninja classes can utilize.  You can assign those classes here and
 *        only they will be able to see and add ranks to it.
 *
 * Class Visibility - If you selected Visible to Specific Classes as the
 * Visibility Mode in the previous parameter, you can specify the classes that
 * have access to this talent here.  As in the example listed above, you would
 * add your Monk and Ninja classes here for your Martial Arts talent so that
 * they would be able to utilize it while the rest of the classes could not.
 *
 * Starting Ranks - Generally speaking, all of your talents will start at zero
 * ranks and the player will decide what they want to increase and what they
 * don’t.  But some talent systems or even just single talents might work
 * differently.  Say you want to store an actors alignment in a talent.
 * Alignment often works as a scale starting from 0 for completely evil and
 * maybe 100 as super righteous.  In this case, we would want to initialize the
 * Alignment talent at 50 which would be right in the middle or Neutral and
 * then the game could raise or lower this number based on what decisions the
 * actor makes throughout the game.  This parameter gives you an easy way of
 * initializing this value so that you don’t have to do this manually when the
 * game starts.
 *
 * Take note that Class Signatures override the Starting Ranks.
 *
 * Requires Training - Some talents just can’t be performed without at least the
 * most basic training.  If you know absolutely nothing about the inner-working
 * of a lock, there’s no chance that you can just pick one on intuition alone.
 * For talents such as these, you’ll want to turn this option on.  Any attempt
 * to attempt perform a talent that requires training will fail unless the actor
 * has spent at least 1 rank in it to acquire some training.
 *
 * Synergy Requirement - Having talent in some areas may open up more advanced
 * talents if you so choose to set your system up this way.  Say you want to
 * have a Ritual talent that Priests use to perform some powerful prayer
 * abilities.  A low level and inexperienced Priest obviously shouldn’t have
 * access to such a powerful talent right away.  What you can do to solve this
 * issue is set your Ritual talent to require a certain number of ranks in
 * Religion before an actor can start adding building it.  You can specify
 * multiple talents and required ranks.  All of the requirements must be met
 * before this talent will become available.
 *
 * Synergy Bonuses - D&D 3.x had a feature called Synergy Bonuses.  If a
 * character builds one talent up to a certain point, usually 5 ranks, they
 * receive a small bonus to one or more other talents.  Most medicine comes from
 * the nature, especially in a medieval setting, so it would make sense to,
 * perhaps, grant a +2 bonus to Medicine if an actor has 5 ranks in Nature.
 * This property allows you to specify the Talent, Required Ranks and the Bonus
 * received for the associated Talent.
 *
 * Required Item - Some talents may require one or more of an item to perform.
 * It might be difficult to pick a lock without a set of lockpicks.  Fixing the
 * warp reactor would be equally impossible without engine parts.  This option
 * will allow you to choose a specified number of a single item as a requirement
 * to perform this talent check.
 *
 *    Item Id - The item that is required.
 *    Count   - The number of this item you need to to perform this check.
 *    Consume - If set to true, the required item(s) are consumed when the
 *              check is performed whether the check is successful or not.
 *
 *
 * Class Config
 *
 * Alright, now you've got all of your talents set up.  It's time for the next
 * important part: Class Configuration.  In Dungeons & Dragons and other d20
 * tabletop games, Talents (known as Skills) are tied to character classes.
 * Some classes focus most of their training in physical combat; some focus
 * their training in learning or honing their ability to utilize magic; and
 * others specialize in skills/talents.  All classes gain points every level to
 * advance their talents but some gain more than others.  This isn’t to say
 * that you have to set your talent system up this way but the option is there
 * for you.
 *
 * Description - This is just a short description that you enter in so you can
 * see what this entry is at a glance.  It’s not required but it’s useful when
 * you open this section back up and want to find the information you’re
 * looking for.
 *
 * Class Id - Select the class that you want to grant talent points to.
 *
 * Starting Points - Number of talent points this class starts the game with.
 * In d20, most of the time, your characters start with three times the number
 * of points that they get when leveling up.  You don’t have to follow this
 * convention.  You can make your own but the option is here if you need it.
 *
 * Points Per Level - Number of talent points gained at each level.  Pretty
 * self-explanatory.  Every time a character levels up, they get this number of
 * points.
 *
 * Auto-Distribution - If an actor with this class has Player Control set to
 * false in Actor Config, point distribution is configured in one of two ways.
 *     Vertical -   Uses patterns defined in Distribution Patterns so that you
 *                  can easily label the rate of advancement with names such as
 *                  low, mid, high etc.
 *     Horizontal - Allows you to specify exactly what talents advance in rank
 *                  each level and by how much.
 *
 * Vertical Distribution - You can define automatic point distribution with
 * labels such as low, mid, high etc. as defined in the Distribution Patterns
 * parameter.  When an actor levels up, their Talents will go up based on the
 * pattern for each Talent.  This is the easy way to configure auto-distribution
 * but may not work for you if you want distribution to respect Talent Points.
 *
 * Horizontal Distribution - This method is a bit more tedious but it gives you
 * more fine-tuned control.  In here, you will specify exactly which talents
 * advance for each level.  It’s more work but if you need to make sure that
 * the non-player controlled actor’s Talent Ranks match up with the typical
 * Talent Points that their class would receive, this method is easier to
 * manage.  You don’t have to specify every level of advancement.  The
 * distribution will start back over at the first entry if it reaches the end
 * so if you only want to define 5 levels of advancement and have it roll back
 * around for levels 6-10, 11-15 and so on, you can do that.
 *
 *
 * Actor Config
 *
 * This is likely a parameter that you can skip.  I wasn’t even going to
 * include it but I ended up doing so simply for completion.  Typically, the
 * actor has no inherent relationship with talents.  Their class, which is
 * pretty much their profession, and potentially their race are usually what
 * shapes their talent potential.  But say you have four specific actors
 * planned out for your game and each one has a different race tied to them,
 * you can forego setting up Races through this or my Race-based Talents
 * plugins and just tie it to the actor since it’s already set in stone.  Maybe
 * you just want to give different actors an extra advantage and/or
 * disadvantage in some areas because it fits your game. That can be done here.
 *
 * Description - This is just a short description that you enter in so you see
 * what this entry is at a glance.  It’s not required but it’s useful when you
 * open this section back up and want to find the information you’re looking
 * for.
 *
 * Actor Id - This is the actor that the following parameters apply to.
 *
 * Player Control - If true, player distributes talent points.  If false,
 * distribution is determined in Class Config.  The system is designed to have
 * your players distribute their Talent Points as they wish but there are
 * situations where that might be too much of a chore.  Setting this to false
 * takes that control away from the player for this actor and advances their
 * Talents automatically as determined by their class.
 *
 * Point Bonus/Penalty - Number of talent points this actor gains or loses per
 * level.  Say you have a specific actor whose backstory says that he’s an avid
 * learner who is always trying out new things and learning new skills, maybe
 * you want him to receive an extra +1 Talent Points per level or whatever.
 * Maybe you have another character who is a real slacker and rarely puts in
 * much effort to learn new things.  He might get -1 Talent Points per level.
 *
 * Talent Bonus/Penalty - Natural bonuses or penalties to specific talents.  In
 * this section, you can list Talents (via abbreviation like before) and grant
 * a bonus or penalty towards them.  Maybe you have an actor whose backstory is
 * that they she grew up in the wilderness, far away from civilization. Perhaps
 * your players will still have the option to choose whatever class for this
 * character but you want her to have a +2 to the Nature talent.  This is where
 * you’d configure this sort of thing.
 *
 * Talent Check Variable - This is arguably the most useful parameter in this
 * section and potentially the only one you might use.  This allows you to bind
 * an RPG Maker variable to this actor so that anytime they make a Talent
 * Check, the result will automatically be stored here in addition to anywhere
 * else you decide to store it.  This is useful, particularly in situations
 * when you want to get a check from all of the actors in the party and do
 * something with the results.  What’s a Talent Check?  Oh, sorry.  I will
 * cover that in more detail later.
 *
 *
 * Race Config
 *
 * This section is if you want to incorporate Races into your game.  Races are
 * a staple of many RPGs and racial talent proficiencies is just as much so.
 * Halflings are known to be sure-footed and get a +2 to Acrobatics and Climb.
 * Elves have keen senses and a natural affinity for magic which grants them a
 * +2 to Perception and Arcane.  I’m drawing all of my examples from D&D as it
 * was the main source of inspiration for this plugin so as usual, build your
 * world however you’d like.    To use this functionality, you will need to
 * install the FROG_RaceCore plugin and place it above this plugin in the list.
 *
 * Race Id - The Id of the race as defined in the FROG_RaceCore plugin.
 *
 * Point Bonus/Penalty - Number of talent points this race gains or loses per
 * level.  In D&D, Humans typically don’t have any natural strengths or
 * weaknesses so they tend to not get a lot of bonuses or penalties.  They are
 * sort of the benchmark that all of the other races are based off of.  The one
 * thing that Humans typically do excel in is versatility and because of this,
 * they get an extra +1 Talent Point per level.  You could also use this to
 * give a race a penalty to Talent Points per Level if you wanted.
 *
 * Talent Bonus/Penalty - Natural bonuses or penalties to specific talents.
 * While it often doesn’t make a lot of sense for actors to have natural
 * bonuses or penalties for certain talents, it usually makes perfect sense for
 * races.  Dwarves, Elves, Gnomes, <insert your own custom race here>, they
 * almost always excel over Humans in some talents and aren’t quite as
 * remarkable in others.  This is where you’ll define these adjustments.
 *
 *
 * Distribution Patterns
 *
 * If you would rather not have your players distribute their points and just
 * have the game do it for you based on the actor’s class, this is where you
 * define how an actor’s Talents will advance.  This is useful for games that
 * have large casts of characters where manual Talent building would be a chore.
 * It can also be useful for actors who join the party for a short time but
 * aren’t really the player’s responsibility to manage.  Or maybe you just don’t
 * want the player managing their points at all and you want to assign them.
 * Or maybe still, you give the player the option to choose to manage their
 * ranks or have the game do it for them.  Any actor with Player Control set
 * to false and Auto-Distribution set to Vertical will use these patterns to
 * define how their ranks advance.  Just a word of warning, these distribution
 * patterns don’t respect the normal Talent Point limit as that would just
 * cause way too many implementation issues.
 *
 * Name - This is the name that identifies this pattern of talent advancement.
 * This name is used in the Auto-Distribution parameter within Class
 * Configuration.
 *
 * Pattern - Repeating pattern used for distributing talent points.  For
 * example, [0, 1, 1] will raise a talent rank 0 at 1st level, 1 at 2nd level,
 * 1 more at 3rd level and then repeat.  So at 4th level, it will start over
 * again at 0 ranks and then grant 1 rank at both 5th and 6th level. The pattern
 * can be as long as you need, even if that means defining every level up to
 * the max.
 *
 *
 * Other Settings
 *
 * From here on out, most of the parameters are just single values that you
 * fill in without having to drill down into groups of other parameters.  These
 * parameters aren’t tied together like the ones above were.
 *
 * Add to Formulas - Wait.  Didn’t you say that talents were out-of-battle
 * stats?  I sure did and that is their primary purpose but this is your game,
 * not mine.  I highly suggest making your Talent Abbreviations four or five
 * characters long so that you don’t accidentally overwrite one of the core
 * attributes that the system needs.  If you have no need to use talents in
 * formula boxes, turn this option off.
 *
 * Save Talents Object - Setting this to true allows you to modify the
 * $dataTalents object, which contains most of the information within the
 * plugin parameters, when the player saves the game.  By default, this object
 * is built from the plugin parameters when a new game is started or a saved
 * game is loaded.  This is usually what you’ll want.  If, for some reason,
 * you need need to alter this data in-game and have those changes persist
 * until the end of the game, you’ll need to turn this option on.
 *
 * Class Change Reset - Setting this to true will refund all of an actor's
 * talent points if they change class.  This may be needed if different classes
 * have unique talents as the player could have spent points on talents that
 * the actor no longer has access to.  By default, this is set to false which
 * will retain the points spent but only if the Save Level option is used.  If
 * and actor is reverted back to their initial level, the reset always occurs.
 *
 * Max Type - There are two options here that will allow you to customize how
 * your players assign their talents.
 *    Relative to Level - This option sets a cap on how many ranks a player can
 *        assign to a single skill based on the actor’s level plus the number
 *        entered in for Max Ranks.  If the Max Ranks is 3, an actor cannot
 *        assign more than Level+3 ranks into any one skill.
 *    Strict Value - This option sets a cap on how many ranks a player can
 *        assign to a single skill based on the number entered in for Max Ranks.
 *        If Max Ranks is 100, an actor can freely add ranks to a single skill
 *        until the max is reached.
 *
 * Max Ranks - The maximum number of points that can be spent on a Talent is
 * equal to the character's level added to this amount.  A “rank” is a point
 * permanently spent on a particular Talent.  This is different from a
 * character’s Talent Score which includes all other bonuses and penalties
 * added in.  In d20, the Max Ranks is usually 3.  For this case, if your
 * characters start the game at level 1, as is typical, they will be able to
 * apply up to 4 points on a single Talent.  The current Max Ranks is 4 (level
 * 1 + the Max Ranks value which is 3).  When they advance to level 2, their
 * Max Rank goes up to 5.  Level 3 would be 6 and so on.  When characters are
 * low level, it doesn’t make sense that they could possibly advance one Talent
 * through the roof and leave all of the other untrained.  Their maximum
 * potential for any single Talent is only so high as defined here which is
 * good because it forces them to spread their Talents out at least to some
 * degree.
 *
 * Proficiency Bonus - This is a bonus added to any skill that a class is
 * proficient with as indicated in the Talents parameter.  Here is where you
 * define the bonus value for the classes you listed in Class Proficiencies
 * earlier.  As I said before, Thieves train to pick locks as part of being a
 * Thief.  Wizards study Arcana as part of their class.  So it makes sense that
 * these classes would just naturally have higher possible Talent Scores in
 * certain skills.  How much higher is where this bonus comes into play.  If
 * this value is 3 and you defined a Lockpicking skill and made the Thief class
 * proficient with it, they will start the game with a Talent Score of 3 even
 * before placing any ranks in it.
 *
 *
 * Talent Checks
 *
 * Checks are an integral part of the Talent system.  It’s neat to have your
 * players build up their character’s out-of-combat abilities but it wouldn’t
 * do them much good unless there were ways to make sure that they possessed
 * enough skill to accomplish whatever task stood in front of them.  That’s
 * where talent checks come in.  So how does a Talent Check work?  Well, that’s
 * mostly up to you.  I’ve provided three choices on how to manage this and the
 * choice you make will largely depend on how much RNG (random number
 * generator) you like in your game.  To perform a Talent Check, you can use
 * the following Plugin command.
 *
 * TALENT CHECK [list of parameters]
 *
 * To avoid making you memorize the exact order of the parameters and have you
 * enter in cryptic plugin commands like TALENT CHECK 1 0 5 4 13 27 etc, I’ve
 * done my best to streamline this with name/value pairs.  Each parameter name
 * is immediately followed by a colon which is immediately followed by the
 * value.  This way, you don’t have to remember the order of all these
 * parameters and as you’ll see in a minute, you won’t have to specify all of
 * them either.  I’ll show you some examples after I explain what all of the
 * parameters do.
 *
 * type - There are three types of Talent Checks: MAX, RND and ROLL.
 *    MAX - Returns the character’s current Talent Score. You get no randomness
 *          with this type so you’ll mostly be dealing with all or nothing
 *          scenarios.  The character is either talented enough to perform the
 *          task or is not.
 *    RND - Random number between 1 and Max Score.  With this check, you still
 *          have the same maximum potential to perform any given task but
 *          similar to real life, you don’t always perform at your maximum
 *          talent level.  Sometimes you nail it.  Other times, you can totally
 *          fumble it, especially if you are under pressure.
 *    ROLL - If you love tabletop then you love rolling dice and here’s the
 *          option that emulates it.  You will define which die and how many
 *          are rolled.  This allows you to have more fine control over the
 *          randomness by giving your characters a Min and Max potential for
 *          each check and also by introducing bell curves into the mix so that
 *          most of the checks usually fall closer to the middle of their
 *          potential while still allowing for larger successes and greater
 *          failures.
 *
 * aid - This is the Id of the actor who is performing the talent check.  If no
 * Actor Id is specified, the system will determine who has the best Talent
 * Score for the listed talent and they will be the one who performs the check.
 *
 * abbr - The Talent Abbreviation which indicates which talent is being
 * performed.
 *
 * target - The Target Number that the character making the check needs to
 * reach in order for the check to be successful.  Anything less than the
 * target results in failure.
 *
 * mod - This is an on-the-fly modifier that can be thrown in by the game if
 * the character making a check is in an advantageous position or at a
 * disadvantage.  Say your character is trying to stop a fight from breaking
 * out at a tavern and they have previously made friends with one of the NPCs
 * that’s involved.  You might want to throw them a +2 bonus modifier as their
 * odds of success are better.  But if they they made different decisions
 * earlier and that person instead doesn’t like your character, it will likely
 * be more difficult to for them to stop the fight from breaking out.  In this
 * case, they get a -2 penalty for this check.
 *
 * die - If you use the ROLL type for a Talent Check, this represents which die
 * is rolled.  This doesn’t actually need to be a standard die at all.  It can
 * be any number.  Whatever number you choose, the check will randomize a
 * number between 1 and the value you enter here so if you want to roll a 37
 * sided die (1-37), you can do that by just entering in 37.
 *
 * dcount - This is the number of dice to roll for the check.  The standard d20
 * roll is, of course, 1d20.  This would be dcount:1 die:20.  The die and
 * dcount options allow you to set up different probability curves and such.
 * 2d10 will give you results between 2-20 in a nice probability wedge that
 * nudges results near the middle (11 will occur far more often than 2 or 20)
 * while 3d6 gives you a bell curve where results outside of the middle few
 * values are much more rare and become even more so as you add more to the
 * dcount.
 *
 * view - The view mode determines how the results will be be displayed and
 * whether your players have the opportunity to assess the difficulty of the
 * check and decide for themself to attempt it or to pass.  There are three
 * view modes.
 *    None - This will cause the check to happen entirely out of view from the
 *           player.  These are often times called passive checks as the player
 *           may not ever know that they even made one.  Say your party is
 *           walking through a dungeon and are passing by a secret door.  You
 *           could make a check with the character who has the best Perception
 *           talent (or even with all of the characters individually) and see
 *           if they notice that a secret door is near them.  If the character
 *           fails the check, they get no feedback and will probably just keep
 *           walking by.  If they pass the check, you can toss in a short
 *           dialog or maybe some sparkles or something to let the player know
 *           that they spotted the secret.
 *    Show - This option will inform the player that they are making a Talent
 *           Check and provide a nice new window to facilitate the process. The
 *           window will pop up in the middle of the screen, display the Target
 *           Number alongside a gauge labeled Difficulty, and another Talent
 *           Check gauge will begin to fill from completely empty to whatever
 *           their check result is.  I designed the window like this to instill
 *           a couple seconds of anxiety and anticipation as they won’t know if
 *           the bar will stop short (fail) or reach/exceed the Target Number
 *           (success).  I’m trying to capture the anticipation you get in
 *           tabletop games when you roll the dice and are adding up the result
 *           to see if you succeeded or not.
 *    Ask - The Ask option works exactly like the Show option except for one
 *           very important detail.  Before the check is made, the player gets
 *           to see the Talent Check window and the difficulty of the check
 *           that is about to be performed and asks the player if they want to
 *           attempt the check or decline the attempt.  Say your Barbarian has
 *           a really good Jump talent and decides that he’s going to jump from
 *           one cliff edge to another because there is a treasure chest on the
 *           other side.  When the Ask check is initiated, he doesn’t actually
 *           attempt the jump right away.  The player gets to see the the
 *           difficulty first and determine whether it’s worth the risk. If the
 *           Difficulty bar is low, their odds are good and they’ll probably go
 *           for it.  If the bar is high, they would probably be best off
 *           coming back later when the Barbarian’s jump has improved and
 *           they’re less likely to take a bunch of falling damage on a likely
 *           fail.
 *
 * rem - Key for a check that the player cannot retry without getting the same
 * result.  This property is only valid for the RND and ROLL check types.  Say
 * your Thief tries to pick a difficult lock an is unable open it.  What’s
 * stopping them from just trying over and over again until they get a lucky
 * RNG value to get the lock open?  One way is institute a negative consequence
 * for failure.  Maybe there’s a chance the party gets into a fight each time
 * the Thief fails at their attempt.  It makes sense as the group is waiting a
 * long time as the Thief keeps trying.  Another way is prevent getting
 * different Talent Check results on retries.  If you send a rem value, the
 * result of the first attempt will be stored and any subsequent attempts will
 * yield the same result.  In essence, the first try determines the character’s
 * ability to pick the lock.  If they fail, they cannot pick the lock.  Other
 * actors may try if given the opportunity but only once.  Once a character
 * levels up, they are then able to make another attempt even if they didn’t
 * raise their ranks.  They have advanced and another attempt is warranted.
 *
 * var - This is the Id of the Variable that you want to store the Talent Check
 * Result into after it is made.  The value stored will be in relation to the
 * Target Number so 0 means that the check result matched exactly and that they
 * barely succeeded.  A negative number means the check failed by that amount
 * and a positive number means the check exceeded the target by that amount.
 * Returning the results in this way allows you to gauge the level of success
 * or failure very easily if you want to create more than two outcomes.  Maybe
 * you want to provide a “great success” option that does more than barely
 * succeeding.  For instance, maybe your character is making a Disable Trap
 * check to disable a trap and they get a phenomenal check result.  Perhaps
 * this trap normally resets itself after being disabled but because of the
 * check exceeding the target by 5 or more, it is no longer a threat ever
 * again.  You could also do the same for minor failures.  Say that Barbarian
 * attempted the jump and failed by just 1.  You could make the player think
 * he’s going to fall into the chasm but have him grab onto the ledge instead
 * turning it into a success.  Or perhaps it’s still a failure but now the
 * character at least gets to make a mandatory Climb check to salvage the
 * initial botched check and turn it back into a success.
 *
 * Default Talent Checks
 *
 * Most of the above Talent Check parameters are also in the RPG Maker plugin
 * parameters under “Default Talent Checks” grouping.  What these do is specify
 * values that are used as default if you don’t pass the value to the plugin
 * when making a check.  When constructing your own Talent system, consistency
 * is a good thing.  You will likely want almost all of your checks to follow
 * the same pattern as it would be confusing to your players if some talent
 * checks rolled 1d20 and other used 3d6 or used the Max or Rnd check types.
 * Because of this, it makes sense to just define defaults so that you don’t
 * have to specify every time you need a check.  If you almost always use var:5
 * type:roll dcount:2 die:10 view:ask then you can fill them into the editor’s
 * plugin parameters and just leave them out when calling for a check.  If you
 * decide later that you want your system to work a little differently, you
 * won’t have to search out dozens, if not hundreds, of Plugin Command calls to
 * change them all accordingly.  It also makes it a lot easier to look at a
 * Plugin Command call and know what it’s doing without all of the redundant
 * parameters getting in the way.
 *
 * There are a few more editor plugin parameters that will let you set up some
 * needed functionality.
 *
 * Normalize Target Number - This is set to false by default but I recommend
 * setting it to true.  Because there are different ways to specify Roll Type
 * (MAX, RND, ROLL) and you may need to switch between them in order to find
 * the type that’s best for your game, normalizing the Target Number makes
 * sense.  What this does is allow you to always specify the desired Target
 * Score in place of a Target Number like you would do with the MAX Roll Type.
 * If you switch to the RND Roll Type, now the Target Number will divide in
 * half for a 50-50 chance of success.  When rolling dice (ROLL), the Target
 * Number will be normalized to half of the average roll plus the Target Number
 * provided.  What this means is that you can always just specify the Target
 * Score you want the player to have to either pass the check for MAX type or
 * have a 50-50 chance for the RND and ROLL types.  If you change the ROLL
 * Type, Die Type or Die Count at any time, your Target Numbers will auto-
 * adjust without the need to go back and update your Target Numbers.
 *
 * Named Checks - You’ll find that a lot of your checks are repeated many
 * times.  Say your game allows the player to gather information in a tavern
 * and if successful, you gain a clue that will lead you to a secret treasure
 * or some other optional reward.  Let’s also say that the Target Number of
 * this check is always 15.  You can set up a named check called TavernClue
 * with a Target Number of 15 here and when you call for a Talent Check, you
 * can specify TavernClue as the target like this: target:TavernClue.  Maybe
 * detecting a pit trap is always has a Target Number of 12.  You can create a
 * named check for PitTrap, use it as your target and it will be converted to
 * 12.  This is very helpful because when developing, sometimes you need to
 * play around with the numbers and setting up named checks makes it so that
 * you won’t have to manually change all of your checks.
 *
 * Named Modifiers - This is the exact same concept as Named Checks but
 * applied to Modifiers.  Modifiers exist to adjust for situations when a check
 * may be easier or harder than normal as they add or subtract from the Target
 * Number.  Maybe your game makes dungeons dark and visibility is cut way down
 * unless you light a torch or cast a Light spell.  A Talent Check such as
 * Perception will be affected by whether the players have light or not.  You
 * can create a named modifier called Dark, give it a modifier of 5 and pass it
 * to the Talent Check if the players don’t have a source of light.  This would
 * look like mod:Dark and will make the Perception check more difficult as it
 * will raise the Target Number of the check by 5.  If the players do have
 * light then you would refrain from passing this named modifier.  Named
 * modifiers can also be stacked by sending them as a comma-delimited list to
 * the mod parameter.  Maybe visibility in a cave is still hampered by the
 * darkness which comes with a +5 to the Target Number for Perception Checks
 * but a light source will stack on a Light named modifier that grants a -3 to
 * the Target Number.  This would look like mod:Dark,Light or mod:Light,Dark
 * which would add 5 - 3 to the Target Number and only increase the difficulty
 * by 2 instead of 5.
 *
 * One word of warning.  Named Modifiers have no way of determining when they
 * make sense to a particular Talent Check.  They are just names converted to
 * numbers.  If your player is gathering info from a tavern and you pass the
 * Light named modifier to the Persuasion check, it’ll just convert it to -3
 * and make the check easier even though it makes no sense.  You have to make
 * sure that you use these in the proper situations.
 *
 * Decline Check Value - Because of way talent check results work, you need to
 * set up a specific number that is returned if the player decides to decline a
 * check when given the opportunity.  The default is set to 9999 as it’s an
 * easy number to remember and it’s unlikely that an actor will ever exceed a
 * check by that high an amount.  You can change this value if you’d like here.
 *
 * Talent Bar Increment - When a Talent Check is shown, this is the amount by
 * which the Check gauge increases with each redraw.  Depending on how large or
 * small your numbers are configured, when you show the Talent Check window and
 * the bar increases up to the check result, it may go too fast or too slow.
 * This allows you to adjust the increment that the animated gauge uses.  This
 * is essentially the size of one chunk of the bar.
 *
 * Talent Bar Wait - This is the wait time in milliseconds between redraws when
 * the Talent Check bar is rising to its Talent Check score.  The two “Talent
 * Bar” values work hand in hand and may need to be adjusted to give you the
 * growth speed you want in a way that doesn’t look choppy or laggy.  The bar
 * will wait this long until it draws the next chunk.
 *
 *
 * Examples Plugin Command calls:
 *
 * TALENT CHECK var:5 type:max aid:1 abbr:perc target:4 view:none
 * Actor Id 1 will use their Max Score in the Perception (pct) talent and see
 * if it meets a target of 4 or more.  The result will be stored in Variable Id
 * 5.
 *
 * TALENT CHECK var:6 type:rnd aid:2 abbr:jmp target:3 view:ask
 * Actor Id 2 will be asked if they want to attempt a Jump (jmp) check.  The
 * result will be stored in Variable Id 5.
 *
 * TALENT CHECK var:7 type:roll aid:3 abbr:arca mod:2 target:13 view:show
 * dcount:1 die:20
 * Actor Id 3 will be shown whether they know some detail of magical lore
 * through an Arcana (arca) check.  A roll of 1d20 will be made, +2 will be
 * added to the character’s Arcana Score and the result will be targeting the
 * difficulty of 13.  The result will be stored in Variable Id 7.
 *
 * TALENT CHECK abbr:lock target:11
 * Your best lockpicker will attempt a check using all of the default values
 * specified in the editor’s plugin parameters. This is likely what most of
 * your Plugin Command calls will look like.
 *
 * TALENT CHECK aid:v[8] abbr:v[9] target:v[10]
 * This is a way that you can more easily run a check through all of the party
 * members by utilizing variables instead of hard-coded values.  You can set
 * variable 8 to the Id of the party leader, variable 9 to the Talent
 * Abbreviation and variable 10 to the Target Number.  Run the check, change
 * variable 8 to the next person in the party and run it again.  Do the same
 * for the last couple party members and you’re done.  While you could still
 * hard-code these values for the four checks, changing the values if you
 * decide to do so becomes more cumbersome.  Just a little nicety I threw in to
 * make your development a little easier.
 *
 *
 * If you prefer using JavaScript calls instead of Plugin Commands, you can do
 * the following to get the same effects as above.
 *
 * Example Script calls:
 *
 * var x = FROG.Talents.talentCheck({
 *    var: 5,
 *    type: max,
 *    aid: 1,
 *    abbr: ‘perc,
 *    target: 4,
 *    view: ‘none’
 * });
 *
 * var x = FROG.Talents.talentCheck({
 *    var: 6,
 *    type: rnd,
 *    aid: 2,
 *    abbr: ‘jump’,
 *    target: 3,
 *    view: ‘ask’
 * });
 *
 * var x = FROG.Talents.talentCheck({
 *    abbr: ‘lock’,
 *    target: 11
 * });
 *
 * var x = FROG.Talents.talentCheck({
 *    var: 7,
 *    type: roll,
 *    aid: 3,
 *    abbr: ‘arca’,
 *    mod: 2,
 *    target: 13,
 *    view: ‘show’,
 *    dcount: 1,
 *    die: 20
 * });
 *
 * Other useful Plugin Commands and Script Calls:
 *
 * Open the Talents Menu.
 * TALENT OPEN
 * SceneManager.push(Scene_Talents);
 *
 * Get the current Talent Points for an actor.
 * TALENT GETPOINTS [actorId] [variableId]
 * FROG.Talents.getTalentPoints(actorId);
 *
 * Set the Talent Points for an actor.
 * TALENT SETPOINTS [actorId] [points]
 * FROG.Talents.setTalentPoints(actorId, points);
 *
 * Add Talent Points to an actor’s pool.
 * TALENT ADDPOINTS [actorId] [points]
 * FROG.Talents.addTalentPoints(actorId, points);
 *
 * Remove Talent Points from an actor’s pool.
 * TALENT REMPOINTS [actorId] [points]
 * FROG.Talents.removeTalentPoints(actorId, points);
 *
 * Get the current Talent Ranks for an actor. [abbr] is the Talent Abbreviation.
 * TALENT GETRANKS [actorId] [abbr] [variableId]
 * FROG.Talents.getTalentRanks(actorId, abbr);
 *
 * Set the Talent Ranks for an actor’s talent.
 * TALENT SETRANKS [actorId] [abbr] [ranks]
 * FROG.Talents.setTalentRanks(actorId, abbr, ranks);
 *
 * Add Talent Ranks to an actor’s talent.
 * TALENT ADDRANKS [actorId] [abbr] [ranks]
 * FROG.Talents.addTalentRanks(actorId, abbr, ranks);
 *
 * Remove Talent Ranks from an actor’s talent.
 * TALENT REMRANKS [actorId] [abbr] [ranks]
 * FROG.Talents.removeTalentRanks(actorId, abbr, ranks);
 *
 * Get the current Talent Score for an actor.
 * TALENT GETSCORE [actorId] [abbr] [variableId]
 * FROG.Talents.getActorTalentScore(actorId, abbr);
 *
 * Get the Actor Id that has the highest Talent Score for a given talent
 * TALENT GETBEST [abbr] [variableId]
 * FROG.Talents.getMostTalented(abbr);
 *
 *
 * Enemy Talent Scores and Target Numbers
 *
 * Enemies can have talents too.  This is useful for formula boxes where skills
 * might call upon said talents.  You may also just want to get an enemy’s
 * Talent Score.  But it can also be useful for something known as opposed
 * checks.  Opposed checks are Talent Checks where the Target Number is derived
 * from the talents of an enemy as opposed to some static task.  A very common
 * one is Stealth vs. Perception.  An enemy is hiding and the actor needs to
 * make a check to see if they spot them.  You can use the ENEMYTN to get a
 * Target Number based on the enemy’s Talent Score and store it into a variable
 * so that it can be used in the actor’s Talent Check.  The check type is
 * important here as it will determine how the Target Number is calculated.
 *
 *    MAX - This just returns the enemy’s Talent Score so that it can be
 *          compared to the actor’s Talent Score.  Whichever one is better will
 *          win the check.
 *    RND - This will return the enemy’s Talent Score divided by 2 and rounded
 *          down.  Because the actor’s Talent Check is a random number between
 *          1 and their Talent Score, the enemy’s score is halved to make it an
 *          average.  If an actor and enemy both have the same score, there
 *          should be about a 50-50 chance that the actor will succeed.
 *    ROLL - This will also return the average result that the enemy would get
 *          if they were making a check based on the dice rolled and the size
 *          of the dice.  If a Bat has a Stealth of 5 and the check is 1d20,
 *          the Target Number of 15 will be returned.  This is calculated by
 *          halving the total maximum roll of the dice and then adding the
 *          Talent Score to the result.  If a Bat actually made a Talent Check,
 *          the average roll in this case would be 10.5 rounded down plus the
 *          bat’s score of 5.
 *
 * Get a Talent Score from an enemy.
 * TALENT ENEMYSCORE [enemyId] [abbr] [variableId]
 * FROG.Talents.getEnemyTalentScore(enemyId, abbr);
 *
 * If a Bat has a talent of 5, the value of 5 will be stored in variable 12.
 * TALENT ENEMYSCORE eid:1 abbr:stea var:12
 * FROG.Talents.getEnemyTalentScore(1, 'stea');
 *
 * Get a Target Number from an enemy
 * TALENT ENEMYTN [parameters]
 * FROG.Talents.enemyTargetNumber(options);
 *
 * Enemy checks can utilize some of the same parameters as Talent Checks: var,
 * type, eid, abbr, die and dcount.  Default values will fill in when not
 * specified.
 * TALENT ENEMYTN eid:1 abbr:stea var:12
 * FROG.Talents.enemyTargetNumber({
 *    eid: 1,
 *    abbr: ‘stea’,
 *    var: 12
 * });
 *
 *
 * Commands
 *
 * Congratulations!  You’ve got your Talent system set up now.  All of the
 * parameters that follow are simply for styling and personalization.  While
 * Talents is a good name for my designed purpose, this plugin is pretty
 * customizable and can be used for many different systems.  The name Talents
 * may not suit your needs. Maybe you want to use this plugin to create
 * personality traits for a dating simulator.  Perhaps you just want to use a
 * different name instead, like say Abilities, Proficiencies, Mastery,
 * Vocations, Jobs, Crafts, Specializations, Expertise etc.  It’s your game.
 * Brand the system how you want and make it your own.  That’s what you’ll be
 * doing here.
 *
 * System Mode - This is a quick way to choose how your game will use the
 * Talent system from a UI standpoint.  You may want the full experience or
 * your game may work a little different than what I designed for so this gives
 * you some flexibility.
 *    Full - Players acquire points and build their talents.  If you to want to
 *           use the system in the same way as I describe throughout this
 *           documentation, this is the option you want.  Players get points,
 *           they apply those points to whichever talents they want to build
 *           within the framework that you specify and they get all of the menu
 *           options and windows required to do so.
 *    View - Players can see their talents but not change them.  The Talents
 *           main menu option still shows up and the players can go in and see
 *           their list of talents, ranks and scores but they don’t get points
 *           to build them up like in Full mode.  This is for games that want a
 *           similar system to what this plugin provides but they want their
 *           game to distribute the points instead.  As an example, I will
 *           refer to the game Ultima and its Virtue system.  In Ultima 4 and
 *           above, characters have 8 virtues (Honesty, Compassion, Valor,
 *           Justice, Sacrifice, Honor, Spirituality and Humility) that they
 *           either build or lose throughout the game based on the decision
 *           they make.  If they give money to a beggar, their Sacrifice goes
 *           up.  If they rob someone’s house, it goes down (or several of them
 *           go down, not sure).  If the players live the in the ideal of an
 *           Avatar and do all the right things, they get rewarded by being
 *           able to beat the game and maybe some other things.  The actions
 *           they take adjust the Talent Ranks instead of the point system.
 *    Hide - All Talent menus and windows are hidden from view.  If you want to
 *           use this plugin in a way where showing your players the Talent
 *           window just doesn’t make sense, you can select this option and
 *           hide it from them.  They’ll never know what you’re doing behinds
 *           the scenes.
 *
 * Main Menu - This is the name of the command that will display in the main
 * menu.
 *
 * Talents Menu - This is the name of the command that will display in the
 * talents menu.
 *
 * Exit - This is the name of the command that exits the user from the talents
 * menu.
 *
 * Finish - This is the name of the command that commits their changes after
 * applying talent points.
 *
 *
 * Text
 *
 * Points Text - This is the text that shows up in the Points box.
 *
 * Talents Text - This is the header text that shows up in the Talents window.
 *
 * Ranks Text - This is the header text that shows up in the Talents window.
 *
 * Bonus Text - This is the header text that shows up in the Talents window.
 *
 * Score Text - This is the header text that shows up in the Talents window.
 *
 * Difficulty Text - This is the text that is displayed on the Difficulty gauge
 * when a Talent Check is performed.
 *
 * Talent Check Text - This is the text that is displayed on the Talent Check
 * gauge when a Talent Check is performed.
 *
 * Success Text - Text that is displayed when a Talent Check succeeds.
 *
 * Success Color - This is the color of the Success Text.
 *
 * Fail Text - Text that is displayed when a Talent Check fails.
 *
 * Fail Color - This is the color of the Fail Text.
 *
 * Learn Trait - Text that shows before displaying what trait you'll learn if
 * you advance your Talent rank to a specific level.
 *
 *
 * Style
 *
 * Show Ranks - Show or hide the Ranks column in the Talents window.
 *
 * Show Bonus - Show or hide the Bonus column in the Talents window.
 *
 * Show Score - Show or hide the Score column in the Talents window.
 *
 * Show Check Numbers - Show or hide the Difficulty and Talent Check numbers.
 *
 * Gauge Height - Pixel height of the gauges on the Talents and Talents Check
 * screens.
 *
 * Gauge Color Type - Color code your gauges for proficient/non-proficient or a
 * rolling series of colors.
 *    Proficiency - All of your Talent window gauges will show up in one of two
 *        colors.  One color will let your players know that the character is
 *        proficient with this talent and is receiving the requisite bonus and
 *        the other color represents non-proficient talents.
 *    Color List - This option sets your gauges to a set of colors that you
 *        define.  If the end of the color list is reached, any remaining
 *        talent gauges will roll back to the beginning of the color list and
 *        run through the colors again.
 *
 * Proficient Color - If using the Proficiency option, this is the color of
 * talent gauges that an actor is proficient with.
 *
 * Non-proficient Color - If using the Proficiency option, this is the color
 * of talent gauges that an actor is not proficient with.
 *
 * Color List - If using the Color List option, this is a repeating list of
 * colors that your gauges will use.
 *
 * Talent Check Color - Color of the Talent Check gauge.
 *
 * Difficulty Color - Color of the Talent Check difficulty gauge.
 *
 * Font Size - Font size in the Talents window.  Scaling down the font size in
 * this window arguably looks better.
 *
 * Show Required Item - Configure how the Required Item for a talent check is
 * displayed.
 *    Name - Only the item name and count are shown
 *    Item - Only the item icon and count are shown
 *    Both - Both the item name and icon are shown
 *
 *
 * Note Tags
 *
 * I’m sure you’re wondering by now if there’s a way to add bonuses to weapons,
 * armor, items and states and the answer is, of course, yes.  For these, I
 * decided that Note Tags seemed to be the way to go.  It just made more sense.
 * Bonuses to weapons and armor are applied when said equipment is worn by an
 * actor.  Bonuses to Items are applied to all actors as long as the item is in
 * the party’s possession so be careful with these.  State bonuses are applied
 * as long as the State is active on an actor, the primary use of which is to
 * be applied by Skills.  You could have Skill/Magic Spell that makes a
 * character grow webbed feet and grant them a +10 to Swim.  An Invisibility
 * spell could grant a large bonus to a Stealth talent.  There are only a
 * couple tags you need to know.
 *
 * Bonuses and Penalties to Equipment, Items and States
 *
 * Adding bonuses and penalties:
 * <TalentBonus: [bonus_1] [abbr_1], [bonus_2] [abbr_2], … [bonus_n] [abbr_n]>
 *
 * Examples (the + is optional):
 * Add +3 to Religion: <TalentBonus: +3 reli>
 * Add +2 to Nature & -2 to Arcana: <TalentBonus: +2 natu, -2 arca>
 *
 * Talent Requirements
 *
 * Some weapons, armor and items are just not usable without extensive
 * training.  Medicine that can bring a person back from the dead is probably
 * more complicated than just shoving a potion down someone’s throat.  It would
 * likely require years of learning about treatments and medicine to
 * effectively administer.  Items may even require a certain level of talent to
 * use on yourself.  These would typically be items that let an actor learn
 * spells but I’m sure that there could be other use cases.  You may also want
 * to build a system where a Level 1 character just can’t properly wield the
 * legendary Excalibur sword without some kind of martial talent training.
 * Maybe the way armor proficiency works in your game is for actors to build up
 * an Armor Training talent.  Talent requirements give you a way to restrict
 * the use of certain items and equipment unless that character has enough
 * Talent Ranks or a high enough Talent Score (your choice).
 *
 * Talent Requirements (Equip, Get and Give):
 * <TalentReq: [abbr] [rank/score] [required value]>
 * <TalentReqGet: [abbr] [rank/score] [required value]>
 * <TalentReqGive: [abbr] [rank/score] [required value]>
 *
 * Examples for equipment:
 * Equip Wizard’s Cloak requires 7 ranks of Arcana: <TalentReq: arca rank 7>
 * Equip an Intelligent Sword requires a Talent Score of 30 in Persuasion:
 * <TalentReq: pers score 30>
 *
 * Examples for Item Use*:
 * Hi-potion requires a talent score of 5 Medicine to use on yourself or anyone
 * else: <TalentReqGive: medi score 5>
 * Fire Spell requires a talent rank of 3 Arcana to use on yourself and thus,
 * learn Fire: <TalentReqGet: arca rank 3>
 *
 * * Note that when an item with a requirement is used, the plugin will find
 *   the actor with the best Pharmacology score that meets the requirement when
 *   outside of battle.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * This plugin can be used in commercial or non-commercial projects.  If you
 * are a plugin developer, feel free to write add-ons for this if you want
 * to extend its functionality.  While not required, if you use this in a
 * commercial game, a free copy of the game would be nice as I put a lot of
 * work into this and would love to see how you used it in your game.
 *
 * Credit Frogboy in your work.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0   - Initial release
 * Version 1.1   - Talent-based Traits display what you'll gain when adding ranks.
 * Version 1.2   - Added automatic distribution of points per actor if desired.
 *               - Bug fix for class changes.
 *               - Now requires FROG_Core.
 * Version 1.2.1 - Removed the localized namespace.
 * Version 1.3   - Added Class Change Reset option.
 *               - Added Required Items to perform a check.
 *               - Fixed bugs.
 * Version 1.3.1 - Added support for Yanfly's Auto Passive States
 * Version 1.3.2 - Bug fix, Cancelling talent check registered as an attempt.
 *
 * ============================================================================
 *
 * @param Settings
 * @desc Set up how the Talent system will work in your game.
 *
 * @param Talent Config
 * @parent Settings
 * @type struct<talentStruct>[]
 * @desc Add talents to your game.
 * @default ["{\"Name\":\"Acrobatics\",\"Description\":\"\\\"Avoid pits, traps, damage from long falls, balance on a\\\\nslippery surface or squeeze in tight spaces.\\\"\",\"Abbreviation\":\"acro\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"2\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Arcana\",\"Description\":\"\\\"Knowledge of the arcane, identify magical effects and \\\\ndecipher magical runes, tomes and scrolls.\\\"\",\"Abbreviation\":\"arca\",\"Class Proficiencies\":\"[\\\"3\\\"]\",\"Class Signatures\":\"[\\\"3\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Climb\",\"Description\":\"\\\"Your ability to climb ropes, vines, cliffs, city walls\\\\nor run up or down stairs without losing speed.\\\"\",\"Abbreviation\":\"clim\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"2\\\"]\",\"Class Signatures\":\"[\\\"2\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\"}","{\"Name\":\"Deception\",\"Description\":\"\\\"Fast-talk a guard, con a merchant, make money gambling, \\\\ndisguise yourself or convincingly tell a blatent lie.\\\"\",\"Abbreviation\":\"dece\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"3\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\"}","{\"Name\":\"Disable Trap\",\"Description\":\"\\\"Disable traps on doors and treasure chest.\\\"\",\"Abbreviation\":\"disa\",\"Class Proficiencies\":\"[\\\"1\\\"]\",\"Class Signatures\":\"[\\\"1\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\"}","{\"Name\":\"History\",\"Description\":\"\\\"Recall lore about families, events, places and heraldry.\\\\nIdentify the cultural origins of people or objects.\\\"\",\"Abbreviation\":\"hist\",\"Class Proficiencies\":\"[\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\"}","{\"Name\":\"Insight\",\"Description\":\"\\\"Identify when someone is being deceitful, notice when\\\\nbeing followed or understanding coded speech.\\\\n\\\"\",\"Abbreviation\":\"insi\",\"Class Proficiencies\":\"[\\\"4\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\"}","{\"Name\":\"Investigation\",\"Description\":\"\\\"Search for clues, gather information at a local tavern\\\\nor read someone's lips from across the room.\\\"\",\"Abbreviation\":\"inve\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"3\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Jump\",\"Description\":\"\\\"Jump across a wide chasm or high up to grab a window \\\\nsill.\\\"\",\"Abbreviation\":\"jump\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"2\\\"]\",\"Class Signatures\":\"[\\\"2\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Lockpicking\",\"Description\":\"\\\"The ability to open locked doors and treasure chests.\\\"\",\"Abbreviation\":\"lock\",\"Class Proficiencies\":\"[\\\"1\\\"]\",\"Class Signatures\":\"[\\\"1\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Medicine\",\"Description\":\"\\\"Stablize a dying person, know how to utilze advanced\\\\nmedicine or diagnose a rare illness.\\\"\",\"Abbreviation\":\"medi\",\"Class Proficiencies\":\"[\\\"3\\\",\\\"4\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Nature\",\"Description\":\"\\\"Knowledge of animals, plants, terrain, weather, poisons\\\\nor survive in the wild.\\\"\",\"Abbreviation\":\"natu\",\"Class Proficiencies\":\"[\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Perception\",\"Description\":\"\\\"See or hear hidden threats, recognize someone far away,\\\\nfind minute details or identify a noise's source.\\\"\",\"Abbreviation\":\"perc\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"2\\\",\\\"4\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Performance\",\"Description\":\"\\\"Sing, dance, tell a compelling story or deliver a good\\\\nspeech.\\\"\",\"Abbreviation\":\"perf\",\"Class Proficiencies\":\"[]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Persuasion\",\"Description\":\"\\\"Convince someone to do what you want, effectively \\\\ndebate, flatter or seduce another.\\\"\",\"Abbreviation\":\"pers\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"4\\\"]\",\"Class Signatures\":\"[\\\"4\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Religion\",\"Description\":\"\\\"Knowledge of lore/beliefs of faiths, deities and their\\\\nfollowers. Perform a ritual according to specification.\\\"\",\"Abbreviation\":\"reli\",\"Class Proficiencies\":\"[\\\"3\\\",\\\"4\\\"]\",\"Class Signatures\":\"[\\\"4\\\"]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Sleight of Hand\",\"Description\":\"\\\"Pick somone's pocket, conceal belongings, make a coin\\\\nseem to disappear or gesture messages inconspicuously.\\\"\",\"Abbreviation\":\"slei\",\"Class Proficiencies\":\"[\\\"1\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"true\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Stealth\",\"Description\":\"\\\"Hide, move silently, blend in with a crowd or follow\\\\nsomeone without being noticed.\\\"\",\"Abbreviation\":\"stea\",\"Class Proficiencies\":\"[\\\"1\\\",\\\"2\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Swim\",\"Description\":\"\\\"Swim through rough waters, hold your breath for a long\\\\ntime or possibly even keep pace with a marine creature.\\\"\",\"Abbreviation\":\"swim\",\"Class Proficiencies\":\"[\\\"2\\\"]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"ALL\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"0\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}","{\"Name\":\"Alignment\",\"Description\":\"\\\"Actor's alignment on a scale of evil to good where 0 is \\\\ncompletely evil and 100 is a pinnacle of righteousness.\\\"\",\"Abbreviation\":\"alignment\",\"Class Proficiencies\":\"[]\",\"Class Signatures\":\"[]\",\"Visibility Mode\":\"NONE\",\"Class Visibility\":\"[]\",\"Starting Ranks\":\"50\",\"Requires Training\":\"false\",\"Synergy Requirement\":\"[]\",\"Synergy Bonuses\":\"[]\"}"]
 *
 * @param Class Config
 * @parent Settings
 * @type struct<classConfigStruct>[]
 * @desc Configure classes to receive talent points as they level up.
 * @default ["{\"Description\":\"Rogue\",\"Class Id\":\"1\",\"Starting Points\":\"6\",\"Points Per Level\":\"6\",\"Auto-Distribution\":\"Vertical\",\"Vertical Distribution\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"acro\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"arca\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"clim\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"high\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"dece\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"high\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"disa\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"hist\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"insi\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"high\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"inve\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"jump\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"high\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"lock\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"medi\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"lowest\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"natu\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perc\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perf\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"low\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"pers\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"high\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"reli\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"slei\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"stea\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"swim\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\"]\",\"Horizontal Distribution\":\"[]\"}","{\"Description\":\"Fighter\",\"Class Id\":\"2\",\"Starting Points\":\"6\",\"Points Per Level\":\"6\",\"Auto-Distribution\":\"Vertical\",\"Vertical Distribution\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"acro\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"low\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"arca\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"clim\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"dece\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"lowest\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"disa\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"hist\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"insi\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"inve\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"low\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"jump\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"lock\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"medi\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"lowest\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"natu\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perc\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"high\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perf\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"pers\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"reli\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"low\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"slei\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"stea\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"swim\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\"]\",\"Horizontal Distribution\":\"[]\"}","{\"Description\":\"Mage\",\"Class Id\":\"3\",\"Starting Points\":\"6\",\"Points Per Level\":\"6\",\"Auto-Distribution\":\"Vertical\",\"Vertical Distribution\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"acro\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"lowest\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"arca\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"clim\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"low\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"dece\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"high\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"disa\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"hist\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"insi\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"inve\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"high\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"jump\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"lowest\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"lock\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"medi\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"low\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"natu\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perc\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"low\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perf\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"pers\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"high\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"reli\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"low\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"slei\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"stea\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"low\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"swim\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"lowest\\\\\\\"}\\\"]\",\"Horizontal Distribution\":\"[]\"}","{\"Description\":\"Priest\",\"Class Id\":\"4\",\"Starting Points\":\"6\",\"Points Per Level\":\"6\",\"Auto-Distribution\":\"Vertical\",\"Vertical Distribution\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"acro\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"arca\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"clim\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"dece\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"disa\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"hist\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"high\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"insi\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"inve\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"jump\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"low\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"lock\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"lowest\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"medi\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"natu\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perc\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"mid\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perf\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"pers\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"reli\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"full\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"slei\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"none\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"stea\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"lowest\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"swim\\\\\\\",\\\\\\\"Pattern\\\\\\\":\\\\\\\"low\\\\\\\"}\\\"]\",\"Horizontal Distribution\":\"[]\"}"]
 *
 * @param Actor Config
 * @parent Settings
 * @type struct<actorConfigStruct>[]
 * @desc Configure actors to adjust the talent points they receive on level up.
 * @default ["{\"Description\":\"Harold\",\"Actor Id\":\"1\",\"Player Control\":\"true\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[]\",\"Talent Check Variable\":\"2\"}","{\"Description\":\"Theresa\",\"Actor Id\":\"2\",\"Player Control\":\"true\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[]\",\"Talent Check Variable\":\"3\"}","{\"Description\":\"Marsha\",\"Actor Id\":\"3\",\"Player Control\":\"true\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[]\",\"Talent Check Variable\":\"4\"}","{\"Description\":\"Lucious\",\"Actor Id\":\"4\",\"Player Control\":\"true\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[]\",\"Talent Check Variable\":\"5\"}"]
 *
 * @param Race Config
 * @parent Settings
 * @type struct<raceConfigStruct>[]
 * @desc Configure races to adjust the talent points they receive on level up.
 * @default ["{\"Description\":\"Human\",\"Race Id\":\"1\",\"Starting Bonus/Penalty\":\"1\",\"Point Bonus/Penalty\":\"1\",\"Talent Bonus/Penalty\":\"[]\"}","{\"Description\":\"Celestial\",\"Race Id\":\"2\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"reli\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\"]\"}","{\"Description\":\"Demonic\",\"Race Id\":\"3\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"dece\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"stea\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\"]\"}","{\"Description\":\"Dwarf\",\"Race Id\":\"4\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perc\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"swim\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"-2\\\\\\\"}\\\"]\"}","{\"Description\":\"Elf\",\"Race Id\":\"5\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"arca\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perc\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\"]\"}","{\"Description\":\"Half-dragon\",\"Race Id\":\"6\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"arca\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\"]\"}","{\"Description\":\"Half-elf\",\"Race Id\":\"7\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"acro\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\"]\"}","{\"Description\":\"Half-orc\",\"Race Id\":\"8\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"clim\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"jump\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\"]\"}","{\"Description\":\"Halfling\",\"Race Id\":\"9\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"insi\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"stea\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\"]\"}","{\"Description\":\"Gnome\",\"Race Id\":\"10\",\"Starting Bonus/Penalty\":\"0\",\"Point Bonus/Penalty\":\"0\",\"Talent Bonus/Penalty\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perc\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"pers\\\\\\\",\\\\\\\"Bonus/Penalty\\\\\\\":\\\\\\\"2\\\\\\\"}\\\"]\"}"]
 *
 * @param Enemy Config
 * @parent Settings
 * @type struct<enemyConfigStruct>[]
 * @desc Configure enemies to have talents.
 * @default ["{\"Description\":\"Bat\",\"Enemy Id\":\"1\",\"Enemy Talents\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perc\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"5\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"stea\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"7\\\\\\\"}\\\"]\"}","{\"Description\":\"Slime\",\"Enemy Id\":\"2\",\"Enemy Talents\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"clim\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"5\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"jump\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perc\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"stea\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"swim\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"10\\\\\\\"}\\\"]\"}","{\"Description\":\"Orc\",\"Enemy Id\":\"3\",\"Enemy Talents\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"clim\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"8\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"jump\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"8\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perc\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"10\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"stea\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"6\\\\\\\"}\\\"]\"}","{\"Description\":\"Minotaur\",\"Enemy Id\":\"4\",\"Enemy Talents\":\"[\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"clim\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"10\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"jump\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"12\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"perc\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"15\\\\\\\"}\\\",\\\"{\\\\\\\"Talent Abbreviation\\\\\\\":\\\\\\\"stea\\\\\\\",\\\\\\\"Score\\\\\\\":\\\\\\\"5\\\\\\\"}\\\"]\"}"]
 *
 * @param Distribution Patterns
 * @parent Settings
 * @type struct<patternStruct>[]
 * @desc Define named auto-distribution patterns for actors that the player doesn't control Talents for.
 * @default ["{\"Name\":\"none\",\"Pattern\":\"[\\\"0\\\"]\"}","{\"Name\":\"lowest\",\"Pattern\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"1\\\"]\"}","{\"Name\":\"low\",\"Pattern\":\"[\\\"0\\\",\\\"0\\\",\\\"1\\\"]\"}","{\"Name\":\"mid\",\"Pattern\":\"[\\\"0\\\",\\\"1\\\"]\"}","{\"Name\":\"high\",\"Pattern\":\"[\\\"1\\\",\\\"1\\\",\\\"0\\\"]\"}","{\"Name\":\"full\",\"Pattern\":\"[\\\"1\\\"]\"}"]
 *
 * @param Add to Formulas
 * @parent Settings
 * @type boolean
 * @desc Talent abbreviations can be used in formula boxes.
 * @default true
 * @on Yes
 * @off No
 *
 * @param Save Talents Object
 * @parent Settings
 * @type boolean
 * @desc Changes to $dataTalents can be changed in-game and are persisted.
 * @default false
 * @on Yes
 * @off No
 *
 * @param Class Change Reset
 * @parent Settings
 * @type boolean
 * @desc Reset actor's points when changing class.  If false, the reset will still happen if Save Level is unchecked.
 * @default false
 * @on Yes
 * @off No
 *
 * @param System Mode
 * @parent Settings
 * @type select
 * @desc Three modes to adjust how your game will use the Talent system
 * @default FULL
 * @option Full - Players acquire points and build their talents
 * @value FULL
 * @option View - Players can see their talents but not change them
 * @value VIEW
 * @option Hidden - All Talent menus and windows are hidden from view
 * @value HIDE
 *
 * @param Max Type
 * @parent Settings
 * @type select
 * @desc Set the Max Ranks to a strict value or relative to the actor's level.
 * @default LEVEL
 * @option Relative to Level
 * @value LEVEL
 * @option Strict Value
 * @value STRICT
 *
 * @param Max Ranks
 * @parent Settings
 * @type number
 * @desc Max number of points that can be spent on a Talent. Max Type LEVEL sets the maximum ranks to level + this value.
 * @default 0
 *
 * @param Proficiency Bonus
 * @parent Settings
 * @type number
 * @desc This is a bonus added to any skill that a class is proficient with as indicated in the Talents parameter.
 * @default 3
 *
 * @param Check Defaults
 * @parent Settings
 * @type struct<checkDefaultsStruct>
 * @desc Define default settings for Talent Checks.
 * @default {"Last Check Variable":"","Target Number Variable":"","Roll Type":"ROLL","Die Count":"1","Die Type":"d20","View Mode":"ASK","Decline Check Value":"9999","Normalize Target Number":"false","Named Checks":"[\"{\\\"Name\\\":\\\"ClimbVine\\\",\\\"Target Number\\\":\\\"10\\\"}\",\"{\\\"Name\\\":\\\"PitTrap\\\",\\\"Target Number\\\":\\\"12\\\"}\",\"{\\\"Name\\\":\\\"SecretDoor\\\",\\\"Target Number\\\":\\\"15\\\"}\",\"{\\\"Name\\\":\\\"TavernClue\\\",\\\"Target Number\\\":\\\"15\\\"}\"]","Named Modifiers":"[\"{\\\"Name\\\":\\\"Dark\\\",\\\"Modifier\\\":\\\"5\\\"}\",\"{\\\"Name\\\":\\\"Friendly\\\",\\\"Modifier\\\":\\\"-2\\\"}\",\"{\\\"Name\\\":\\\"Icy\\\",\\\"Modifier\\\":\\\"10\\\"}\",\"{\\\"Name\\\":\\\"Invisible\\\",\\\"Modifier\\\":\\\"30\\\"}\",\"{\\\"Name\\\":\\\"Light\\\",\\\"Modifier\\\":\\\"-3\\\"}\",\"{\\\"Name\\\":\\\"Slippery\\\",\\\"Modifier\\\":\\\"2\\\"}\",\"{\\\"Name\\\":\\\"Unfriendly\\\",\\\"Modifier\\\":\\\"2\\\"}\"]","Talent Bar Increment":"0.25","Talent Bar Wait":"15"}
 *
 * @param Commands
 * @parent Settings
 * @type struct<commandStruct>
 * @desc Change command names to fit your game.
 * @default {"Main Menu":"Talents","Raise Talent":"Raise Talent","View Talent":"View Talent","Exit":"Exit","Finish":"Finish"}
 *
 * @param Text
 * @parent Settings
 * @type struct<textStruct>
 * @desc Customize the text.  Theme Talents to fit your game.
 * @default {"Points Text":"Talent Points","Talents Text":"Talents","Ranks Text":"Ranks","Bonus Text":"Bonus","Score Text":"Score","Difficulty Text":"Difficulty","Talent Check Text":"Talent Check","Success Text":"Success!","Success Color":"#30FF30","Fail Text":"Failed!","Fail Color":"#FF3030","Learn Trait":"Learn at this rank\\c[17]"}
 *
 * @param Style
 * @parent Settings
 * @type struct<styleStruct>
 * @desc Define how things look
 * @default {"Show Ranks":"true","Show Bonus":"true","Show Score":"true","Show Check Numbers":"true","Gauge Height":"15","Gauge Color Type":"Proficiency","Color List":"[\"{\\\"Start Color\\\":\\\"#B00000\\\",\\\"End Color\\\":\\\"#FF3030\\\"}\",\"{\\\"Start Color\\\":\\\"#0000B0\\\",\\\"End Color\\\":\\\"#3030FF\\\"}\",\"{\\\"Start Color\\\":\\\"#008000\\\",\\\"End Color\\\":\\\"#00FF00\\\"}\",\"{\\\"Start Color\\\":\\\"#900090\\\",\\\"End Color\\\":\\\"#FF00FF\\\"}\",\"{\\\"Start Color\\\":\\\"#008080\\\",\\\"End Color\\\":\\\"#00D0D0\\\"}\",\"{\\\"Start Color\\\":\\\"#A08000\\\",\\\"End Color\\\":\\\"#FFC000\\\"}\"]","Proficient Color":"{\"Start Color\":\"#0000FF\",\"End Color\":\"#6666FF\"}","Non-proficient Color":"{\"Start Color\":\"#EA7000\",\"End Color\":\"#FFA655\"}","Signature Color":"{\"Start Color\":\"#00B000\",\"End Color\":\"#00FF00\"}","Talent Check Color":"{\"Start Color\":\"#4080c0\",\"End Color\":\"#40c0f0\"}","Difficulty Color":"{\"Start Color\":\"#e08040\",\"End Color\":\"#f0c040\"}","Font Size":"26"}
 */
/*~struct~talentStruct:
 * @param Name
 * @type combo
 * @desc Name of this talent.
 * @option Acrobatics
 * @option Arcana
 * @option Climb
 * @option Deception
 * @option Disable Trap
 * @option History
 * @option Insight
 * @option Investigation
 * @option Jump
 * @option Lockpicking
 * @option Medicine
 * @option Nature
 * @option Perception
 * @option Performance
 * @option Persuasion
 * @option Religion
 * @option Sleight of Hand
 * @option Stealth
 * @option Swim
 *
 * @param Description
 * @type note
 * @desc Description of this talent.
 *
 * @param Abbreviation
 * @type combo
 * @desc This is the abbreviated name that you will use to reference a talent.  Don't use spaces or atk, def, agi etc.
 * @option acro
 * @option arca
 * @option clib
 * @option dece
 * @option disa
 * @option hist
 * @option insi
 * @option inve
 * @option jump
 * @option lock
 * @option medi
 * @option natu
 * @option perc
 * @option perf
 * @option pers
 * @option reli
 * @option slei
 * @option stea
 * @option swim
 *
 * @param Class Proficiencies
 * @type class[]
 * @desc Classes who have proficiency with this talent.
 * @default []
 *
 * @param Class Signatures
 * @type class[]
 * @desc Classes who automatically receive max ranks in this talent.
 * @default []
 *
 * @param Visibility Mode
 * @type select
 * @desc Configure which classes can see and potentially add ranks to this talent.
 * @default ALL
 * @option Visible to All
 * @value ALL
 * @option Visible to None
 * @value NONE
 * @option Visible to Specific Classes
 * @value CLASS
 *
 * @param Class Visibility
 * @type class[]
 * @desc If Visibility Mode is set to CLASS, this talent is visible to these classes.
 * @default []
 *
 * @param Starting Ranks
 * @type number
 * @desc Number of ranks all actors start the game with.
 * @default 0
 * @min 0
 *
 * @param Requires Training
 * @type boolean
 * @desc Some talents require training to use.  If true, the actor must have at least 1 rank to use this talent or receive bonuses.
 * @default false
 * @on Yes
 * @off No
 *
 * @param Synergy Requirement
 * @type struct<synergyReqStruct>[]
 * @desc This talent is hidden until it's synergy requirements are met.
 * @default []
 *
 * @param Synergy Bonuses
 * @type struct<synergyBonusStruct>[]
 * @desc This talent gets a bonus if it's synergy requirements are met.
 * @default []
 *
 * @param Required Item
 * @type struct<requiredItemStruct>
 * @desc This talent gets a bonus if it's synergy requirements are met.
 * @default {}
 */
/*~struct~requiredItemStruct:
 * @param Item Id
 * @type item
 * @desc An item that is required in order to perform this Talent.
 * @default
 *
 * @param Count
 * @type number
 * @desc Number of the item required to perform this Talent Check.
 * @default 1
 * @min 0
 *
 * @param Consume
 * @type boolean
 * @desc Consume item(s) when check is performed.
 * @default false
 * @on Yes
 * @off No
 */
/*~struct~synergyReqStruct:
 * @param Talent Abbreviation
 * @type string
 * @desc This is the abbreviated name of the talent.
 *
 * @param Required Ranks
 * @type number
 * @desc Number of talent ranks needed to unlock this synergy.
 * @default 5
 * @min 0
 */
/*~struct~synergyBonusStruct:
 * @param Talent Abbreviation
 * @type string
 * @desc This is the abbreviated name of the talent.
 *
 * @param Required Ranks
 * @type number
 * @desc Number of talent ranks needed to unlock this synergy.
 * @default 5
 * @min 0
 *
 * @param Bonus
 * @type number
 * @desc Bonus received when required ranks are acquired.
 * @default 2
 * @min 0
 */
/*~struct~classConfigStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Class Id
 * @type class
 * @desc Class that gains points to improve talents.
 * @default 1
 *
 * @param Starting Points
 * @type number
 * @desc Number of talent points this class starts with.
 * @default 0
 * @min 0
 *
 * @param Points Per Level
 * @type number
 * @desc Number of talent points gained at each level.
 * @default 0
 * @min 0
 *
 * @param Auto-Distribution
 * @type select
 * @desc If an actor with this class has Player Control set to false, their stats can be assigned automatically.
 * @default Vertical
 * @option Vertical - Use Distribution Patterns to signify rates of progression for each talent.
 * @value Vertical
 * @option Horizontal - Assign exactly which talents gain points at each level.
 * @value Horizontal
 *
 * @param Vertical Distribution
 * @type struct<vertDistributeStruct>[]
 * @desc List distribution patterns for each talent.
 * @default []
 *
 * @param Horizontal Distribution
 * @type struct<horizDistributeStruct>[]
 * @desc Define how talents increase on a level by level basis.
 * @default []
 */
/*~struct~vertDistributeStruct:
 * @param Talent Abbreviation
 * @type string
 * @desc This is the abbreviated name of the talent that this actor or race gains a bonus/penalty to.
 *
 * @param Pattern
 * @type string
 * @desc This is the name of the pattern used for advancement.
 */
/*~struct~horizDistributeStruct:
 * @param Advancement
 * @type struct<horizAdvanceStruct>[]
 * @desc Advancement for this level.  Advancement starts over when it reaches the end of this list.
 * @default []
 */
/*~struct~horizAdvanceStruct:
 * @param Abbr
 * @type string
 * @desc Abbreviated name of the talent.
 *
 * @param Ranks
 * @type number
 * @desc Number of ranks applied for this advancement.
 */
/*~struct~patternStruct:
 * @param Vertical Patterns
 * @type struct<autoVerticalStruct>[]
 * @desc Specify the rate of increase for each talent.
 * @default []
 *
 * @param Horizontal Patterns
 * @type struct<autoHorizontalStruct>[]
 * @desc Specify the rate of increase for each talent.
 * @default []
 */
/*~struct~autoVerticalStruct:
 * @param Name
 * @type string
 * @desc Name that identifies this pattern of talent advancement.
 *
 * @param Pattern
 * @type number[]
 * @desc Repeating pattern used for distributing talent points.  For example, [0, 1] will raise this talents rank every other level.
 * @default []
 * @min 0
 */
/*~struct~autoVerticalStruct:
 * @param Name
 * @type string
 * @desc Name that identifies this pattern of talent advancement.
 *
 * @param Pattern
 * @type number[]
 * @desc Repeating pattern used for distributing talent points.  For example, [0, 1] will raise this talents rank every other level.
 * @default []
 * @min 0
 */
/*~struct~actorConfigStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Actor Id
 * @type actor
 * @desc Actor that gains points to improve talents.
 * @default 1
 *
 * @param Player Control
 * @type boolean
 * @desc If true, player distributes talent points.  If false, distribution is determined in Class Config.
 * @default true
 * @on Yes
 * @off No
 *
 * @param Starting Bonus/Penalty
 * @type number
 * @desc Number of talent points this actor gains or loses from their starting pool.
 * @default 0
 * @min -9999
 *
 * @param Point Bonus/Penalty
 * @type number
 * @desc Number of talent points this actor gains or loses per level.
 * @default 0
 * @min -9999
 *
 * @param Talent Bonus/Penalty
 * @type struct<talentBonusStruct>[]
 * @desc Natural bonuses or penalties to specific talents.
 * @default []
 *
 * @param Talent Check Variable
 * @type variable
 * @desc The variable that the specified actor's talent checks are linked to.
 */
/*~struct~raceConfigStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Race Id
 * @type number
 * @desc Race Id as defined in the FROG_RaceCore plugin.
 * @default 1
 *
 * @param Starting Bonus/Penalty
 * @type number
 * @desc Number of talent points this race gains or loses from their starting pool.
 * @default 0
 * @min -9999
 *
 * @param Point Bonus/Penalty
 * @type number
 * @desc Number of talent points this race gains or loses per level.
 * @default 0
 * @min -9999
 *
 * @param Talent Bonus/Penalty
 * @type struct<talentBonusStruct>[]
 * @desc Natural bonuses or penalties to specific talents.
 * @default []
 */
/*~struct~enemyConfigStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Enemy Id
 * @type enemy
 * @desc Enemy that has talents.
 * @default 1
 *
 * @param Enemy Talents
 * @type struct<talentScoreStruct>[]
 * @desc The enemy's talents and ranks.
 */
/*~struct~namedCheckStruct:
 * @param Name
 * @type string
 * @desc Name of the talent check.
 *
 * @param Target Number
 * @type number
 * @desc Target Number for this named check.
 * @default 10
 */
/*~struct~namedModifierStruct:
 * @param Name
 * @type string
 * @desc Name of the talent check modifier.
 *
 * @param Modifier
 * @type number
 * @desc Modifier value for the named situation.
 * @default 2
 * @min -9999
 */
/*~struct~talentBonusStruct:
 * @param Talent Abbreviation
 * @type string
 * @desc This is the abbreviated name of the talent that this actor or race gains a bonus/penalty to.
 *
 * @param Bonus/Penalty
 * @type number
 * @desc Bonus or penalty value
 * @default 2
 * @min -9999
 */
/*~struct~talentScoreStruct:
 * @param Talent Abbreviation
 * @type string
 * @desc This is the abbreviated name of the talent that this enemy has.
 *
 * @param Score
 * @type number
 * @desc The enemy's talent score.
 * @default 0
 * @min 0
 */
/*~struct~checkDefaultsStruct:
 * @param Last Check Variable
 * @type variable
 * @desc Default variable to store the last talent check result.
 *
 * @param Target Number Variable
 * @type variable
 * @desc Default variable to store target numbers generated from enemy talents.
 *
 * @param Roll Type
 * @type select
 * @desc Set the default Roll Type so that you don't specify every time.
 * @default ROLL
 * @option Max Score
 * @value MAX
 * @option Random (1 - Max Score)
 * @value RND
 * @option Roll Dice & Add Score
 * @value ROLL
 *
 * @param Die Count
 * @type number
 * @desc The default number of dice you roll to determine a Roll type talent check.
 * @default 1
 *
 * @param Die Type
 * @type combo
 * @desc Set the default Die Type so that you don't specify every time. It'll work with or without the 'd'.
 * @default d20
 * @option d6
 * @option d8
 * @option d10
 * @option d12
 * @option d20
 *
 * @param View Mode
 * @type select
 * @desc Sets the default view modes for talent checks.
 * @default ASK
 * @option None
 * @value NONE
 * @option Show but don't Ask
 * @value SHOW
 * @option Ask and Show
 * @value ASK
 *
 * @param Decline Check Value
 * @type number
 * @desc The number returned if the player chooses not to attempt a Talent Check
 * @default 9999
 *
 * @param Normalize Target Number
 * @type boolean
 * @desc Use the desired Target Score for the Target Number. You can change Talent Check Defaults without having to update TNs.
 * @default false
 * @on Yes
 * @off No
 *
 * @param Named Checks
 * @type struct<namedCheckStruct>[]
 * @desc Names for commonly used Talent Checks.
 * @default ["{\"Name\":\"ClimbVine\",\"Target Number\":\"10\"}","{\"Name\":\"PitTrap\",\"Target Number\":\"12\"}","{\"Name\":\"SecretDoor\",\"Target Number\":\"15\"}","{\"Name\":\"TavernClue\",\"Target Number\":\"15\"}"]
 *
 * @param Named Modifiers
 * @type struct<namedModifierStruct>[]
 * @desc Names for commonly used Talent Check Modifiers.
 * @default ["{\"Name\":\"Dark\",\"Modifier\":\"5\"}","{\"Name\":\"Friendly\",\"Modifier\":\"-2\"}","{\"Name\":\"Icy\",\"Modifier\":\"10\"}","{\"Name\":\"Invisible\",\"Modifier\":\"30\"}","{\"Name\":\"Light\",\"Modifier\":\"-3\"}","{\"Name\":\"Slippery\",\"Modifier\":\"2\"}","{\"Name\":\"Unfriendly\",\"Modifier\":\"2\"}"]
 *
 * @param Talent Bar Increment
 * @type number
 * @decimals 2
 * @min 0
 * @desc When a Talent Check is shown, this is the amount by which the Check gauge increases.
 * @default 0.25
 *
 * @param Talent Bar Wait
 * @type number
 * @min 0
 * @max 1000
 * @desc This is the wait in milliseconds between redraws when the Talent Check bar is rising to its Talent Check score.
 * @default 15
 */
/*~struct~commandStruct:
 * @param Main Menu
 * @parent Commands
 * @type string
 * @desc This is the name of the command that will display in the main menu.
 * @default Talents
 *
 * @param Raise Talent
 * @parent Commands
 * @type string
 * @desc This is the name of the command that will display in the talents menu when System Mode is FULL and Player Control is true.
 * @default Raise Talent
 *
 * @param View Talent
 * @parent Commands
 * @type string
 * @desc This is the name of the command that will display in the talents menu when System Mode is not FULL or Player Control is false.
 * @default View Talent
 *
 * @param Exit
 * @parent Commands
 * @type string
 * @desc This is the name of the command that exits the user from the talents menu.
 * @default Exit
 *
 * @param Finish
 * @parent Commands
 * @type string
 * @desc This is the name of the command that commits your changes after apllying your talent points.
 * @default Finish
 */
/*~struct~textStruct:
 * @param Points Text
 * @type string
 * @desc This is the text that shows up in the Points box
 * @default Talent Points
 *
 * @param Talents Text
 * @type string
 * @desc This is the header text that shows up in the Talents window
 * @default Talents
 *
 * @param Ranks Text
 * @type string
 * @desc This is the header text that shows up in the Talents window
 * @default Ranks
 *
 * @param Bonus Text
 * @type string
 * @desc This is the header text that shows up in the Talents window
 * @default Bonus
 *
 * @param Score Text
 * @type string
 * @desc This is the header text that shows up in the Talents window
 * @default Score
 *
 * @param Difficulty Text
 * @type string
 * @desc This is the text that is displayed on the Difficulty gauge when a Talent Check is performed.
 * @default Difficulty
 *
 * @param Talent Check Text
 * @type string
 * @desc This is the text that is displayed on the Talent Check gauge when a Talent Check is performed.
 * @default Talent Check
 *
 * @param Success Text
 * @type string
 * @desc This is the text that is displayed when a Talent Check succeeds.
 * @default Success!
 *
 * @param Success Color
 * @type string
 * @desc This is the color of the Success Text.
 * @default #30FF30
 *
 * @param Fail Text
 * @type string
 * @desc This is the text that is displayed when a Talent Check fails.
 * @default Failed!
 *
 * @param Fail Color
 * @type string
 * @desc This is the color of the Fail Text.
 * @default #FF3030
 *
 * @param Learn Trait
 * @type string
 * @desc If you are using Talent-based Traits, this text tells the player what they will learn by advancing to this score.
 * @default Learn at this rank\c[17]
 */
/*~struct~styleStruct:
 * @param Show Ranks
 * @type boolean
 * @desc Show or hide the Ranks column in the Talents window
 * @default true
 * @on Show
 * @off Hide
 *
 * @param Show Bonus
 * @type boolean
 * @desc Show or hide the Bonus column in the Talents window
 * @default true
 * @on Show
 * @off Hide
 *
 * @param Show Score
 * @type boolean
 * @desc Show or hide the Score column in the Talents window
 * @default true
 * @on Show
 * @off Hide
 *
 * @param Show Check Numbers
 * @type boolean
 * @desc Show or hide the Difficulty and Talent Check numbers.
 * @default true
 * @on Show
 * @off Hide
 *
 * @param Gauge Height
 * @type number
 * @desc Pixel height of the gauges on the Talents screens.
 * @default 15
 *
 * @param Gauge Color Type
 * @type select
 * @desc Color code your gauges for proficient/non-proficient or a rolling series of colors.
 * @default Proficiency
 * @option Color List
 * @value Color List
 * @option Proficiency
 * @value Proficiency
 *
 * @param Color List
 * @type struct<colorStruct>[]
 * @desc If using the Color List option, this is a repeating list of colors that your gauges will use.
 * @default ["{\"Start Color\":\"#B00000\",\"End Color\":\"#FF3030\"}","{\"Start Color\":\"#0000B0\",\"End Color\":\"#3030FF\"}","{\"Start Color\":\"#008000\",\"End Color\":\"#00FF00\"}","{\"Start Color\":\"#900090\",\"End Color\":\"#FF00FF\"}","{\"Start Color\":\"#008080\",\"End Color\":\"#00D0D0\"}","{\"Start Color\":\"#A08000\",\"End Color\":\"#FFC000\"}"]
 *
 * @param Proficient Color
 * @type struct<colorStruct>
 * @desc If using the Proficiency option, this is the color of talent gauges that an actor is proficient with.
 * @default {"Start Color":"#0000FF","End Color":"#6666FF"}
 *
 * @param Non-proficient Color
 * @type struct<colorStruct>
 * @desc If using the Proficiency option, this is the color of talent gauges that an actor is not proficient with.
 * @default {"Start Color":"#EA7000","End Color":"#FFA655"}
 *
 * @param Signature Color
 * @type struct<colorStruct>
 * @desc If using the Proficiency option, this is the color of signature talent gauges.
 * @default {"Start Color":"#00B000","End Color":"#00FF00"}
 *
 * @param Talent Check Color
 * @type struct<colorStruct>
 * @desc Color of the Talent Check gauge.
 * @default {"Start Color":"#4080c0","End Color":"#40c0f0"}
 *
 * @param Difficulty Color
 * @type struct<colorStruct>
 * @desc Color of the Talent Check difficulty gauge.
 * @default {"Start Color":"#e08040","End Color":"#f0c040"}
 *
 * @param Font Size
 * @type number
 * @desc Font size in the Talents window.
 * @default 26
 *
 * @param Show Required Item
 * @type select
 * @desc Configure how the Required Item for a talent check is displayed.
 * @default Name
 * @option Item Name
 * @value Name
 * @option Item Icon
 * @value Icon
 * @option Both Item Name and Icon
 * @value Both
 */
/*~struct~colorStruct:
 * @param Start Color
 * @type string
 * @desc Hex color that a gauge starts with on the left
 *
 * @param End Color
 * @type string
 * @desc Hex color that a gauge ends with on the right
 */
 var $dataTalents = {};

FROG.Talents.talents = (PluginManager.parameters('FROG_TalentCore')['Talent Config']) ? JSON.parse(PluginManager.parameters('FROG_TalentCore')['Talent Config']) : [];
FROG.Talents.addToFormulas = (PluginManager.parameters('FROG_TalentCore')['Add to Formulas'] === "true");

/* ---------------------------------------------------------------*\
                        Add to Formulas
\* -------------------------------------------------------------- */

// Add properties to Game_BattlerBase so that talents can be used in formulas
if (FROG.Talents.addToFormulas === true) {
    var evalStr = "Object.defineProperties (Game_BattlerBase.prototype, {";
    for (var i=0, j=FROG.Talents.talents.length; i<j; i++) {
        var talParam = JSON.parse(FROG.Talents.talents[i]).Abbreviation;
        if (talParam) {
            evalStr += "" +
                talParam + ": { " +
                "   get: function () { " +
                "      return FROG.Talents.getTalentScore(this, '" + talParam + "'); " +
                "   }, " +
                "   configurable: true " +
                "}, ";
        }
    }
    evalStr = evalStr.slice(0, -1) + " });";
    eval(evalStr);
    i = evalStr = talParam = FROG.Talents.talents = undefined;
}

/* ---------------------------------------------------------------*\
                            Data Manager
\* -------------------------------------------------------------- */

FROG.Talents.DataManager_IsDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!FROG.Talents.DataManager_IsDatabaseLoaded.call(this)) return false;
    FROG.Core.jsonParams(PluginManager.parameters('FROG_TalentCore'), $dataTalents);
    //console.log($dataTalents);
    return true;
}

// Save File
FROG.Talents.DataManager_MakeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = FROG.Talents.DataManager_MakeSaveContents.call(this);
    if ($dataTalents.saveTalentsObject === true) {
        contents.talents = $dataTalents;
    }
    return contents;
}

// Load File
FROG.Talents.DataManager_ExtractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    FROG.Talents.DataManager_ExtractSaveContents.call(this, contents);
    if ($dataTalents.saveTalentsObject === true) {
        $dataTalents = contents.talents;
    }
}

/* ---------------------------------------------------------------*\
                            Game Enemy
\* -------------------------------------------------------------- */

// Initialize enemy talents when battle starts
FROG.Talents.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function (enemyId, x, y) {
    FROG.Talents.Game_Enemy_setup.call(this, enemyId, x, y);

    // Set up talents
    this._talents = {};
    var enemy = $dataEnemies[enemyId];
    if (enemy && $dataTalents.enemyConfig) {
        for (var i=0; i<$dataTalents.enemyConfig.length; i++) {
            var config = $dataTalents.enemyConfig[i];
            if (config.enemyId === enemy._enemyId) {
                this._talents[config.talentAbbreviation.trim()] = parseInt(config.score) || 0;
            }
        }
    }
}

/* ---------------------------------------------------------------*\
                            Game Actor
\* -------------------------------------------------------------- */

// Initialize actor talents when game starts
FROG.Talents.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
    FROG.Talents.Game_Actor_setup.call(this, actorId);
    this.initializeTalents();
}

// Initialize Actor Talents
Game_Actor.prototype.initializeTalents = function () {
    var self = this;
    this._talents = {};
    this._talentControl = true;

    if (!FROG.Core.isEmpty($dataTalents.actorConfig)) {
        var actorConfig = $dataTalents.actorConfig.filter(function (config) {
            return config.actorId == self.actorId();
        })[0];
        this._talentControl = (actorConfig && actorConfig.playerControl === false) ? false : true;
    }

    for (var i=0; i<$dataTalents.talentConfig.length; i++) {
        var talent = $dataTalents.talentConfig[i];
        if (talent && talent.abbreviation) {
            var ranks = talent.startingRanks || 0;

            // Class Signature Initialization
            if (this._talentControl && talent.classSignatures.length > 0 && talent.classSignatures.indexOf(this._classId) > -1) {
                ranks = this._level;
                if ($dataTalents.maxType == "LEVEL") {
                    ranks += $dataTalents.maxRanks || 0;
                }
            }

            // Assign ranks if Player Control is false
            ranks += FROG.Talents.getAutoRanks(this, talent.abbreviation, true) || 0;

            // Push talent ranks
            this._talents[talent.abbreviation] = {
                name: talent.name,
                desc: talent.description,
                prof: (talent.classProficiencies.indexOf(this._classId) > -1) ? true : false,
                sig: (talent.classSignatures.indexOf(this._classId) > -1) ? true : false,
                vis: (talent.visibilityMode == "ALL" || (talent.visibilityMode == "CLASS" && talent.classVisibility.indexOf(this._classId) > -1)) ? true : false,
                ranks: ranks,
                trained: talent.requiresTraining,
                requiredItem: {
                    itemId: (talent.requiredItem && talent.requiredItem.itemId) ? talent.requiredItem.itemId : 0,
                    count: (talent.requiredItem && talent.requiredItem.count) ? talent.requiredItem.count : 0,
                    consume: (talent.requiredItem && talent.requiredItem.consume) ? true : false
                }
            };
        }
    }

    // Issue starting talent points
    this._talentPoints = 0;
    this.addTalentPoints(true);
}

/** Gets auto-distributed points for an actor at their current level.
 * @param {object} actor - The actor
 * @param {string} abbr - Talent abbreviation
 * @param {number} Returns the ranks gained at this level.
 */
FROG.Talents.getAutoRanks = function (actor, abbr, initialize) {
    var ranks = 0;

    if (!FROG.Core.isEmpty($dataTalents.classConfig)) {
        var classConfig = $dataTalents.classConfig.filter(function (config) {
            return config.classId == actor._classId;
        })[0] || {};

        if (!actor._talentControl && !FROG.Core.isEmpty(classConfig)) {
            classConfig.autoDistribution = classConfig.autoDistribution || "Vertical";
            classConfig.verticalDistribution = classConfig.verticalDistribution || [];
            classConfig.horizontalDistribution = classConfig.horizontalDistribution || [];
            $dataTalents.distributionPatterns = $dataTalents.distributionPatterns || [];

            switch (classConfig.autoDistribution) {
                // Vertical Distribution
                case "Vertical":
                    if (classConfig.verticalDistribution.length) {
                        var vDist = classConfig.verticalDistribution.filter(function (v) {
                            return v.talentAbbreviation == abbr;
                        })[0] || null;
                        var patternName = (vDist && vDist.pattern) ? vDist.pattern : "";

                        var distributionPatterns = $dataTalents.distributionPatterns.filter(function (d) {
                            return d.name == patternName;
                        })[0] || null;
                        var pattern = (distributionPatterns && distributionPatterns.pattern) ? distributionPatterns.pattern : "";

                        if (pattern && pattern.length) {
                            if (initialize) {
                                for (var i=1; i<=actor._level; i++) {
                                    ranks += pattern[i % pattern.length];
                                }
                            }
                            else {
                                ranks += pattern[actor._level % pattern.length];
                            }
                        }
                    }
                    break;

                // Horizontal Distribution
                case "Horizontal":
                    if (classConfig.horizontalDistribution.length) {
                        var index = actor._level % classConfig.horizontalDistribution.length;
                        var hDist = classConfig.horizontalDistribution[index].advancement;
                        for (var j=0; j<hDist.length; j++) {
                            var advance = hDist[j];
                            if (advance.abbr == abbr) {
                                ranks += advance.ranks;
                            }
                        }
                    }
                    break;
            }
        }
    }

    return ranks;
}

// Reset starting talent points if class changes at initial level
//        Used for when the player chooses their character's classes
FROG.Talents.Game_Actor_ChangeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function (classId, keepExp) {
    FROG.Talents.Game_Actor_ChangeClass.call(this, classId, keepExp);

    // Reset talent points
    if ($dataTalents.classChangeReset || !keepExp) {
        this.initializeTalents();

        // Add points per level
        var levels = this._level - $dataActors[this.actorId()].initialLevel;
        for (var i=0; i<levels; i++) {
            this.addTalentPoints(false);
        }
    }
}

/** Adds points to an actor
 * @param {boolean} initialize - Will add the starting points instead of the points per level
 */
Game_Actor.prototype.addTalentPoints = function (initialize) {
    var self = this;
    if (!FROG.Core.isEmpty($dataTalents.classConfig)) {
        var classConfig = $dataTalents.classConfig.filter(function (config) {
            return config.classId == self._classId;
        })[0] || {};
    }

    if (this._talentControl && $dataTalents.systemMode != "HIDE") {
        if (initialize) {
            this._talentPoints = 0;
        }

        // Class Starting Points
        if (!FROG.Core.isEmpty($dataTalents.classConfig)) {
            var classConfig = $dataTalents.classConfig.filter(function (config) {
                return config.classId == self._classId;
            })[0];

            if (initialize) {
                this._talentPoints += (classConfig && classConfig.startingPoints) ? classConfig.startingPoints : 0;
            }
            else {
                this._talentPoints += (classConfig && classConfig.pointsPerLevel) ? classConfig.pointsPerLevel : 0;
            }
        }

        // Actor Starting Points
        if (!FROG.Core.isEmpty($dataTalents.actorConfig)) {
            var actorConfig = $dataTalents.actorConfig.filter(function (config) {
                return config.actorId == self.actorId();
            })[0];

            if (initialize) {
                this._talentPoints += (actorConfig && actorConfig.startingBonusPenalty) ? actorConfig.startingBonusPenalty : 0;
            }
            else {
                this._talentPoints += (actorConfig && actorConfig.pointBonusPenalty) ? actorConfig.pointBonusPenalty : 0;
            }
        }

        // Race Starting Points
        if (Imported.FROG_Races === true && $dataRaces && this.raceId() && $dataRaces[this.raceId()]) {
            if (!FROG.Core.isEmpty($dataTalents.raceConfig)) {
                var raceConfig = $dataTalents.raceConfig.filter(function (config) {
                    return config.raceId == self.raceId();
                })[0];

                if (initialize) {
                    this._talentPoints += (raceConfig && raceConfig.startingBonusPenalty) ? raceConfig.startingBonusPenalty : 0;
                }
                else {
                    this._talentPoints += (raceConfig && raceConfig.pointBonusPenalty) ? raceConfig.pointBonusPenalty : 0;
                }
            }
        }
    }
}

// Add talent points per level when actor levels up
FROG.Talents.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function () {
    FROG.Talents.Game_Actor_levelUp.call(this);
    this.addTalentPoints(false);

    // Class Signature Talents (Add 1 rank to each so that these stay maxed out)
    for (var i=0; i<$dataTalents.talentConfig.length; i++) {
        var talent = $dataTalents.talentConfig[i];
        if (this._talentControl) {
            if (talent && talent.classSignatures && talent.classSignatures.indexOf(this._classId) > -1) {
                FROG.Talents.addTalentRanks(this.actorId(), talent.abbreviation, 1);
            }
        }
        else {
            var ranks = FROG.Talents.getAutoRanks(this, talent.abbreviation, false) || 0;
            FROG.Talents.addTalentRanks(this.actorId(), talent.abbreviation, ranks);
        }
    }
}

/* ---------------------------------------------------------------*\
                        Window MenuCommand
\* -------------------------------------------------------------- */

// Add Talents command to the main menu
FROG.Talents.Window_MenuCommand_AddOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
    FROG.Talents.Window_MenuCommand_AddOriginalCommands.call(this);
    if ($dataTalents.systemMode != "HIDE") {
        this.addCommand($dataTalents.commands.mainMenu, 'talents', true);
    }
}

/* ---------------------------------------------------------------*\
                        Scene Menu
\* -------------------------------------------------------------- */

// Binds selection of Talents main menu command
FROG.Talents.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function () {
    FROG.Talents.Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('talents', this.commandPersonal.bind(this));
}

// Opens the talents scene when main menu command is fired
FROG.Talents.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function () {
    if (this._commandWindow.currentSymbol() === 'talents') {
        this.openTalents();
        return;
    }
    FROG.Talents.Scene_Menu_onPersonalOk.call(this);
}

// Opens Talents scene
Scene_Menu.prototype.openTalents = function () {
    SceneManager.push(Scene_Talents);
}

/* ---------------------------------------------------------------*\
                        Scene Talents
\* -------------------------------------------------------------- */

function Scene_Talents() {
    this.initialize.apply(this, arguments);
}

Scene_Talents.prototype = Object.create(Scene_ItemBase.prototype);
Scene_Talents.prototype.constructor = Scene_Talents;

// Create talents scene
Scene_Talents.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCommandWindow();
    this.createStatusWindow();
    this.createPointsWindow();
    this.createTalentsWindow();
    this.refreshActor();
}

// Create Help window
Scene_Talents.prototype.createHelpWindow = function () {
    this._helpWindow = new Window_Help(2);
    this._helpWindow.setText("");
    this.addWindow(this._helpWindow);
}

// Creates command window and bind menu selections
Scene_Talents.prototype.createCommandWindow = function () {
    var wx = 0;
    var wy = this._helpWindow.height;
    this._commandWindow = new Window_TalentsCommand(wx, wy);
    this._commandWindow.setHelpWindow(this._helpWindow);
    this._commandWindow.setHandler('addpoints', this.commandAddPoints.bind(this));
    this._commandWindow.setHandler('exit', this.popScene.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._commandWindow.setHandler('pageup', this.previousActor.bind(this));
    this.addWindow(this._commandWindow);
}

// Create status window
Scene_Talents.prototype.createStatusWindow = function () {
    var wx = 0;
    var wy = this._helpWindow.height + this._commandWindow.height;
    var ww = this._commandWindow.width;
    var wh = 300;
    this._statusWindow = new Window_TalentsStatus(wx, wy, ww, wh);
    this._statusWindow.reserveFaceImages();
    this.addWindow(this._statusWindow);
}

// Create points window
Scene_Talents.prototype.createPointsWindow = function () {
    var wx = 0;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = this._statusWindow.width;
    var wh = 0;
    this._pointsWindow = new Window_TalentPoints(wx, wy, ww, wh);
    this.addWindow(this._pointsWindow);
}

// Create window where the talents are listed
Scene_Talents.prototype.createTalentsWindow = function () {
    var wx = this._commandWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - this._commandWindow.width;
    var wh = Graphics.boxHeight - wy;
    this._talentsWindow = new Window_Talent(wx, wy, ww, wh);
    this._talentsWindow.setHelpWindow(this._helpWindow);
    this._talentsWindow.setStatusWindow(this._statusWindow);
    this._talentsWindow.setPointsWindow(this._pointsWindow);
    this._talentsWindow.setHandler("finish", this.commandTalentFinish.bind(this));
    this._talentsWindow.setHandler("cancel", this.commandTalentCancel.bind(this));
    this.addWindow(this._talentsWindow);
}

// Refresh Actor
Scene_Talents.prototype.refreshActor = function () {
    var actor = this.actor();
    this._commandWindow.setActor(actor);
    this._statusWindow.setActor(actor);
    this._pointsWindow.setActor(actor);
    this._talentsWindow.setActor(actor);
}

// Actor has changed
Scene_Talents.prototype.onActorChange = function () {
    this.refreshActor();
    this._commandWindow.activate();
}

// Select the Raise Talents command
Scene_Talents.prototype.commandAddPoints = function () {
    this._talentsWindow.activate();
    this._talentsWindow.select(0);
}

// Select the Finish command from the Talents window
Scene_Talents.prototype.commandTalentFinish = function () {
    if (this._talentsWindow.totalPointsAdded() > 0) {
        this._talentsWindow.applyPoints();
        this._talentsWindow.deselect();
        this._commandWindow.activate();
        this._commandWindow.refresh();
        this._talentsWindow.setPoints(this._actor._talentPoints);
        this._pointsWindow.setPoints(this._actor._talentPoints);
        this._helpWindow.setText("Your changes were saved.");
        this.refreshActor();
    }
    else {
        this.refreshActor();
        this._talentsWindow.activate();
    }
}

// Cancel from the Talents window
Scene_Talents.prototype.commandTalentCancel = function () {
    this._talentsWindow.deselect();
    this._commandWindow.activate();
    if (this._talentsWindow.totalPointsAdded() > 0) {
        this._helpWindow.setText("Changes you made were not saved.\nSelect the " + $dataTalents.commands.finish + " command to save your changes.");
    }
}

/* ---------------------------------------------------------------*\
                    Window Talents Command
\* -------------------------------------------------------------- */

function Window_TalentsCommand() {
    this.initialize.apply(this, arguments)
}

Window_TalentsCommand.prototype = Object.create(Window_Command.prototype);
Window_TalentsCommand.prototype.constructor = Window_TalentsCommand;

// Talent command window width
Window_TalentsCommand.prototype.windowWidth = function () {
    return 300;
}

// Returns the number of commands in the Talent command window
Window_TalentsCommand.prototype.numVisibleRows = function () {
    return 2;
}

// Set Actor
Window_TalentsCommand.prototype.setActor = function (actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
}

// Add Raise Talents and Exit commands to  the Talents scene manu
Window_TalentsCommand.prototype.makeCommandList = function () {
    if ($dataTalents.systemMode == "FULL" && (!this._actor || this._actor._talentControl)) {
        this.addCommand($dataTalents.commands.raiseTalent, 'addpoints');
    }
    else {
        this.addCommand($dataTalents.commands.viewTalent, 'addpoints');
    }
    this.addCommand($dataTalents.commands.exit, 'exit');
}

/* ---------------------------------------------------------------*\
                    Window Talents Status
\* -------------------------------------------------------------- */

function Window_TalentsStatus() {
    this.initialize.apply(this, arguments)
}

Window_TalentsStatus.prototype = Object.create(Window_Base.prototype);
Window_TalentsStatus.prototype.constructor = Window_TalentsStatus;

// Initialize Status window
Window_TalentsStatus.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
}

// Set Actor
Window_TalentsStatus.prototype.setActor = function (actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
}

// Refresh contents
Window_TalentsStatus.prototype.refresh = function () {
    this.contents.clear();
    if (this._actor) {
        this.drawActorVerticalStatus();
    }
}

// Draw the actor's face and info
Window_TalentsStatus.prototype.drawActorVerticalStatus = function () {
    var lineHeight = this.lineHeight();
    var wx = 0;
    var wy = 0;
    var ww = this.contentsWidth();
    this.drawActorName(this._actor, wx, wy);
    this.drawActorClass(this._actor, this.width / 2, wy);
    wy += lineHeight;
    this.drawFace(this._actor.faceName(), this._actor.faceIndex(), wx, wy, ww);
    wy += Window_Base._faceHeight;
    this.drawActorHp(this._actor, wx, wy, ww);
    wy += lineHeight;
    this.drawActorMp(this._actor, wx, wy, ww);
}

/* ---------------------------------------------------------------*\
                        Window Points
\* -------------------------------------------------------------- */

function Window_TalentPoints() {
    this.initialize.apply(this, arguments)
}

Window_TalentPoints.prototype = Object.create(Window_Base.prototype);
Window_TalentPoints.prototype.constructor = Window_TalentPoints;

// Initialize Points window
Window_TalentPoints.prototype.initialize = function (x, y, width, height) {
    height = height || this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
}

// Set Actor
Window_TalentPoints.prototype.setActor = function (actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        if ($dataTalents.systemMode == "FULL" && actor._talentControl) {
            this.show();
        }
        else {
            this.hide();
        }
        this.setPoints(this._actor._talentPoints);
        this.refresh();
    }
}

// Clear contents
Window_TalentPoints.prototype.clear = function () {
    this.contents.clear();
}

// Get points
Window_TalentPoints.prototype.points = function () {
    return this._points;
}

// Set points
Window_TalentPoints.prototype.setPoints = function (value) {
    this._points = value;
    this.refresh();
}

// Refresh Points window
Window_TalentPoints.prototype.refresh = function () {
    this.contents.clear();
    if (this._actor && $dataTalents.systemMode == "FULL" && this._actor._talentControl) {
        var ww = this.contentsWidth();
        this.changeTextColor(this.systemColor());
        this.drawText($dataTalents.text.pointsText, 0, 0, ww * .75);
        this.resetTextColor();
        this.drawText(this.points(), ww * .75, 0, ww * .25, 'right');
    }
}

// Shows the Points window
Window_TalentPoints.prototype.show = function () {
    this.opacity = 255;
    this.backOpacity = this.standardBackOpacity();
}

// Hides the Points window
Window_TalentPoints.prototype.hide = function () {
    this.opacity = 0;
    this.backOpacity = 0;
}

/* ---------------------------------------------------------------*\
                        Window Talents
\* -------------------------------------------------------------- */

function Window_Talent() {
    this.initialize.apply(this, arguments)
}

Window_Talent.prototype = Object.create(Window_Command.prototype);
Window_Talent.prototype.constructor = Window_Talent;

// Initialize Talents window
Window_Talent.prototype.initialize = function (x, y, width, height) {
    this._windowWidth = width;
    this._windowHeight = height;
    this._statusWindow = null;
    this._pointsWindow = null;
    this.clearInfo();
    Window_Command.prototype.initialize.call(this, x, y);
    this.deselect();
    this.deactivate();
}

// Get window width
Window_Talent.prototype.windowWidth = function () {
    return this._windowWidth;
}

// Get window height
Window_Talent.prototype.windowHeight = function () {
    return this._windowHeight;
}

// Clear Talents window information
Window_Talent.prototype.clearInfo = function () {
    this._points = 0;
    this._pointsAdded = {};
}

// Get points
Window_Talent.prototype.points = function () {
    return this._points;
}

// Set points
Window_Talent.prototype.setPoints = function (value) {
    this._points = value;
}

// Get points added to a particular talent
Window_Talent.prototype.getPointsAdded = function (symbol) {
    return this._pointsAdded[symbol] || 0;
}

// Add point to a particular talent
Window_Talent.prototype.addPoint = function (symbol) {
    var proficiencyBonus = 0;

    if (this._actor) {
        var abbr = symbol.replace("talent_", "");
        if (this._pointsAdded[symbol]) {
            this._pointsAdded[symbol]++;
        }
        else {
            this._pointsAdded[symbol] = 1;
        }
        this.updatePointsWindow();

        // Talent-based Trait Rewards
        var ranks = this._actor._talents[abbr].ranks + this._pointsAdded[symbol];
        this.checkTalentBasedTraits(abbr, ranks);
    }
}

// Remove point from a particular talent
Window_Talent.prototype.remPoint = function (symbol) {
    if (this._actor && this._pointsAdded[symbol]) {
        if (this._pointsAdded[symbol] > 0) {
            this._pointsAdded[symbol]--;
            this.updatePointsWindow();

            // Talent-based Trait Rewards
            var abbr = symbol.replace("talent_", "");
            var ranks = this._actor._talents[abbr].ranks + this._pointsAdded[symbol];
            this.checkTalentBasedTraits(abbr, ranks);
        }
    }
}

// Sets Talent-based Traits
Window_Talent.prototype.checkTalentBasedTraits = function (abbr, ranks) {
    if (Imported.FROG_LevelBasedTraitsTalent === true && $dataTalents.traitRewards && $dataTalents.traitRewards[abbr]) {
        this.updateHelp();
        var rewardText = "";
        for (var i=0, j=$dataTalents.traitRewards[abbr].length; i<j; i++) {
            var reward = $dataTalents.traitRewards[abbr][i];
            if (reward && reward.name && reward.rank && ranks == reward.rank) {
                rewardText += reward.name + ", ";
            }
        }
        if (rewardText.length) {
            this._helpWindow.setText($dataTalents.text.learnTrait + String.fromCharCode(10) + rewardText.slice(0, -2));
        }
    }
}

// Get total points added
Window_Talent.prototype.totalPointsAdded = function () {
    var p = 0;
    for (var key in this._pointsAdded) {
        p += parseInt(this._pointsAdded[key]);
    }
    return p;
}

// Get the number of points left
Window_Talent.prototype.pointsLeft = function () {
    return this.points() - this.totalPointsAdded();
}

// Set the status window so that the Talents window can call it's methods
Window_Talent.prototype.setStatusWindow = function (window) {
    this._statusWindow = window;
}

// Set the Points window so that the Talents window can call it's methods
Window_Talent.prototype.setPointsWindow = function (window) {
    this._pointsWindow = window;
}

// Refresh contents
Window_Talent.prototype.refresh = function () {
    this.clearCommandList();
    this.makeCommandList();
    this.height = this.windowHeight();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
}

// Set actor
Window_Talent.prototype.setActor = function (actor) {
    this._actor = actor;
    this._maxRanks = FROG.Talents.getMaxRanks(actor);
    this._maxScore = FROG.Talents.getMaxScore(actor);
    this._maxGauge = FROG.Talents.getMaxGauge(actor);
    this.clearInfo();
    this.setPoints(this._actor._talentPoints);
    this.refresh();
}

// Set text in the Help window
Window_Talent.prototype.updateHelp = function () {
    var index = this.index();
    if (!this._list[index]) return;
    var symbol = this.commandSymbol(index);
    this._helpWindow.clear();
    if (symbol != "header" && symbol !== "finish") {
        var help = this._list[index].desc;
        if (help && help.includes('\"')) {
            help = help.replace(/\\n/g, String.fromCharCode(10)).slice(1, -1);
        }
        this._helpWindow.setText(help);
    }
}

// Set points for the Points window
Window_Talent.prototype.updatePointsWindow = function () {
    this._pointsWindow.clear();
    this._pointsWindow.setPoints(this.pointsLeft());
}

// Handle action button press on a selected talent
Window_Talent.prototype.processOk = function () {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    switch (symbol) {
        case "header": break;
        case "finish": Window_Command.prototype.processOk.apply(this, arguments); break;
        default: this.cursorRight(); break;
    }
}

// Add points to the selected talent
Window_Talent.prototype.applyPoints = function () {
    var self = this;
    var unappliedPoints = 0;
    if (this._actor) {
        Object.keys(this._pointsAdded).forEach(function(key, index) {
            var points = parseInt(self._pointsAdded[key]);
            var abbr = key.replace("talent_", "");
            if (self.isSynergyVisible(abbr, self._pointsAdded)) {
                self._actor._talents[abbr].ranks += points;
            }
            else {
                unappliedPoints += points;
            }
        });

        this._actor._talentPoints -= this.totalPointsAdded() - unappliedPoints;
        this.clearInfo();

        // Talent-based Traits
        if (Imported.FROG_LevelBasedTraitsTalent === true) {
            this._actor.addTalentTraits();
        }
    }
}

// Build a command list that consists of all of the talents
Window_Talent.prototype.makeCommandList = function () {
    var self = this;
    this.addCommand("Header", "header");
    this._list[this._list.length - 1].active = false;

    if (this._actor && this._actor._talents) {
        Object.keys(this._actor._talents).forEach(function(key, index) {
            var t = self._actor._talents[key];
            if (t && t.vis === true && self.isSynergyVisible(key, self._pointsAdded)) {
                self.addCommand(t.name, "talent_" + key);
                self._list[self._list.length - 1].abbr = key;
                self._list[self._list.length - 1].active = true;
                self._list[self._list.length - 1].desc = t.desc;
                self._list[self._list.length - 1].prof = t.prof;
                self._list[self._list.length - 1].ranks = t.ranks;
                self._list[self._list.length - 1].sig = t.sig;
            }
        });

        if ($dataTalents.systemMode == "FULL" && this._actor._talentControl) {
            this.addCommand($dataTalents.commands.finish, "finish");
            this._list[this._list.length - 1].active = false;
        }
    }
}

// Checks to see if this Talent is meets the requirements for visibility
Window_Talent.prototype.isSynergyVisible = function (abbr, pointsAdded) {
    pointsAdded = pointsAdded || {};
    var isVis = true;
    var talent = $dataTalents.talentConfig.filter(function (config) {
        return config.abbreviation == abbr;
    })[0] || null;

    if (talent && talent.synergyRequirement) {
        for (var i=0; i<talent.synergyRequirement.length; i++) {
            var synergy = talent.synergyRequirement[i] || null;
            if (synergy && synergy.talentAbbreviation && synergy.requiredRanks && this._actor && this._actor._talents) {
                var tal = this._actor._talents[synergy.talentAbbreviation] || {};
                if (synergy.requiredRanks > tal.ranks + (pointsAdded["talent_" + synergy.talentAbbreviation] || 0)) {
                    isVis = false;
                }
            }
        }
    }

    return isVis;
}

// Draw a talent or the Finish command
Window_Talent.prototype.drawItem = function (index) {
    var symbol = this.commandSymbol(index);
    switch (symbol) {
        case "header": this.drawHeaderItem(index);   break;
        case "finish": this.drawFinishItem(index);   break;
        default: this.drawTalentItem(index, symbol); break;
    }
}

// Draw the name, ranks, score and gauge for a talent
Window_Talent.prototype.drawHeaderItem = function (index) {
    var symbol = this.commandSymbol(index);
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.changeTextColor(this.systemColor());
    this.contents.fontSize = ($dataTalents.style.fontSize || 26) - 4;
    this.drawText($dataTalents.text.talentsText, rect.x + 5, rect.y, rect.width * 0.5 - 5, align);

    var slot = {
        position: 1,
        start: rect.x + rect.width * 0.5,
        width: rect.width * 0.5 - 5,
        x: 0,
        w: 0
    }

    if ($dataTalents.style.showScore) {
        this.setSlot(slot, true);
        this.drawText($dataTalents.text.scoreText, slot.x, rect.y, slot.w, 'right');
    }

    if ($dataTalents.style.showBonus) {
        this.setSlot(slot, true);
        this.drawText($dataTalents.text.bonusText, slot.x, rect.y, slot.w, 'right');
    }

    if ($dataTalents.style.showRanks) {
        this.setSlot(slot, true);
        this.drawText($dataTalents.text.ranksText, slot.x, rect.y, slot.w, 'right');
    }

    this.resetTextColor();
    this.contents.fontSize = $dataTalents.style.fontSize || 26;
}

// Draw the name, ranks, score and gauge for a talent
Window_Talent.prototype.drawTalentItem = function (index) {
    if (this._maxGauge <= 0) {
        console.error("Max Ranks cannot be zero when using type STRICT.");
        return;
    }
    var symbol = this.commandSymbol(index);
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    var addedPoints = this.getPointsAdded(symbol);
    var rate = parseFloat(FROG.Talents.getActorTalentScore(this._actor.actorId(), this._list[index].abbr, this._pointsAdded) / this._maxGauge).toFixed(2);

    if ($dataTalents.style.gaugeColorType == "Color List") {
        for (var i=0; i<$dataTalents.style.colorList.length; i++) {
            if (i == index % $dataTalents.style.colorList.length) {
                var colors = $dataTalents.style.colorList[i];
                var color1 = colors.startColor;
                var color2 = colors.endColor;
            }
        }
    }
    else {
        var colors = $dataTalents.style.nonproficientColor;
        if (colors) {
            if (this._list[index].sig === true) {
                colors = $dataTalents.style.signatureColor;
            }
            else if (this._list[index].prof === true) {
                colors = $dataTalents.style.proficientColor;
            }
            var color1 = colors.startColor;
            var color2 = colors.endColor;
        }
    }

    //this.changeTextColor(this.systemColor());
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawGauge(rect.x, rect.y, rect.width, rate, color1, color2);
    this.contents.fontSize = $dataTalents.style.fontSize || 26;
    this.drawText(this.commandName(index), rect.x + 5, rect.y, rect.width * 0.5 - 5, align);
    this.drawTalentItemNumbers(index, rect.x + rect.width * 0.5, rect.width * 0.5 - 5, rect);
}

// Draw talent gauge
Window_Talent.prototype.drawGauge = function (x, y, width, rate, color1, color2) {
    color1 = color1 || FROG.Core.badGaugeStartColor;
    color2 = color2 || FROG.Core.badGaugeEndColor;
    rate = rate || 0;
    var fillW = Math.floor(width * rate);
    var height = $dataTalents.style.gaugeHeight || 15;
    var gaugeY = y + this.lineHeight() - height;
    this.contents.fillRect(x, gaugeY, width, height, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, height, color1, color2);
}

// Draw talent ranks
Window_Talent.prototype.drawTalentItemNumbers = function (index, start, width, rect) {
    var symbol = this.commandSymbol(index);
    var addedPoints = this.getPointsAdded(symbol);
    var ranks = this._list[index].ranks + addedPoints;
    var score = FROG.Talents.getActorTalentScore(this._actor.actorId(), this._list[index].abbr, this._pointsAdded);
    var bonus = score - ranks;
    if (bonus >= 0) bonus = "+" + bonus;
    if (addedPoints > 0) this.changeTextColor("#80FF80");
    else this.resetTextColor();

    var slot = {
        position: 1,
        start: start,
        width: width,
        x: 0,
        w: 0
    }

    if ($dataTalents.style.showScore) {
        this.setSlot(slot, false);
        this.drawText(score.toString(), slot.x, rect.y, slot.w, 'right');
    }

    if ($dataTalents.style.showBonus) {
        this.setSlot(slot, false);
        this.drawText(bonus, slot.x, rect.y, slot.w, 'right');
    }

    if ($dataTalents.style.showRanks) {
        this.setSlot(slot, false);
        this.drawText(ranks.toString(), slot.x, rect.y, slot.w, 'right');
    }
    this.contents.fontSize = $dataTalents.style.fontSize || 26;
}

// Returns the coordinates of the numbers slot
Window_Talent.prototype.setSlot = function (slot, header) {
    switch (slot.position) {
        case 1:
            this.contents.fontSize = (header) ?
                $dataTalents.style.fontSize - 4 :
                $dataTalents.style.fontSize;
            slot.x = slot.start + slot.width * 0.6;
            slot.w = slot.width * 0.4;
            break;
        case 2:
            this.contents.fontSize = $dataTalents.style.fontSize - 4;
            slot.x = slot.start + slot.width * 0.3;
            slot.w = slot.width * 0.3;
            break;
        case 3:
            this.contents.fontSize = $dataTalents.style.fontSize - 4;
            slot.x = slot.start;
            slot.w = slot.width * 0.3;
            break;
    }
    slot.position++;
}

// Draw finish command in the Talent window
Window_Talent.prototype.drawFinishItem = function (index) {
    const rect = this.itemRectForText(index);
    const isEnabled = (this.totalPointsAdded() > 0);
    this.resetTextColor();
    this.changePaintOpacity(isEnabled);
    this.contents.fontSize = $dataTalents.style.fontSize || 26;
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, 'center');
    this.resetFontSettings();
}

// Increase ranks when the Right direction is pressed
Window_Talent.prototype.cursorRight = function (wrap) {
    var item = this._list[this.index()];
    if ($dataTalents.systemMode == "FULL" && this._actor._talentControl && item.active === true && (item.ranks + this.getPointsAdded(item.symbol)) < FROG.Talents.getMaxRanks(this._actor) && this.pointsLeft() > 0) {
        this.addPoint(item.symbol);
        SoundManager.playCursor();
        this.updatePointsWindow();
        this.refresh();
    }
}

// Increase ranks when the Left direction is pressed
Window_Talent.prototype.cursorLeft = function (wrap) {
    var item = this._list[this.index()];
    if ($dataTalents.systemMode == "FULL" && this._actor._talentControl && item.active === true && this.getPointsAdded(item.symbol) > 0) {
        this.remPoint(item.symbol);
        SoundManager.playCursor();
        this.updatePointsWindow();
        this.refresh();
    }
}

// Play OK Sound
Window_Talent.prototype.playOkSound = function () {
    var symbol = this.commandSymbol(this.index());
    switch (symbol) {
        case "header": SoundManager.playBuzzer(); break;
        case "finish":
            if (this.totalPointsAdded() > 0) {
                SoundManager.playSave();
            }
            else {
                SoundManager.playBuzzer();
            }
            break;
        default:
            Window_Command.prototype.playOkSound.apply(this, arguments);
            break;
    }
}

/* ---------------------------------------------------------------*\
                    Scene Talent Check
\* -------------------------------------------------------------- */

function Scene_TalentCheckResults() {
    this.initialize.apply(this, arguments);
}

Scene_TalentCheckResults.prototype = Object.create(Scene_ItemBase.prototype);
Scene_TalentCheckResults.prototype.constructor = Scene_TalentCheckResults;

// Pass in the talent check values to set up the Talent Check scene
Scene_TalentCheckResults.prototype.prepare = function (options) {
    this._options = options;
    this._actor = $gameActors.actor(options.aid);
}

// Create Talent Check scene
Scene_TalentCheckResults.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createStatusWindow();
    this.createCommandWindow();
    this.refreshActor();
    this._statusWindow._commandWindow = this._commandWindow;
    this._commandWindow.activate();
    this._commandWindow.select(0);
}

// Create the status window for the Talent Check scene and set the values
Scene_TalentCheckResults.prototype.createStatusWindow = function () {
    var ww = 400;
    var wh = 390;
    var wx = (Graphics.boxWidth - ww) / 2;
    var wy = (Graphics.boxHeight - wh) / 2 - 50;
    this._statusWindow = new Window_TalentCheckResults(wx, wy, ww, wh);
    this._statusWindow.reserveFaceImages();
    var o = this._options;
    this._var = o.var;
    this._statusWindow._type = o.type;
    this._statusWindow._aid = o.aid;
    this._statusWindow._abbr = o.abbr;
    this._statusWindow._target = o.target;
    this._statusWindow._result = o.result;
    this._statusWindow._mod = o.mod;
    this._statusWindow._die = o.die;
    this._statusWindow._dcount = o.dcount;
    this._statusWindow._min = Math.max(1, o.min);
    this._statusWindow._max = Math.max(1, o.max);
    this._statusWindow._view = o.view;
    this.addWindow(this._statusWindow);
}

// Create commands for the Talent Check scene
Scene_TalentCheckResults.prototype.createCommandWindow = function () {
    var wx = this._statusWindow.x;
    var wy = this._statusWindow.y + this._statusWindow.height;
    this._commandWindow = new Window_TalentCheckCommand(wx, wy);
    this._commandWindow.setStatusWindow(this._statusWindow);
    this._commandWindow.setHandler('attempt', this.commandAttempt.bind(this));
    this._commandWindow.setHandler('pass', this.commandPass.bind(this));
    this._commandWindow.setHandler('exit', this.popScene.bind(this));
    this._commandWindow.setHandler('cancel', this.commandPass.bind(this));
    this._commandWindow._view = this._options.view;
    this._commandWindow._abbr = this._options.abbr;
    this.addWindow(this._commandWindow);
}

// Refresh actor
Scene_TalentCheckResults.prototype.refreshActor = function () {
    var actor = this._actor;
    this._statusWindow.setActor(actor);
    this._commandWindow.setActor(actor);
}

// Called when the player chooses the Attempt command to attempt a talent
Scene_TalentCheckResults.prototype.commandAttempt = function () {
    // Remove required items if set to consume
    var actor = $gameActors.actor(this._options.aid);
    var abbr = this._options.abbr;
    if (actor && abbr) {
        var requiredItem = actor._talents[abbr].requiredItem;
        if (requiredItem && requiredItem.itemId && requiredItem.count && requiredItem.consume && $dataItems[requiredItem.itemId]) {
            var item = $dataItems[requiredItem.itemId];
            $gameParty.gainItem(item, requiredItem.count * -1)
        }
    }

    this._statusWindow._view = "SHOW";
    this._statusWindow.refresh();
}

// Called when the player chooses to not attempt a talent
Scene_TalentCheckResults.prototype.commandPass = function () {
    $gameVariables.setValue(parseInt(this._var), $dataTalents.checkDefaults.declineCheckValue)
    this.popScene();
}

/* ---------------------------------------------------------------*\
                    Window Talents Command
\* -------------------------------------------------------------- */

function Window_TalentCheckCommand() {
    this.initialize.apply(this, arguments)
}

Window_TalentCheckCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_TalentCheckCommand.prototype.constructor = Window_TalentCheckCommand;

// Initialize Talent Check window
Window_TalentCheckCommand.prototype.initialize = function (x, y) {
    Window_HorzCommand.prototype.initialize.call(this, x, y);
}

// Set status window
Window_TalentCheckCommand.prototype.setStatusWindow = function (window) {
    this._statusWindow = window;
}

// Talent Check command width (this should match the Status window width)
Window_TalentCheckCommand.prototype.windowWidth = function () {
    return 400;
}

// Number of commands
Window_TalentCheckCommand.prototype.maxCols = function () {
    return this._list.length;
};

// Set Actor
Window_TalentCheckCommand.prototype.setActor = function (actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
}

// Talent Check commands
Window_TalentCheckCommand.prototype.makeCommandList = function () {
    // Check for required item(s)
    var hasRequiredItem = true;
    if (this._actor && this._abbr) {
        var requiredItem = this._actor._talents[this._abbr].requiredItem;
        if (requiredItem && requiredItem.itemId && requiredItem.count && $dataItems[requiredItem.itemId]) {
            var item = $dataItems[requiredItem.itemId];
            if (!$gameParty.hasItem(item) || $gameParty.numItems(item) < requiredItem.count) {
                hasRequiredItem = false;
            }
        }
    }

    // Make commands
    if (this._view == "ASK") {
        if (hasRequiredItem) {
            this.addCommand("Attempt", 'attempt');
        }
        this.addCommand("Pass", 'pass');
    }
    else {
        this.addCommand($dataTalents.commands.exit, 'exit');
    }
}

/* ---------------------------------------------------------------*\
                    Window Talent Check
\* -------------------------------------------------------------- */

function Window_TalentCheckResults() {
    this.initialize.apply(this, arguments)
}

Window_TalentCheckResults.prototype = Object.create(Window_Base.prototype);
Window_TalentCheckResults.prototype.constructor = Window_TalentCheckResults;

// Initialize Talent Check window
Window_TalentCheckResults.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this._resultCounter = 0;
    this._done = false;
}

// Set Actor
Window_TalentCheckResults.prototype.setActor = function (actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
}

// Refresh content
Window_TalentCheckResults.prototype.refresh = function () {
    this.contents.clear();
    if (this._actor) {
        this.drawCheckResults();
    }
}

// Draw talent checks
Window_TalentCheckResults.prototype.drawCheckResults = function () {
    var lineHeight = this.lineHeight();
    var wx = 0;
    var wy = 0;
    var ww = this.contentsWidth();
    var resultColor = "#000000";
    var resultText = "";
    var hasRequiredItem = true;
    var reqItem = null;

    // Manage result text and colors
    if (this._done === false) {
        var requiredItem = this._actor._talents[this._abbr].requiredItem;
        if (requiredItem && requiredItem.itemId && requiredItem.count && $dataItems[requiredItem.itemId]) {
            var reqItem = $dataItems[requiredItem.itemId];
            resultColor = $dataTalents.text.successColor;
            resultText = (requiredItem.count > 1) ? requiredItem.count + "x " + reqItem.name : reqItem.name;
            if (!$gameParty.hasItem(reqItem) || $gameParty.numItems(reqItem) < requiredItem.count) {
                hasRequiredItem = false;
                resultColor = $dataTalents.text.failColor;
            }
        }
    }
    else if ($dataTalents.text) {
        if (this._result >= 0) {
            resultColor = $dataTalents.text.successColor;
            resultText = $dataTalents.text.successText;
        }
        else {
            resultColor = $dataTalents.text.failColor;
            resultText = $dataTalents.text.failText;
        }
    }

    // Draw check name
    this.resetTextColor();
    this.drawText(this._actor._talents[this._abbr].name, wx, wy, ww, "center");
    wy += lineHeight;
    this.drawHorzLine(lineHeight);
    wy += lineHeight;

    // Draw actor name and success/fail
    this.drawActorName(this._actor, wx, wy, ww / 2);
    this.changeTextColor(resultColor);

    if (this._done === false && reqItem && $dataTalents.style && $dataTalents.style.showRequiredItem) {
        // Draw required item(s)
        switch ($dataTalents.style.showRequiredItem) {
            case "Name":
                this.drawText(resultText, ww / 2, wy, ww / 2, "right");
                break;
            case "Icon":
                this.drawIcon(reqItem.iconIndex, ww - Window_Base._iconWidth, wy);
                if (requiredItem.count > 1) {
                    this.drawText(requiredItem.count + "x", ww / 2, wy, ww / 2 - Window_Base._iconWidth - 4, "right");
                }
                break;
            case "Both":
                this.drawIcon(reqItem.iconIndex, ww - Window_Base._iconWidth, wy);
                this.drawText(resultText, ww / 2, wy, ww / 2 - Window_Base._iconWidth - 4, "right");
                break;
        }
    }
    else {
        // Draw success/fail
        this.drawText(resultText, ww / 2, wy, ww / 2, "right");
    }
    wy += lineHeight;

    // Draw face
    this.drawFace(this._actor.faceName(), this._actor.faceIndex(), wx, wy, ww);
    wy += Window_Base._faceHeight;

    // Draw target number
    this.drawTargetNumber(this._actor, wx, wy, ww);
    wy += lineHeight + $dataTalents.style.gaugeHeight || 15;

    // Draw check result
    this.drawResult(this._actor, wx, wy, ww);
}

// Draw horizontal line
Window_TalentCheckResults.prototype.drawHorzLine = function (y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 150;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
    this.contents.paintOpacity = 255;
}

// Draw target number
Window_TalentCheckResults.prototype.drawTargetNumber = function (actor, x, y, width) {
    width = width || 186;
    if ($dataTalents.style && $dataTalents.style.difficultyColor) {
        var color1 = $dataTalents.style.difficultyColor.startColor;
        var color2 = $dataTalents.style.difficultyColor.endColor;
    }
    var min = (this._min < this._target) ? this._min : this._target;
    var max = (this._max > this._target) ? this._max : this._target;
    var rate = ((this._target - min + 1) / (max - min + 1)).toFixed(2);

    this.drawGauge(x, y, width, rate, color1, color2);
    this.resetTextColor();
    this.drawText($dataTalents.text.difficultyText, x, y, width * 0.7);
    if ($dataTalents.style.showCheckNumbers) {
        this.drawText(this._target, width * 0.7, y, width * 0.3 - 5, 'right');
    }
}

// Draw talent check result
Window_TalentCheckResults.prototype.drawResult = function (actor, x, y, width) {
    width = width || 186;
    if ($dataTalents.style && $dataTalents.style.talentCheckColor) {
        var color1 = $dataTalents.style.talentCheckColor.startColor;
        var color2 = $dataTalents.style.talentCheckColor.endColor;
    }
    var min = (this._min < this._target) ? this._min : this._target;
    var max = (this._max > this._target) ? this._max : this._target;
    var rate = (this._done === false) ?
        ((this._resultCounter - min + 1) / (max - min + 1)).toFixed(2) :
        ((this._target + this._result - min + 1) / (max - min + 1)).toFixed(2);

    this.drawGauge(x, y, width, rate, color1, color2);
    this.resetTextColor();
    this.drawText($dataTalents.text.talentCheckText, x, y, width * 0.7);

    if (this._view != "ASK") {
        // Handles the bar growth and refresh
        if (this._resultCounter.toFixed(2) < parseInt(this._target + this._result)) {
            this._resultCounter += $dataTalents.checkDefaults.talentBarIncrement;
            var self = this;
            setTimeout(function () {
                self.refresh();
            }, $dataTalents.checkDefaults.talentBarWait);
        }
        else {
            // Bar is done growing. Refresh one more time to draw the final results
            if ($dataTalents.style.showCheckNumbers) {
                this.drawText(this._target + this._result, width * 0.7, y, width * 0.3 - 5, 'right');
            }

            if (this._done === false) {
                this._done = true;
                this.refresh();
            }
            else {
                this._commandWindow._view = "NONE";
                this._commandWindow.refresh();
                this._commandWindow.activate();
                this._commandWindow.select(0);
            }
        }
    }
}

// Draw gauge
Window_TalentCheckResults.prototype.drawGauge = function (x, y, width, rate, color1, color2) {
    color1 = color1 || FROG.Core.badGaugeStartColor;
    color2 = color2 || FROG.Core.badGaugeEndColor;
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, $dataTalents.style.gaugeHeight || 15, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, $dataTalents.style.gaugeHeight || 15, color1, color2);
}

// Open talent check scene
FROG.Talents.openTalentCheckResults = function (options) {
    var o = options;
    var actor = $gameActors.actor(o.aid);
    if (actor) {
        $gameParty.setMenuActor(actor);
        SceneManager.push(Scene_TalentCheckResults);
        SceneManager.prepareNextScene(options);
    }
}

/* ---------------------------------------------------------------*\
                        Script Calls
\* -------------------------------------------------------------- */

/** Get the maximum number of ranks that can be currently applied to a skill by an actor
 * @param {object} actor - A Game_Actor object (required)
 * @returns {number} Returns the max ranks for the actor
 */
FROG.Talents.getMaxRanks = function (actor) {
    if (actor) {
        var max = $dataTalents.maxRanks;
        if ($dataTalents.maxType == "LEVEL") {
            max += actor._level;
        }
        return max;
    }
    return 0;
}

/** Get the highest Talent Score for an actor
 * @param {object} actor - A Game_Actor object (required)
 * @returns {number} Returns the max ranks for the actor
 */
FROG.Talents.getMaxScore = function (actor) {
    var self = this;
    var maxScore = 0;

    if (actor && actor._talents) {
        Object.keys(actor._talents).forEach(function(key, index) {
            //var talent = actor._talents[key];
            var score = self.getActorTalentScore(actor.actorId(), key);
            if (score > maxScore) {
                maxScore = score;
            }
        });
    }

    return maxScore;
}

/** This is just used to determine how the Talent Window gauge displays
 * @param {object} actor - A Game_Actor object (required)
 * @returns {number} Returns the max ranks for the actor
 */
FROG.Talents.getMaxGauge = function (actor) {
    var self = this;
    var maxGauge = 0;

    if (actor && actor._talents) {
        Object.keys(actor._talents).forEach(function(key, index) {
            var talent = actor._talents[key];
            var maxRanks = self.getMaxRanks(actor);
            var ranks = self.getTalentRanks(actor.actorId(), key);
            var score = self.getActorTalentScore(actor.actorId(), key);
            var gauge = score + (maxRanks - ranks);

            if (gauge > maxGauge) {
                maxGauge = gauge;
            }
        });
    }

    return maxGauge;
}

/** Is an actor proficient with a talent
 * @param {number} actorId - The Id of an actor (required)
 * @param {string} abbr - The abbreviation used to identify a talent
 * @returns {boolean} Does the actor have proficiency with the talent
 */
FROG.Talents.isActorProficientWithTalent = function (actorId, abbr) {
    if (isNaN(actorId) === false && actorId > 0) {
        var actor = $gameActors.actor(actorId);
        if (actor && actor._talents && actor._talents[abbr]) {
            return actor._talents[abbr].prof || false;
        }
    }
    return false;
}

/** Get unspent talent points for a given actor
 * @param {number} actorId - The Id of an actor (required)
 * @returns {number} Return points remaining
 */
FROG.Talents.getTalentPoints = function (actorId) {
    if (isNaN(actorId) === false && actorId > 0) {
        var actor = $gameActors.actor(actorId);
        if (actor) {
            return actor._talentPoints || 0;
        }
    }

    return 0;
}

/** Gets the total talent points accumulated by the given actor
 * @param {number} actorId - The Id of an actor (required)
 * @returns {number} Returns the total number of points, spent and unspent
 */
FROG.Talents.getTotalTalentPoints = function (actorId) {
    var p = -1;
    if (isNaN(actorId) === false && actorId > 0) {
        var actor = $gameActors.actor(actorId);
        if (actor) {
            p = 0;
            Object.keys(actor._talents).forEach(function(key, index) {
                p += actor._talents[key].ranks || 0;
            });
            p += actor._talentPoints;
        }
    }
    return p;
}

/** Manually set the number of talent points for an actor
 * @param {number} actorId - The Id of an actor (required)
 * @param {number} points - The point total that the actor will be set to (required)
 * @returns {boolean} Returns true if the points were set correctly, false if this function was unable to
 */
FROG.Talents.setTalentPoints = function (actorId, points) {
    var bOk = false;
    if (isNaN(actorId) === false && actorId > 0 && isNaN(points) === false) {
        var actor = $gameActors.actor(actorId);
        if (actor) {
            actor._talentPoints = parseInt(points).clamp(0, 100000);
            bOk = true;
        }
    }
    return bOk;
}

/** Add a given number of talent points to an actor
 * @param {number} actorId - The Id of an actor (required)
 * @param {number} points - The number of points that will be added to the actor (required)
 * @returns {boolean} Returns true if the points were added correctly, false if this function was unable to
 */
FROG.Talents.addTalentPoints = function (actorId, points) {
    var bOk = false;
    if (isNaN(actorId) === false && actorId > 0 && isNaN(points) === false && parseInt(points) > 0) {
        var actor = $gameActors.actor(actorId);
        if (actor) {
            actor._talentPoints += parseInt(points);
            bOk = true;
        }
    }
    return bOk;
}

/** Remove a given number of talent points from an actor
 * @param {number} actorId - The Id of an actor (required)
 * @param {number} points - The number of points that will be subtracted from the actor (required)
 * @returns {boolean} Returns true if the points were removed correctly, false if this function was unable to
 */
FROG.Talents.removeTalentPoints = function (actorId, points) {
    var bOk = false;
    if (isNaN(actorId) === false && actorId > 0 && isNaN(points) === false && parseInt(points) > 0) {
        var actor = $gameActors.actor(actorId);
        if (actor) {
            actor._talentPoints -= parseInt(points);
            bOk = true;
        }
    }
    return bOk;
}

/** Set the number of ranks for a specific talent. This will overwrite any ranks the actor currently has.
 * @param {number} actorId - The Id of an actor (required)
 * @param {string} abbr - The abbreviation used to identify a talent (required)
 * @param {number} ranks - The number of ranks to set the actor to (required)
 * @returns {boolean} Returns true if the ranks were set correctly, false if this function was unable to
 */
FROG.Talents.setTalentRanks = function (actorId, abbr, ranks) {
    var bOk = false;

    if (isNaN(actorId) === false && actorId > 0 && isNaN(ranks) === false) {
        var actor = $gameActors.actor(actorId);
        if (actor && actor._talents && actor._talents[abbr]) {
            actor._talents[abbr].ranks = ranks.clamp(0, FROG.Talents.getMaxRanks(actor));
            bOk = true;
        }
    }

    return bOk;
}

/** Add a number of talent ranks to an actor
 * @param {number} actorId - The Id of an actor (required)
 * @param {string} abbr - The abbreviation used to identify a talent (required)
 * @param {number} ranks - The number of ranks to add (required)
 * @returns {boolean} Returns true if the ranks were added correctly, false if this function was unable to
 */
FROG.Talents.addTalentRanks = function (actorId, abbr, ranks) {
    var bOk = false;

    if (isNaN(actorId) === false && actorId > 0 && isNaN(ranks) === false && parseInt(ranks) > 0) {
        var actor = $gameActors.actor(actorId);
        if (actor && actor._talents && actor._talents[abbr]) {
            actor._talents[abbr].ranks += ranks;
            bOk = true;

            // Talent-based Traits
            if (Imported.FROG_LevelBasedTraitsTalent === true) {
                actor.addTalentTraits();
            }
        }
    }

    return bOk;
}

/** Remove a number of talent ranks from an actor
 * @param {number} actorId - The Id of an actor (required)
 * @param {string} abbr - The abbreviation used to identify a talent (required)
 * @param {number} ranks - The number of ranks to subtract (required)
 * @returns {boolean} Returns true if the ranks were removed correctly, false if this function was unable to
 */
FROG.Talents.removeTalentRanks = function (actorId, abbr, ranks) {
    var bOk = false;

    if (isNaN(actorId) === false && actorId > 0 && isNaN(ranks) === false && parseInt(ranks) > 0) {
        var actor = $gameActors.actor(actorId);
        if (actor && actor._talents && actor._talents[abbr]) {
            actor._talents[abbr].ranks -= ranks;
            bOk = true;

            // Talent-based Traits
            if (Imported.FROG_LevelBasedTraitsTalent === true) {
                actor.addTalentTraits();
            }
        }
    }

    return bOk;
}

/** Get the number of talent ranks an actor has
 * @param {number} actorId - The Id of an actor (required)
 * @param {string} abbr - The abbreviation used to identify a talent (required)
 * @returns {number} Returns the number of ranks an actor has or -1 if the call didn't work
 */
FROG.Talents.getTalentRanks = function (actorId, abbr) {
    if (isNaN(actorId) === false && actorId > 0) {
        var actor = $gameActors.actor(actorId);
        if (actor && actor._talents && actor._talents[abbr]) {
            return actor._talents[abbr].ranks || 0;
        }
    }

    return -1;
}

/** Get the talent score for a Game_Actor or Game_Enemy object. This is primarily used in formulas.
 * @param {object} object - An actor or enemy object (required)
 * @param {string} abbr - The abbreviation used to identify a talent (required)
 * @returns {number} Returns the talent score for an enemy
 */
FROG.Talents.getTalentScore = function (object, abbr) {
    var score = 0;
    if (object && object._talents) {
        if (object._actorId) {
            score = FROG.Talents.getActorTalentScore(object._actorId, abbr);
        }
        else if (object._enemyId) {
            score = FROG.Talents.getEnemyTalentScore(object._enemyId, abbr);
        }
    }
    return score;
}

/** Get the talent score for an actor. The score is the number of ranks plus any bonuses and penalties.
 * @param {number} actorId - The Id of an actor (required)
 * @param {string} abbr - The abbreviation used to identify a talent (required)
 * @returns {number} Returns the talent score for an actor or Decline Check Value if the call didn't work
 */
FROG.Talents.getActorTalentScore = function (actorId, abbr, pointsAdded) {
    pointsAdded = pointsAdded || {};
    var score = 0;

    if (isNaN(actorId) === false && actorId > 0) {
        var actor = $gameActors.actor(actorId);
        if (actor && actor._talents && actor._talents[abbr]) {
            var talent = actor._talents[abbr];
            score = talent.ranks || 0;
            score += pointsAdded["talent_" + abbr] || 0;

            // Can only use if actor has ranks or talent doesn't require training
            if (talent && (!talent.trained || score > 0)) {
                // Proficiency Bonus
                if (talent.prof === true) {
                    score += parseInt($dataTalents.proficiencyBonus) || 0;
                }

                // Actor Bonus/Penalty
                if (!FROG.Core.isEmpty($dataTalents.actorConfig)) {
                    var actorConfig = $dataTalents.actorConfig.filter(function (config) {
                        return config.actorId == actor.actorId();
                    })[0];

                    if (!FROG.Core.isEmpty(actorConfig) && actorConfig.talentBonusPenalty) {
                        for (var i=0; i<actorConfig.talentBonusPenalty.length; i++) {
                            var bonus = actorConfig.talentBonusPenalty[i];
                            if (!FROG.Core.isEmpty(bonus) && bonus.talentAbbreviation == abbr) {
                                score += bonus.bonusPenalty;
                            }
                        }
                    }
                }

                // Racial Bonus/Penalty
                if (Imported.FROG_Races === true && actor.raceId() > 0 && $dataRaces[actor.raceId()]) {
                    if (!FROG.Core.isEmpty($dataTalents.raceConfig)) {
                        var raceConfig = $dataTalents.raceConfig.filter(function (config) {
                            return config.raceId == actor.raceId();
                        })[0];

                        if (!FROG.Core.isEmpty(raceConfig) && raceConfig.talentBonusPenalty) {
                            for (var i=0; i<raceConfig.talentBonusPenalty.length; i++) {
                                var bonus = raceConfig.talentBonusPenalty[i];
                                if (!FROG.Core.isEmpty(bonus) && bonus.talentAbbreviation == abbr) {
                                    score += bonus.bonusPenalty;
                                }
                            }
                        }
                    }
                }

                // Equipment Bonus
                for (var i=0; i<actor._equips.length; i++) {
                    var equip = actor._equips[i];
                    if (equip && parseInt(equip._itemId) > 0) {
                        var item = null;
                        switch (equip._dataClass.toLowerCase()) {
                            case "weapon": item = $dataWeapons[equip._itemId]; break;
                            case "armor":  item = $dataArmors[equip._itemId];  break;
                        }
                        score += FROG.Core.extractMetaBonus(item, "TalentBonus", abbr);
                    }
                }

                // Item Bonuses
                Object.keys($gameParty._items).forEach(function(key, index) {
                    if ($gameParty._items[key] > 0) {
                        var item = $dataItems[key];
                        score += FROG.Core.extractMetaBonus(item, "TalentBonus", abbr);
                    }
                });

                // State Bonuses
                for (var i=0; i<actor._states.length; i++) {
                    var state = (parseInt(actor._states[i]) > 0) ? $dataStates[parseInt(actor._states[i])] : null;
                    score += FROG.Core.extractMetaBonus(state, "TalentBonus", abbr);
                }

                // Yanfly's Auto-passive States
                if (Imported.YEP_AutoPassiveStates) {
                    var passiveStates = actor.passiveStates();
                    for (var i=0; i<passiveStates.length; i++) {
                        var state = passiveStates[i];
                        score += FROG.Core.extractMetaBonus(state, "TalentBonus", abbr);
                    }
                }

                // Synergy Bonuses
                var talentConfig = $dataTalents.talentConfig.filter(function (config) {
                    return config.abbreviation == abbr;
                })[0];

                if (!FROG.Core.isEmpty(talentConfig) && !FROG.Core.isEmpty(talentConfig.synergyBonuses)) {
                    for (var i=0; i<talentConfig.synergyBonuses.length; i++) {
                        var synergy = talentConfig.synergyBonuses[i] || {};
                        if (!FROG.Core.isEmpty(synergy) && actor._talents[synergy.talentAbbreviation]) {
                            var rnks = actor._talents[synergy.talentAbbreviation].ranks + (pointsAdded["talent_" + synergy.talentAbbreviation] || 0);
                            if (rnks >= synergy.requiredRanks) {
                                score += synergy.bonus;
                            }
                        }
                    }
                }
            }
        }
    }

    return score;
}

/** Get the talent score for an enemy.
 * @param {number} enemyId - The Id of an enemy (required)
 * @param {string} abbr - The abbreviation used to identify a talent (required)
 * @returns {number} Returns the talent score for an enemy
 */
FROG.Talents.getEnemyTalentScore = function (enemyId, abbr) {
    for (var i=0; i<$dataTalents.enemyConfig.length; i++) {
        var config = $dataTalents.enemyConfig[i];
        if (config.enemyId == enemyId) {
            for (var j=0; j<config.enemyTalents.length; j++) {
                var talent = config.enemyTalents[j];
                if (talent.talentAbbreviation == abbr) {
                    return talent.score || 0;
                }
            }
        }
    }
    return 0;
}

/** Get the actor who has the best talent score
 * @param {string} abbr - The abbreviation used to identify a talent (required)
 * @returns {number} Returns the Id of the actor who has the best talent score
 */
FROG.Talents.getMostTalented = function (abbr) {
    var bestScore = -1;
    var actorId = 0;
    for (var i=0, j=$gameParty._actors.length; i<j; i++) {
        var actor = $gameActors._data[$gameParty._actors[i]];
        if (actor) {
            score = FROG.Talents.getActorTalentScore(actor.actorId(), abbr);
            if (score > bestScore) {
                bestScore = score;
                actorId = actor.actorId();
            }
        }
    }
    return actorId;
}

// Check history marked to remember and a clean method to keep the size down
FROG.Talents.rememberCheck = [];
FROG.Talents.cleanRemCheck = function () {
    var arr = FROG.Talents.rememberCheck.filter(function (item) {
        return item.aid == $gameActors._data[item.aid]._actorId && item.lvl == $gameActors._data[item.aid]._level;
    });
    FROG.Talents.rememberCheck = arr;
}

/** Processes the target number. Handles named Talent Checks as well.
 * @param {variant} target - Target Check name or value
 * @returns {number} Target Number value converted from its name if needed
 */
FROG.Talents.getTargetNumber = function (target) {
    var r = 0;
    if (isNaN(target) === true && $dataTalents.checkDefaults && $dataTalents.checkDefaults.namedChecks) {
        for (var i=0; i<$dataTalents.checkDefaults.namedChecks.length; i++) {
            var namedCheck = $dataTalents.checkDefaults.namedChecks[i];
            if (namedCheck.name == target) {
                r = parseInt(namedCheck.targetNumber) || 0;
                break;
            }
        }
    }
    else {
        r = parseInt(target) || 0;
    }
    return r;
}

/** Processes the modifier and returns the mod value. Handles named modifiers as well.
 * @param {variant} mod - Modifier name or value
 * @returns {number} Modifier value converted from its name if needed
 */
FROG.Talents.getModifier = function (mod) {
    var r = 0;
    if (isNaN(mod) === true) {
        var arrMod = (mod + ",").split(",");
        for (var i=0; i<arrMod.length; i++) {
            var modName = arrMod[i];
            if (modName && $dataTalents.checkDefaults && $dataTalents.checkDefaults.namedModifiers) {
                var modVal = $dataTalents.checkDefaults.namedModifiers.filter(function (mv) {
                    return mv.name == modName;
                })[0] || {};
                r += parseInt(modVal.modifier) || 0;
            }
        }
    }
    else {
        r = parseInt(mod) || 0;
    }
    return r;
}

/** Perform various types of talent checks
 * @param {object} options - The options object (required)
 * @param {number} options.var - The variable Id to store the result in (required if view is ask)
 * @param {string} options.type - The type of talent check
 * @param {number} options.aid - Actor Id performing the check or 0 for the most talented one (default best actor)
 * @param {string} options.abbr - The abbreviation of the talent being performed (required)
 * @param {number} options.target - The target number that needs to be matched or exceeded for success (default 0)
 * @param {number} options.mod - Modifier that's added to the talent score after the check is performed (default 0)
 * @param {number} options.dieRoll - Simulated die roll (default 20 as in d20)
 * @param {number} options.dieCount - Roll multiple dice for different probability curves (default 1)
 * @param {string} options.view - View mode that determines how the check is resolved visually
 *        NONE = Check happens in the back ground. The player doesn't even know it happened
 *        SHOW = Check happens immediately and the player is shown the Talent Check window
 *        ASK  = The player is shown the difficulty of the check and is asked if they want to attempt it
 * @param {string} options.rem - Retries of this check will return the same result until the character gains a level
 * @returns {number} Represents level of success or failure (0 = hit target, negative = failed by this much, positive = exceeded by this much)
*/
FROG.Talents.talentCheck = function (options) {
    var remResult = -1;
    var r = -999;
    var o = options;
    o.var = parseInt(o.var) || $dataTalents.checkDefaults.lastCheckVariable || 0;
    o.type = (o.type) ? o.type.toUpperCase() : $dataTalents.checkDefaults.rollType || "ROLL";
    o.aid = parseInt(o.aid) || 0;
    o.abbr = o.abbr || "";
    o.target = FROG.Talents.getTargetNumber(o.target) || 0;
    o.target += FROG.Talents.getModifier(o.mod) || 0;
    o.target = o.target.clamp(1, 9999);
    o.die = o.die || $dataTalents.checkDefaults.dieType || 20;
    o.die = parseInt(o.die.toString().replace("d", ""));
    o.dcount = parseInt(o.dcount) || $dataTalents.checkDefaults.dieCount || 1;
    o.view = (o.view) ? o.view.toUpperCase() : $dataTalents.checkDefaults.viewType || "ASK";
    o.rem = (o.rem) ? o.rem.toString() : "";

    if (typeof o.type == "string" && o.type.length > 0 && o.abbr) {
        // If actor id is 0, use the most talented actor for this check
        if (o.aid > 0) {
            var score = FROG.Talents.getActorTalentScore(o.aid, o.abbr);
        }
        else {
            o.aid = FROG.Talents.getMostTalented(o.abbr);
            var score = FROG.Talents.getActorTalentScore(o.aid, o.abbr);
        }

        var actor = $gameActors.actor(o.aid);
        var canPerform = (actor && actor._talents && actor._talents[o.abbr] && (!actor._talents[o.abbr].trained || actor._talents[o.abbr].ranks));

        switch (o.type) {
            // Compare max score + modifier to target number
            case "MAX":
                r = score - o.target;
                break;

            // Random 1 through max score, add modifier and compare to target number
            case "RND":
                o.die = 0;
                o.dCount = 0;
                var rnd = 0;
                //var actorLvl = $gameActors.actor(o.aid)._level;
                var actorLvl = actor._level;

                // See if this check has already been done
                if (o.rem) {
                    FROG.Talents.cleanRemCheck();
                    var arrRemChk = [];
                    for (var i=0, j=FROG.Talents.rememberCheck.length; i<j; i++) {
                        var remChk = FROG.Talents.rememberCheck[i];
                        if (remChk.id == o.rem && remChk.aid == o.aid && remChk.lvl == actorLvl) {
                            remResult = remChk.result;
                        }
                    }
                }

                if (remResult > -1) {
                    // Check result has already been made. Use it.
                    rnd = remResult;
                }
                else {
                    // Run check result
                    if (canPerform) {
                        rnd = Math.floor(Math.random() * score) + 1;
                    }
                }

                // Normalize Target Number
                if ($dataTalents.checkDefaults.normalizeTargetNumber === true) {
                    o.target = parseInt(o.target / 2);
                }
                r = rnd - o.target;

                // Remember Result
                if (o.rem && remResult === -1) {
                    FROG.Talents.rememberCheck.push({
                        id: o.rem,
                        aid: o.aid,
                        lvl: actorLvl,
                        result: rnd
                    });
                }
                break;

            // Roll dice, add your score and modifier, and compare to target number
            case "ROLL":
                var roll = 0;
                var actorLvl = actor._level;

                // See if this check has already been done
                if (o.rem) {
                    FROG.Talents.cleanRemCheck();
                    for (var i=0, j=FROG.Talents.rememberCheck.length; i<j; i++) {
                        var remChk = FROG.Talents.rememberCheck[i];
                        if (remChk.id == o.rem && remChk.aid == o.aid && remChk.lvl == actorLvl) {
                            remResult = remChk.result;
                        }
                    }
                }

                if (remResult > -1) {
                    // Check result has already been made. Use it.
                    score = remResult;
                }
                else if (canPerform) {
                    // Run check result
                    for (var i=0; i<o.dcount; i++) {
                        var rnd = Math.floor(Math.random() * o.die) + 1;
                        roll += rnd;
                    }
                }

                // Normalize Target Number
                if ($dataTalents.checkDefaults.normalizeTargetNumber === true) {
                    o.target = parseInt(o.target + Math.floor(((o.die / 2) + 0.5) * o.dcount));
                }
                r = roll + score - o.target;

                // Remember Result
                if (o.rem && remResult === -1) {
                    FROG.Talents.rememberCheck.push({
                        id: o.rem,
                        aid: o.aid,
                        lvl: actorLvl,
                        result: roll + score
                    });
                }
                break;

            // Min roll possible
            case "MINROLL":
                o.view = "NONE";
                r = (canPerform) ? o.dcount + score : 0 - o.target;
                break;

            // Max roll possible
            case "MAXROLL":
                o.view = "NONE";
                r = (canPerform) ? o.dcount * o.die + score : 0 - o.target;
                break;
        }

        if (o.view != "NONE") {
            o.result = r;
            switch (o.type) {
                case "MAX":
                case "RND":
                    o.min = 1;
                    //o.max = score + o.mod;
                    o.max = score;
                    break;

                case "ROLL":
                    var oMinMax = Object.assign({}, options);
                    oMinMax.type = "MINROLL";
                    o.min = FROG.Talents.talentCheck(oMinMax);
                    oMinMax.type = "MAXROLL";
                    o.max = FROG.Talents.talentCheck(oMinMax);
                    break;
            }
            this.openTalentCheckResults(options);
        }
    }

    // Set Last Check Variable
    if (o.var > 0) {
        $gameVariables.setValue(o.var, r);
    }

    // Set Actor Check Variable
    var actor = $gameActors.actor(o.aid);
    if (actor) {
        for (var i=0; i<$dataTalents.actorConfig.length; i++) {
            var config = $dataTalents.actorConfig[i];
            if (config.actorId = actor.actorId() && config.talentCheckVariable) {
                $gameVariables.setValue(config.talentCheckVariable, r);
                break;
            }
        }
    }

    return r;
}

/** Get a Target Number from an enemy based on their talent
 * @param {object} options - The options object (required)
 * @param {number} options.var - The variable Id to store the result in (required if view is ask)
 * @param {string} options.type - The type of talent check
 * @param {number} options.eid - Id of an enemy
 * @param {string} options.abbr - The abbreviation of the talent being performed (required)
 * @param {number} options.dieRoll - Simulated die roll (default 20 as in d20)
 * @param {number} options.dieCount - Roll multiple dice for different probability curves (default 1)
 * @returns {number} Represents level of success or failure (0 = hit target, negative = failed by this much, positive = exceeded by this much)
*/
FROG.Talents.enemyTargetNumber = function (options) {
    var r = -999;
    var o = options;
    o.var = parseInt(o.var) || $dataTalents.checkDefaults.targetNumberVariable || 0;
    o.type = (o.type) ? o.type.toUpperCase() : $dataTalents.checkDefaults.rollType || "ROLL";
    o.eid = parseInt(o.eid) || 0;
    o.abbr = o.abbr || "";
    o.die = o.die || $dataTalents.checkDefaults.dieType || 20;
    o.die = parseInt(o.die.toString().replace("d", ""));
    o.dcount = parseInt(o.dcount) || $dataTalents.checkDefaults.dieCount || 1;

    if (typeof o.type == "string" && o.type.length > 0 && o.abbr && o.eid > 0) {
        var score = FROG.Talents.getEnemyTalentScore(o.eid, o.abbr);
        if ($dataTalents.checkDefaults.normalizeTargetNumber === true) {
            r = score;
        }
        else {
            switch (o.type) {
                case "MAX":
                    r = score;
                    break;

                case "RND":
                    r = parseInt(score / 2);
                    break;

                case "ROLL":
                    r = score + Math.floor(((o.die / 2) + 0.5) * o.dcount);
                    break;
            }
        }
    }

    // Set Target Number Variable
    if (o.var > 0) {
        $gameVariables.setValue(o.var, r);
    }

    return r;
}

/** Set an actor's race
 * @param {number} actorId - The Id of an actor (required)
 * @param {number} race - The Race Id that you want to set (required)
 * @returns {string} Returns true if it worked, false if it didn't
 */
FROG.Talents.setRace = function (actorId, raceId) {
    if (!Imported.FROG_Races) return false;

    var bOk = false;
    if (isNaN(actorId) === false && actorId > 0 && raceId > 0) {
        var actor = $gameActors.actor(actorId);
        if (actor && $dataRaces && $dataRaces[actor.raceId()] && $dataRaces[actor.raceId()].talentConfig) {
            actor._talentPoints += $dataRaces[actor.raceId()].talentConfig.startingBonus;
            bOk = true;
        }
    }
    return bOk;
}

/* ---------------------------------------------------------------*\
                        Plugin Commands
\* -------------------------------------------------------------- */

/** Formats plugin parameters so that you can use variables in place of hard-coded values
 * @param {string} arg - A plugin parameter (required)
 * @returns {string} Returns the argument back but will convert any v[id] to the stored variable value
 */
FROG.Talents.formatArg = function (arg) {
    if (arg && arg.substr(0, 2) == "v[") {
        var varId = parseInt(arg.replace("v[", "").replace("]", ""));
        if (!isNaN(varId)) {
            return $gameVariables.value(varId);
        }
    }
    return arg;
}

// Add new plugin commands
FROG.Talents.Game_Interpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    FROG.Talents.Game_Interpreter_PluginCommand.call(this, command, args);

    if (command && args && args[0]) {
        if (['TALENT','TALENTS'].indexOf(command.trim().toUpperCase()) > -1) {
            var ft = FROG.Talents;
            var tcommand = ft.formatArg(args[0]).toUpperCase();
            var actorId = (args[1]) ? parseInt(ft.formatArg(args[1])) : 0;

            switch (tcommand) {
                case "OPEN":
                    SceneManager.push(Scene_Talents);
                    break;

                case "GETPOINTS":
                    var vid = parseInt(ft.formatArg(args[2]));
                    $gameVariables.setValue(vid, ft.getTalentPoints(actorId));
                    break;

                case "SETPOINTS":
                    var points = parseInt(ft.formatArg(args[2]));
                    ft.setTalentPoints(actorId, points);
                    break;

                case "ADDPOINTS":
                    var points = parseInt(ft.formatArg(args[2]));
                    ft.addTalentPoints(actorId, points);
                    break;

                case "REMOVEPOINTS":
                    var points = parseInt(ft.formatArg(args[2]));
                    ft.removeTalentPoints(actorId, points);
                    break;

                case "GETRANKS":
                    var abbr = ft.formatArg(args[2]);
                    var vid = parseInt(ft.formatArg(args[3]));
                    $gameVariables.setValue(vid, ft.getTalentRanks(actorId, abbr));
                    break;

                case "SETRANKS":
                    var abbr = ft.formatArg(args[2]);
                    var ranks = parseInt(ft.formatArg(args[3]));
                    ft.setTalentRanks(actorId, abbr, ranks);
                    break;

                case "ADDRANKS":
                    var abbr = ft.formatArg(args[2]);
                    var ranks = parseInt(ft.formatArg(args[3]));
                    ft.addTalentRanks(actorId, abbr, ranks);
                    break;

                case "REMOVERANKS":
                    var abbr = ft.formatArg(args[2]);
                    var ranks = parseInt(ft.formatArg(args[3]));
                    ft.removeTalentRanks(actorId, abbr, ranks);
                    break;

                case "ENEMYSCORE":
                    var enemyId = ft.formatArg(args[1]);
                    var abbr = ft.formatArg(args[2]);
                    var vid = parseInt(ft.formatArg(args[3]));
                    $gameVariables.setValue(vid, ft.getEnemyTalentScore(enemyId, abbr));
                    break;

                case "GETSCORE":
                    var abbr = ft.formatArg(args[2]);
                    var vid = parseInt(ft.formatArg(args[3]));
                    $gameVariables.setValue(vid, ft.getActorTalentScore(actorId, abbr));
                    break;

                case "GETBEST":
                    var abbr = ft.formatArg(args[1]);
                    var vid = parseInt(ft.formatArg(args[2]));
                    $gameVariables.setValue(vid, ft.getMostTalented(abbr));
                    break;

                case "CHECK":
                    var options = this.nameValueParams(args);
                    var vid = parseInt(options.var) || parseInt($dataTalents.checkDefaults.lastCheckVariable);
                    if (vid > 0) {
                        $gameVariables.setValue(options.var, ft.talentCheck(options));
                    }
                    else {
                        ft.talentCheck(options);
                    }
                    break;

                case "ENEMYTN":
                    var options = this.nameValueParams(args);
                    var vid = parseInt(options.var) || parseInt($dataTalents.checkDefaults.targetNumberVariable);
                    if (vid > 0) {
                        $gameVariables.setValue(vid, ft.enemyTargetNumber(options));
                    }
                    else {
                        ft.enemyTargetNumber(options);
                    }
                    break;
            }
        }
    }

    // arg[0] = actorId, arg[1] = raceId
    if (Imported.FROG_Races === true && $dataRaces) {
        if (command.trim().toUpperCase() === 'SETRACE' && args[0] && args[1]) {
            FROG.Talents.setRace(args[0], args[1]);
        }
    }
}


/* ---------------------------------------------------------------*\
                        Talent Requirements
\* -------------------------------------------------------------- */

// Weapons and Armor are not equipable if the actor doesn't have enough talent ranks
FROG.Talents.Window_EquipItem_Includes = Window_EquipItem.prototype.includes;
Window_EquipItem.prototype.includes = function (item) {
    var bOk = FROG.Talents.Window_EquipItem_Includes.call(this, item);

    if (bOk === true && item && this._actor) {
        var talentReq = (item.meta && item.meta.TalentReq) ? item.meta.TalentReq.trim() : "";

        if (talentReq && talentReq.indexOf(' ') > -1) {
            for (var i=0; i<4; i++) talentReq = talentReq.replace('  ', ' ');
            var arr = talentReq.split(' ');

            if (arr.length >= 3) {
                var abbr = arr[0].trim();
                var reqType = arr[1].toLowerCase().trim();
                var requiredRanks = parseInt(arr[2].trim());
                var actorRanks = (reqType == "rank" || reqType == "ranks") ?
                    FROG.Talents.getTalentRanks(this._actor.actorId(), abbr) :
                    FROG.Talents.getActorTalentScore(this._actor.actorId(), abbr);

                if (actorRanks < requiredRanks) {
                    bOk = false;
                }
            }
        }
    }

    return bOk;
}

// Prevents item use on characters who can't receive them in battle
FROG.Talents.Game_Action_TestApply = Game_Action.prototype.testApply;
Game_Action.prototype.testApply = function (target) {
    var bOk = FROG.Talents.Game_Action_TestApply.call(this, target);

    if (this._item && target) {
        var dataClass = this._item._dataClass || "";
        var itemId = this._item._itemId || 0;

        if (dataClass == "item" && itemId > 0) {
            var item = $dataItems[itemId];
            bOk = FROG.Talents.canReceiveItem([target], item);
        }
    }

    return bOk;
}

// Prevents item use on characters who can't receive them outside of battle
FROG.Talents.Scene_ItemBase_CanUse = Scene_ItemBase.prototype.canUse;
Scene_ItemBase.prototype.canUse = function () {
    var bOk = FROG.Talents.Scene_ItemBase_CanUse.call(this);
    var item = this.item();
    var targets = this.itemTargetActors();

    if (bOk === true && item && targets) {
        bOk = FROG.Talents.canReceiveItem(targets, item);
    }

    return bOk;
}

// Prevents item use on characters who can't receive them
FROG.Talents.canReceiveItem = function (targets, item) {
    var bOk = true;
    var talentReq = (item.meta && item.meta.TalentReqGet) ? item.meta.TalentReqGet.trim() : "";

    if (talentReq && talentReq.indexOf(' ') > -1) {
        for (var i=0; i<4; i++) talentReq = talentReq.replace('  ', ' ');
        var arr = talentReq.split(' ');

        if (arr.length >= 3) {
            for (var i=0; i<targets.length; i++) {
                var actor = targets[i];

                if (actor) {
                    var abbr = arr[0].trim();
                    var reqType = arr[1].toLowerCase().trim();
                    var requiredRanks = parseInt(arr[2].trim());
                    var actorRanks = (reqType == "rank" || reqType == "ranks") ?
                        FROG.Talents.getTalentRanks(actor.actorId(), abbr) :
                        FROG.Talents.getActorTalentScore(actor.actorId(), abbr);

                    if (actorRanks < requiredRanks) {
                        bOk = false;
                    }
                }
            }
        }
    }

    return bOk;
}

/** Find the actor that meets the talent rank or score requirment and has the highest Pharmacology
 * @param {string} abbr - The abbreviation used to identify a talent (required)
 * @param {string} reqType - Indicates whether the actor need a certain Rank or Score (required)
 * @param {number} requiredVal - The string value that indicated the actor's race (required)
 * @returns {object} Returns the Game_Actor object of the actor with the best Pharm and enough ranks or score
 */
Game_BattlerBase.prototype.bestPharm = function (abbr, reqType, requiredVal) {
    var members = $gameParty.movableMembers();
    var bestActor = members[0];
    var bestPha = 0;

    for (var i=0; i<members.length; i++) {
        var actor = members[i];
        var actorVal = (reqType == "rank" || reqType == "ranks") ?
            FROG.Talents.getTalentRanks(actor.actorId(), abbr) :
            FROG.Talents.getActorTalentScore(actor.actorId(), abbr);

        if (actorVal >= requiredVal && actor.pha > bestPha) {
            bestPha = actor.pha;
            bestActor = actor;
        }
    }

    return bestActor;
}

// Check to see if actor has enough talent ranks to use this item on themselves or another party member
FROG.Talents.Game_BattlerBase_MeetsUsableItemConditions = Game_BattlerBase.prototype.meetsUsableItemConditions;
Game_BattlerBase.prototype.meetsUsableItemConditions = function (item) {
    var bOk = FROG.Talents.Game_BattlerBase_MeetsUsableItemConditions.call(this, item);
    if ($gameParty.inBattle() === true && !BattleManager.actor()) return bOk;
    var actor = this;

    if (bOk === true && item && actor) {
        var talentReq = (item.meta && item.meta.TalentReqGive) ? item.meta.TalentReqGive.trim() : "";

        if (talentReq && talentReq.indexOf(' ') > -1) {
            for (var i=0; i<4; i++) talentReq = talentReq.replace('  ', ' ');
            var arr = talentReq.split(' ');

            if (arr.length >= 3) {
                var abbr = arr[0].trim();
                var reqType = arr[1].toLowerCase().trim();
                var requiredRanks = parseInt(arr[2].trim());

                if ($gameParty.inBattle() === false) {
                    // Find best actor to use this item if not in battle
                    actor = actor.bestPharm(abbr, reqType, requiredRanks);
                }
                else {
                    // Check to see if actor can use this item while in battle
                    actor = BattleManager.actor();
                }

                var actorRanks = (reqType == "rank" || reqType == "ranks") ?
                    FROG.Talents.getTalentRanks(actor.actorId(), abbr) :
                    FROG.Talents.getActorTalentScore(actor.actorId(), abbr);

                if (actorRanks < requiredRanks) {
                    bOk = false;
                }
            }
        }
    }

    return bOk;
}

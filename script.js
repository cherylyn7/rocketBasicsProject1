/*
How many hours did you spend on this assignment?:
Around 8 hours
What part of the assignment did you spend the most time on?:
Initially it was debugging, but once that was sorted then I spent a lot of time on the UIUX like the scripts/narratives and also edited the HTML along with the javascript.
How comfortable did you feel with this assignment? (1-5):
3
Is there anything in this code that you feel pleased about?:
I really like how it looks, and how I worked with both the javascript and HTML to work together.
What's one aspect of your code you would like specific, elaborate feedback on?: Whether the logic makes sense, and if there are certain areas/tips and tricks that I can use to make the code more elegant.
*/

//The user can choose at the beginning whether to play the basic version of scissors paper stone or the Korean version (Muk Jji Ppa)
//Basic Version Win conditions:
// The user will input 1 of 3 options: Scissors, Paper, or Stone
// The program will generate 1 of 3 options: Scissors, Paper, or Stone
// Win scenario 1: User chooses Scissors, Program chooses Paper OR User chooses Paper, Program chooses Stone OR User chooses Stone, Program chooses Scissors
// Lose scenario 1: User chooses Scissors, Program chooses Stone OR User chooses Paper, Program chooses Scissors OR User chooses Stone, Program chooses Paper
// Tie scenario 1: User chooses Scissors, Program chooses Scissors OR user chooses Paper, Program chooses Paper OR User chooses Stone, Program chooses stone
// Korean Version Win conditions:
// Winning state is only invoked when both players encounter a tie scenario. Whoever won in the round before having tied will be declared the winner.

// Win-Loss Records
var playerWins = 0;
var playerLosses = 0;
var playerTies = 0;
var koreanRounds = 0; //Total rounds played in the Korean version
var totalGames = 0; //Total rounds played in the basic version, or total showdowns entered in the Korean version.
var progWins = 0;
var progLosses = 0;
var progTies = 0;

// Helper Functions
var randomOption = function () {
  return Math.ceil(Math.random() * 3);
};

var playerWinPercentage = function () {
  return ((playerWins / totalGames) * 100).toFixed(2);
};

var progWinPercentage = function () {
  return ((progWins / totalGames) * 100).toFixed(2);
};

//Initial Game State
var gameState = `enterYourName`;
var userName = `pendingName`;
var koreanGameMode = `gameStart`;

console.log(`gameState`, gameState);
console.log(`userName`, userName);
console.log(`koreanGameMode`, koreanGameMode);

// Main Function
var main = function (input) {
  input = input.toLowerCase();
  var myOutputValue = ``;
  var progChoice = ``;
  var gameOption = randomOption();

  if (input == `restart`) {
    location.reload(input);
  }

  if (gameOption == 1) {
    progChoice = `scissors`;
  }
  if (gameOption == 2) {
    progChoice = `paper`;
  }
  if (gameOption == 3) {
    progChoice = `stone`;
  }
  console.log(`progChoice`, progChoice);

  // Initial state of input field where user should key in his name
  if (
    gameState == `enterYourName` &&
    (input == `` ||
      input == `scissors` ||
      input == `scissors✂️` ||
      input == `scissors ✂️` ||
      input == `✂️` ||
      input == `paper` ||
      input == `paper🧾` ||
      input == `paper 🧾` ||
      input == `🧾` ||
      input == `stone` ||
      input == `stone💎` ||
      input == `stone 💎` ||
      input == `💎` ||
      input == `basic` ||
      input == `korean`)
  ) {
    console.log(`gameState`, gameState);
    myOutputValue = `Tell me your name first!`;
    return myOutputValue;
  }

  if (gameState == `enterYourName` && input != ``) {
    gameState = `readyToPlay`;
    console.log(`gameState`, gameState);
    userName = input.toUpperCase();
    console.log(`userName`, userName);
    myOutputValue = `Hi <b>${userName}</b>, let's play the game!<br>
    <br>
    Tell me, are you itching to play 묵찌빠 (Muk Jji Ppa), the <b>Korean</b> version of Scissors, Paper, Stone? Or satisfied with just the <b>basic</b> version today?<br>
    <br>
    You can check out the rules for both versions by clicking on the buttons above the gameplay area.<br>
    <br>
    Type '<b>Korean</b>' or '<b>Basic</b>' and we'll get the game ready for you.`;
    return myOutputValue;
  }

  // Change in game state to Basic or Korean depending on user input.
  if (gameState == `readyToPlay`) {
    if (input == `basic`) {
      gameState = `readyToPlayBasic`;
      console.log(`gameState`, gameState);
      myOutputValue = `Okay <b>${userName}</b>, let's play the basic version! <br>
      <br>
      We might call it basic but we know how heated it can get anyway.🤪<br>
      <br>
      If you are unfamiliar with the rules or just need to refresh your memory before playing, just click on the 'Rules for Basic Version' button above the gameplay area.</b><br>
      <br>
      Don't worry, you'll also be able to refer to it anytime during your game!<br>
      <br>
      You got all that? Alright enough small talk, choose your first hand to play!<br>
      <br>
      <b>Do you choose Scissors✂️, Paper🧾, or Stone💎?</b>`;
      return myOutputValue;
    }

    if (input == `korean`) {
      gameState = `readyToPlayKorean`;
      console.log(`gameState`, gameState);
      myOutputValue = `진짜?! Alright <b>${userName}</b>, let's play the Korean version <b>묵찌빠 (Muk Jji Ppa)</b>!<br>
      <br>
      I hope this game won't get Seoul heated.🤪<br>
      <br>
      If you are unfamiliar with this version or need to refresh your memory before playing, just click on the 'Rules for Korean Version' button above the gameplay area.</b><br>
      <br>
      Don't worry, you'll also be able to refer to it anytime during your game!<br>
      <br>
      You got all that?<br>
      Alright enough small talk, choose your first hand to play!<br>
      <br>
      <b>Do you choose Scissors✂️, Paper🧾, or Stone💎? <br><br>아자! (Let's go)! </b>`;
      return myOutputValue;
    }

    if (input != `basic` && input != `korean`) {
      console.log(`gameState`, gameState);
      myOutputValue = `Sorry <b>${userName}</b>, I didn't get that.😕 Do you want to play the <b>Basic</b> version or 묵찌빠 (Muk Jji Ppa), the <b>Korean</b> version of Scissors, Paper, Stone?`;
      return myOutputValue;
    }
  }

  // If the user has selected the Basic version of Scissors, Paper, Stone:
  if (gameState == `readyToPlayBasic`) {
    console.log(`gameState`, gameState);

    // Input validation: If user keys in anything other than Scissors, Paper, or Stone
    if (input != `scissors` && input != `paper` && input != `stone`) {
      myOutputValue = `Sorry <b>${userName}</b>, please enter one of these options only: Scissors, Paper, or Stone.`;
      return myOutputValue;
    }

    // Tie Scenarios
    if (input == progChoice) {
      playerWins = playerWins + 0;
      playerLosses = playerLosses + 0;
      playerTies = playerTies + 1;
      totalGames = totalGames + 1;
      progWins = progWins + 0;
      progLosses = progLosses + 0;
      progTies = progTies + 1;
      myOutputValue = `Looks like...<br>
      .<br>
      .<br>
      ↪️*whirring noises*↩️<br>
      .<br>
      .<br>
      YOU AND THE COMPUTER PLAYED THE SAME HAND!🙀<br>
      <br>
      <u><b>RESULTS</b></u><br>
      You <b>tied</b>😝<br><br>Let's try harder to break the deadlock in the next round!<br>
      <br>
      <u><b>HANDS PLAYED</b></u><br>
      Both you and the program chose <i>${input}</i>.<br>
      <br>
      <b><u>${userName}'S WIN-LOSS RECORD:</u></b><br>
      Your current win percentage is ${playerWinPercentage()}%<br>
      while the program's is ${progWinPercentage()}%. <br>
      <br>
      <b>Total Games Played:</b> ${totalGames}<br><b>Your Wins:</b> ${playerWins}<br><b>Your Losses:</b> ${playerLosses}<br><b>Ties:</b> ${playerTies}`;
      return myOutputValue;
    }

    // Win Scenarios
    if (
      (input == `scissors` && progChoice == `paper`) ||
      (input == `paper` && progChoice == `stone`) ||
      (input == `stone` && progChoice == `scissors`)
    ) {
      playerWins = playerWins + 1;
      playerLosses = playerLosses + 0;
      playerTies = playerTies + 0;
      totalGames = totalGames + 1;
      progWins = progWins + 0;
      progLosses = progLosses + 1;
      progTies = progTies + 0;
      myOutputValue = `Looks like...<br>
      .<br>
      .<br>
      ↪️*whirring noises*↩️<br>
      .<br>
      .<br>
      YOU AND THE COMPUTER PLAYED DIFFERENT HANDS!🙀<br>
      <br>
      <u><b>RESULTS</b></u><br>
      You <b>won!</b>😀Woooohooooo! Feels awesome, doesn't it?<br>
      <br>
      <u><b>HANDS PLAYED</b></u><br>
      You chose <i>${input}</i> and the computer chose <i>${progChoice}</i>.<br>
      <br>
      <b><u>${userName}'S WIN-LOSS RECORD</u></b><br>
      Your current win percentage is ${playerWinPercentage()}%<br>
      while the program's is ${progWinPercentage()}%.<br>
      <br>
      <b>Total Games Played:</b> ${totalGames}<br>
      <b>Your Wins:</b> ${playerWins}<br>
      <b>Your Losses:</b> ${playerLosses}<br>
      <b>Ties:</b> ${playerTies}`;
      return myOutputValue;
    }

    // Lose Scenarios
    if (
      (input == `scissors` && progChoice == `stone`) ||
      (input == `paper` && progChoice == `scissors`) ||
      (input == `stone` && progChoice == `paper`)
    ) {
      playerWins = playerWins + 0;
      playerLosses = playerLosses + 1;
      playerTies = playerTies + 0;
      totalGames = totalGames + 1;
      progWins = progWins + 1;
      progLosses = progLosses + 0;
      progTies = progTies + 0;
      myOutputValue = `Looks like...<br>
      .<br>
      .<br>
      ↪️*whirring noises*↩️<br>
      .<br>
      .<br>
      YOU AND THE COMPUTER PLAYED DIFFERENT HANDS!🙀<br>
      <br>
      <u><b>RESULTS</b></u><br>
      You <b>lost!</b>😢 It's okay! Chin up buttercup and let's try again!<br>
      <br>
      <u><b>HANDS PLAYED</b></u><br>
      You chose <i>${input}</i> and the computer chose <i>${progChoice}</i>.<br>
      <br>
      <b><u>${userName}'S WIN-LOSS RECORD</u></b><br>
      Your current win percentage is ${playerWinPercentage()}%<br>
      while the program's is ${progWinPercentage()}%. <br>
      <br>
      <b>Total Games Played:</b> ${totalGames}<br>
      <b>Your Wins:</b> ${playerWins}<br><b>Your Losses:</b> ${playerLosses}<br>
      <b>Ties:</b> ${playerTies}`;
      return myOutputValue;
    }
  }

  //Update code for Korean version of Scissors, Paper, Stone
  if (gameState == `readyToPlayKorean`) {
    // Input validation: If user keys in anything other than Scissors, Paper, or Stone
    if (input != `scissors` && input != `paper` && input != `stone`) {
      myOutputValue = `Sorry <b>${userName}</b>, please enter one of these options only: Scissors, Paper, or Stone.`;
      return myOutputValue;
    }

    // Determining The Win
    // A win can only be determined when both sides are in a round where they tie.
    //3 possible outcomes:
    //1) Tied with no prior winner/loser which could be in the first game or multiple tiegames at the start
    //2) Player won a round prior to having tied and has invoked the winning condition, thus player wins the tie round
    //3) Computer won a round prior to tied and has invoked the losing condition, thus player loses the tie round

    //Tie Scenario 1) Tied with no prior winner/loser which could be in the first game or multiple tie games at the start
    if (input == progChoice && koreanGameMode == `gameStart`) {
      playerWins = playerWins + 0;
      playerLosses = playerLosses + 0;
      playerTies = playerTies + 1;
      koreanRounds = koreanRounds + 1;
      totalGames = totalGames + 1;
      progWins = progWins + 0;
      progLosses = progLosses + 0;
      progTies = progTies + 1;

      myOutputValue = `<b>YOU TIE AND ENTER A SHOWDOWN WAR!!!</b> 🙀<br>
      ${userName} 화이팅(Hwaiting)!!!<br>
      .<br>
      .<br>
      .<br>
      .<br>
      <u><b>RESULTS</b></u><br>
      Since there is no prior round with a winner, nobody gains a point... <i>yet.</i><br>
      <br>
      <u><b>HANDS PLAYED</b></u><br>
      Both you and the program chose <i>${input}</i>.<br>
      <br>
      Let's work harder for the next round! 화이팅(Hwaiting)!!!<br>
      <br>
      <b><u>${userName}'S WIN-LOSS RECORD:</u></b><br>
      Win percentages are calculated based on the total showdown wars and their results.<br>
      Your current win percentage is ${playerWinPercentage()}%<br>
      while the program's is ${progWinPercentage()}%. <br>
      <br>
      <b>Total Rounds Played:</b> ${koreanRounds}<br>
      <b>Total Showdown Wars:</b> ${totalGames}<br>
      <b>Your Wins:</b> ${playerWins}<br>
      <b>Your Losses:</b> ${playerLosses}<br>
      <b>Ties:</b> ${playerTies}`;
      return myOutputValue;
    }

    // Tie Scenario 2) Player won a round prior to tieing and has invoked the winning condition, thus player wins the tied round
    if (input == progChoice && koreanGameMode == `winCondition`) {
      playerWins = playerWins + 1;
      playerLosses = playerLosses + 0;
      playerTies = playerTies + 0;
      koreanRounds = koreanRounds + 1;
      totalGames = totalGames + 1;
      progWins = progWins + 0;
      progLosses = progLosses + 1;
      progTies = progTies + 0;

      myOutputValue = `<b>YOU TIE AND ENTER A SHOWDOWN WAR!!!</b> 🙀<br>
      ${userName} 화이팅(Hwaiting)!!!<br>
      .<br>
      .<br>
      .<br>
      .<br>
      <u><b>RESULTS</b></u><br>
      Since you won in the latest round before the tie, you have <b>won this war</b> and gain a point! <br>
      <br>
      Woohoo! 화이팅(Hwaiting)!!!<br>
      <br>
      <u><b>HANDS PLAYED</b></u><br>
      Both you and the program chose <i>${input}</i>.<br>
      <br>
      Let's continue fighting in the next round! 화이팅(Hwaiting)!!!<br>
      <br>
      <b><u>${userName}'S WIN-LOSS RECORD:</u></b><br>
      Win percentages are calculated based on the total showdown wars and their results.<br>
      Your current win percentage is ${playerWinPercentage()}%<br>
      while the program's is ${progWinPercentage()}%. <br>
      <br>
      <b>Total Rounds Played:</b> ${koreanRounds}<br>
      <b>Total Showdown Wars:</b> ${totalGames}<br>
      <b>Your Wins:</b> ${playerWins}<br>
      <b>Your Losses:</b> ${playerLosses}<br>
      <b>Ties:</b> ${playerTies}`;
      return myOutputValue;
    }

    //Tie Scenario 3) Computer won a round prior to tieing and has invoked the losing condition, thus player loses the tied round
    if (input == progChoice && koreanGameMode == `loseCondition`) {
      playerWins = playerWins + 0;
      playerLosses = playerLosses + 1;
      playerTies = playerTies + 0;
      koreanRounds = koreanRounds + 1;
      totalGames = totalGames + 1;
      progWins = progWins + 1;
      progLosses = progLosses + 0;
      progTies = progTies + 0;

      myOutputValue = `<b>YOU TIE AND ENTER A SHOWDOWN WAR!!!</b> 🙀<br>
      ${userName} 화이팅(Hwaiting)!!!<br>
      .<br>
      .<br>
      .<br>
      .<br>
      <u><b>RESULTS</b></u><br>
      Since you lost in the latest round before the tie, you have <b>lost this war</b> and the computer gains a point!<br>
      <br>
      <u><b>HANDS PLAYED</b></u><br>
      Both you and the program chose <i>${input}</i>.<br>
      <br>
      Let's work harder for the next round! 화이팅(Hwaiting)!!!<br>
      <br>
      <b><u>${userName}'S WIN-LOSS RECORD:</u></b><br>
      Win percentages are calculated based on the total showdown wars and their results.<br>
      Your current win percentage is ${playerWinPercentage()}%<br>
      while the program's is ${progWinPercentage()}%. <br>
      <br>
      <b>Total Rounds Played:</b> ${koreanRounds}<br>
      <b>Total Showdown Wars:</b> ${totalGames}<br>
      <b>Your Wins:</b> ${playerWins}<br>
      <b>Your Losses:</b> ${playerLosses}<br>
      <b>Ties:</b> ${playerTies}`;

      return myOutputValue;
    }

    // Obtaining Player Win Condition
    if (
      (input == `scissors` && progChoice == `paper`) ||
      (input == `paper` && progChoice == `stone`) ||
      (input == `stone` && progChoice == `scissors`)
    ) {
      playerWins = playerWins + 0;
      playerLosses = playerLosses + 0;
      playerTies = playerTies + 0;
      koreanRounds = koreanRounds + 1;
      totalGames = totalGames + 0;
      progWins = progWins + 0;
      progLosses = progLosses + 0;
      progTies = progTies + 0;
      koreanGameMode = `winCondition`;

      if (totalGames >= 1) {
        myOutputValue = `<b>YOU AND THE COMPUTER PLAYED DIFFERENT HANDS 🙀</b><br>
        ${userName} 화이팅(Hwaiting)!!!<br>
        .<br>
        .<br>
        ↪️*whirring noises*↩️<br>
        .<br>
        .<br>
        <u><b>RESULTS</b></u><br>
        You won this battle! But will you win the war?</b>😀 <br>
        <br>
        If you tie with the computer in the next round before they can steal a win back, you'll have won a point!<br>
        <br>
        <u><b>HANDS PLAYED</b></u><br>
        This round, you chose <i>${input}</i> and the computer chose <i>${progChoice}</i><br>
        <br>
        Wishing you good luck to enter a SHOWDOWN WAR soon! 화이팅(Hwaiting)!!!<br>
        <br>
        <b><u>${userName}'S WIN-LOSS RECORD:</u></b><br>
        Win percentages are calculated based on the total showdown wars and their results.<br>
        Your current win percentage is ${playerWinPercentage()}%<br>
        while the program's is ${progWinPercentage()}%. <br>
        <br>
        <b>Total Rounds Played:</b> ${koreanRounds}<br>
        <b>Total Showdown Wars:</b> ${totalGames}<br>
        <b>Your Wins:</b> ${playerWins}<br>
        <b>Your Losses:</b> ${playerLosses}<br>
        <b>Ties:</b> ${playerTies}`;
        return myOutputValue;
      }

      if (totalGames < 1) {
        myOutputValue = `<b>YOU AND THE COMPUTER PLAYED DIFFERENT HANDS 🙀</b><br>
        ${userName} 화이팅(Hwaiting)!!!<br>
        .<br>
        .<br>
        ↪️*whirring noises*↩️<br>
        .<br>
        .<br>
        <u><b>RESULTS</b></u><br>
        You won this battle! But will you win the war?</b>😀 <br>
        <br>
        If you tie with the computer in the next round before they can steal a win back, you'll have won a point!<br>
        <br>
        <u><b>HANDS PLAYED</b></u><br>
        This round, you chose <i>${input}</i> and the computer chose <i>${progChoice}</i><br>
        <br>
        Wishing you good luck to enter a SHOWDOWN WAR soon! 화이팅(Hwaiting)!!!<br>
        <br>
        <b><u>${userName}'S WIN-LOSS RECORD:</u></b><br>
        Win percentages are calculated based on the total showdown wars and their results.<br>
        Since you haven't entered any SHOWDOWN WARS yet, there is no win percentage calculated for now.<br>
        <br>
        <b>Total Rounds Played:</b> ${koreanRounds}<br>
        <b>Total Showdown Wars:</b> ${totalGames}<br>
        <b>Your Wins:</b> ${playerWins}<br>
        <b>Your Losses:</b> ${playerLosses}<br>
        <b>Ties:</b> ${playerTies}`;
        return myOutputValue;
      }
    }

    // Obtaining Computer Win Condition
    if (
      (input == `scissors` && progChoice == `stone`) ||
      (input == `paper` && progChoice == `scissors`) ||
      (input == `stone` && progChoice == `paper`)
    ) {
      playerWins = playerWins + 0;
      playerLosses = playerLosses + 0;
      playerTies = playerTies + 0;
      koreanRounds = koreanRounds + 1;
      totalGames = totalGames + 0;
      progWins = progWins + 0;
      progLosses = progLosses + 0;
      progTies = progTies + 0;
      koreanGameMode = `loseCondition`;

      if (totalGames >= 1) {
        myOutputValue = `<b>YOU AND THE COMPUTER PLAYED DIFFERENT HANDS 🙀</b><br>
        ${userName} 화이팅(Hwaiting)!!!<br>
        .<br>
        .<br>
        ↪️*whirring noises*↩️<br>
        .<br>
        .<br>
        <u><b>RESULTS</b></u><br>
        You lost this battle!😢 But you might not lose the war!</b><br>
        Don't worry, you haven't lost a point yet.<br>
        Let's try and steal the round back before we enter the SHOWDOWN WAR!<br>
        <br>
        <u><b>HANDS PLAYED</b></u><br>
        This round, you chose <i>${input}</i> and the computer chose <i>${progChoice}</i><br>
        <br>
        Wishing you good luck to turn the tide before the next SHOWDOWN WAR! 화이팅(Hwaiting)!!!<br>
        <br>
        <b><u>${userName}'S WIN-LOSS RECORD:</u></b><br>
        Win percentages are calculated based on the total showdown wars and their results.<br>
        Your current win percentage is ${playerWinPercentage()}%<br>
        while the program's is ${progWinPercentage()}%. <br>
        <br>
        <b>Total Rounds Played:</b> ${koreanRounds}<br>
        <b>Total Showdown Wars:</b> ${totalGames}<br>
        <b>Your Wins:</b> ${playerWins}<br>
        <b>Your Losses:</b> ${playerLosses}<br>
        <b>Ties:</b> ${playerTies}`;
        return myOutputValue;
      }

      if (totalGames < 1) {
        myOutputValue = `<b>YOU AND THE COMPUTER PLAYED DIFFERENT HANDS 🙀</b><br>
        ${userName} 화이팅(Hwaiting)!!!<br>
        .<br>
        .<br>
        ↪️*whirring noises*↩️<br>
        .<br>
        .<br>
        <u><b>RESULTS</b></u><br>
        You lost this battle!😢 But you might not lose the war!</b><br>
        Don't worry, you haven't lost a point yet.<br>
        Let's try and steal the round back before we enter the SHOWDOWN WAR!<br>
        <br>
        <u><b>HANDS PLAYED</b></u><br>
        This round, you chose <i>${input}</i> and the computer chose <i>${progChoice}</i><br>
        <br>
        Wishing you good luck to turn the tide before the next SHOWDOWN WAR! 화이팅(Hwaiting)!!!<br>
        <br>
        <b><u>${userName}'S WIN-LOSS RECORD:</u></b><br>
        Win percentages are calculated based on the total showdown wars and their results.<br>
        Since you haven't entered any SHOWDOWN WARS yet, there is no win percentage calculated for now.<br>
        <br>
        <b>Total Rounds Played:</b> ${koreanRounds}<br>
        <b>Total Showdown Wars:</b> ${totalGames}<br>
        <b>Your Wins:</b> ${playerWins}<br>
        <b>Your Losses:</b> ${playerLosses}<br>
        <b>Ties:</b> ${playerTies}`;
        return myOutputValue;
      }
    }
  }
};

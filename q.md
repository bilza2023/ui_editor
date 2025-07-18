

Lets stream line my 3 apps which are my production pipe line


1: worshop: -->off line, accept deck in deckbuilder fomrat .js and then convert into .json after checking.   
2: editor : this is where we upload the .json file and then add timings and then download as json.uses sqlite. this is where we need to test , diagnose it  ---> i suppose 
3: ui: this consums final .json uploaded in static , uses sqlite for users.


  Content Creation Pipe Line


   1: workshop: Creating main 3 content types: Reserch results into 
   
     - deck  (deck builder format .js)
     - images
     - narration
    ** The .js deck , images and narration reach workshop 
   
   2: Editor:

     - the . json is  uploaded to editor
     - we set timings at deck and tag it as "timed".
     - then we down load in bulk (only the times decks)

  3: ui: The .json are uploaded to ui


Main problem : 
 i need to upload images and narrations to workshop  then to editor and finally to ui. this is a major problem - 

 

const bodyParser = require('body-parser');
const { title } = require('process');
const { callbackify } = require('util');

const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    fs = require('fs'),  
    path = require('path'),
    uuid = require('uuid');
app.use(bodyParser.json());

let users =[{
    id: 1,
    name: 'george',
    favoriteMovies: ['Guardians of the Galaxy']
},
{
    id: 2,
    name: 'Jeff',
    favoriteMovies: []
}
]

let topMovies = [
    {
        title: 'The Boondock Saints',
        director: 'Troy Duffy',
        stars: [ 'Willem Dafoe', 'Sean Patrick Flanery', 'Norman Reedus', 'David Della Rocco'],
        year: '1999'
    },

    {
        title: 'Fight Club',
        director: 'David Fincher',
        stars: ['Brad Pitt', 'Edward Norton', 'Meat Loaf', 'Zack Grenier'],
        year: '1999'
    },

    {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        stars: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis'],
        year: '1994'
    },

    {
        title: 'Inglourious Basterds',
        director: 'Quentin Tarantino',
        stars: ['Brad Pitt', 'Diane Kruger', 'Eli Roth', 'Mélanie Laurent'],
        year: '2009'
    },

    {
        title: 'Snatch',
        director: 'Guy Ritchie',
        stars:['Jason Statham', 'Brad Pitt', 'Stephen Graham', 'Vinnie Jones'],
        year: '2000'
    },

    {
        title: 'The Godfather',
        director: 'Francis Ford Coppola',
        stars: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Diane Keaton'],
        year: '1972'
    },

    {
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        stars: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
        year: '1994'
    },

    {
        title: 'Teenage Mutant Ninja Turtles',
        director: 'Steve Barron',
        stars:['Judith Hoag', 'Elias Koteas', 'David Forman'],//add more stars 
        year: '1990'
    },

    {
        title: 'GoldenEye',
        director: 'Martin Campbell',
        stars:['Pierce Brosnan', 'Sean Bean', 'Izabella Scorupco', 'Framke Janssen'],
        year: '1995'
    },

    {
        title: 'Deadpool',
        director: 'Tim Miller',
        stars:['Ryan Reynolds', 'Morena Baccarin', 'T.J. Miller', 'Ed Skrein'],
        year: '2016'
    }
]

let Directors =[
    {
        directorName: 'Martin Scorsese',
        Birthdate: 'November 17, 1942',
        Birthplace: 'New York City, New York, USA',
        biography:`Martin Scorsese is a highly acclaimed American director known for his gritty and intense filmmaking style. He has directed numerous classics such as "Goodfellas," "Taxi Driver," "Raging Bull," and "The Wolf of Wall Street." Scorsese is also known for his collaborations with actors like Robert De Niro and Leonardo DiCaprio. His films often explore themes of crime, violence, and moral ambiguity. Scorsese is considered one of the greatest directors in the history of cinema.`
    },
    {
        directorName: 'Steven Spielberg',
        Birthdate: 'December 18, 1946',
        Birthplace: 'Cincinnati, Ohio, USA',
        biography: `Steven Spielberg is one of the most influential and successful directors in the history of cinema. He's known for his mastery of various genres, including adventure, science fiction, drama, and fantasy. Some of his iconic films include "Jaws," "E.T. the Extra-Terrestrial," "Jurassic Park," "Schindler's List," and "Saving Private Ryan." Spielberg has won multiple Academy Awards and is recognized for his ability to craft compelling and emotionally resonant stories.`
    },
    {
        directorName: 'Quentin Tarantino',
        Birthdate: 'March 27, 1963',
        Birthplace: 'Knoxville, Tennessee, USA',
        biography: `Quentin Tarantino is renowned for his unique storytelling and distinctive filmmaking style. He's known for creating highly stylized and often violent movies with sharp dialogue. Some of his notable works include "Pulp Fiction," "Kill Bill," "Django Unchained," "Inglourious Basterds," and "Once Upon a Time in Hollywood." Tarantino's films often feature nonlinear narratives and references to pop culture, making him a significant figure in contemporary cinema.`
    },
    {
        directorName: 'Christopher Nolan',
        Birthdate: 'July 30, 1970',
        Birthplace: 'London, England',
        biography: `Christopher Nolan is a British-American director known for his cerebral and visually stunning films. He's acclaimed for his work on movies such as "Inception," "The Dark Knight Trilogy" (including "The Dark Knight" and "The Dark Knight Rises"), "Interstellar," and "Dunkirk." Nolan often explores complex themes, time manipulation, and the human psyche in his movies. His dedication to practical effects and storytelling has earned him a dedicated fan base.`
    },
    {
        directorName: 'Alfred Hitchcock',
        Birthdate: 'August 13, 1899',
        Birthplace: 'London, England',
        biography: `Alfred Hitchcock is considered one of the most influential and iconic directors in the history of cinema. He's known for his mastery of suspense and psychological thrillers. Some of his famous works include "Psycho," "Vertigo," "Rear Window," "North by Northwest," and "The Birds." Hitchcock's films often feature intricate plots and memorable characters, and his innovative techniques continue to influence filmmakers to this day.`
    },
    {
        directorName: 'Stanley Kubrick',
        Birthdate: 'July 26, 1928',
        Birthplace: 'New York City, New York, USA',
        biography: `Stanley Kubrick is celebrated for his meticulous approach to filmmaking and his diverse range of genres. Some of his acclaimed films include "2001: A Space Odyssey," "A Clockwork Orange," "The Shining," "Full Metal Jacket," and "Dr. Strangelove." Kubrick's work often delves into complex themes and is known for its technical brilliance. He is regarded as one of the greatest directors in cinema history.`
    },
    {
        directorName: 'Francis Ford Coppola',
        Birthdate: 'April 7, 1939',
        Birthplace: 'Detroit, Michigan, USA',
        biography: `Francis Ford Coppola is a highly acclaimed director known for his work on "The Godfather" trilogy, "Apocalypse Now," "The Conversation," and "Bram Stoker's Dracula." He is considered one of the most influential directors in the history of cinema. Coppola's films often explore themes of power, corruption, and the human condition. His contributions to filmmaking have left a lasting impact on the industry.`
    },
    {
        directorName: 'Akira Kurosawa',
        Birthdate: 'March 23, 1910',
        Birthplace: 'Tokyo, Japan',
        biography: `Akira Kurosawa is one of the most influential directors in the history of cinema, known for his contributions to Japanese and world cinema. He directed iconic films such as "Seven Samurai," "Rashomon," "Yojimbo," "Kagemusha," and "Ikiru." Kurosawa's storytelling, use of cinematography, and exploration of samurai culture have left a profound impact on filmmaking. He is often regarded as a master of visual storytelling.`
    },
    {
        directorName: 'David Fincher',
        Birthdate: 'August 28, 1962',
        Birthplace: 'Denver, Colorado, USA',
        biography: `David Fincher is known for his distinctive style and meticulous attention to detail in filmmaking. He has directed films such as "Fight Club," "Se7en," "The Social Network," "Gone Girl," and "The Girl with the Dragon Tattoo." Fincher's work often explores dark and complex themes, and he is known for his visually striking cinematography. He has made a significant impact on modern cinema.`
    },
    {
        directorName: 'Ridley Scott',
        Birthdate: 'November 30, 1937',
        Birthplace: 'South Shields, Tyne and Wear, England',
        biography: `Ridley Scott is a British director known for his work in both science fiction and historical genres. He directed notable films such as "Blade Runner," "Alien," "Gladiator," "The Martian," and "Black Hawk Down." Scott's films often feature stunning visuals and explore themes of human survival and exploration. He is a respected figure in the world of filmmaking.`
    },
    {
        directorName: 'Clint Eastwood',
        Birthdate: 'May 31, 1930',
        Birthplace: 'San Francisco, California, USA',
        biography: `Clint Eastwood is a versatile director known for his work in both acting and directing. He has directed and starred in films such as "Unforgiven," "Million Dollar Baby," "Mystic River," "Gran Torino," and "American Sniper." Eastwood's films often explore themes of justice, redemption, and the human experience. He is considered one of Hollywood's legendary figures.`
    },
    {
        directorName: 'Pedro Almodóvar',
        Birthdate: 'September 25, 1949',
        Birthplace: 'Calzada de Calatrava, Spain',
        biography: `Pedro Almodóvar is a Spanish director known for his colorful and often provocative films. He directed works such as "Women on the Verge of a Nervous Breakdown," "All About My Mother," "Talk to Her," "Volver," and "Pain and Glory." Almodóvar's films often explore complex characters and themes related to love, gender, and identity. He is considered a leading figure in Spanish and international cinema.`
    },
    {
        directorName: 'Wes Anderson',
        Birthdate: 'May 1, 1969',
        Birthplace: 'Houston, Texas, USA',
        biography: `Wes Anderson is known for his distinctive visual style and quirky storytelling. He directed films such as "The Grand Budapest Hotel," "Moonrise Kingdom," "Fantastic Mr. Fox," "Rushmore," and "The Royal Tenenbaums." Anderson's work often features ensemble casts and explores themes of eccentricity and nostalgia. He has a dedicated following of fans who appreciate his unique cinematic voice.`
    },
    {
        directorName: 'Tim Burton',
        Birthdate: 'August 25, 1958',
        Birthplace: 'Burbank, California, USA',
        biography: `Tim Burton is known for his dark and whimsical style in filmmaking. He directed movies such as "Edward Scissorhands," "Beetlejuice," "The Nightmare Before Christmas," "Alice in Wonderland," and "Big Fish." Burton's films often feature eccentric and visually striking characters. He is recognized for his ability to create fantastical worlds with a hint of the macabre.`
    },
    {
        directorName: 'Coen Brothers (Joel and Ethan Coen)',
        Birthdate: 'Joel Coen - November 29, 1954; Ethan Coen - September 21, 1957',
        Birthplace: 'Both born in St. Louis Park, Minnesota, USA',
        biography: `The Coen Brothers, Joel and Ethan, are known for their unique blend of dark humor and storytelling. They have directed films such as "Fargo," "No Country for Old Men," "The Big Lebowski," "True Grit," and "O Brother, Where Art Thou?" The Coen Brothers' films often feature quirky characters and explore themes of crime and morality. They are celebrated for their collaboration and distinctive style.`
    },
    {
        directorName: 'David Lynch',
        Birthdate: 'January 20, 1946',
        Birthplace: 'Missoula, Montana, USA',
        biography: `David Lynch is known for his surreal and often unsettling films. He directed works such as "Blue Velvet," "Mulholland Drive," "Eraserhead," "Twin Peaks: Fire Walk with Me," and "The Elephant Man." Lynch's films often delve into the mysterious and explore the darker aspects of human nature. He is a filmmaker who challenges conventions and creates enigmatic cinematic experiences.`
    },
    {
        directorName: 'James Cameron',
        Birthdate: 'August 16, 1954',
        Birthplace: 'Kapuskasing, Ontario, Canada',
        biography: `James Cameron is known for his groundbreaking work in science fiction and action films. He directed movies such as "Titanic," "Avatar," "Aliens," "Terminator 2: Judgment Day," and "The Abyss." Cameron is recognized for his pioneering use of special effects and his ability to create visually spectacular cinematic experiences. He is one of the highest-grossing directors in the history of cinema.`
    },
    {
        directorName: 'Sofia Coppola',
        Birthdate: 'May 14, 1971',
        Birthplace: 'New York City, New York, USA',
        biography: `Sofia Coppola is known for her atmospheric and character-driven films. She directed works such as "Lost in Translation," "The Virgin Suicides," "Marie Antoinette," "Somewhere," and "The Bling Ring." Coppola's films often explore themes of loneliness, identity, and the human connection. She is celebrated for her unique perspective and storytelling style.`
    },
    {
        directorName: 'Guillermo del Toro',
        Birthdate: 'October 9, 1964',
        Birthplace: 'Guadalajara, Jalisco, Mexico',
        biography: `Guillermo del Toro is known for his imaginative and visually stunning films, often in the fantasy and horror genres. He directed works such as "Pan's Labyrinth," "The Shape of Water," "Crimson Peak," "Hellboy," and "Pacific Rim." Del Toro's films often feature intricate creature designs and explore themes of otherness and the supernatural. He is celebrated for his unique storytelling and artistic vision.`
    },
    {
        directorName: 'Ang Lee',
        Birthdate: 'October 23, 1954',
        Birthplace: 'Chaochou, Pingtung, Taiwan',
        biography: `Ang Lee is a Taiwanese-American director known for his diverse range of films. He directed works such as "Crouching Tiger, Hidden Dragon," "Brokeback Mountain," "Life of Pi," "Sense and Sensibility," and "Hulk." Lee's films often explore themes of love, identity, and cultural clashes. He is celebrated for his ability to bring powerful stories to the screen with emotional depth.`
    },
    {
        directorName: 'Greta Gerwig',
        Birthdate: 'August 4, 1983',
        Birthplace: 'Sacramento, California, USA',
        biography: `Greta Gerwig is a talented director known for her work in independent and coming-of-age films. She directed works such as "Lady Bird" and "Little Women." Gerwig's films often explore the complexities of female characters and their journeys. She is celebrated for her storytelling and her contributions to contemporary cinema.`
    },
    {
        directorName: 'Spike Lee',
        Birthdate: 'March 20, 1957',
        Birthplace: 'Atlanta, Georgia, USA',
        biography: `Spike Lee is a prominent director known for his socially conscious films. He directed works such as "Do the Right Thing," "Malcolm X," "BlacKkKlansman," and "Inside Man." Lee's films often address issues of race, identity, and social justice. He is celebrated for his powerful storytelling and impact on cinema.`
    },
    {
        directorName: 'Hayao Miyazaki',
        Birthdate: 'January 5, 1941',
        Birthplace: 'Tokyo, Japan',
        biography: `Hayao Miyazaki is a legendary Japanese director and animator, known for his enchanting animated films. He directed works such as "Spirited Away," "My Neighbor Totoro," "Princess Mononoke," and "Howl's Moving Castle." Miyazaki's films often transport audiences to magical worlds and explore themes of nature, environmentalism, and the human spirit. He is a revered figure in animation. `
    },
    {
        directorName: 'Paul Thomas Anderson',
        Birthdate: 'June 26, 1970',
        Birthplace: 'Los Angeles, California, USA',
        biography: `Paul Thomas Anderson is a visionary director known for his ambitious and character-driven films. He directed works such as "There Will Be Blood," "Boogie Nights," "Magnolia," and "Phantom Thread." Anderson's films often delve into the depths of human emotions and complex characters. He is acclaimed for his storytelling and filmmaking craftsmanship.`
    },
    {
        directorName: 'Woody Allen',
        Birthdate: 'December 1, 1935',
        Birthplace: 'Brooklyn, New York, USA',
        biography: `Woody Allen is a prolific director known for his unique blend of comedy and drama. He directed works such as "Annie Hall," "Manhattan," "Midnight in Paris," "Hannah and Her Sisters," and "Match Point." Allen's films often explore neuroses, relationships, and the human condition. He is a celebrated figure in both film and comedy.`
    },
    {
        directorName: 'Darren Aronofsky',
        Birthdate: 'February 12, 1969',
        Birthplace: 'Brooklyn, New York, USA',
        biography: `Darren Aronofsky is known for his provocative and psychologically intense films. He directed works such as "Requiem for a Dream," "Black Swan," "The Fountain," "Noah," and "Mother!" Aronofsky's films often challenge and disturb audiences, exploring themes of obsession, addiction, and spirituality. He is recognized for his innovative storytelling.`
    },
    {
        directorName: 'Roman Polanski',
        Birthdate: 'August 18, 1933',
        Birthplace: 'Paris, France',
        biography: `Roman Polanski is a renowned director known for his suspenseful and controversial films. He directed works such as "Rosemary's Baby," "Chinatown," "The Pianist," and "Cul-de-Sac." Polanski's films often explore themes of paranoia, crime, and human vulnerability. He is considered a master of psychological thrillers.`
    },
    {
        directorName: 'Denis Villeneuve',
        Birthdate: 'October 3, 1967',
        Birthplace: 'Trois-Rivières, Quebec, Canada',
        biography: `Denis Villeneuve is a visionary director known for his visually stunning and thought-provoking films. He directed works such as "Blade Runner 2049," "Arrival," "Prisoners," "Sicario," and "Incendies." Villeneuve's films often challenge audiences with complex narratives and themes. He is celebrated for his contributions to science fiction and drama.`
    },
    {
        directorName: 'Ava DuVernay',
        Birthdate: 'August 24, 1972',
        Birthplace: 'Long Beach, California, USA',
        biography: `Ava DuVernay is a trailblazing director known for her impactful and socially relevant films. She directed works such as "Selma," "13th," "A Wrinkle in Time," "When They See Us," and "Middle of Nowhere." DuVernay's films often address issues of race, justice, and inequality. She is a prominent advocate for diversity in filmmaking.`
    },
    {
        directorName: 'Bong Joon-ho',
        Birthdate: 'September 14, 1969',
        Birthplace: 'Daegu, South Korea',
        biography: `Bong Joon-ho is a South Korean director known for his unique blend of genre-bending films. He directed works such as "Parasite," "Snowpiercer," "Memories of Murder," "The Host," and "Okja." Bong's films often tackle social issues and class disparities with a touch of dark humor. He is celebrated for his storytelling and social commentary.`
    },
    {
        directorName: 'Ridley Scott',
        Birthdate: 'November 30, 1937',
        Birthplace: 'South Shields, Tyne and Wear, England',
        biography: `Ridley Scott is a British director known for his work in both science fiction and historical genres. He directed notable films such as "Blade Runner," "Alien," "Gladiator," "The Martian," and "Black Hawk Down." Scott's films often feature stunning visuals and explore themes of human survival and exploration. He is a respected figure in the world of filmmaking.`
    },
    {
        directorName: 'Oliver Stone',
        Birthdate: 'September 15, 1946',
        Birthplace: 'New York City, New York, USA',
        biography: `Oliver Stone is a director known for his politically charged and controversial films. He directed works such as "Platoon," "JFK," "Natural Born Killers," "Wall Street," and "Born on the Fourth of July." Stone's films often challenge societal norms and explore historical events from multiple perspectives. He is recognized for his bold storytelling.`
    },
    {
        directorName: 'Spike Jonze',
        Birthdate: 'October 22, 1969',
        Birthplace: 'Rockville, Maryland, USA',
        biography: `Spike Jonze is known for his innovative and imaginative filmmaking. He directed works such as "Her," "Being John Malkovich," "Adaptation," "Where the Wild Things Are," and "Maurice Sendak's Higglety Pigglety Pop!" Jonze's films often explore the human experience and relationships with a touch of whimsy. He is celebrated for his creativity and artistic vision.`
    },
    {
        directorName: 'Baz Luhrmann',
        Birthdate: 'September 17, 1962',
        Birthplace: 'Sydney, New South Wales, Australia',
        biography: `Baz Luhrmann is known for his visually extravagant and musical films. He directed works such as "Moulin Rouge!," "Romeo + Juliet," "The Great Gatsby," "Strictly Ballroom," and "Australia." Luhrmann's films often feature elaborate set designs and use music to enhance storytelling. He is celebrated for his unique and flamboyant style.`
    },
    {
        directorName: 'Kathryn Bigelow',
        Birthdate: 'November 27, 1951',
        Birthplace: 'San Carlos, California, USA',
        biography: `Kathryn Bigelow is a director known for her impactful and intense films. She directed works such as "The Hurt Locker," "Zero Dark Thirty," "Point Break," "Near Dark," and "Detroit." Bigelow's films often explore themes of war, terrorism, and social issues. She is the first woman to win the Academy Award for Best Director.`
    },
    {
        directorName: 'Terry Gilliam',
        Birthdate: 'November 22, 1940',
        Birthplace: 'Minneapolis, Minnesota, USA',
        biography: `Terry Gilliam is known for his imaginative and surreal films. He directed works such as "Brazil," "Fear and Loathing in Las Vegas," "12 Monkeys," "Time Bandits," and "The Fisher King." Gilliam's films often challenge reality and societal norms. He is celebrated for his unique and visually striking style.`
    },
    {
        directorName: 'Terrence Malick',
        Birthdate: 'November 30, 1943',
        Birthplace: 'Ottawa, Illinois, USA',
        biography: `Terrence Malick is known for his poetic and philosophical films. He directed works such as "The Tree of Life," "The Thin Red Line," "Days of Heaven," "Badlands," and "Knight of Cups." Malick's films often explore the human connection to nature and spirituality. He is celebrated for his meditative and visually stunning storytelling.`
    },
    {
        directorName: 'Wong Kar-wai',
        Birthdate: 'July 17, 1958',
        Birthplace: 'Shanghai, China',
        biography: `Wong Kar-wai is a Hong Kong director known for his visually stylish and emotionally resonant films. He directed works such as "In the Mood for Love," "Chungking Express," "2046," "Happy Together," and "The Grandmaster." Wong's films often focus on love, longing, and the passage of time. He is celebrated for his unique cinematic voice.`
    },
    {
        directorName: 'Jean-Pierre Jeunet',
        Birthdate: 'September 3, 1953',
        Birthplace: 'Roanne, Loire, France',
        biography: `Jean-Pierre Jeunet is known for his whimsical and visually imaginative films. He directed works such as "Amélie," "A Very Long Engagement," "The City of Lost Children," "Micmacs," and "Delicatessen." Jeunet's films often transport viewers to charming and quirky worlds. He is celebrated for his storytelling and artistic craftsmanship.`
    },
    {
        directorName: 'Kelly Reichardt',
        Birthdate: 'March 19, 1964',
        Birthplace: 'Miami, Florida, USA',
        biography: 'Kelly Reichardt is known for her understated and contemplative films like "Wendy and Lucy" and "Certain Women."',
    },
    {
        directorName: 'Xavier Dolan',
        Birthdate: 'March 20, 1989',
        Birthplace: 'Montreal, Quebec, Canada',
        biography: 'Xavier Dolan is a Canadian director known for emotionally charged works like "Mommy" and "Heartbeats."',
    },
    {
        directorName: 'Park Chan-wook',
        Birthdate: 'August 23, 1963',
        Birthplace: 'Seoul, South Korea',
        biography: 'Park Chan-wook is a South Korean director celebrated for his visually stunning and provocative films, including "Oldboy" and "The Handmaiden."',
    },
    {
        directorName: 'Chan-wook Park',
        Birthdate: 'August 23, 1963',
        Birthplace: 'Seoul, South Korea',
        biography: 'Chan-wook Park is known for his dark and intricate storytelling in films like "Stoker" and "Thirst."',
    },
    {
        directorName: 'Kenneth Lonergan',
        Birthdate: 'October 16, 1962',
        Birthplace: 'New York City, New York, USA',
        biography: 'Kenneth Lonergan is renowned for character-driven dramas like "Manchester by the Sea" and "You Can Count on Me."',
    },
    {
        directorName: 'Céline Sciamma',
        Birthdate: 'November 12, 1978',
        Birthplace: 'Pontoise, France',
        biography: 'Céline Sciamma is a French director known for her powerful and intimate films, including "Portrait of a Lady on Fire."',
    },
    {
        directorName: 'Lulu Wang',
        Birthdate: 'February 2, 1983',
        Birthplace: 'Beijing, China',
        biography: 'Lulu Wang directed the heartfelt and semi-autobiographical film "The Farewell."',
    },
    {
        directorName: 'Hirokazu Kore-eda',
        Birthdate: 'June 6, 1962',
        Birthplace: 'Tokyo, Japan',
        biography: 'Hirokazu Kore-eda is a Japanese director celebrated for his humanistic storytelling in works like "Shoplifters" and "Like Father, Like Son."',
    },
    {
        directorName: 'Pablo Larraín',
        Birthdate: 'August 19, 1976',
        Birthplace: 'Santiago, Chile',
        biography: 'Pablo Larraín is known for his unique biographical films like "Jackie" and "Neruda."',
    },
    {
        directorName: 'Martin McDonagh',
        Birthdate: 'March 26, 1970',
        Birthplace: 'Camden, London, England',
        biography: 'Martin McDonagh is celebrated for dark humor and works like "In Bruges" and "Three Billboards Outside Ebbing, Missouri."',
    },
    {
        directorName: 'Gus Van Sant',
        Birthdate: 'July 24, 1952',
        Birthplace: 'Louisville, Kentucky, USA',
        biography: 'Gus Van Sant is known for his eclectic filmography, including "Good Will Hunting" and "Milk." He explores themes of identity and marginalized communities.',
    },
    {
        directorName: 'Spike Jonze',
        Birthdate: 'October 22, 1969',
        Birthplace: 'Rockville, Maryland, USA',
        biography: 'Spike Jonze is celebrated for his imaginative storytelling in films like "Being John Malkovich" and "Her." He blurs the lines between reality and fantasy.',
    },
    {
        directorName: 'Lynne Ramsay',
        Birthdate: 'December 5, 1969',
        Birthplace: 'Glasgow, Scotland',
        biography: 'Lynne Ramsay is known for her visually striking and emotionally intense films, including "We Need to Talk About Kevin" and "You Were Never Really Here."',
    },
    {
        directorName: 'Tom Hooper',
        Birthdate: 'October 1, 1972',
        Birthplace: 'London, England',
        biography: `Tom Hooper is recognized for directing films like "The King's Speech" and "Les Misérables." He has a talent for adapting stage musicals to the screen.`
    },
    {
        directorName: 'Tom McCarthy',
        Birthdate: 'June 7, 1966',
        Birthplace: 'New Providence, New Jersey, USA',
        biography: 'Tom McCarthy is known for character-driven films like "The Station Agent" and "Spotlight." He delves into the complexities of human relationships.',
    },
    {
        directorName: 'Makoto Shinkai',
        Birthdate: 'February 9, 1973',
        Birthplace: 'Nagano Prefecture, Japan',
        biography: 'Makoto Shinkai is a Japanese animator and director celebrated for his breathtaking animated films like "Your Name" and "Weathering with You."',
    },
    {
        directorName: 'Dee Rees',
        Birthdate: 'February 7, 1977',
        Birthplace: 'Nashville, Tennessee, USA',
        biography: 'Dee Rees is known for her powerful storytelling, particularly in "Mudbound" and "Pariah." She addresses themes of race and identity.',
    },
    {
        directorName: 'Tate Taylor',
        Birthdate: 'June 3, 1969',
        Birthplace: 'Jackson, Mississippi, USA',
        biography: 'Tate Taylor directed films like "The Help" and "Get on Up." He often explores stories of resilience and cultural significance.',
    },
    {
        directorName: 'David Ayer',
        Birthdate: 'January 18, 1968',
        Birthplace: 'Champaign, Illinois, USA',
        biography: 'David Ayer is known for his gritty and intense films, including "Training Day" and "End of Watch." He often delves into the world of law enforcement.',
    },
    {
        directorName: 'Julie Taymor',
        Birthdate: 'December 15, 1952',
        Birthplace: 'Newton, Massachusetts, USA',
        biography: 'Julie Taymor is celebrated for her visually stunning and theatrical films, such as "Frida" and "Across the Universe." She blends art and storytelling seamlessly.',
    }
      ]
let movies = [ 
                {
                Title:'Oppenheimer',
                Year:'(2023)',
                certificate:'R',
                Time:'180 min',
                genre:['Biography', 'Drama', 'History'],
                textmuted:'The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.',
                Director:'Christopher Nolan',
                Stars:['Cillian Murphy','Emily Blunt','Matt Damon','Robert Downey Jr.']
                },
                
                {
                Title:'Barbie',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'114 min',
                genre:['Adventure', 'Comedy', 'Fantasy'],
                textmuted:'Barbie suffers a crisis that leads her to question her world and her existence.',
                Director:'Greta Gerwig',
                Stars:['Margot Robbie','Ryan Gosling','Issa Rae','Kate McKinnon']
                },

                {
                Title:'Guardians of the Galaxy Vol. 3',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'150 min',
                genre:['Action', 'Adventure', 'Comedy'],
                textmuted:'Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.',
                Director:'James Gunn',
                Stars:['Chris Pratt','Chukwudi Iwuji','Bradley Cooper','Pom Klementieff']
                },
                
                {
                Title:'Meg 2: The Trench',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'116 min',
                genre:['Action','Adventure', 'Horror'],
                textmuted:'A research team encounters multiple threats while exploring the depths of the ocean, including a malevolent mining operation.',
                Director:'Ben Wheatley',
                Stars:['Jason Statham','Jing Wu','Shuya Sophia Cai','Cliff Curtis']
                },
            
                {
                Title:'Teenage Mutant Ninja Turtles: Mutant Mayhem',
                Year:'(2023)',
                certificate:'PG',
                Time:'99 min',
                genre:['Animation', 'Action', 'Adventure'],
                textmuted:'The film follows the Turtle brothers as they work to earn the love of New York City while facing down an army of mutants.',
                Director:'Jeff Rowe',
                Stars:['Kyler Spears','Micah Abbey','Shamon Brown Jr','Nicolas Cantu']
                },
            
                {
                Title:'Talk to Me',
                Year:(2022),
                certificate:'R',
                Time:'95 min',
                genre:['Horror', 'Thriller'],
                textmuted:'When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.',
                Director:'Danny Philippou',
                Stars:['Michael Philippou','Ari McCarthy','Hamish Phillips','Kit Erhart-Bruce']
                },
            
                {
                Title:'Heart of Stone',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'122 min',
                genre:['Action', 'Crime', 'Thriller'],
                textmuted:'An intelligence operative for a shadowy global peacekeeping agency races to stop a hacker from stealing its most valuable and dangerous weapon.',
                Director:'Tom Harper',
                Stars:['Gal Gadot','Jamie Dornan','Alia Bhatt','Jing Lusi']
                },
                {
                Title:'Spider-Man: Across the Spider-Verse',
                Year:'(2023)',
                certificate:'PG',
                Time:'140 min',
                genre:['Animation', 'Action', 'Adventure'],
                textmuted: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.',
                Director:'Joaquim Dos Santos',
                Stars:['Kemp Powers','Justin K. Thompson','Shameik Moore','Hailee Steinfeld']
                },
                {
                Title:'Red, White & Royal Blue',
                Year:'(2023)',
                certificate:'R',
                Time:'118 min',
                genre:[ 'Comedy', 'Romance'],
                textmuted: "When the feud between the son of the American President and Britain's prince threatens to drive a wedge in U.S./British relations, the two are forced into a staged truce that sparks something deeper.",
                Director:'Matthew López',
                Stars:['Taylor Zakhar Perez','Nicholas Galitzine','Uma Thurman','Jemma Redgrave']
                },
            
                {
                Title:'No Hard Feelings',
                Year:'(2023)',
                certificate:'R',
                Time:'103 min',
                genre:[ 'Comedy', 'Romance'],
                textmuted: 'On the brink of losing her home, Maddie finds an intriguing job listing: helicopter parents looking for someone to bring their introverted 19-year-old son out of his shell before college. She has one summer to make him a man or die trying.',
                Director:'Gene Stupnitsky',
                Stars:['Jennifer Lawrence','Andrew Barth Feldman','Laura Benanti','Matthew Broderick']
                },
            
                {
                Title:'Mission: Impossible - Dead Reckoning Part One',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'163 min',
                genre:[ 'Action', 'Adventure', 'Thriller'],
                textmuted: 'Ethan Hunt and his IMF team must track down a dangerous weapon before it falls into the wrong hands.',
                Director:'Christopher McQuarrie',
                Stars:['Tom Cruise','Hayley Atwell','Ving Rhames','Simon Pegg']
                },

                {
                Title:'The Super Mario Bros. Movie',
                Year:'(2023)',
                certificate:'PG',
                Time:'92 min',
                genre:[ 'Animation', 'Adventure', 'Comedy'],
                textmuted: 'A plumber named Mario travels through an underground labyrinth with his brother, Luigi, trying to save a captured princess.',
                Director:'Aaron Horvath',
                Stars:['Michael Jelenic','Pierre Leduc','Fabien Polack','Chris Pratt']
                },

                {
                Title:'Sound of Freedom',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'131 min',
                genre:[ 'Action', 'Biography', 'Drama'],
                textmuted: 'The incredible true story of a former government agent turned vigilante who embarks on a dangerous mission to rescue hundreds of children from sex traffickers.',
                Director:'Alejandro Monteverde',
                Stars:['Jim Caviezel','Mira Sorvino','Bill Camp','Cristal Aparicio']
                },

                {
                Title:'The Last Voyage of the Demeter',
                Year:'(2023)',
                certificate:'R',
                Time:'118 min',
                genre:[ 'Horror'],
                textmuted: 'A crew sailing from Carpathia to England find that they are carrying very dangerous cargo.',
                Director:'André Øvredal',
                Stars:['Corey Hawkins','Aisling Franciosi','Liam Cunningham','David Dastmalchian']
                },

                {
                Title:'The River Wild',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'91 min',
                genre:[ 'Thriller'],
                textmuted: 'Follows a pair of siblings who love but distrust each other as they embark on a white-water rafting trip with a small group. One of their friends from childhood turns out to be more dangerous than he appears.',
                Director:'Ben Ketai',
                Stars:['Adam Brody','Courtney Chen','Eve Connolly','Matt Devere']
                },

                {
                Title:'The Meg',
                Year:'(2018)',
                certificate:'PG-13',
                Time:'113 min',
                genre:[ 'Action', 'Horror', 'Sci-Fi'],
                textmuted: 'A group of scientists exploring the Marianas Trench encounter the largest marine predator that has ever existed - the Megalodon.',
                Director:'Jon Turteltaub',
                Stars:['Jason Statham','Bingbing Li','Rainn Wilson','Cliff Curtis']
                },

                {
                Title:'Gran Turismo',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'135 min',
                genre:[ 'Action', 'Adventure',' Drama'],
                textmuted: 'Based on the unbelievable, inspiring true story of a team of underdogs - a struggling, working-class gamer, a failed former race car driver, and an idealistic motorsport exec - who risk it all to take on the most elite sport in the world.',
                Director:'Neill Blomkamp',
                Stars:['David Harbour','Orlando Bloom','Archie Madekwe','Takehiro Hira']
                },

                {
                Title:'Haunted Mansion',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'123 min',
                genre:[ 'Comedy', 'Drama', 'Family'],
                textmuted: 'A single mom named Gabbie hires a tour guide, a psychic, a priest and a historian to help exorcise her newly bought mansion after discovering it is inhabited by ghosts.',
                Director:'Justin Simien',
                Stars:['LaKeith Stanfield','Rosario Dawson','Owen Wilson','Tiffany Haddish']
                },

                {
                Title:'Happiness for Beginners',
                Year:'(2023)',
                certificate:'TV-14',
                Time:'103 min',
                genre:[ 'Comedy', 'Drama', 'Romance'],
                textmuted: 'Helen signs up for a wilderness survival course, a year after getting divorced. She discovers through this experience that sometimes, you have to get really lost in order to find yourself.',
                Director:'Vicky Wight',
                Stars:['Ellie Kemper','Luke Grimes','Nico Santos','Blythe Danner']
                },

                {
                Title:'Transformers: Rise of the Beasts',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'127 min',
                genre:[ 'Action', 'Adventure', 'Sci-Fi'],
                textmuted: "During the '90s, a new faction of Transformers - the Maximals - join the Autobots as allies in the battle for Earth.",
                Director:'Steven Caple Jr.',
                Stars:['Anthony Ramos','Dominique Fishback','Luna Lauren Velez','Dean Scott Vazquez']
                },

                {
                Title:'Paradise',
                Year:'(I) (2023)',
                certificate:'TV-MA',
                Time:'117 min',
                genre:[ 'Action', 'Sci-Fi', 'Thriller'],
                textmuted: 'After his wife is forced to give up 40 years of her life as payment for an insurance debt, a man desperately searches for a way to get them back.',
                Director:'Boris Kunz',
                Stars:['Lisa-Marie Koroll','Dalila Abdallah','Numan Acar','Simon Amberger']
                },

                {
                Title:'Hidden Strike',
                Year:'(2023)',
                certificate:'TV-14',
                Time:'102 min',
                genre:[ 'Action', 'Adventure', 'Comedy'],
                textmuted: "Two ex-special forces soldiers must escort a group of civilians along Baghdad's \'Highway of Death\' to the safety of the Green Zone.",
                Director:'Scott Waugh',
                Stars:['Jackie Chan','John Cena','Chunrui Ma','Wenli Jiang']
                },

                {
                Title:'Asteroid City',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'105 min',
                genre:[ 'Comedy', 'Drama', 'Romance'],
                textmuted: 'Following a writer on his world famous fictional play about a grieving father who travels with his tech-obsessed family to small rural Asteroid City to compete in a junior stargazing event, only to have his world view disrupted forever.',
                Director:'Wes Anderson',
                Stars:['Jason Schwartzman','Scarlett Johansson','Tom Hanks','Jeffrey Wright']
                },

                {
                Title:'Babylon',
                Year:'(I) (2022)',
                certificate:'R',
                Time:'189 min',
                genre:[ 'Comedy', 'Drama', 'History'],
                textmuted: 'A tale of outsized ambition and outrageous excess, it traces the rise and fall of multiple characters during an era of unbridled decadence and depravity in early Hollywood.',
                Director:'Damien Chazelle',
                Stars:['Brad Pitt','Margot Robbie','Jean Smart','Olivia Wilde']
                },

                {
                Title:'Insidious: The Red Door',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'107 min',
                genre:[ 'Horror', 'Mystery', 'Thriller'],
                textmuted: 'The Lamberts must go deeper into The Further than ever before to put their demons to rest once and for all.',
                Director:'Patrick Wilson',
                Stars:['Ty Simpkins','Patrick Wilson','Rose Byrne','Sinclair Daniel']
                },

                {
                Title:'The Little Mermaid',
                Year:'(I) (2023)',
                certificate:'PG',
                Time:'135 min',
                genre:[ 'Adventure', 'Family', 'Fantasy'],
                textmuted: 'A young mermaid makes a deal with a sea witch to trade her beautiful voice for human legs so she can discover the world above water and impress a prince.',
                Director:'Rob Marshall',
                Stars:['Halle Bailey','Jonah Hauer-King','Melissa McCarthy','Javier Bardem']
                },

                {
                Title:'The Flash',
                Year:'(I) (2023)',
                certificate:'PG-13',
                Time:'144 min',
                genre:[ 'Action', 'Adventure', 'Fantasy'],
                textmuted: 'Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes, forcing him to race for his life in order to save the future.',
                Director:'Andy Muschietti',
                Stars:['Ezra Miller','Michael Keaton','Sasha Calle','Michael Shannon']
                },

                {
                Title:'Blue Beetle',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'127 min',
                genre:[ 'Action', 'Adventure','Sci-Fi'],
                textmuted: "An alien scarab chooses college graduate Jaime Reyes to be its symbiotic host, bestowing the teenager with a suit of armor that's capable of extraordinary and unpredictable powers, forever changing his destiny as he becomes the superhero known as Blue Beetle.",
                Director:'Angel Manuel Soto',
                Stars:['Xolo Maridueña','Bruna Marquezine','Becky G','Damián Alcázar']
                },

                {
                Title:'Interstellar',
                Year:'(2014)',
                certificate:'PG-13',
                Time:'169 min',
                genre:[ 'Adventure', 'Drama', 'Sci-Fi'],
                textmuted: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
                Director:'Christopher Nolan',
                Stars:['Matthew McConaughey','Anne Hathaway','Jessica Chastain','Mackenzie Foy']
                },

                {
                Title:'They Cloned Tyrone',
                Year:'(2023)',
                certificate:'R',
                Time:'122 min',
                genre:[ 'Action', 'Comedy', 'Mystery'],
                textmuted: 'A series of eerie events thrusts an unlikely trio onto the trail of a nefarious government conspiracy in this pulpy mystery caper.',
                Director:'Juel Taylor',
                Stars:['John Boyega','Jamie Foxx','Teyonah Parris','Kiefer Sutherland']
                },

                {
                Title:'X',
                Year:'(II) (2022)',
                certificate:'R',
                Time:'105 min',
                genre:[ 'Horror', 'Mystery', 'Thriller'],
                textmuted: 'In 1979, a group of young filmmakers set out to make an adult film in rural Texas, but when their reclusive, elderly hosts catch them in the act, the cast find themselves fighting for their lives.',
                Director:'Ti West',
                Stars:['Mia Goth','Jenna Ortega','Brittany Snow','Kid Cudi']
                },

                {
                Title:'Indiana Jones and the Dial of Destiny',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'154 min',
                genre:[ 'Action', 'Adventure'],
                textmuted: 'Archaeologist Indiana Jones races against time to retrieve a legendary artifact that can change the course of history.',
                Director:'James Mangold',
                Stars:['Harrison Ford','Phoebe Waller-Bridge','Antonio Banderas','Karen Allen']
                },

                {
                Title:'Spider-Man: Lotus',
                Year:'(2023)',
                certificate:'',
                Time:'120 min',
                genre:[ 'Action', 'Drama'],
                textmuted: 'Peter Parker, who is struggling to recover from the loss of Gwen Stacy and contemplating hanging up the suit for good, until he receives a letter from a terminally ill child, requesting that Spider-Man pay a visit before he passes away.',
                Director:'Gavin J. Konop',
                Stars:['Warden Wayne','Sean Thomas Reid','Moriah Brooklyn','Tuyen Powell']
                },

                {
                Title:'A Man Called Otto',
                Year:'(2022)',
                certificate:'PG-13',
                Time:'126 min',
                genre:[ 'Comedy', 'Drama'],
                textmuted: "Otto is a grump who's given up on life following the loss of his wife and wants to end it all. When a young family moves in nearby, he meets his match in quick-witted Marisol, leading to a friendship that will turn his world around.",
                Director:'Marc Forster',
                Stars:['Tom Hanks','Mariana Treviño','Rachel Keller','John Higgins']
                },

                {
                Title:'Cobweb',
                Year:'(2023)',
                certificate:'R',
                Time:'88 min',
                genre:[ 'Horror', 'Thriller'],
                textmuted: 'An eight-year-old boy tries to investigate the mysterious knocking sounds that are coming from inside the walls of his house, unveiling a dark secret that his sinister parents have kept hidden from him.',
                Director:'Samuel Bodin',
                Stars:['Lizzy Caplan','Antony Starr','Cleopatra Coleman','Woody Norman']
                },

                {
                Title:'The Covenant',
                Year:'(2023)',
                certificate:'R',
                Time:'123 min',
                genre:[ 'Action', 'Thriller', 'War'],
                textmuted: 'During the war in Afghanistan, a local interpreter risks his own life to carry an injured sergeant across miles of grueling terrain.',
                Director:'Guy Ritchie',
                Stars:['Jake Gyllenhaal','Dar Salim','Sean Sagar','Jason Wong']
                },

                {
                Title:'John Wick: Chapter 4',
                Year:'(2023)',
                certificate:'R',
                Time:'169 min',
                genre:[ 'Action', 'Crime', 'Thriller'],
                textmuted: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
                Director:'Chad Stahelski',
                Stars:['Keanu Reeves','Laurence Fishburne','George Georgiou','Lance Reddick']
                },

                {
                Title:'Rocky Aur Rani Kii Prem Kahaani',
                Year:'(2023)',
                certificate:'Not Rated',
                Time:'168 min',
                genre:[ 'Comedy', 'Drama', 'Family'],
                textmuted: "Flamboyant Punjabi Rocky and intellectual Bengali journalist Rani fall in love despite their differences. After facing family opposition, they decide to live with each other's families for three months before getting married.",
                Director:'Karan Johar',
                Stars:['Ranveer Singh','Alia Bhatt','Dharmendra','Shabana Azmi']
                },

                {
                Title:"Five Nights at Freddy's",
                Year:'(2023)',
                certificate:'PG-13',
                Time:'',
                genre:[ 'Horror'],
                textmuted: "A troubled security guard begins working at Freddy Fazbear's Pizza. During his first night on the job, he realizes that the night shift won't be so easy to get through. Pretty soon he will unveil what actually happened at Freddy's.",
                Director:'Emma Tammi',
                Stars:['Josh Hutcherson','Matthew Lillard','Elizabeth Lail','Mary Stuart Masterson']
                },

                {
                Title:'Dungeons & Dragons: Honor Among Thieves',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'134 min',
                genre:[ 'Action', 'Adventure', 'Comedy'],
                textmuted: 'A charming thief and a band of unlikely adventurers embark on an epic quest to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people.',
                Director:'John Francis Daley',
                Stars:['Jonathan Goldstein','Chris Pine','Michelle Rodriguez','Regé-Jean Page']
                },

                {
                Title:'Inception',
                Year:'(2010)',
                certificate:'PG-13',
                Time:'148 min',
                genre:[ 'Action', 'Adventure', 'Sci-Fi'],
                textmuted: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
                Director:'Christopher Nolan',
                Stars:['Leonardo DiCaprio','Joseph Gordon-Levitt','Elliot Page','Ken Watanabe']
                },

                {
                Title:'The Dark Knight',
                Year:'(2008)',
                certificate:'PG-13',
                Time:'152 min',
                genre:[ 'Action', 'Crime', 'Drama'],
                textmuted: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
                Director:'Christopher Nolan',
                Stars:['Christian Bale','Heath Ledger','Aaron Eckhart','Michael Caine']
                },

                {
                Title:'Avatar: The Way of Water',
                Year:'(2022)',
                certificate:'PG-13',
                Time:'192 min',
                genre:[ 'Action', 'Adventure', 'Fantasy'],
                textmuted: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
                Director:'James Cameron',
                Stars:['Sam Worthington','Zoe Saldana','Sigourney Weaver','Stephen Lang']
                },

                {
                Title:'Fast X',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'141 min',
                genre:[ 'Action', 'Adventure', 'Crime'],
                textmuted: 'Dom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes.',
                Director:'Louis Leterrier',
                Stars:['Vin Diesel','Michelle Rodriguez','Jason Statham','Jordana Brewster']
                },

                {
                Title:'Dune',
                Year:'(2021)',
                certificate:'PG-13',
                Time:'155 min',
                genre:[ 'Action',' Adventure', 'Drama'],
                textmuted: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
                Director:'Denis Villeneuve',
                Stars:['Timothée Chalamet','Rebecca Ferguson','Zendaya','Oscar Isaac']
                },

                {
                Title:'The Shawshank Redemption',
                Year:'(1994)',
                certificate:'R',
                Time:'142 min',
                genre:[ 'Drama'],
                textmuted: 'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
                Director:'Frank Darabont',
                Stars:['Tim Robbins','Morgan Freeman','Bob Gunton','William Sadler']
                },

                {
                Title:'Zom 100: Bucket List of the Dead',
                Year:'(2023)',
                certificate:'TV-MA',
                Time:'128 min',
                genre:[ 'Action', 'Comedy', 'Fantasy'],
                textmuted: "Bullied by his boss, worked around the clock, he's nothing more than a corporate drone. All it takes is a zombie outbreak for him to finally feel alive.",
                Director:'Yûsuke Ishida',
                Stars:['Eiji Akaso','Mai Shiraishi','Shuntarô Yanagi','Yui Ichikawa']
                },

                {
                Title:'Joy Ride',
                Year:'(2023)',
                certificate:'R',
                Time:'95 min',
                genre:[ 'Comedy'],
                textmuted: 'Follows four Asian American friends as they bond and discover the truth of what it means to know and love who you are, while they travel through China in search of one of their birth mothers.',
                Director:'Adele Lim',
                Stars:['Ashley Park','Sherry Cola','Stephanie Hsu','Sabrina Wu']
                },

                {
                Title:'Bull',
                Year:'(2021)',
                certificate:'R',
                Time:'88 min',
                genre:[ 'Crime', 'Horror', 'Thriller'],
                textmuted: 'Bull mysteriously returns home after a 10 year absence to seek revenge on those who double crossed him all those years ago.',
                Director:'Paul Andrew Williams',
                Stars:['David Nellist','Kevin Harvey','Mark Springer','Neil Maskell']
                },

                {
                Title:'The Wolf of Wall Street',
                Year:'(2013)',
                certificate:'R',
                Time:'180 min',
                genre:[ 'Biography', 'Comedy', 'Crime'],
                textmuted: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
                Director:'Martin Scorsese',
                Stars:['Leonardo DiCaprio','Jonah Hill','Margot Robbie','Matthew McConaughey']
                },

                {
                Title:'Fatale',
                Year:'(II) (2020)',
                certificate:'R',
                Time:'102 min',
                genre:[ 'Thriller'],
                textmuted: "After a one-night stand, a successful married man finds himself entangled in a cunning police detective's latest investigation.",
                Director:'Deon Taylor',
                Stars:['Hilary Swank','Michael Ealy','Mike Colter','Damaris Lewis']
                },

                {
                Title:'Killers of the Flower Moon',
                Year:'(2023)',
                certificate:'R',
                Time:'206 min',
                genre:[ 'Crime', 'Drama', 'History'],
                textmuted: 'Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s, sparking a major F.B.I. investigation involving J. Edgar Hoover.',
                Director:'Martin Scorsese',
                Stars:['Leonardo DiCaprio','Robert De Niro','Lily Gladstone','Jesse Plemons']
                },

                {
                Title:'Corner Office',
                Year:'(2022)',
                certificate:'PG-13',
                Time:'101 min',
                genre:[ 'Comedy'],
                textmuted: "As Orson, The Authority's newest employee, finds himself trapped in the absurdities of corporate life, his alienation deepens when he discovers a room he's told doesn't exist.",
                Director:'Joachim Back',
                Stars:['Jon Hamm','Danny Pudi','Sarah Gadon','Christopher Heyerdahl']
                },

                {
                Title:'The Godfather',
                Year:'(1972)',
                certificate:'R',
                Time:'175 min',
                genre:[ 'Crime', 'Drama'],
                textmuted: 'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.',
                Director:'Francis Ford Coppola',
                Stars:['Marlon Brando','Al Pacino','James Caan','Diane Keaton']
                },

                {
                Title:'The Exorcist',
                Year:'(1973)',
                certificate:'R',
                Time:'122 min',
                genre:[ 'Horror'],
                textmuted: 'When a teenage girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her daughter.',
                Director:'William Friedkin',
                Stars:['Ellen Burstyn','Max von Sydow','Linda Blair','Lee J. Cobb']
                },

                {
                Title:'Saw X',
                Year:'(2023)',
                certificate:'',
                Time:'',
                genre:[ 'Horror', 'Mystery', 'Thriller'],
                textmuted: "Chasing a promising procedure that would allegedly cure his cancer, John Kramer heads towards Mexico to go through an experimental treatment, only to find out he was prey for a scam. Now, the scammers becomes the prey on Jigsaw's new game.",
                Director:'Kevin Greutert',
                Stars:['Tobin Bell','Shawnee Smith','Steven Brand','Synnøve Macody Lund']
                },

                {
                Title:'You Are So Not Invited to My Bat Mitzvah',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'103 min',
                genre:[ 'Comedy'],
                textmuted: 'It follows Stacey Friedman as she prepares for her bat mitzvah, but her plans comedically unravel and threaten to ruin the event.',
                Director:'Sammi Cohen',
                Stars:['Idina Menzel','Jackie Sandler','Adam Sandler','Sadie Sandler']
                },

                {
                Title:'My Fault',
                Year:'(2023)',
                certificate:'',
                Time:'117 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: "Noah has to leave her town, boyfriend and friends behind and move into the mansion of her mother's new rich husband. There she meets Nick, her new stepbrother. They fall madly in love in secret.",
                Director:'Domingo González',
                Stars:['Nicole Wallace','Gabriel Guevara','Marta Hazas','Iván Sánchez']
                },

                {
                Title:'Gadar 2',
                Year:'(2023)',
                certificate:'',
                Time:'170 min',
                genre:[ 'Action', 'Drama'],
                textmuted: "India's most loved family of Tara, Sakeena and Jeete; 22 years after its predecessor. Set against the Indo-Pakistan war of 1971, Tara Singh, once again, will face every enemy to protect the honor of country and family.",
                Director:'Anil Sharma',
                Stars:['Sunny Deol','Utkarsh Sharma','Ameesha Patel','Amrish Puri']
                },

                {
                Title:'Dunkirk',
                Year:'(2017)',
                certificate:'PG-13',
                Time:'106 min',
                genre:[ 'Action', 'Drama', 'History'],
                textmuted: 'Allied soldiers from Belgium, the British Commonwealth and Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II.',
                Director:'Christopher Nolan',
                Stars:['Fionn Whitehead','Barry Keoghan','Mark Rylance','Tom Hardy']
                },

                {
                Title:'Guardians of the Galaxy',
                Year:'(2014)',
                certificate:'PG-13',
                Time:'121 min',
                genre:[ 'Action', 'Adventure', 'Comedy'],
                textmuted: 'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.',
                Director:'James Gunn',
                Stars:['Chris Pratt','Vin Diesel','Bradley Cooper','Zoe Saldana']
                },

                {
                Title:'Kandahar',
                Year:'(2023)',
                certificate:'R',
                Time:'119 min',
                genre:[ 'Action', 'Thriller'],
                textmuted: 'A CIA operative and his translator flee from special forces in Afghanistan after exposing a covert mission.',
                Director:'Ric Roman Waugh',
                Stars:['Tom Rhys Harries','Farhad Bagheri','Gerard Butler','Mitchell LaFortune']
                },

                {
                Title:'Jailer',
                Year:'(I) (2023)',
                certificate:'',
                Time:'168 min',
                genre:[ 'Action', 'Comedy', 'Crime'],
                textmuted: "A retired jailer goes on a manhunt to find his son's killers. But the road leads him to a familiar, albeit a bit darker place. Can he emerge from this complex situation successfully?",
                Director:'Nelson Dilipkumar',
                Stars:['Rajinikanth','Mohanlal','Shivarajkumar','Jackie Shroff']
                },

                {
                Title:'Snow White',
                Year:'(2024)',
                certificate:'',
                Time:'',
                genre:[ 'Adventure', 'Drama', 'Family'],
                textmuted: "Live-action adaptation of the 1937 Disney animated film 'Snow White and the Seven Dwarfs'.",
                Director:'Marc Webb',
                Stars:['Gal Gadot','Rachel Zegler','Andrew Burnap','Ansu Kabia']
                },

                {
                Title:'Top Gun: Maverick',
                Year:'(2022)',
                certificate:'PG-13',
                Time:'130 min',
                genre:[ 'Action', 'Drama'],
                textmuted: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
                Director:'Joseph Kosinski',
                Stars:['Tom Cruise','Jennifer Connelly','Miles Teller','Val Kilmer']
                },

                {
                Title:'The Collective',
                Year:'(2023)',
                certificate:'',
                Time:'86 min',
                genre:[ 'Action'],
                textmuted: 'A young recruit to a mysterious agency of assassins finds himself going rogue on his first assignment, tracking down a dangerous group of human traffickers.',
                Director:'Tom DeNucci',
                Stars:['Lucas Till','Ruby Rose','Don Johnson','Mercedes Varnado']
                },

                {
                Title:'The Batman',
                Year:'(2022)',
                certificate:'PG-13',
                Time:'176 min',
                genre:[ 'Action', 'Crime', 'Drama'],
                textmuted: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
                Director:'Matt Reeves',
                Stars:['Robert Pattinson','Zoë Kravitz','Jeffrey Wright','Colin Farrell']
                },

                {
                Title:'Elemental',
                Year:'(2023)',
                certificate:'PG',
                Time:'101 min',
                genre:[ 'Animation', 'Adventure', 'Comedy'],
                textmuted: 'Follows Ember and Wade, in a city where fire-, water-, land- and air-residents live together.',
                Director:'Peter Sohn',
                Stars:['Leah Lewis','Mamoudou Athie','Ronnie Del Carmen','Shila Ommi']
                },

                {
                Title:'The Beanie Bubble',
                Year:'(2023)',
                certificate:'R',
                Time:'110 min',
                genre:[ 'Comedy','Drama'],
                textmuted: 'Ty Warner was a frustrated toy salesman until his collaboration with three women grew his idea into the biggest toy craze in history.',
                Director:'Kristin Gore',
                Stars:['Damian Kulash','Zach Galifianakis','Elizabeth Banks','Sarah Snook']
                },

                {
                Title:'Tenet',
                Year:'(2020)',
                certificate:'PG-13',
                Time:'150 min',
                genre:[ 'Action', 'Sci-Fi', 'Thriller'],
                textmuted: 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
                Director:'Christopher Nolan',
                Stars:['John David Washington','Robert Pattinson','Elizabeth Debicki','Juhan Ulfsak']
                },

                {
                Title:'The Out-Laws',
                Year:'(2023)',
                certificate:'R',
                Time:'95 min',
                genre:[ 'Action', 'Comedy', 'Crime'],
                textmuted: 'A straight-laced bank manager about to marry the love of his life. When his bank is held up by infamous Ghost Bandits during his wedding week, he believes his future in-laws who just arrived in town, are the infamous Out-Laws.',
                Director:'Tyler Spindel',
                Stars:['Adam Devine','Pierce Brosnan','Ellen Barkin','Nina Dobrev']
                },

                {
                Title:'Soulcatcher',
                Year:'(2023)',
                certificate:'TV-MA',
                Time:'98 min',
                genre:[ 'Action', 'Adventure', 'Thriller'],
                textmuted: 'A military contractor hired to seize a weapon that turns people into savage killers seeks revenge when his brother falls victim to the device.',
                Director:'Daniel Markowicz',
                Stars:['Piotr Witkowski','Jacek Koman','Jacek Poniedzialek','Mariusz Bonaszewski']
                },

                {
                Title:'The Whale',
                Year:'(2022)',
                certificate:'R',
                Time:'117 min',
                genre:[ 'Drama'],
                textmuted: 'A reclusive, morbidly obese English teacher attempts to reconnect with his estranged teenage daughter.',
                Director:'Darren Aronofsky',
                Stars:['Brendan Fraser','Sadie Sink','Ty Simpkins','Hong Chau']
                },

                {
                Title:'Knock at the Cabin',
                Year:'(2023)',
                certificate:'R',
                Time:'100 min',
                genre:[ 'Horror', 'Mystery', 'Thriller'],
                textmuted: 'While vacationing, a girl and her parents are taken hostage by armed strangers who demand that the family make a choice to avert the apocalypse.',
                Director:'M. Night Shyamalan',
                Stars:['Dave Bautista','Jonathan Groff','Ben Aldridge','Nikki Amuka-Bird']
                },

                {
                Title:'Evil Dead Rise',
                Year:'(2023)',
                certificate:'R',
                Time:'96 min',
                genre:[ 'Horror'],
                textmuted: 'A twisted tale of two estranged sisters whose reunion is cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival as they face the most nightmarish version of family imaginable.',
                Director:'Lee Cronin',
                Stars:['Mirabai Pease','Richard Crouchley','Anna-Maree Thomas','Lily Sullivan']
                },

                {
                Title:'Once Upon a Time in Hollywood',
                Year:'(2019)',
                certificate:'R',
                Time:'161 min',
                genre:[ 'Comedy', 'Drama'],
                textmuted: "A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood's Golden Age in 1969 Los Angeles.",
                Director:'Quentin Tarantino',
                Stars:['Leonardo DiCaprio','Brad Pitt','Margot Robbie','Emile Hirsch']
                },

                {
                Title:'Miraculous: Ladybug & Cat Noir, the Movie',
                Year:'(2023)',
                certificate:'PG',
                Time:'105 min',
                genre:[ 'Animation', 'Action', 'Adventure'],
                textmuted: "Ordinary teenager Marinette's life in Paris goes superhuman when she becomes Ladybug. Bestowed with magical powers of creation, Ladybug must unite with her opposite, Cat Noir, to save Paris as a new villain unleashes chaos unto the city.",
                Director:'Jeremy Zag',
                Stars:['Annouck Hautbois','Benjamin Bollen','Antoine Tomé','Fanny Bloc']
                },

                {
                Title:'Spider-Man: Into the Spider-Verse',
                Year:'(2018)',
                certificate:'PG',
                Time:'117 min',
                genre:[ 'Animation', 'Action', 'Adventure'],
                textmuted: 'Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
                Director:'Bob Persichetti',
                Stars:['Peter Ramsey','Rodney Rothman','Shameik Moore','Jake Johnson']
                },

                {
                Title:'The Exorcist: Believer',
                Year:'(2023)',
                certificate:'R',
                Time:'121 min',
                genre:[ 'Horror'],
                textmuted: 'Sequel to the 1973 film about a 12-year-old girl who is possessed by a mysterious demonic entity, forcing her mother to seek the help of two priests to save her.',
                Director:'David Gordon Green',
                Stars:['Jennifer Nettles','Ellen Burstyn','Leslie Odom Jr.','Ann Dowd']
                },

                {
                Title:"Harry Potter and the Sorcerer's Stone",
                Year:'(2001)',
                certificate:'PG',
                Time:'152 min',
                genre:[ 'Adventure', 'Family', 'Fantasy'],
                textmuted: 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',
                Director:'Chris Columbus',
                Stars:['Daniel Radcliffe','Rupert Grint','Richard Harris','Maggie Smith']
                },

                {
                Title:'The Prestige',
                Year:'(2006)',
                certificate:'PG-13',
                Time:'130 min',
                genre:[ 'Drama', 'Mystery', 'Sci-Fi'],
                textmuted: 'After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.',
                Director:'Christopher Nolan',
                Stars:['Christian Bale','Hugh Jackman','Scarlett Johansson','Michael Caine']
                },

                {
                Title:'Everything Everywhere All at Once',
                Year:'(2022)',
                certificate:'R',
                Time:'139 min',
                genre:[ 'Action', 'Adventure', 'Comedy'],
                textmuted: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.',
                Director:'Daniel Kwan',
                Stars:['Daniel Scheinert','Michelle Yeoh','Stephanie Hsu','Jamie Lee Curtis']
                },

                {
                Title:'Jesus Revolution',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'120 min',
                genre:[ 'Drama'],
                textmuted: 'The true story of a national spiritual awakening in the early 1970s and its origins within a community of teenage hippies in Southern California.',
                Director:'Jon Erwin',
                Stars:['Brent McCorkle','Joel Courtney','Jonathan Roumie','Kimberly Williams-Paisley']
                },

                {
                Title:'Extraction II',
                Year:'(2023)',
                certificate:'R',
                Time:'122 min',
                genre:[ 'Action', 'Thriller'],
                textmuted: 'After barely surviving his grievous wounds from his mission in Dhaka, Bangladesh, Tyler Rake is back, and his team is ready to take on their next mission.',
                Director:'Sam Hargrave',
                Stars:['Chris Hemsworth','Golshifteh Farahani','Adam Bessa','Tornike Gogrichiani']
                },

                {
                Title:'Sorcerer',
                Year:'(1977)',
                certificate:'PG',
                Time:'121 min',
                genre:[ 'Adventure', 'Drama', 'Thriller'],
                textmuted: 'Four unfortunate men from different parts of the globe agree to risk their lives transporting gallons of nitroglycerin across dangerous Latin American jungle.',
                Director:'William Friedkin',
                Stars:['Roy Scheider','Bruno Cremer','Francisco Rabal','Amidou']
                },

                {
                Title:'Titanic',
                Year:'(1997)',
                certificate:'PG-13',
                Time:'194 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
                Director:'James Cameron',
                Stars:['Leonardo DiCaprio','Kate Winslet','Billy Zane','Kathy Bates']
                },

                {
                Title:'Puss in Boots: The Last Wish',
                Year:'(2022)',
                certificate:'PG',
                Time:'102 min',
                genre:[ 'Animation', 'Adventure', 'Comedy'],
                textmuted: 'When Puss in Boots discovers that his passion for adventure has taken its toll and he has burned through eight of his nine lives, he launches an epic journey to restore them by finding the mythical Last Wish.',
                Director:'Joel Crawford',
                Stars:['Januel Mercado','Antonio Banderas','Salma Hayek','Harvey Guillén']
                },

                {
                Title:"Pee-wee's Big Adventure",
                Year:'(1985)',
                certificate:'PG',
                Time:'91 min',
                genre:[ 'Adventure', 'Comedy', 'Family'],
                textmuted: 'When eccentric man-child Pee-wee Herman gets his beloved bike stolen in broad daylight, he sets out across the U.S. on the adventure of his life.',
                Director:'Tim Burton',
                Stars:['Paul Reubens','Elizabeth Daily','Mark Holton','Diane Salinger']
                },

                {
                Title:'The Punisher',
                Year:'(2004)',
                certificate:'R',
                Time:'124 min',
                genre:[ 'Action', 'Crime', 'Drama'],
                textmuted: 'An undercover FBI agent becomes a vigilante and sets out to unleash his wrath upon the corrupt businessman who slaughtered his entire family at a reunion.',
                Director:'Jonathan Hensleigh',
                Stars:['Thomas Jane','John Travolta','Samantha Mathis','Laura Harring']
                },

                {
                Title:'Pulp Fiction',
                Year:'(1994)',
                certificate:'R',
                Time:'154 min',
                genre:[ 'Crime', 'Drama'],
                textmuted: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
                Director:'Quentin Tarantino',
                Stars:['John Travolta','Uma Thurman','Samuel L. Jackson','Bruce Willis']
                },

                {
                Title:'Dune: Part Two',
                Year:'(2023)',
                certificate:'',
                Time:'',
                genre:[ 'Action', 'Adventure', 'Drama'],
                textmuted: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
                Director:'Denis Villeneuve',
                Stars:['Florence Pugh','Rebecca Ferguson','Timothée Chalamet','Zendaya']
                },

                {
                Title:'Sisu',
                Year:'(2022)',
                certificate:'R',
                Time:'91 min',
                genre:[ 'Action', 'War'],
                textmuted: 'When an ex-soldier who discovers gold in the Lapland wilderness tries to take the loot into the city, Nazi soldiers led by a brutal SS officer battle him.',
                Director:'Jalmari Helander',
                Stars:['Jorma Tommila','Aksel Hennie','Jack Doolan','Mimosa Willamo']
                },

                {
                Title:'Bullet Train',
                Year:'(I) (2022)',
                certificate:'R',
                Time:'127 min',
                genre:[ 'Action', 'Comedy', 'Thriller'],
                textmuted: 'Five assassins aboard a swiftly-moving bullet train find out that their missions have something in common.',
                Director:'David Leitch',
                Stars:['Brad Pitt','Joey King','Aaron Taylor-Johnson','Brian Tyree Henry']
                },

                {
                Title:'Sympathy for the Devil',
                Year:'(2023)',
                certificate:'',
                Time:'90 min',
                genre:[ 'Action', 'Thriller'],
                textmuted: 'After being forced to drive a mysterious passenger at gunpoint, a man finds himself in a high-stakes game of cat and mouse where it becomes clear that not everything is as it seems.',
                Director:'Yuval Adler',
                Stars:['Nicolas Cage','Joel Kinnaman','Alexis Zollicoffer','Cameron Lee Price']
                },

                {
                Title:'Fair Play',
                Year:'(2023)',
                certificate:'R',
                Time:'113 min',
                genre:[ 'Drama', 'Mystery', 'Thriller'],
                textmuted: "An unexpected promotion at a cutthroat hedge fund pushes a young couple's relationship to the brink, threatening to unravel far more than their recent engagement.",
                Director:'Chloe Domont',
                Stars:['Phoebe Dynevor','Alden Ehrenreich','Eddie Marsan','Rich Sommer']
                },

                {
                Title:'Teenage Mutant Ninja Turtles',
                Year:'(1990)',
                certificate:'PG',
                Time:'93 min',
                genre:[ 'Action', 'Adventure', 'Comedy'],
                textmuted: 'Four teenage mutant ninja turtles emerge from the shadows to protect New York City from a gang of criminal ninjas.',
                Director:'Steve Barron',
                Stars:['Judith Hoag','Elias Koteas','Josh Pais','David Forman']
                },

                {
                Title:'Midsommar',
                Year:'(2019)',
                certificate:'R',
                Time:'148 min',
                genre:[ 'Drama', 'Horror', 'Mystery'],
                textmuted: "A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.",
                Director:'Ari Aster',
                Stars:['Florence Pugh','Jack Reynor','Vilhelm Blomgren','William Jackson Harper']
                },

                {
                Title:'The Menu',
                Year:'(2022)',
                certificate:'R',
                Time:'107 min',
                genre:[ 'Comedy', 'Horror', 'Thriller'],
                textmuted: 'A young couple travels to a remote island to eat at an exclusive restaurant where the chef has prepared a lavish menu, with some shocking surprises.',
                Director:'Mark Mylod',
                Stars:['Ralph Fiennes','Anya Taylor-Joy','Nicholas Hoult','Hong Chau']
                },

                {
                Title:'Scream VI',
                Year:'(2023)',
                certificate:'R',
                Time:'122 min',
                genre:[ 'Horror', 'Mystery', 'Thriller'],
                textmuted: 'In the next installment, the survivors of the Ghostface killings leave Woodsboro behind and start a fresh chapter in New York City.',
                Director:'Matt Bettinelli-Olpin',
                Stars:['Tyler Gillett','Courteney Cox','Melissa Barrera','Jenna Ortega']
                },

                {
                Title:'Insidious',
                Year:'(I) (2010)',
                certificate:'PG-13',
                Time:'103 min',
                genre:[ 'Horror', 'Mystery', 'Thriller'],
                textmuted: 'A family looks to prevent evil spirits from trapping their comatose child in a realm called The Further.',
                Director:'James Wan',
                Stars:['Patrick Wilson','Rose Byrne','Ty Simpkins','Lin Shaye']
                },

                {
                Title:'Blade Runner 2049',
                Year:'(2017)',
                certificate:'R',
                Time:'164 min',
                genre:[ 'Action', 'Drama', 'Mystery'],
                textmuted: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
                Director:'Denis Villeneuve',
                Stars:['Harrison Ford','Ryan Gosling','Ana de Armas','Dave Bautista']
                },

                {
                Title:'Beau Is Afraid',
                Year:'(2023)',
                certificate:'R',
                Time:'179 min',
                genre:[ 'Comedy', 'Drama', 'Horror'],
                textmuted: 'Following the sudden death of his mother, a mild-mannered but anxiety-ridden man confronts his darkest fears as he embarks on an epic, Kafkaesque odyssey back home.',
                Director:'Ari Aster',
                Stars:['Joaquin Phoenix','Patti LuPone','Amy Ryan','Nathan Lane']
                },

                {
                Title:'65',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'93 min',
                genre:[ 'Action', 'Adventure', 'Drama'],
                textmuted: "An astronaut crash lands on a mysterious planet only to discover he's not alone.",
                Director:'Scott Beck',
                Stars:['Bryan Woods','Adam Driver','Ariana Greenblatt','Chloe Coleman']
                },

                {
                Title:"Don't Worry Darling",
                Year:'(I) (2022)',
                certificate:'R',
                Time:'123 min',
                genre:[ 'Drama', 'Mystery',' Thriller'],
                textmuted: 'While her husband leaves home everyday to work in a top secret facility, a young 1950s housewife begins to question her life when she notices strange behavior from the other wives in the neighborhood.',
                Director:'Olivia Wilde',
                Stars:['Florence Pugh','Harry Styles','Chris Pine','Olivia Wilde']
                },

                {
                Title:'Mission: Impossible - Fallout',
                Year:'(2018)',
                certificate:'PG-13',
                Time:'147 min',
                genre:[ 'Action', 'Adventure', 'Thriller'],
                textmuted: 'Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.',
                Director:'Christopher McQuarrie',
                Stars:['Tom Cruise','Henry Cavill','Ving Rhames','Simon Pegg']
                },

                {
                Title:'The Passenger',
                Year:'(2023 TV Movie)',
                certificate:'Unrated',
                Time:'94 min',
                genre:[ 'Horror'],
                textmuted: 'A man is forced to face his fears and confront his troubled past. He must find a way to survive when his co-worker snaps and goes on a violent killing spree.',
                Director:'Carter Smith',
                Stars:['Merah Benoit','Johnny Berchtold','Betsy Borrego','Angie Dillard']
                },

                {
                Title:'Strays',
                Year:'(2023)',
                certificate:'R',
                Time:'93 min',
                genre:[ 'Animation', 'Adventure', 'Comedy'],
                textmuted: 'An abandoned dog teams up with other strays to get revenge on his former owner.',
                Director:'Josh Greenbaum',
                Stars:['Will Ferrell','Jamie Foxx','Isla Fisher','Randall Park']
                },

                {
                Title:'Guardians of the Galaxy Vol. 2',
                Year:'(2017)',
                certificate:'PG-13',
                Time:'136 min',
                genre:[ 'Action', 'Adventure', 'Comedy'],
                textmuted: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
                Director:'James Gunn',
                Stars:['Chris Pratt','Zoe Saldana','Dave Bautista','Vin Diesel']
                },

                {
                Title:'The Lincoln Lawyer',
                Year:'(2011)',
                certificate:'R',
                Time:'118 min',
                genre:[ 'Crime', 'Drama', 'Mystery'],
                textmuted: 'A lawyer defending a wealthy man begins to believe his client is guilty of more than just one crime.',
                Director:'Brad Furman',
                Stars:['Matthew McConaughey','Marisa Tomei','Ryan Phillippe','William H. Macy']
                },

                {
                Title:'Pride & Prejudice',
                Year:'(2005)',
                certificate:'PG',
                Time:'129 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: 'Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class. Can each overcome their own pride and prejudice?',
                Director:'Joe Wright',
                Stars:['Keira Knightley','Matthew Macfadyen','Brenda Blethyn','Donald Sutherland']
                },

                {
                Title:'Love',
                Year:'(II) (2015)',
                certificate:'TV-MA',
                Time:'135 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: 'Murphy is an American living in Paris who enters a highly sexually and emotionally charged relationship with Electra. Unaware of the effect it will have on their relationship, they invite their pretty neighbor into their bed.',
                Director:'Gaspar Noé',
                Stars:['Aomi Muyock','Karl Glusman','Klara Kristin','Juan Saavedra']
                },

                {
                Title:'Inglourious Basterds',
                Year:'(2009)',
                certificate:'R',
                Time:'153 min',
                genre:[ 'Adventure', 'Drama, War'],
                textmuted: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
                Director:'Quentin Tarantino',
                Stars:['Brad Pitt','Diane Kruger','Eli Roth','Mélanie Laurent']
                },

                {
                Title:'OMG 2',
                Year:'(2023)',
                certificate:'',
                Time:'156 min',
                genre:[ 'Comedy', 'Drama'],
                textmuted: 'An unhappy civilian asks the court to mandate comprehensive education in schools in a dramatic yet amusing courtroom play.',
                Director:'Amit Rai',
                Stars:['Akshay Kumar','Pankaj Tripathi','Yami Gautam','Aamir Naik']
                },

                {
                Title:'The Dark Knight Rises',
                Year:'(2012)',
                certificate:'PG-13',
                Time:'164 min',
                genre:[ 'Action', 'Drama', 'Thriller'],
                textmuted: "Eight years after the Joker's reign of chaos, Batman is coerced out of exile with the assistance of the mysterious Selina Kyle in order to defend Gotham City from the vicious guerrilla terrorist Bane.",
                Director:'Christopher Nolan',
                Stars:['Christian Bale','Tom Hardy','Anne Hathaway','Gary Oldman']
                },

                {
                Title:'Spider-Man: No Way Home',
                Year:'(2021)',
                certificate:'PG-13',
                Time:'148 min',
                genre:[ 'Action', 'Adventure', 'Fantasy'],
                textmuted: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
                Director:'Jon Watts',
                Stars:['Tom Holland','Zendaya','Benedict Cumberbatch','Jacob Batalon']
                },

                {
                Title:'Memento',
                Year:'(2000)',
                certificate:'R',
                Time:'113 min',
                genre:[ 'Mystery', 'Thriller'],
                textmuted: "A man with short-term memory loss attempts to track down his wife's murderer.",
                Director:'Christopher Nolan',
                Stars:['Guy Pearce','Carrie-Anne Moss','Joe Pantoliano','Mark Boone Junior']
                },

                {
                Title:'Jaws',
                Year:'(1975)',
                certificate:'PG',
                Time:'124 min',
                genre:[ 'Adventure', 'Mystery', 'Thriller'],
                textmuted: "When a killer shark unleashes chaos on a beach community off Cape Cod, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.",
                Director:'Steven Spielberg',
                Stars:['Roy Scheider','Robert Shaw','Richard Dreyfuss','Lorraine Gary']
                },

                {
                Title:'Jules',
                Year:'(I) (2023)',
                certificate:'PG-13',
                Time:'87 min',
                genre:[ 'Comedy', 'Drama', 'Sci-Fi'],
                textmuted: 'Milton lives a quiet life of routine in a small western Pennsylvania town, but finds his day upended when a UFO and its extra-terrestrial passenger crash land in his backyard.',
                Director:'Marc Turtletaub',
                Stars:['Ben Kingsley','Harriet Sansom Harris','Jane Curtin','Teddy Cañez']
                },

                {
                Title:'Non-Stop',
                Year:'(2014)',
                certificate:'PG-13',
                Time:'106 min',
                genre:[ 'Action', 'Mystery', 'Thriller'],
                textmuted: 'An air marshal springs into action during a transatlantic flight after receiving a series of text messages demanding $150 million into an off-shore account, or someone will die every 20 minutes.',
                Director:'Jaume Collet-Serra',
                Stars:['Liam Neeson','Julianne Moore','Scoot McNairy','Michelle Dockery']
                },

                {
                Title:'The Equalizer 3',
                Year:'(2023)',
                certificate:'R',
                Time:'109 min',
                genre:[ 'Action', 'Crime', 'Thriller'],
                textmuted: "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia.",
                Director:'Antoine Fuqua',
                Stars:['Denzel Washington','Dakota Fanning','Eugenio Mastrandrea','David Denman']
                },

                {
                Title:'Joker: Folie à Deux',
                Year:'(2024)',
                certificate:'',
                Time:'',
                genre:[ 'Crime', 'Drama', 'Musical'],
                textmuted: "Plot unknown. Sequel to the 2019 film 'Joker.'",
                Director:'Todd Phillips',
                Stars:['Zazie Beetz','Joaquin Phoenix','Catherine Keener','Brendan Gleeson']
                },

                {
                Title:'Air',
                Year:'(I) (2023)',
                certificate:'R',
                Time:'111 min',
                genre:[ 'Drama', 'Sport'],
                textmuted: 'Follows the history of sports marketing executive Sonny Vaccaro, and how he led Nike in its pursuit of the greatest athlete in the history of basketball, Michael Jordan.',
                Director:'Ben Affleck',
                Stars:['Matt Damon','Jason Bateman','Ben Affleck','Chris Messina']
                },

                {
                Title:'Joker',
                Year:'(I) (2019)',
                certificate:'R',
                Time:'122 min',
                genre:[ 'Crime',' Drama', 'Thriller'],
                textmuted: "The rise of Arthur Fleck, from aspiring stand-up comedian and pariah to Gotham's clown prince and leader of the revolution.",
                Director:'Todd Phillips',
                Stars:['Joaquin Phoenix','Robert De Niro','Zazie Beetz','Frances Conroy']
                },

                {
                Title:'Drive',
                Year:'(I) (2011)',
                certificate:'R',
                Time:'100 min',
                genre:[ 'Action', 'Drama'],
                textmuted: "A mysterious Hollywood action film stuntman gets in trouble with gangsters when he tries to help his neighbor's husband rob a pawn shop while serving as his getaway driver.",
                Director:'Nicolas Winding Refn',
                Stars:['Ryan Gosling','Carey Mulligan','Bryan Cranston','Albert Brooks']
                },

                {
                Title:'Renfield',
                Year:'(2023)',
                certificate:'R',
                Time:'93 min',
                genre:[ 'Comedy', 'Fantasy', 'Horror'],
                textmuted: "Renfield, Dracula's henchman and inmate at the lunatic asylum for decades, longs for a life away from the Count, his various demands, and all of the bloodshed that comes with them.",
                Director:'Chris McKay',
                Stars:['Nicholas Hoult','Nicolas Cage','Awkwafina','Ben Schwartz']
                },

                {
                Title:'Jurassic Park',
                Year:'(1993)',
                certificate:'PG-13',
                Time:'127 min',
                genre:[ 'Action', 'Adventure', 'Sci-Fi'],
                textmuted: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
                Director:'Steven Spielberg',
                Stars:['Sam Neill','Laura Dern','Jeff Goldblum','Richard Attenborough']
                },

                {
                Title:'Mission: Impossible',
                Year:'(1996)',
                certificate:'PG-13',
                Time:'110 min',
                genre:[ 'Action', 'Adventure', 'Thriller'],
                textmuted: 'An American agent, under false suspicion of disloyalty, must discover and expose the real spy without the help of his organization.',
                Director:'Brian De Palma',
                Stars:['Tom Cruise','Jon Voight','Emmanuelle Béart','Henry Czerny']
                },

                {
                Title:'To Live and Die in L.A.',
                Year:'(1985)',
                certificate:'R',
                Time:'116 min',
                genre:[ 'Action', 'Crime', 'Drama'],
                textmuted: 'A fearless Secret Service agent will stop at nothing to bring down the counterfeiter who killed his partner.',
                Director:'William Friedkin',
                Stars:['William Petersen','Willem Dafoe','Jane Leeves','Cherise Bates']
                },

                {
                Title:'Making Waves',
                Year:'(2023 TV Movie)',
                certificate:'',
                Time:'',
                genre:[ 'Romance'],
                textmuted: 'When a music label executive goes to a festival on the Outer Banks to beat out the competition for an elusive new band, she discovers that the group is fronted by her childhood summer sweetheart.',
                Director:'Terry Ingram',
                Stars:['Holland Roden','Corey Cott','Jon Bryant','Michelle Creber']
                },

                {
                Title:'The French Connection',
                Year:'(1971)',
                certificate:'R',
                Time:'104 min',
                genre:[ 'Action', 'Crime', 'Drama'],
                textmuted: 'A pair of NYPD detectives in the Narcotics Bureau stumble onto a heroin smuggling ring based in Marseilles, but stopping them and capturing their leaders proves an elusive goal.',
                Director:'William Friedkin',
                Stars:['Gene Hackman','Roy Scheider','Fernando Rey','Tony Lo Bianco']
                },

                {
                Title:'The Lord of the Rings: The Fellowship of the Ring',
                Year:'(2001)',
                certificate:'PG-13',
                Time:'178 min',
                genre:[ 'Action', 'Adventure', 'Drama'],
                textmuted: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
                Director:'Peter Jackson',
                Stars:['Elijah Wood','Ian McKellen','Orlando Bloom','Sean Bean']
                },

                {
                Title:'The Fast and the Furious',
                Year:'(2001)',
                certificate:'PG-13',
                Time:'106 min',
                genre:[ 'Action', 'Crime', 'Thriller'],
                textmuted: "Los Angeles police officer Brian O'Conner must decide where his loyalty really lies when he becomes enamored with the street racing world he has been sent undercover to destroy.",
                Director:'Rob Cohen',
                Stars:['Vin Diesel','Paul Walker','Michelle Rodriguez','Jordana Brewster']
                },

                {
                Title:'No Country for Old Men',
                Year:'(2007)',
                certificate:'R',
                Time:'122 min',
                genre:[ 'Crime', 'Drama', 'Thriller'],
                textmuted: 'Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.',
                Director:'Ethan Coen',
                Stars:['Joel Coen','Tommy Lee Jones','Javier Bardem','Josh Brolin']
                },

                {
                Title:'Expend4bles',
                Year:'(2023)',
                certificate:'R',
                Time:'103 min',
                genre:[ 'Action', 'Adventure', 'Thriller'],
                textmuted: 'The Expendables will square up against: an arms dealer who commands the might of a massive private army.',
                Director:'Scott Waugh',
                Stars:['Jason Statham','50 Cent','Megan Fox','Dolph Lundgren']
                },

                {
                Title:'Fight Club',
                Year:'(1999)',
                certificate:'R',
                Time:'139 min',
                genre:[ 'Drama'],
                textmuted: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
                Director:'David Fincher',
                Stars:['Brad Pitt','Edward Norton','Meat Loaf','Zach Grenier']
                },

                {
                Title:'Cocaine Bear',
                Year:'(2023)',
                certificate:'R',
                Time:'95 min',
                genre:[ 'Comedy', 'Thriller'],
                textmuted: 'An oddball group of cops, criminals, tourists and teens converge on a Georgia forest where a huge black bear goes on a murderous rampage after unintentionally ingesting cocaine.',
                Director:'Elizabeth Banks',
                Stars:['Keri Russell','Alden Ehrenreich',"O'Shea Jackson Jr.",'Ray Liotta']
                },

                {
                Title:'Infinity Pool',
                Year:'(2023)',
                certificate:'R',
                Time:'117 min',
                genre:[ 'Crime', 'Horror', 'Mystery'],
                textmuted: "James and Em Foster are enjoying an all-inclusive beach vacation in the fictional island of La Tolqa, when a fatal accident exposes the resort's perverse subculture of hedonistic tourism, reckless violence and surreal horrors.",
                Director:'Brandon Cronenberg',
                Stars:['Alexander Skarsgård','Mia Goth','Cleopatra Coleman','Dunja Sepcic']
                },

                {
                Title:'Prisoners',
                Year:'(2013)',
                certificate:'R',
                Time:'153 min',
                genre:[ 'Crime', 'Drama', 'Mystery'],
                textmuted: "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads and the pressure mounts.",
                Director:'Denis Villeneuve',
                Stars:['Hugh Jackman','Jake Gyllenhaal','Viola Davis','Melissa Leo']
                },

                {
                Title:'Batman Begins',
                Year:'(2005)',
                certificate:'PG-13',
                Time:'140 min',
                genre:[ 'Action', 'Crime', 'Drama'],
                textmuted: "After witnessing his parents' death, Bruce learns the art of fighting to confront injustice. When he returns to Gotham as Batman, he must stop a secret society that intends to destroy the city.",
                Director:'Christopher Nolan',
                Stars:['Christian Bale','Michael Caine','Ken Watanabe','Liam Neeson']
                },

                {
                Title:'Mission: Impossible - Rogue Nation',
                Year:'(2015)',
                certificate:'PG-13',
                Time:'131 min',
                genre:[ 'Action', 'Adventure', 'Thriller'],
                textmuted: 'Ethan and his team take on their most impossible mission yet when they have to eradicate an international rogue organization as highly skilled as they are and committed to destroying the IMF.',
                Director:'Christopher McQuarrie',
                Stars:['Tom Cruise','Rebecca Ferguson','Jeremy Renner','Simon Pegg']
                },

                {
                Title:'Twister',
                Year:'(I) (1996)',
                certificate:'PG-13',
                Time:'113 min',
                genre:[ 'Action', 'Adventure', 'Thriller'],
                textmuted: 'Bill and Jo Harding, advanced storm chasers on the brink of divorce, must join together to create an advanced weather alert system by putting themselves in the cross-hairs of extremely violent tornadoes.',
                Director:'Jan de Bont',
                Stars:['Helen Hunt','Bill Paxton','Cary Elwes','Jami Gertz']
                },

                {
                Title:'Avengers: Endgame',
                Year:'(2019)',
                certificate:'PG-13',
                Time:'181 min',
                genre:[ 'Action', 'Adventure', 'Drama'],
                textmuted: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
                Director:'Anthony Russo',
                Stars:['Joe Russo','Robert Downey Jr.','Chris Evans','Mark Ruffalo']
                },

                {
                Title:'Theater Camp',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'92 min',
                genre:[ 'Comedy'],
                textmuted: "The eccentric staff of a rundown theater camp in upstate New York must band together with the beloved founder's bro-y son to keep the camp afloat.",
                Director:'Molly Gordon',
                Stars:['Nick Lieberman','Ben Platt','Molly Gordon','Noah Galvin']
                },

                {
                Title:'Heat',
                Year:'(1995)',
                certificate:'R',
                Time:'170 min',
                genre:[ 'Action', 'Crime', 'Drama'],
                textmuted: 'A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a clue at their latest heist.',
                Director:'Michael Mann',
                Stars:['Al Pacino','Robert De Niro','Val Kilmer','Jon Voight']
                },

                {
                Title:'Saw',
                Year:'(2004)',
                certificate:'R',
                Time:'103 min',
                genre:[ 'Horror', 'Mystery', 'Thriller'],
                textmuted: "Two strangers awaken in a room with no recollection of how they got there, and soon discover they're pawns in a deadly game perpetrated by a notorious serial killer.",
                Director:'James Wan',
                Stars:['Cary Elwes','Leigh Whannell','Danny Glover','Ken Leung']
                },

                {
                Title:'The River Wild',
                Year:'(1994)',
                certificate:'PG-13',
                Time:'111 min',
                genre:[ 'Adventure', 'Crime', 'Thriller'],
                textmuted: 'Rafting expert Gail takes on a pair of armed killers while navigating a spectacularly violent river.',
                Director:'Curtis Hanson',
                Stars:['Meryl Streep','Kevin Bacon','David Strathairn','Joseph Mazzello']
                },

                {
                Title:"Schindler's List",
                Year:'(1993)',
                certificate:'R',
                Time:'195 min',
                genre:[ 'Biography', 'Drama', 'History'],
                textmuted: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
                Director:'Steven Spielberg',
                Stars:['Liam Neeson','Ralph Fiennes','Ben Kingsley','Caroline Goodall']
                },

                {
                Title:'Nefarious',
                Year:'(II) (2023)',
                certificate:'R',
                Time:'97 min',
                genre:[ 'Horror', 'Thriller'],
                textmuted: 'On the day of his scheduled execution, a convicted serial killer gets a psychiatric evaluation during which he claims he is a demon, and further claims that before their time is over, the psychiatrist will commit three murders of his own.',
                Director:'Chuck Konzelman',
                Stars:['Cary Solomon','Sean Patrick Flanery','Jordan Belfi','Tom Ohmer']
                },

                {
                Title:'The Hunger Games: The Ballad of Songbirds and Snakes',
                Year:'(2023)',
                certificate:'',
                Time:'165 min',
                genre:[ 'Action', 'Adventure', 'Drama'],
                textmuted: 'Coriolanus Snow mentors and develops feelings for the female District 12 tribute during the 10th Hunger Games.',
                Director:'Francis Lawrence',
                Stars:['Rachel Zegler','Jason Schwartzman','Hunter Schafer','Viola Davis']
                },

                {
                Title:'Back to the Future',
                Year:'(1985)',
                certificate:'PG',
                Time:'116 min',
                genre:[ 'Adventure', 'Comedy', 'Sci-Fi'],
                textmuted: 'Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
                Director:'Robert Zemeckis',
                Stars:['Michael J. Fox','Christopher Lloyd','Lea Thompson','Crispin Glover']
                },

                {
                Title:'A Haunting in Venice',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'103 min',
                genre:[ 'Crime', 'Drama', 'Horror'],
                textmuted: 'In post-World War II Venice, Poirot, now retired and living in his own exile, reluctantly attends a seance. But when one of the guests is murdered, it is up to the former detective to once again uncover the killer.',
                Director:'Kenneth Branagh',
                Stars:['Kelly Reilly','Michelle Yeoh','Jamie Dornan','Kenneth Branagh']
                },

                {
                Title:'Top Gun',
                Year:'(1986)',
                certificate:'PG',
                Time:'109 min',
                genre:[ 'Action', 'Drama'],
                textmuted: "As students at the United States Navy's elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom.",
                Director:'Tony Scott',
                Stars:['Tom Cruise','Tim Robbins','Kelly McGillis','Val Kilmer']
                },

                {
                Title:'Ant-Man and the Wasp: Quantumania',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'124 min',
                genre:[ 'Action', 'Adventure', 'Comedy'],
                textmuted: "Scott Lang and Hope Van Dyne are dragged into the Quantum Realm, along with Hope's parents and Scott's daughter Cassie. Together they must find a way to escape, but what secrets is Hope's mother hiding? And who is the mysterious Kang?",
                Director:'Peyton Reed',
                Stars:['Paul Rudd','Evangeline Lilly','Michael Douglas','Michelle Pfeiffer']
                },

                {
                Title:'American Psycho',
                Year:'(2000)',
                certificate:'R',
                Time:'102 min',
                genre:[ 'Crime', 'Drama',' Horror'],
                textmuted: 'A wealthy New York City investment banking executive, Patrick Bateman, hides his alternate psychopathic ego from his co-workers and friends as he delves deeper into his violent, hedonistic fantasies.',
                Director:'Mary Harron',
                Stars:['Christian Bale','Justin Theroux','Josh Lucas','Bill Sage']
                },

                {
                Title:'The Departed',
                Year:'(2006)',
                certificate:'R',
                Time:'151 min',
                genre:[ 'Crime', 'Drama', 'Thriller'],
                textmuted: 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.',
                Director:'Martin Scorsese',
                Stars:['Leonardo DiCaprio','Matt Damon','Jack Nicholson','Mark Wahlberg']
                },

                {
                Title:'Little Women',
                Year:'(2019)',
                certificate:'PG',
                Time:'135 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: 'Jo March reflects back and forth on her life, telling the beloved story of the March sisters - four young women, each determined to live life on her own terms.',
                Director:'Greta Gerwig',
                Stars:['Saoirse Ronan','Emma Watson','Florence Pugh','Eliza Scanlen']
                },

                {
                Title:'Nimona',
                Year:'(2023)',
                certificate:'PG',
                Time:'101 min',
                genre:[ 'Animation', 'Action', 'Adventure'],
                textmuted: "When a knight in a futuristic medieval world is framed for a crime he didn't commit, the only one who can help him prove his innocence is Nimona -- a mischievous teen who happens to be a shapeshifting creature he's sworn to destroy.",
                Director:'Nick Bruno',
                Stars:['Troy Quane','Chloë Grace Moretz','Riz Ahmed','Eugene Lee Yang']
                },

                {
                Title:'Alien',
                Year:'(1979)',
                certificate:'R',
                Time:'117 min',
                genre:[ 'Horror', 'Sci-Fi'],
                textmuted: 'The crew of a commercial spacecraft encounters a deadly lifeform after investigating an unknown transmission.',
                Director:'Ridley Scott',
                Stars:['Sigourney Weaver','Tom Skerritt','John Hurt','Veronica Cartwright']
                },

                {
                Title:'Triangle of Sadness',
                Year:'(2022)',
                certificate:'R',
                Time:'147 min',
                genre:[ 'Comedy', 'Drama'],
                textmuted: 'A fashion model celebrity couple join an eventful cruise for the super-rich.',
                Director:'Ruben Östlund',
                Stars:['Thobias Thorwid','Harris Dickinson','Charlbi Dean','Jiannis Moustos']
                },

                {
                Title:'Stand by Me',
                Year:'(1986)',
                certificate:'R',
                Time:'89 min',
                genre:[ 'Adventure', 'Drama'],
                textmuted: 'After the death of one of his friends, a writer recounts a childhood journey with his friends to find the body of a missing boy.',
                Director:'Rob Reiner',
                Stars:['Wil Wheaton','River Phoenix','Corey Feldman',"Jerry O'Connell"]
                },

                {
                Title:'American Mary',
                Year:'(2012)',
                certificate:'R',
                Time:'103 min',
                genre:[ 'Drama', 'Horror'],
                textmuted: 'The allure of easy money sends Mary Mason, a medical student, into the world of underground surgeries which ends up leaving more marks on her than her so-called \'freakish\' clients.',
                Director:'Jen Soska',
                Stars:['Sylvia Soska','Katharine Isabelle','Antonio Cupo','Tristan Risk']
                },

                {
                Title:'The Suicide Squad',
                Year:'(2021)',
                certificate:'R',
                Time:'132 min',
                genre:[ 'Action', 'Adventure', 'Comedy'],
                textmuted: 'Supervillains Harley Quinn, Bloodsport, Peacemaker, and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.',
                Director:'James Gunn',
                Stars:['Margot Robbie','Idris Elba','John Cena','Joel Kinnaman']
                },

                {
                Title:'What Comes Around',
                Year:'(2022)',
                certificate:'',
                Time:'85 min',
                genre:[ 'Drama', 'Thriller'],
                textmuted: 'In this immersive thriller directed by Amy Redford, a young love affair becomes a menacing game of cat and mouse. Nothing and no one are as they seem.',
                Director:'Amy Redford',
                Stars:['Summer Phoenix','Grace Van Dien','Kyle Gallner','Jesse Garcia']
                },

                {
                Title:"The Pope's Exorcist",
                Year:'(2023)',
                certificate:'R',
                Time:'103 min',
                genre:[ 'Horror', 'Thriller'],
                textmuted: "Follow Gabriele Amorth, the Vatican's leading exorcist, as he investigates the possession of a child and uncovers a conspiracy the Vatican has tried to keep secret.",
                Director:'Julius Avery',
                Stars:['Russell Crowe','Daniel Zovatto','Alex Essoe','Franco Nero']
                },

                {
                Title:'Django Unchained',
                Year:'(2012)',
                certificate:'R',
                Time:'165 min',
                genre:[ 'Drama', 'Western'],
                textmuted: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi.',
                Director:'Quentin Tarantino',
                Stars:['Jamie Foxx','Christoph Waltz','Leonardo DiCaprio','Kerry Washington']
                },

                {
                Title:'Indiana Jones and the Raiders of the Lost Ark',
                Year:'(1981)',
                certificate:'PG',
                Time:'115 min',
                genre:[ 'Action', 'Adventure'],
                textmuted: 'In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before the Nazis can obtain its awesome powers.',
                Director:'Steven Spielberg',
                Stars:['Harrison Ford','Karen Allen','Paul Freeman','John Rhys-Davies']
                },

                {
                Title:'Hotel Desire',
                Year:'(2011)',
                certificate:'TV-MA',
                Time:'38 min',
                genre:[ 'Short', 'Drama', 'Romance'],
                textmuted: 'A young single mother drops her son of at the bus stop to visit his dad in Paris. After being late for work, she almost gets fired. At the end of her duties she gets into a tricky situation which she handles, with the advice her colleague gave her.',
                Director:'Sergej Moya',
                Stars:['Saralisa Volm','Clemens Schick','Jan-Gregor Kremp','Herbert Knaup']
                },

                {
                Title:'John Wick',
                Year:'(2014)',
                certificate:'R',
                Time:'101 min',
                genre:[ 'Action', 'Crime', 'Thriller'],
                textmuted: 'An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car.',
                Director:'Chad Stahelski',
                Stars:['David Leitch','Keanu Reeves','Michael Nyqvist','Alfie Allen']
                },

                {
                Title:'Parasite',
                Year:'(2019)',
                certificate:'R',
                Time:'132 min',
                genre:[ 'Drama', 'Thriller'],
                textmuted: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
                Director:'Bong Joon Ho',
                Stars:['Song Kang-ho','Lee Sun-kyun','Cho Yeo-jeong','Choi Woo-sik']
                },

                {
                Title:'Beautiful Disaster',
                Year:'(2023)',
                certificate:'R',
                Time:'96 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: 'College freshman, Abby, tries to distance herself from her dark past while resisting her attraction to bad boy, Travis.',
                Director:'Roger Kumble',
                Stars:['Micky Dartford','Virginia Gardner','Libe Barer','Neil Bishop']
                },

                {
                Title:'The Silence of the Lambs',
                Year:'(1991)',
                certificate:'R',
                Time:'118 min',
                genre:[ 'Crime', 'Drama', 'Thriller'],
                textmuted: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
                Director:'Jonathan Demme',
                Stars:['Jodie Foster','Anthony Hopkins','Lawrence A. Bonney','Kasi Lemmons']
                },

                {
                Title:'Bones and All',
                Year:'(2022)',
                certificate:'R',
                Time:'131 min',
                genre:[ 'Drama', 'Horror', 'Romance'],
                textmuted: 'A young woman embarks on a 1000 mile odyssey through America where she meets a disenfranchised drifter. But all roads lead back to their terrifying pasts and to a final stand that will determine whether love can survive their otherness.',
                Director:'Luca Guadagnino',
                Stars:['Timothée Chalamet','Taylor Russell','Mark Rylance','Kendle Coffey']
                },

                {
                Title:'Gladiator',
                Year:'(2000)',
                certificate:'R',
                Time:'155 min',
                genre:[ 'Action', 'Adventure', 'Drama'],
                textmuted: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
                Director:'Ridley Scott',
                Stars:['Russell Crowe','Joaquin Phoenix','Connie Nielsen','Oliver Reed']
                },

                {
                Title:'La La Land',
                Year:'(2016)',
                certificate:'PG-13',
                Time:'128 min',
                genre:[ 'Comedy', 'Drama', 'Music'],
                textmuted: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
                Director:'Damien Chazelle',
                Stars:['Ryan Gosling','Emma Stone','Rosemarie DeWitt','J.K. Simmons']
                },

                {
                Title:'Weird: The Al Yankovic Story',
                Year:'(2022)',
                certificate:'TV-14',
                Time:'108 min',
                genre:[ 'Comedy', 'Crime', 'Music'],
                textmuted: "Explores every facet of Yankovic's life, from his meteoric rise to fame with early hits like 'Eat It' and 'Like a Surgeon' to his torrid celebrity love affairs and famously depraved lifestyle.",
                Director:'Eric Appel',
                Stars:['Diedrich Bader','Daniel Radcliffe','Lin-Manuel Miranda','Richard Aaron Anderson']
                },

                {
                Title:'Forrest Gump',
                Year:'(1994)',
                certificate:'PG-13',
                Time:'142 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
                Director:'Robert Zemeckis',
                Stars:['Tom Hanks','Robin Wright','Gary Sinise','Sally Field']
                },

                {
                Title:'Goodfellas',
                Year:'(1990)',
                certificate:'R',
                Time:'145 min',
                genre:[ 'Biography', 'Crime', 'Drama'],
                textmuted: 'The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito.',
                Director:'Martin Scorsese',
                Stars:['Robert De Niro','Ray Liotta','Joe Pesci','Lorraine Bracco']
                },

                {
                Title:'Fifty Shades of Grey',
                Year:'(2015)',
                certificate:'R',
                Time:'125 min',
                genre:[ 'Drama', 'Romance', 'Thriller'],
                textmuted: "Literature student Anastasia Steele's life changes forever when she meets handsome, yet tormented, billionaire Christian Grey.",
                Director:'Sam Taylor-Johnson',
                Stars:['Dakota Johnson','Jamie Dornan','Jennifer Ehle','Eloise Mumford']
                },

                {
                Title:'Knives Out',
                Year:'(2019)',
                certificate:'PG-13',
                Time:'130 min',
                genre:[ 'Comedy', 'Crime', 'Drama'],
                textmuted: 'A detective investigates the death of the patriarch of an eccentric, combative family.',
                Director:'Rian Johnson',
                Stars:['Daniel Craig','Chris Evans','Ana de Armas','Jamie Lee Curtis']
                },

                {
                Title:'Se7en',
                Year:'(1995)',
                certificate:'R',
                Time:'127 min',
                genre:[ 'Crime', 'Drama', 'Mystery'],
                textmuted: 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.',
                Director:'David Fincher',
                Stars:['Morgan Freeman','Brad Pitt','Kevin Spacey','Andrew Kevin Walker']
                },

                {
                Title:'Nobody',
                Year:'(I) (2021)',
                certificate:'R',
                Time:'92 min',
                genre:[ 'Action', 'Crime', 'Drama'],
                textmuted: 'A docile family man slowly reveals his true character after his house gets burgled by two petty thieves, which, coincidentally, leads him into a bloody war with a Russian crime boss.',
                Director:'Ilya Naishuller',
                Stars:['Bob Odenkirk','Aleksey Serebryakov','Connie Nielsen','Christopher Lloyd']
                },

                {
                Title:'The Notebook',
                Year:'(2004)',
                certificate:'PG-13',
                Time:'123 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom. However, social differences soon get in the way.',
                Director:'Nick Cassavetes',
                Stars:['Gena Rowlands','James Garner','Rachel McAdams','Ryan Gosling']
                },

                {
                Title:'Pearl',
                Year:'(2022)',
                certificate:'R',
                Time:'103 min',
                genre:[ 'Drama', 'Horror', 'Thriller'],
                textmuted: "In 1918, a young woman on the brink of madness pursues stardom in a desperate attempt to escape the drudgery, isolation and lovelessness of life on her parents' farm.",
                Director:'Ti West',
                Stars:['Mia Goth','David Corenswet','Tandi Wright','Matthew Sunderland']
                },

                {
                Title:'Ghostbusters',
                Year:'(1984)',
                certificate:'PG',
                Time:'105 min',
                genre:[ 'Action', 'Comedy', 'Fantasy'],
                textmuted: 'Three parapsychologists forced out of their university funding set up shop as a unique ghost removal service in New York City, attracting frightened yet skeptical customers.',
                Director:'Ivan Reitman',
                Stars:['Bill Murray','Dan Aykroyd','Sigourney Weaver','Harold Ramis']
                },

                {
                Title:'Teenage Mutant Ninja Turtles',
                Year:'(2014)',
                certificate:'PG-13',
                Time:'101 min',
                genre:[ 'Action', 'Adventure', 'Comedy'],
                textmuted: 'When a kingpin threatens New York City, a group of mutated turtle warriors must emerge from the shadows to protect their home.',
                Director:'Jonathan Liebesman',
                Stars:['Megan Fox','Will Arnett','William Fichtner','Noel Fisher']
                },

                {
                Title:'American Beauty',
                Year:'(1999)',
                certificate:'R',
                Time:'122 min',
                genre:[ 'Drama'],
                textmuted: "A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend.",
                Director:'Sam Mendes',
                Stars:['Kevin Spacey','Annette Bening','Thora Birch','Wes Bentley']
                },

                {
                Title:'Saving Private Ryan',
                Year:'(1998)',
                certificate:'R',
                Time:'169 min',
                genre:[ 'Drama', 'War'],
                textmuted: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
                Director:'Steven Spielberg',
                Stars:['Tom Hanks','Matt Damon','Tom Sizemore','Edward Burns']
                },

                {
                Title:'The Hunger Games',
                Year:'(2012)',
                certificate:'PG-13',
                Time:'142 min',
                genre:[ 'Action', 'Adventure', 'Sci-Fi'],
                textmuted: "Katniss Everdeen voluntarily takes her younger sister's place in the Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.",
                Director:'Gary Ross',
                Stars:['Jennifer Lawrence','Josh Hutcherson','Liam Hemsworth','Stanley Tucci']
                },

                {
                Title:'Fall',
                Year:'(I) (2022)',
                certificate:'PG-13',
                Time:'107 min',
                genre:[ 'Thriller'],
                textmuted: 'When a high-rise climb goes wrong, best friends Becky and Hunter find themselves stuck at the top of a 2,000-foot TV tower.',
                Director:'Scott Mann',
                Stars:['Grace Caroline Currey','Virginia Gardner','Mason Gooding','Jeffrey Dean Morgan']
                },

                {
                Title:'Shutter Island',
                Year:'(2010)',
                certificate:'R',
                Time:'138 min',
                genre:[ 'Mystery', 'Thriller'],
                textmuted: 'Teddy Daniels and Chuck Aule, two US marshals, are sent to an asylum on a remote island in order to investigate the disappearance of a patient, where Teddy uncovers a shocking truth about the place.',
                Director:'Martin Scorsese',
                Stars:['Leonardo DiCaprio','Emily Mortimer','Mark Ruffalo','Ben Kingsley']
                },

                {
                Title:'Lady Bird',
                Year:'(2017)',
                certificate:'R',
                Time:'94 min',
                genre:[ 'Comedy', 'Drama'],
                textmuted: 'In 2002, an artistically inclined 17-year-old girl comes of age in Sacramento, California.',
                Director:'Greta Gerwig',
                Stars:['Saoirse Ronan','Laurie Metcalf','Tracy Letts','Lucas Hedges']
                },

                {
                Title:'The Marvels',
                Year:'(2023)',
                certificate:'',
                Time:'',
                genre:[ 'Action', 'Adventure', 'Fantasy'],
                textmuted: 'Carol Danvers gets her powers entangled with those of Kamala Khan and Monica Rambeau, forcing them to work together to save the universe.',
                Director:'Nia DaCosta',
                Stars:['Brie Larson','Samuel L. Jackson','Teyonah Parris','Zawe Ashton']
                },

                {
                Title:'Zoey 102',
                Year:'(2023)',
                certificate:'TV-14',
                Time:'101 min',
                genre:[ 'Comedy', 'Drama', 'Family'],
                textmuted: 'Follows Zoey Brooks and the rest of the Pacific Coast Academy alumni as they catch up for a wedding in the present day.',
                Director:'Nancy Hower',
                Stars:['Jamie Lynn Spears','Sean Flynn','Erin Sanders','Christopher Massey']
                },

                {
                Title:'Napoleon',
                Year:'(2023)',
                certificate:'R',
                Time:'158 min',
                genre:[ 'Action', 'Adventure', 'Biography'],
                textmuted: "The film takes a personal look at Napoleon Bonaparte's origins, and his swift, ruthless climb to emperor viewed through the prism of his addictive, and often volatile, relationship with his wife and one true love, Josephine.",
                Director:'Ridley Scott',
                Stars:['Vanessa Kirby','Joaquin Phoenix','Ben Miles','Ludivine Sagnier']
                },

                {
                Title:'Mission: Impossible - Ghost Protocol',
                Year:'(2011)',
                certificate:'PG-13',
                Time:'132 min',
                genre:[ 'Action', 'Adventure', 'Thriller'],
                textmuted: "The IMF is shut down when it's implicated in the bombing of the Kremlin, causing Ethan Hunt and his new team to go rogue to clear their organization's name.",
                Director:'Brad Bird',
                Stars:['Tom Cruise','Jeremy Renner','Simon Pegg','Paula Patton']
                },

                {
                Title:'Good Will Hunting',
                Year:'(1997)',
                certificate:'R',
                Time:'126 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: 'Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.',
                Director:'Gus Van Sant',
                Stars:['Robin Williams','Matt Damon','Ben Affleck','Stellan Skarsgård']
                },

                {
                Title:'Ghostbusters: Afterlife',
                Year:'(2021)',
                certificate:'PG-13',
                Time:'124 min',
                genre:[ 'Adventure', 'Comedy',' Fantasy'],
                textmuted: 'When a single mom and her two kids arrive in a small town, they begin to discover their connection to the original Ghostbusters and the secret legacy their grandfather left behind.',
                Director:'Jason Reitman',
                Stars:['Carrie Coon','Paul Rudd','Finn Wolfhard','Mckenna Grace']
                },

                {
                Title:'Mad Max: Fury Road',
                Year:'(2015)',
                certificate:'R',
                Time:'120 min',
                genre:[ 'Action', 'Adventure', 'Sci-Fi'],
                textmuted: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper and a drifter named Max.',
                Director:'George Miller',
                Stars:['Tom Hardy','Charlize Theron','Nicholas Hoult','Zoë Kravitz']
                },

                {
                Title:'The Big Short',
                Year:'(2015)',
                certificate:'R',
                Time:'130 min',
                genre:[ 'Biography', 'Comedy', 'Drama'],
                textmuted: 'In 2006-2007 a group of investors bet against the United States mortgage market. In their research, they discover how flawed and corrupt the market is.',
                Director:'Adam McKay',
                Stars:['Christian Bale','Steve Carell','Ryan Gosling','Brad Pitt']
                },

                {
                Title:'Glass Onion',
                Year:'(2022)',
                certificate:'PG-13',
                Time:'139 min',
                genre:[ 'Comedy', 'Crime', 'Drama'],
                textmuted: 'Tech billionaire Miles Bron invites his friends for a getaway on his private Greek island. When someone turns up dead, Detective Benoit Blanc is put on the case.',
                Director:'Rian Johnson',
                Stars:['Daniel Craig','Edward Norton','Kate Hudson','Dave Bautista']
                },

                {
                Title:'Hereditary',
                Year:'(2018)',
                certificate:'R',
                Time:'127 min',
                genre:[ 'Drama', 'Horror', 'Mystery'],
                textmuted: 'A grieving family is haunted by tragic and disturbing occurrences.',
                Director:'Ari Aster',
                Stars:['Toni Collette','Milly Shapiro','Gabriel Byrne','Alex Wolff']
                },

                {
                Title:'Bawaal',
                Year:'(2023)',
                certificate:'',
                Time:'137 min',
                genre:[ 'Action', 'Drama', 'Romance'],
                textmuted: 'A small-town man who falls in love with the most beautiful girl in town. He wants to marry her one day because marrying her can raise his social position.',
                Director:'Nitesh Tiwari',
                Stars:['Varun Dhawan','Janhvi Kapoor','Manoj Pahwa','Anjuman Saxena']
                },

                {
                Title:'Resident Evil: Death Island',
                Year:'(2023)',
                certificate:'R',
                Time:'87 min',
                genre:[ 'Animation', 'Action', 'Adventure'],
                textmuted: 'A t-virus outbreak in San Francisco leads to Alcatraz Island, where a new evil has taken residence.',
                Director:'Eiichirô Hasumi',
                Stars:['Matthew Mercer','Nicole Tompkins','Kevin Dorman','Stephanie Panisello']
                },

                {
                Title:'Where the Crawdads Sing',
                Year:'(2022)',
                certificate:'PG-13',
                Time:'125 min',
                genre:[ 'Drama', 'Mystery', 'Romance'],
                textmuted: 'A woman who raised herself in the marshes of the Deep South becomes a suspect in the murder of a man with whom she was once involved.',
                Director:'Olivia Newman',
                Stars:['Daisy Edgar-Jones','Taylor John Smith','Harris Dickinson','David Strathairn']
                },

                {
                Title:'The Magnificent Seven',
                Year:'(2016)',
                certificate:'PG-13',
                Time:'132 min',
                genre:[ 'Action', 'Adventure', 'Drama'],
                textmuted: 'Seven gunmen from a variety of backgrounds are brought together by a vengeful young widow to protect her town from the private army of a destructive industrialist.',
                Director:'Antoine Fuqua',
                Stars:['Denzel Washington','Chris Pratt','Ethan Hawke',"Vincent D'Onofrio"]
                },

                {
                Title:'Gone Girl',
                Year:'(2014)',
                certificate:'R',
                Time:'149 min',
                genre:[ 'Drama', 'Mystery', 'Thriller'],
                textmuted: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
                Director:'David Fincher',
                Stars:['Ben Affleck','Rosamund Pike','Neil Patrick Harris','Tyler Perry']
                },

                {
                Title:'After',
                Year:'(I) (2019)',
                certificate:'PG-13',
                Time:'105 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: 'A young woman falls for a guy with a dark secret and the two embark on a rocky relationship. Based on the novel by Anna Todd.',
                Director:'Jenny Gage',
                Stars:['Josephine Langford','Hero Fiennes Tiffin','Khadijha Red Thunder','Dylan Arnold']
                },

                {
                Title:'Deadpool 3',
                Year:'(2024)',
                certificate:'',
                Time:'',
                genre:[ 'Action', 'Comedy', 'Sci-Fi'],
                textmuted: 'Wolverine joins the \'merc with a mouth\' in the third installment of the Deadpool film franchise.',
                Director:'Shawn Levy',
                Stars:['Morena Baccarin','Ryan Reynolds','Matthew Macfadyen','Jennifer Garner']
                },

                {
                Title:'Requiem for a Dream',
                Year:'(2000)',
                certificate:'R',
                Time:'102 min',
                genre:[ 'Drama'],
                textmuted: 'The drug-induced utopias of four Coney Island people are shattered when their addictions run deep.',
                Director:'Darren Aronofsky',
                Stars:['Ellen Burstyn','Jared Leto','Jennifer Connelly','Marlon Wayans']
                },

                {
                Title:"The Three Musketeers: D'Artagnan",
                Year:'(2023)',
                certificate:'',
                Time:'121 min',
                genre:[ 'Action', 'Adventure', 'History'],
                textmuted: "D'Artagnan arrives in Paris trying to find his attackers after being left for dead, which leads him to a real war where the future of France is at stake. He aligns himself with Athos, Porthos and Aramis, three musketeers of the King.",
                Director:'Martin Bourboulon',
                Stars:['François Civil','Vincent Cassel','Romain Duris','Pio Marmaï']
                },

                {
                Title:"Ferris Bueller's Day Off",
                Year:'(1986)',
                certificate:'PG-13',
                Time:'103 min',
                genre:[ 'Comedy'],
                textmuted: "A popular high school student, admired by his peers, decides to take a day off from school, and goes to extreme lengths to it pull off, to the chagrin of his Principal who'll do anything to stop him.",
                Director:'John Hughes',
                Stars:['Matthew Broderick','Alan Ruck','Mia Sara','Jeffrey Jones']
                },

                {
                Title:'Scarface',
                Year:'(1983)',
                certificate:'R',
                Time:'170 min',
                genre:[ 'Crime', 'Drama'],
                textmuted: 'In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.',
                Director:'Brian De Palma',
                Stars:['Al Pacino','Michelle Pfeiffer','Steven Bauer','Mary Elizabeth Mastrantonio']
                },

                {
                Title:'Operation Fortune: Ruse de Guerre',
                Year:'(2023)',
                certificate:'R',
                Time:'114 min',
                genre:[ 'Action', 'Comedy', 'Thriller'],
                textmuted: "Special agent Orson Fortune and his team of operatives recruit one of Hollywood's biggest movie stars to help them on an undercover mission when the sale of a deadly new weapons technology threatens to disrupt the world order.",
                Director:'Guy Ritchie',
                Stars:['Jason Statham','Aubrey Plaza','Cary Elwes','Hugh Grant']
                },

                {
                Title:'Suicide Squad',
                Year:'(2016)',
                certificate:'PG-13',
                Time:'123 min',
                genre:[ 'Action', 'Adventure', 'Fantasy'],
                textmuted: 'A secret government agency recruits some of the most dangerous incarcerated super-villains to form a defensive task force. Their first mission: save the world from the apocalypse.',
                Director:'David Ayer',
                Stars:['Will Smith','Jared Leto','Margot Robbie','Viola Davis']
                },

                {
                Title:'Transformers',
                Year:'(2007)',
                certificate:'PG-13',
                Time:'144 min',
                genre:[ 'Action', 'Adventure', 'Sci-Fi'],
                textmuted: 'An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power held by a teenager.',
                Director:'Michael Bay',
                Stars:['Shia LaBeouf','Megan Fox','Josh Duhamel','Tyrese Gibson']
                },

                {
                Title:'Hacksaw Ridge',
                Year:'(2016)',
                certificate:'R',
                Time:'139 min',
                genre:[ 'Biography', 'Drama', 'History'],
                textmuted: 'World War II American Army Medic Desmond T. Doss, who served during the Battle of Okinawa, refuses to kill people and becomes the first man in American history to receive the Medal of Honor without firing a shot.',
                Director:'Mel Gibson',
                Stars:['Andrew Garfield','Sam Worthington','Luke Bracey','Teresa Palmer']
                },

                {
                Title:'Ghosted',
                Year:'(I) (2023)',
                certificate:'PG-13',
                Time:'116 min',
                genre:[ 'Action, Adventure, Comedy'],
                textmuted: "Cole falls head over heels for enigmatic Sadie, but then makes the shocking discovery that she's a secret agent. Before they can decide on a second date, Cole and Sadie are swept away on an international adventure to save the world.",
                Director:'Dexter Fletcher',
                Stars:['Chris Evans','Ana de Armas','Adrien Brody','Mike Moh']
                },

                {
                Title:'M3gan',
                Year:'(2022)',
                certificate:'PG-13',
                Time:'102 min',
                genre:[ 'Horror, Sci-Fi, Thriller'],
                textmuted: 'A robotics engineer at a toy company builds a life-like doll that begins to take on a life of its own.',
                Director:'Gerard Johnstone',
                Stars:['Allison Williams','Violet McGraw','Ronny Chieng','Amie Donald']
                },

                {
                Title:'The Iron Claw',
                Year:'(2023)',
                certificate:'',
                Time:'',
                genre:[ 'Biography', 'Drama', 'Sport'],
                textmuted: 'The true story of the inseparable Von Erich brothers, who made history in the intensely competitive world of professional wrestling in the early 1980s.',
                Director:'Sean Durkin',
                Stars:['Zac Efron','Jeremy Allen White','Harris Dickinson','Maura Tierney']
                },

                {
                Title:'Knock Knock',
                Year:'(I) (2015)',
                certificate:'R',
                Time:'99 min',
                genre:[ 'Crime', 'Drama', 'Thriller'],
                textmuted: 'A devoted father helps two stranded young women who knock on his door, but his kind gesture turns into a dangerous seduction and a deadly game of cat and mouse.',
                Director:'Eli Roth',
                Stars:['Keanu Reeves','Lorenza Izzo','Ana de Armas','Aaron Burns']
                },

                {
                Title:'There Will Be Blood',
                Year:'(2007)',
                certificate:'R',
                Time:'158 min',
                genre:[ 'Drama'],
                textmuted: 'A story of family, religion, hatred, oil and madness, focusing on a turn-of-the-century prospector in the early days of the business.',
                Director:'Paul Thomas Anderson',
                Stars:['Daniel Day-Lewis','Paul Dano','Ciarán Hinds','Martin Stringer']
                },

                {
                Title:'The Nice Guys',
                Year:'(2016)',
                certificate:'R',
                Time:'116 min',
                genre:[ 'Action', 'Comedy', 'Crime'],
                textmuted: 'In 1970s Los Angeles, a mismatched pair of private eyes investigate a missing girl and the mysterious death of a porn star.',
                Director:'Shane Black',
                Stars:['Russell Crowe','Ryan Gosling','Angourie Rice','Matt Bomer']
                },

                {
                Title:'Shortcomings',
                Year:'(2023)',
                certificate:'R',
                Time:'92 min',
                genre:[ 'Comedy', 'Drama', 'Romance'],
                textmuted: 'Follows a trio of young, Bay Area urbanites--Ben Tanaka, Miko Hayashi and Alice Kim--as they navigate a range of interpersonal relationships while traversing the country in search of the ideal connection.',
                Director:'Randall Park',
                Stars:['Justin H. Min','Sherry Cola','Ally Maki','Tavi Gevinson']
                },

                {
                Title:'Jurassic World Dominion',
                Year:'(2022)',
                certificate:'PG-13',
                Time:'147 min',
                genre:[ 'Action', 'Adventure',' Sci-Fi'],
                textmuted: 'Four years after the destruction of Isla Nublar, Biosyn operatives attempt to track down Maisie Lockwood, while Dr Ellie Sattler investigates a genetically engineered swarm of giant insects.',
                Director:'Colin Trevorrow',
                Stars:['Chris Pratt','Bryce Dallas Howard','Laura Dern','Sam Neill']
                },

                {
                Title:'The Gentlemen',
                Year:'(2019)',
                certificate:'R',
                Time:'113 min',
                genre:[ 'Action', 'Comedy, Crime'],
                textmuted: 'An American expat tries to sell off his highly profitable marijuana empire in London, triggering plots, schemes, bribery and blackmail in an attempt to steal his domain out from under him.',
                Director:'Guy Ritchie',
                Stars:['Matthew McConaughey','Charlie Hunnam','Michelle Dockery','Jeremy Strong']
                },

                {
                Title:'Whiplash',
                Year:'(2014)',
                certificate:'R',
                Time:'106 min',
                genre:[ 'Drama', 'Music'],
                textmuted: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
                Director:'Damien Chazelle',
                Stars:['Miles Teller','J.K. Simmons','Melissa Benoist','Paul Reiser']
                },

                {
                Title:'Eyes Wide Shut',
                Year:'(1999)',
                certificate:'R',
                Time:'159 min',
                genre:[ 'Drama', 'Mystery', 'Thriller'],
                textmuted: "A Manhattan doctor embarks on a bizarre, night-long odyssey after his wife's admission of unfulfilled longing.",
                Director:'Stanley Kubrick',
                Stars:['Tom Cruise','Nicole Kidman','Todd Field','Sydney Pollack']
                },

                {
                Title:'Thor: Love and Thunder',
                Year:'(2022)',
                certificate:'PG-13',
                Time:'118 min',
                genre:[ 'Action', 'Adventure', 'Comedy'],
                textmuted: 'Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.',
                Director:'Taika Waititi',
                Stars:['Chris Hemsworth','Natalie Portman','Christian Bale','Tessa Thompson']
                },

                {
                Title:'The Lost Boys',
                Year:'(1987)',
                certificate:'R',
                Time:'97 min',
                genre:[ 'Comedy', 'Horror'],
                textmuted: 'After moving to a new town, two brothers discover that the area is a haven for vampires.',
                Director:'Joel Schumacher',
                Stars:['Jason Patric','Corey Haim','Dianne Wiest','Barnard Hughes']
                },

                {
                Title:"National Lampoon's Vacation",
                Year:'(1983)',
                certificate:'R',
                Time:'98 min',
                genre:[ 'Adventure', 'Comedy'],
                textmuted: "The Griswold family's cross-country drive to the Walley World theme park proves to be much more arduous than they ever anticipated.",
                Director:'Harold Ramis',
                Stars:['Chevy Chase',"Beverly D'Angelo",'Imogene Coca','Randy Quaid']
                },

                {
                Title:'Spider-Man',
                Year:'(2002)',
                certificate:'PG-13',
                Time:'121 min',
                genre:[ 'Action', 'Adventure', 'Sci-Fi'],
                textmuted: 'After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he uses to fight injustice as a masked superhero and face a vengeful enemy.',
                Director:'Sam Raimi',
                Stars:['Tobey Maguire','Kirsten Dunst','Willem Dafoe','James Franco']
                },

                {
                Title:'Passages',
                Year:'(2023)',
                certificate:'Unrated',
                Time:'91 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: "A gay couple's marriage is thrown into crisis when one of them impulsively begins a passionate affair with a young woman.",
                Director:'Ira Sachs',
                Stars:['Franz Rogowski','Ben Whishaw','Adèle Exarchopoulos','Erwan Kepoa Falé']
                },

                {
                Title:'Crazy, Stupid, Love.',
                Year:'(2011)',
                certificate:'PG-13',
                Time:'118 min',
                genre:[ 'Comedy', 'Drama', 'Romance'],
                textmuted: "A middle-aged husband's life changes dramatically when his wife asks him for a divorce. He seeks to rediscover his manhood with the help of a newfound friend, Jacob, learning to pick up girls at bars.",
                Director:'Glenn Ficarra',
                Stars:['John Requa','Steve Carell','Ryan Gosling','Julianne Moore']
                },

                {
                Title:'The Equalizer',
                Year:'(2014)',
                certificate:'R',
                Time:'132 min',
                genre:[ 'Action', 'Crime', 'Thriller'],
                textmuted: 'A man who believes he has put his mysterious past behind him cannot stand idly by when he meets a young girl under the control of ultra-violent Russian gangsters.',
                Director:'Antoine Fuqua',
                Stars:['Denzel Washington','Marton Csokas','Chloë Grace Moretz','David Harbour']
                },

                {
                Title:'American Pie',
                Year:'(1999)',
                certificate:'R',
                Time:'95 min',
                genre:[ 'Comedy'],
                textmuted: 'Four teenage boys enter a pact to lose their virginity by prom night.',
                Director:'Paul Weitz',
                Stars:['Chris Weitz','Jason Biggs','Chris Klein','Thomas Ian Nicholas']
                },

                {
                Title:'Ruby Gillman, Teenage Kraken',
                Year:'(2023)',
                certificate:'PG',
                Time:'91 min',
                genre:[ 'Animation', 'Action', 'Adventure'],
                textmuted: 'A shy adolescent learns that she comes from a fabled royal family of legendary sea krakens and that her destiny lies in the depths of the waters, which is bigger than she could have ever imagined.',
                Director:'Kirk DeMicco',
                Stars:['Faryn Pearl','Jane Fonda','Lana Condor','Toni Collette']
                },

                {
                Title:'Fast & Furious',
                Year:'(2009)',
                certificate:'PG-13',
                Time:'107 min',
                genre:[ 'Action', 'Crime', 'Thriller'],
                textmuted: "Brian O'Conner, back working for the FBI in Los Angeles, teams up with Dominic Toretto to bring down a heroin importer by infiltrating his operation.",
                Director:'Justin Lin',
                Stars:['Vin Diesel','Paul Walker','Michelle Rodriguez','Jordana Brewster']
                },

                {
                Title:'The Matrix',
                Year:'(1999)',
                certificate:'R',
                Time:'136 min',
                genre:[ 'Action', 'Sci-Fi'],
                textmuted: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
                Director:'Lana Wachowski',
                Stars:['Lilly Wachowski','Keanu Reeves','Laurence Fishburne','Carrie-Anne Moss']
                },

                {
                Title:'Scream',
                Year:'(I) (2022)',
                certificate:'R',
                Time:'114 min',
                genre:[ 'Horror', 'Mystery', 'Thriller'],
                textmuted: "25 years after a streak of brutal murders shocked the quiet town of Woodsboro, Calif., a new killer dons the Ghostface mask and begins targeting a group of teenagers to resurrect secrets from the town's deadly past.",
                Director:'Matt Bettinelli-Olpin',
                Stars:['Tyler Gillett','Neve Campbell','Courteney Cox','David Arquette']
                },

                {
                Title:'Pirates of the Caribbean: The Curse of the Black Pearl',
                Year:'(2003)',
                certificate:'PG-13',
                Time:'143 min',
                genre:[ 'Action', 'Adventure', 'Fantasy'],
                textmuted: "Blacksmith Will Turner teams up with eccentric pirate \'Captain\' Jack Sparrow to save his love, the governor's daughter, from Jack's former pirate allies, who are now undead.",
                Director:'Gore Verbinski',
                Stars:['Johnny Depp','Geoffrey Rush','Orlando Bloom','Keira Knightley']
                },

                {
                Title:'The Gray Man',
                Year:'(2022)',
                certificate:'PG-13',
                Time:'122 min',
                genre:[ 'Action', 'Thriller'],
                textmuted: "When the CIA's most skilled operative, whose true identity is known to none, accidentally uncovers dark agency secrets, a psychopathic former colleague puts a bounty on his head, setting off a global manhunt by international assassins.",
                Director:'Anthony Russo',
                Stars:['Joe Russo','Ryan Gosling','Chris Evans','Ana de Armas']
                },

                {
                Title:'Past Lives',
                Year:'(2023)',
                certificate:'PG-13',
                Time:'105 min',
                genre:[ 'Drama', 'Romance'],
                textmuted: "Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora's family emigrates from South Korea. Twenty years later, they are reunited for one fateful week as they confront notions of love and destiny.",
                Director:'Celine Song',
                Stars:['Greta Lee','Teo Yoo','John Magaro','Moon Seung-ah']
                },

                {
                Title:'Oldboy',
                Year:'(2003)',
                certificate:'R',
                Time:'120 min',
                genre:[ 'Action', 'Drama', 'Mystery'],
                textmuted: 'After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must find his captor in five days.',
                Director:'Park Chan-wook',
                Stars:['Choi Min-sik','Yoo Ji-tae','Kang Hye-jeong','Kim Byeong-Ok']
                },

                {
                Title:'Boogie Nights',
                Year:'(1997)',
                certificate:'R',
                Time:'155 min',
                genre:[ 'Drama'],
                textmuted: 'Back when sex was safe, pleasure was a business and business was booming, an idealistic porn producer aspires to elevate his craft to an art when he discovers a hot young talent.',
                Director:'Paul Thomas Anderson',
                Stars:['Mark Wahlberg','Julianne Moore','Burt Reynolds','Luis Guzmán']
                },

                {
                Title:'The Fast and the Furious: Tokyo Drift',
                Year:'(2006)',
                certificate:'PG-13',
                Time:'104 min',
                genre:[ 'Action', 'Crime', 'Thriller'],
                textmuted: 'A teenager becomes a major competitor in the world of drift racing after moving in with his father in Tokyo to avoid a jail sentence in America.',
                Director:'Justin Lin',
                Stars:['Lucas Black','Zachery Ty Bryan','Shad Moss','Damien Marzette']
                },

                {
                Title:'Mission: Impossible III',
                Year:'(2006)',
                certificate:'PG-13',
                Time:'126 min',
                genre:[ 'Action', 'Adventure', 'Thriller'],
                textmuted: 'IMF agent Ethan Hunt comes into conflict with a dangerous and sadistic arms dealer who threatens his life and his fiancée in response.',
                Director:'J.J. Abrams',
                Stars:['Tom Cruise','Michelle Monaghan','Ving Rhames','Philip Seymour Hoffman']
                },

                {
                Title:'Nope',
                Year:'(2022)',
                certificate:'R',
                Time:'130 min',
                genre:[ 'Horror', 'Mystery', 'Sci-Fi'],
                textmuted: 'The residents of a lonely gulch in inland California bear witness to an uncanny and chilling discovery.',
                Director:'Jordan Peele',
                Stars:['Daniel Kaluuya','Keke Palmer','Brandon Perea','Michael Wincott']
                },

                {
                Title:'Terminator Genisys',
                Year:'(2015)',
                certificate:'PG-13',
                Time:'126 min',
                genre:[ 'Action', 'Adventure', 'Sci-Fi'],
                textmuted: 'When John Connor, leader of the human resistance, sends Sgt. Kyle Reese back to 1984 to protect Sarah Connor and safeguard the future, an unexpected turn of events creates a fractured timeline.',
                Director:'Alan Taylor',
                Stars:['Arnold Schwarzenegger','Jason Clarke','Emilia Clarke','Jai Courtney']
                },

                {
                Title:'The Goonies',
                Year:'(1985)',
                certificate:'PG',
                Time:'114 min',
                genre:[ 'Adventure', 'Comedy', 'Family'],
                textmuted: "A group of young misfits called The Goonies discover an ancient map and set out on an adventure to find a legendary pirate's long-lost treasure.",
                Director:'Richard Donner',
                Stars:['Sean Astin','Josh Brolin','Jeff Cohen','Corey Feldman']
                },

                {
                Title:'The Jerk',
                Year:'(1979)',
                certificate:'R',
                Time:'94 min',
                genre:[ 'Comedy'],
                textmuted: 'A simpleminded, sheltered country boy suddenly decides to leave his family home to experience life in the big city, where his naivete is both his best friend and his worst enemy.',
                Director:'Carl Reiner',
                Stars:['Steve Martin','Bernadette Peters','Catlin Adams','Mabel King']
            }]
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}))

app.use(express.static('public'))

app.get('/Topmovies', (req, res) => {res.json(topMovies)})

app.get('/', (req, res) => {res.send('Welcome to Jude Knows Movies or JKM for short!')})

//read
app.get('/movies', (req,res) => {
    res.status(200).json(movies);
})
// create
app.post('/users' , (req, res) =>{
    const newUser = req.body;

    if (newUser.name){
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    }else{
        res.status(400).send('Users need names')
    }
})

//Update
app.put('/users/:id' , (req, res) =>{
    const { id } = req.params
    const updatedUser = req.body;

    let user = users.find(user => user.id == id );

    if(user){
        user.name = updatedUser.name;
        res.status(200).json(user)
    }else{
        res.status(400).send('No such user')
    }
    
})
//create
app.post('/users/:id/:title' , (req, res) =>{
    const { id, title } = req.params;

    let user = users.find(user => user.id == id );

    if(user){
        user.favoriteMovies.push(title);
        res.status(200).send(`${title} has been added to user ${user.name}'s favorites`);
    }else{
        res.status(400).send('No such user')
    }
    
})
//delete
app.delete('/users/:id/:title' , (req, res) =>{
    const { id, title } = req.params;
    
    let user = users.find(user => user.id == id );

    if(user){
        user.favoriteMovies = user.favoriteMovies.filter( movie => movie !== title );
        res.status(200).send(`${title} has been remove from user ${user.name}'s favorites`);
    }else{
        res.status(400).send('No such user')
    }
    
})

//delete
app.delete('/users/:id' , (req, res) =>{
    const { id } = req.params;
    
    let user = users.find(user => user.id == id );

    if(user){
        user = users.find( user => user.id != id);
        res.status(200).send(`user ${user.name} has been deleted`);
    }else{
        res.status(400).send('No such user')
    }
    
})
//read
app.get('/movies/:title', (req, res) =>{
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);

    if (movie){
        res.status(200).json(movie);
    }else{
        res.status(400).send('no such movie')
    }
})

//read
app.get('/movies/genre/:genreName', (req, res) =>{
        const { genreName } = req.params ;
        const Genre = movies.filter( movie => movie.genre.includes(genreName));
    
                                        
    
        if (Genre){
            res.status(200).json(Genre);
        }else{
            res.status(400).send('no such genre');
        }
    })
//read
app.get('/movies/director/:directorName', (req, res) =>{
    const { directorName } = req.params ;
    const Director = movies.filter( movie => movie.Director.toLowerCase() === directorName.toLowerCase());

                                    

    if (Director){
        res.status(200).json(Director);
    }else{
        res.status(400).send('no such director in the database');
    }
})


app.get('/Directors/:Director', (req, res) =>{
    const { Director } = req.params;
    const director = Directors.find(director => director.directorName.toLocaleLowerCase() === Director.toLocaleLowerCase());

    if (director){
        res.status(200).json(director);
    }else{
        res.status(400).send('no such director in the database')
    }
})

app.listen(8080,() => {
    console.log('this app is listening on port 8080')
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Uh Oh, Spagettioes!');
  })

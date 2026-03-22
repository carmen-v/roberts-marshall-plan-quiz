export type Question = {
    text: string;
    options: [string, string, string, string];
    correct: 0 | 1 | 2 | 3; // index of the correct answer
};

export const questions: Question[] = [
    {
        text: "Wie heeft het Marshallplan bedacht?",
        options: ["Cameroon Marshall", "Marshall Matthers", "George Marshall", "Nick Marshall"],
        correct: 2,
    },
    {
        text: "Wat deed het Marshallplan voor Europa?",
        options: [
            "Het stuurde soldaten om nieuwe gevechten te voeren",
            "Het verdeelde Europa in arme en rijke gebieden",
            "Het zorgde voor geld en materialen om verwoeste landen te herbouwen",
            "Het verbood Europese landen om handel te drijven",
        ],
        correct: 2,
    },
    {
        text: "Hoeveel geld stuurden de Verenigde Staten via het Marshallplan naar Europa?",
        options: [
            "Ongeveer 1 miljard dollar",
            "Ongeveer 13 miljard dollar",
            "Ongeveer 100 miljard dollar",
            "Ongeveer 500 miljoen dollar",
        ],
        correct: 1,
    },
    {
        text: "Welke landen kregen hulp via het Marshallplan?",
        options: [
            "Alle landen ter wereld",
            "Alleen de landen die aan de kant van de Duitsers hadden gevochten",
            "West-Europese landen zoals Nederland, Frankrijk, Engeland en West-Duitsland",
            "Alleen Engeland en de Verenigde Staten",
        ],
        correct: 2,
    },
    {
        text: "Waarom weigerden de Sovjet-Unie en haar bondgenoten het Marshallplan?",
        options: [
            "Ze hadden geen verwoeste steden na de oorlog",
            "Ze vonden het geld te weinig om nuttig te zijn",
            "Ze zagen het als Amerikaanse inmenging en een bedreiging voor het communisme",
            "Ze hadden al een eigen plan dat beter werkte",
        ],
        correct: 2,
    },
    {
        text: "Welk voordeel heeft het dat EU-landen niet met elkaar in oorlog zijn?",
        options: [
            "Ze hoeven nooit belasting te betalen",
            "Mensen kunnen veilig leven, reizen en samenwerken",
            "Ze krijgen gratis eten van andere EU-landen",
            "Ze mogen elkaars bekende sporters overnemen",
        ],
        correct: 1,
    },
    {
        text: "Waarom werd de Europese Unie opgericht na de Tweede Wereldoorlog?",
        options: [
            "Om één grote Europese baas aan de macht te zetten",
            "Om ervoor te zorgen dat landen samenwerken en geen oorlog meer voeren",
            "Om een nieuwe wereldkampioen voetbal te kiezen",
            "Om de grenzen voor iedereen te sluiten",
        ],
        correct: 1,
    },
    {
        text: "Hoeveel landen zijn er lid van de Europese Unie?",
        options: ["15 landen", "50 landen", "27 landen", "10 landen"],
        correct: 2,
    },
    {
        text: "Wat is de euro?",
        options: [
            "De naam van de Europese president",
            "Een Europees sportevenement",
            "De gemeenschappelijke munt van veel EU-landen",
            "Een computerprogramma van de EU",
        ],
        correct: 2,
    },
    {
        text: "Welk symbool heeft de Europese Unie?",
        options: [
            "Een gouden kroon op een blauwe achtergrond",
            "Een rode vlag met een witte adelaar",
            "Een groene boom op een witte vlag",
            "Een cirkel van twaalf gouden sterren op een blauwe vlag",
        ],
        correct: 3,
    },
];

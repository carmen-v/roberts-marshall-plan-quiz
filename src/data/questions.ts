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
        text: "Wat betekent het vrije verkeer van personen in de EU?",
        options: [
            "Dat je gratis met de trein kunt reizen door heel Europa",
            "Dat EU-burgers zonder speciale vergunning in andere EU-landen mogen wonen en werken",
            "Dat iedereen gratis een huis in een ander land krijgt",
            "Dat je geen paspoort meer nodig hebt in de hele wereld",
        ],
        correct: 1,
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
        text: "Wat is het Europees Parlement?",
        options: [
            "Een groot hotel in Brussel waar leiders vergaderen",
            "Een school voor toekomstige Europese leiders",
            "Een markt waar landen producten verhandelen",
            "De plek waar gekozen vertegenwoordigers namens EU-burgers wetten maken",
        ],
        correct: 3,
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
    {
        text: "Hoe helpt de Europese Unie landen om vrede te bewaren?",
        options: [
            "Door een groot Europees leger dat alle landen controleert",
            "Door samen regels te maken, handel te drijven en problemen met overleg op te lossen",
            "Door grenzen te sluiten en niemand door te laten",
            "Door één president te kiezen die alle beslissingen neemt",
        ],
        correct: 1,
    },
];

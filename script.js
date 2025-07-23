// Variables to track quiz state
let currentPage = 0; // Current page index (0 for intro, 1 for page1, etc.)
const totalQuestions = 7;
let correctAnswers = 0;
let currentLanguage = 'fr'; // Default language is French
let inactivityTimer; // Variable to hold the timer

// Define correct answers (page index: 'data-answer' of the correct button)
// Note: Pages are indexed from 1 to 7 for questions.
const correctAnswersMap = {
    1: 'not-scam', // Page 1: Not a scam
    2: 'scam',     // Page 2: A scam
    3: 'scam',     // Page 3: A scam
    4: 'scam',     // Page 4: A scam
    5: 'maybe-scam', // Page 5: Maybe a scam
    6: 'scam',     // Page 6: A scam
    7: 'scam'      // Page 7: A scam
};

// Define translations
const translations = {
    fr: {
        documentTitle: "Pouvez-vous détecter une arnaque?",
        introTitle: "Pouvez-vous détecter une arnaque?",
        introPara1: "Si vous avez déjà été victime d'une arnaque, vous n'êtes pas seul : selon le Centre antifraude du Canada, les Canadiens ont perdu plus de 554 000 000 $ à cause de la fraude en 2023. Et ce n'est qu'une image partielle de la situation, sachant qu'une grande majorité des cas ne sont jamais signalés aux autorités.",
        introPara2: "Les fraudeurs deviennent de plus en plus ingénieux pour voler votre argent et vos informations personnelles, au point que leurs pièges sont parfois difficiles à distinguer des communications légitimes d'entités connues. C'est pourquoi nous avons créé ce quiz pour mieux vous équiper face à ces demandes.",
        introPara3: "Serez-vous capable de repérer les arnaques?",
        startQuizButton: "Commencer le quiz",
        questionXofY: (x, y) => `Question ${x} sur ${y}`,
        scam: "Une arnaque",
        notScam: "Pas une arnaque",
        maybeScam: "Peut-être une arnaque",
        nextQuestion: "Question suivante",
        email: "Courriel",
        attachment: "Pièce jointe",
        outro1: "Pour signaler une arnaque au Centre antifraude du Canada, appelez ce numéro sans frais : 1 888 495-8501.",
        outro2: "La Clinique de cyber-criminologie de l’Université de Montréal offre gratuitement un service d’accompagnement personnalisé pour les victimes d’arnaque sur le site web Fraude-Alerte.ca. Le site web répertorie également tous les types de fraude.",
        outro3: "Contactez les Décrypteurs au decrypteurs@radio-canada.ca",
        outro4: "Share the quiz – Copy the link / Social media",
        outro5: "Nicholas De Rosa journaliste, Sara Barrière-Brunet cheffe de pupitre, Andréa Alvarenga et Louis-Philippe Bouvier designers, André Guimaraes et Mathieu St-Laurent développeurs et Pierre Duchesneau réviseur linguistique",
        restartQuiz: "Recommencer le quiz",
        outroScoreCount: (correct, total) => `${correct} bonnes réponses sur ${total} questions`,
        seeResultsButton: "Voir les résultats", // New translation for "See Results"
        
        // Question 1
        q1Text: "Traduction en français : Paiement des droits d'importation, des taxes et des frais connexes requis pour DHL Express 1114459275 de la part de ATLAS COMPAGNIE. Payez en toute sécurité : https://del.dhl.com/CA/UKx9-exrF7",
        q1AnswerTitle: "Ceci n’est pas une arnaque",
        q1AnswerPara1: "Il s’agit d’un vrai message texte envoyé à un client canadien de l’entreprise de transport de colis DHL.",
        q1AnswerPara2: "Pour savoir si un tel texto est trompeur ou pas, vérifiez l’URL. Dans ce cas-ci, il s’agit de DHL.com, soit le domaine officiel de DHL. Lorsqu’une URL contient plusieurs mots séparés par des points, le dernier mot est celui de la véritable URL. Les arnaqueurs tenteront souvent de vous berner en plaçant des mots qui semblent officiels ou crédibles au début de l’URL.",
        q1AnswerPara3: "Traduction en français: Paiement des droits d'importation, des taxes et des frais connexes requis pour DHL Express 1114459275 de la part de ATLAS COMPAGNIE. Payez en toute sécurité : https://del.dhl.com/CA/UKx9-exrF7",
        q1AnswerPara4: "De plus, le numéro de téléphone de l’expéditeur peut souvent être un bon indicateur de l’authenticité du texto. Dans ce cas-ci, l’expéditeur est « 22345 ». Une simple recherche pour ce numéro vous mène directement sur le site de DHL, qui explique que les communications de l’entreprise proviennent de ce numéro.",
        q1AnswerPara5: "Plusieurs arnaqueurs tentent de se faire passer pour des services de transport de colis. Méfiez-vous de textos comme celui-ci.",
        q1AnswerPara6: "L’URL dans ce texto n’est pas celle d’un service de transport de colis connu ni même des douanes. Une simple recherche pour vérifier le numéro de téléphone de l’expéditeur ne donne aucun résultat concluant.",

        // Question 2
        q2AnswerTitle: "Ceci est une arnaque",
        q2AnswerPara1: "Il s’agit d’une des arnaques les plus communes au Canada depuis le début de l’année 2023.",
        q2AnswerPara2: "Le stratagème est toujours le même : des arnaqueurs se faisant passer pour votre propriétaire vous demandent d’effectuer rapidement un virement Interac pour payer votre loyer qui serait en retard, ou impayé.",
        q2AnswerPara3: "Méfiez-vous des messages qui vous réclament de l’argent de manière urgente ou qui demandent des paiements par virement Interac : une fois le virement effectué, obtenir un remboursement est très difficile, voire impossible. La transaction est presque instantanée et considérée comme définitive par les institutions bancaires une fois qu’elle a été acceptée par le destinataire.",

        // Question 3
        q3AnswerTitle: "Ceci est une arnaque",
        q3AnswerPara1: "Des fraudeurs tentent depuis plusieurs années de se faire passer pour des agences gouvernementales ou des sociétés d’État afin de voler vos informations personnelles. Dans ce cas-ci, l’appât est un montant d’argent que vous doit supposément la Société de l'assurance automobile du Québec (SAAQ), mais la créativité de ces escrocs ne connaît pas de limites. Agence du revenu du Canada, Hydro-Québec, Régie de l'assurance maladie du Québec (RAMQ) : tous les moyens sont bons pour vous soutirer de l’argent.",
        q3AnswerPara2: "Jusqu’à tout récemment, la règle générale était que le gouvernement et les agences gouvernementales ne communiquent jamais par texto. Il suffisait d’ignorer toute supposée communication gouvernementale par texto. C’est encore vrai… à une exception près.",
        q3AnswerPara3: "Revenu Québec offre depuis peu des notifications concernant les dossiers des citoyens par texto. Toutefois, ces textos ne contiennent jamais de lien ni d’information personnelle : ils vous alertent tout simplement de changements à votre dossier. De plus, seules les personnes qui consentent à recevoir ces textos dans leur déclaration de revenus en recevront.",
        q3AnswerPara4: "Gardez en tête que les fraudeurs rebondissent souvent sur les dernières nouvelles pour que leurs arnaques semblent plus crédibles, et méfiez-vous toujours des textos qui vous dirigent vers des sites demandant des renseignements personnels comme votre numéro de carte de crédit ou votre mot de passe.",

        // Question 4
        q4AnswerTitle: "Ceci est une arnaque",
        q4AnswerPara1: "Bien que la signature visuelle de Microsoft soit bien reproduite, on peut détecter plusieurs drapeaux rouges.",
        q4AnswerPara2: "D’abord, les fournisseurs de courriels ou les employeurs n’envoient généralement pas de messages pour vous inciter à garder le même mot de passe. Plusieurs tentatives d’hameçonnage emploient cette stratégie, qui sert à récolter vos informations personnelles et votre mot de passe.",
        q4AnswerPara3: "Sinon, n’oubliez jamais de valider l’adresse courriel de l’expéditeur en faisant une recherche rapide. Dans ce cas, l’adresse est « account-security-noreply@m365-microsoft.com », qui semble tout à fait légitime à première vue, mais le domaine « m365-microsoft.com » n’appartient pas à Microsoft : le site web officiel est en fait microsoft.com.",
        q4AnswerPara4: "Il est théoriquement possible pour un acteur malveillant de falsifier un domaine de courriel, mais les principaux fournisseurs de courriel (Gmail, Outlook) emploient des protocoles de sécurité qui devraient automatiquement bloquer ce type de message.",
        q4AnswerPara5: "Ces mesures de sécurité ne sont toutefois pas infaillibles puisque les acteurs malveillants tentent constamment de développer des techniques pour les contourner. La vigilance reste donc de mise : ne cliquez pas sur des liens ou des pièces jointes de sources non vérifiées et méfiez-vous des courriels qui vous dirigent vers des sites demandant des renseignements personnels comme votre numéro de carte de crédit ou votre mot de passe.",

        // Question 5
        q5AnswerTitle: "Ceci est peut-être une arnaque (à moins que votre prénom soit Éric)",
        q5AnswerPara1: "Et même si vous vous prénommez Éric, méfiez-vous des messages d’un expéditeur inconnu : plusieurs arnaques ont comme point de départ un texto aléatoire, supposément envoyé à la mauvaise personne par erreur, comme celui-ci. Le but des arnaqueurs est de gagner votre confiance pour ensuite vous soutirer de l’argent.",
        q5AnswerPara2: "Les auteurs de ce type d’arnaque, surnommé en anglais pig butchering (abattage de porcs), prennent tous les moyens pour gagner la confiance de la victime : faux profils de réseaux sociaux, envoi de photos, envoi de messages vocaux… Ils tenteront de se lier d’amitié avec vous ou de devenir votre amoureux pour mieux vous manipuler et vous voler.",
        q5AnswerPara3: "L’objectif ultime est souvent de demander directement des sommes d’argent, ou d’enrôler la victime dans une arnaque à l’investissement.",

        // Question 6
        q6AnswerTitle: "Ceci est une arnaque",
        q6AnswerPara1: "Ceci est une arnaque très commune sur les plateformes de vente comme Kijiji ou Facebook Marketplace. Le vendeur est mis en confiance puisque la proposition implique de l’argent qui est remis en mains propres, mais cela n’est que la première étape de l’arnaque. Si vous acceptez l’offre, l’arnaqueur vous enverra un message comme celui-ci :",
        q6AnswerPara2: "Le montant et les moyens de le prélever peuvent varier (carte de crédit prépayée, virement Interac, etc.), mais le stratagème est toujours le même : vous convaincre de payer des « frais d’assurance » et voler votre argent sans qu’un facteur vienne chercher le colis chez vous.",
        q6AnswerPara3: "L’arnaqueur demandera parfois un transfert direct, mais habituellement, il se servira d’un faux courriel aux couleurs du service de livraison.",
        q6AnswerPara4: "Méfiez-vous toujours des acheteurs vous proposant toute méthode d’achat qui n’est pas un échange de l’article et d’argent comptant en mains propres. Des arnaques basées sur des virements Interac sont rares, ou il est possible que quelqu’un se serve d’un compte piraté pour vous envoyer des fonds et que la transaction soit ensuite annulée par la banque.",

        // Question 7
        q7AnswerTitle: "Ceci est une arnaque",
        q7AnswerPara1: "Cette arnaque au soutien technique circule depuis plusieurs années et peut prendre plusieurs formes, dont celle de la fameuse erreur d’écran bleu des ordinateurs Windows. Elle apparaît habituellement sous forme de fenêtre surgissante (pop-up).",
        q7AnswerPara2: "Quoi qu’il en soit, les fraudeurs veulent que vous appeliez le numéro à l’écran, dans le but de poser un ou plusieurs gestes malveillants : prise de contrôle de votre ordinateur à distance, abonnements coûteux, installation de logiciels espions…",
        q7AnswerPara3: "Ne vous inquiétez pas et n’appelez surtout pas le numéro qui apparaît à l’écran. Il est possible que le site web malveillant ne veuille pas fermer ou disparaître. Dans un tel cas, effectuez un clic droit sur votre menu Démarrer, cliquez sur Gestionnaire de tâches et mettez fin à la tâche qui ne correspond pas à vos logiciels ouverts.",
        q7AnswerPara4: "Cette arnaque peut aussi prendre la forme d’un appel non sollicité d’une personne qui dit être représentante de Microsoft.",
        q7AnswerPara5: "Gardez en tête que Microsoft « ne diffuse pas de messages électroniques non sollicités et ne passe pas d'appels téléphoniques non sollicités pour demander des informations personnelles ou financières, ou pour fournir une assistance technique pour réparer votre ordinateur », selon son site web.",

        // Image Alt Texts
        imageQuestion1aAlt: "Image de la question 1a",
        imageAnswer1bAlt: "Image de la réponse 1b",
        imageAnswer1cAlt: "Image de la réponse 1c",
        imageAnswer1dAlt: "Image de la réponse 1d",
        imageQuestion2aAlt: "Image de la question 2a",
        imageQuestion2bAlt: "Image de la question 2b",
        imageQuestion3aAlt: "Image de la question 3a",
        imageQuestion4aAlt: "Image de la question 4a",
        imageQuestion5aAlt: "Image de la question 5a",
        imageQuestion6aAlt: "Image de la question 6a",
        imageAnswer6bAlt: "Image de la réponse 6b",
        imageQuestion7aAlt: "Image de la question 7a",
        imageAnswer7bAlt: "Image de la réponse 7b",
    },
    en: {
        documentTitle: "Think you can spot a scam?",
        introTitle: "Think you can spot a scam?",
        introPara1: "If you’ve ever fallen victim to a scam, you’re not alone: according to the Canadian Anti-Fraud Centre, Canadians lost over $554,000,000 to fraud in 2023. And that’s just the tip of the iceberg, given that most cases are never even reported to the authorities.",
        introPara2: "Fraudsters are coming up with increasingly sophisticated ways of stealing your money and personal information — to the point where their scams can be all but indistinguishable from legitimate messages. That’s why we've created this quiz: to help you to detect and deal with suspicious solicitations.",
        introPara3: "Think you can spot a scam?",
        startQuizButton: "Start Quiz",
        questionXofY: (x, y) => `Question ${x} of ${y}`,
        scam: "A Scam",
        notScam: "Not a Scam",
        maybeScam: "Maybe a Scam",
        nextQuestion: "Next Question",
        email: "Email",
        attachment: "Attachment",
        outro1: "To report a scam to the Canadian Anti-Fraud Centre, call 1 888 495-8501 (toll-free).",
        outro2: "The Université de Montréal’s Clinique de cyber-criminologie offers free personalized support to scam victims on its website, Fraude-Alerte.ca. The site also lists all types of fraud.",
        outro3: "Contact Les Décrypteurs at decrypteurs@radio-canada.ca",
        outro4: "Share the quiz – Copy the link / Social media",
        outro5: "Nicholas De Rosa journalist, Sara Barrière-Brunet rundown producer, Andréa Alvarenga and Louis-Philippe Bouvier designers, André Guimaraes and Mathieu St-Laurent developers and Pierre Duchesneau copy editor",
        restartQuiz: "Restart Quiz",
        outroScoreCount: (correct, total) => `${correct} correct answers out of ${total} questions`,
        seeResultsButton: "See Results", // New translation for "See Results"

        // Question 1
        q1Text: "Payment of import duties, taxes and related fees required for DHL Express 1114459275 from ATLAS COMPANY. Pay securely: https://del.dhl.com/CA/UKx9-exrF7",
        q1AnswerTitle: "This is not a scam",
        q1AnswerPara1: "It’s a real text message sent to a Canadian client from international shipping company DHL.",
        q1AnswerPara2: "To determine whether a message like this is authentic, check the URL. In this case, it’s DHL.com, the official DHL domain. Whenever a URL contains multiple words separated by periods, the word that’s right before “.com” (or another domain ending) is what indicates the real source. Scammers will often try to mislead you by placing words that sound official or credible at the start of a fake URL.",
        q1AnswerPara3: "The sender’s phone number can also help determine whether a text is legit. In this case, the sender is “22345.” A quick online search for this number leads directly to the official DHL website, where the company confirms that it uses this short code for sending text messages.",
        q1AnswerPara4: "Many scammers attempt to pass themselves off as delivery services. Watch out for texts like this.",
        q1AnswerPara5: "English translation: Dear client, your package is currently being held in customs. Please visit importfeesie.com/r/MT5220FX to resolve this promptly.",
        q1AnswerPara6: "The URL provided isn’t from a recognized delivery service or customs agency, and a quick search of the sender’s number fails to give any conclusive results.",

        // Question 2
        q2AnswerTitle: "This is a scam",
        q2AnswerPara1: "In fact, it’s been one of the most commonly reported scams in Canada since early 2023.",
        q2AnswerPara2: "The game plan is always the same: scammers pretending to be your landlord ask you to promptly make an Interac transfer to pay your overdue or unpaid rent.",
        q2AnswerPara3: "Be especially wary of any messages that urgently request money or Interac e-transfers. Once the transfer has been made, it can be very difficult — if not impossible — to get a refund. These transactions are almost instantaneous and considered final by banking institutions as soon as the recipient accepts the money.",

        // Question 3
        q3AnswerTitle: "This is a scam",
        q3AnswerPara1: "For several years now, fraudsters have been attempting to steal personal information by impersonating government agencies or state-owned corporations. In the example provided, the lure is a refund supposedly owed to you by the Société de l’assurance automobile du Québec (SAAQ). But scammers’ creativity knows no bounds. The Canada Revenue Agency, Hydro-Québec, Régie de l’assurance maladie du Québec (RAMQ): anything is fair game when it comes to trying to extract money from you.",
        q3AnswerPara2: "Until recently, the general rule was that the government and its agencies would never contact you by text. All you had to do, then, was ignore these supposed government messages. This still holds true — with one exception.",
        q3AnswerPara3: "Revenu Québec recently began notifying individuals about their files by text message. However, these messages will never include links or personal information; they simply inform you of changes to your file. What’s more, they’re only sent to people who had consented to receive such texts in their tax return.",
        q3AnswerPara4: "Keep in mind that scammers often capitalize on breaking news to make their scams appear more credible — and always be wary of texts that direct you to sites asking for personal information like your credit card number or password.",

        // Question 4
        q4AnswerTitle: "This is a scam",
        q4AnswerPara1: "While the message convincingly mimics the Microsoft visual identity, there are some pretty obvious red flags.",
        q4AnswerPara2: "First, email providers and employers don’t typically send messages encouraging you to keep the same password. It’s a tactic used by many phishing schemes to harvest your personal information and password.",
        q4AnswerPara3: "Otherwise, remember to always verify the sender’s email address with a quick online search. In this case, the address is “account-security-noreply@m365-microsoft.com,” which at first glance seems legit. However, the domain “m365-microsoft.com” doesn't actually belong to Microsoft, whose official website is microsoft.com.",
        q4AnswerPara4: "While it’s technically possible for a bad actor to spoof an email domain, major providers like Gmail or Outlook use security protocols that are set up to automatically block these kinds of messages.",
        q4AnswerPara5: "These protocols are not foolproof, however, since bad actors are constantly developing new ways to get around them. Be on your guard: never click on links or open attachments from unverified sources, and be wary of emails that direct you to websites asking for personal information like your credit card number or password.",

        // Question 5
        q5AnswerTitle: "This may be a scam (unless your first name is Eric)",
        q5AnswerPara1: "Even if your name is Eric, never trust messages from unknown senders. Many scams begin just like this, with a random text supposedly sent to the wrong person by mistake. The scammer’s goal is to gain your trust, then get you to hand over money.",
        q5AnswerPara2: "The perpetrators of this kind of scam, which is known as “pig butchering,” use every trick in the book to build trust with the victim, from fake social media profiles to photo sharing, voice messages and more. They may try to befriend you or even pose as a romantic partner in order to manipulate and steal from you.",
        q5AnswerPara3: "The ultimate goal is often to directly request money or draw the victim into an investment scam.",

        // Question 6
        q6AnswerTitle: "This is a scam",
        q6AnswerPara1: "This is a very common scam on online marketplaces like Kijiji or Facebook Marketplace. The vendor is lulled into a false sense of security with the promise of being given cash — but that’s only the first step. If you accept the offer, you’ll then get a message from the scammer that goes something like this:",
        q6AnswerPara2: "The specific amount and the means used to acquire it can vary (prepaid card, Interac transfer, etc.), but the scam is always the same: convincing you to pay “insurance fees,” then stealing your money with no delivery person ever showing up to hand over the promised cash.",
        q6AnswerPara3: "Sometimes the scammer will request a direct transfer, but they’re more likely to use a fake email made up to look as though it’s from the delivery company.",
        q6AnswerPara4: "Always be wary of buyers offering any method of purchase that doesn’t involve an in-person exchange of the item for cash. Interac e-Transfer scams are rare, but it’s still possible for someone to use a hacked account to send you funds, only for the bank to subsequently reverse the transaction.",

        // Question 7
        q7AnswerTitle: "This is a scam",
        q7AnswerPara1: "This tech support scam has been around for years and can take various forms — including Microsoft’s iconic “blue screen of death,” which typically appears as a pop-up.",
        q7AnswerPara2: "Whatever the case, the fraudsters want you to call the number on the screen. If you were to call, that would give them the chance to carry out one or more malicious actions — for example, taking remote control of your computer, charging you for costly subscriptions or installing spyware.",
        q7AnswerPara3: "Don’t worry and above all, do not call the number displayed on the screen. In some cases, the malicious site may refuse to close or disappear. If that happens, right-click the Start menu, open Task Manager and end any task that doesn’t align with the software you have open.",
        q7AnswerPara4: "This type of scam can also take the form of an unsolicited call from someone who claims to be a Microsoft representative.",
        q7AnswerPara5: "Keep in mind the following, which is from Microsoft’s website: “Microsoft does not send unsolicited email messages or make unsolicited phone calls to request personal or financial information, or to provide technical support to fix your computer.”",

        // Image Alt Texts
        imageQuestion1aAlt: "Question 1a Image",
        imageAnswer1bAlt: "Answer 1b Image",
        imageAnswer1cAlt: "Answer 1c Image",
        imageAnswer1dAlt: "Answer 1d Image",
        imageQuestion2aAlt: "Question 2a Image",
        imageQuestion2bAlt: "Question 2b Image",
        imageQuestion3aAlt: "Question 3a Image",
        imageQuestion4aAlt: "Question 4a Image",
        imageQuestion5aAlt: "Question 5a Image",
        imageQuestion6aAlt: "Question 6a Image",
        imageAnswer6bAlt: "Answer 6b Image",
        imageQuestion7aAlt: "Question 7a Image",
        imageAnswer7bAlt: "Answer 7b Image",
    }
};

// Function to show a page and hide others
function showPage(pageId) {
    // Clear any existing inactivity timer
    clearTimeout(inactivityTimer);

    // Hide all pages and wrappers
    document.querySelectorAll('.wrapper, .page-container').forEach(page => {
        page.classList.add('hidden');
    });
    // Show the requested page
    document.getElementById(pageId).classList.remove('hidden');
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    // Apply language after page display
    setLanguage(currentLanguage);

    // Set new inactivity timer if not on intro or outro page
    if (pageId !== 'introPage') {
        inactivityTimer = setTimeout(restartQuiz, 3 * 60 * 1000); // 3 minutes
    }
}

// Function to start the quiz
function startQuiz() {
    currentPage = 1;
    correctAnswers = 0; // Reset score at the start of the quiz
    showPage('page1');
}

// Function to move to the next question or conclusion
function nextQuestion(nextPageId) {
    // Reset timer on interaction
    clearTimeout(inactivityTimer);
    if (nextPageId === 'outroPage') {
        showOutro();
    } else {
        currentPage++;
        showPage(nextPageId);
    }
}

// Function to display the conclusion
function showOutro() {
    // Clear timer when reaching outro page
    clearTimeout(inactivityTimer);

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    document.getElementById('finalScorePercentage').textContent = `${percentage}%`;
    // Update the data attributes for the score count before translating
    const scoreCountElement = document.getElementById('finalScoreCount');
    scoreCountElement.dataset.correctAnswers = correctAnswers;
    scoreCountElement.dataset.totalQuestions = totalQuestions;

    // Get the score element and remove existing color classes
    const scoreDiv = document.querySelector('#outroPage .score');
    scoreDiv.classList.remove('red', 'yellow', 'green');

    // Apply new color class based on percentage
    const circle = scoreDiv.querySelector('circle');
    if (percentage < 57) {
        scoreDiv.classList.add('red');
        circle.setAttribute('fill', 'white');
    } else if (percentage < 80) {
        scoreDiv.classList.add('yellow');
        circle.setAttribute('fill', '#161616');
    } else {
        scoreDiv.classList.add('green');
        circle.setAttribute('fill', 'white');
    }

    setLanguage(currentLanguage); // Re-apply language to update score text
    showPage('outroPage');
}

// Function to restart the quiz
function restartQuiz() {
    // Clear timer when restarting
    clearTimeout(inactivityTimer);

    // Reset score and current page
    correctAnswers = 0;
    currentPage = 0;
    // Remove 'is-visible' class from all answer sections
    document.querySelectorAll('.answer').forEach(ans => {
        ans.scrollTop = 0; // Reset scroll position
        ans.classList.remove('is-visible');
    });
    // Reset answer button styles
    document.querySelectorAll('.btn-group .btn').forEach(btn => {
        btn.disabled = false; // Re-enable buttons
        // Remove any previous color classes before applying new ones
        btn.classList.remove('green', 'red', 'yellow');
        // The custom CSS for .btn will apply the default background-color
    });
    // Reset images on page 2
    document.getElementById('img-fr-2a').classList.remove('hidden');
    document.getElementById('img-fr-2b').classList.add('hidden');
    document.querySelector('.alt-btn[data-img-id="fr-2a"]').classList.add('active');
    document.querySelector('.alt-btn[data-img-id="fr-2b"]').classList.remove('active');

    // Remove dynamic score color class from outro page if it was set
    const scoreDiv = document.querySelector('#outroPage .score');
    if (scoreDiv) {
        scoreDiv.classList.remove('red', 'yellow', 'green');
    }

    showPage('introPage'); // Return to the introduction page
}

// Function to set the application language
function setLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang; // Update the lang attribute of the html tag

    // Update language switcher buttons
    document.getElementById('lang-fr').classList.remove('active');
    document.getElementById('lang-en').classList.remove('active');
    document.getElementById(`lang-${lang}`).classList.add('active');

    // Update document title
    document.title = translations[lang].documentTitle;

    // Update all elements with a data-key attribute
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.dataset.key;
        let translatedText = translations[lang][key];

        // Handle special cases for translation functions
        if (typeof translatedText === 'function') {
            if (key === 'questionXofY') {
                const qNum = element.dataset.questionNum;
                const totalQ = element.dataset.totalQuestions;
                element.textContent = translatedText(qNum, totalQ);
            } else if (key === 'outroScoreCount') {
                const correct = element.dataset.correctAnswers;
                const total = element.dataset.totalQuestions;
                element.textContent = translatedText(correct, total);
            }
        } else {
            // For simple texts
            element.textContent = translatedText;
        }

        // Handle alt attributes for images
        if (element.tagName === 'IMG' && element.dataset.key) {
            element.alt = translations[lang][element.dataset.key];
        }

        // If language is English, add .btn-wide class to .btn elements
        if (lang === 'en' && element.classList.contains('btn')) {
            element.classList.add('btn-wide');
        } else {
            element.classList.remove('btn-wide');
        }
    });
}

// Event listener for answer buttons
document.querySelectorAll('.btn-group .btn').forEach(button => {
    button.addEventListener('click', function() {
        // Reset timer on interaction
        clearTimeout(inactivityTimer);
        // Re-set the timer immediately after a button click (answer selected)
        // This ensures that if the user selects an answer but doesn't click "Next Question",
        // the inactivity timer still restarts from this point.
        inactivityTimer = setTimeout(restartQuiz, 3 * 60 * 1000); // 3 minutes

        const pageContainer = this.closest('.page-container');
        const pageNum = parseInt(pageContainer.id.replace('page', ''));
        const answerSection = pageContainer.querySelector('.answer');
        const nextButton = pageContainer.querySelector('.next');
        const questionButtons = pageContainer.querySelectorAll('.btn-group .btn');

        // Prevent multiple clicks on answer buttons
        questionButtons.forEach(btn => {
            btn.disabled = true;
            // Remove any previous color classes before applying new ones
            btn.classList.remove('green', 'red', 'yellow');
        });

        // Mark the chosen answer
        if (this.dataset.answer === correctAnswersMap[pageNum]) {
            this.classList.add('green'); // Correct answer
            correctAnswers++;
        } else {
            this.classList.add('red'); // Incorrect answer
            // Highlight the correct answer if the user was wrong
            questionButtons.forEach(btn => {
                if (btn.dataset.answer === correctAnswersMap[pageNum]) {
                    btn.classList.add('green');
                }
            });
        }

        // Show the answer section and "Next Question" button
        answerSection.classList.add('is-visible');
        if (nextButton) { // Ensure nextButton exists before trying to remove hidden
            nextButton.classList.remove('hidden');
        }
        // Apply language for the newly displayed answer section
        setLanguage(currentLanguage);
    });
});

// Event listener for alternative buttons on page 2
document.querySelectorAll('.alt-btn-group .alt-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Reset timer on interaction
        clearTimeout(inactivityTimer);
        // Remove 'active' class from all buttons
        document.querySelectorAll('.alt-btn-group .alt-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        this.classList.add('active');

        // Get the image ID from the clicked button
        const targetImgId = this.getAttribute('data-img-id');

        // Hide all images inside .q-img
        const container = this.closest('.q-img');
        container.querySelectorAll('img').forEach(img => {
            img.classList.add('hidden');
        });

        // Show the selected image
        const targetImg = container.querySelector(`#img-${targetImgId}`);
        if (targetImg) {
            targetImg.classList.remove('hidden');
        }
    });
});

// Show the introduction page on load and set initial language
document.addEventListener('DOMContentLoaded', () => {
    showPage('introPage');
    setLanguage(currentLanguage); // Ensure the default language is applied on load
});
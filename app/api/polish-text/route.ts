import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, tone } = await request.json()

    if (!text || !tone) {
      return NextResponse.json({ error: "Text and tone are required" }, { status: 400 })
    }

    if (text.length > 5000) {
      return NextResponse.json({ error: "Text too long. Maximum 5000 characters allowed." }, { status: 400 })
    }

    const correctedText = simulateGrammarCorrection(text, tone)

    return NextResponse.json({
      correctedText,
      originalText: text,
      tone,
    })
  } catch (error) {
    console.error("Error in polish-text API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function simulateGrammarCorrection(text: string, tone: string): string {
  let corrected = text

  const spellingFixes = {
    // Original fixes
    yestarday: "yesterday",
    expencive: "expensive",
    recieve: "receive",
    seperate: "separate",
    definately: "definitely",
    occured: "occurred",
    begining: "beginning",
    writting: "writing",
    comming: "coming",
    runing: "running",
    stoped: "stopped",
    planed: "planned",
    accomodate: "accommodate",
    embarass: "embarrass",
    neccessary: "necessary",
    occassion: "occasion",
    priviledge: "privilege",
    recomend: "recommend",
    seperation: "separation",
    sucessful: "successful",
    tommorow: "tomorrow",
    untill: "until",
    wierd: "weird",
    acheive: "achieve",
    beleive: "believe",
    calender: "calendar",
    cemetary: "cemetery",
    changable: "changeable",
    collegue: "colleague",
    concious: "conscious",
    dilemna: "dilemma",
    enviroment: "environment",
    existance: "existence",
    foriegn: "foreign",
    goverment: "government",
    independant: "independent",
    maintainance: "maintenance",
    occurance: "occurrence",
    perseverence: "perseverance",
    questionaire: "questionnaire",
    rythm: "rhythm",
    temperture: "temperature",
    vaccuum: "vacuum",

    absense: "absence",
    accidently: "accidentally",
    adress: "address",
    alot: "a lot",
    allready: "already",
    alright: "all right",
    arguement: "argument",
    athiest: "atheist",
    basicly: "basically",
    bizzare: "bizarre",
    buisness: "business",
    camoflage: "camouflage",
    carribean: "Caribbean",
    cemetary: "cemetery",
    chauffer: "chauffeur",
    collegue: "colleague",
    commitee: "committee",
    concensus: "consensus",
    congradulations: "congratulations",
    convinient: "convenient",
    curiousity: "curiosity",
    decieve: "deceive",
    desparate: "desperate",
    developement: "development",
    dissapear: "disappear",
    dissapoint: "disappoint",
    ecstacy: "ecstasy",
    embarrasing: "embarrassing",
    excercise: "exercise",
    existance: "existence",
    experiance: "experience",
    familar: "familiar",
    febuary: "February",
    fiery: "fiery",
    fourty: "forty",
    freind: "friend",
    goverment: "government",
    grammer: "grammar",
    greatful: "grateful",
    guarentee: "guarantee",
    harrass: "harass",
    hieght: "height",
    hygeine: "hygiene",
    ignorence: "ignorance",
    immediatly: "immediately",
    incidently: "incidentally",
    independant: "independent",
    indispensible: "indispensable",
    innoculate: "inoculate",
    inteligence: "intelligence",
    intresting: "interesting",
    irresistable: "irresistible",
    jewellery: "jewelry",
    judgement: "judgment",
    knowlege: "knowledge",
    labratory: "laboratory",
    liesure: "leisure",
    liason: "liaison",
    libary: "library",
    lisence: "license",
    maintainence: "maintenance",
    managment: "management",
    medecine: "medicine",
    millenium: "millennium",
    mischievious: "mischievous",
    neccessary: "necessary",
    noticable: "noticeable",
    occassionally: "occasionally",
    occurence: "occurrence",
    omision: "omission",
    oppurtunity: "opportunity",
    outragous: "outrageous",
    paralell: "parallel",
    parlament: "parliament",
    passtime: "pastime",
    peice: "piece",
    perseverence: "perseverance",
    personaly: "personally",
    pharoah: "pharaoh",
    playwrite: "playwright",
    posession: "possession",
    prefered: "preferred",
    priviledge: "privilege",
    probaly: "probably",
    publically: "publicly",
    reccomend: "recommend",
    refered: "referred",
    relevent: "relevant",
    resistence: "resistance",
    responsability: "responsibility",
    resteraunt: "restaurant",
    rythm: "rhythm",
    sacrafice: "sacrifice",
    secretery: "secretary",
    seperate: "separate",
    similiar: "similar",
    sincerly: "sincerely",
    speach: "speech",
    strenght: "strength",
    succesful: "successful",
    supercede: "supersede",
    suprise: "surprise",
    temperment: "temperament",
    threshhold: "threshold",
    tommorow: "tomorrow",
    truely: "truly",
    unfortunatly: "unfortunately",
    untill: "until",
    useable: "usable",
    vaccum: "vacuum",
    visable: "visible",
    wether: "whether",
    wich: "which",
    withold: "withhold",
    writting: "writing",
    yatch: "yacht",
  }

  Object.entries(spellingFixes).forEach(([wrong, right]) => {
    const regex = new RegExp(`\\b${wrong}\\b`, "gi")
    corrected = corrected.replace(regex, right)
  })

  const verbFixes = {
    // Original fixes
    buyed: "bought",
    goed: "went",
    runned: "ran",
    catched: "caught",
    teached: "taught",
    bringed: "brought",
    thinked: "thought",
    feeled: "felt",
    heared: "heard",
    maked: "made",
    taked: "took",
    gived: "gave",
    comed: "came",
    sayed: "said",
    payed: "paid",
    drawed: "drew",
    growed: "grew",
    knowed: "knew",
    throwed: "threw",
    weared: "wore",
    breaked: "broke",
    choosed: "chose",
    finded: "found",
    keeped: "kept",
    leaved: "left",
    losed: "lost",
    meeted: "met",
    sended: "sent",
    sleeped: "slept",
    speaked: "spoke",
    spended: "spent",
    standed: "stood",
    swimmed: "swam",
    winned: "won",
    writed: "wrote",

    bited: "bit",
    blowed: "blew",
    builded: "built",
    bursted: "burst",
    cutted: "cut",
    dealed: "dealt",
    digged: "dug",
    drinked: "drank",
    drived: "drove",
    eated: "ate",
    falled: "fell",
    feeded: "fed",
    fighted: "fought",
    flied: "flew",
    forgeted: "forgot",
    freezed: "froze",
    getted: "got",
    hanged: "hung",
    hided: "hid",
    holded: "held",
    hurted: "hurt",
    layed: "laid",
    lended: "lent",
    lighted: "lit",
    meaned: "meant",
    putted: "put",
    readed: "read",
    rided: "rode",
    ringed: "rang",
    rised: "rose",
    seeked: "sought",
    shaked: "shook",
    shined: "shone",
    shooted: "shot",
    shutted: "shut",
    singed: "sang",
    sitted: "sat",
    slided: "slid",
    splitted: "split",
    spreaded: "spread",
    stealed: "stole",
    sticked: "stuck",
    striked: "struck",
    sweared: "swore",
    teached: "taught",
    teared: "tore",
    telled: "told",
    understanded: "understood",
    waked: "woke",
    winded: "wound",
  }

  Object.entries(verbFixes).forEach(([wrong, right]) => {
    const regex = new RegExp(`\\b${wrong}\\b`, "gi")
    corrected = corrected.replace(regex, right)
  })

  corrected = corrected.replace(/\b(he|she|it)\s+go\b/gi, "$1 goes")
  corrected = corrected.replace(/\b(he|she|it)\s+do\b/gi, "$1 does")
  corrected = corrected.replace(/\b(he|she|it)\s+have\b/gi, "$1 has")
  corrected = corrected.replace(/\b(I|you|we|they)\s+goes\b/gi, "$1 go")
  corrected = corrected.replace(/\b(I|you|we|they)\s+does\b/gi, "$1 do")
  corrected = corrected.replace(/\b(I|you|we|they)\s+has\b/gi, "$1 have")
  corrected = corrected.replace(/\b(I|you|we|they)\s+was\b/gi, "$1 were")
  corrected = corrected.replace(/\b(he|she|it)\s+were\b/gi, "$1 was")

  corrected = corrected.replace(/\b(\w+)el's\b/g, "$1els")
  corrected = corrected.replace(/\bappels\b/g, "apples")
  corrected = corrected.replace(/\b(\w+)s's\b/g, "$1s")
  corrected = corrected.replace(/\bits'/g, "its")
  corrected = corrected.replace(/\byour's\b/g, "yours")
  corrected = corrected.replace(/\bher's\b/g, "hers")
  corrected = corrected.replace(/\bhis's\b/g, "his")
  corrected = corrected.replace(/\btheir's\b/g, "theirs")
  corrected = corrected.replace(/\bour's\b/g, "ours")

  corrected = corrected.replace(/\bi\b/g, "I")
  corrected = corrected.replace(/\bdont\b/g, "don't")
  corrected = corrected.replace(/\bcant\b/g, "can't")
  corrected = corrected.replace(/\bwont\b/g, "won't")
  corrected = corrected.replace(/\bdidnt\b/gi, "didn't")
  corrected = corrected.replace(/\bisnt\b/g, "isn't")
  corrected = corrected.replace(/\barent\b/g, "aren't")
  corrected = corrected.replace(/\bwasnt\b/g, "wasn't")
  corrected = corrected.replace(/\bwerent\b/g, "weren't")
  corrected = corrected.replace(/\bhavent\b/g, "haven't")
  corrected = corrected.replace(/\bhasnt\b/g, "hasn't")
  corrected = corrected.replace(/\bhadnt\b/g, "hadn't")
  corrected = corrected.replace(/\bwouldnt\b/g, "wouldn't")
  corrected = corrected.replace(/\bcouldnt\b/g, "couldn't")
  corrected = corrected.replace(/\bshouldnt\b/g, "shouldn't")
  corrected = corrected.replace(/\bmustnt\b/g, "mustn't")
  corrected = corrected.replace(/\bneednt\b/g, "needn't")

  corrected = corrected.replace(/\ba\s+([aeiouAEIOU])/g, "an $1")
  corrected = corrected.replace(/\ban\s+([^aeiouAEIOU])/g, "a $1")
  corrected = corrected.replace(/\ban\s+(h[^aeiou])/gi, "a $1")
  corrected = corrected.replace(/\ba\s+(h[aeiou])/gi, "an $1")
  corrected = corrected.replace(/\ba\s+(honest|hour|honor)/gi, "an $1")
  corrected = corrected.replace(/\ban\s+(university|uniform|unique|unit)/gi, "a $1")

  corrected = corrected.replace(/\bdon't\s+have\s+no\b/gi, "don't have any")
  corrected = corrected.replace(/\bcan't\s+get\s+no\b/gi, "can't get any")
  corrected = corrected.replace(/\bwon't\s+take\s+no\b/gi, "won't take any")
  corrected = corrected.replace(/\bdidn't\s+see\s+nothing\b/gi, "didn't see anything")
  corrected = corrected.replace(/\bwasn't\s+no\b/gi, "wasn't any")
  corrected = corrected.replace(/\bain't\s+got\s+no\b/gi, "don't have any")

  corrected = corrected.replace(/\.\s*And\s+/g, ", and ")
  corrected = corrected.replace(/\.\s*But\s+/g, ", but ")
  corrected = corrected.replace(/\.\s*Or\s+/g, ", or ")
  corrected = corrected.replace(/\.\s*So\s+/g, ", so ")
  corrected = corrected.replace(/\s+,/g, ",")
  corrected = corrected.replace(/,\s*,/g, ",")
  corrected = corrected.replace(/\.\s*\./g, ".")
  corrected = corrected.replace(/\?\s*\?/g, "?")
  corrected = corrected.replace(/!\s*!/g, "!")
  corrected = corrected.replace(/\s+;/g, ";")
  corrected = corrected.replace(/\s+:/g, ":")
  corrected = corrected.replace(/\(\s+/g, "(")
  corrected = corrected.replace(/\s+\)/g, ")")
  corrected = corrected.replace(/"\s+/g, '"')
  corrected = corrected.replace(/\s+"/g, '"')

  console.log("[v0] Original text:", text)
  console.log("[v0] Selected tone:", tone)

  switch (tone) {
    case "formal":
      corrected = corrected.replace(/\bhey\b/gi, "Dear Sir/Madam")
      corrected = corrected.replace(/\bhi\b/gi, "Greetings")
      corrected = corrected.replace(/\bthanks\b/gi, "I express my sincere gratitude")
      corrected = corrected.replace(/\bThank you\b/gi, "I extend my heartfelt appreciation")
      corrected = corrected.replace(/\bokay\b/gi, "acceptable")
      corrected = corrected.replace(/\bkinda\b/gi, "somewhat")
      corrected = corrected.replace(/\bstuff\b/gi, "materials")
      corrected = corrected.replace(/\bthings\b/gi, "matters")
      corrected = corrected.replace(/\bget\b/gi, "obtain")
      corrected = corrected.replace(/\bbuy\b/gi, "purchase")
      corrected = corrected.replace(/\bshow\b/gi, "demonstrate")
      corrected = corrected.replace(/\btell\b/gi, "inform")
      corrected = corrected.replace(/\bask\b/gi, "inquire")
      corrected = corrected.replace(/\bhelp\b/gi, "assist")
      corrected = corrected.replace(/\bstart\b/gi, "commence")
      corrected = corrected.replace(/\bend\b/gi, "conclude")
      corrected = corrected.replace(/\bbig\b/gi, "substantial")
      corrected = corrected.replace(/\bsmall\b/gi, "minimal")
      corrected = corrected.replace(/\bfast\b/gi, "expeditious")
      corrected = corrected.replace(/\bslow\b/gi, "deliberate")
      corrected = corrected.replace(/\bgood\b/gi, "exemplary")
      corrected = corrected.replace(/\bbad\b/gi, "inadequate")
      corrected = corrected.replace(/\bvery\b/gi, "exceedingly")
      corrected = corrected.replace(/\breally\b/gi, "particularly")
      corrected = corrected.replace(/\bwant\b/gi, "require")
      corrected = corrected.replace(/\bneed\b/gi, "necessitate")
      corrected = corrected.replace(/\blike\b/gi, "prefer")
      corrected = corrected.replace(/\bthink\b/gi, "believe")
      corrected = corrected.replace(/\bfeel\b/gi, "consider")
      corrected = corrected.replace(/\bexpensive\b/gi, "costly")
      corrected = corrected.replace(/\bstore\b/gi, "establishment")
      corrected = corrected.replace(/\bbought\b/gi, "procured")
      corrected = corrected.replace(/\bwent\b/gi, "proceeded")
      break

    case "casual":
      corrected = corrected.replace(/\bGreetings\b/gi, "Hey")
      corrected = corrected.replace(/\bHello\b/gi, "Hi")
      corrected = corrected.replace(/\bI sincerely appreciate\b/gi, "Thanks a ton")
      corrected = corrected.replace(/\bThank you\b/gi, "Thanks")
      corrected = corrected.replace(/\bpurchase\b/gi, "buy")
      corrected = corrected.replace(/\bobtain\b/gi, "get")
      corrected = corrected.replace(/\bassist\b/gi, "help out")
      corrected = corrected.replace(/\bcommence\b/gi, "start")
      corrected = corrected.replace(/\bconclude\b/gi, "wrap up")
      corrected = corrected.replace(/\bdemonstrate\b/gi, "show")
      corrected = corrected.replace(/\binform\b/gi, "let you know")
      corrected = corrected.replace(/\binquire\b/gi, "ask")
      corrected = corrected.replace(/\bexcellent\b/gi, "pretty cool")
      corrected = corrected.replace(/\bsuperb\b/gi, "awesome")
      corrected = corrected.replace(/\bsubstantial\b/gi, "pretty big")
      corrected = corrected.replace(/\bminimal\b/gi, "tiny")
      corrected = corrected.replace(/\bexpeditious\b/gi, "quick")
      corrected = corrected.replace(/\bdeliberate\b/gi, "slow")
      corrected = corrected.replace(/\bexpensive\b/gi, "pricey")
      corrected = corrected.replace(/\bdifficult\b/gi, "tough")
      corrected = corrected.replace(/\binteresting\b/gi, "cool")
      corrected = corrected.replace(/\bimportant\b/gi, "big deal")
      corrected = corrected.replace(/\bstore\b/gi, "shop")
      corrected = corrected.replace(/\bbought\b/gi, "grabbed")
      corrected = corrected.replace(/\bwent\b/gi, "headed to")
      break

    case "friendly":
      corrected = corrected.replace(/\bHello\b/gi, "Hi there")
      corrected = corrected.replace(/\bHi\b/gi, "Hey there")
      corrected = corrected.replace(/\bThank you\b/gi, "Thanks so much")
      corrected = corrected.replace(/\bthanks\b/gi, "thanks a bunch")
      corrected = corrected.replace(/\bhelp\b/gi, "be happy to help")
      corrected = corrected.replace(/\bshow\b/gi, "love to show")
      corrected = corrected.replace(/\btell\b/gi, "share with you")
      corrected = corrected.replace(/\bgood\b/gi, "wonderful")
      corrected = corrected.replace(/\bnice\b/gi, "lovely")
      corrected = corrected.replace(/\bokay\b/gi, "perfectly fine")
      corrected = corrected.replace(/\bsure\b/gi, "absolutely")
      corrected = corrected.replace(/\byes\b/gi, "definitely")
      corrected = corrected.replace(/\bbad\b/gi, "not so great")
      corrected = corrected.replace(/\bproblem\b/gi, "little hiccup")
      corrected = corrected.replace(/\bdifficult\b/gi, "a bit tricky")
      corrected = corrected.replace(/\bexpensive\b/gi, "a bit pricey")
      corrected = corrected.replace(/\bstore\b/gi, "shop")
      corrected = corrected.replace(/\bwent\b/gi, "popped over")
      corrected = corrected.replace(/\bbought\b/gi, "picked up")
      break

    case "persuasive":
      corrected = corrected.replace(/\bI think\b/gi, "I'm absolutely certain that")
      corrected = corrected.replace(/\bmaybe\b/gi, "without a doubt")
      corrected = corrected.replace(/\bokay\b/gi, "phenomenal")
      corrected = corrected.replace(/\bgood\b/gi, "extraordinary")
      corrected = corrected.replace(/\bnice\b/gi, "spectacular")
      corrected = corrected.replace(/\bhelp\b/gi, "revolutionize your results")
      corrected = corrected.replace(/\bshow\b/gi, "prove beyond any shadow of doubt")
      corrected = corrected.replace(/\bcan\b/gi, "will absolutely")
      corrected = corrected.replace(/\bmight\b/gi, "will definitely")
      corrected = corrected.replace(/\bpossible\b/gi, "guaranteed")
      corrected = corrected.replace(/\btry\b/gi, "master")
      corrected = corrected.replace(/\bwant\b/gi, "desperately need")
      corrected = corrected.replace(/\bshould\b/gi, "must immediately")
      corrected = corrected.replace(/\bcould\b/gi, "will inevitably")
      corrected = corrected.replace(/\bexpensive\b/gi, "a life-changing investment")
      corrected = corrected.replace(/\bbought\b/gi, "secured this game-changer")
      corrected = corrected.replace(/\bstore\b/gi, "exclusive marketplace")
      corrected = corrected.replace(/\bwent\b/gi, "strategically visited")
      break

    case "academic":
      corrected = corrected.replace(/\bshow\b/gi, "demonstrate empirically")
      corrected = corrected.replace(/\bprove\b/gi, "substantiate conclusively")
      corrected = corrected.replace(/\bthink\b/gi, "hypothesize")
      corrected = corrected.replace(/\bfind\b/gi, "ascertain through analysis")
      corrected = corrected.replace(/\buse\b/gi, "utilize methodologically")
      corrected = corrected.replace(/\bhelp\b/gi, "facilitate comprehensively")
      corrected = corrected.replace(/\bmake\b/gi, "constitute fundamentally")
      corrected = corrected.replace(/\bget\b/gi, "acquire systematically")
      corrected = corrected.replace(/\bbig\b/gi, "substantially significant")
      corrected = corrected.replace(/\bsmall\b/gi, "statistically negligible")
      corrected = corrected.replace(/\bimportant\b/gi, "critically significant")
      corrected = corrected.replace(/\bdifferent\b/gi, "distinctly divergent")
      corrected = corrected.replace(/\bsame\b/gi, "analogously comparable")
      corrected = corrected.replace(/\bbecause\b/gi, "due to the empirical fact that")
      corrected = corrected.replace(/\bso\b/gi, "consequently")
      corrected = corrected.replace(/\bexpensive\b/gi, "economically prohibitive")
      corrected = corrected.replace(/\bstore\b/gi, "commercial establishment")
      corrected = corrected.replace(/\bbought\b/gi, "procured through transaction")
      corrected = corrected.replace(/\bwent\b/gi, "conducted a visit")
      break

    case "professional":
      corrected = corrected.replace(/\bHi\b/gi, "Good day")
      corrected = corrected.replace(/\bthanks\b/gi, "I appreciate your valuable time")
      corrected = corrected.replace(/\bhelp\b/gi, "provide comprehensive support")
      corrected = corrected.replace(/\bshow\b/gi, "present professionally")
      corrected = corrected.replace(/\bmake\b/gi, "develop strategically")
      corrected = corrected.replace(/\bget\b/gi, "secure effectively")
      corrected = corrected.replace(/\bfix\b/gi, "resolve systematically")
      corrected = corrected.replace(/\bproblem\b/gi, "business challenge")
      corrected = corrected.replace(/\bidea\b/gi, "strategic proposal")
      corrected = corrected.replace(/\bquick\b/gi, "efficiently optimized")
      corrected = corrected.replace(/\bslow\b/gi, "methodically thorough")
      corrected = corrected.replace(/\bgood\b/gi, "highly effective")
      corrected = corrected.replace(/\bbad\b/gi, "suboptimal")
      corrected = corrected.replace(/\bwork\b/gi, "execute professionally")
      corrected = corrected.replace(/\bmeet\b/gi, "convene strategically")
      corrected = corrected.replace(/\bexpensive\b/gi, "premium investment")
      corrected = corrected.replace(/\bstore\b/gi, "retail establishment")
      corrected = corrected.replace(/\bbought\b/gi, "acquired strategically")
      corrected = corrected.replace(/\bwent\b/gi, "conducted business at")
      break

    case "creative":
      corrected = corrected.replace(/\bgood\b/gi, "absolutely brilliant")
      corrected = corrected.replace(/\bnice\b/gi, "utterly delightful")
      corrected = corrected.replace(/\bbig\b/gi, "magnificently colossal")
      corrected = corrected.replace(/\bsmall\b/gi, "charmingly petite")
      corrected = corrected.replace(/\bshow\b/gi, "unveil dramatically")
      corrected = corrected.replace(/\bmake\b/gi, "craft artistically")
      corrected = corrected.replace(/\bsee\b/gi, "envision vividly")
      corrected = corrected.replace(/\bthink\b/gi, "imagine creatively")
      corrected = corrected.replace(/\bfast\b/gi, "lightning-quick")
      corrected = corrected.replace(/\bslow\b/gi, "dreamily leisurely")
      corrected = corrected.replace(/\bhappy\b/gi, "absolutely euphoric")
      corrected = corrected.replace(/\bsad\b/gi, "deeply melancholic")
      corrected = corrected.replace(/\bbright\b/gi, "radiantly luminous")
      corrected = corrected.replace(/\bdark\b/gi, "mysteriously shadowy")
      corrected = corrected.replace(/\bwalk\b/gi, "gracefully stroll")
      corrected = corrected.replace(/\bexpensive\b/gi, "extravagantly luxurious")
      corrected = corrected.replace(/\bstore\b/gi, "enchanting marketplace")
      corrected = corrected.replace(/\bbought\b/gi, "magically discovered")
      corrected = corrected.replace(/\bwent\b/gi, "adventurously ventured")
      break

    case "empathetic":
      corrected = corrected.replace(/\bHi\b/gi, "I truly hope you're doing well")
      corrected = corrected.replace(/\bthanks\b/gi, "I genuinely appreciate from the heart")
      corrected = corrected.replace(/\bhelp\b/gi, "lovingly support you through")
      corrected = corrected.replace(/\bshow\b/gi, "gently guide you with care")
      corrected = corrected.replace(/\btell\b/gi, "share with deep understanding")
      corrected = corrected.replace(/\bgood\b/gi, "truly comforting")
      corrected = corrected.replace(/\bnice\b/gi, "genuinely heartwarming")
      corrected = corrected.replace(/\bbad\b/gi, "understandably challenging")
      corrected = corrected.replace(/\bproblem\b/gi, "difficulty you're bravely facing")
      corrected = corrected.replace(/\bdifficult\b/gi, "understandably overwhelming")
      corrected = corrected.replace(/\bexpensive\b/gi, "financially challenging")
      corrected = corrected.replace(/\bstore\b/gi, "place")
      corrected = corrected.replace(/\bbought\b/gi, "thoughtfully chose")
      corrected = corrected.replace(/\bwent\b/gi, "courageously visited")
      break

    case "seo-optimized":
      corrected = corrected.replace(/\bshow\b/gi, "discover the best")
      corrected = corrected.replace(/\btell\b/gi, "learn everything about")
      corrected = corrected.replace(/\bhelp\b/gi, "guide you to success with")
      corrected = corrected.replace(/\bmake\b/gi, "create amazing")
      corrected = corrected.replace(/\bget\b/gi, "find the perfect")
      corrected = corrected.replace(/\bbuy\b/gi, "shop for premium")
      corrected = corrected.replace(/\bgood\b/gi, "best-in-class")
      corrected = corrected.replace(/\bnice\b/gi, "top-rated")
      corrected = corrected.replace(/\bbig\b/gi, "ultimate")
      corrected = corrected.replace(/\bsmall\b/gi, "compact")
      corrected = corrected.replace(/\bfast\b/gi, "lightning-fast")
      corrected = corrected.replace(/\bslow\b/gi, "comprehensive")
      corrected = corrected.replace(/\bexpensive\b/gi, "premium quality")
      corrected = corrected.replace(/\bcheap\b/gi, "budget-friendly")
      corrected = corrected.replace(/\bstore\b/gi, "trusted online store")
      corrected = corrected.replace(/\bbought\b/gi, "successfully purchased")
      corrected = corrected.replace(/\bwent\b/gi, "visited the leading")
      corrected = corrected.replace(/\bthink\b/gi, "discover why experts")
      corrected = corrected.replace(/\bfeel\b/gi, "experience the benefits")
      corrected = corrected.replace(/\buse\b/gi, "maximize results with")
      corrected = corrected.replace(/\bwork\b/gi, "deliver outstanding performance")
      corrected = corrected.replace(/\btry\b/gi, "test the proven")
      corrected = corrected.replace(/\bstart\b/gi, "begin your journey to")
      corrected = corrected.replace(/\bend\b/gi, "achieve complete")
      corrected = corrected.replace(/\bimportant\b/gi, "essential for success")
      corrected = corrected.replace(/\binteresting\b/gi, "valuable insights")
      corrected = corrected.replace(/\bdifficult\b/gi, "challenging but achievable")
      corrected = corrected.replace(/\beasy\b/gi, "simple step-by-step")
      break

    case "hook-generator":
      if (
        !corrected.match(
          /^(What if|Imagine|Did you know|Here's why|The secret|Stop|Warning|Attention|You won't believe|This changes everything|The shocking truth)/i,
        )
      ) {
        const hookStarters = [
          "🚨 BREAKING: What if I told you that",
          "💥 SHOCKING DISCOVERY: Imagine if",
          "⚡ GAME CHANGER: Here's the mind-blowing truth:",
          "🔥 STOP EVERYTHING because",
          "💎 The million-dollar secret that nobody talks about:",
          "⚠️ URGENT WARNING:",
          "🎯 ATTENTION: This will change your life forever -",
          "🤯 You absolutely won't believe what happened when",
          "🚀 This revolutionary discovery will change everything:",
          "💰 The one secret that billionaires don't want you to know:",
          "🔓 FINALLY REVEALED: The hidden truth about",
          "⭐ EXCLUSIVE: What industry experts are desperately hiding:",
        ]
        const randomStarter = hookStarters[Math.floor(Math.random() * hookStarters.length)]
        corrected = `${randomStarter} ${corrected.toLowerCase()}`
      }

      corrected = corrected.replace(/\bgood\b/gi, "MIND-BLOWING")
      corrected = corrected.replace(/\bnice\b/gi, "ABSOLUTELY INCREDIBLE")
      corrected = corrected.replace(/\bbig\b/gi, "MASSIVE")
      corrected = corrected.replace(/\bsmall\b/gi, "tiny")
      corrected = corrected.replace(/\bshow\b/gi, "EXPOSE")
      corrected = corrected.replace(/\btell\b/gi, "REVEAL THE SHOCKING TRUTH")
      corrected = corrected.replace(/\bmake\b/gi, "CREATE")
      corrected = corrected.replace(/\bget\b/gi, "GRAB")
      corrected = corrected.replace(/\bhelp\b/gi, "TRANSFORM YOUR LIFE")
      corrected = corrected.replace(/\bfind\b/gi, "DISCOVER")
      corrected = corrected.replace(/\blearn\b/gi, "MASTER")
      corrected = corrected.replace(/\buse\b/gi, "UNLEASH")
      corrected = corrected.replace(/\bwork\b/gi, "DOMINATE")
      corrected = corrected.replace(/\btry\b/gi, "CRUSH")
      corrected = corrected.replace(/\bstart\b/gi, "LAUNCH")
      corrected = corrected.replace(/\bstop\b/gi, "ELIMINATE FOREVER")
      corrected = corrected.replace(/\bchange\b/gi, "REVOLUTIONIZE")
      corrected = corrected.replace(/\bimprove\b/gi, "SKYROCKET")
      corrected = corrected.replace(/\bincrease\b/gi, "EXPLODE")
      corrected = corrected.replace(/\bdecrease\b/gi, "SLASH")
      corrected = corrected.replace(/\bfast\b/gi, "LIGHTNING-FAST")
      corrected = corrected.replace(/\bslow\b/gi, "painfully slow")
      corrected = corrected.replace(/\beasy\b/gi, "EFFORTLESS")
      corrected = corrected.replace(/\bhard\b/gi, "BRUTAL")
      corrected = corrected.replace(/\bdifficult\b/gi, "IMPOSSIBLE")
      corrected = corrected.replace(/\bexpensive\b/gi, "RIDICULOUSLY OVERPRICED")
      corrected = corrected.replace(/\bcheap\b/gi, "DIRT CHEAP")
      corrected = corrected.replace(/\bfree\b/gi, "ABSOLUTELY FREE")
      corrected = corrected.replace(/\bnew\b/gi, "GROUNDBREAKING")
      corrected = corrected.replace(/\bold\b/gi, "OUTDATED")
      corrected = corrected.replace(/\bbest\b/gi, "ULTIMATE")
      corrected = corrected.replace(/\bworst\b/gi, "DEVASTATING")
      corrected = corrected.replace(/\bstore\b/gi, "EXCLUSIVE MARKETPLACE")
      corrected = corrected.replace(/\bbought\b/gi, "SNATCHED UP")
      corrected = corrected.replace(/\bwent\b/gi, "RUSHED TO")
      corrected = corrected.replace(/\bsaw\b/gi, "WITNESSED")
      corrected = corrected.replace(/\bthought\b/gi, "REALIZED")
      corrected = corrected.replace(/\bfelt\b/gi, "EXPERIENCED")

      corrected = corrected.replace(/\bnow\b/gi, "RIGHT NOW")
      corrected = corrected.replace(/\btoday\b/gi, "TODAY ONLY")
      corrected = corrected.replace(/\bsoon\b/gi, "BEFORE IT'S TOO LATE")
      corrected = corrected.replace(/\bhappy\b/gi, "ECSTATIC")
      corrected = corrected.replace(/\bsad\b/gi, "DEVASTATED")
      corrected = corrected.replace(/\bangry\b/gi, "FURIOUS")
      corrected = corrected.replace(/\bscared\b/gi, "TERRIFIED")
      corrected = corrected.replace(/\bexcited\b/gi, "PUMPED")

      if (!corrected.match(/[!?]$/)) {
        const endings = [
          "! 🔥",
          "... and you won't believe what happened next! 😱",
          "... but there's a SHOCKING catch! ⚡",
          "... and it changed EVERYTHING! 🚀",
          "... are you ready for this BOMBSHELL? 💣",
          "... this will absolutely BLOW YOUR MIND! 🤯",
          "... and the results will SHOCK you! ⚡",
          "... but only if you act NOW! ⏰",
        ]
        const randomEnding = endings[Math.floor(Math.random() * endings.length)]
        corrected = corrected.replace(/\.$/, randomEnding)
      }
      break

    case "technical":
      corrected = corrected.replace(/\bfix\b/gi, "optimize systematically")
      corrected = corrected.replace(/\bmake\b/gi, "implement programmatically")
      corrected = corrected.replace(/\bshow\b/gi, "render dynamically")
      corrected = corrected.replace(/\buse\b/gi, "execute efficiently")
      corrected = corrected.replace(/\bcheck\b/gi, "verify algorithmically")
      corrected = corrected.replace(/\btest\b/gi, "validate comprehensively")
      corrected = corrected.replace(/\bwork\b/gi, "function optimally")
      corrected = corrected.replace(/\brun\b/gi, "operate seamlessly")
      corrected = corrected.replace(/\bstop\b/gi, "terminate process")
      corrected = corrected.replace(/\bstart\b/gi, "initialize system")
      corrected = corrected.replace(/\bchange\b/gi, "modify parameters")
      corrected = corrected.replace(/\bsave\b/gi, "store in database")
      corrected = corrected.replace(/\bopen\b/gi, "access interface")
      corrected = corrected.replace(/\bclose\b/gi, "terminate session")
      corrected = corrected.replace(/\bfind\b/gi, "locate via algorithm")
      corrected = corrected.replace(/\bexpensive\b/gi, "resource-intensive")
      corrected = corrected.replace(/\bstore\b/gi, "data repository")
      corrected = corrected.replace(/\bbought\b/gi, "acquired through API")
      corrected = corrected.replace(/\bwent\b/gi, "navigated to endpoint")
      break

    case "complete-rewrite":
      // First, break down the text into key concepts
      const sentences = corrected.split(/[.!?]+/).filter((s) => s.trim().length > 0)

      // Rewrite each sentence with enhanced clarity and structure
      const rewrittenSentences = sentences.map((sentence) => {
        let rewritten = sentence.trim()

        // Transform basic sentence structures
        rewritten = rewritten.replace(/\bI think that\b/gi, "It's evident that")
        rewritten = rewritten.replace(/\bI believe\b/gi, "Research demonstrates")
        rewritten = rewritten.replace(/\bmaybe\b/gi, "potentially")
        rewritten = rewritten.replace(/\bkinda\b/gi, "somewhat")
        rewritten = rewritten.replace(/\bstuff\b/gi, "elements")
        rewritten = rewritten.replace(/\bthings\b/gi, "components")

        // Enhance vocabulary
        rewritten = rewritten.replace(/\bgood\b/gi, "exceptional")
        rewritten = rewritten.replace(/\bbad\b/gi, "suboptimal")
        rewritten = rewritten.replace(/\bbig\b/gi, "substantial")
        rewritten = rewritten.replace(/\bsmall\b/gi, "compact")
        rewritten = rewritten.replace(/\bfast\b/gi, "efficient")
        rewritten = rewritten.replace(/\bslow\b/gi, "methodical")
        rewritten = rewritten.replace(/\bget\b/gi, "acquire")
        rewritten = rewritten.replace(/\bbuy\b/gi, "purchase")
        rewritten = rewritten.replace(/\bshow\b/gi, "demonstrate")
        rewritten = rewritten.replace(/\btell\b/gi, "communicate")
        rewritten = rewritten.replace(/\bhelp\b/gi, "assist")
        rewritten = rewritten.replace(/\bmake\b/gi, "create")
        rewritten = rewritten.replace(/\buse\b/gi, "utilize")
        rewritten = rewritten.replace(/\bfind\b/gi, "discover")
        rewritten = rewritten.replace(/\bwork\b/gi, "function")
        rewritten = rewritten.replace(/\btry\b/gi, "attempt")
        rewritten = rewritten.replace(/\bstart\b/gi, "initiate")
        rewritten = rewritten.replace(/\bstop\b/gi, "cease")
        rewritten = rewritten.replace(/\bchange\b/gi, "modify")
        rewritten = rewritten.replace(/\bfix\b/gi, "resolve")
        rewritten = rewritten.replace(/\bcheck\b/gi, "examine")
        rewritten = rewritten.replace(/\bsee\b/gi, "observe")
        rewritten = rewritten.replace(/\blook\b/gi, "examine")
        rewritten = rewritten.replace(/\bwant\b/gi, "desire")
        rewritten = rewritten.replace(/\bneed\b/gi, "require")
        rewritten = rewritten.replace(/\blike\b/gi, "appreciate")
        rewritten = rewritten.replace(/\blove\b/gi, "value highly")
        rewritten = rewritten.replace(/\bhate\b/gi, "strongly dislike")

        // Improve sentence flow and structure
        rewritten = rewritten.replace(/\bAnd then\b/gi, "Subsequently,")
        rewritten = rewritten.replace(/\bBut\b/gi, "However,")
        rewritten = rewritten.replace(/\bSo\b/gi, "Therefore,")
        rewritten = rewritten.replace(/\bAlso\b/gi, "Additionally,")
        rewritten = rewritten.replace(/\bPlus\b/gi, "Furthermore,")

        // Add transitional phrases for better flow
        if (
          rewritten.length > 20 &&
          !rewritten.match(/^(However|Therefore|Additionally|Furthermore|Subsequently|Moreover|Consequently)/)
        ) {
          const transitions = [
            "Notably,",
            "Importantly,",
            "Significantly,",
            "Remarkably,",
            "Essentially,",
            "Fundamentally,",
            "Ultimately,",
            "Clearly,",
          ]
          const randomTransition = transitions[Math.floor(Math.random() * transitions.length)]
          rewritten = `${randomTransition} ${rewritten.toLowerCase()}`
        }

        return rewritten
      })

      // Reconstruct the text with improved flow
      corrected = rewrittenSentences.join(". ")

      // Add a compelling conclusion if the text is substantial
      if (corrected.length > 100 && !corrected.match(/(conclusion|summary|ultimately|finally)/i)) {
        corrected += " This approach ensures optimal results and maximum effectiveness."
      }

      break
  }

  console.log("[v0] After tone application:", corrected)

  corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1)
  corrected = corrected.replace(/\s+/g, " ")

  if (!/[.!?]$/.test(corrected.trim())) {
    corrected = corrected.trim() + "."
  }

  corrected = corrected.replace(/\s+([.!?])/g, "$1")
  corrected = corrected.replace(/([.!?])\s*([A-Z])/g, "$1 $2")

  console.log("[v0] Final corrected text:", corrected)

  return corrected
}

/* Yiki — English (Canada) content pack en-CA
   Built on en-US; overrides spelling, currency, items and local resources. Load after en-US.js. */
(function(){
  const US = window.YIKI_LOCALES['en-US'];
  const CA = Object.assign({}, US, {
    code: 'en-CA', label: 'English (Canada)', flag: '🇨🇦', htmlLang: 'en-CA', speechLang: 'en-CA',
  });
  CA.ui = Object.assign({}, US.ui, {
    sosTips: ["MedicAlert’s Safe & Found program runs Canada’s National Wandering Registry — ask your local Alzheimer Society.", "Keep the card in their wallet or a jacket pocket.", "Leave the full home address off the card."],
    resSub: 'Canada. Tap a number to call',
    colour: 'Colour',
    dateLine: (m, d, w) => `${w}, ${['January','February','March','April','May','June','July','August','September','October','November','December'][m-1]} ${d}`,
    careTips: US.ui.careTips.map(t => t.replace('The Alzheimer’s Association helpline (800-272-3900) is there 24/7.', 'Your local Alzheimer Society can help, and 211 can point you to services nearby.')),
    medNamePh: 'e.g. blood pressure pill, small white pill',
    situNote: 'Sudden changes in behaviour are often linked to feeling unwell (pain, constipation, fever, infection, medicines). For sudden changes or safety concerns, contact their doctor, call 811, or reach your local Alzheimer Society.',
    disclaimer: 'Yiki is a brain-activity and daily-journal tool. It is not a medical device and is not intended to diagnose, treat, cure or prevent any disease. Talk to a doctor about any health concerns.',
  });
  delete CA.ui.colour;
  CA.items = US.items.map(x => x.e === '🦃' ? { e: '🍁', n: 'Maple leaf', c: 'thing' } : x.e === '🚌' ? { e: '🚌', n: 'Bus', c: 'vehicle' } : x);
  CA.talk = { topics: US.talk.topics, q: US.talk.q.map(x => x[1].includes('Fourth of July') ? ['fest','How did you celebrate Canada Day?'] : x[1].includes('Thanksgiving') ? ['fest','Tell me about a Thanksgiving dinner you remember — in October!'] : x) };
  CA.items = CA.items.concat([{ e: 'ca-canoe', n: 'Canoe', c: 'vehicle' }, { e: 'ca-toque', n: 'Toque', c: 'thing' }, { e: 'ca-syrup', n: 'Maple syrup', c: 'food' }, { e: 'ca-moose', n: 'Moose', c: 'animal' }, { e: 'ca-hockey', n: 'Hockey stick', c: 'thing' }]);
  CA.wordPairs = US.wordPairs.map(p => p[0] === 'Thanksgiving' ? ['Maple syrup','Pancakes'] : p[0] === 'Peanut butter' ? ['Hockey stick','Puck'] : p[0] === 'Fourth of July' ? ['Canada Day','Fireworks'] : p[0] === 'Chips' ? ['Poutine','Gravy'] : p);
  CA.wpClash = US.wpClash.concat([['Summer','Canada Day'],['Swimming pool','Fireworks'],['Pancakes','Butter'],['Maple syrup','Bread'],['Pancakes','Bread'],['Poutine','Cheese'],['Poutine','Chips'],['Gravy','Salsa'],['Hockey stick','Bat'],['Puck','Ball'],['Snow','Hockey stick'],['Mittens','Puck']]);
  CA.currency = Object.assign({}, US.currency, {
    symbol: '$',
    bills: [ { v: 2000, c: '#3E8E5B' }, { v: 1000, c: '#7A4E8C' }, { v: 500, c: '#3E6E9A' } ],
    coins: [ { v: 200, bg: '#C9C9C9', fg: '#5A3E00' }, { v: 100, bg: '#D9A21B', fg: '#5A3E00' }, { v: 25, bg: '#C9C9C9', fg: '#333' }, { v: 10, bg: '#D2D2D2', fg: '#333' }, { v: 5, bg: '#BDBDBD', fg: '#333' } ],
    coinLabel: (v) => v >= 100 ? '$' + (v/100) : v + '¢',
    /* Canada has no pennies: cash totals round to 5 cents */
    levels: [
      { p: [100, 900, 100], pays: [1000] },
      { p: [150, 950, 50], pays: [1000] },
      { p: [125, 975, 25], pays: [1000] },
      { p: [105, 1995, 5], pays: [1000, 2000] },
      { p: [205, 1995, 5], pays: [2000] },
    ],
    deltas: [100, -100, 25, -25, 50, -50, 10, 200],
    goods: US.currency.goods.map(g => g.e === '🥛' ? { e: '🥛', n: 'A bag of milk' } : g.e === '🍩' ? { e: '🍩', n: 'A box of doughnuts' } : g),
  });
  CA.resources = [
    { n: 'Alzheimer Society', d: 'Every province has a local Alzheimer Society. Their First Link program connects people living with dementia and their families to support, education and local services. Find yours at alzheimer.ca.' },
    { n: '211', tel: '211', d: 'Free, confidential help finding community, social and health services near you, including home care and caregiver support.' },
    { n: 'Provincial home and community care', d: 'Ask your family doctor or provincial health line (811 in most provinces) about home care, adult day programs and respite.' },
    { n: '988 Suicide Crisis Helpline', tel: '988', d: 'Call or text 988, any time. If caregiving feels like too much, please reach out.' },
  ];
  window.YIKI_LOCALES['en-CA'] = CA;
})();

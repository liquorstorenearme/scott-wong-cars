/* ========================================
   Scott Wong Automotive — App Logic
   ======================================== */

(function () {
  'use strict';

  // ---- State ----
  let currentQuestion = 1;
  const totalQuestions = 5;
  const answers = {};

  // ---- DOM ----
  const questionsContainer = document.getElementById('questionsContainer');
  const progressFill = document.getElementById('progressFill');
  const configNav = document.getElementById('configNav');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const resultSection = document.getElementById('result');
  const configuratorSection = document.getElementById('configurator');

  // ---- Car Database ----
  const cars = [
    // ---- Under $40k ----
    {
      name: 'Toyota GR86',
      tagline: 'The responsible choice. So Scott will hate it.',
      specs: ['228 HP', 'Boxer-4', '6-Speed Manual', 'RWD', '$32,600 MSRP'],
      price: 32600,
      mods: 12000,
      insurance: 1800,
      projected_engines: 0,
      engine_note: 'Reliable, fun, affordable. Three words that have never described Scott\'s taste.',
      instead: 'This is the financially responsible option. Scott will test drive it, say "it\'s fun but...", and leave the dealer in something that costs three times as much.',
    },
    {
      name: 'Ford Mustang EcoBoost',
      tagline: 'A four-cylinder Mustang. The ultimate humiliation arc.',
      specs: ['315 HP', 'Turbo-4', '10-Speed Auto', 'RWD', '$34,175 MSRP'],
      price: 34175,
      mods: 10000,
      insurance: 2000,
      projected_engines: 0,
      engine_note: 'The EcoBoost is reliable. But imagine Scott telling people he drives a 4-cylinder Mustang.',
      instead: 'Scott would rather walk than be seen in a 4-cylinder Mustang. This option exists purely to offend him.',
    },
    {
      name: 'Subaru WRX',
      tagline: 'Vape not included.',
      specs: ['271 HP', 'Turbo Boxer-4', '6-Speed Manual', 'AWD', '$33,215 MSRP'],
      price: 33215,
      mods: 14000,
      insurance: 2100,
      projected_engines: 1,
      engine_note: 'Head gaskets are a Subaru tradition. Scott will feel right at home with engine problems.',
      instead: 'Scott buying a WRX would be like a sommelier drinking box wine. Technically fine. Spiritually devastating.',
    },
    {
      name: 'Volkswagen Golf R',
      tagline: 'The sensible hot hatch for a deeply unsensible man.',
      specs: ['315 HP', 'Turbo I4', 'DSG', 'AWD', '$36,820 MSRP'],
      price: 36820,
      mods: 8000,
      insurance: 1900,
      projected_engines: 0,
      engine_note: 'The EA888 is well-proven. Scott will mod it until it isn\'t.',
      instead: 'A practical, fast hatchback. Scott could carry groceries AND feel fast. He\'ll never buy it.',
    },
    // ---- $40k–$70k ----
    {
      name: 'Toyota GR Supra A91-MT',
      tagline: 'It\'s a BMW. Everyone knows. Scott doesn\'t care.',
      specs: ['382 HP', 'BMW B58 I6', '6-Speed Manual', 'RWD', '$58,600 MSRP'],
      price: 58600,
      mods: 18000,
      insurance: 2800,
      projected_engines: 0,
      engine_note: 'The B58 is bulletproof. Which means Scott will be bored and sell it in 8 months.',
      instead: 'The B58 won\'t break. Scott will be disappointed by this. He\'ll sell it and buy something Italian.',
    },
    {
      name: 'Ford Mustang Dark Horse',
      tagline: 'Scott going back to Ford is like an ex who says "this time will be different."',
      specs: ['500 HP', 'Coyote 5.0L V8', '6-Speed Tremec', 'RWD', '$63,370 MSRP'],
      price: 63370,
      mods: 22000,
      insurance: 3100,
      projected_engines: 2,
      engine_note: 'Another Ford V8. The GT350 Voodoo engine waved from the afterlife and said "good luck."',
      instead: 'He already has a Mustang. He\'s going back. This is the automotive equivalent of texting your ex at 2 AM.',
    },
    {
      name: 'Nissan Z NISMO',
      tagline: 'When you want to be different but also want to spend the same amount on mods.',
      specs: ['420 HP', 'Twin-Turbo V6', '9-Speed AT', 'RWD', '$67,590 MSRP'],
      price: 67590,
      mods: 15000,
      insurance: 2600,
      projected_engines: 1,
      engine_note: 'The VR30 is decent. But the 9-speed auto will haunt his dreams.',
      instead: 'Scott will test drive it, like it, then spend 3 months watching YouTube comparisons before buying something twice as expensive.',
    },
    {
      name: 'Toyota GR Corolla Morizo',
      tagline: 'A Corolla that costs $50K. Peak car-guy delusion.',
      specs: ['300 HP', 'Turbo I3', '6-Speed Manual', 'AWD', '$51,300 MSRP'],
      price: 51300,
      mods: 10000,
      insurance: 2200,
      projected_engines: 0,
      engine_note: 'It\'s a 3-cylinder. Scott will have to explain this at every Cars & Coffee.',
      instead: 'A three-cylinder Corolla that costs more than most people\'s first house down payment. Car people are unwell.',
    },
    {
      name: 'Chevrolet Camaro ZL1 1LE (Used)',
      tagline: 'Discontinued, unhinged, and depreciating. Perfect for Scott.',
      specs: ['650 HP', 'Supercharged V8', '6-Speed Manual', 'RWD', '$55,000 Used'],
      price: 55000,
      mods: 20000,
      insurance: 3400,
      projected_engines: 1,
      engine_note: 'The LT4 is a tank. But 650 HP in Scott\'s hands is a liability, not a feature.',
      instead: 'A used muscle car with 650 HP. What could go wrong? Everything. Everything could go wrong.',
    },
    // ---- $70k–$120k ----
    {
      name: 'BMW M3 Competition xDrive',
      tagline: 'German engineering meets Scott Wong\'s financial planning.',
      specs: ['503 HP', 'Twin-Turbo I6', 'AWD', 'ZF 8-Speed', '$82,000 MSRP'],
      price: 82000,
      mods: 25000,
      insurance: 3200,
      projected_engines: 1,
      engine_note: 'The S58 is actually reliable. Scott will find another way to spend money on it.',
      instead: 'Scott will immediately need a full Dinan package, carbon fiber everything, and a wrap. The base price is a suggestion, not a destination.',
    },
    {
      name: 'BMW M4 CSL',
      tagline: 'For when the regular M4 isn\'t enough of a financial mistake.',
      specs: ['543 HP', 'Twin-Turbo I6', 'RWD', '8-Speed', '$108,900 MSRP'],
      price: 108900,
      mods: 12000,
      insurance: 4100,
      projected_engines: 1,
      engine_note: 'Carbon bucket seats, no rear seats, track-focused. Scott will drive it to get coffee.',
      instead: 'The CSL is $30K more than the M3 for 40 more HP and no back seats. This is the kind of math only car people can do with a straight face.',
    },
    {
      name: 'C8 Corvette Z06',
      tagline: 'A flat-plane crank. Scott has learned nothing.',
      specs: ['670 HP', 'Flat-Plane V8', '8,600 RPM', 'DCT', '$115,000 MSRP'],
      price: 115000,
      mods: 20000,
      insurance: 3600,
      projected_engines: 2,
      engine_note: 'It\'s a flat-plane crank V8. We know how this ends for Scott.',
      instead: 'This is literally another flat-plane crank engine. The GT350 Voodoo is a flat-plane crank. Scott is a moth and flat-plane cranks are the flame. Two engines. Calling it now.',
    },
    {
      name: 'Lotus Emira V6',
      tagline: 'A car that weighs less than Scott\'s combined repair bills.',
      specs: ['400 HP', 'Supercharged V6', '6-Speed Manual', 'RWD', '$104,000 MSRP'],
      price: 104000,
      mods: 8000,
      insurance: 4200,
      projected_engines: 1,
      engine_note: 'It\'s a Toyota V6. Reliable engine, terrifying British electronics. Pick your poison.',
      instead: 'A Lotus. The car for people who think Porsches are too practical. Scott will love it until the first time it rains.',
    },
    {
      name: 'Alfa Romeo Giulia Quadrifoglio',
      tagline: 'Italian reliability. Two words that have never been used together non-sarcastically.',
      specs: ['505 HP', 'Twin-Turbo V6', 'RWD', '8-Speed Auto', '$83,350 MSRP'],
      price: 83350,
      mods: 10000,
      insurance: 3500,
      projected_engines: 2,
      engine_note: 'Ferrari-derived V6. Sounds incredible. Will break. It\'s in the DNA — literally, Alfa Romeo\'s DNA.',
      instead: 'Scott buying an Alfa is him saying "I thought Ford reliability wasn\'t bad enough. Let me try Italian reliability."',
    },
    {
      name: 'Porsche Cayman GT4 RS',
      tagline: 'Mid-engine, naturally aspirated, and priced like a small condo.',
      specs: ['493 HP', 'Flat-6', '9,000 RPM', 'PDK', '$108,600 MSRP'],
      price: 108600,
      mods: 15000,
      insurance: 4400,
      projected_engines: 0,
      engine_note: 'This is genuinely one of the best driver\'s cars ever made. Scott will still find something to complain about.',
      instead: 'Finally, a car worthy of Scott\'s delusions. The GT4 RS is incredible. He\'ll track it once, then park it forever and talk about it at dinner parties.',
    },
    {
      name: 'Mercedes-AMG C63 S E Performance',
      tagline: 'A hybrid 4-cylinder AMG. Nothing is sacred anymore.',
      specs: ['671 HP', 'Turbo I4 + Hybrid', 'AWD', '9-Speed MCT', '$87,150 MSRP'],
      price: 87150,
      mods: 12000,
      insurance: 3800,
      projected_engines: 1,
      engine_note: 'Mercedes replaced the V8 with a 4-cylinder hybrid. The car community hasn\'t recovered. Neither will Scott\'s bank account.',
      instead: 'A 4-cylinder C63 that costs $87K. The AMG badge is doing a LOT of heavy lifting here.',
    },
    // ---- $120k–$200k ----
    {
      name: 'Porsche 911 GT3',
      tagline: 'Because one flat-plane crank engine wasn\'t enough heartbreak.',
      specs: ['502 HP', 'Flat-6', '9,000 RPM', 'PDK or Manual', '$180,500 MSRP'],
      price: 180500,
      mods: 35000,
      insurance: 4800,
      projected_engines: 1,
      engine_note: 'Mezger-derived, so maybe this one survives. Maybe.',
      instead: 'For the price of this GT3 plus mods, Scott could have funded a small startup. It would have also failed, but at least there\'d be tax write-offs.',
    },
    {
      name: 'Porsche 911 GT3 RS',
      tagline: 'The GT3 but with a giant wing that screams "I make responsible choices."',
      specs: ['518 HP', 'Flat-6', '9,000 RPM', 'PDK', '$229,500 MSRP'],
      price: 229500,
      mods: 20000,
      insurance: 5500,
      projected_engines: 0,
      engine_note: 'Porsche\'s flat-six is bulletproof. The DRS wing will get more attention than the car itself.',
      instead: 'A quarter million dollars for a car with a wing bigger than most dining tables. Scott will say "it\'s an investment." It is not.',
    },
    {
      name: 'Chevrolet Corvette ZR1',
      tagline: '1,064 horsepower. What could go wrong.',
      specs: ['1,064 HP', 'Twin-Turbo V8', 'DCT', 'RWD', '$174,500 MSRP'],
      price: 174500,
      mods: 15000,
      insurance: 5200,
      projected_engines: 1,
      engine_note: '1,064 HP in a Corvette. The tires cost more than some people\'s cars.',
      instead: 'Over one thousand horsepower. Scott doesn\'t need this. Nobody needs this. He\'ll buy it anyway.',
    },
    {
      name: 'Mercedes-AMG GT',
      tagline: 'Stuttgart\'s answer to the question nobody asked Scott.',
      specs: ['577 HP', 'Twin-Turbo V8', 'AWD', '9-Speed MCT', '$164,900 MSRP'],
      price: 164900,
      mods: 18000,
      insurance: 5000,
      projected_engines: 1,
      engine_note: 'The M178 V8 hand-built by one person. When it breaks, you can blame them specifically.',
      instead: 'A Mercedes GT that costs as much as a house in some zip codes. But does a house have 577 HP? Exactly.',
    },
    {
      name: 'Nissan GT-R NISMO',
      tagline: 'A 15-year-old platform that still costs $225K. Respect.',
      specs: ['600 HP', 'Twin-Turbo V6', 'DCT', 'AWD', '$225,690 MSRP'],
      price: 225690,
      mods: 25000,
      insurance: 4800,
      projected_engines: 0,
      engine_note: 'The VR38 is hand-built and legendary. It\'s also in a car that debuted when the iPhone launched.',
      instead: 'A GT-R in 2026. Scott would be paying supercar money for a car that was designed during the Bush administration. Iconic? Yes. Smart? No.',
    },
    // ---- $200k+ ----
    {
      name: 'Lamborghini Huracan Tecnica',
      tagline: 'Italian, V10, rear-wheel drive. Scott\'s insurance agent just flinched.',
      specs: ['631 HP', 'NA V10', '7-Speed DCT', 'RWD', '$238,000 MSRP'],
      price: 238000,
      mods: 25000,
      insurance: 8000,
      projected_engines: 1,
      engine_note: 'A naturally aspirated V10. The last of its kind. It will sound incredible while draining Scott\'s account.',
      instead: 'A Lamborghini. Scott has officially left the "car enthusiast" zone and entered the "mid-life crisis" zone. No judgment. Okay, some judgment.',
    },
    {
      name: 'Ferrari 296 GTB',
      tagline: 'Scott can\'t afford a Ferrari. Scott will buy a Ferrari.',
      specs: ['819 HP', 'V6 + Hybrid', '8-Speed DCT', 'RWD', '$322,986 MSRP'],
      price: 322986,
      mods: 10000,
      insurance: 9500,
      projected_engines: 0,
      engine_note: 'Ferrari\'s V6 hybrid. 819 HP. Maintenance costs will make the GT350 engine swaps look like an oil change.',
      instead: 'Three hundred and twenty-two thousand dollars. For a V6. Ferrari really said "the badge costs $250K, the engine is a bonus."',
    },
    {
      name: 'McLaren 750S',
      tagline: 'British engineering. At least the GT350 prepared him for this.',
      specs: ['740 HP', 'Twin-Turbo V8', '7-Speed SSG', 'RWD', '$324,000 MSRP'],
      price: 324000,
      mods: 8000,
      insurance: 9000,
      projected_engines: 2,
      engine_note: 'McLaren reliability makes the GT350 look like a Toyota. Two engines minimum. This is Scott\'s final form.',
      instead: 'A McLaren. The car company that makes Ferrari look like a reliable daily driver. Scott will spend more time with his mechanic than in the car.',
    },
    {
      name: 'Porsche 911 Turbo S',
      tagline: 'The "sensible" supercar. Which for Scott means only slightly catastrophic.',
      specs: ['640 HP', 'Twin-Turbo Flat-6', 'PDK', 'AWD', '$236,300 MSRP'],
      price: 236300,
      mods: 30000,
      insurance: 6500,
      projected_engines: 0,
      engine_note: 'Genuinely the most reliable car on this list. It will outlive Scott\'s bank account.',
      instead: 'The 911 Turbo S is the smart choice at this price point. That sentence contains the words "smart" and "$236,000" and somehow both feel correct.',
    },
    {
      name: 'Aston Martin Vantage',
      tagline: 'Because nothing says "I\'ve given up on financial planning" like an Aston.',
      specs: ['656 HP', 'Twin-Turbo V8', '8-Speed Auto', 'RWD', '$185,900 MSRP'],
      price: 185900,
      mods: 12000,
      insurance: 6000,
      projected_engines: 1,
      engine_note: 'AMG-sourced V8, so it\'s German under the British skin. Depreciation hits harder than the Voodoo engine failures.',
      instead: 'An Aston Martin depreciates faster than Scott\'s excuses for buying another car. Beautiful to look at, terrifying to own.',
    },
  ];

  // ---- Init ----
  function init() {
    bindOptionClicks();
    bindNavigation();
    animateFinancials();
  }

  // ---- Option Clicks ----
  function bindOptionClicks() {
    questionsContainer.addEventListener('click', function (e) {
      const option = e.target.closest('.option');
      if (!option) return;

      const question = option.closest('.question');
      const qNum = parseInt(question.dataset.question);

      // Deselect siblings
      question.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');

      answers[qNum] = option.dataset.value;

      // Show nav
      configNav.style.display = 'flex';

      // Auto-advance after short delay
      setTimeout(() => {
        if (currentQuestion < totalQuestions) {
          goToQuestion(currentQuestion + 1);
        } else {
          showResult();
        }
      }, 400);
    });
  }

  // ---- Navigation ----
  function bindNavigation() {
    prevBtn.addEventListener('click', () => {
      if (currentQuestion > 1) goToQuestion(currentQuestion - 1);
    });

    nextBtn.addEventListener('click', () => {
      if (!answers[currentQuestion]) return;
      if (currentQuestion < totalQuestions) {
        goToQuestion(currentQuestion + 1);
      } else {
        showResult();
      }
    });

    document.getElementById('reconfigureBtn').addEventListener('click', () => {
      resetConfigurator();
    });

    document.getElementById('sendBtn').addEventListener('click', () => {
      alert('Just send him the link. He\'ll know what he did.');
    });
  }

  function goToQuestion(num) {
    currentQuestion = num;

    // Update question visibility
    questionsContainer.querySelectorAll('.question').forEach(q => {
      q.classList.remove('active');
      if (parseInt(q.dataset.question) === num) q.classList.add('active');
    });

    // Update progress
    progressFill.style.width = ((num / totalQuestions) * 100) + '%';

    // Update step indicators
    document.querySelectorAll('.step').forEach(s => {
      const stepNum = parseInt(s.dataset.step);
      s.classList.remove('active', 'done');
      if (stepNum === num) s.classList.add('active');
      else if (stepNum < num) s.classList.add('done');
    });

    // Update nav button state
    prevBtn.style.visibility = num === 1 ? 'hidden' : 'visible';
    nextBtn.textContent = num === totalQuestions ? 'See Results' : 'Continue';
  }

  // ---- Show Result ----
  function showResult() {
    // Pick a car based on answers (weighted random with flavor)
    const car = pickCar();

    // Hide configurator, show result
    configuratorSection.style.display = 'none';
    resultSection.style.display = 'block';

    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth' });

    // Populate
    document.getElementById('resultTitle').textContent = 'Your Next Bad Decision';
    document.getElementById('resultTagline').textContent = car.tagline;
    document.getElementById('resultCar').textContent = car.name;

    // Specs
    const specsEl = document.getElementById('resultSpecs');
    specsEl.innerHTML = car.specs.map(s => '<span>' + s + '</span>').join('');

    // Damage grid
    const grid = document.getElementById('damageGrid');
    const damages = [
      { label: 'Base Price', value: formatCurrency(car.price) },
      { label: 'Mods Scott Will "Need"', value: formatCurrency(car.mods), danger: true },
      { label: 'Annual Insurance', value: formatCurrency(car.insurance) + '/yr' },
      { label: 'Projected Engine Replacements', value: car.projected_engines + ' ($' + (car.projected_engines * 8000).toLocaleString() + ')', danger: car.projected_engines > 0 },
      { label: 'First Year Depreciation (~15%)', value: '-' + formatCurrency(Math.round(car.price * 0.15)), danger: true },
    ];

    grid.innerHTML = damages.map(d =>
      '<div class="damage-row">' +
        '<span class="label">' + d.label + '</span>' +
        '<span class="value' + (d.danger ? ' text-danger' : '') + '">' + d.value + '</span>' +
      '</div>'
    ).join('');

    const total = car.price + car.mods + car.insurance + (car.projected_engines * 8000);
    animateCounter(document.getElementById('damageTotal'), total);

    // Instead
    document.getElementById('insteadSection').innerHTML =
      '<strong>Analyst Note:</strong> ' + car.instead;

    // Engine note
    const engineNote = document.createElement('div');
    engineNote.className = 'damage-row';
    engineNote.innerHTML =
      '<span class="label">Engine Prognosis</span>' +
      '<span class="value" style="max-width:60%;text-align:right;font-size:0.8rem;color:var(--text-dim)">' + car.engine_note + '</span>';
    grid.appendChild(engineNote);
  }

  function pickCar() {
    const budget = answers[1];
    let pool;

    if (budget === 'supercar') {
      pool = cars.filter(c => c.price >= 200000);
    } else if (budget === 'unhinged' || budget === 'scott') {
      pool = cars.filter(c => c.price >= 120000);
    } else if (budget === 'dangerous') {
      pool = cars.filter(c => c.price >= 70000 && c.price <= 130000);
    } else if (budget === 'delusional') {
      pool = cars.filter(c => c.price >= 40000 && c.price <= 75000);
    } else if (budget === 'sensible') {
      pool = cars.filter(c => c.price < 40000);
    } else {
      pool = cars.filter(c => c.price >= 100000);
    }

    // "Budget?" answer — pick from the most expensive cars
    if (budget === 'scott') {
      const expensive = cars.slice().sort((a, b) => b.price - a.price);
      pool = expensive.slice(0, 6);
    }

    // If they said reliability matters, give them the most unreliable option in the pool
    if (answers[3] === 'cope' || answers[3] === 'denial') {
      pool.sort((a, b) => b.projected_engines - a.projected_engines);
      return pool[0];
    }

    // If going back to Ford
    if (answers[4] === 'bored' || answers[4] === 'replace') {
      const darkHorse = cars.find(c => c.name.includes('Dark Horse'));
      if (darkHorse && pool.includes(darkHorse)) return darkHorse;
    }

    // Track answer — favor high HP
    if (answers[2] === 'track') {
      pool.sort((a, b) => {
        const hpA = parseInt(a.specs[0]) || 0;
        const hpB = parseInt(b.specs[0]) || 0;
        return hpB - hpA;
      });
      // Pick from top 3
      return pool[Math.floor(Math.random() * Math.min(3, pool.length))];
    }

    // Random from pool
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ---- Reset ----
  function resetConfigurator() {
    currentQuestion = 1;
    Object.keys(answers).forEach(k => delete answers[k]);

    resultSection.style.display = 'none';
    configuratorSection.style.display = 'block';

    // Reset selections
    questionsContainer.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));

    goToQuestion(1);
    configNav.style.display = 'none';
    configuratorSection.scrollIntoView({ behavior: 'smooth' });
  }

  // ---- Financials Animation ----
  function animateFinancials() {
    // Total spend counter
    const totalEl = document.getElementById('totalSpend');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // GT350 ~$60k + Type S ~$52k + 2 extra engines ~$16k + mods estimate ~$20k
          animateCounter(totalEl, 148000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(totalEl);

    // Days counter - random between 30-90
    const daysEl = document.getElementById('daysSince');
    const days = Math.floor(Math.random() * 60) + 30;
    daysEl.textContent = days;
  }

  // ---- Helpers ----
  function formatCurrency(num) {
    return '$' + num.toLocaleString();
  }

  function animateCounter(el, target) {
    const duration = 1500;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * ease);
      el.textContent = formatCurrency(current);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  // ---- Go ----
  init();
})();

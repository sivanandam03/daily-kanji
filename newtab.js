fetch('data/kanji.json')
  .then(response => response.json())
  .then(kanjiList => {

    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const todayKanji = kanjiList[dayOfYear % kanjiList.length];

    // Set background ghost kanji
    document.getElementById('bg-kanji').textContent = todayKanji.kanji;

    // Build the card
    document.getElementById('app').innerHTML = `
      <div class="kanji-card" data-kanji="${todayKanji.kanji}">
        <div class="card-header">Kanji of the Day</div>
        <div class="day-counter">Day ${dayOfYear} · ${todayKanji.kanji}</div>
        <div class="kanji-character" id="kanji-display">${todayKanji.kanji}</div>
        <div class="kanji-meaning">${todayKanji.meaning}</div>
        <div class="readings">
          <div class="reading-row">
            <span class="reading-label">Kun</span>
            <span class="reading-value">${todayKanji.kunyomi}</span>
          </div>
          <div class="reading-row">
            <span class="reading-label">On</span>
            <span class="reading-value">${todayKanji.onyomi}</span>
          </div>
        </div>
        <div class="stroke-count">${todayKanji.strokeCount} strokes</div>
        <button class="stroke-btn" id="stroke-btn">Watch Stroke Order</button>
      </div>
    `;

    document.getElementById('stroke-btn').addEventListener('click', (e) => {

      // Handle Show Kanji mode
      if (e.target.dataset.mode === 'show-kanji') {
        const display = document.getElementById('kanji-display');
        display.classList.remove('loading');
        display.innerHTML = todayKanji.kanji;
        e.target.textContent = 'Watch Stroke Order';
        delete e.target.dataset.mode;
        return;
      }

      const kanjiCode = todayKanji.kanji.codePointAt(0).toString(16).padStart(5, '0');
      const svgUrl = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${kanjiCode}.svg`;

      const display = document.getElementById('kanji-display');
      display.innerHTML = 'Loading...';
      display.classList.add('loading');

      fetch(svgUrl)
        .then(response => response.text())
        .then(svgText => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
          const svgElement = svgDoc.querySelector('svg');

          svgElement.setAttribute('width', '160');
          svgElement.setAttribute('height', '160');
          svgElement.setAttribute('viewBox', '0 0 109 109');

          const textColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--text-primary').trim();

          const strokeGroup = svgElement.querySelector('[id^="kvg:StrokePaths"]');
          if (strokeGroup) {
            strokeGroup.style.stroke = textColor;
            strokeGroup.style.fill = 'none';
          }

          const strokes = svgElement.querySelectorAll('[id^="kvg:StrokePaths"] path');
          strokes.forEach((stroke, index) => {
            stroke.style.stroke = textColor;
            stroke.style.fill = 'none';
            stroke.style.strokeWidth = '6';
            stroke.style.strokeDasharray = '1000';
            stroke.style.strokeDashoffset = '1000';
            stroke.style.transition = `stroke-dashoffset 1.5s ease ${index * 1.0}s`;
          });

          const numberGroup = svgElement.querySelector('[id^="kvg:StrokeNumbers"]');
          if (numberGroup) numberGroup.style.display = 'none';

          display.classList.remove('loading');
          display.innerHTML = '';
          display.appendChild(svgElement);

          setTimeout(() => {
            strokes.forEach(stroke => {
              stroke.style.strokeDashoffset = '0';
            });
          }, 100);

          const btn = document.getElementById('stroke-btn');
          btn.textContent = 'Show Kanji';
          btn.dataset.mode = 'show-kanji';
        })
        .catch(() => {
          display.innerHTML = todayKanji.kanji;
          display.classList.remove('loading');
        });
    });

  })
  .catch(error => {
    console.error('Error loading kanji data:', error);
    document.getElementById('app').innerHTML = '<p>Error loading kanji.</p>';
  });
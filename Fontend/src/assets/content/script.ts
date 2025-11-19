export function initMateriasSelector() {
  let currentCareerIdx = 0;
  let currentQuarterIdx = 0;

  function getNumberDataset(el: HTMLElement, key: string): number {
    const raw = el.dataset[key];
    if (!raw) return -1;
    const num = parseInt(raw);
    return isNaN(num) ? -1 : num;
  }

  const careerBtns = document.querySelectorAll<HTMLButtonElement>('.career-btn');
  const quarterBtns = document.querySelectorAll<HTMLButtonElement>('.quarter-btn');
  const subjectTags = document.querySelectorAll<HTMLButtonElement>('.subject-tag');
  const materiaContents = document.querySelectorAll<HTMLElement>('.materia-content');

  function updateCareerSelection() {
    quarterBtns.forEach(btn => (btn.style.display = 'none'));
    subjectTags.forEach(tag => (tag.style.display = 'none'));

    quarterBtns.forEach(btn => {
      if (getNumberDataset(btn, 'careerIdx') === currentCareerIdx) {
        btn.style.display = '';
      }
    });

    currentQuarterIdx = 0;
    updateQuarterSelection();
  }

  function updateQuarterSelection() {
    quarterBtns.forEach(btn => {
      const cIdx = getNumberDataset(btn, 'careerIdx');
      const qIdx = getNumberDataset(btn, 'quarterIdx');

      if (cIdx === currentCareerIdx && qIdx === currentQuarterIdx) {
        btn.classList.remove('bg-[#28283f]', 'text-gray-100');
        btn.classList.add('bg-green-500', 'text-white');
      } else if (cIdx === currentCareerIdx) {
        btn.classList.remove('bg-green-500', 'text-white');
        btn.classList.add('bg-[#28283f]', 'text-gray-100');
      }
    });

    subjectTags.forEach(tag => {
      const cIdx = getNumberDataset(tag, 'careerIdx');
      const qIdx = getNumberDataset(tag, 'quarterIdx');
      tag.style.display =
        cIdx === currentCareerIdx && qIdx === currentQuarterIdx
          ? ''
          : 'none';
    });

    resetToAllSubjects();
  }

  function resetToAllSubjects() {
    subjectTags.forEach(tag => {
      const isAll =
        tag.dataset.materia === 'all' &&
        getNumberDataset(tag, 'careerIdx') === currentCareerIdx &&
        getNumberDataset(tag, 'quarterIdx') === currentQuarterIdx;

      if (isAll) {
        tag.classList.add('bg-yellow-500', 'text-[#1a1a2e]', 'font-semibold');
        tag.classList.remove('bg-[#28283f]', 'text-gray-100');
      } else {
        tag.classList.remove('bg-yellow-500', 'text-[#1a1a2e]', 'font-semibold');
        tag.classList.add('bg-[#28283f]', 'text-gray-100');
      }
    });

    materiaContents.forEach(content => (content.style.display = 'none'));
  }

  function showMateriaContent(materiaName: string) {
    materiaContents.forEach(content => {
      const cIdx = getNumberDataset(content, 'careerIdx');
      const qIdx = getNumberDataset(content, 'quarterIdx');
      const mName = content.dataset.materia;

      content.style.display =
        cIdx === currentCareerIdx &&
        qIdx === currentQuarterIdx &&
        mName === materiaName
          ? 'block'
          : 'none';
    });
  }

  careerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCareerIdx = getNumberDataset(btn, 'careerIdx');

      careerBtns.forEach(b => {
        b.classList.remove('bg-blue-500', 'text-white');
        b.classList.add('bg-[#28283f]', 'text-gray-100');
      });

      btn.classList.remove('bg-[#28283f]', 'text-gray-100');
      btn.classList.add('bg-blue-500', 'text-white');

      updateCareerSelection();
    });
  });

  quarterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cIdx = getNumberDataset(btn, 'careerIdx');
      if (cIdx === currentCareerIdx) {
        currentQuarterIdx = getNumberDataset(btn, 'quarterIdx');
        updateQuarterSelection();
      }
    });
  });

  subjectTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const cIdx = getNumberDataset(tag, 'careerIdx');
      const qIdx = getNumberDataset(tag, 'quarterIdx');

      if (cIdx === currentCareerIdx && qIdx === currentQuarterIdx) {
        const visibleTags = Array.from(subjectTags).filter(
          t =>
            getNumberDataset(t, 'careerIdx') === currentCareerIdx &&
            getNumberDataset(t, 'quarterIdx') === currentQuarterIdx
        );

        visibleTags.forEach(t => {
          t.classList.remove('bg-yellow-500', 'text-[#1a1a2e]', 'font-semibold');
          t.classList.add('bg-[#28283f]', 'text-gray-100');
        });

        tag.classList.remove('bg-[#28283f]', 'text-gray-100');
        tag.classList.add('bg-yellow-500', 'text-[#1a1a2e]', 'font-semibold');

        const materiaName = tag.dataset.materia;
        if (materiaName === 'all') {
          materiaContents.forEach(c => (c.style.display = 'none'));
        } else if (materiaName) {
          showMateriaContent(materiaName);
        }
      }
    });
  });
}

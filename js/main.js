window.addEventListener('scroll', (function () {
  const mapSection = function (section, prefix) {
    if (typeof(section) === 'number') section = { number: section };
    let subsections;
    switch (typeof(section.subsections)) {
    case 'object':
      subsections = section.subsections;
      break;
    case 'number':
      subsections = [...Array(section.subsections).keys()].map(i => i+1);
      break;
    default:
      subsections = [];
      break;
    }
    return {
      elem: document.getElementById(`${prefix}${section.number}`),
      nav: document.querySelector(`nav a[href="#${prefix}${section.number}"]`),
      sublist: document.querySelector(`nav a[href="#${prefix}${section.number}"] + ul`),
      subsections: subsections.map(subsection => mapSection(subsection, `${prefix}${section.number}.`))
    };
  };
  
  const isActive = function (elem) {
    const rect = elem.getBoundingClientRect();
    const offset = window.innerHeight / 3;
    return rect.top < 10 + offset && rect.top + rect.height > -15 + offset;
  };

  const visitSections = function (sections) {
    let first = true;
    for (const section of sections) {
      if (isActive(section.elem) && first) {
        first = false;
        if (section.sublist) section.sublist.classList.remove('inactive');
        visitSections(section.subsections);
        if (section.nav) section.nav.classList.add('active');
      } else {
        if (section.sublist) section.sublist.classList.add('inactive');
        if (section.nav) section.nav.classList.remove('active');
      }
    }
  };

  const sections = [
    { number: 0, subsections: 4 },
    { number: 1, subsections: [
      { number: 1, subsections: 8 }, { number: 2, subsections: 6 },
      { number: 3, subsections: 4 }
    ] },
    { number: 2, subsections: [
      { number: 1, subsections: 4 }, { number: 2, subsections: 4 },
      { number: 3, subsections: 4 }, { number: 4, subsections: 3 },
      { number: 5, subsections: 3 }
    ] },
    { number: 3, subsections: [
      { number: 1, subsections: 3 }, { number: 2, subsections: 4 },
      { number: 3, subsections: 5 }, { number: 4, subsections: 2 },
      { number: 5, subsections: 5 }
    ] },
    { number: 4, subsections: [
      { number: 1, subsections: 7 }, { number: 2, subsections: 3},
      { number: 3, subsections: 3 }, { number: 4, subsections: 4 }
    ] },
    { number: 5, subsections: [
      { number: 1, subsections: 5 }, { number: 2, subsections: 4 },
      { number: 3, subsections: 2 }, { number: 4, subsections: 4 },
      { number: 5, subsections: 7 }
    ] },
    { number: 6, subsections: 3 }
  ].map(section => mapSection(section, 's'));

  return function (ev) {
    visitSections(sections);
  };
}()));
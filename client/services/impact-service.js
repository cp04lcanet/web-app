import { Impact } from '../models/impact.js';
import { BASE_URL } from './api-service.js'

export async function renderImpact(locale = 'en') {
  const Impact = await fetchImpact(locale);
  if (Impact) {
    document.getElementById('impact_heading').textContent = Impact.heading;
    document.getElementById('impact_subtitle').textContent = Impact.description;

    const impactStats = document.querySelectorAll('.impact_stat_value');
    const impactStatDes = document.querySelectorAll('.impact_stat_desc');

    impactStats[0].textContent = Impact.number1;
    impactStats[1].textContent = Impact.number2;

    impactStatDes[0].textContent = Impact.number1text;
    impactStatDes[1].textContent = Impact.number2text;



    const imgEl = document.getElementById('impact-id-image');
    if (Impact.picture) {
      imgEl.src = Impact.picture;
    }

  }
}

async function fetchImpact(locale = 'en') {
  const endpoint = `${BASE_URL}/api/impact?populate=*&locale=${locale}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const result = await response.json();

    return new Impact({
      heading: result.data.Heading,
      description: result.data.Description,
      picture: result.data.Picture?.url
        ? `${BASE_URL}${result.data.Picture?.url}`
        : null,
      number1text: result.data.Number1text,
      number2text: result.data.Number2text,
      number1: result.data.Number1,
      number2: result.data.Number2,

    });
  } catch (error) {
    console.error('Failed to fetch Impact:', error);
    return null;
  }
}

import { joinUs } from '../models/joinUs.js';
import { BASE_URL } from './api-service.js'

export async function renderjoinUs(locale = 'en') {
  const joinUs = await fetchjoinUs(locale);
  if (joinUs) {
    document.getElementById('join_us_title').textContent = joinUs.heading;
    document.getElementById('join_us_subtitle').textContent = joinUs.description;

    // const imgEl = document.getElementById('mission-picture');
    // if (joinUs.picture) {
    //   imgEl.src = joinUs.picture;
    // }
  }
}

async function fetchjoinUs(locale = 'en') {
  const endpoint = `${BASE_URL}/api/join-us?populate=*&locale=${locale}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const result = await response.json();

    return new joinUs({
      heading: result.data.Heading,
      description: result.data.Description,
      // picture: result.data.Picture?.url
      //   ? `${BASE_URL}${result.data.Picture?.url}`
      //   : null,
    });
  } catch (error) {
    console.error('Failed to fetch Join Us:', error);
    return null;
  }
}

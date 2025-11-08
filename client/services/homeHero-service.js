import { HomeHero } from '../models/homeHero.js';
import { BASE_URL } from './api-service.js'

export async function renderhomeHero(locale = 'en') {
  const homeHero = await fetchhomeHero(locale);
  if (homeHero) {
    document.getElementById('home_hero_heading').textContent = homeHero.heading;
    document.getElementById('home_hero_subheading').textContent = homeHero.description;

    // const imgEl = document.getElementById('mission-picture');
    // if (homeHero.picture) {
    //   imgEl.src = homeHero.picture;
    // }
  }
}

async function fetchhomeHero(locale = 'en') {
  const endpoint = `${BASE_URL}/api/hero?populate=*&locale=${locale}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const result = await response.json();

    return new HomeHero({
      heading: result.data.Heading,
      description: result.data.Description,
      // picture: result.data.Picture?.url
      //   ? `${BASE_URL}${result.data.Picture?.url}`
      //   : null,
    });
  } catch (error) {
    console.error('Failed to fetch Home Hero:', error);
    return null;
  }
}

import { FAQ } from '../models/faq.js';
import { BASE_URL } from './api-service.js'

export async function renderFAQ(locale = 'en') {
  //debugger
  const FAQ = await fetchFAQ(locale);
  if (FAQ) {
    document.getElementById('faq-title').textContent = FAQ.heading;
    document.getElementById('faq_subtitle').textContent = FAQ.description;

    // const imgEl = document.getElementById('mission-picture');
    // if (FAQ.picture) {
    //   imgEl.src = FAQ.picture;
    // }
  }
}

async function fetchFAQ(locale = 'en') {
  const endpoint = `${BASE_URL}/api/faq?populate=*&locale=${locale}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const result = await response.json();

    return new FAQ({
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

import { AboutUs } from '../models/aboutUs.js';
import { BASE_URL } from './api-service.js'

export async function renderAboutUs(locale = 'en') {
  const AboutUs = await fetchAboutUs(locale);
  if (AboutUs) {
    document.getElementById('AboutUsHeading').textContent = AboutUs.heading;
    document.getElementById('AboutUsParagraph').textContent = AboutUs.description;

    const imgEl = document.getElementById('AboutUsImg');
    if (AboutUs.picture) {
      imgEl.src = AboutUs.picture;
    }
  }
}

async function fetchAboutUs(locale = 'en') {
  const endpoint = `${BASE_URL}/api/something-about-us?populate=*&locale=${locale}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const result = await response.json();

    return new AboutUs({
      heading: result.data.Heading,
      description: result.data.Description,
      picture: result.data.Picture?.url
        ? `${BASE_URL}${result.data.Picture?.url}`
        : null,
    });
  } catch (error) {
    console.error('Failed to fetch Mission & Vision:', error);
    return null;
  }
}

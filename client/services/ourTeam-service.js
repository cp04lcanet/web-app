import { OurTeam } from '../models/ourTeam.js';
import { BASE_URL } from './api-service.js'

export async function renderOurTeam(locale = 'en') {
  const OurTeam = await fetchOurTeam(locale);
  if (OurTeam) {
    document.getElementById('OurTeamTitle').textContent = OurTeam.heading;
    document.getElementById('OurTeamText').textContent = OurTeam.description;

    // const imgEl = document.getElementById('OurTeamImg');
    // if (OurTeam.picture) {
    //   imgEl.src = OurTeam.picture;
    // }
  }
}

async function fetchOurTeam(locale = 'en') {
  const endpoint = `${BASE_URL}/api/something-about-us?populate=*&locale=${locale}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const result = await response.json();

    return new OurTeam({
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

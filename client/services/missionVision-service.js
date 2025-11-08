import { MissionVision } from '../models/missionVision.js';
import { BASE_URL } from '../services/api-service.js'

export async function renderMissionVision(locale = 'en') {
  const missionVision = await fetchMissionVision(locale);
  if (missionVision) {
    document.getElementById('mission-heading').textContent = missionVision.heading;
    document.getElementById('mission-description').textContent = missionVision.description;

    const imgEl = document.getElementById('mission-picture');
    if (missionVision.picture) {
      imgEl.src = missionVision.picture;
    }
  }
}

async function fetchMissionVision(locale = 'en') {
  const endpoint = `${BASE_URL}/api/our-mission-and-vision?populate=*&locale=${locale}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const result = await response.json();

    return new MissionVision({
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

import Boox, { type SearchResult } from 'boox';
import debounce from 'debounce';
import { metaphone } from 'metaphone';
import { stemmer } from 'stemmer';
import { removeStopwords } from 'stopword';

import '../src/df_censored.json';



interface Hotel {
  id: number;
  area_name: string;
  property_name: string;
  property_type: string;
  unit_type: string;
  bedroom: string;
  bathroom: string;
  beds: string;
  wifi: string;
  tv: string;
  ac: string;
  parking: string;
  pool: string;
  breakfast: string;
  building_staff: string;
  desc: string;
  cluster: string;
}

const searchQueryInput = document.querySelector<HTMLInputElement>('#search-query');
const resultsList = document.querySelector<HTMLDivElement>('#results');
const resultsLength = document.querySelector<HTMLParagraphElement>('#results-length');

const boox = new Boox<Hotel>({
  features: ['area_name', 'property_name', 'property_type', 'desc'],
  attributes: ['unit_type', 'bedroom', 'beds', 'wifi', 'tv', 'ac', 'parking', 'pool', 'breakfast', 'bathroom', 'building_staff', 'cluster'],
  modelOptions: {
    tokenizer(input) {
      return removeStopwords(Array.from(input.match(/\b\w+\b/g) || []));
    },
    stemmer: stemmer,
    phonetic: metaphone,
  },
});

async function fetchData(): Promise<Hotel[]> {
  try {
    const response = await fetch(
      'https://storage.googleapis.com/capstone-bukitvista/src/df_censored.json', { cache: 'default' }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
}

fetchData().then(async (Hotels) => {
  await boox.addDocuments(Hotels);
});

const performSearch = debounce(async () => {
  const query = searchQueryInput?.value || '';
  if (query.trim() === '') {
    updateUI([]);
    return;
  }
  const results = await boox.search(query);
  updateUI(results);
}, 300);

function updateUI(results: SearchResult<Hotel>[]) {
  const limitedResults = results.slice(0, 8);
  resultsList?.classList.toggle('d-none', !limitedResults.length);

  if (resultsLength) {
    resultsLength.classList.toggle('d-none', !limitedResults.length);
    resultsLength.textContent = limitedResults.length
      ? `Found ${limitedResults.length} of ${Object.keys(boox.currentState.documents).length} Hotels`
      : '';
    resultsLength.style.paddingTop = '10px';
  }

  displayResults(limitedResults);
}

function displayResults(results: SearchResult<Hotel>[]) {
  if (!resultsList) return;
  resultsList.innerHTML = '';

  results.forEach((result, index) => {
    const { text: property_name } = result.context('property_name');
    const { text: property_type } = result.context('property_type');
    const { text: desc } = result.context('desc');
    const { text: area_name } = result.context('area_name');
    const { text: wifi } = result.context('wifi');
    const { text: tv } = result.context('tv');
    const { text: ac } = result.context('ac');
    const { text: parking } = result.context('parking');
    const { text: pool } = result.context('pool');
    const { text: breakfast } = result.context('breakfast');
    const { text: bedroom } = result.context('bedroom');
    const { text: beds } = result.context('beds');
    const { text: bathroom } = result.context('bathroom');
    const { text: building_staff } = result.context('building_staff');
    const { text: cluster } = result.context('cluster');

    const resultElement = document.createElement('div');
    resultElement.classList.add('accordion-item');

    resultElement.innerHTML = `
      <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
          <img loading="lazy" src="https://storage.googleapis.com/capstone-bukitvista/src/media/photo${index}.jpg" alt="" width="32" height="32" class="rounded-circle flex-shrink-0">
          <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 class="mb-1" style="margin-left: 10px;">${property_name}</h6>
              <p style="margin-left: 10px;">Daerah ${area_name}</p>
            </div>
            <small class="opacity-50 text-nowrap" style="margin-right: 10px;">${property_type}</small>
          </div>
        </button>
      </h2>
      <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#results">
        <div class="accordion-body">
          <h2 class="m-4" style="margin-left: 10px;">Fasilitas</h2>
          <table class="table mt-3">
            <tbody>
              <tr>
                <td>Bedroom</td>
                <td>${bedroom}</td>
              </tr>
              <tr>
                <td>Beds</td>
                <td>${bathroom}</td>
              </tr>
              <tr>
                <td>Beds</td>
                <td>${beds}</td>
              </tr>
              <tr>
                <td>Wifi</td>
                <td>${wifi}</td>
              </tr>
              <tr>
                <td>TV</td>
                <td>${tv}</td>
              </tr>
              <tr>
                <td>AC</td>
                <td>${ac}</td>
              </tr>
              <tr>
                <td>Parking</td>
                <td>${parking}</td>
              </tr>
              <tr>
                <td>Pool</td>
                <td>${pool}</td>
              </tr>
              <tr>
                <td>Breakfast</td>
                <td>${breakfast}</td>
              </tr>
              <tr>
                <td>Building Staff</td>
                <td>${building_staff}</td>
              </tr>
              <tr>
                <td>Cluster</td>
                <td>${cluster}</td>
              </tr>
            </tbody>
          </table>
          <p class="mb-0 opacity-75"><strong>Deskripsi: </strong>${desc}</p>
        </div>
      </div>
    `;
    resultsList.appendChild(resultElement);
  });
}

searchQueryInput?.addEventListener('input', performSearch);

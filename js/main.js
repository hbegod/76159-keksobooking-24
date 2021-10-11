import { createAdvertisement } from './data.js';

const SIMILAR_ADVERTISEMENTS_COUNT = 10;

const similarAdvertisements = Array.from({length: SIMILAR_ADVERTISEMENTS_COUNT}, createAdvertisement);

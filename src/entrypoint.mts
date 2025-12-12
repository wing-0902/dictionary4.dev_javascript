import type { Alpine } from 'alpinejs';
import persist from '@alpinejs/persist';

export default (Alpine: Alpine) => {
  Alpine.plugin(persist);
}
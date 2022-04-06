/** True if running under e2e testing (e.g., launch URL ends `?e2e`) */
// @browserLine
export const isE2E = window.location.search.includes('e2e');
export const host = `http://localhost:4199`;

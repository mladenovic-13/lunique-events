export const selectPrevendDefault = (ref: HTMLDivElement | null) => {
  if (!ref) return;
  ref.ontouchstart = (e) => {
    e.preventDefault();
  };
};

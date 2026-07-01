const state = {
  selectedLocationId: null,
  session: null,
};

export function getAppState() {
  return { ...state };
}

export function setSelectedLocation(locationId) {
  state.selectedLocationId = locationId;
}

export function setSession(session) {
  state.session = session;
}
